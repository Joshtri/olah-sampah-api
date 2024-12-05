import { PenggunaService } from '../services/PenggunaService.js';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import {PengepulService} from '../services/PengepulService.js';
import { PengepulRepository } from '../repositories/PengepulRepository.js';
import { PenggunaRepository } from '../repositories/PenggunaRepository.js';
export class PenggunaController {
  constructor() {
    this.penggunaService = new PenggunaService();
    this.penggunaRepository = new PenggunaRepository();
    this.pengepulRepository = new PengepulRepository();
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
  //  async login(req, res) {
  //   // Validasi data input
  //   await body('email').isEmail().notEmpty().run(req);
  //   await body('kataSandi').isLength({ min: 6 }).withMessage('Password is required').run(req);

  //   // Periksa kesalahan validasi
  //   const errors = validationResult(req);
  //   if (!errors.isEmpty()) {
  //     return res.status(400).json({ errors: errors.array() });
  //   }

  //   try {
  //     const { email, kataSandi } = req.body;

  //     // Cari anggota berdasarkan email
  //     const anggota = await this.penggunaService.getByEmail(email);
  //     if (!anggota) {
  //       return res.status(400).json({ error: 'Email atau Password salah' });
  //     }

  //     // Periksa kecocokan password dengan bcrypt
  //     const isMatch = await bcrypt.compare(kataSandi, anggota.kataSandi);
  //     if (!isMatch) {
  //       return res.status(400).json({ error: 'Email atau Password salah' });
  //     }

  //     // Generate JWT token
  //     const payload = { id: anggota.id, email: anggota.email }; // Payload yang akan disertakan dalam token
  //     const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }); // Menggunakan secret key dan waktu kedaluwarsa 1 jam

  //     console.log(`berhasil login :`, token);
  //     console.log(`berhasil login :`, payload);
  //     // Kirim token sebagai response
  //     res.status(200).json({
  //       message: 'Login berhasil',
  //       token: token,  // Kirim token JWT kepada pengguna
  //     });


  //   } catch (error) {
  //     console.error('Login error:', error);
  //     res.status(500).json({ error: 'Terjadi kesalahan pada server' });
  //   }
  // }

  async login(req, res) {
    // Validasi input email dan kata sandi
    await body('email').isEmail().notEmpty().run(req);
    await body('kataSandi').isLength({ min: 6 }).withMessage('Password is required').run(req);

    // Periksa kesalahan validasi
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { email, kataSandi } = req.body;

        // 1. Cek apakah email ada di model Pengguna
        const pengguna = await this.penggunaService.getByEmail(email);
        if (pengguna) {
            // Cek password
            const isMatch = await bcrypt.compare(kataSandi, pengguna.kataSandi);
            if (!isMatch) {
                return res.status(400).json({ error: 'Email atau Password salah' });
            }

            // Generate JWT token untuk pengguna
            const payload = { id: pengguna.id, email: pengguna.email, role: pengguna.peran };
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

            return res.status(200).json({
                message: 'Login berhasil sebagai pengguna',
                token: token,
                user: {
                    id: pengguna.id,
                    email: pengguna.email,
                    role: pengguna.peran,
                    nama: pengguna.nama,
                },
            });
        }

        // 2. Jika tidak ditemukan di Pengguna, cek di model Pengepul
        const pengepul = await this.pengepulRepository.getByEmail(email);
        if (pengepul) {
            // Cek password
            const isMatch = await bcrypt.compare(kataSandi, pengepul.kataSandi);
            if (!isMatch) {
                return res.status(400).json({ error: 'Email atau Password salah' });
            }

            // Generate JWT token untuk pengepul
            const payload = { id: pengepul.id, email: pengepul.email, role: 'pengepul' };
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

            return res.status(200).json({
                message: 'Login berhasil sebagai pengepul',
                token: token,
                user: {
                    id: pengepul.id,
                    email: pengepul.email,
                    role: 'pengepul',
                    nama: pengepul.nama,
                },
            });
        }

        // Jika email tidak ditemukan di kedua model
        return res.status(400).json({ error: 'Email atau Password salah' });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Terjadi kesalahan pada server' });
    }
  }
  // Get profile of the logged-in user (Pengguna or Pengepul)
  async getProfile(req, res) {
    try {
        // Extract token from Authorization header
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized, token is required' });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { id, role } = decoded; // Extract ID and role from token

        let profile;

        // Check role and fetch the appropriate profile
        if (role === 'admin' || role === 'staf') {
            profile = await this.penggunaRepository.getById(id); // Fetch from Pengguna
        } else if (role === 'pengepul') {
            profile = await this.pengepulRepository.getById(id); // Fetch from Pengepul
        } else {
            return res.status(400).json({ error: 'Invalid role in token' });
        }

        if (!profile) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Return the profile data (excluding sensitive info like password)
        const responseData = {
            id: profile.id,
            nama: profile.nama,
            email: profile.email,
            ...(role === 'pengepul' && {
                noTelepon: profile.noTelepon,
                alamat: profile.alamat,
                namaBankSampah: profile.namaBankSampah,
            }),
            role,
        };

        res.status(200).json(responseData);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ error: 'Terjadi kesalahan pada server' });
      }
  }
}
