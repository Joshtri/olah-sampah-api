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

  // Sign-up anggota baru
  async signUp(req, res) {
    try {
      // Ambil data anggota dari body request
      const anggotaData = req.body;

      // Panggil service untuk sign-up anggota
      const newAnggota = await this.service.signUp(anggotaData);

      // Kembalikan anggota yang baru dibuat
      res.status(201).json(newAnggota);
    } catch (error) {
      // Jika terjadi error, kembalikan response error
      if (error.message === 'Email sudah terdaftar') {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }
}
