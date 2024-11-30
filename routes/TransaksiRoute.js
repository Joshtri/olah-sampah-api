import express from 'express';
import { TransaksiController } from '../controllers/TransaksiController.js';

const transaksiRoute = express.Router();
const controller = new TransaksiController();

// Mendapatkan semua transaksi
transaksiRoute.get('/', controller.getAll.bind(controller));

// Mendapatkan transaksi berdasarkan ID
transaksiRoute.get('/:id', controller.getById.bind(controller));

// Membuat transaksi baru
transaksiRoute.post('/', controller.create.bind(controller));

export default transaksiRoute;
