import { TransaksiService } from '../services/TransaksiService.js';

export class TransaksiController {
  constructor() {
    this.transaksiService = new TransaksiService();
  }

  // Endpoint untuk membuat transaksi baru
  async create(req, res) {
    try {
      const transaksiData = req.body;
      const newTransaksi = await this.transaksiService.createTransaksi(transaksiData);

      res.status(201).json({
        status: 'success',
        message: 'Transaksi berhasil dibuat',
        data: newTransaksi,
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error.message,
      });
    }
  }

  // Endpoint untuk mendapatkan semua transaksi
  async getAll(req, res) {
    try {
      const transaksi = await this.transaksiService.getAllTransaksi();
      res.status(200).json({
        status: 'success',
        message: 'Data transaksi berhasil ditemukan',
        data: transaksi,
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: 'Terjadi kesalahan saat mengambil data transaksi',
        error: error.message,
      });
    }
  }

  // Endpoint untuk mendapatkan transaksi berdasarkan ID
  async getById(req, res) {
    try {
      const { id } = req.params;
      const transaksi = await this.transaksiService.getTransaksiById(id);

      if (!transaksi) {
        return res.status(404).json({
          status: 'error',
          message: 'Transaksi tidak ditemukan',
        });
      }

      res.status(200).json({
        status: 'success',
        message: 'Data transaksi berhasil ditemukan',
        data: transaksi,
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error.message,
      });
    }
  }
}
