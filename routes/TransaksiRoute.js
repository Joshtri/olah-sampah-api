import express from 'express';
import { TransaksiController } from '../controllers/TransaksiController.js';

const transaksiRoute = express.Router();
const controller = new TransaksiController();

// Mendapatkan semua transaksi
transaksiRoute.get('/transaksi', controller.getAll.bind(controller));

// Mendapatkan transaksi berdasarkan ID
transaksiRoute.get('/transaksi/:id', controller.getById.bind(controller));

// Membuat transaksi baru
transaksiRoute.post('/transaksi', controller.create.bind(controller));


// Define the route for deleting a transaction
transaksiRoute.delete('/transaksi/:id', controller.deleteTransaksi.bind(controller));


// Route untuk membuat transaksi berdasarkan userId
transaksiRoute.post('/transaksi/:userId/create', controller.createTransaksiByUserId.bind(controller));


// Get transaksi by userId
transaksiRoute.get('/transaksi/user/:userId', controller.getTransaksiByUserId.bind(controller));

export default transaksiRoute;
