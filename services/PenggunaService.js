import { PenggunaRepository } from '../repositories/PenggunaRepository.js';

export class PenggunaService {
  constructor() {
    this.penggunaRepository = new PenggunaRepository();
  }

  async getAllPengguna() {
    return await this.penggunaRepository.getAll();
  }


  async signUp(penggunaData){
    //cek email.
    const existingPengguna = await this.penggunaRepository.getByEmail(penggunaData.email)
    if(existingPengguna){
      throw new Error('Email sudah terdaftar');
    }

    // Hash kata sandi
    const hashedPassword = await bcrypt.hash(penggunaData.kataSandi, 10);

    // Buat anggota baru dengan kata sandi yang di-hash
    const newPengguna = await this.penggunaRepository.create({
      ...penggunaData,
      kataSandi: hashedPassword,
    });

    return newPengguna
  }
}
