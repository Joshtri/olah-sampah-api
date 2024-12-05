import { PrismaClient } from '@prisma/client';
import { ObjectId } from 'mongodb'; // Impor ObjectId untuk validasi dan konversi

const prisma = new PrismaClient();

export class KategoriSampahRepository {
  async getAll() {
    return await prisma.kategoriSampah.findMany();
  }
  
  // Mengambil kategori sampah berdasarkan ID
  async getById(id) {
    return await prisma.kategoriSampah.findUnique({
      where: {
        id: id.toString(), // Pastikan ID berbentuk string
      },
    });
  }

  // Membuat kategori sampah baru
  async create(data) {
    return await prisma.kategoriSampah.create({
      data: data,
    });
  }
}
