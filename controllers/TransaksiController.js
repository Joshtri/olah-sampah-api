// TransaksiController.js
import { TransaksiService } from '../services/TransaksiService.js';

export class TransaksiController {
  constructor() {
    this.transaksiService = new TransaksiService();
  }

  // Method untuk membuat transaksi baru
  async create(req, res) {
    try {
      const transaksiData = req.body;
      console.log('Received data:', transaksiData); // Log data untuk debugging

      // Memeriksa apakah itemTransaksi ada dan tidak kosong
      if (!transaksiData.itemTransaksi || transaksiData.itemTransaksi.length === 0) {
        throw new Error('Items transaksi tidak boleh kosong');
      }

      // Menggunakan service untuk membuat transaksi
      const newTransaksi = await this.transaksiService.createTransaksi(transaksiData);
      res.status(201).json({
        status: 'success',
        message: 'Transaksi berhasil dibuat',
        data: newTransaksi,
      });
    } catch (error) {
      console.error('Error creating transaksi:', error); // Log error lebih lanjut
      res.status(500).json({
        status: 'error',
        message: error.message,
      });
    }
  }

  // Method untuk mengambil semua transaksi
  // async getAll(req, res) {
  //   try {
  //     const transaksi = await this.transaksiService.getAllTransaksi();
  //     res.status(200).json({
  //       status: 'success',
  //       data: transaksi,
  //     });
  //   } catch (error) {
  //     console.error('Error fetching all transaksi:', error);
  //     res.status(500).json({
  //       status: 'error',
  //       message: error.message,
  //     });
  //   }
  // }

  // Mendapatkan semua transaksi
  async getAll(req, res) {
    try {
      const pengepulId = req.query.pengepulId || null;
      const transaksi = await this.transaksiService.getAllTransaksi(pengepulId);
      res.status(200).json({ status: 'success', data: transaksi });
    } catch (error) {
      console.error('Error fetching transaksi:', error);
      res.status(500).json({ status: 'error', message: error.message });
    }
  }

  // Method untuk mengambil transaksi berdasarkan ID
  async getById(req, res) {
    const { id } = req.params;
    try {
      const transaksi = await this.transaksiService.getTransaksiById(id);
      if (!transaksi) {
        res.status(404).json({
          status: 'error',
          message: 'Transaksi tidak ditemukan',
        });
      } else {
        res.status(200).json({
          status: 'success',
          data: transaksi,
        });
      }
    } catch (error) {
      console.error('Error fetching transaksi by ID:', error);
      res.status(500).json({
        status: 'error',
        message: error.message,
      });
    }
  }

    // Controller method to delete a transaction
  async deleteTransaksi(req, res) {
    const { id } = req.params; // Extracting the ID from request params
    try {
      const deletedTransaksi = await this.transaksiService.deleteTransaksi(id);
      return res.status(200).json({
        status: 'success',
        message: 'Transaksi deleted successfully',
        data: deletedTransaksi,
      });
    } catch (error) {
      console.error('Controller error:', error);
      return res.status(500).json({
        status: 'error',
        message: 'Failed to delete transaksi',
      });
    }
  }

    // Get transaksi by userId
  async getTransaksiByUserId(req, res) {
    const { userId } = req.params;
    try {
      const transaksi = await this.transaksiService.getTransaksiByUserId(userId);
      if (!transaksi || transaksi.length === 0) {
        return res.status(404).json({ error: 'No transaksi found for this user' });
      }
      return res.status(200).json(transaksi);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to fetch transaksi for user' });
    }
  }

  // Handle creating a new transaction by user ID
  async createTransaksiByUserId(req, res) {
    const userId = req.params.userId;
    const data = req.body;
  
    try {
      console.log('Received userId:', userId);
      console.log('Received data:', data);
  
      const newTransaksi = await this.transaksiService.createTransaksiByUserId(userId, data);
  
      res.status(201).json({
        status: 'success',
        message: 'Transaksi berhasil dibuat',
        data: newTransaksi,
      });
    } catch (error) {
      console.error('Error creating transaksi:', error);
      res.status(500).json({
        status: 'error',
        message: error.message,
      });
    }
  }
  

    // Controller untuk memperbarui status transaksi
  async updateStatus(req, res) {
    const { id } = req.params; // ID transaksi dari URL
    const { newStatus } = req.body; // Status baru dari body

    try {
      if (!['pending', 'success', 'failed', 'cancelled'].includes(newStatus)) {
        return res.status(400).json({ error: 'Invalid status' });
      }

      const updatedTransaksi = await this.transaksiService.updateStatusTransaksi(id, newStatus);
      if (!updatedTransaksi) {
        return res.status(404).json({ error: 'Transaksi not found' });
      }

      return res.status(200).json({
        message: 'Status updated successfully',
        data: updatedTransaksi,
      });
    } catch (error) {
      console.error('Error updating status:', error);
      return res.status(500).json({ error: 'Failed to update transaksi status' });
    }
  }


  // Controller method untuk menghitung jumlah transaksi
  async countTransaksi(req, res) {
    try {
      const totalTransaksi = await this.transaksiService.countTransaksi();
      res.status(200).json({ total: totalTransaksi });
    } catch (error) {
      console.error('Error fetching transaction count:', error);
      res.status(500).json({ error: 'Unable to count transactions' });
    }
  }

  async countTransaksiByStatus(req, res) {
    try {
      const { status } = req.params; // Ambil status dari parameter URL
      const totalByStatus = await this.transaksiService.countTransaksiByStatus(status);
      res.status(200).json({ total: totalByStatus, status });
    } catch (error) {
      console.error('Error fetching transaction count by status:', error);
      res.status(500).json({ error: 'Unable to count transactions by status' });
    }
  }

    // Menghitung transaksi berdasarkan pengepulId (untuk pengepul)
    async countTransaksiByPengepulId(req, res) {
      try {
        const { pengepulId } = req.params;
        const total = await this.transaksiService.countTransaksiByPengepulId(pengepulId);
        res.status(200).json({ total });
      } catch (error) {
        console.error('Error counting transactions by pengepulId:', error);
        res.status(500).json({ error: 'Unable to count transactions by pengepulId.' });
      }
    }
  
    // Menghitung transaksi berdasarkan status dan pengepulId (untuk pengepul)
    // async countTransaksiByStatusAndPengepulId(req, res) {
    //   try {
    //     const { pengepulId, statusTransaksi } = req.params;
    //     const total = await this.transaksiService.countTransaksiByStatusAndPengepulId(
    //       statusTransaksi,
    //       pengepulId
    //     );
    //     res.status(200).json({ total });
    //   } catch (error) {
    //     console.error('Error counting transactions by status and pengepulId:', error);
    //     res.status(500).json({ error: 'Unable to count transactions by status and pengepulId.' });
    //   }
    // }

  // Menghitung transaksi berdasarkan status dan pengepulId (untuk pengepul)
  async countTransaksiByStatusAndPengepulId(req, res) {
    try {
      const { pengepulId, statusTransaksi } = req.params;

      // Jika pengepulId adalah "all", hapus filter pengepulId dari query
      const filter = {
        statusTransaksi,
      };

      if (pengepulId !== 'all') {
        filter.pengepulId = pengepulId;
      }

      const total = await this.transaksiService.countTransaksiByStatusAndPengepulId(filter);
      res.status(200).json({ total });
    } catch (error) {
      console.error('Error counting transactions by status and pengepulId:', error);
      res.status(500).json({ error: 'Unable to count transactions by status and pengepulId.' });
    }
  }

    // Mengambil transaksi berdasarkan statusTransaksi dan pengepulId
  async getTransaksiByStatus(req, res) {
    try {
      const { statusTransaksi } = req.query;
      const { pengepulId, role } = req.query;

      const transaksi = await this.transaksiService.getTransaksiByStatusAndPengepulId(
        statusTransaksi,
        pengepulId,
        role
      );

      res.status(200).json({ data: transaksi });
    } catch (error) {
      console.error('Error fetching transactions by status:', error);
      res.status(500).json({ error: 'Unable to fetch transactions.' });
    }
  }





    

}
