import { TransaksiRepository } from '../repositories/TransaksiRepository.js';
import { ItemTransaksiRepository } from '../repositories/ItemTransaksiRepository.js';

export class TransaksiService {
  constructor() {
    this.transaksiRepository = new TransaksiRepository();
    this.itemTransaksiRepository = new ItemTransaksiRepository();
  }

  async createTransaksi(data) {
    const { itemTransaksi, totalTransaksi, anggotaId } = data;
    
    // Menghitung total transaksi
    const total = itemTransaksi.reduce((sum, item) => sum + item.totalHarga, 0);

    // Memastikan total transaksi sesuai
    if (total !== totalTransaksi) {
      throw new Error('Total transaksi tidak sesuai dengan total harga item');
    }

    return await this.transaksiRepository.createTransaksi({
      anggotaId,
      totalTransaksi: total,
      itemTransaksi,
    });
  }

  async getAllTransaksi() {
    return await this.transaksiRepository.getAllTransaksi();
  }

  async getTransaksiById(id) {
    return await this.transaksiRepository.getTransaksiById(id);
  }
}
