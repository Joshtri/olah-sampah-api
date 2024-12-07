import { SampahService } from '../services/SampahService.js';

export class SampahController {
  // Controller untuk mendapatkan total sampah secara keseluruhan
  static async ambilTotalSampah(req, res) {
    try {
      const totalSampah = await SampahService.hitungTotalSampah();
      res.status(200).json({ sukses: true, totalSampah });
    } catch (error) {
      console.error('Kesalahan pada controller ambilTotalSampah:', error);
      res.status(500).json({ sukses: false, pesan: error.message });
    }
  }

  // Controller untuk mendapatkan total sampah per pengepul
  static async ambilSampahPerPengepul(req, res) {
    try {
      const { pengepulId } = req.params;
      const totalSampah = await SampahService.hitungSampahPerPengepul(pengepulId);
      res.status(200).json({ sukses: true, totalSampah });
    } catch (error) {
      console.error('Kesalahan pada controller ambilSampahPerPengepul:', error);
      res.status(500).json({ sukses: false, pesan: error.message });
    }
  }
}
