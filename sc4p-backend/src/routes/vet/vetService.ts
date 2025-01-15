import { PrismaClient } from "@prisma/client";
import {
  Veterinarian,
  CreateVeterinarian,
  UpdateVeterinarian,
} from "../../types/veterinarian";

const prisma = new PrismaClient();

export async function getAllVeterinarians(): Promise<Veterinarian[]> {
  return await prisma.veterinarian.findMany();
}

export async function getVeterinariansByOwnerId(
  ownerId: number,
): Promise<Veterinarian[]> {
  return await prisma.veterinarian.findMany({
    where: { owner_id: ownerId },
  });
}

export async function getVeterinarianById(
  id: number,
): Promise<Veterinarian | null> {
  return await prisma.veterinarian.findUnique({
    where: { id },
  });
}

export async function CreateVeterinarian(
  data: CreateVeterinarian,
): Promise<Veterinarian> {
  return await prisma.veterinarian.create({
    data,
  });
}

export async function UpdateVeterinarian(
  id: number,
  data: UpdateVeterinarian,
): Promise<Veterinarian> {
  return await prisma.veterinarian.update({
    where: { id },
    data,
  });
}

export async function deleteVeterinarian(id: number): Promise<void> {
  await prisma.veterinarian.delete({
    where: { id },
  });
}
