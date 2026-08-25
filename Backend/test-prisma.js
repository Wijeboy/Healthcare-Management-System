import { PrismaClient } from '@prisma/client';
import "dotenv/config";
try {
  const prisma = new PrismaClient({
    url: process.env.DATABASE_URL
  });
  console.log("Success");
} catch(e) {
  console.error(e);
}
