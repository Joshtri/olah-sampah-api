import { Router } from 'express';
import { SampahController } from '../controllers/SampahController.js';

const sampahRoute = Router();

// Endpoint untuk mendapatkan total sampah secara keseluruhan
sampahRoute.get('/sampah/total', SampahController.ambilTotalSampah);

// Endpoint untuk mendapatkan total sampah per pengepul
sampahRoute.get('/sampah/pengepul/:pengepulId', SampahController.ambilSampahPerPengepul);

export default sampahRoute;
