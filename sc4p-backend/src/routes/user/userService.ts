import { PrismaClient } from "@prisma/client";
import { CreateUser, UpdateUser, User } from "../../types/user";

const prisma = new PrismaClient();

export async function getAllUsers(): Promise<User[]> {
  return await prisma.user.findMany();
}

export async function createUser(user: CreateUser): Promise<User> {
  return await prisma.user.create({
    data: user,
  });
}

export async function getUserByEmail(email: string): Promise<User | null> {
  return await prisma.user.findUnique({
    where: { email },
  });
}

export async function getUserById(id: number): Promise<User | null> {
  return await prisma.user.findUnique({
    where: { id },
  });
}

export async function updateUser(
  email: string,
  data: UpdateUser,
): Promise<User> {
  return await prisma.user.update({
    where: { email },
    data,
  });
}

export async function updateUserById(
  id: number,
  data: UpdateUser,
): Promise<User> {
  return await prisma.user.update({
    where: { id },
    data,
  });
}

export const deleteUser = async (id: number): Promise<void> => {
  const prisma = new PrismaClient();

  try {
    await prisma.$transaction([
      prisma.pet.deleteMany({ where: { owner_id: id } }),
      prisma.emergencyContact.deleteMany({ where: { owner_id: id } }),
      prisma.boardingFac.deleteMany({ where: { owner_id: id } }),
      prisma.caregiver.deleteMany({ where: { owner_id: id } }),
      prisma.remainingFunds.deleteMany({ where: { owner_id: id } }),
      prisma.veterinarian.deleteMany({ where: { owner_id: id } }),
      prisma.trustee.deleteMany({
        where: { trust_fund: { owner_id: id } },
      }),
      prisma.trustFundInfo.deleteMany({ where: { owner_id: id } }),
      prisma.user.delete({ where: { id } }),
    ]);
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};
