import { AnggotaService } from '../services/AnggotaService.js';

export class AnggotaController {
  constructor() {
    this.service = new AnggotaService();
  }

  async getAll(req, res) {
    try {
      const data = await this.service.getAllAnggota();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
