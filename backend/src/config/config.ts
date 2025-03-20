import dotenv from 'dotenv';

dotenv.config();

export const config = {
    port: process.env.PORT,
    dbUri: process.env.DB_URI as string,
    jwtSecret: process.env.JWT_SECRET as string
}