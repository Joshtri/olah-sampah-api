import express from 'express';
import { ItemSampahController } from '../controllers/ItemSampahController.js';

const itemSampahRoute = express.Router();
const controller = new ItemSampahController();

// Mendapatkan semua item sampah
itemSampahRoute.get('/item/sampah', controller.getAll.bind(controller));

// Membuat item sampah baru
itemSampahRoute.post('/item/sampah', controller.create.bind(controller));

itemSampahRoute.delete('/item/sampah/:id', controller.deleteItem.bind(controller));


export default itemSampahRoute;
