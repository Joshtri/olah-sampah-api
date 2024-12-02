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
    if (!email) {
      throw new Error('Email is required');
    }
  
    return await prisma.anggota.findUnique({
      where: {
        email: email,
      },
    });
  }

  async getById(id) {
    try {
      const anggota = await prisma.anggota.findUnique({
        where: { id: id },  // Assuming 'id' is the primary key
        select: {
          nama: true,
          email: true,
          noTelepon: true,
          alamat: true,
          // Exclude kataSandi
        },
      });
      return anggota;
    } catch (error) {
      console.error('Error fetching anggota by ID:', error);
      throw new Error('Unable to fetch anggota');
    }
  }
  
}
