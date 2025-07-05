"use client";
import { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import { EffectCoverflow, Autoplay, Keyboard } from 'swiper/modules';

export default function BikeRentalPage() {
  const swiperRef = useRef<any>(null);
  // Default to desktop values for SSR
  const [slidesPerView, setSlidesPerView] = useState(3);
  const [swiperWidth, setSwiperWidth] = useState<number | string>(900);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 600) {
        setSlidesPerView(1);
        setSwiperWidth('100vw');
      } else if (window.innerWidth < 900) {
        setSlidesPerView(2);
        setSwiperWidth(360);
      } else {
        setSlidesPerView(3);
        setSwiperWidth(900);
      }
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: `url('/car-rental-app.jpg') center center / cover no-repeat fixed` }}>
      {/* Overlay for darkening the background */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(80,80,80,0.7)',
        zIndex: 0,
        pointerEvents: 'none',
      }} />
      {/* Hero Section */}
      <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '0 8px' }}>
        <Swiper
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={slidesPerView}
          loop={true}
          coverflowEffect={{
            rotate: 30,
            stretch: 0,
            depth: 150,
            modifier: 1,
            slideShadows: true,
          }}
          modules={[EffectCoverflow, Autoplay, Keyboard]}
          style={{ width: swiperWidth, maxWidth: '100vw', padding: '40px 0' }}
          keyboard={{ enabled: true, onlyInViewport: true }}
          onSwiper={swiper => (swiperRef.current = swiper)}
        >
          {Array.from({ length: 10 }).map((_, i) => (
            <SwiperSlide key={i}>
              <div style={{
                background: '#fff',
                borderRadius: 18,
                boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
                border: '2px solid #1976d2',
                minWidth: 180,
                maxWidth: 260,
                width: '90vw',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: 16,
                margin: '0 auto',
              }}>
                <img src="/Bike.jpg" alt={`Bike ${i + 1}`} style={{ width: '100%', height: 120, objectFit: 'cover', borderRadius: 10, marginBottom: 16, border: '1.5px solid #eee' }} />
                <div style={{ fontWeight: 800, fontSize: 22, color: '#1976d2', marginBottom: 8, letterSpacing: 1, textShadow: '0 1px 2px #eee' }}>{`Bike ${i + 1}`}</div>
                <div style={{ color: '#555', fontSize: 16, marginBottom: 18, textAlign: 'center' }}>Available for BSU students</div>
                <button style={{
                  background: '#1976d2',
                  color: '#fff',
                  fontWeight: 700,
                  padding: '10px 0',
                  borderRadius: 8,
                  fontSize: 16,
                  border: 'none',
                  cursor: 'pointer',
                  width: '100%',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  marginTop: 'auto',
                }}>
                  Rent Now
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </main>
    </div>
  );
} 