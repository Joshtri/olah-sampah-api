import express from 'express';
import { PenggunaController } from '../controllers/PenggunaController.js';

const penggunaRoute = express.Router();
const controller = new PenggunaController();

penggunaRoute.get('/', (req, res) => controller.getAll(req, res));

penggunaRoute.post('/pengguna',(req,res)=> controller.signUp(req,res))
penggunaRoute.post('/pengguna/login', (req,res)=> controller.login(req,res));

export default penggunaRoute;
