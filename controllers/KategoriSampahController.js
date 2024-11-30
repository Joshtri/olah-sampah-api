import { KategoriSampahService } from '../services/KategoriSampahService.js';

export class KategoriSampahController {
  constructor() {
    this.service = new KategoriSampahService();
  }

  // Mendapatkan semua kategori sampah
  async getAll(req, res) {
    try {
      const data = await this.service.getAllKategoriSampah();
      res.status(200).json({
        status: "success",
        message: "Data kategori sampah berhasil ditemukan",
        data: data
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Terjadi kesalahan saat mengambil data kategori sampah",
        error: error.message
      });
    }
  }

  // Membuat kategori sampah baru
  async create(req, res) {
    try {
      const kategoriSampahData = req.body;
      const newKategoriSampah = await this.service.createKategoriSampah(kategoriSampahData);
      res.status(201).json({
        status: "success",
        message: "Kategori sampah berhasil dibuat",
        data: newKategoriSampah
      });
    } catch (error) {
      res.status(400).json({
        status: "error",
        message: error.message
      });
    }
  }
}
