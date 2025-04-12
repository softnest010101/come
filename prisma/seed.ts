import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = bcrypt.hashSync('admin123', 10); // ✅ Hashes 'admin123'

  // Seed the admin role
  await prisma.role.upsert({
    where: { name: 'admin' },
    update: {},
    create: { name: 'admin' },
  });

  // Seed the admin user
  await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: { password: hashedPassword }, // ✅ Updates the password
    create: {
      email: 'admin@example.com',
      password: hashedPassword,
      role: {
        connect: { name: 'admin' }, // ✅ Connects to the admin role
      },
    },
  });

  console.log('✅ Seed complete');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
