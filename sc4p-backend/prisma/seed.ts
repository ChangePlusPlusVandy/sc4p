import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  const users = [
    {
      name: "todd gates",
      email: "todd@gmail.com",
      address: "1234 Elm St",
      city: "Springfield",
      state: "IL",
      zip: "62701",
      home_phone: "217-555-1234",
      cell_phone: "217-555-5678",
      work_phone: "217-555-9876",
    },
    {
      name: "John Doe",
      email: "johndoe@example.com",
      address: "9999 Vanderbilt Pl",
      city: "Nasvhille",
      state: "TN",
      zip: "33333",
      home_phone: "123-456-7890",
      cell_phone: "987-654-3210",
      work_phone: "999-999-9999",
    },
    {
      name: "joseph quinn",
      email: "joseph@example.com",
      address: "200 East Colfax Avenue",
      city: "Denver",
      state: "CO",
      zip: "80203",
      home_phone: "303-555-1234",
      cell_phone: "303-555-5678",
      work_phone: "303-555-9876",
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
