import { PenggunaRepository } from '../repositories/PenggunaRepository.js';
import bcrypt from 'bcrypt'; // untuk enkripsi password

export class PenggunaService {
  constructor() {
    this.penggunaRepo = new PenggunaRepository();
  }

  // Fungsi untuk sign-up pengguna baru
  async signUp(penggunaData) {
    // Cek apakah email sudah terdaftar
    const existingPengguna = await this.penggunaRepo.getByEmail(penggunaData.email);
    if (existingPengguna) {
      throw new Error('Email sudah terdaftar');
    }

    // Hash password sebelum disimpan
    const hashedPassword = await bcrypt.hash(penggunaData.kataSandi, 10);

    // Simpan pengguna baru dengan password yang telah di-hash
    const newPengguna = await this.penggunaRepo.create({
      ...penggunaData,
      kataSandi: hashedPassword, // menyimpan kata sandi yang telah di-hash
    });

    return newPengguna;
  }

  // Fungsi untuk mendapatkan pengguna berdasarkan email
  async getByEmail(email) {
    return await this.penggunaRepo.getByEmail(email);
  }

  // Fungsi untuk mendapatkan semua pengguna
  async getAll() {
    return await this.penggunaRepo.getAll();
  }
}
