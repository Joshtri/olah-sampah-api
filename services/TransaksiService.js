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
  // async getAllTransaksi() {
  //   return await this.transaksiRepository.getAllTransaksi();
  // }

  async getAllTransaksi(pengepulId = null) {
    if (pengepulId) {
      return await this.transaksiRepository.getByPengepulId(pengepulId);
    }
    return await this.transaksiRepository.getAll();
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

  // Method untuk membuat transaksi oleh user (anggota) dengan userId
  async createTransaksiByUserId(userId, data) {
    const { pengepulId, itemTransaksi, totalTransaksi } = data;
  
    if (!userId) throw new Error('anggotaId tidak ditemukan');
    if (!pengepulId) throw new Error('pengepulId tidak boleh kosong');
    if (!Array.isArray(itemTransaksi) || itemTransaksi.length === 0) {
      throw new Error('Items transaksi tidak boleh kosong');
    }
  
    const total = itemTransaksi.reduce((sum, item) => {
      if (!item.totalHarga || !item.kuantitas) {
        throw new Error('Item harus memiliki totalHarga dan kuantitas');
      }
      return sum + item.totalHarga;
    }, 0);
  
    if (total !== totalTransaksi) {
      throw new Error('Total transaksi tidak sesuai dengan total harga item');
    }
  
    return await this.transaksiRepository.createTransaksiByUserId({
      anggotaId: userId,
      pengepulId,
      totalTransaksi: total,
      itemTransaksi,
    });
  }
  
  

  // Service untuk memperbarui status transaksi
  async updateStatusTransaksi(id, newStatus) {
    return await this.transaksiRepository.updateStatusTransaksiById(id, newStatus);
  }

  async countTransaksi() {
    try {
      return await this.transaksiRepository.countTransaksi();
    } catch (error) {
      console.error('Error in service countTransaksi:', error);
      throw new Error('Unable to fetch transaction count');
    }
  }

  async countTransaksiByStatus(status) {
    try {
      return await this.transaksiRepository.countTransaksiByStatus(status);
    } catch (error) {
      console.error('Error in service countTransaksiByStatus:', error);
      throw new Error('Unable to fetch transaction count by status');
    }
  }

    // Menghitung transaksi berdasarkan PengepulId (untuk pengepul)
    async countTransaksiByPengepulId(pengepulId) {
      return await  this.transaksiRepository.countTransaksiByPengepulId(pengepulId);
    }
  
    // // Menghitung transaksi berdasarkan status dan PengepulId (untuk pengepul)
    // async countTransaksiByStatusAndPengepulId(statusTransaksi, pengepulId) {
    //   return await  this.transaksiRepository.countTransaksiByStatusAndPengepulId(statusTransaksi, pengepulId);
    // }

    // Menghitung transaksi berdasarkan filter
    async countTransaksiByStatusAndPengepulId(filter) {
      try {
        return await this.transaksiRepository.countTransaksiByStatusAndPengepulId(filter);
      } catch (error) {
        console.error('Error counting transactions by filter:', error);
        throw new Error('Database error: Unable to count transactions by filter.');
      }
    }

    
    
  
  
}
