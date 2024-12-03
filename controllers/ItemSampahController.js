import { ItemSampahService } from '../services/ItemSampahService.js';

export class ItemSampahController {
  constructor() {
    this.service = new ItemSampahService();
  }

  // Mendapatkan semua item sampah
  async getAll(req, res) {
    try {
      const data = await this.service.getAllItemSampah();
      res.status(200).json({
        status: "success",
        message: "Data item sampah berhasil ditemukan",
        data: data
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Terjadi kesalahan saat mengambil data item sampah",
        error: error.message
      });
    }
  }

  // Membuat item sampah baru
  async create(req, res) {
    try {
      const itemSampahData = req.body;
      const newItemSampah = await this.service.createItemSampah(itemSampahData);
      res.status(201).json({
        status: "success",
        message: "Item sampah berhasil dibuat",
        data: newItemSampah
      });
    } catch (error) {
      res.status(400).json({
        status: "error",
        message: error.message
      });
    }
  }

    // Delete an item
  // async deleteItem(req, res) {
  //   const { id } = req.params;
  //   try {
  //     await this.service.deleteItemSampah(id);
  //     res.status(200).json({ status: 'success', message: 'Item Sampah deleted successfully' });
  //   } catch (error) {
  //     res.status(500).json({ status: 'error', message: error.message });
  //   }
  // }

    // Delete an item
  async deleteItem(req, res) {
    const { id } = req.params;
    try {
      // Pastikan ID benar
      if (!id) {
        return res.status(400).json({ status: 'error', message: 'ID is required' });
      }
      
      // Cek apakah item dengan ID tersebut ada
      const item = await this.service.getItemSampahById(id);
      if (!item) {
        return res.status(404).json({ status: 'error', message: 'Item Sampah not found' });
      }

      // Jika ada, lanjutkan untuk menghapus
      await this.service.deleteItemSampah(id);
      res.status(200).json({ status: 'success', message: 'Item Sampah deleted successfully' });
    } catch (error) {
      console.error('Error during deletion:', error);  // Log error untuk diagnosa lebih lanjut
      res.status(500).json({ status: 'error', message: error.message });
    }
  }

}
