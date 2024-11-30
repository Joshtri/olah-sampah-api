import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export class KategoriSampahRepository {
  async getAll() {
    return await prisma.kategoriSampah.findMany();
  }

  async getById(id) {
    return await prisma.kategoriSampah.findUnique({
      where: { id: id },
    });
  }

  async create(data) {
    return await prisma.kategoriSampah.create({
      data: data,
    });
  }

  async update(id, data) {
    return await prisma.kategoriSampah.update({
      where: { id: id },
      data: data,
    });
  }

  async delete(id) {
    return await prisma.kategoriSampah.delete({
      where: { id: id },
    });
  }
}
