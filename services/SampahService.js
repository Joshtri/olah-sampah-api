import { SampahRepository } from '../repositories/SampahRepository.js';

export class SampahService {
  // Layanan untuk menghitung total sampah secara keseluruhan
  static async hitungTotalSampah() {
    try {
      const totalSampah = await SampahRepository.hitungTotalSampah();
      return totalSampah;
    } catch (error) {
      console.error('Kesalahan pada layanan hitungTotalSampah:', error);
      throw new Error('Gagal menghitung total sampah');
    }
  }

  // Layanan untuk menghitung total sampah berdasarkan pengepul
  static async hitungSampahPerPengepul(pengepulId) {
    try {
      const totalSampah = await SampahRepository.hitungSampahPerPengepul(pengepulId);
      return totalSampah;
    } catch (error) {
      console.error('Kesalahan pada layanan hitungSampahPerPengepul:', error);
      throw new Error('Gagal menghitung sampah per pengepul');
    }
  }
}
