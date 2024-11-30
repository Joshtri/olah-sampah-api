import { PenggunaService } from '../services/PenggunaService.js';

export class PenggunaController {
  constructor() {
    this.penggunaService = new PenggunaService();
  }

  async getAll(req, res) {
    try {
      const data = await this.penggunaService.getAllPengguna();
      res.status(200).json({
        status: "success",
        message: "Data pengguna berhasil ditemukan",
        data: data
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Terjadi kesalahan saat mengambil data pengguna",
        error: error.message
      });
    }
  }

  async signUp(req,res){
    try {
      const penggunaData = req.body;
      const newPengguna = await this.penggunaService.signUp(penggunaData);
  
      // Mengirimkan respons sukses dengan data pengguna baru
      res.status(201).json({
        status: "success",
        message: "Pengguna berhasil terdaftar",
        data: newPengguna
      });

    } catch (error) {
      // Menangani kesalahan spesifik (misalnya email sudah terdaftar)
      if (error.message === 'Email sudah terdaftar') {
        res.status(400).json({
          status: "error",
          message: error.message
        });
      } else {
        res.status(500).json({
          status: "error",
          message: "Terjadi kesalahan saat proses pendaftaran",
          error: error.message
        });
      }
    }
  }
}
