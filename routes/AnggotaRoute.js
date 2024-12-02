import express from 'express';
import { AnggotaController } from '../controllers/AnggotaController.js';
import { authMiddleware } from '../middlewares/AuthMiddleware.js';

const anggotaRoute = express.Router();
const controller = new AnggotaController();



// GET all anggota
anggotaRoute.get('/anggota', (req, res) => controller.getAllAnggota(req, res));

// POST untuk signup anggota
anggotaRoute.post('/anggota', (req, res) => controller.signUp(req, res));

anggotaRoute.post('/anggota/login', (req,res)=> controller.login(req,res));

// GET profile anggota berdasarkan ID (auth required)
anggotaRoute.get('/anggota/profile', authMiddleware, async (req, res) => {
    const { userId } = req.user; // Assuming the user ID is added to the request via middleware (JWT)
    try {
      const anggota = await controller.getById(userId); // Fetch user profile
      if (!anggota) {
        return res.status(404).json({ error: 'Anggota not found' });
      }
      return res.status(200).json({ data: anggota });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch profile' });
    }
});

anggotaRoute.get('/user-profile', (req, res) => controller.getProfile(req, res));



export default anggotaRoute;
