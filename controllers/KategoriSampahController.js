import { KategoriSampahService } from '../services/KategoriSampahService.js';
import { ObjectId } from 'mongodb'; // Impor ObjectId untuk validasi

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

  // Mendapatkan kategori sampah berdasarkan ID
  async getById(req, res) {
    const { id } = req.params;

    // Validasi apakah ID yang diberikan adalah ObjectId yang valid
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        status: 'error',
        message: 'ID kategori sampah tidak valid'
      });
    }

    try {
      const data = await this.service.getById(id);
      if (!data) {
        return res.status(404).json({
          status: 'error',
          message: 'Kategori Sampah tidak ditemukan'
        });
      }
      res.status(200).json({
        status: "success",
        message: "Data kategori sampah ditemukan",
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

      // Validasi data input jika diperlukan (misalnya nama dan deskripsi)
      if (!kategoriSampahData.nama) {
        return res.status(400).json({
          status: 'error',
          message: 'Nama kategori sampah tidak boleh kosong'
        });
      }

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
