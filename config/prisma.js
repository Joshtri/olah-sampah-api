import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'], // Log query dan event penting Prisma
});

// Validasi koneksi Prisma ke MongoDB
async function validateConnection() {
  try {
    await prisma.$connect();
    console.log('Connected to MongoDB successfully!');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error.message);
    process.exit(1); // Keluar dengan kode error jika koneksi gagal
  }
}

// Panggil fungsi validasi
validateConnection();

export default prisma; // Ekspor Prisma Client untuk digunakan di file lain
