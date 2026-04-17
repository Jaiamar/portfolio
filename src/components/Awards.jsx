import React from 'react';
import { motion } from 'framer-motion';

const awards = [
  {
    icon: '📄',
    title: 'IEEE Research Paper Author',
    subtitle: 'Academic Publication',
    desc: 'Currently authoring an academic paper on Deep Learning for composite defect detection, targeting IEEE publication standards.',
    color: '#4f46e5',
    bg: 'rgba(79,70,229,0.06)',
    border: 'rgba(79,70,229,0.14)',
    gradient: 'linear-gradient(135deg, rgba(79,70,229,0.06), rgba(124,58,237,0.04))',
  },
  {
    icon: '🥈',
    title: '2nd Place — Hackathon',
    subtitle: 'Kongu Engineering College',
    desc: 'Secured second place in the technical Hackathon held at Kongu Engineering College, competing against teams across the state.',
    color: '#d97706',
    bg: 'rgba(217,119,6,0.06)',
    border: 'rgba(217,119,6,0.16)',
    gradient: 'linear-gradient(135deg, rgba(217,119,6,0.06), rgba(245,158,11,0.04))',
  },
  {
    icon: '🏆',
    title: 'Best Performance Award',
    subtitle: 'State-Level Ideathon',
    desc: 'Won the best performance award in the state-level Ideathon competition, recognized for innovation and technical excellence.',
    color: '#7c3aed',
    bg: 'rgba(124,58,237,0.06)',
    border: 'rgba(124,58,237,0.14)',
    gradient: 'linear-gradient(135deg, rgba(124,58,237,0.06), rgba(219,39,119,0.04))',
  },
];

export default function Awards() {
  return (
    <section id="awards" className="section" style={{
      background: 'linear-gradient(180deg, #f5f3ff 0%, #fafbff 60%, #f0f3ff 100%)',
    }}>
      {/* Decorative top wave */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, lineHeight: 0, pointerEvents: 'none' }}>
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%' }}>
          <path d="M0 0L60 10C120 20 240 40 360 45C480 50 600 40 720 35C840 30 960 30 1080 35C1200 40 1320 50 1380 55L1440 60V0H0Z" fill="#fafbff"/>
        </svg>
      </div>

      <div className="dot-grid" style={{ position: 'absolute', inset: 0, opacity: 0.4, pointerEvents: 'none' }} />

      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: '70px' }}
        >
          <div className="section-tag" style={{ justifyContent: 'center' }}>Recognition</div>
          <h2 className="section-title">Honors &amp; <span className="gradient-text">Awards</span></h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '400px', margin: '8px auto 0' }}>
            Milestones that mark the journey
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '24px' }} className="awards-grid">
          {awards.map((a, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50, scale: 0.95, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.14, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.03, y: -6 }}
              style={{
                background: '#ffffff',
                border: `1px solid ${a.border}`,
                borderRadius: '22px', padding: '40px 28px',
                textAlign: 'center', cursor: 'none',
                position: 'relative', overflow: 'hidden',
                boxShadow: `0 4px 24px rgba(15,23,42,0.07), 0 0 0 1px ${a.color}08`,
                transition: 'all 0.3s',
              }}
              data-cursor
            >
              {/* Background gradient */}
              <div style={{
                position: 'absolute', inset: 0,
                background: a.gradient,
              }} />
              {/* Top border accent */}
              <div style={{
                position: 'absolute', top: 0, left: '20%', right: '20%', height: '3px',
                background: `linear-gradient(90deg, transparent, ${a.color}, transparent)`,
                borderRadius: '0 0 3px 3px',
              }} />
              {/* Shine */}
              <div className="shine" style={{ position: 'absolute', inset: 0, borderRadius: '22px' }} />

              {/* Icon with animated bounce */}
              <motion.div
                animate={{ y: [0, -8, 0], scale: [1, 1.08, 1] }}
                transition={{ repeat: Infinity, duration: 2.8 + i * 0.5, ease: 'easeInOut' }}
                style={{
                  fontSize: '3.2rem', marginBottom: '20px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: '72px', height: '72px',
                  background: a.bg, borderRadius: '50%',
                  border: `1px solid ${a.border}`,
                  margin: '0 auto 20px',
                }}
              >
                {a.icon}
              </motion.div>

              <h3 style={{
                fontSize: '1.05rem', fontWeight: 800,
                color: 'var(--text-primary)', marginBottom: '6px',
                position: 'relative',
              }}>
                {a.title}
              </h3>
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.72rem',
                color: a.color, marginBottom: '14px', fontWeight: 600,
                position: 'relative',
              }}>
                {a.subtitle}
              </div>
              <p style={{
                fontSize: '0.865rem', color: 'var(--text-secondary)',
                lineHeight: 1.68, position: 'relative',
              }}>
                {a.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) { .awards-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
