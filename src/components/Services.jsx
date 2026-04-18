import React from 'react';
import { motion } from 'framer-motion';

const services = [
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" width="38" height="38">
        <rect width="48" height="48" rx="12" fill="rgba(79,70,229,0.1)"/>
        <path d="M14 18l6 6-6 6" stroke="#4f46e5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M22 30h12" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round"/>
        <rect x="8" y="10" width="32" height="28" rx="4" stroke="#4f46e5" strokeWidth="2" fill="none"/>
      </svg>
    ),
    title: 'Web Development',
    desc: 'Full-stack web applications built with React, Node.js, and modern frameworks. Pixel-perfect UI, robust backends, and scalable architectures.',
    accent: '#4f46e5',
    glow: 'rgba(79,70,229,0.15)',
    bg: 'linear-gradient(135deg, rgba(79,70,229,0.06) 0%, rgba(99,102,241,0.02) 100%)',
    border: 'rgba(79,70,229,0.18)',
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" width="38" height="38">
        <rect width="48" height="48" rx="12" fill="rgba(8,145,178,0.1)"/>
        <rect x="10" y="12" width="28" height="20" rx="3" stroke="#0891b2" strokeWidth="2" fill="none"/>
        <path d="M15 17h8M15 21h12M15 25h6" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="32" cy="19" r="4" stroke="#0891b2" strokeWidth="1.8" fill="none"/>
        <path d="M19 36h10M24 32v4" stroke="#0891b2" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: 'UI/UX Design',
    desc: 'Intuitive user experiences crafted with empathy and precision. From wireframes to high-fidelity prototypes that delight and convert.',
    accent: '#0891b2',
    glow: 'rgba(8,145,178,0.15)',
    bg: 'linear-gradient(135deg, rgba(8,145,178,0.06) 0%, rgba(6,182,212,0.02) 100%)',
    border: 'rgba(8,145,178,0.18)',
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" width="38" height="38">
        <rect width="48" height="48" rx="12" fill="rgba(219,39,119,0.1)"/>
        <circle cx="24" cy="20" r="8" stroke="#db2777" strokeWidth="2" fill="none"/>
        <path d="M18 28l-4 8h20l-4-8" stroke="#ec4899" strokeWidth="2" strokeLinejoin="round" fill="none"/>
        <circle cx="24" cy="20" r="3" fill="#db2777"/>
        <path d="M28 16l4-4M20 16l-4-4" stroke="#f472b6" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Graphic Design',
    desc: "Striking visual assets that tell your brand's story. Social media graphics, banners, presentations, and print materials — all crafted with purpose.",
    accent: '#db2777',
    glow: 'rgba(219,39,119,0.15)',
    bg: 'linear-gradient(135deg, rgba(219,39,119,0.06) 0%, rgba(236,72,153,0.02) 100%)',
    border: 'rgba(219,39,119,0.18)',
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" width="38" height="38">
        <rect width="48" height="48" rx="12" fill="rgba(217,119,6,0.1)"/>
        <path d="M24 10l3 6h7l-5.5 4 2 6.5L24 23l-6.5 3.5 2-6.5L14 16h7z" stroke="#d97706" strokeWidth="2" strokeLinejoin="round" fill="rgba(251,191,36,0.15)"/>
        <path d="M14 36h20" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="36" cy="30" r="4" stroke="#d97706" strokeWidth="1.8" fill="none"/>
        <path d="M34 30h4M36 28v4" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Lead Generation',
    desc: 'Data-driven campaigns and funnels designed to attract, qualify, and convert your ideal customers into high-value leads at scale.',
    accent: '#d97706',
    glow: 'rgba(217,119,6,0.15)',
    bg: 'linear-gradient(135deg, rgba(217,119,6,0.06) 0%, rgba(245,158,11,0.02) 100%)',
    border: 'rgba(217,119,6,0.18)',
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" width="38" height="38">
        <rect width="48" height="48" rx="12" fill="rgba(124,58,237,0.1)"/>
        <path d="M24 12l4 8 9 1.3-6.5 6.3 1.5 9L24 32l-8 4.6 1.5-9L11 21.3l9-1.3z" stroke="#7c3aed" strokeWidth="2" strokeLinejoin="round" fill="rgba(167,139,250,0.15)"/>
        <path d="M32 32l6 6" stroke="#8b5cf6" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Logo Design',
    desc: 'Memorable, versatile logos that embody your brand identity. Concept-driven design process delivering marks that stand the test of time.',
    accent: '#7c3aed',
    glow: 'rgba(124,58,237,0.15)',
    bg: 'linear-gradient(135deg, rgba(124,58,237,0.06) 0%, rgba(139,92,246,0.02) 100%)',
    border: 'rgba(124,58,237,0.18)',
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" width="38" height="38">
        <rect width="48" height="48" rx="12" fill="rgba(5,150,105,0.1)"/>
        <path d="M10 34l8-10 6 6 6-12 8 10" stroke="#059669" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <circle cx="38" cy="14" r="5" stroke="#10b981" strokeWidth="2" fill="rgba(52,211,153,0.15)"/>
        <path d="M36 14h4M38 12v4" stroke="#059669" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M10 38h28" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 3"/>
      </svg>
    ),
    title: 'Digital Marketing',
    desc: "End-to-end digital marketing strategies — SEO, social media, paid ads, and content — to grow your brand's reach and drive measurable results.",
    accent: '#059669',
    glow: 'rgba(5,150,105,0.15)',
    bg: 'linear-gradient(135deg, rgba(5,150,105,0.06) 0%, rgba(16,185,129,0.02) 100%)',
    border: 'rgba(5,150,105,0.18)',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50, filter: 'blur(10px)' },
  visible: (i) => ({
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.75, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Services() {
  return (
    <section
      id="services"
      className="section"
      style={{
        background: 'linear-gradient(180deg, #f5f3ff 0%, #f0f3ff 50%, #fafbff 100%)',
        position: 'relative',
      }}
    >
      {/* Background orbs */}
      <div style={{
        position: 'absolute', top: '20%', left: '-8%',
        width: '480px', height: '480px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(79,70,229,0.07) 0%, transparent 70%)',
        filter: 'blur(80px)', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '15%', right: '-6%',
        width: '380px', height: '380px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(219,39,119,0.06) 0%, transparent 70%)',
        filter: 'blur(70px)', pointerEvents: 'none',
      }} />
      <div className="dot-grid" style={{ position: 'absolute', inset: 0, opacity: 0.4, pointerEvents: 'none' }} />

      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: '70px' }}
        >
          <div className="section-tag" style={{ justifyContent: 'center' }}>What I Offer</div>
          <h2 className="section-title">
            My <span className="gradient-text">Services</span>
          </h2>
          <p style={{
            color: 'var(--text-secondary)', fontSize: '1rem',
            maxWidth: '500px', margin: '0 auto', lineHeight: 1.75,
          }}>
            From pixel-perfect interfaces to data-driven growth strategies — here is how I can help you stand out.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div
          className="services-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '28px',
          }}
        >
          {services.map((svc, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              style={{
                background: svc.bg,
                border: `1px solid ${svc.border}`,
                borderRadius: '20px',
                padding: '32px 28px',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'none',
                transition: 'box-shadow 0.3s',
                boxShadow: `0 4px 24px rgba(15,23,42,0.06), 0 0 0 1px ${svc.accent}08`,
              }}
              data-cursor
            >
              {/* Top accent line */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
                background: `linear-gradient(90deg, ${svc.accent}, ${svc.accent}44, transparent)`,
                borderRadius: '20px 20px 0 0',
              }} />

              {/* Glow blob */}
              <div style={{
                position: 'absolute', top: '-20px', right: '-20px',
                width: '120px', height: '120px', borderRadius: '50%',
                background: svc.glow,
                filter: 'blur(40px)',
                pointerEvents: 'none',
              }} />

              {/* Shine effect */}
              <div className="shine" style={{ position: 'absolute', inset: 0, borderRadius: '20px' }} />

              {/* Icon */}
              <div style={{ marginBottom: '20px' }}>{svc.icon}</div>

              {/* Title */}
              <h3 style={{
                fontSize: '1.05rem', fontWeight: 700,
                color: 'var(--text-primary)', marginBottom: '12px',
              }}>
                {svc.title}
              </h3>

              {/* Description */}
              <p style={{
                fontSize: '0.875rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.75,
                marginBottom: '20px',
              }}>
                {svc.desc}
              </p>


            </motion.div>
          ))}
        </div>

        {/* Initiate Collaboration Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{ textAlign: 'center', marginTop: '70px' }}
        >
          <a
            href="https://wa.me/919342844932"
            target="_blank"
            rel="noreferrer"
            className="btn-primary"
            style={{ 
              padding: '16px 36px', 
              fontSize: '1.1rem', 
              textDecoration: 'none', 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '12px',
              boxShadow: '0 8px 24px rgba(37, 211, 102, 0.25)',
            }}
            data-cursor
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
            </svg>
            <span>Initiate Collaboration</span>
          </a>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .services-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .services-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
