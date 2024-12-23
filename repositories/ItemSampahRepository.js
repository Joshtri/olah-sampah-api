import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export class ItemSampahRepository {
  async getAll() {
    return await prisma.itemSampah.findMany({
      include: {
        kategoriSampah: true, // Menyertakan kategoriSampah yang berelasi
      },
    });
  }

  async getById(id) {
    return await prisma.itemSampah.findUnique({
      where: { id: id },
    });
  }

  async create(data) {
    return await prisma.itemSampah.create({
      data: data,
    });
  }

  async update(id, data) {
    return await prisma.itemSampah.update({
      where: { id: id },
      data: data,
    });
  }

  async delete(id) {
    return await prisma.itemSampah.delete({
      where: { id: id },
    });
  }

  async getByPengepulId(pengepulId) {
    return await prisma.itemSampah.findMany({
      where: { pengepulId },
      include: {
        kategoriSampah: true, // Include related KategoriSampah data
      },
    });
  }
}
