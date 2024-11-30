import express from 'express';
import { AnggotaController } from '../controllers/AnggotaController.js';

const anggotaRoute = express.Router();
const controller = new AnggotaController();

anggotaRoute.get('/anggota', (req, res) => controller.getAll(req, res));

export default anggotaRoute;
