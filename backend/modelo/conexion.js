import dotenv from 'dotenv';
dotenv.config();
import postgres from 'postgres';
import { setDefaultResultOrder } from 'dns';

setDefaultResultOrder('ipv4first');

const sql = postgres(process.env.DATABASE_URL, {
  ssl: 'require',
  connection: {
    application_name: 'empleosya'
  }
});

export default sql;