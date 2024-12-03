import { AnggotaService } from '../services/AnggotaService.js';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { AnggotaRepository } from '../repositories/AnggotaRepository.js';

export class AnggotaController {
  constructor() {
    this.service = new AnggotaService();
    this.repository = new AnggotaRepository();
  }

    // Get all anggota data
    async getAllAnggota(req, res) {
      try {
        const anggota = await this.repository.getAll();
        res.status(200).json({
          status: 'success',
          message: 'Data anggota successfully retrieved',
          data: anggota,
        });
      } catch (error) {
        res.status(500).json({
          status: 'error',
          message: 'Failed to fetch anggota data',
          error: error.message,
        });
      }
    }

  // Sign-up anggota baru dengan validasi
  async signUp(req, res) {
    // Validasi data yang masuk
    await body('nama').isString().notEmpty().run(req);
    await body('email').isEmail().notEmpty().run(req);
    await body('kataSandi')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long')
      .run(req);

    // Periksa kesalahan validasi
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const anggotaData = req.body;

      // Pastikan email dan password ada
      if (!anggotaData.email || !anggotaData.kataSandi) {
        return res.status(400).json({ error: 'Email dan Password diperlukan' });
      }

      // Cek apakah email sudah terdaftar
      const existingAnggota = await this.service.getByEmail(anggotaData.email);
      if (existingAnggota) {
        return res.status(400).json({ error: 'Email sudah terdaftar' });
      }

      // Hash password dan sign-up user
      const newAnggota = await this.service.signUp(anggotaData);

      // Kembalikan anggota yang baru dibuat
      res.status(201).json({ message: 'Anggota berhasil dibuat', data: newAnggota });
    } catch (error) {
      console.error('Sign-up error:', error);
      if (error.message === 'Email sudah terdaftar') {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Terjadi kesalahan server' });
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
      const anggota = await this.service.getByEmail(email);
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

    // Get profile of the logged-in user (using JWT)
  async getProfile(req, res) {
    try {
      // Extract token from Authorization header
      const token = req.header('Authorization').replace('Bearer ', '');

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const anggotaId = decoded.id;

      // Fetch the user profile data from the database
      const anggota = await this.repository.getById(anggotaId);
      if (!anggota) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Return the profile data (excluding sensitive info like password)
      res.status(200).json({
        nama: anggota.nama,
        email: anggota.email,
        noTelepon: anggota.noTelepon,
        alamat: anggota.alamat,
      });
    } catch (error) {
      console.error('Error fetching user profile:', error);
      res.status(500).json({ error: 'Terjadi kesalahan pada server' });
    }
  }

    // Get the profile of the currently logged-in user
    // async getProfile(req, res) {
    //   try {
    //     // Mengambil token dari header Authorization
    //     const token = req.headers.authorization?.split(' ')[1];
    //     if (!token) {
    //       return res.status(401).json({ error: 'Token diperlukan untuk mengakses profil.' });
    //     }
  
    //     // Verifikasi token
    //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //     if (!decoded) {
    //       return res.status(401).json({ error: 'Token tidak valid.' });
    //     }
  
    //     // Ambil data pengguna dari database menggunakan ID dari token yang sudah terverifikasi
    //     const user = await this.service.getById(decoded.id);
    //     if (!user) {
    //       return res.status(404).json({ error: 'Pengguna tidak ditemukan.' });
    //     }
  
    //     // Menghapus kataSandi dari response, hanya mengembalikan data yang dibutuhkan
    //     const { kataSandi, ...userProfile } = user;
    //     res.status(200).json({ data: userProfile });
    //   } catch (error) {
    //     console.error('Error fetching user profile:', error);
    //     res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data profil.' });
    //   }
    // }
}

