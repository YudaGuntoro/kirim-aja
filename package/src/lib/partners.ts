export type Partner = { id:string; jenis:"resto"|"toko"; nama:string; kategori:string; alamat:string; deskripsi:string; warna:string; showcase?:boolean };
export const partners:Partner[] = [
 {id:"contoh-kfc",jenis:"resto",nama:"KFC",kategori:"Ayam goreng",alamat:"Alamat restoran contoh",deskripsi:"Pilihan ayam goreng dan menu keluarga.",warna:"#e62b2c",showcase:true},
 {id:"contoh-hokben",jenis:"resto",nama:"HokBen",kategori:"Menu Jepang",alamat:"Alamat restoran contoh",deskripsi:"Pilihan bento dan hidangan ala Jepang.",warna:"#ef4035",showcase:true},
 {id:"contoh-wingstop",jenis:"resto",nama:"Wingstop",kategori:"Sayap ayam",alamat:"Alamat restoran contoh",deskripsi:"Pilihan sayap ayam dengan aneka rasa.",warna:"#176344",showcase:true},
 {id:"contoh-solaria",jenis:"resto",nama:"Solaria",kategori:"Aneka hidangan",alamat:"Alamat restoran contoh",deskripsi:"Aneka nasi, mi, dan hidangan favorit.",warna:"#78519a",showcase:true},
 {id:"dapur-nusantara",jenis:"resto",nama:"Dapur Nusantara",kategori:"Masakan Indonesia",alamat:"Jl. Melati No. 12, Kota Contoh",deskripsi:"Aneka lauk dan hidangan rumahan.",warna:"#fce8ae"},
 {id:"warung-rasa",jenis:"resto",nama:"Warung Rasa",kategori:"Nasi & lauk",alamat:"Jl. Kenanga No. 8, Kota Contoh",deskripsi:"Pilihan nasi dan lauk untuk makan siang.",warna:"#f8dfbb"},
 {id:"mie-sudut",jenis:"resto",nama:"Mie Sudut",kategori:"Mie & camilan",alamat:"Jl. Mawar No. 21, Kota Contoh",deskripsi:"Mie hangat dan camilan favorit.",warna:"#e6edc7"},
 {id:"dapur-bu-rina",jenis:"resto",nama:"Dapur Bu Rina",kategori:"Lauk rumahan",alamat:"Jl. Flamboyan No. 5, Kota Contoh",deskripsi:"Masakan rumahan untuk menu sehari-hari.",warna:"#ffe6bd"},
 {id:"contoh-indomaret",jenis:"toko",nama:"Indomaret",kategori:"Minimarket",alamat:"Alamat toko contoh",deskripsi:"Kebutuhan harian dan aneka camilan.",warna:"#e53e36",showcase:true},
 {id:"contoh-alfamart",jenis:"toko",nama:"Alfamart",kategori:"Minimarket",alamat:"Alamat toko contoh",deskripsi:"Belanja kebutuhan rumah dan sehari-hari.",warna:"#e43d3c",showcase:true},
 {id:"contoh-familymart",jenis:"toko",nama:"FamilyMart",kategori:"Minimarket",alamat:"Alamat toko contoh",deskripsi:"Camilan, minuman, dan kebutuhan praktis.",warna:"#176749",showcase:true},
 {id:"contoh-lawson",jenis:"toko",nama:"Lawson",kategori:"Minimarket",alamat:"Alamat toko contoh",deskripsi:"Pilihan makanan dan kebutuhan harian.",warna:"#1469a7",showcase:true},
 {id:"toko-segar",jenis:"toko",nama:"Toko Segar",kategori:"Buah & sayur",alamat:"Jl. Anggrek No. 15, Kota Contoh",deskripsi:"Buah, sayur, dan kebutuhan dapur.",warna:"#e5edc8"},
 {id:"warung-harian",jenis:"toko",nama:"Warung Harian",kategori:"Kebutuhan sehari-hari",alamat:"Jl. Melati No. 30, Kota Contoh",deskripsi:"Belanja kebutuhan harian lebih praktis.",warna:"#fce8ae"},
 {id:"toko-serba-ada",jenis:"toko",nama:"Toko Serba Ada",kategori:"Sembako & perlengkapan",alamat:"Jl. Kenanga No. 3, Kota Contoh",deskripsi:"Sembako dan berbagai perlengkapan rumah.",warna:"#f8dfbb"},
 {id:"warung-bu-sari",jenis:"toko",nama:"Warung Bu Sari",kategori:"Sembako",alamat:"Jl. Flamboyan No. 8, Kota Contoh",deskripsi:"Sembako dan kebutuhan dapur sehari-hari.",warna:"#ffe6bd"}
];
