export type FoodMenu={id:string;partnerId:string;name:string;description:string;price:number;discount?:number;imagePosition:string};
// Data contoh untuk demonstrasi; bukan daftar menu atau harga mitra sebenarnya.
export const foodMenus:FoodMenu[]=[
 {id:"nasi-goreng",partnerId:"warung-rasa",name:"Nasi Goreng Telur",description:"Nasi goreng berbumbu dengan telur mata sapi, sayuran, dan kerupuk.",price:22000,discount:10,imagePosition:"49% 70%"},
 {id:"ayam-goreng",partnerId:"dapur-nusantara",name:"Nasi Ayam Goreng",description:"Ayam goreng gurih dengan nasi hangat, lalapan, dan sambal.",price:28000,discount:20,imagePosition:"52% 19%"},
 {id:"sate-ayam",partnerId:"dapur-nusantara",name:"Sate Ayam",description:"Sate ayam bakar dengan saus kacang dan irisan bawang.",price:25000,imagePosition:"92% 75%"},
 {id:"nasi-rendang",partnerId:"warung-rasa",name:"Nasi Rendang",description:"Nasi hangat dengan rendang berbumbu dan sayuran.",price:32000,imagePosition:"13% 50%"},
];
