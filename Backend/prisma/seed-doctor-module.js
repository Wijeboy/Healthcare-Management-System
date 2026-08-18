/**
 * Seeds ONLY the three new Doctor Module collections (Availability,
 * Notification, ClinicalNote) against whichever Doctor/Patient documents
 * already exist in your database. Does not touch or duplicate anything
 * from prisma/seed.js — run that first if your DB is empty.
 *
 * Usage:  node prisma/seed-doctor-module.js
 */
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const mongoUri = process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/healthcare_management";

async function main() {
  console.log("🌱 Connecting to MongoDB for Doctor Module seeding...");
  const client = new MongoClient(mongoUri);
  await client.connect();
  const db = client.db();

  const doctorsCol = db.collection("Doctor");
  const patientsCol = db.collection("Patient");
  const availabilityCol = db.collection("Availability");
  const notificationCol = db.collection("Notification");
  const clinicalNoteCol = db.collection("ClinicalNote");

  const doctors = await doctorsCol.find({}).limit(2).toArray();
  const patients = await patientsCol.find({}).limit(4).toArray();

  if (doctors.length === 0 || patients.length === 0) {
    console.error("❌ No Doctor/Patient documents found. Run `npm run seed` first, then re-run this script.");
    await client.close();
    process.exit(1);
  }

  const doctor = doctors[0];
  const now = new Date();

  // Clean this script's own collections only (never touches Doctor/Patient/etc.)
  await availabilityCol.deleteMany({});
  await notificationCol.deleteMany({});
  await clinicalNoteCol.deleteMany({});

  // --- Availability overrides for the first doctor ---
  const overrides = [
    { day: "Monday", hour: 8, status: "Booked" },
    { day: "Monday", hour: 9, status: "Booked" },
    { day: "Monday", hour: 12, status: "Blocked" },
    { day: "Wednesday", hour: 8, status: "Booked" },
    { day: "Wednesday", hour: 10, status: "Booked" },
    { day: "Saturday", hour: 8, status: "Blocked" },
    { day: "Saturday", hour: 9, status: "Blocked" },
  ];
  await availabilityCol.insertMany(
    overrides.map((o) => ({ doctorId: doctor._id, ...o, updatedAt: now }))
  );
  console.log(`✅ Seeded ${overrides.length} availability overrides for Dr. ${doctor.fullName}.`);

  // --- Clinical notifications ---
  const notifications = [
    {
      group: "Clinical Actions & Reviews", badge: "Priority Review", badgeTint: "rose",
      icon: "file-warning", title: `Medical History Update Pending: ${patients[0]?.fullName || "Patient"}`,
      detail: [{ label: "Patient", value: patients[0]?.fullName || "Unknown" }, { label: "Type", value: "Post-Surgical History" }],
      patientId: patients[0]?._id ?? null, read: false,
    },
    {
      group: "Patient Management", badge: "New Appointment Request", badgeTint: "blue",
      icon: "calendar-plus", title: `Follow-up: ${patients[1]?.fullName || "Patient"}`,
      detail: [{ label: "Proposed", value: "Tomorrow, 10:30 AM" }],
      patientId: patients[1]?._id ?? null, read: false,
    },
    {
      group: "System & Records", badge: "System Notification", badgeTint: "emerald",
      icon: "check-circle-2", title: "Lab Result Integration Successful",
      description: "All pending results have been synced to patient records.",
      patientId: null, read: true,
    },
  ];
  await notificationCol.insertMany(
    notifications.map((n) => ({ doctorId: doctor._id, ...n, createdAt: now }))
  );
  console.log(`✅ Seeded ${notifications.length} notifications for Dr. ${doctor.fullName}.`);

  // --- One clinical note ---
  if (patients[0]) {
    await clinicalNoteCol.insertOne({
      doctorId: doctor._id,
      patientId: patients[0]._id,
      note: "Patient reports improved symptoms since last visit. Continue current medication.",
      createdAt: now,
      updatedAt: now,
    });
    console.log(`✅ Seeded 1 clinical note for ${patients[0].fullName}.`);
  }

  console.log("\n🌱 Doctor Module seed complete.");
  await client.close();
}

main().catch((err) => {
  console.error("💥 Seed failed:", err);
  process.exit(1);
});
