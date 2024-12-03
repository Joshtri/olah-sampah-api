// TransaksiService.js
import { TransaksiRepository } from '../repositories/TransaksiRepository.js';

export class TransaksiService {
  constructor() {
    this.transaksiRepository = new TransaksiRepository();
  }

  // Method untuk membuat transaksi
  async createTransaksi(data) {
    const { itemTransaksi, totalTransaksi, anggotaId } = data;

    // Memastikan bahwa itemTransaksi tidak kosong
    if (!Array.isArray(itemTransaksi) || itemTransaksi.length === 0) {
      throw new Error('Items transaksi tidak boleh kosong');
    }

    // Menghitung total transaksi berdasarkan item yang ada
    const total = itemTransaksi.reduce((sum, item) => {
      if (!item.totalHarga || !item.kuantitas) {
        throw new Error('Item harus memiliki totalHarga dan kuantitas');
      }
      return sum + item.totalHarga;
    }, 0);

    // Memastikan bahwa total transaksi sesuai dengan yang diberikan
    if (total !== totalTransaksi) {
      throw new Error('Total transaksi tidak sesuai dengan total harga item');
    }

    // Membuat transaksi baru melalui repository
    return await this.transaksiRepository.createTransaksi({
      anggotaId,
      totalTransaksi: total,
      itemTransaksi: itemTransaksi, // Pastikan itemTransaksi diteruskan dengan benar
    });
  }

  // Method untuk mengambil semua transaksi
  async getAllTransaksi() {
    return await this.transaksiRepository.getAllTransaksi();
  }

  // Method untuk mengambil transaksi berdasarkan ID
  async getTransaksiById(id) {
    return await this.transaksiRepository.getTransaksiById(id);
  }

   // Service method for deleting a transaction
   async deleteTransaksi(id) {
    try {
      return await this.transaksiRepository.deleteTransaksiById(id);
    } catch (error) {
      console.error('Service error:', error);
      throw new Error('Failed to delete transaksi');
    }
  }

   // Get transaksi by userId (for a specific user)
   async getTransaksiByUserId(userId) {
    try {
      return await this.transaksiRepository.getTransaksiByUserId(userId);
    } catch (error) {
      console.error('getTransaksiByUserId Service error:', error);
      throw new Error('Service Error: Failed to fetch transaksi for user');
    }
  }

    // Method untuk membuat transaksi oleh user (anggota)
    async createTransaksiByUserId(userId, data) {
      try {
        // Logika tambahan jika diperlukan sebelum menyimpan transaksi
        const transaksi = await this.transaksiRepository.createTransaksiByUserId(userId, data);
        return transaksi;
      } catch (error) {
        console.error('Error in transaksi service:', error);
        throw new Error('Error in creating transaksi');
      }
    }
}
