import express from 'express';
import { KategoriSampahController } from '../controllers/KategoriSampahController.js';

const router = express.Router();
const controller = new KategoriSampahController();

// Mendapatkan semua kategori sampah
router.get('/', controller.getAll.bind(controller));

// Membuat kategori sampah baru
router.post('/', controller.create.bind(controller));

export default router;
