import { PengepulService } from "../services/PengepulService.js";

export class PengepulController {
    constructor() {
        this.pengepulService = new PengepulService();
    }

    async getAllPengepul(req, res) {
        try {
            const pengepulList = await this.pengepulService.getAllPengepul();
            res.status(200).json({ success: true, data: pengepulList });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async createPengepul(req, res) {
        try {
            const pengepulData = req.body;
            const newPengepul = await this.pengepulService.createPengepul(pengepulData);
            res.status(201).json({ success: true, data: newPengepul });
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }

    async getPengepulById(req, res) {
        const { id } = req.params;
    
        try {
          const pengepul = await this.pengepulService.getPengepulById(id);
          res.status(200).json({
            success: true,
            data: pengepul,
          });
        } catch (error) {
          res.status(404).json({
            success: false,
            message: error.message,
          });
        }
    }
}
