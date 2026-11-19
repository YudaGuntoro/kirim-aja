"use client";
import { useEffect, useRef, useState } from "react";

const slides = [
  {image:"/images/hero/slide-1.png", label:"TEMAN KIRIM ANDALANMU", title:"Lebih dekat", accent:"dengan yang berarti.", description:"Dari makanan favorit hingga paket penting, kami bantu pengirimanmu jadi lebih mudah.", alt:"Kurir mengantar paket dengan sepeda motor"},
  {image:"/images/hero/slide-2.png", label:"KIRIM PERHATIAN DENGAN MUDAH", title:"Kirim perhatian,", accent:"ke mana saja.", description:"From little surprises to daily essentials, we help you deliver dengan yang berarti.", alt:"Kurir menyerahkan paket kepada penerima"},
  {image:"/images/hero/slide-3.png", label:"SIAP MEMBANTU SETIAP HARI", title:"Apa pun kebutuhanmu,", accent:"kami antarkan.", description:"Pilih layanan yang sesuai dan buat pesanan dalam beberapa langkah mudah.", alt:"Paket sedang disiapkan untuk pengiriman"},
];
export default function HeroSlider() {
  const [index,setIndex]=useState(0);
  const [paused,setPaused]=useState(false);
  const [reduced,setReduced]=useState(false);
  const [drag,setDrag]=useState(0);
  const [dragging,setDragging]=useState(false);
  const startX=useRef<number|null>(null);
  const dragged=useRef(false);
  useEffect(()=>{const media=window.matchMedia("(prefers-reduced-motion: reduce)"); const update=()=>setReduced(media.matches); update(); media.addEventListener("change",update); return()=>media.removeEventListener("change",update)},[]);
  useEffect(()=>{if(paused||reduced||dragging)return; const timer=window.setInterval(()=>setIndex(i=>(i+1)%slides.length),6000); return()=>window.clearInterval(timer)},[paused,reduced,dragging]);
  const move=(delta:number)=>setIndex(i=>(i+delta+slides.length)%slides.length);
  const finishDrag=(e:React.PointerEvent<HTMLElement>)=>{if(startX.current===null)return;const distance=e.clientX-startX.current;startX.current=null;setDragging(false);setDrag(0);if(Math.abs(distance)>50)move(distance<0?1:-1)};
  return <section className={'banner-slider'+(dragging?' is-dragging':'')} aria-label="Promosi layanan pengiriman" aria-roledescription="karusel" onMouseEnter={()=>setPaused(true)} onMouseLeave={()=>setPaused(false)} onFocus={()=>setPaused(true)} onBlur={e=>{if(!e.currentTarget.contains(e.relatedTarget))setPaused(false)}} onPointerDown={e=>{if(!e.isPrimary || e.button!==0 || (e.target as HTMLElement).closest('button, a'))return;startX.current=e.clientX;dragged.current=false;setDragging(true);e.currentTarget.setPointerCapture(e.pointerId)}} onPointerMove={e=>{if(startX.current===null)return;const distance=e.clientX-startX.current;if(Math.abs(distance)>5)dragged.current=true;setDrag(distance)}} onPointerUp={finishDrag} onPointerCancel={()=>{startX.current=null;setDragging(false);setDrag(0)}} onClickCapture={e=>{if(dragged.current){e.preventDefault();dragged.current=false}}} onKeyDown={e=>{if(e.key==='ArrowLeft')move(-1);if(e.key==='ArrowRight')move(1)}}>
    <div className="banner-track" style={{transform:`translateX(calc(${-index * 100}% + ${drag}px))`}}>
      {slides.map((slide,i)=><div key={slide.image} className="banner-slide" aria-hidden={i!==index}>
        <div className="wrap banner-content"><div className="banner-copy"><span className="banner-eyebrow">{slide.label}</span><h1>{slide.title}<br/><em>{slide.accent}</em></h1><p>{slide.description}</p><a className="btn banner-cta" href="#pesan" tabIndex={i===index?0:-1}>Mulai kirim</a></div><div className="banner-image" style={{backgroundImage:`url(${slide.image})`}} role="img" aria-label={slide.alt}/></div>
      </div>)}
    </div>
    <button className="banner-arrow banner-prev" type="button" aria-label="Slide sebelumnya" onClick={()=>move(-1)}>&#8249;</button><button className="banner-arrow banner-next" type="button" aria-label="Slide berikutnya" onClick={()=>move(1)}>&#8250;</button>
    <div className="banner-dots" aria-label="Pilih slide">{slides.map((s,i)=><button key={s.image} type="button" className={i===index?'active':''} aria-label={`Tampilkan slide ${i+1}`} aria-current={i===index?'true':undefined} onClick={()=>setIndex(i)}/>)}</div>
  </section>
}
