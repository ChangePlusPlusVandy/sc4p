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

  const pets = [
    {
      name: "Buddy",
      sex: "Male",
      dateOfBirth: new Date("2018-05-01"),
      spayedNeutered: true,
      type: "Dog",
      microchipId: "123456789",
      licenseNumber: "AB1234",
      medicalHistory: "No known issues.",
      specialNeeds: "none",
      specialDiet: "none",
      behavioralHabits: "Friendly and playful.",
      commands: "Sit, Stay, Come",
      dailyRoutine: "Walk in the morning, feed at 6 PM.",
      allowedOutside: true,
      sleepLocation: "Inside",
      likesChildren: true,
      homeAccess: "Free access",
      favoriteItems: "Toys, Ball",
      fleaPrevention: "Monthly treatment",
      allergies: "none",
      specialCareInstructions: "none",
      medicalHistoryLocation: "Vet records at home",
      foodBrand: "Brand A",
      foodAmount: "2 cups",
      feedingSchedule: "Twice a day",
      medications: "none",
      emergencySupplies: "First aid kit",
      healthInsuranceProvider: "Provider A",
      healthInsurancePolicyNumber: "POL123456",
      healthInsuranceCost: 50.0,
      euthanasiaDecision: "Owner's decision",
      remainsCare: "Cremation",
      allocatedRemainsFund: 200.0,
    },
    {
      name: "Whiskers",
      sex: "Female",
      dateOfBirth: new Date("2019-08-15"),
      spayedNeutered: true,
      type: "Cat",
      microchipId: "987654321",
      licenseNumber: "CD5678",
      medicalHistory: "Allergic to certain foods.",
      specialNeeds: "Requires special diet.",
      specialDiet: "Grain-free",
      behavioralHabits: "Shy but affectionate.",
      commands: "Come, No",
      dailyRoutine: "Loves to nap and play.",
      allowedOutside: false,
      sleepLocation: "On the bed",
      likesChildren: true,
      homeAccess: "Limited access",
      favoriteItems: "Scratching post, Ball",
      fleaPrevention: "Monthly treatment",
      allergies: "Chicken",
      specialCareInstructions: "Avoid chicken in diet.",
      medicalHistoryLocation: "Vet records at home",
      foodBrand: "Brand B",
      foodAmount: "1 cup",
      feedingSchedule: "Once a day",
      medications: "none",
      emergencySupplies: "First aid kit",
      healthInsuranceProvider: "Provider B",
      healthInsurancePolicyNumber: "POL987654",
      healthInsuranceCost: 40.0,
      euthanasiaDecision: "Owner's decision",
      remainsCare: "Burial",
      allocatedRemainsFund: 150.0,
    },
  ];
  /*
  for (const user of users) {
    await prisma.user.create({
      data: user,
    });
  }
*/
  for (const pet of pets) {
    await prisma.pet.create({
      data: pet,
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
