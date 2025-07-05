"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: "/dashboard", label: "Home" },
    { href: "/reserve", label: "Rent a Bike" },
    { href: "/my-rentals", label: "My Rentals" },
    { href: "/about", label: "About" },
  ];

  return (
    <nav style={{ background: '#fff', padding: '0 12px', display: 'flex', alignItems: 'center', height: 80, boxShadow: '0 2px 8px rgba(0,0,0,0.03)', position: 'relative', zIndex: 10 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'transparent' }}>
        <img src="/logo-spartan.png" alt="Sparta Logo" style={{ height: 60, width: 'auto', background: 'transparent' }} />
        <span style={{ fontWeight: 700, color: '#b22222', fontSize: 22, letterSpacing: 1, marginLeft: 8, background: 'transparent' }}>SPARTA</span>
      </div>
      {/* Desktop nav links */}
      <div className="navbar-links" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 40, background: 'transparent' }}>
        {navLinks.map(link => (
          <a
            key={link.href}
            href={link.href}
            style={{
              color: pathname === link.href ? '#1976d2' : '#444',
              fontWeight: pathname === link.href ? 600 : 500,
              textDecoration: 'none',
              fontSize: 18,
              background: 'transparent',
              display: 'inline-block',
            }}
          >
            {link.label}
          </a>
        ))}
      </div>
      <button style={{ background: '#e0e0e0', color: '#222', fontWeight: 600, border: 'none', borderRadius: 8, padding: '8px 22px', fontSize: 16, cursor: 'pointer', marginLeft: 24, backgroundClip: 'padding-box', zIndex: 11 }} onClick={() => { window.location.href = '/'; }}>Logout</button>
      {/* Hamburger icon for mobile */}
      <button
        className="hamburger"
        aria-label="Open menu"
        onClick={() => setMenuOpen(true)}
        style={{
          display: 'none',
          background: 'none',
          border: 'none',
          fontSize: 32,
          marginLeft: 16,
          cursor: 'pointer',
          zIndex: 12,
        }}
      >
        &#9776;
      </button>
      {/* Mobile menu overlay */}
      {menuOpen && (
        <div
          className="mobile-menu-overlay"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.4)',
            zIndex: 100,
            display: 'flex',
            flexDirection: 'column',
          }}
          onClick={() => setMenuOpen(false)}
        >
          <div
            className="mobile-menu"
            style={{
              background: '#fff',
              width: '80vw',
              maxWidth: 320,
              height: '100vh',
              padding: '32px 24px',
              boxShadow: '2px 0 16px rgba(0,0,0,0.12)',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
            }}
            onClick={e => e.stopPropagation()}
          >
            <button
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: 32,
                color: '#b22222',
                position: 'absolute',
                top: 16,
                right: 16,
                cursor: 'pointer',
              }}
            >
              &times;
            </button>
            <div style={{ marginTop: 48, display: 'flex', flexDirection: 'column', gap: 28 }}>
              {navLinks.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  style={{
                    color: pathname === link.href ? '#1976d2' : '#444',
                    fontWeight: pathname === link.href ? 700 : 500,
                    textDecoration: 'none',
                    fontSize: 22,
                    padding: '8px 0',
                  }}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <button style={{ background: '#e0e0e0', color: '#222', fontWeight: 600, border: 'none', borderRadius: 8, padding: '10px 0', fontSize: 18, cursor: 'pointer', marginTop: 24 }} onClick={() => { window.location.href = '/'; }}>Logout</button>
            </div>
          </div>
        </div>
      )}
      {/* Responsive styles */}
      <style>{`
        @media (max-width: 700px) {
          .navbar-links {
            display: none !important;
          }
          .hamburger {
            display: block !important;
          }
        }
      `}</style>
    </nav>
  );
} 