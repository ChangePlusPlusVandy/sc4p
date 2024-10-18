import { PrismaClient } from "@prisma/client";
import { User } from "../../types/user";

const prisma = new PrismaClient();

export const createUser = async (user: User): Promise<User> => {
  return await prisma.user.create({
    data: { ...user },
  });
};

export const getAllUsers = async () => {
  return await prisma.user.findMany();
};

export const getUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

export const getUserById = async (id: number) => {
  return await prisma.user.findUnique({
    where: { id },
  });
};


export const updateUserById = async (id: number, user: User) => {
  return await prisma.user.update({
    where: { id },
    data: { ...user },
  });
};

export const updateUserByEmail = async (email: string, user: User) => {
    return await prisma.user.update({
        where: { email },
        data: { ...user },
    });
};

export const deleteUserById = async (id: number) => {
  return await prisma.user.delete({
    where: { id },
  });
};

export const deleteUserByEmail = async (email: string) => {
  return await prisma.user.delete({
    where: { email },
  });
};
