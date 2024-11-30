import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export class AnggotaRepository {
  async getAll() {
    return await prisma.anggota.findMany();
  }

    // Menambahkan anggota baru
  async create(anggotaData) {
    return await prisma.anggota.create({
      data: anggotaData,
    });
  }

  // Mendapatkan anggota berdasarkan email
  async getByEmail(email) {
    return await prisma.anggota.findUnique({
      where: { email },
    });
  }
}
