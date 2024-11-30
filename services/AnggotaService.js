import { AnggotaRepository } from '../repositories/AnggotaRepository.js';

export class AnggotaService {
  constructor() {
    this.anggotaRepository = new AnggotaRepository();
  }

  async getAllAnggota() {
    return await this.anggotaRepository.getAll();
  }

  // Fungsi untuk sign-up anggota
  async signUp(anggotaData) {
    // Cek jika email sudah terdaftar
    const existingAnggota = await this.anggotaRepository.getByEmail(anggotaData.email);
    if (existingAnggota) {
      throw new Error('Email sudah terdaftar');
    }

    // Hash kata sandi
    const hashedPassword = await bcrypt.hash(anggotaData.kataSandi, 10);

    // Buat anggota baru dengan kata sandi yang di-hash
    const newAnggota = await this.anggotaRepository.create({
      ...anggotaData,
      kataSandi: hashedPassword,
    });

    return newAnggota;
  }
}
