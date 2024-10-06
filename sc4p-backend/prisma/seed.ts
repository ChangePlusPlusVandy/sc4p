import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  const users = [
    {
      name: "todd gates",
      email: "todd@gmail.com",
    },
    {
      name: "John Doe",
      email: "johndoe@example.com",
    },
    {
      name: "bill keys",
      email: "bkeys@example.com",
    },
  ];

  for (const user of users) {
    await prisma.user.create({
      data: user,
    });
  }

  console.log("Seed data has been added.");
};

main()
  .catch((e) => {
    console.error(e.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
