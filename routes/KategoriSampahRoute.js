import express from 'express';
import { KategoriSampahController } from '../controllers/KategoriSampahController.js';

const kategoriSampahRoute = express.Router();
const controller = new KategoriSampahController();

// Mendapatkan semua kategori sampah
kategoriSampahRoute.get('/sampah/kategori', controller.getAll.bind(controller));

// Membuat kategori sampah baru
kategoriSampahRoute.post('/sampah/kategori', controller.create.bind(controller));
    
export default kategoriSampahRoute;
