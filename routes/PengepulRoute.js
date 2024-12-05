import express from 'express';
import { PengepulController } from '../controllers/PengepulController.js';
import multer from 'multer'
const upload = multer();

const pengepulRoute = express.Router();
const pengepulController = new PengepulController();

// GET all pengepul
pengepulRoute.get('/pengepul', (req, res) => pengepulController.getAllPengepul(req, res));

// POST create pengepul
pengepulRoute.post('/pengepul', upload.none(),  (req, res) => pengepulController.createPengepul(req, res));
pengepulRoute.get('/pengepul/:id', (req, res) => pengepulController.getPengepulById(req, res));

pengepulRoute.get('/pengepul-diterima', (req, res) => pengepulController.getPengepulByStatusDiterima(req, res));

export default pengepulRoute;
