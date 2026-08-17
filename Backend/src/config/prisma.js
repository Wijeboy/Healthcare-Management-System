import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log("🟢 Database connected successfully! (MongoDB)");
  } catch (error) {
    console.error("🔴 Database connection failed!");
    console.error("Error details:", error.message);
  }
};

export default prisma;
