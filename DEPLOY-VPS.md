# Prompt deployment pertama KirimAja di VPS

Jalankan prompt berikut pada asisten yang memiliki akses terminal ke VPS tujuan:

```text
Deploy pertama kali proyek KirimAja dari repository:
https://github.com/YudaGuntoro/kirim-aja.git

Domain website: kirim-aja.nusakaryadigital.com
Domain panel: panel-kirim-aja.nusakaryadigital.com

Tugas:
1. Periksa sistem VPS, penggunaan disk dan RAM, Docker/Compose, reverse proxy (Nginx atau yang sudah aktif), dan layanan yang sudah berjalan. Jangan menghentikan atau mengubah situs lain.
2. Periksa port aplikasi yang sudah digunakan dengan `ss -ltnp` serta konfigurasi/container yang ada. Temukan port terakhir yang digunakan oleh aplikasi yang relevan, tambahkan 1, lalu periksa apakah port berikutnya benar-benar kosong. Jika masih dipakai, naikkan sampai menemukan port kosong. Jangan pilih port sistem 80/443 atau port yang bentrok. Jika tidak jelas mana port aplikasi terakhir atau rentang portnya tidak masuk akal, jelaskan temuan dan tanyakan sebelum memilih. Catat port terpilih sebagai DELIVERY_PORT.
3. Periksa DNS kedua domain mengarah ke VPS. Jika belum cocok, laporkan nilai yang harus diubah dan jangan mengklaim website sudah aktif. Jangan mengubah DNS tanpa akses dan otorisasi yang sesuai.
4. Clone repository ke direktori baru yang jelas, misalnya /opt/kirim-aja. Jika direktori sudah ada, periksa isinya dan status Git terlebih dahulu; jangan menimpa data atau menghapus direktori yang sudah ada.
5. Buat .env root dari .env.example hanya jika belum ada. Isi DELIVERY_PORT dengan hasil pemeriksaan dan buat ADMIN_PASSWORD yang kuat dan unik. Atur NEXT_PUBLIC_ADMIN_URL=https://panel-kirim-aja.nusakaryadigital.com/admin. Jangan tampilkan isi .env atau kata sandi dalam output/chat; beri tahu lokasi penyimpanan dan cara pemilik mendapatkan atau mengganti kata sandi dengan aman.
6. Jalankan `docker compose config -q`, kemudian `docker compose up -d --build`. Pastikan container sehat dan website merespons pada 127.0.0.1:PORT. Pastikan volume database kirimaja_data tetap persisten dan jangan menghapus volume saat pembaruan.
7. Tambahkan konfigurasi reverse proxy terpisah untuk kedua domain ke 127.0.0.1:PORT. Pertahankan Host, X-Forwarded-For, dan X-Forwarded-Proto; jangan menimpa konfigurasi layanan lain. Akar domain panel akan diarahkan aplikasi ke /admin. Periksa konfigurasi proxy sebelum reload dan terapkan TLS/HTTPS menggunakan cara yang sudah dipakai VPS (misalnya Certbot jika sesuai). Jangan menonaktifkan sertifikat atau pengaturan lain.
8. Uji HTTPS website, pengalihan panel ke /admin, login admin menggunakan kata sandi yang sudah diatur tanpa menampilkan nilainya, pembuatan pesanan contoh, pelacakan, dan persistensi database. Bersihkan hanya data uji yang baru Anda buat, tanpa menghapus data lain. Jika DNS/sertifikat belum siap, lakukan pemeriksaan lokal yang memungkinkan dan laporkan dengan jujur.
9. Laporkan direktori proyek, port terpilih dan cara memilihnya, status masing-masing domain/HTTPS, hasil uji, lokasi .env dan volume data, serta perintah pembaruan dan backup. Jangan tampilkan rahasia.

Catatan: proyek saat ini mockup. Dashboard memakai satu kata sandi admin dari environment, belum merupakan sistem akun multi-pengguna. Jangan anggap ini siap produksi untuk data sensitif tanpa peningkatan keamanan. Data resto/toko dan satu pesanan pelacakan adalah contoh.
```
