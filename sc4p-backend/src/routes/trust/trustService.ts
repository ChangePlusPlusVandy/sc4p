import { PrismaClient } from "@prisma/client";
import {
  TrustFundInfo,
  CreateTrustFundInfo,
  UpdateTrustFundInfo,
  Trustee,
  CreateTrustee,
  UpdateTrustee,
} from "../../types/trust";

const prisma = new PrismaClient();

// Trust Fund Info operations
export async function getTrustFundInfoByOwnerId(
  ownerId: number,
): Promise<TrustFundInfo | null> {
  return await prisma.trustFundInfo.findUnique({
    where: { owner_id: ownerId },
  });
}

export async function createTrustFundInfo(
  data: CreateTrustFundInfo,
): Promise<TrustFundInfo> {
  return await prisma.trustFundInfo.create({
    data,
  });
}

export async function updateTrustFundInfo(
  ownerId: number,
  data: UpdateTrustFundInfo,
): Promise<TrustFundInfo> {
  return await prisma.trustFundInfo.update({
    where: { owner_id: ownerId },
    data,
  });
}

export async function deleteTrustFundInfo(ownerId: number): Promise<void> {
  await prisma.trustFundInfo.delete({
    where: { owner_id: ownerId },
  });
}

// Trustee operations
export async function getAllTrustees(): Promise<Trustee[]> {
  return await prisma.trustee.findMany();
}

export async function getTrusteesByTrustFundId(
  trustFundId: number,
): Promise<Trustee[]> {
  return await prisma.trustee.findMany({
    where: { trust_fund_id: trustFundId },
  });
}

export async function getTrusteeById(id: number): Promise<Trustee | null> {
  return await prisma.trustee.findUnique({
    where: { id },
  });
}

export async function createTrustee(data: CreateTrustee): Promise<Trustee> {
  return await prisma.trustee.create({
    data,
  });
}

export async function updateTrustee(
  id: number,
  data: UpdateTrustee,
): Promise<Trustee> {
  return await prisma.trustee.update({
    where: { id },
    data,
  });
}

export async function deleteTrustee(id: number): Promise<void> {
  await prisma.trustee.delete({
    where: { id },
  });
}
