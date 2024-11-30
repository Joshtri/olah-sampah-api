import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export class ItemTransaksiRepository {
  async createItemTransaksi(data) {
    return await prisma.itemTransaksi.create({
      data: {
        transaksiId: data.transaksiId,
        itemSampahId: data.itemSampahId,
        kuantitas: data.kuantitas,
        hargaPerKg: data.hargaPerKg,
        totalHarga: data.totalHarga,
      },
    });
  }

  async getAllItemTransaksi() {
    return await prisma.itemTransaksi.findMany();
  }

  async getItemTransaksiById(id) {
    return await prisma.itemTransaksi.findUnique({
      where: { id: id },
    });
  }
}
