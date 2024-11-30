import express from 'express';
import { ItemSampahController } from '../controllers/ItemSampahController.js';

const router = express.Router();
const controller = new ItemSampahController();

// Mendapatkan semua item sampah
router.get('/', controller.getAll.bind(controller));

// Membuat item sampah baru
router.post('/', controller.create.bind(controller));

export default router;
