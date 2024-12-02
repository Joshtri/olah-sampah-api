import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export class PenggunaRepository {
  // Mendapatkan semua pengguna
  async getAll() {
    try {
      return await prisma.pengguna.findMany();
    } catch (error) {
      console.error('Error fetching all pengguna:', error);
      throw new Error('Unable to fetch pengguna');
    }
  }

  // Menambah pengguna baru
  async create(penggunaData) {
    try {
      return await prisma.pengguna.create({
        data: penggunaData
      });
    } catch (error) {
      console.error('Error creating pengguna:', error);
      throw new Error('Unable to create pengguna');
    }
  }

  // Mendapatkan pengguna berdasarkan email
  async getByEmail(email) {
    try {
      return await prisma.pengguna.findUnique({
        where: { email }
      });
    } catch (error) {
      console.error('Error fetching pengguna by email:', error);
      throw new Error('Unable to fetch pengguna by email');
    }
  }

  // Mendapatkan pengguna berdasarkan ID
  async getById(id) {
    try {
      return await prisma.pengguna.findUnique({
        where: { id }
      });
    } catch (error) {
      console.error('Error fetching pengguna by ID:', error);
      throw new Error('Unable to fetch pengguna by ID');
    }
  }

  // Update pengguna berdasarkan ID
  async update(id, penggunaData) {
    try {
      return await prisma.pengguna.update({
        where: { id },
        data: penggunaData
      });
    } catch (error) {
      console.error('Error updating pengguna:', error);
      throw new Error('Unable to update pengguna');
    }
  }

  // Hapus pengguna berdasarkan ID
  async delete(id) {
    try {
      return await prisma.pengguna.delete({
        where: { id }
      });
    } catch (error) {
      console.error('Error deleting pengguna:', error);
      throw new Error('Unable to delete pengguna');
    }
  }
}
