import dotenv from 'dotenv';
dotenv.config();
import postgres from 'postgres';
import dns from 'dns/promises';

const getIPv4 = async (hostname) => {
  try {
    const addresses = await dns.resolve4(hostname);
    return addresses[0];
  } catch (error) {
    console.error('Error resolviendo DNS:', error);
    return hostname;
  }
};

const dbUrl = new URL(process.env.DATABASE_URL);
const ipv4Host = await getIPv4(dbUrl.hostname);

console.log('Conectando a IP:', ipv4Host);

const sql = postgres({
  host: ipv4Host,
  port: 5432,
  database: 'postgres',
  username: 'postgres',
  password: dbUrl.password,
  ssl: 'require'
});

export default sql;