import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export const createCaregiver = async (caregiver: Prisma.CaregiverCreateInput) => {
  return await prisma.caregiver.create({
    data: caregiver,
  });
};

export const getAllCaregivers = async () => {
  return await prisma.caregiver.findMany();
};

export const getCaregiverById = async (owner_id: number, caregiver_id: number) => {
  return await prisma.caregiver.findUnique({
    where: {
      owner_id_caregiver_id: {
        owner_id,
        caregiver_id,
      },
    },
  });
};

export const updateCaregiverById = async (owner_id: number, caregiver_id: number, caregiver: Prisma.CaregiverUpdateInput) => {
  return await prisma.caregiver.update({
    where: {
      owner_id_caregiver_id: {
        owner_id,
        caregiver_id,
      },
    },
    data: caregiver,
  });
};

export const deleteCaregiverById = async (owner_id: number, caregiver_id: number) => {
  return await prisma.caregiver.delete({
    where: {
      owner_id_caregiver_id: {
        owner_id,
        caregiver_id,
      },
    },
  });
};