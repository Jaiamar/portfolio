import React, { useState } from 'react';
import { motion } from 'framer-motion';

const socials = [
  {
    label: 'Email',
    value: 'jaiamarifs@gmail.com',
    href: 'mailto:jaiamarifs@gmail.com',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m2 7 10 7 10-7" />
      </svg>
    ),
    color: 'var(--accent-cyan)',
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
    color: 'var(--text-secondary)',
  },
];

export default function Contact() {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  return (
    <section id="contact" style={{
      background: 'var(--bg-primary)',
      padding: '120px 0 60px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Top gradient fade */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent, var(--accent-violet), transparent)',
      }} />

      {/* Background glows */}
      <div style={{
        position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)',
        width: '800px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)',
        filter: 'blur(80px)', pointerEvents: 'none',
      }} />

      <div className="container">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: '70px' }}
        >
          <div className="section-tag" style={{ justifyContent: 'center' }}>Get In Touch</div>
          <h2 className="section-title">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '500px', margin: '16px auto 0' }}>
            I'm open to full-time roles, internships, and exciting collaborations.
            Let's build something great together.
          </p>
        </motion.div>

        {/* CTA card */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="glass-card"
          style={{
            maxWidth: '700px', margin: '0 auto 60px',
            padding: '50px 48px',
            textAlign: 'center',
            position: 'relative', overflow: 'hidden',
          }}
        >
          {/* radial glow inside card */}
          <div style={{
            position: 'absolute', top: '-30%', left: '50%', transform: 'translateX(-50%)',
            width: '400px', height: '200px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)',
            filter: 'blur(40px)', pointerEvents: 'none',
          }} />
          <div style={{ position: 'absolute', top: 0, left: '25%', right: '25%', height: '1px', background: 'linear-gradient(90deg, transparent, var(--accent-cyan), transparent)' }} />

          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🤝</div>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '12px' }}>
            Open to Opportunities
          </h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', lineHeight: 1.7 }}>
            Whether you have a full-time role, freelance project, or want to collaborate on
            cutting-edge AI research — I'd love to hear from you.
          </p>
          <a href="mailto:jaiamarifs@gmail.com" className="btn-primary" data-cursor style={{ textDecoration: 'none' }}>
            <span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }}>
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m2 7 10 7 10-7" />
              </svg>
              Send an Email
            </span>
          </a>
        </motion.div>

        {/* Social links */}
        <div style={{
          display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap',
          marginBottom: '80px',
        }}>
          {socials.map((s, i) => (
            <motion.a
              key={i}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              whileHover={{ scale: 1.05, y: -3 }}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              className="glass-card"
              style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '16px 24px', textDecoration: 'none',
                color: hoveredIdx === i ? s.color : 'var(--text-secondary)',
                borderColor: hoveredIdx === i ? `${s.color}40` : 'rgba(255,255,255,0.06)',
                boxShadow: hoveredIdx === i ? `0 0 30px ${s.color}20` : 'none',
                transition: 'all 0.3s',
                cursor: 'none',
              }}
              data-cursor
            >
              <span style={{ color: hoveredIdx === i ? s.color : 'var(--text-muted)', transition: 'color 0.3s' }}>
                {s.icon}
              </span>
              <div>
                <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: '2px' }}>
                  {s.label}
                </div>
                <div style={{ fontSize: '0.9rem', fontWeight: 500 }}>{s.value}</div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Footer bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.05)',
          paddingTop: '32px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: '12px',
        }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            © 2025 <span style={{ color: 'var(--accent-cyan)' }}>Jaiamar S.</span> — All rights reserved.
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            Built with React · Three.js · Framer Motion
          </span>
        </div>
      </div>
    </section>
  );
}
