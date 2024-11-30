export class KategoriSampahValidation {
  static validateCreate(data) {
    if (!data.nama || data.nama.trim().length === 0) {
      throw new Error("Nama kategori sampah harus diisi");
    }
    // Tambahkan validasi lainnya jika perlu
  }
}
