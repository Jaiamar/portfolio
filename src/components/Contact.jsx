import React, { useState } from 'react';
import { motion } from 'framer-motion';

const socials = [
  {
    label: 'Email',
    value: 'jaiamarifs@gmail.com',
    href: 'mailto:jaiamarifs@gmail.com',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <path d="m2 7 10 7 10-7"/>
      </svg>
    ),
    color: '#4f46e5',
    bg: 'rgba(79,70,229,0.07)',
    border: 'rgba(79,70,229,0.15)',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/jaiamar-s',
    href: 'https://www.linkedin.com/in/jaiamar-s-0544b0274/',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
    color: '#0077b5',
    bg: 'rgba(0,119,181,0.07)',
    border: 'rgba(0,119,181,0.15)',
  },
  {
    label: 'GitHub',
    value: 'github.com/Jaiamar',
    href: 'https://github.com/Jaiamar',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
      </svg>
    ),
    color: '#24292f',
    bg: 'rgba(36,41,47,0.06)',
    border: 'rgba(36,41,47,0.12)',
  },
];

export default function Contact() {
  const [hovered, setHovered] = useState(null);

  return (
    <section id="contact" style={{
      background: 'linear-gradient(180deg, #f0f3ff 0%, #f8f9ff 60%, #f5f3ff 100%)',
      padding: '120px 0 60px',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Top wave */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, lineHeight: 0, pointerEvents: 'none' }}>
        <svg viewBox="0 0 1440 60" fill="none" style={{ width: '100%' }}>
          <path d="M0 60L60 50C120 40 240 20 360 15C480 10 600 20 720 25C840 30 960 30 1080 25C1200 20 1320 10 1380 5L1440 0V60H0Z" fill="#fafbff"/>
        </svg>
      </div>

      {/* BG orbs */}
      <div style={{
        position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
        width: '700px', height: '400px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(79,70,229,0.07) 0%, transparent 70%)',
        filter: 'blur(80px)', pointerEvents: 'none',
      }} />
      <div className="dot-grid" style={{ position: 'absolute', inset: 0, opacity: 0.4, pointerEvents: 'none' }} />

      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: '60px' }}
        >
          <div className="section-tag" style={{ justifyContent: 'center' }}>Get In Touch</div>
          <h2 className="section-title">Let's <span className="gradient-text">Connect</span></h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '460px', margin: '14px auto 0' }}>
            Open to full-time roles, internships, and exciting collaborations.
            Let's build something great together.
          </p>
        </motion.div>

        {/* Main CTA card */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="shine"
          style={{
            maxWidth: '640px', margin: '0 auto 56px',
            background: '#ffffff',
            border: '1px solid rgba(79,70,229,0.12)',
            borderRadius: '24px', padding: '52px 44px',
            textAlign: 'center',
            boxShadow: '0 8px 40px rgba(79,70,229,0.1), 0 2px 8px rgba(15,23,42,0.06)',
            position: 'relative', overflow: 'hidden',
          }}
        >
          {/* Top color bar */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '4px',
            background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-violet), var(--accent-pink))',
            borderRadius: '24px 24px 0 0',
          }} />
          {/* Subtle bg gradient */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse at 50% 0%, rgba(79,70,229,0.05) 0%, transparent 60%)',
          }} />

          <div style={{
            width: '64px', height: '64px', borderRadius: '50%',
            background: 'rgba(79,70,229,0.08)',
            border: '1px solid rgba(79,70,229,0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.8rem', margin: '0 auto 20px',
            position: 'relative',
          }}>
            🤝
          </div>

          <h3 style={{
            fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)',
            marginBottom: '12px', position: 'relative',
          }}>
            Open to Opportunities
          </h3>
          <p style={{
            color: 'var(--text-secondary)', marginBottom: '32px', lineHeight: 1.72,
            position: 'relative',
          }}>
            Whether you have a full-time role, freelance project, or want to collaborate
            on cutting-edge AI research — I'd love to hear from you.
          </p>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', position: 'relative' }}>
            <a href="mailto:jaiamarifs@gmail.com" className="btn-primary" data-cursor style={{ textDecoration: 'none' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" style={{ flexShrink: 0 }}>
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="m2 7 10 7 10-7"/>
              </svg>
              <span>Send an Email</span>
            </a>
            <a href="https://www.linkedin.com/in/jaiamar-s-0544b0274/" target="_blank" rel="noreferrer" className="btn-secondary" data-cursor>
              <span>LinkedIn Profile</span>
            </a>
          </div>
        </motion.div>

        {/* Social cards */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap', marginBottom: '80px' }}>
          {socials.map((s, i) => (
            <motion.a
              key={i}
              href={s.href}
              target={s.href.startsWith('mailto') ? undefined : '_blank'}
              rel="noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.04, y: -3 }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '16px 22px', textDecoration: 'none',
                background: hovered === i ? s.bg : '#ffffff',
                border: `1px solid ${hovered === i ? s.border : 'rgba(148,163,184,0.15)'}`,
                borderRadius: '16px',
                color: hovered === i ? s.color : 'var(--text-secondary)',
                boxShadow: hovered === i
                  ? `0 8px 24px rgba(15,23,42,0.1), 0 0 0 1px ${s.color}12`
                  : '0 2px 10px rgba(15,23,42,0.06)',
                transition: 'all 0.3s', cursor: 'none',
              }}
              data-cursor
            >
              <span style={{ color: hovered === i ? s.color : 'var(--text-muted)', transition: 'color 0.3s' }}>
                {s.icon}
              </span>
              <div>
                <div style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: '2px' }}>
                  {s.label}
                </div>
                <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)' }}>{s.value}</div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Professional Footer */}
        <div style={{
          marginTop: '100px',
          borderTop: '1px solid rgba(79,70,229,0.15)',
          paddingTop: '60px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '40px',
          textAlign: 'left'
        }} className="pro-footer">
          
          {/* Brand Col */}
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.4rem', fontWeight: 800, marginBottom: '16px' }}>
              <span className="gradient-text">Jaiamar</span>
              <span style={{ color: 'var(--accent-primary)' }}>.</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '24px' }}>
              Architecting scalable, high-performance web solutions and AI systems that drive true business value. Emphasizing clean code and robust architecture in every project.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: 'var(--text-primary)', fontSize: '1rem', fontWeight: 700, marginBottom: '20px' }}>Navigation</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['Home', 'Services', 'Experience', 'Projects', 'Contact'].map(link => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = 'var(--accent-primary)'} onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 style={{ color: 'var(--text-primary)', fontSize: '1rem', fontWeight: 700, marginBottom: '20px' }}>Reach Out</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <a href="mailto:jaiamarifs@gmail.com" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-primary)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                jaiamarifs@gmail.com
              </a>
              <a href="https://wa.me/919342844932" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#25D366'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                +91 93428 44932
              </a>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                Available Worldwide
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid rgba(79,70,229,0.08)',
          paddingTop: '28px',
          marginTop: '40px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: '10px',
        }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            © {new Date().getFullYear()} <span className="gradient-text" style={{ fontWeight: 700 }}>Jaiamar S.</span> — All rights reserved.
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Elevating the Web, One Project at a Time
          </span>
        </div>
      </div>
    </section>
  );
}
