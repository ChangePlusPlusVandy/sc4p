import { PrismaClient, type Prisma } from "@prisma/client";
import { type EmergencyContact } from "../../types/emergencyContacts";

const prisma = new PrismaClient();

export type EmergencyContactCreateInput = Omit<
  EmergencyContact,
  "id" | "createdAt"
>;

export type EmergencyContactUpdateInput = Partial<EmergencyContactCreateInput>;

export const createContact = async (
  contact: EmergencyContactCreateInput,
): Promise<EmergencyContact> => {
  try {
    return await prisma.emergencyContact.create({
      data: contact,
    });
  } catch (error) {
    console.error("Error creating contact:", error);
    throw new Error("Failed to create contact.");
  }
};

export const getAllContacts = async (): Promise<EmergencyContact[]> => {
  try {
    return await prisma.emergencyContact.findMany();
  } catch (error) {
    console.error("Error fetching contacts:", error);
    throw new Error("Failed to fetch contacts.");
  }
};

export const getContactById = async (
  id: number,
): Promise<EmergencyContact | null> => {
  try {
    return await prisma.emergencyContact.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error("Error fetching contact by ID:", error);
    throw new Error("Failed to fetch contact.");
  }
};

export const updateContactById = async (
  id: number,
  contact: EmergencyContactUpdateInput,
): Promise<EmergencyContact> => {
  try {
    return await prisma.emergencyContact.update({
      where: { id },
      data: contact,
    });
  } catch (error) {
    console.error("Error updating contact:", error);
    throw new Error("Failed to update contact.");
  }
};

export const deleteContactById = async (id: number): Promise<void> => {
  try {
    await prisma.emergencyContact.delete({
      where: { id },
    });
  } catch (error) {
    console.error("Error deleting contact:", error);
    throw new Error("Failed to delete contact.");
  }
};