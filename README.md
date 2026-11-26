# KirimAja

Aplikasi demo jasa delivery berbasis Next.js dengan database SQLite baru dan dashboard admin. Gambar, mitra, harga, dan layanan disediakan sebagai contoh untuk mockup. Harga, layanan, dan jam operasional adalah contoh.

## Jalankan

Membutuhkan Node.js 22.13 atau lebih baru (node:sqlite).

```bash
cd package
npm ci
```

Salin `.env.example` menjadi `.env.local` di folder `package`, lalu atur `ADMIN_USERNAME` dan `ADMIN_PASSWORD`. Username bawaan adalah `admin`; untuk demo lokal dapat memakai kata sandi `admin123`. Gunakan kata sandi yang kuat sebelum digunakan publik. Jalankan `npm run dev` dan buka http://localhost:3000. Dashboard ada di http://localhost:3000/admin.

Pesanan disimpan di `package/data/delivery.sqlite`, dibuat otomatis saat pertama kali digunakan. Backup folder `data` untuk mempertahankan pesanan. Dashboard memperbarui daftar setiap 15 detik; status dapat diubah dari daftar pesanan. Database dibuat secara otomatis dan berisi satu pesanan contoh untuk mencoba pelacakan.

Untuk produksi gunakan penyimpanan persisten dan HTTPS. Autentikasi admin menggunakan satu akun environment dan cookie sesi HttpOnly; percobaan login dibatasi per aplikasi; tambahkan sistem akun yang lebih lengkap sebelum digunakan secara publik. Tarif saat ini adalah contoh tetap, bukan perhitungan jarak atau pembayaran online.

## Pelacakan dan penugasan driver

Setiap pesanan baru mendapat tautan pelacakan pribadi. Simpan tautan tersebut setelah membuat pesanan; halaman pelacakan menampilkan status dan nama driver, serta memperbarui data setiap 15 detik. Tautan ini tidak tersedia untuk pesanan lama yang dibuat sebelum fitur pelacakan.

Di dashboard admin, buka halaman **Driver** untuk menambahkan kurir dan menyalin tautan akses pribadinya. Kurir mengaktifkan status dari tautan tersebut. Di halaman **Pesanan**, admin memilih kurir aktif untuk menangani pesanan. Notifikasi penugasan muncul di portal kurir dan diperbarui setiap 15 detik; penugasan lama tetap dipertahankan. Admin mengubah status pesanan secara manual.

Tautan kurir merupakan akses berbasis tautan pribadi untuk keperluan mockup, bukan sistem akun driver produksi. Gunakan HTTPS, bagikan hanya kepada kurir yang bersangkutan, dan tambahkan autentikasi yang lebih kuat sebelum operasional publik. Notifikasi tampil di portal kurir saat halaman terbuka; push notification dan pelacakan GPS belum tersedia.

## Domain dan deployment

Website disiapkan untuk `kirim-aja.nusakaryadigital.com` dan panel untuk `panel-kirim-aja.nusakaryadigital.com`. Akses akar domain panel diarahkan ke `/admin`. Di VPS, gunakan `.env` root (berdasarkan `.env.example`) dan Docker Compose; simpan data SQLite pada volume `kirimaja_data`. Perubahan `NEXT_PUBLIC_*` memerlukan build ulang karena nilai dibenamkan saat build. Panduan tugas deployment pertama tersedia di [DEPLOY-VPS.md](DEPLOY-VPS.md).

## Struktur data dan pengujian

Akses data ditempatkan di `src/lib/repositories`, sedangkan validasi dan aturan pembuatan pesanan berada di `src/lib/services`. Migrasi skema dicatat di tabel `schema_migrations` dan berjalan otomatis dalam transaksi. Migrasi mempertahankan nama kurir lama yang belum terhubung ke data driver. Backup database sebelum memperbarui aplikasi.

Jalankan `npm run typecheck` dan `npm run test:api`. Tes API menjalankan server dan database sementara terpisah dari data pesanan yang digunakan aplikasi. Variabel `KIRIMAJA_DATA_DIR` dapat digunakan untuk menentukan folder database secara eksplisit.

Fitur bid lama sudah dinonaktifkan; data bid lama tidak dihapus. Jenis layanan dan status menggunakan katalog dengan kode teks sebagai kunci; nilai historis tetap dipertahankan. Harga disimpan sebagai nilai pesanan agar perubahan tarif tidak mengubah riwayat. Akun admin tunggal dan tautan kurir masih untuk demo; sistem akun kurir dan pembatasan login per pengguna/per alamat IP masih diperlukan sebelum produksi.
