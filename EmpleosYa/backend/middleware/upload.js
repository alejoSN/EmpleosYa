const multer = require('multer');
const path = require('path');
const fs = require('fs');

const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};

const imagenesDir = path.join(__dirname, '..', 'archivos', 'imagenes');
const cvsDir = path.join(__dirname, '..', 'archivos', 'CVs');
ensureDir(imagenesDir);
ensureDir(cvsDir);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === 'foto') cb(null, imagenesDir);
    else if (file.fieldname === 'cv') cb(null, cvsDir);
    else cb(null, path.join(__dirname, '..', 'archivos'));
  },
  filename: function (req, file, cb) {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${unique}${ext}`);
  },
});

const upload = multer({ storage });

module.exports = upload;
