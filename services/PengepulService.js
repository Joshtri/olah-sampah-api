import bcrypt from 'bcrypt';
import { PengepulRepository } from '../repositories/PengepulRepository.js';

export class PengepulService {
    constructor() {
        this.pengepulRepository = new PengepulRepository();
    }

    async getAllPengepul() {
        try {
            return await this.pengepulRepository.getAll();
        } catch (error) {
            throw new Error('Gagal mengambil data pengepul: ' + error.message);
        }
    }

    async createPengepul(data) {
        console.log('Data diterima:', data);
    
        if (!data.nama || !data.email || !data.kataSandi) {
            throw new Error('Nama, email, dan kata sandi wajib diisi.');
        }

        try {
            // Enkripsi kata sandi menggunakan bcrypt
            const saltRounds = 10; // Jumlah salt rounds
            const hashedPassword = await bcrypt.hash(data.kataSandi, saltRounds);

            // Ganti kata sandi dengan kata sandi yang sudah dienkripsi
            data.kataSandi = hashedPassword;

            // Simpan data pengepul ke database
            return await this.pengepulRepository.create(data);
        } catch (error) {
            throw new Error('Gagal membuat data pengepul: ' + error.message);
        }
    }

    async getPengepulById(id) {
        if (!id) {
            throw new Error('ID pengepul harus disediakan');
        }
    
        const pengepul = await this.pengepulRepository.getPengepulById(id);
        if (!pengepul) {
            throw new Error(`Pengepul dengan ID ${id} tidak ditemukan`);
        }
    
        return pengepul;
    }
}
