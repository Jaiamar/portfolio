import React from 'react';
import { motion } from 'framer-motion';

const awards = [
  {
    icon: '📄',
    title: 'IEEE Research Paper Author',
    subtitle: 'Academic Publication',
    desc: 'Currently authoring an academic paper on Deep Learning for composite defect detection, targeting IEEE publication standards.',
    color: 'var(--accent-cyan)',
    glow: 'rgba(0,212,255,0.2)',
  },
  {
    icon: '🥈',
    title: '2nd Place — Hackathon',
    subtitle: 'Kongu Engineering College',
    desc: 'Secured second place in the technical Hackathon held at Kongu Engineering College, competing against teams across the state.',
    color: '#f59e0b',
    glow: 'rgba(245,158,11,0.2)',
  },
  {
    icon: '🏆',
    title: 'Best Performance Award',
    subtitle: 'State-Level Ideathon',
    desc: 'Won the best performance award in the state-level Ideathon competition, recognized for innovation and technical excellence.',
    color: 'var(--accent-violet)',
    glow: 'rgba(168,85,247,0.2)',
  },
];

export default function Awards() {
  return (
    <section id="awards" className="section" style={{
      background: 'var(--bg-secondary)',
    }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: '70px' }}
        >
          <div className="section-tag" style={{ justifyContent: 'center' }}>Recognition</div>
          <h2 className="section-title">
            Honors &amp; <span className="gradient-text">Awards</span>
          </h2>
        </motion.div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px',
        }} className="awards-grid">
          {awards.map((a, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50, scale: 0.95, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.03, y: -6 }}
              className="glass-card"
              style={{
                padding: '36px 28px',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'none',
              }}
              data-cursor
            >
              {/* Glow bg */}
              <div style={{
                position: 'absolute', inset: 0,
                background: `radial-gradient(circle at 50% 0%, ${a.glow} 0%, transparent 60%)`,
                pointerEvents: 'none',
              }} />
              {/* Top border glow */}
              <div style={{
                position: 'absolute', top: 0, left: '20%', right: '20%', height: '2px',
                background: `linear-gradient(90deg, transparent, ${a.color}, transparent)`,
                boxShadow: `0 0 20px ${a.color}`,
              }} />

              <motion.div
                animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                transition={{ repeat: Infinity, duration: 3 + i, ease: 'easeInOut' }}
                style={{ fontSize: '3.5rem', marginBottom: '20px', display: 'block' }}
              >
                {a.icon}
              </motion.div>

              <h3 style={{
                fontSize: '1.1rem', fontWeight: 800, marginBottom: '6px',
                color: 'var(--text-primary)',
              }}>
                {a.title}
              </h3>
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.75rem',
                color: a.color, marginBottom: '14px',
              }}>
                {a.subtitle}
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                {a.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .awards-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
