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

export const checkUniqueNic = async (database, nationalId, excludeId = null) => {
  if (!nationalId || typeof nationalId !== "string" || !nationalId.trim()) {
    return null;
  }
  const cleaned = nationalId.trim();

  let query = { nationalId: cleaned };

  if (excludeId) {
    let objId = null;
    try {
      objId = new ObjectId(excludeId);
    } catch (e) {}
    query = {
      nationalId: cleaned,
      _id: { $ne: objId || excludeId },
    };
  }

  const [inPatient, inStaff, inDoctor, inAdmin] = await Promise.all([
    database.collection("Patient").findOne(query),
    database.collection("Staff").findOne(query),
    database.collection("Doctor").findOne(query),
    database.collection("Admin").findOne(query),
  ]);

  if (inPatient) return "Patient";
  if (inStaff) return "Staff Member";
  if (inDoctor) return "Doctor";
  if (inAdmin) return "Admin";

  return null;
};

export { ObjectId };
