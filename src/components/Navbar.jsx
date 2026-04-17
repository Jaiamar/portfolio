import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Awards', href: '#awards' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href) => {
    setActive(href);
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 1000,
        padding: '0 24px',
        transition: 'all 0.4s ease',
        background: scrolled
          ? 'rgba(3, 7, 18, 0.85)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
      }}
    >
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '72px',
      }}>
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          style={{ cursor: 'none' }}
          onClick={() => handleNav('#hero')}
        >
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '1.1rem',
            fontWeight: 700,
          }}>
            <span className="gradient-text">Jaiamar</span>
            <span style={{ color: 'var(--accent-cyan)', marginLeft: 2 }}>.</span>
          </span>
        </motion.div>

        {/* Desktop Links */}
        <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }} className="desktop-nav">
          {navItems.map((item, i) => (
            <motion.button
              key={item.href}
              onClick={() => handleNav(item.href)}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 + 0.3 }}
              style={{
                background: 'none',
                border: active === item.href ? '1px solid rgba(0,212,255,0.3)' : '1px solid transparent',
                borderRadius: '50px',
                padding: '6px 16px',
                color: active === item.href ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                fontFamily: 'var(--font-main)',
                fontSize: '0.88rem',
                fontWeight: 500,
                cursor: 'none',
                transition: 'all 0.3s',
                backgroundColor: active === item.href ? 'rgba(0,212,255,0.07)' : 'transparent',
              }}
              onMouseEnter={e => {
                if (active !== item.href) {
                  e.target.style.color = 'var(--text-primary)';
                  e.target.style.backgroundColor = 'rgba(255,255,255,0.04)';
                }
              }}
              onMouseLeave={e => {
                if (active !== item.href) {
                  e.target.style.color = 'var(--text-secondary)';
                  e.target.style.backgroundColor = 'transparent';
                }
              }}
            >
              {item.label}
            </motion.button>
          ))}

          <motion.a
            href="mailto:jaiamarifs@gmail.com"
            className="btn-primary"
            style={{ padding: '8px 20px', fontSize: '0.85rem', marginLeft: '8px', textDecoration: 'none' }}
            whileHover={{ scale: 1.05 }}
            data-cursor
          >
            <span>Hire Me</span>
          </motion.a>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            color: 'var(--text-primary)',
            cursor: 'none',
            flexDirection: 'column',
            gap: '5px',
            padding: '4px',
          }}
          className="mobile-menu-btn"
        >
          {[0,1,2].map(i => (
            <span key={i} style={{
              display: 'block', width: '22px', height: '2px',
              background: menuOpen
                ? i === 1 ? 'transparent' : 'var(--accent-cyan)'
                : 'var(--text-primary)',
              transform: menuOpen
                ? i === 0 ? 'rotate(45deg) translate(5px, 5px)' : i === 2 ? 'rotate(-45deg) translate(5px, -5px)' : ''
                : '',
              transition: 'all 0.3s',
            }} />
          ))}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              background: 'rgba(3, 7, 18, 0.95)',
              backdropFilter: 'blur(20px)',
              borderTop: '1px solid rgba(255,255,255,0.06)',
              padding: '16px 24px',
            }}
          >
            {navItems.map(item => (
              <button
                key={item.href}
                onClick={() => handleNav(item.href)}
                style={{
                  display: 'block', width: '100%', textAlign: 'left',
                  padding: '12px 0', background: 'none', border: 'none',
                  color: 'var(--text-secondary)', fontFamily: 'var(--font-main)',
                  fontSize: '1rem', cursor: 'none',
                  borderBottom: '1px solid rgba(255,255,255,0.04)',
                }}
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </motion.nav>
  );
}
