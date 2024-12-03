import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export class TransaksiRepository {
// transaksiRepository.js
  async createTransaksi(data) {
    try {
      const newTransaksi = await prisma.transaksi.create({
        data: {
          anggotaId: data.anggotaId,
          totalTransaksi: data.totalTransaksi,
          itemTransaksi: {
            create: data.itemTransaksi, // Menyertakan itemTransaksi terkait
          },
        },
      });
      return newTransaksi;
    } catch (error) {
      console.error('Error creating transaksi:', error);
      throw new Error('Error creating transaksi');
    }
  }




  async getAllTransaksi() {
    return await prisma.transaksi.findMany();
  }

  async getTransaksiById(id) {
    return await prisma.transaksi.findUnique({
      where: { id: id },
      include: {
        itemTransaksi: true, // Menyertakan detail itemTransaksi
      },
    });
  }
}
