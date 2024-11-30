import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export class TransaksiRepository {
  async createTransaksi(data) {
    return await prisma.transaksi.create({
      data: {
        anggotaId: data.anggotaId,
        totalTransaksi: data.totalTransaksi,
        itemTransaksi: {
          create: data.itemTransaksi, // Menyertakan itemTransaksi terkait
        },
      },
    });
  }

  async getAllTransaksi() {
    return await prisma.transaksi.findMany({
      include: {
        itemTransaksi: true, // Menyertakan detail itemTransaksi
      },
    });
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
