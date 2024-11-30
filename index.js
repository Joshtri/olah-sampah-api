import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';

// Import routes
import penggunaRoute from './routes/PenggunaRoute.js';
import anggotaRoute from './routes/AnggotaRoute.js';
import transaksiRoute from './routes/TransaksiRoute.js';
import kategoriSampahRoute from './routes/KategoriSampahRoute.js';
import itemSampahRoute from './routes/ItemSampahRoute.js';

// Konfigurasi environment variables
config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Untuk parsing JSON
app.use(express.urlencoded({ extended: true })); // Untuk parsing data URL-encoded
app.use(cors()); // Menangani CORS
app.use(morgan('dev')); // Logging HTTP requests

// Routing utama
app.use('/api/v1', penggunaRoute,anggotaRoute, transaksiRoute, kategoriSampahRoute, itemSampahRoute);
// app.use('/api/v1', anggotaRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Logging error ke console
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
