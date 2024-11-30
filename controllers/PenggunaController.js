import { PenggunaService } from '../services/PenggunaService.js';

export class PenggunaController {
  constructor() {
    this.service = new PenggunaService();
  }

  async getAll(req, res) {
    try {
      const data = await this.service.getAllPengguna();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
