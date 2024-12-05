import express from 'express';
import { PengepulController } from '../controllers/PengepulController.js';

const pengepulRoute = express.Router();
const pengepulController = new PengepulController();

// GET all pengepul
pengepulRoute.get('/pengepul', (req, res) => pengepulController.getAllPengepul(req, res));

// POST create pengepul
pengepulRoute.post('/pengepul', (req, res) => pengepulController.createPengepul(req, res));

export default pengepulRoute;
