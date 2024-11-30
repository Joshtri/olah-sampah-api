import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export class PenggunaRepository {
  async getAll() {
    return await prisma.pengguna.findMany();
  }

  //tambah penggunaBaru
  async create(penggunaData){
    return await prisma.pengguna.create({
      data: penggunaData
    })
  }

  async getByEmail(email){
    return await prisma.pengguna.findUnique({
      where:{email},
    })
  }
}
