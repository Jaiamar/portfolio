import React from 'react';
import { motion } from 'framer-motion';

const experiences = [
  {
    role: 'Full-Stack Developer Intern',
    company: 'Amdox Technologies',
    location: 'Bangalore',
    period: 'Currently',
    status: 'current',
    desc: 'Developing and maintaining end-to-end web applications, ensuring seamless frontend-to-backend integration and optimizing performance.',
    icon: '💻',
    color: '#4f46e5',
    bg: 'rgba(79,70,229,0.06)',
  },
  {
    role: 'Graphic Designer',
    company: 'Pi By Me Maths',
    location: 'Dubai',
    period: 'Currently',
    status: 'current',
    desc: 'Creating engaging educational visual content and brand assets for a mathematics-focused EdTech platform.',
    icon: '🎨',
    color: '#db2777',
    bg: 'rgba(219,39,119,0.05)',
  },
  {
    role: 'Software Engineer Intern',
    company: 'Saiket System',
    location: 'Pune',
    period: 'Previous',
    status: 'past',
    desc: 'Contributed to core software modules, assisted in architectural decisions, and supported the team in rapid feature deployment.',
    icon: '⚙️',
    color: '#7c3aed',
    bg: 'rgba(124,58,237,0.05)',
  },
  {
    role: 'Full-Stack Developer Intern',
    company: 'Cognyfyz Technologies',
    location: 'Maharashtra',
    period: 'Previous',
    status: 'past',
    desc: 'Worked on building full-stack solutions, designing database schemas, and creating responsive user interfaces for modern web tools.',
    icon: '🌐',
    color: '#059669',
    bg: 'rgba(5,150,105,0.05)',
  },
  {
    role: 'Digital Marketing & Graphic Design',
    company: 'Hapticsad',
    location: 'Tamil Nadu',
    period: 'Previous',
    status: 'past',
    desc: 'Managed a digital marketing agency, implementing strong brand identity design, social media strategy, and visual storytelling campaigns.',
    icon: '📣',
    color: '#d97706',
    bg: 'rgba(217,119,6,0.05)',
  },
];

export default function Timeline() {
  return (
    <section id="experience" className="section" style={{
      background: 'linear-gradient(180deg, #fafbff 0%, #f5f3ff 50%, #f8f9ff 100%)',
    }}>
      <div style={{
        position: 'absolute', top: '50%', right: '-8%', transform: 'translateY(-50%)',
        width: '450px', height: '450px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(8,145,178,0.06) 0%, transparent 70%)',
        filter: 'blur(70px)', pointerEvents: 'none',
      }} />
      <div className="dot-grid" style={{ position: 'absolute', inset: 0, opacity: 0.4, pointerEvents: 'none' }} />

      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: '80px' }}
        >
          <div className="section-tag" style={{ justifyContent: 'center' }}>Experience</div>
          <h2 className="section-title">My <span className="gradient-text">Journey</span></h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '420px', margin: '0 auto' }}>
            A chronicle of roles where I've built, designed, and shipped
          </p>
        </motion.div>

        <div style={{ position: 'relative', maxWidth: '900px', margin: '0 auto' }}>
          {/* Center line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'absolute', left: '50%', top: 0, bottom: 0, width: '2px',
              background: 'linear-gradient(to bottom, transparent, var(--accent-primary) 15%, var(--accent-violet) 60%, var(--accent-pink) 90%, transparent)',
              transform: 'translateX(-50%)', transformOrigin: 'top',
              opacity: 0.35,
            }}
          />

          {experiences.map((exp, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: isLeft ? -50 : 50, filter: 'blur(8px)' }}
                whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.75, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  display: 'flex',
                  justifyContent: isLeft ? 'flex-start' : 'flex-end',
                  paddingBottom: i === experiences.length - 1 ? 0 : '44px',
                  position: 'relative',
                }}
              >
                {/* Timeline dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.09 + 0.25, type: 'spring', stiffness: 200 }}
                  style={{
                    position: 'absolute', left: '50%', top: '22px',
                    transform: 'translate(-50%,-50%)',
                    width: '14px', height: '14px', borderRadius: '50%',
                    background: exp.color, zIndex: 2,
                    border: '3px solid white',
                    boxShadow: `0 0 0 3px ${exp.color}25, 0 2px 8px rgba(15,23,42,0.12)`,
                  }}
                />

                {/* Card */}
                <motion.div
                  whileHover={{ scale: 1.015, y: -2 }}
                  style={{
                    width: '44%',
                    background: '#ffffff',
                    border: `1px solid ${exp.color}18`,
                    borderRadius: '18px',
                    padding: '22px 24px',
                    boxShadow: `0 4px 20px rgba(15,23,42,0.07), 0 0 0 1px ${exp.color}08`,
                    cursor: 'none',
                    position: 'relative', overflow: 'hidden',
                    transition: 'all 0.3s',
                    [isLeft ? 'marginRight' : 'marginLeft']: '6%',
                  }}
                  data-cursor
                >
                  {/* Top accent */}
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
                    background: `linear-gradient(90deg, ${exp.color}, transparent)`,
                    borderRadius: '18px 18px 0 0',
                  }} />
                  {/* Shine */}
                  <div className="shine" style={{ position: 'absolute', inset: 0, borderRadius: '18px' }} />

                  {exp.status === 'current' && (
                    <div style={{
                      display: 'inline-flex', alignItems: 'center', gap: '5px',
                      padding: '3px 10px', borderRadius: '50px',
                      background: 'rgba(5,150,105,0.08)',
                      border: '1px solid rgba(5,150,105,0.2)',
                      fontSize: '0.7rem', color: 'var(--accent-green)',
                      fontFamily: 'var(--font-mono)', marginBottom: '12px',
                    }}>
                      <span style={{
                        width: '5px', height: '5px', borderRadius: '50%',
                        background: 'var(--accent-green)', display: 'inline-block',
                        boxShadow: '0 0 6px var(--accent-green)',
                        animation: 'pulse-soft 2s infinite',
                      }} />
                      CURRENT
                    </div>
                  )}

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <div style={{
                      fontSize: '1.2rem', flexShrink: 0, marginTop: '2px',
                      width: '38px', height: '38px',
                      background: exp.bg, borderRadius: '10px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      border: `1px solid ${exp.color}18`,
                    }}>
                      {exp.icon}
                    </div>
                    <div>
                      <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '3px' }}>
                        {exp.role}
                      </h3>
                      <div style={{ fontSize: '0.83rem', color: exp.color, fontWeight: 600, marginBottom: '3px' }}>
                        {exp.company}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '10px' }}>
                        {exp.location} · {exp.period}
                      </div>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                        {exp.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
