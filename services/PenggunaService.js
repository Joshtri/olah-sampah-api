import { PenggunaRepository } from '../repositories/PenggunaRepository.js';

export class PenggunaService {
  constructor() {
    this.repository = new PenggunaRepository();
  }

  async getAllPengguna() {
    return await this.repository.getAll();
  }
}
