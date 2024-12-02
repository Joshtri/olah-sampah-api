import { AnggotaRepository } from '../repositories/AnggotaRepository.js';
import bcrypt from 'bcrypt';

export class AnggotaService {
  constructor() {
    this.anggotaRepository = new AnggotaRepository();
  }

  async getAllAnggota() {
    return await this.anggotaRepository.getAll();
  }

  // Get by email
  async getByEmail(email) {
    try {
      return await this.anggotaRepository.getByEmail(email);
    } catch (error) {
      throw new Error('Error fetching user by email');
    }
  }

  // Fungsi untuk sign-up anggota
  async signUp(anggotaData) {
    // Hash password
    const hashedPassword = await bcrypt.hash(anggotaData.kataSandi, 10);

    // Hapus confirmPassword sebelum menyimpan anggota
    const { confirmPassword, ...anggotaDataWithoutConfirmPassword } = anggotaData;

    const newAnggota = await this.anggotaRepository.create({
      ...anggotaDataWithoutConfirmPassword,
      kataSandi: hashedPassword, // Simpan password yang sudah di-hash
    });

    return newAnggota;
  }
}
