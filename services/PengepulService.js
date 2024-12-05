import { PengepulRepository } from "../repositories/PengepulRepository.js";

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
        // Validasi data di sini jika diperlukan
        if (!data.nama || !data.email || !data.kataSandi) {
            throw new Error('Nama, email, dan kata sandi wajib diisi.');
        }

        try {
            return await this.pengepulRepository.create(data);
        } catch (error) {
            throw new Error('Gagal membuat data pengepul: ' + error.message);
        }
    }
}