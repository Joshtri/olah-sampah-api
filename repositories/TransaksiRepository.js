import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export class TransaksiRepository {
  // Method untuk membuat transaksi
  async createTransaksi(data) {
    try {
      // Membuat transaksi dan menyertakan itemTransaksi di dalamnya
      const newTransaksi = await prisma.transaksi.create({
        data: {
          anggotaId: data.anggotaId,
          totalTransaksi: data.totalTransaksi,
          itemTransaksi: {
            create: data.itemTransaksi, // Menyertakan itemTransaksi yang diterima
          },
        },
      });
      return newTransaksi;
    } catch (error) {
      console.error('Error creating transaksi:', error);
      throw new Error('Error creating transaksi');
    }
  }

  // Method untuk mengambil semua transaksi
  async getAllTransaksi() {
    try {
      const transaksi = await prisma.transaksi.findMany({
        include: {
          anggota: true, // Menyertakan data anggota yang berelasi
          itemTransaksi: {
            include: {
              itemSampah: {
                include: {
                  kategoriSampah: true, // Menyertakan kategoriSampah yang berelasi dengan ItemSampah
                }
              }
            }
          }
        }
      });

      console.log('Fetched Transaksi:', transaksi);  // Debugging

      return transaksi;
    } catch (error) {
      console.error('Error fetching transaksi:', error);
      throw new Error('Failed to fetch transaksi data');
    }
  }

  // Method untuk mendapatkan transaksi berdasarkan ID
  async getTransaksiById(id) {
    try {
      return await prisma.transaksi.findUnique({
        where: { id: id },
        include: {
          anggota: true,
          itemTransaksi: {
            include: {
              itemSampah: {
                include: {
                  kategoriSampah: true,
                }
              }
            }
          }
        },
      });
    } catch (error) {
      console.error('Error fetching transaksi by ID:', error);
      throw new Error('Failed to fetch transaksi by ID');
    }
  }
}
