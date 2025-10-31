import multer from "multer";
import { createClient } from "@supabase/supabase-js";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

const storage = multer.memoryStorage();

const upload = multer({
  storage,

  fileFilter: (req, file, cb) => {
    if (file.fieldname === "foto") {
      const allowedTypes = /jpeg|jpg|png|gif|webp/;
      const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
      const mimetype = allowedTypes.test(file.mimetype);
      
      if (extname && mimetype) {
        cb(null, true);
      } else {
        cb(new Error("Solo se permiten imágenes (jpeg, jpg, png, gif, webp)"));
      }
    } else if (file.fieldname === "cv") {
      const allowedTypes = /pdf|doc|docx/;
      const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
      
      if (extname) {
        cb(null, true);
      } else {
        cb(new Error("Solo se permiten archivos PDF, DOC o DOCX para CV"));
      }
    } else {
      cb(null, true);
    }
  }
});

export async function uploadToSupabase(file, folder) {
  if (!file) return null;

  const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
  const ext = path.extname(file.originalname);
  const filename = `${file.fieldname}-${unique}${ext}`;
  const filepath = `${folder}/${filename}`;

  const { data, error } = await supabase.storage
    .from("empleos-archivos")
    .upload(filepath, file.buffer, {
      contentType: file.mimetype,
      upsert: false,
    });

  if (error) {
    console.error("Error al subir archivo a Supabase:", error);
    throw error;
  }

  const { data: publicUrlData } = supabase.storage
    .from("empleos-archivos")
    .getPublicUrl(filepath);

  return publicUrlData.publicUrl;
}

export async function deleteFromSupabase(fileUrl) {
  if (!fileUrl) return;

  try {
    const url = new URL(fileUrl);
    const pathParts = url.pathname.split("/empleos-archivos/");
    if (pathParts.length < 2) return;
    
    const filepath = pathParts[1];

    const { error } = await supabase.storage
      .from("empleos-archivos")
      .remove([filepath]);

    if (error) {
      console.error("Error al eliminar archivo de Supabase:", error);
    }
  } catch (error) {
    console.error("Error al procesar URL para eliminar:", error);
  }
}

export default upload;