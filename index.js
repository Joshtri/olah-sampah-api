import express from 'express';
import { config } from 'dotenv';

import penggunaRoute from './routes/PenggunaRoute.js';
import anggotaRoute from './routes/AnggotaRoute.js';


config();
const app = express();
const PORT = process.env.PORT || 5000



app.use('/api/v1', penggunaRoute, anggotaRoute)

app.listen(PORT,()=>{
    console.log('running on PORT : ', PORT);
})



