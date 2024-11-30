import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export class AnggotaRepository {
  async getAll() {
    return await prisma.anggota.findMany();
  }
}
