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
    color: 'var(--accent-cyan)',
  },
  {
    role: 'Graphic Designer',
    company: 'Pi By Me Maths',
    location: 'Dubai',
    period: 'Currently',
    status: 'current',
    desc: 'Creating engaging educational visual content and brand assets for a mathematics-focused EdTech platform.',
    icon: '🎨',
    color: 'var(--accent-pink)',
  },
  {
    role: 'Software Engineer Intern',
    company: 'Saiket System',
    location: 'Pune',
    period: 'Previous',
    status: 'past',
    desc: 'Contributed to core software modules, assisted in architectural decisions, and supported the team in rapid feature deployment.',
    icon: '⚙️',
    color: 'var(--accent-violet)',
  },
  {
    role: 'Full-Stack Developer Intern',
    company: 'Cognyfyz Technologies',
    location: 'Maharashtra',
    period: 'Previous',
    status: 'past',
    desc: 'Worked on building full-stack solutions, designing database schemas, and creating responsive user interfaces for modern web tools.',
    icon: '🌐',
    color: 'var(--accent-green)',
  },
  {
    role: 'Digital Marketing & Graphic Design',
    company: 'Hapticsad',
    location: 'Tamil Nadu',
    period: 'Previous',
    status: 'past',
    desc: 'Managed a digital marketing agency, implementing strong brand identity design, social media strategy, and visual storytelling campaigns.',
    icon: '📣',
    color: '#f59e0b',
  },
];

export default function Timeline() {
  return (
    <section id="experience" className="section" style={{
      background: 'var(--bg-primary)',
    }}>
      {/* background glow */}
      <div style={{
        position: 'absolute', top: '50%', right: '-10%',
        width: '500px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,212,255,0.05) 0%, transparent 70%)',
        filter: 'blur(80px)', pointerEvents: 'none', transform: 'translateY(-50%)',
      }} />

      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: '80px' }}
        >
          <div className="section-tag" style={{ justifyContent: 'center' }}>Experience</div>
          <h2 className="section-title">
            My <span className="gradient-text">Journey</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '450px', margin: '0 auto' }}>
            A chronicle of roles where I've built, designed, and shipped
          </p>
        </motion.div>

        {/* Timeline */}
        <div style={{ position: 'relative', maxWidth: '900px', margin: '0 auto' }}>
          {/* The glowing center line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'absolute', left: '50%', top: 0, bottom: 0,
              width: '2px',
              background: 'linear-gradient(to bottom, transparent, var(--accent-cyan) 10%, var(--accent-violet) 50%, var(--accent-pink) 90%, transparent)',
              transform: 'translateX(-50%)',
              transformOrigin: 'top',
            }}
          />

          {experiences.map((exp, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: isLeft ? -60 : 60, filter: 'blur(8px)' }}
                whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  display: 'flex',
                  justifyContent: isLeft ? 'flex-start' : 'flex-end',
                  paddingBottom: i === experiences.length - 1 ? 0 : '48px',
                  position: 'relative',
                }}
              >
                {/* Dot on timeline */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.3, type: 'spring' }}
                  style={{
                    position: 'absolute', left: '50%', top: '24px',
                    transform: 'translate(-50%, -50%)',
                    width: '14px', height: '14px', borderRadius: '50%',
                    background: exp.color,
                    boxShadow: `0 0 20px ${exp.color}`,
                    border: '2px solid var(--bg-primary)',
                    zIndex: 2,
                  }}
                />

                {/* Card */}
                <motion.div
                  className="glass-card"
                  whileHover={{ scale: 1.02, borderColor: `${exp.color}40` }}
                  style={{
                    width: '44%',
                    padding: '24px',
                    position: 'relative',
                    overflow: 'hidden',
                    cursor: 'none',
                    [isLeft ? 'marginRight' : 'marginLeft']: '6%',
                  }}
                  data-cursor
                >
                  {/* accent */}
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                    background: `linear-gradient(90deg, ${exp.color}, transparent)`,
                  }} />

                  {/* Status badge */}
                  {exp.status === 'current' && (
                    <div style={{
                      display: 'inline-flex', alignItems: 'center', gap: '5px',
                      padding: '3px 10px', borderRadius: '50px',
                      background: 'rgba(16,185,129,0.12)',
                      border: '1px solid rgba(16,185,129,0.3)',
                      fontSize: '0.72rem', color: 'var(--accent-green)',
                      fontFamily: 'var(--font-mono)',
                      marginBottom: '12px',
                    }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-green)', display: 'inline-block', boxShadow: '0 0 6px var(--accent-green)' }} />
                      Current
                    </div>
                  )}

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <div style={{ fontSize: '1.4rem', flexShrink: 0, marginTop: '2px' }}>{exp.icon}</div>
                    <div>
                      <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '4px', color: 'var(--text-primary)' }}>
                        {exp.role}
                      </h3>
                      <div style={{ fontSize: '0.85rem', color: exp.color, fontWeight: 600, marginBottom: '4px' }}>
                        {exp.company}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '12px' }}>
                        {exp.location} • {exp.period}
                      </div>
                      <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
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

      <style>{`
        @media (max-width: 768px) {
          .timeline-card-wrapper { flex-direction: column !important; }
        }
      `}</style>
    </section>
  );
}
