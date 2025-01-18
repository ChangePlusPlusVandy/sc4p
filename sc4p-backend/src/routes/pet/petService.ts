import { PrismaClient } from "@prisma/client";
import { Pet, CreatePet, UpdatePet } from "../../types/pet";

const prisma = new PrismaClient();

export async function createPet(pet: CreatePet): Promise<Pet> {
  return await prisma.pet.create({
    data: pet,
  });
}

export async function getAllPets(): Promise<Pet[]> {
  return await prisma.pet.findMany();
}

export async function getPetById(id: number): Promise<Pet | null> {
  return await prisma.pet.findUnique({
    where: { id },
  });
}

export async function updatePetById(id: number, data: UpdatePet): Promise<Pet> {
  return await prisma.pet.update({
    where: { id },
    data,
  });
}

export async function deletePetById(id: number): Promise<Pet> {
  return await prisma.pet.delete({
    where: { id },
  });
}

export async function getPetsByOwnerId(ownerId: number): Promise<Pet[]> {
  return await prisma.pet.findMany({
    where: { owner_id: ownerId },
  });
}
