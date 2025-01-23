import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getStatistics(): Promise<any> {
  return await prisma.statistics.findMany();
}

export async function incrementFormSubmissionCount(): Promise<any> {
    return await prisma.statistics.update({
        where: { id: 1 },
        data: { user_form_submissions: { increment: 1 } },
    });
}