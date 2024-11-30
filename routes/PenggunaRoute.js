import express from 'express';
import { PenggunaController } from '../controllers/PenggunaController.js';

const penggunaRoute = express.Router();
const controller = new PenggunaController();

penggunaRoute.get('/', (req, res) => controller.getAll(req, res));

export default penggunaRoute;
