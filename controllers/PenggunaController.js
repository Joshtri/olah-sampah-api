import { PenggunaService } from '../services/PenggunaService.js';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
export class PenggunaController {
  constructor() {
    this.penggunaService = new PenggunaService();
  }

  // Mendapatkan semua pengguna
  async getAll(req, res) {
    try {
      const data = await this.penggunaService.getAll();
      res.status(200).json({
        status: 'success',
        message: 'Data pengguna berhasil ditemukan',
        data: data
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: 'Terjadi kesalahan saat mengambil data pengguna',
        error: error.message
      });
    }
  }

  // Sign-up pengguna baru
  async signUp(req, res) {
    try {
      const penggunaData = req.body;
      const newPengguna = await this.penggunaService.signUp(penggunaData);

      // Mengirimkan respons sukses dengan data pengguna baru
      res.status(201).json({
        status: 'success',
        message: 'Pengguna berhasil terdaftar',
        data: newPengguna
      });
    } catch (error) {
      // Menangani kesalahan spesifik (misalnya email sudah terdaftar)
      if (error.message === 'Email sudah terdaftar') {
        res.status(400).json({
          status: 'error',
          message: error.message
        });
      } else {
        res.status(500).json({
          status: 'error',
          message: 'Terjadi kesalahan saat proses pendaftaran',
          error: error.message
        });
      }
    }
  }

     // Login anggota dengan JWT
   async login(req, res) {
    // Validasi data input
    await body('email').isEmail().notEmpty().run(req);
    await body('kataSandi').isLength({ min: 6 }).withMessage('Password is required').run(req);

    // Periksa kesalahan validasi
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, kataSandi } = req.body;

      // Cari anggota berdasarkan email
      const anggota = await this.penggunaService.getByEmail(email);
      if (!anggota) {
        return res.status(400).json({ error: 'Email atau Password salah' });
      }

      // Periksa kecocokan password dengan bcrypt
      const isMatch = await bcrypt.compare(kataSandi, anggota.kataSandi);
      if (!isMatch) {
        return res.status(400).json({ error: 'Email atau Password salah' });
      }

      // Generate JWT token
      const payload = { id: anggota.id, email: anggota.email }; // Payload yang akan disertakan dalam token
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }); // Menggunakan secret key dan waktu kedaluwarsa 1 jam

      console.log(`berhasil login :`, token);
      console.log(`berhasil login :`, payload);
      // Kirim token sebagai response
      res.status(200).json({
        message: 'Login berhasil',
        token: token,  // Kirim token JWT kepada pengguna
      });


    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Terjadi kesalahan pada server' });
    }
  }
}
