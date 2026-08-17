import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const mongoUri = process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/healthcare_management";

let client = null;
let db = null;

export const getDb = async () => {
  if (db) return db;
  client = new MongoClient(mongoUri);
  await client.connect();
  db = client.db();
  return db;
};

export { ObjectId };
