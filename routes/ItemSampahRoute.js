import express from 'express';
import { ItemSampahController } from '../controllers/ItemSampahController.js';

const itemSampahRoute = express.Router();
const controller = new ItemSampahController();

// Mendapatkan semua item sampah
itemSampahRoute.get('/', controller.getAll.bind(controller));

// Membuat item sampah baru
itemSampahRoute.post('/', controller.create.bind(controller));

export default itemSampahRoute;
