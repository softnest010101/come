import { PrismaClient } from "@prisma/client";
import { hashSync } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = "admin@example.com";
  const adminPassword = "admin123";
  const hashedPassword = hashSync(adminPassword, 10);

  // Step 1: Add role "admin" (if not exists)
  const role = await prisma.role.upsert({
    where: { name: "admin" },
    update: {},
    create: { name: "admin" },
  });

  // Step 2: Check if user exists
  const existingUser = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (existingUser) {
    console.log("✅ Admin user already exists.");
    return;
  }

  // Step 3: Create admin user
  await prisma.user.create({
    data: {
      email: adminEmail,
      password: hashedPassword,
      roleId: role.id,
    },
  });

  console.log("🌱 Admin user created successfully.");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
