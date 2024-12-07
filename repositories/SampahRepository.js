import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class SampahRepository {
  // Metode untuk menghitung total sampah (dalam kilogram)
  static async hitungTotalSampah() {
    try {
      const totalSampah = await prisma.itemTransaksi.aggregate({
        _sum: {
          kuantitas: true, // Menjumlahkan semua kuantitas sampah
        },
      });

      return totalSampah._sum.kuantitas || 0; // Jika tidak ada data, kembalikan 0
    } catch (error) {
      console.error('Kesalahan saat menghitung total sampah:', error);
      throw new Error('Gagal menghitung total sampah');
    }
  }

  // Metode untuk menghitung total sampah per pengepul
  static async hitungSampahPerPengepul(pengepulId) {
    try {
      const totalSampah = await prisma.itemTransaksi.aggregate({
        _sum: {
          kuantitas: true,
        },
        where: {
          itemSampah: {
            pengepulId: pengepulId, // Filter berdasarkan ID pengepul
          },
        },
      });

      return totalSampah._sum.kuantitas || 0;
    } catch (error) {
      console.error('Kesalahan saat menghitung sampah per pengepul:', error);
      throw new Error('Gagal menghitung sampah per pengepul');
    }
  }
}
