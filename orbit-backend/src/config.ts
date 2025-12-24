import dotenv from "dotenv";

dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";
export const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/Orbit";
export const CORS_ORIGIN = process.env.CORS_ORIGIN || "*";
export const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;