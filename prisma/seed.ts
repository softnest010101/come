// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 👉 Step 1: Add Role
  const role = await prisma.role.upsert({
    where: { name: 'Admin' },
    update: {},
    create: {
      name: 'Admin',
    },
  });

  // 👉 Step 2: Add User with Role
  const user = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      password: 'test1234', // ან დააყენე hashed პაროლი
      roleId: role.id,
    },
  });

  console.log('✅ Seed completed successfully');
  console.log('🧑‍💻 User created:', user.email);
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
