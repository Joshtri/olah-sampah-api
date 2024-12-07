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


transaksiRoute.put('/transaksi/:id/status', controller.updateStatus.bind(controller));


// Route untuk menghitung transaksi
transaksiRoute.get('/transaksi-count', controller.countTransaksi.bind(controller));

transaksiRoute.get('/transaksi-count/:status', (req, res) =>
    controller.countTransaksiByStatus(req, res)
);



// Route untuk menghitung transaksi berdasarkan userId (pengepul)
transaksiRoute.get('/transaksi-count/user/:pengepulId', controller.countTransaksiByPengepulId.bind(controller));

// Route untuk menghitung transaksi berdasarkan status dan userId (pengepul)
transaksiRoute.get(
  '/transaksi-count/user/:pengepulId/status/:status',
  controller.countTransaksiByStatusAndPengepulId.bind(controller)
);



export default transaksiRoute;
