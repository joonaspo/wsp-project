import dotenv from 'dotenv';
dotenv.config();

if (!process.env.DB_URI) {
  throw new Error(
    'DB_URI environment variable is not defined. Please set it in your .env file.',
  );
}

export const PORT = process.env.PORT || 4000;

export const DB_URI = process.env.DB_URI as string;
