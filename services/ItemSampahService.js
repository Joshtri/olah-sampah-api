import { ItemSampahRepository } from '../repositories/ItemSampahRepository.js';
import { ItemSampahValidation } from '../validations/ItemSampahValidation.js';

export class ItemSampahService {
  constructor() {
    this.repository = new ItemSampahRepository();
  }

  // async getAllItemSampah() {
  //   return await this.repository.getAll();
  // }

  async getAllItemSampah(pengepulId = null) {
    if (pengepulId) {
      return await this.repository.getByPengepulId(pengepulId);
    }
    return await this.repository.getAll();
  }

  async getItemSampahById(id) {
    return await this.repository.getById(id);
  }

  async createItemSampah(data) {
    // Validasi input
    ItemSampahValidation.validateCreate(data);
    return await this.repository.create(data);
  }

  async updateItemSampah(id, data) {
    ItemSampahValidation.validateCreate(data);
    return await this.repository.update(id, data);
  }

  // async deleteItemSampah(id) {
  //   return await this.repository.delete(id);
  // }
  
  async deleteItemSampah(id) {
    const item = await this.repository.getById(id);
    if (!item) {
      throw new Error('Item Sampah not found');
    }
    return await this.repository.delete(id);
  }
}
