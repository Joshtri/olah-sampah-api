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

  async getByPengepulId(pengepulId) {
    return await prisma.transaksi.findMany({
      where: { pengepulId },
      include: {
        anggota: true,
        pengepul: true,
        itemTransaksi: {
          include: {
            itemSampah: true,
          },
        },
      },
    });
  }

  async getAll() {
    return await prisma.transaksi.findMany({
      include: {
        anggota: true,
        pengepul: true,
        itemTransaksi: {
          include: {
            itemSampah: true,
          },
        },
      },
    });
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
  // Method untuk membuat transaksi oleh user (anggota)
  async createTransaksiByUserId({ anggotaId, pengepulId, totalTransaksi, itemTransaksi }) {
    try {
      console.log('Creating transaksi with data:', {
        anggotaId,
        pengepulId,
        totalTransaksi,
        itemTransaksi,
      });
  
      return await prisma.transaksi.create({
        data: {
          anggotaId,
          pengepulId,
          totalTransaksi,
          itemTransaksi: {
            create: itemTransaksi, // Relasi itemTransaksi
          },
        },
        include: {
          itemTransaksi: true, // Pastikan itemTransaksi disertakan di response
        },
      });
    } catch (error) {
      console.error('Database error while creating transaksi:', error.message);
      throw new Error('Database error: Unable to create transaksi');
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
          pengepul:true,
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
  
  // Method untuk memperbarui status transaksi berdasarkan ID
  async updateStatusTransaksiById(id, newStatus) {
    try {
      return await prisma.transaksi.update({
        where: { id },
        data: { statusTransaksi: newStatus },
      });
    } catch (error) {
      console.error('Error updating status transaksi:', error);
      throw new Error('Database error: Unable to update status');
    }
  }

  async countTransaksi() {
    try {
      console.log('Executing countTransaksi...');
      const total = await prisma.transaksi.count();
      console.log('Total transaksi:', total);
      return total;
    } catch (error) {
      console.error('Error in countTransaksi repository:', error);
      throw new Error('Database error: Unable to count transactions');
    }
  }

  async countTransaksiByStatus(status) {
    try {
      console.log(`Executing countTransaksiByStatus for status: ${status}...`);
      const totalByStatus = await prisma.transaksi.count({
        where: {
          statusTransaksi: status, // Filter transaksi berdasarkan status
        },
      });
      console.log(`Total transaksi dengan status ${status}:`, totalByStatus);
      return totalByStatus;
    } catch (error) {
      console.error('Error in countTransaksiByStatus repository:', error);
      throw new Error('Database error: Unable to count transactions by status');
    }
  }


    // Menghitung total transaksi berdasarkan userId
  async countTransaksiByPengepulId(pengepulId) {
    try {
      return await prisma.transaksi.count({
        where: {
          pengepulId,
        },
      });
    } catch (error) {
      console.error('Error counting transactions by pengepulId:', error);
      throw new Error('Database error: Unable to count transactions by userId.');
    }
  }

  // // Menghitung transaksi berdasarkan status dan userId
  // async countTransaksiByStatusAndPengepulId(statusTransaksi, pengepulId) {
  //   try {
  //     return await prisma.transaksi.count({
  //       where: {
  //         pengepulId,
  //         statusTransaksi,
  //       },
  //     });
  //   } catch (error) {
  //     console.error('Error counting transactions by statusTransaksi and pengepulId:', error);
  //     throw new Error('Database error: Unable to count transactions by statusTransaksi and userId.');
  //   }
  // }

  // Menghitung transaksi berdasarkan filter
  async countTransaksiByStatusAndPengepulId(filter) {
    try {
      return await prisma.transaksi.count({ where: filter });
    } catch (error) {
      console.error('Error counting transactions by filter:', error);
      throw new Error('Database error: Unable to count transactions by filter.');
    }
  }

  // Mengambil transaksi berdasarkan statusTransaksi dan pengepulId
  async getTransaksiByStatusAndPengepulId(statusTransaksi, pengepulId, role) {
    try {
      const filter = {};

      if (statusTransaksi && statusTransaksi !== 'all') {
        filter.statusTransaksi = statusTransaksi;
      }

      if (role === 'pengepul' && pengepulId) {
        filter.pengepulId = pengepulId;
      }

      const transaksi = await prisma.transaksi.findMany({
        where: filter,
        include: {
          anggota: true,
          pengepul: true,
        },
      });

      return transaksi;
    } catch (error) {
      console.error('Error fetching transactions:', error);
      throw new Error('Database error: Unable to fetch transactions.');
    }
  }

  // async countTransaksiByStatus(status) {
  //   try {
  //     const total = await prisma.transaksi.count({
  //       where: {
  //         statusTransaksi: status,
  //       },
  //     });
  //     return total;
  //   } catch (error) {
  //     console.error('Error in countTransaksiByStatus:', error);
  //     throw new Error('Database error while counting transactions by status');
  //   }
  // }

  
  
  
  
}
