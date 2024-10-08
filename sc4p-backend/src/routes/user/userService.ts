import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllUsers = async () => {
  return await prisma.user.findMany();
};

export const getUserById = async (id: number) => {
  return await prisma.user.findUnique({
    where: { id },
  });
};

export const createUser = async (name: string, email: string) => {
  return await prisma.user.create({
    data: { name, email },
  });
};

export const updateUser = async (id: number, name: string, email: string) => {
  return await prisma.user.update({
    where: { id },
    data: { name, email },
  });
};

export const deleteUser = async (id: number) => {
  return await prisma.user.delete({
    where: { id },
  });
};
