import { PrismaClient } from "@prisma/client";
import {
  Caregiver,
  CreateCaregiver,
  UpdateCaregiver,
} from "../../types/caregiver";

const prisma = new PrismaClient();

export async function getAllCaregivers(): Promise<Caregiver[]> {
  return await prisma.caregiver.findMany();
}

export async function getCaregiversByOwnerId(
  ownerId: number,
): Promise<Caregiver[]> {
  return await prisma.caregiver.findMany({
    where: { owner_id: ownerId },
  });
}

export async function getCaregiverById(id: number): Promise<Caregiver | null> {
  return await prisma.caregiver.findUnique({
    where: { id },
  });
}

export async function createCaregiver(
  data: CreateCaregiver,
): Promise<Caregiver> {
  return await prisma.caregiver.create({
    data,
  });
}

export async function updateCaregiver(
  id: number,
  data: UpdateCaregiver,
): Promise<Caregiver> {
  return await prisma.caregiver.update({
    where: { id },
    data,
  });
}

export async function deleteCaregiver(id: number): Promise<void> {
  await prisma.caregiver.delete({
    where: { id },
  });
}
