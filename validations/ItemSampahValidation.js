// Validation for Item Sampah
export class ItemSampahValidation {
  static validateCreate(data) {
    if (!data.nama || data.nama.trim().length === 0) {
      throw new Error("Nama item sampah harus diisi");
    }
    if (!data.hargaPerKg || data.hargaPerKg <= 0) {
      throw new Error("Harga per kilogram harus lebih besar dari 0");
    }
    // Validasi harga dan kategori
    if (!data.kategoriSampahId) {
      throw new Error("Kategori sampah harus dipilih");
    }
  }
}