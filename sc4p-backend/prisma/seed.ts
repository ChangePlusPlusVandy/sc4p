import { PrismaClient } from "@prisma/client";
import { CreateUser, User } from "../src/types/user";
import { CreatePet, Pet } from "../src/types/pet";
import { CreateBoardingFac } from "../src/types/boardingFac";
import { CreateCaregiver } from "../src/types/caregiver";
import { CreateEmergencyContact } from "../src/types/emergencyContact";
import { CreateTrustFundInfo } from "../src/types/trustFundInfo";
import { CreateTrustee } from "../src/types/trustee";
import { CreateRemainingFunds } from "../src/types/remainingFunds";

const prisma = new PrismaClient();

const main = async () => {
  const users: CreateUser[] = [
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
      city: "Nashville",
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
    {
      name: "sarah parker",
      email: "sarah.parker@gmail.com",
      address: "567 Pine Road",
      city: "Austin",
      state: "TX",
      zip: "78701",
      home_phone: "512-555-1234",
      cell_phone: "512-555-5678",
      work_phone: "512-555-9876",
    },
    {
      name: "michael chen",
      email: "mchen@example.com",
      address: "890 Market Street",
      city: "San Francisco",
      state: "CA",
      zip: "94103",
      home_phone: "415-555-1234",
      cell_phone: "415-555-5678",
      work_phone: "415-555-9876",
    },
    {
      name: "emily rodriguez",
      email: "emily.r@example.com",
      address: "123 Lake Drive",
      city: "Chicago",
      state: "IL",
      zip: "60601",
      home_phone: "312-555-1234",
      cell_phone: "312-555-5678",
      work_phone: "312-555-9876",
    },
  ];

  const createdUsers: User[] = [];
  for (const user of users) {
    const createdUser = await prisma.user.create({
      data: user,
    });
    createdUsers.push(createdUser);
  }

  const emergencyContacts: CreateEmergencyContact[] = [
    {
      owner_id: createdUsers[0].id,
      name: "Jane Smith",
      address: "456 Oak Lane",
      city: "Springfield",
      state: "IL",
      zip: "62701",
      phone: "217-555-4321",
      email: "jane.smith@email.com",
    },
    {
      owner_id: createdUsers[1].id,
      name: "Robert Johnson",
      address: "789 Pine Street",
      city: "Nashville",
      state: "TN",
      zip: "33334",
      phone: "123-456-7891",
      email: "robert.j@email.com",
    },
    {
      owner_id: createdUsers[2].id,
      name: "Maria Garcia",
      address: "321 Cedar Street",
      city: "Denver",
      state: "CO",
      zip: "80202",
      phone: "303-555-4321",
      email: "maria.g@email.com",
    },
    {
      owner_id: createdUsers[3].id,
      name: "David Wilson",
      address: "456 Maple Court",
      city: "Austin",
      state: "TX",
      zip: "78702",
      phone: "512-555-4321",
      email: "david.w@email.com",
    },
  ];

  for (const contact of emergencyContacts) {
    await prisma.emergencyContact.create({
      data: contact,
    });
  }

  const pets: CreatePet[] = [
    {
      name: "Buddy",
      sex: "Male",
      date_of_birth: new Date("2018-05-01"),
      spayed_neutered: true,
      type: "Dog",
      microchip_id: "123456789",
      license_number: "AB1234",
      medical_history: "No known issues.",
      special_needs: "none",
      special_diet: "none",
      behavioral_habits: "Friendly and playful.",
      commands: "Sit, Stay, Come",
      daily_routine: "Walk in the morning, feed at 6 PM.",
      allowed_outside: true,
      sleep_location: "Inside",
      likes_children: true,
      home_access: "Free access",
      favorite_items: "Toys, Ball",
      flea_prevention: "Monthly treatment",
      allergies: "none",
      special_care_instructions: "none",
      medical_history_location: "Vet records at home",
      food_brand: "Brand A",
      food_amount: "2 cups",
      feeding_schedule: "Twice a day",
      medications: "none",
      emergency_supplies: "First aid kit",
      health_insurance_provider: "Provider A",
      health_insurance_policy_number: "POL123456",
      health_insurance_cost: 50.0,
      euthanasia_decision: "veterinarian",
      remains_care: "cremation",
      allocated_remains_fund: 200.0,
      owner_id: createdUsers[0].id,
    },
    {
      name: "Luna",
      sex: "Female",
      date_of_birth: new Date("2020-03-15"),
      spayed_neutered: true,
      type: "Cat",
      microchip_id: "987654321",
      license_number: "CD5678",
      medical_history: "Regular checkups, all vaccinations current",
      special_needs: "Requires quiet environment",
      special_diet: "Grain-free wet food",
      behavioral_habits: "Independent, loves high places",
      daily_routine: "Playtime at dawn and dusk",
      allowed_outside: false,
      sleep_location: "Cat tree",
      likes_children: false,
      home_access: "All areas except garage",
      favorite_items: "Laser pointer, catnip toys",
      flea_prevention: "Monthly topical treatment",
      allergies: "None known",
      euthanasia_decision: "veterinarian",
      remains_care: "cremation",
      owner_id: createdUsers[1].id,
    },
    {
      name: "Max",
      sex: "Male",
      date_of_birth: new Date("2019-08-15"),
      spayed_neutered: true,
      type: "Dog",
      microchip_id: "456789123",
      license_number: "EF9012",
      medical_history: "Hip dysplasia, managed with medication",
      special_needs: "Joint supplements daily",
      special_diet: "Senior dog formula",
      behavioral_habits: "Protective, needs proper introduction to strangers",
      commands: "Sit, Stay, Down, Roll Over",
      daily_routine: "Three walks daily, medication at breakfast",
      allowed_outside: true,
      sleep_location: "Dog bed in living room",
      likes_children: true,
      home_access: "All areas except bedrooms",
      favorite_items: "Tennis balls, rope toy",
      flea_prevention: "Monthly chewable",
      allergies: "Chicken",
      special_care_instructions: "Keep exercise moderate due to hip condition",
      medical_history_location: "File cabinet in office",
      food_brand: "Senior Care Plus",
      food_amount: "3 cups",
      feeding_schedule: "Morning and evening",
      medications: "Joint supplement daily",
      emergency_supplies: "Medicine box in kitchen",
      health_insurance_provider: "Pet Care Plus",
      health_insurance_policy_number: "PCP789012",
      health_insurance_cost: 65.0,
      euthanasia_decision: "veterinarian",
      remains_care: "burial",
      allocated_remains_fund: 300.0,
      owner_id: createdUsers[2].id,
    },
    {
      name: "Milo",
      sex: "Male",
      date_of_birth: new Date("2021-01-10"),
      spayed_neutered: true,
      type: "Cat",
      microchip_id: "789123456",
      license_number: "GH3456",
      medical_history: "All vaccinations up to date",
      special_needs: "None",
      special_diet: "Indoor cat formula",
      behavioral_habits: "Very social, loves attention",
      daily_routine: "Active at night, naps during day",
      allowed_outside: false,
      sleep_location: "Owner's bed",
      likes_children: true,
      home_access: "Full access",
      favorite_items: "Feather wand, cardboard boxes",
      flea_prevention: "Monthly topical",
      allergies: "None",
      euthanasia_decision: "caregiver",
      remains_care: "cremation",
      owner_id: createdUsers[3].id,
    },
  ];

  const createdPets: Pet[] = [];
  for (const pet of pets) {
    const createdPet = await prisma.pet.create({
      data: pet,
    });
    createdPets.push(createdPet);
  }

  const trustFundInfos: CreateTrustFundInfo[] = [
    {
      owner_id: createdUsers[0].id,
      funding_plan: "Monthly contributions and life insurance",
      bank_account_details: "Chase Bank - Account #XXXX1234",
      life_insurance_policy_number: "LIP123456",
      other_funding_details: "Annual contribution of $1000",
    },
    {
      owner_id: createdUsers[1].id,
      funding_plan: "Life insurance and lump sum",
      bank_account_details: "Bank of America - Account #XXXX5678",
      life_insurance_policy_number: "LIP789012",
      other_funding_details: "Monthly contribution of $100",
    },
    {
      owner_id: createdUsers[2].id,
      funding_plan: "Investment portfolio and savings",
      bank_account_details: "Wells Fargo - Account #XXXX9012",
      life_insurance_policy_number: "LIP345678",
      other_funding_details: "Quarterly contribution of $500",
    },
    {
      owner_id: createdUsers[3].id,
      funding_plan: "Trust fund and investments",
      bank_account_details: "US Bank - Account #XXXX3456",
      life_insurance_policy_number: "LIP901234",
      other_funding_details: "Annual contribution of $2000",
    },
  ];

  const createdTrustFundInfos: { id: number }[] = [];
  for (const trustFundInfo of trustFundInfos) {
    const created = await prisma.trustFundInfo.create({
      data: trustFundInfo,
    });
    createdTrustFundInfos.push(created);
  }

  const trustees: CreateTrustee[] = [
    {
      trust_fund_id: createdTrustFundInfos[0].id,
      trustee_name: "Michael Brown",
      address: "123 Trust Ave",
      city: "Springfield",
      state: "IL",
      zip: "62702",
      home_phone: "217-555-9999",
      cell_phone: "217-555-8888",
      emergency_phone: "217-555-7777",
      email: "michael.brown@email.com",
      allocated_amount: 5000.0,
    },
    {
      trust_fund_id: createdTrustFundInfos[1].id,
      trustee_name: "Sarah Williams",
      address: "456 Legal Lane",
      city: "Nashville",
      state: "TN",
      zip: "33335",
      home_phone: "123-555-7777",
      cell_phone: "987-555-6666",
      emergency_phone: "987-555-5555",
      email: "sarah.w@email.com",
      allocated_amount: 3000.0,
    },
    {
      trust_fund_id: createdTrustFundInfos[2].id,
      trustee_name: "James Anderson",
      address: "789 Trust Street",
      city: "Denver",
      state: "CO",
      zip: "80203",
      home_phone: "303-555-9999",
      cell_phone: "303-555-8888",
      emergency_phone: "303-555-7777",
      email: "james.a@email.com",
      allocated_amount: 4000.0,
    },
    {
      trust_fund_id: createdTrustFundInfos[3].id,
      trustee_name: "Emily Thompson",
      address: "321 Legal Road",
      city: "Austin",
      state: "TX",
      zip: "78703",
      home_phone: "512-555-7777",
      cell_phone: "512-555-6666",
      emergency_phone: "512-555-5555",
      email: "emily.t@email.com",
      allocated_amount: 6000.0,
    },
  ];

  for (const trustee of trustees) {
    await prisma.trustee.create({
      data: trustee,
    });
  }

  const remainingFunds: CreateRemainingFunds[] = [
    {
      owner_id: createdUsers[0].id,
      beneficiary_name: "Local Animal Shelter",
      allocation_percentage: 100.0,
    },
    {
      owner_id: createdUsers[1].id,
      beneficiary_name: "Pet Rescue Organization",
      allocation_percentage: 100.0,
    },
    {
      owner_id: createdUsers[2].id,
      beneficiary_name: "City Animal Sanctuary",
      allocation_percentage: 100.0,
    },
    {
      owner_id: createdUsers[3].id,
      beneficiary_name: "National Wildlife Foundation",
      allocation_percentage: 100.0,
    },
  ];

  for (const fund of remainingFunds) {
    await prisma.remainingFunds.create({
      data: fund,
    });
  }

  const boarding_facs: CreateBoardingFac[] = [
    {
      owner_id: createdUsers[0].id,
      contact_name: "Alice Johnson",
      daily_charge: 30.0,
      address: "123 Pet Lane",
      city: "Petville",
      state: "CA",
      zip: "90210",
      home_phone: "310-555-1234",
      cell_phone: "310-555-5678",
      email: "alice@example.com",
    },
    {
      owner_id: createdUsers[1].id,
      contact_name: "Bob Smith",
      daily_charge: 25.0,
      address: "456 Animal Ave",
      city: "Critter City",
      state: "TX",
      zip: "73301",
      home_phone: "512-555-1234",
      cell_phone: "512-555-5678",
      email: "bob@example.com",
    },
    {
      owner_id: createdUsers[2].id,
      contact_name: "Carol White",
      daily_charge: 35.0,
      address: "789 Furry Rd",
      city: "Petropolis",
      state: "FL",
      zip: "33101",
      home_phone: "305-555-1234",
      cell_phone: "305-555-5678",
      email: "carol@example.com",
    },
    {
      owner_id: createdUsers[3].id,
      contact_name: "Daniel Lee",
      daily_charge: 40.0,
      address: "123 Boarding Lane",
      city: "Seattle",
      state: "WA",
      zip: "98101",
      home_phone: "206-555-1234",
      cell_phone: "206-555-5678",
      email: "daniel@example.com",
    },
    {
      owner_id: createdUsers[4].id,
      contact_name: "Rachel Green",
      daily_charge: 45.0,
      address: "456 Pet Paradise Ave",
      city: "Portland",
      state: "OR",
      zip: "97201",
      home_phone: "503-555-1234",
      cell_phone: "503-555-5678",
      email: "rachel@example.com",
    },
    {
      owner_id: createdUsers[5].id,
      contact_name: "Thomas Martinez",
      daily_charge: 38.0,
      address: "789 Happy Tails Rd",
      city: "San Diego",
      state: "CA",
      zip: "92101",
      home_phone: "619-555-1234",
      cell_phone: "619-555-5678",
      email: "thomas@example.com",
    },
  ];

  for (const boarding_fac of boarding_facs) {
    await prisma.boardingFac.create({
      data: boarding_fac,
    });
  }

  const caregivers: CreateCaregiver[] = [
    {
      owner_id: createdUsers[0].id,
      name: "Sarah Wilson",
      care_type: "long-term",
      primary: true,
      accepted: true,
      address: "123 Caregiver St",
      city: "Springfield",
      state: "IL",
      zip: "62701",
      phone: "217-555-1234",
      email: "sarah.wilson@email.com",
    },
    {
      owner_id: createdUsers[0].id,
      name: "Mike Thompson",
      care_type: "short-term",
      primary: false,
      accepted: false,
      address: "456 Helper Ave",
      city: "Springfield",
      state: "IL",
      zip: "62702",
      phone: "217-555-5678",
      email: "mike.t@email.com",
    },
    {
      owner_id: createdUsers[1].id,
      name: "Emma Davis",
      care_type: "both",
      primary: true,
      accepted: true,
      address: "789 Care Lane",
      city: "Nashville",
      state: "TN",
      zip: "37201",
      phone: "615-555-9012",
      email: "emma.d@email.com",
    },
    {
      owner_id: createdUsers[2].id,
      name: "David Miller",
      care_type: "long-term",
      primary: true,
      accepted: true,
      address: "321 Pet Care Dr",
      city: "Denver",
      state: "CO",
      zip: "80201",
      phone: "303-555-3456",
      email: "david.m@email.com",
    },
    {
      owner_id: createdUsers[2].id,
      name: "Lisa Anderson",
      care_type: "both",
      primary: true,
      accepted: true,
      address: "654 Animal Ave",
      city: "Denver",
      state: "CO",
      zip: "80202",
      phone: "303-555-7890",
      email: "lisa.a@email.com",
    },
    {
      owner_id: createdUsers[2].id,
      name: "Robert Chen",
      care_type: "short-term",
      primary: false,
      accepted: false,
      address: "987 Helper St",
      city: "Denver",
      state: "CO",
      zip: "80203",
      phone: "303-555-1122",
      email: "robert.c@email.com",
    },
    {
      owner_id: createdUsers[3].id,
      name: "Jennifer Lopez",
      care_type: "long-term",
      primary: true,
      accepted: true,
      address: "741 Sitter Rd",
      city: "Austin",
      state: "TX",
      zip: "78701",
      phone: "512-555-3344",
      email: "jennifer.l@email.com",
    },
    {
      owner_id: createdUsers[4].id,
      name: "William Taylor",
      care_type: "both",
      primary: true,
      accepted: true,
      address: "852 Care Circle",
      city: "San Francisco",
      state: "CA",
      zip: "94101",
      phone: "415-555-5566",
      email: "william.t@email.com",
    },
  ];

  for (const caregiver of caregivers) {
    await prisma.caregiver.create({
      data: caregiver,
    });
  }

  const veterinarians = [
    {
      owner_id: createdUsers[0].id,
      name: "Dr. Smith",
      address: "456 Pet St",
      city: "Springfield",
      state: "IL",
      zip: "62701",
      cell_phone: "217-555-4321",
      office_phone: "217-555-8765",
      emergency_phone: "217-555-0000",
    },
    {
      owner_id: createdUsers[1].id,
      name: "Dr. Johnson",
      address: "789 Animal Ave",
      city: "Nashville",
      state: "TN",
      zip: "33333",
      cell_phone: "123-555-6789",
      office_phone: "123-555-9876",
      emergency_phone: "123-555-1111",
    },
    {
      owner_id: createdUsers[2].id,
      name: "Dr. Williams",
      address: "101 Vet Blvd",
      city: "Denver",
      state: "CO",
      zip: "80203",
      cell_phone: "303-555-4321",
      office_phone: "303-555-8765",
      emergency_phone: "303-555-0000",
    },
  ];

  for (const vet of veterinarians) {
    await prisma.veterinarian.create({
      data: vet,
    });
  }

  console.log("Seed data has been added successfully.");
};

main()
  .catch((e) => {
    console.error(e.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
