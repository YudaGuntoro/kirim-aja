export type Partner = { id:string; jenis:"resto"|"toko"; nama:string; kategori:string; alamat:string; deskripsi:string; warna:string };
export const partners:Partner[] = [
 {id:"dapur-nusantara",jenis:"resto",nama:"Dapur Nusantara",kategori:"Masakan Indonesia",alamat:"Jl. Melati No. 12, Kota Contoh",deskripsi:"Aneka lauk dan hidangan rumahan.",warna:"#fce8ae"},
 {id:"warung-rasa",jenis:"resto",nama:"Warung Rasa",kategori:"Nasi & lauk",alamat:"Jl. Kenanga No. 8, Kota Contoh",deskripsi:"Pilihan nasi dan lauk untuk makan siang.",warna:"#f8dfbb"},
 {id:"mie-sudut",jenis:"resto",nama:"Mie Sudut",kategori:"Mie & camilan",alamat:"Jl. Mawar No. 21, Kota Contoh",deskripsi:"Mie hangat dan camilan favorit.",warna:"#e6edc7"},
 {id:"toko-segar",jenis:"toko",nama:"Toko Segar",kategori:"Buah & sayur",alamat:"Jl. Anggrek No. 15, Kota Contoh",deskripsi:"Buah, sayur, dan kebutuhan dapur.",warna:"#e5edc8"},
 {id:"warung-harian",jenis:"toko",nama:"Warung Harian",kategori:"Kebutuhan sehari-hari",alamat:"Jl. Melati No. 30, Kota Contoh",deskripsi:"Belanja kebutuhan harian lebih praktis.",warna:"#fce8ae"},
 {id:"toko-serba-ada",jenis:"toko",nama:"Toko Serba Ada",kategori:"Sembako & perlengkapan",alamat:"Jl. Kenanga No. 3, Kota Contoh",deskripsi:"Sembako dan berbagai perlengkapan rumah.",warna:"#f8dfbb"}
];
