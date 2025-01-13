import { PrismaClient } from "@prisma/client";
import {
  CreateEmergencyContact,
  UpdateEmergencyContact,
} from "../../types/emergencyContact";

const prisma = new PrismaClient();

export const getEmergencyContactsByOwnerId = async (ownerId: number) => {
  return await prisma.emergencyContact.findMany({
    where: {
      owner_id: ownerId,
    },
  });
};

export const getEmergencyContactById = async (id: number) => {
  return await prisma.emergencyContact.findUnique({
    where: {
      id,
    },
  });
};

export const createEmergencyContact = async (data: CreateEmergencyContact) => {
  return await prisma.emergencyContact.create({
    data,
  });
};

export const updateEmergencyContact = async (
  id: number,
  data: UpdateEmergencyContact,
) => {
  return await prisma.emergencyContact.update({
    where: {
      id,
    },
    data,
  });
};

export const deleteEmergencyContact = async (id: number) => {
  return await prisma.emergencyContact.delete({
    where: {
      id,
    },
  });
};

export const getAllEmergencyContacts = async () => {
  return await prisma.emergencyContact.findMany();
};
