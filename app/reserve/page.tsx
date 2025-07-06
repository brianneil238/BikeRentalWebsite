"use client";
import { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import { EffectCoverflow, Autoplay, Keyboard } from 'swiper/modules';
import { useRouter } from 'next/navigation';

export default function BikeRentalPage() {
  const swiperRef = useRef<any>(null);
  const router = useRouter();
  // Default to desktop values for SSR
  const [slidesPerView, setSlidesPerView] = useState(3);
  const [swiperWidth, setSwiperWidth] = useState<number | string>(900);
  const [bikes, setBikes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    async function fetchBikes() {
      setLoading(true);
      try {
        const res = await fetch('/api/bikes');
        const data = await res.json();
        if (data.success) {
          setBikes(data.bikes);
        } else {
          setBikes([]);
        }
      } catch {
        setBikes([]);
      }
      setLoading(false);
    }
    fetchBikes();
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
        {loading ? (
          <div style={{ color: '#1976d2', fontWeight: 700, fontSize: 24, marginTop: 40 }}>Loading bikes...</div>
        ) : bikes.length === 0 ? (
          <div style={{ color: '#b22222', fontWeight: 700, fontSize: 22, marginTop: 40 }}>No bikes available at the moment.</div>
        ) : (
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
            {bikes.map((bike, i) => (
              <SwiperSlide key={bike.id}>
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
                  <img src="/Bike.jpg" alt={bike.name} style={{ width: '100%', height: 120, objectFit: 'cover', borderRadius: 10, marginBottom: 16, border: '1.5px solid #eee' }} />
                  <div style={{ fontWeight: 800, fontSize: 22, color: '#1976d2', marginBottom: 8, letterSpacing: 1, textShadow: '0 1px 2px #eee' }}>{bike.name}</div>
                  <div style={{ color: '#555', fontSize: 16, marginBottom: 18, textAlign: 'center' }}>Available for BSU students</div>
                  {/* Amenities section */}
                  <div style={{ color: '#1976d2', fontWeight: 600, fontSize: 15, marginBottom: 10, textAlign: 'center' }}>
                    Amenities
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#444', fontSize: 15, marginBottom: 16, textAlign: 'center' }}>
                    <li>🪖 Helmet</li>
                    <li>🥤 Tumbler</li>
                    <li>🛠️ Air pump</li>
                  </ul>
                  <div style={{ marginBottom: 10, fontWeight: 600, color: bike.status === 'rented' ? '#b22222' : '#22c55e', fontSize: 15, textAlign: 'center' }}>
                    {bike.status === 'rented' && bike.applications && bike.applications.length > 0
                      ? `Rented by: ${bike.applications[0].firstName} ${bike.applications[0].lastName}`
                      : 'Available'}
                  </div>
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
                  }}
                  onClick={() => router.push('/reserve/apply')}
                  >
                    Rent Now
                  </button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
        <div style={{
          textAlign: 'center',
          color: '#1976d2',
          fontWeight: 800,
          fontSize: 24,
          marginTop: 12,
          letterSpacing: 0.2,
          textShadow: '0 2px 8px #fff, 0 1px 0 #fff',
        }}>
          Swipe or scroll the bikes left and right
        </div>
      </main>
    </div>
  );
} 