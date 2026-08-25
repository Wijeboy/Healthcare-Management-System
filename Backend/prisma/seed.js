import { MongoClient, ObjectId } from "mongodb";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const mongoUri = process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/healthcare_management";

async function main() {
  console.log("🌱 Connecting to MongoDB for seeding...");
  const client = new MongoClient(mongoUri);
  await client.connect();

  const db = client.db();
  console.log("Connected to database:", db.databaseName);

  // Collections
  const usersCol = db.collection("User");
  const adminsCol = db.collection("Admin");
  const doctorsCol = db.collection("Doctor");
  const patientsCol = db.collection("Patient");
  const staffCol = db.collection("Staff");
  const appointmentsCol = db.collection("Appointment");
  const medicalRecordsCol = db.collection("MedicalRecord");
  const prescriptionsCol = db.collection("Prescription");
  const paymentsCol = db.collection("Payment");
  const settingsCol = db.collection("SystemSetting");

  // Clean existing collections
  await usersCol.deleteMany({});
  await adminsCol.deleteMany({});
  await doctorsCol.deleteMany({});
  await patientsCol.deleteMany({});
  await staffCol.deleteMany({});
  await appointmentsCol.deleteMany({});
  await medicalRecordsCol.deleteMany({});
  await prescriptionsCol.deleteMany({});
  await paymentsCol.deleteMany({});
  await settingsCol.deleteMany({});
  console.log("🧹 Cleaned all existing collection data.");

  const now = new Date();

  // Password Hashes
  const adminPasswordHash = await bcrypt.hash("Admin@123456", 10);
  const doctorPasswordHash = await bcrypt.hash("Doctor@123456", 10);
  const patientPasswordHash = await bcrypt.hash("Patient@123456", 10);
  const staffPasswordHash = await bcrypt.hash("Staff@123456", 10);

  // 1. Admin
  const adminUserId = new ObjectId();
  await usersCol.insertOne({
    _id: adminUserId,
    email: "admin@medimate.com",
    password: adminPasswordHash,
    role: "Admin",
    status: "Active",
    createdAt: now,
    updatedAt: now,
  });

  await adminsCol.insertOne({
    _id: new ObjectId(),
    userId: adminUserId.toString(), // or ObjectId depending on schema
    fullName: "System Admin",
    phone: "+1 555-0100",
    createdAt: now,
    updatedAt: now,
  });
  console.log("✅ Admin user created: admin@medimate.com");

  // 2. Doctors
  const doctor1UserId = new ObjectId();
  const doctor1ProfileId = new ObjectId();
  await usersCol.insertOne({
    _id: doctor1UserId,
    email: "dr.smith@medimate.com",
    password: doctorPasswordHash,
    role: "Doctor",
    status: "Active",
    createdAt: now,
    updatedAt: now,
  });

  await doctorsCol.insertOne({
    _id: doctor1ProfileId,
    userId: doctor1UserId.toString(),
    fullName: "Dr. Sarah Smith",
    phone: "+1 555-0101",
    dob: "1980-05-14",
    gender: "Female",
    address: "123 Healthcare Way, Metro City",
    licenceNumber: "MD-98765",
    department: "Cardiology",
    specialization: "Interventional Cardiology",
    qualification: "MBBS, MD, FACC",
    experience: "12 Years",
    bio: "Experienced cardiologist specializing in minimally invasive cardiac procedures.",
    startTime: "09:00",
    endTime: "17:00",
    workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    consultationDuration: "30 mins",
    availability: "Available",
    status: "Active",
    createdAt: now,
    updatedAt: now,
  });

  const doctor2UserId = new ObjectId();
  const doctor2ProfileId = new ObjectId();
  await usersCol.insertOne({
    _id: doctor2UserId,
    email: "dr.johnson@medimate.com",
    password: doctorPasswordHash,
    role: "Doctor",
    status: "Active",
    createdAt: now,
    updatedAt: now,
  });

  await doctorsCol.insertOne({
    _id: doctor2ProfileId,
    userId: doctor2UserId.toString(),
    fullName: "Dr. Robert Johnson",
    phone: "+1 555-0102",
    dob: "1975-09-22",
    gender: "Male",
    address: "456 Wellness Blvd, Metro City",
    licenceNumber: "MD-54321",
    department: "Neurology",
    specialization: "Clinical Neurology",
    qualification: "MBBS, DM (Neurology)",
    experience: "15 Years",
    bio: "Expert neurologist committed to treating neurodegenerative disorders.",
    startTime: "10:00",
    endTime: "16:00",
    workingDays: ["Monday", "Wednesday", "Friday"],
    consultationDuration: "45 mins",
    availability: "Available",
    status: "Active",
    createdAt: now,
    updatedAt: now,
  });
  console.log("✅ Doctor users created: dr.smith@medimate.com, dr.johnson@medimate.com");

  // 3. Patients
  const patient1UserId = new ObjectId();
  const patient1ProfileId = new ObjectId();
  await usersCol.insertOne({
    _id: patient1UserId,
    email: "john.doe@gmail.com",
    password: patientPasswordHash,
    role: "Patient",
    status: "Active",
    createdAt: now,
    updatedAt: now,
  });

  await patientsCol.insertOne({
    _id: patient1ProfileId,
    userId: patient1UserId.toString(),
    fullName: "John Doe",
    phone: "+1 555-0201",
    dob: "1990-03-15",
    bloodGroup: "O+",
    age: 36,
    gender: "Male",
    address: "789 Pine Street, Metro City",
    allergies: "Penicillin",
    existingConditions: "Hypertension",
    currentMedications: "Lisinopril 10mg",
    medicalNotes: "Regular checkups every 6 months.",
    emergencyName: "Jane Doe",
    emergencyRelationship: "Spouse",
    emergencyPhone: "+1 555-0299",
    emergencyEmail: "jane.doe@gmail.com",
    status: "Active",
    createdAt: now,
    updatedAt: now,
  });

  const patient2UserId = new ObjectId();
  const patient2ProfileId = new ObjectId();
  await usersCol.insertOne({
    _id: patient2UserId,
    email: "emily.white@gmail.com",
    password: patientPasswordHash,
    role: "Patient",
    status: "Active",
    createdAt: now,
    updatedAt: now,
  });

  await patientsCol.insertOne({
    _id: patient2ProfileId,
    userId: patient2UserId.toString(),
    fullName: "Emily White",
    phone: "+1 555-0202",
    dob: "1995-07-20",
    bloodGroup: "A+",
    age: 31,
    gender: "Female",
    address: "321 Oak Lane, Metro City",
    allergies: "None",
    existingConditions: "Asthma",
    currentMedications: "Albuterol Inhaler",
    medicalNotes: "Sensitive to seasonal pollen.",
    emergencyName: "Mark White",
    emergencyRelationship: "Brother",
    emergencyPhone: "+1 555-0298",
    emergencyEmail: "mark.white@gmail.com",
    status: "Active",
    createdAt: now,
    updatedAt: now,
  });
  console.log("✅ Patient users created: john.doe@gmail.com, emily.white@gmail.com");

  // 4. Staff
  const staff1UserId = new ObjectId();
  await usersCol.insertOne({
    _id: staff1UserId,
    email: "nurse.clara@medimate.com",
    password: staffPasswordHash,
    role: "Staff",
    status: "Active",
    createdAt: now,
    updatedAt: now,
  });

  await staffCol.insertOne({
    _id: new ObjectId(),
    userId: staff1UserId.toString(),
    fullName: "Clara Oswald",
    phone: "+1 555-0301",
    email: "nurse.clara@medimate.com",
    dob: "1992-11-05",
    age: 33,
    gender: "Female",
    nationalId: "NID-8839201",
    address: "555 Cedar Ave, Metro City",
    department: "Nursing",
    role: "Head Nurse",
    employeeStatus: "Active",
    accessLevel: "Standard",
    shift: "Day Shift",
    joiningDate: "2021-06-01",
    permissions: ["View Patients", "Update Records"],
    notes: "Assigned to Intensive Care Unit.",
    createdAt: now,
    updatedAt: now,
  });

  const staff2UserId = new ObjectId();
  await usersCol.insertOne({
    _id: staff2UserId,
    email: "rec.james@medimate.com",
    password: staffPasswordHash,
    role: "Staff",
    status: "Active",
    createdAt: now,
    updatedAt: now,
  });

  await staffCol.insertOne({
    _id: new ObjectId(),
    userId: staff2UserId.toString(),
    fullName: "James Wilson",
    phone: "+1 555-0302",
    email: "rec.james@medimate.com",
    dob: "1988-04-12",
    age: 38,
    gender: "Male",
    nationalId: "NID-1102938",
    address: "777 Elm St, Metro City",
    department: "Reception",
    role: "Front Desk Officer",
    employeeStatus: "Active",
    accessLevel: "Standard",
    shift: "Morning Shift",
    joiningDate: "2022-01-15",
    permissions: ["Register Patients", "Schedule Appointments"],
    notes: "Handles patient check-in and queries.",
    createdAt: now,
    updatedAt: now,
  });
  console.log("✅ Staff users created: nurse.clara@medimate.com, rec.james@medimate.com");

  // 5. Appointments
  await appointmentsCol.insertMany([
    {
      _id: new ObjectId(),
      patientId: patient1ProfileId.toString(),
      doctorId: doctor1ProfileId.toString(),
      date: new Date("2026-08-20T10:00:00Z"),
      time: "10:00 AM",
      status: "Confirmed",
      createdAt: now,
      updatedAt: now,
    },
    {
      _id: new ObjectId(),
      patientId: patient2ProfileId.toString(),
      doctorId: doctor2ProfileId.toString(),
      date: new Date("2026-08-21T11:30:00Z"),
      time: "11:30 AM",
      status: "Pending",
      createdAt: now,
      updatedAt: now,
    },
  ]);
  console.log("✅ Sample appointments created.");

  // 6. Medical Records
  await medicalRecordsCol.insertOne({
    _id: new ObjectId(),
    patientId: patient1ProfileId.toString(),
    doctorId: doctor1ProfileId.toString(),
    diagnosis: "Stage 1 Essential Hypertension",
    treatment: "Prescribed Lisinopril 10mg daily and recommended low-sodium diet.",
    labReport: "Blood Pressure: 138/88 mmHg. Lipid panel within normal range.",
    createdAt: now,
    updatedAt: now,
  });
  console.log("✅ Sample medical record created.");

  // 7. Prescriptions
  await prescriptionsCol.insertOne({
    _id: new ObjectId(),
    patientId: patient1ProfileId.toString(),
    doctorId: doctor1ProfileId.toString(),
    medicines: ["Lisinopril 10mg - Once Daily", "Aspirin 81mg - Once Daily"],
    instructions: "Take once daily in the morning with a full glass of water.",
    createdAt: now,
    updatedAt: now,
  });
  console.log("✅ Sample prescription created.");

  // 8. Payments
  await paymentsCol.insertOne({
    _id: new ObjectId(),
    patientId: patient1ProfileId.toString(),
    amount: 150.00,
    paymentMethod: "Credit Card",
    paymentStatus: "Paid",
    invoiceNumber: "INV-2026-001",
    createdAt: now,
    updatedAt: now,
  });
  console.log("✅ Sample payment created.");

  // 9. System Settings
  await settingsCol.insertMany([
    { _id: new ObjectId(), key: "hospitalName", value: "City Hospital & Health Center", createdAt: now, updatedAt: now },
    { _id: new ObjectId(), key: "contactEmail", value: "support@cityhospital.com", createdAt: now, updatedAt: now },
    { _id: new ObjectId(), key: "contactPhone", value: "+1 800-555-CITY", createdAt: now, updatedAt: now },
    { _id: new ObjectId(), key: "emergencyHotline", value: "911 / +1 800-999-9999", createdAt: now, updatedAt: now },
    { _id: new ObjectId(), key: "currency", value: "USD ($)", createdAt: now, updatedAt: now },
    { _id: new ObjectId(), key: "timezone", value: "EST (UTC-5)", createdAt: now, updatedAt: now },
  ]);
  console.log("✅ System settings initialized.");

  await client.close();

  console.log("\n🎉 Database Seeding Completed Successfully!");
  console.log("\n🔑 Test Login Credentials:");
  console.log("-------------------------------------------------------");
  console.log("Role    | Email                    | Password");
  console.log("-------------------------------------------------------");
  console.log("Admin   | admin@medimate.com       | Admin@123456");
  console.log("Doctor  | dr.smith@medimate.com    | Doctor@123456");
  console.log("Doctor  | dr.johnson@medimate.com  | Doctor@123456");
  console.log("Patient | john.doe@gmail.com       | Patient@123456");
  console.log("Patient | emily.white@gmail.com    | Patient@123456");
  console.log("Staff   | nurse.clara@medimate.com | Staff@123456");
  console.log("Staff   | rec.james@medimate.com   | Staff@123456");
  console.log("-------------------------------------------------------");
}

main().catch((err) => {
  console.error("❌ Seeding Failed:", err);
  process.exit(1);
});
