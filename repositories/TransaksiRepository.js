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

    // Method untuk membuat transaksi oleh user (anggota)
  async createTransaksiByUserId(userId, data) {
    try {
      // Membuat transaksi untuk user dengan anggotaId yang sudah ada
      const newTransaksi = await prisma.transaksi.create({
        data: {
          anggotaId: userId,  // Menyertakan ID user yang login
          totalTransaksi: data.totalTransaksi,
          itemTransaksi: {
            create: data.itemTransaksi, // Menyertakan itemTransaksi yang diterima
          },
        },
      });
      return newTransaksi;
    } catch (error) {
      console.error('Error creating transaksi by user ID:', error);
      throw new Error('Error creating transaksi');
    }
  }

   // Method untuk menghapus transaksi berdasarkan ID
  async deleteTransaksiById(id) {
    try {
      const transaksi = await prisma.transaksi.delete({
        where: { id: id },
      });
      return transaksi;
    } catch (error) {
      console.error('Error deleting transaksi:', error);
      throw new Error('Error deleting transaksi');
    }
  }

    // Fetch transaksi by userId (for your case)
  async getTransaksiByUserId(userId) {
    try {
      return await prisma.transaksi.findMany({
        where: { anggotaId: userId },
        include: {
          itemTransaksi: {
            include: {
              itemSampah: {
                include: {
                  kategoriSampah: true,
                },
              },
            },
          },
        },
      });
    } catch (error) {
      console.error('Error fetching transaksi by user ID:', error);
      throw new Error('Failed to fetch transaksi by user ID');
    }
  }
}
