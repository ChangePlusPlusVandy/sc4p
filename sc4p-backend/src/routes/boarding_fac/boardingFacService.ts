import { PrismaClient } from "@prisma/client";
import {
  BoardingFac,
  CreateBoardingFac,
  UpdateBoardingFac,
} from "../../types/boardingFac";

const prisma = new PrismaClient();

export async function getAllBoardingFacs(): Promise<BoardingFac[]> {
  return await prisma.boardingFac.findMany();
}

export async function getBoardingFacById(
  id: number,
): Promise<BoardingFac | null> {
  return await prisma.boardingFac.findUnique({
    where: { id },
  });
}

export async function getBoardingFacsByOwnerId(
  owner_id: number,
): Promise<BoardingFac[]> {
  return await prisma.boardingFac.findMany({
    where: { owner_id },
  });
}

export async function createBoardingFac(
  boardingFac: CreateBoardingFac,
): Promise<BoardingFac> {
  return await prisma.boardingFac.create({
    data: boardingFac,
  });
}

export async function updateBoardingFac(
  id: number,
  data: UpdateBoardingFac,
): Promise<BoardingFac> {
  return await prisma.boardingFac.update({
    where: { id },
    data,
  });
}

export async function deleteBoardingFac(id: number): Promise<void> {
  await prisma.boardingFac.delete({
    where: { id },
  });
}
