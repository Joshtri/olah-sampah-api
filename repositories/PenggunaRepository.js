import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export class PenggunaRepository {
  async getAll() {
    return await prisma.pengguna.findMany();
  }
}
