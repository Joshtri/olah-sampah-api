import { KategoriSampahRepository } from '../repositories/KategoriSampahRepository.js';
import { ObjectId } from 'mongodb'; // Impor ObjectId untuk validasi dan konversi

export class KategoriSampahService {
  constructor() {
    this.repository = new KategoriSampahRepository();
  }

  async getAllKategoriSampah() {
    return await this.repository.getAll();
  }

  // Mendapatkan kategori sampah berdasarkan ID
  async getById(id) {
    // Pastikan ID yang diterima adalah valid
    if (!ObjectId.isValid(id)) {
      throw new Error("ID tidak valid");
    }

    // Menggunakan ObjectId untuk pencarian di MongoDB
    return await this.repository.getById(new ObjectId(id));
  }

  // Membuat kategori sampah baru
  async createKategoriSampah(data) {
    return await this.repository.create(data);
  }
}
