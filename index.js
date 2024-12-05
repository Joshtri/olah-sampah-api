import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import prisma from './config/prisma.js';

// Import routes
import penggunaRoute from './routes/PenggunaRoute.js';
import anggotaRoute from './routes/AnggotaRoute.js';
import transaksiRoute from './routes/TransaksiRoute.js';
import kategoriSampahRoute from './routes/KategoriSampahRoute.js';
import itemSampahRoute from './routes/ItemSampahRoute.js';
import pengepulRoute from './routes/PengepulRoute.js';

// Konfigurasi environment variables
config();

// Pastikan PORT telah dimuat dengan benar
console.log('PORT:', process.env.PORT);

const app = express();
const PORT = process.env.PORT || 5000;

prisma;
// Middleware
app.use(express.json()); // Untuk parsing JSON
app.use(express.urlencoded({ extended: true })); // Untuk parsing data URL-encoded

// CORS (pastikan mengizinkan origin yang aman)
app.use(cors({
  origin: '*', // Tentukan origin yang diperbolehkan, misalnya 'http://localhost:3000'
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  credentials: true, // Allow credentials (cookies, HTTP authentication)
}));

// Logging HTTP requests hanya di development environment
// if (process.env.NODE_ENV === 'development') {
//   app.use(morgan('dev')); // Logging untuk debugging di environment development
// }

// Routing utama
app.use('/api/v1', penggunaRoute);
app.use('/api/v1', anggotaRoute);
app.use('/api/v1', transaksiRoute);
app.use('/api/v1', kategoriSampahRoute);
app.use('/api/v1', itemSampahRoute);
app.use('/api/v1', pengepulRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Logging error ke console

  // Handle specific error types
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      status: 'error',
      message: err.message,
    });
  }

  res.status(err.status || 500).json({
    status: 'error',
    message: err.message || 'Terjadi kesalahan pada server',
  });
});

// Handling endpoint tidak ditemukan
app.use((req, res, next) => {
  res.status(404).json({
    status: 'error',
    message: 'Endpoint tidak ditemukan',
  });
});

// Menjalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di PORT: ${PORT}`);
});
