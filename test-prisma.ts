import { PrismaClient } from 'src/generated/client'; // Adjust the path if needed

const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany(); // Replace `user` with a valid model from your schema
  console.log(users);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
