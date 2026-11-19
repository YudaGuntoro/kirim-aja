# KirimAja

Aplikasi demo jasa delivery berbasis Next.js dengan database SQLite baru dan dashboard admin. Gambar, mitra, harga, dan layanan disediakan sebagai contoh untuk mockup. Harga, layanan, dan jam operasional adalah contoh.

## Jalankan

Membutuhkan Node.js 22.13 atau lebih baru (node:sqlite).

```bash
cd package
npm ci
```

Salin `.env.example` menjadi `.env.local` di folder `package`, lalu atur `ADMIN_PASSWORD`. Gunakan kata sandi yang kuat sebelum digunakan publik. Jalankan `npm run dev` dan buka http://localhost:3000. Dashboard ada di http://localhost:3000/admin.

Pesanan disimpan di `package/data/delivery.sqlite`, dibuat otomatis saat pertama kali digunakan. Backup folder `data` untuk mempertahankan pesanan. Dashboard memperbarui daftar setiap 15 detik; status dapat diubah dari daftar pesanan. Database dibuat secara otomatis dan berisi satu pesanan contoh untuk mencoba pelacakan.

Untuk produksi gunakan penyimpanan persisten dan HTTPS. Autentikasi admin sederhana menggunakan satu kata sandi environment; tambahkan sistem akun, pembatasan percobaan login, dan pengamanan operasional sebelum digunakan secara publik. Tarif saat ini adalah contoh tetap, bukan perhitungan jarak atau pembayaran online.

## Pelacakan dan penugasan driver

Setiap pesanan baru mendapat tautan pelacakan pribadi. Simpan tautan tersebut setelah membuat pesanan; halaman pelacakan menampilkan status dan nama driver, serta memperbarui data setiap 15 detik. Tautan ini tidak tersedia untuk pesanan lama yang dibuat sebelum fitur pelacakan.

Di dashboard admin, masukkan nama driver pada pesanan dan klik **Simpan driver**. Admin mengubah status secara manual. Fitur ini belum menyediakan akun driver, notifikasi, atau pelacakan GPS. Gunakan HTTPS sebelum membagikan tautan secara publik dan jangan bagikan tautan kepada pihak yang tidak berwenang.
