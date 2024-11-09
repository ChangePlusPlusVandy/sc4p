import { PrismaClient } from "@prisma/client";
import { Pet } from "../../types/pet";

const prisma = new PrismaClient();

export const createPet = async (pet: Pet): Promise<Pet> => {
  return await prisma.pet.create({
    data: { ...pet },
  });
};

export const getAllPets = async () => {
  return await prisma.pet.findMany();
};

export const getPetById = async (id: number) => {
  return await prisma.pet.findUnique({
    where: { id },
  });
};

export const updatePetById = async (id: number, pet: Pet) => {
  return await prisma.pet.update({
    where: { id },
    data: { ...pet },
  });
};

export const deletePetById = async (id: number) => {
  return await prisma.pet.delete({
    where: { id },
  });
};
