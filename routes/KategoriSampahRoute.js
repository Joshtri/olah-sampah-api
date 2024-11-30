import express from 'express';
import { KategoriSampahController } from '../controllers/KategoriSampahController.js';

const kategoriSampahRoute = express.Router();
const controller = new KategoriSampahController();

// Mendapatkan semua kategori sampah
kategoriSampahRoute.get('/', controller.getAll.bind(controller));

// Membuat kategori sampah baru
kategoriSampahRoute.post('/', controller.create.bind(controller));

export default kategoriSampahRoute;
