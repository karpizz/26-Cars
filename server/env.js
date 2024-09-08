import dotenv from 'dotenv';

dotenv.config();

const e = process.env;

export const SERVER_PORT = e.SERVER_PORT ?? 3099;

export const env = {
    DB_PASS,
    CLIENT_PORT,
    SERVER_PORT,
    NODE_ENV,
    DB_HOST,
    DB_USER,
    DB_DATABASE,
}

export default env;