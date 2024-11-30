import { AnggotaRepository } from '../repositories/AnggotaRepository.js';

export class AnggotaService {
  constructor() {
    this.repository = new AnggotaRepository();
  }

  async getAllAnggota() {
    return await this.repository.getAll();
  }
}
