import { TransaksiRepository } from '../repositories/TransaksiRepository.js';
import { ItemTransaksiRepository } from '../repositories/ItemTransaksiRepository.js';

export class TransaksiService {
  constructor() {
    this.transaksiRepository = new TransaksiRepository();
    // this.itemTransaksiRepository = new ItemTransaksiRepository();
  }

  async createTransaksi(data) {
    const { items, totalTransaksi, anggotaId } = data;

    // Pastikan 'items' adalah array dan tidak kosong
    if (!Array.isArray(items) || items.length === 0) {
      throw new Error('Items transaksi tidak boleh kosong');
    }

    // Menghitung total transaksi berdasarkan item yang ada
    const total = items.reduce((sum, item) => {
      if (!item.totalHarga || !item.kuantitas) {
        throw new Error('Item harus memiliki totalHarga dan kuantitas');
      }
      return sum + item.totalHarga;
    }, 0);

    // Memastikan total transaksi sesuai
    if (total !== totalTransaksi) {
      throw new Error('Total transaksi tidak sesuai dengan total harga item');
    }

    // Menggunakan repository untuk membuat transaksi
    return await this.transaksiRepository.createTransaksi({
      anggotaId,
      totalTransaksi: total,
      itemTransaksi: items, // Menyertakan itemTransaksi yang diterima
    });
  }

  async getAllTransaksi() {
    return await this.transaksiRepository.getAllTransaksi();
  }

  async getTransaksiById(id) {
    return await this.transaksiRepository.getTransaksiById(id);
  }
}
