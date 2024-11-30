import { KategoriSampahRepository } from '../repositories/KategoriSampahRepository.js';
import { KategoriSampahValidation } from '../validations/KategoriSampahValidation.js';

export class KategoriSampahService {
  constructor() {
    this.repository = new KategoriSampahRepository();
  }

  async getAllKategoriSampah() {
    return await this.repository.getAll();
  }

  async getKategoriSampahById(id) {
    return await this.repository.getById(id);
  }

  async createKategoriSampah(data) {
    // Validasi input
    KategoriSampahValidation.validateCreate(data);
    return await this.repository.create(data);
  }

  async updateKategoriSampah(id, data) {
    KategoriSampahValidation.validateCreate(data);
    return await this.repository.update(id, data);
  }

  async deleteKategoriSampah(id) {
    return await this.repository.delete(id);
  }
}
