import { PrismaClient } from "@prisma/client";
import { BoardingFac } from "../../types/boardingFac";

const prisma = new PrismaClient();

export const getAllBoardingFacs = async () => {
  return await prisma.boarding_fac.findMany();
};

export const createBoardingFac = async (
  boardingFac: BoardingFac,
): Promise<BoardingFac> => {
  return await prisma.boarding_fac.create({
    data: { ...boardingFac },
  });
};

export const getBoardingFacById = async (id: number) => {
  return await prisma.boarding_fac.findUnique({
    where: { id },
  });
};

export const updateBoardingFacById = async (
  id: number,
  boardingFac: BoardingFac,
) => {
  return await prisma.boarding_fac.update({
    where: { id },
    data: { ...boardingFac },
  });
};

export const deleteBoardingFacById = async (id: number) => {
  return await prisma.boarding_fac.delete({
    where: { id },
  });
};
