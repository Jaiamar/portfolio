import React from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Torus, MeshDistortMaterial } from '@react-three/drei';

function FloatingTorus() {
  const ref = React.useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.35;
      ref.current.rotation.y = state.clock.elapsedTime * 0.25;
    }
  });
  return (
    <Torus ref={ref} args={[1.2, 0.4, 32, 100]}>
      <MeshDistortMaterial
        color="#6366f1"
        distort={0.3}
        speed={2}
        roughness={0.05}
        metalness={0.6}
        emissive="#4f46e5"
        emissiveIntensity={0.08}
      />
    </Torus>
  );
}

const itemVariants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

const philosophies = [
  {
    icon: '⚡',
    title: 'Engineering Philosophy',
    text: 'I believe the best software bridges rigorous backend logic with seamless frontend execution. My foundation spans full-stack web/mobile development alongside a deep focus on computer vision and deep learning frameworks.',
    accent: 'var(--accent-primary)',
    bg: 'rgba(79,70,229,0.05)',
  },
  {
    icon: '🌐',
    title: 'Beyond the Screen',
    text: 'Driven by continuous learning — studying Japanese (post-JLPT N5), researching motorcycle mechanics, playing basketball, and optimizing competitive gaming setups.',
    accent: 'var(--accent-cyan)',
    bg: 'rgba(8,145,178,0.05)',
  },
];

export default function About() {
  return (
    <section id="about" className="section" style={{
      background: 'linear-gradient(180deg, #f0f3ff 0%, #f8f9ff 50%, #f5f3ff 100%)',
    }}>
      {/* Decorative dot grid */}
      <div className="dot-grid" style={{
        position: 'absolute', inset: 0, opacity: 0.5, pointerEvents: 'none',
      }} />

      {/* Background orb */}
      <div style={{
        position: 'absolute', top: '30%', left: '-5%',
        width: '500px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(79,70,229,0.07) 0%, transparent 70%)',
        filter: 'blur(80px)', pointerEvents: 'none',
      }} />

      <div className="container">
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 380px',
          gap: '80px', alignItems: 'center',
        }} className="about-grid">

          {/* Left — Text */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ staggerChildren: 0.14 }}
          >
            <motion.div variants={itemVariants}>
              <div className="section-tag">About Me</div>
              <h2 className="section-title">
                Building the future,<br />
                <span className="gradient-text">one system at a time</span>
              </h2>
            </motion.div>

            <motion.p variants={itemVariants} style={{
              color: 'var(--text-secondary)', lineHeight: 1.85,
              fontSize: '1.05rem', marginBottom: '36px',
            }}>
              I'm <strong style={{ color: 'var(--text-primary)', fontWeight: 700 }}>Jaiamar S.</strong>, a software developer with a primary focus on AI, Machine Learning, and Full-Stack Engineering.
              I build and optimize dynamic applications using Java, Python, and modern frameworks including React and Flutter. My approach combines rigorous backend logic with seamless frontend execution.
            </motion.p>

            {/* Philosophy cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {philosophies.map((p, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  whileHover={{ scale: 1.015, y: -2 }}
                  style={{
                    background: p.bg,
                    border: `1px solid ${p.accent}22`,
                    borderRadius: '16px',
                    padding: '22px 24px',
                    position: 'relative', overflow: 'hidden',
                    cursor: 'none',
                    backdropFilter: 'blur(12px)',
                    boxShadow: `0 2px 16px ${p.accent}10`,
                    transition: 'all 0.3s',
                  }}
                  data-cursor
                >
                  {/* Left accent bar */}
                  <div style={{
                    position: 'absolute', top: 0, left: 0, bottom: 0, width: '3px',
                    background: p.accent, borderRadius: '3px 0 0 3px',
                  }} />
                  {/* Shine effect */}
                  <div className="shine" style={{ position: 'absolute', inset: 0, borderRadius: '16px' }} />

                  <div style={{ paddingLeft: '16px' }}>
                    <div style={{ fontSize: '1.3rem', marginBottom: '7px' }}>{p.icon}</div>
                    <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '7px', color: 'var(--text-primary)' }}>
                      {p.title}
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.72 }}>
                      {p.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — 3D Canvas */}
          <motion.div
            initial={{ opacity: 0, x: 60, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            style={{ height: '400px', position: 'relative' }}
            className="about-3d"
          >
            {/* Soft glow behind torus */}
            <div style={{
              position: 'absolute', inset: 0, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)',
              filter: 'blur(50px)',
            }} />

            <Canvas camera={{ position: [0, 0, 4] }}>
              <ambientLight intensity={1.5} />
              <pointLight position={[5, 5, 5]} intensity={2} color="#4f46e5" />
              <pointLight position={[-5, -5, -5]} intensity={0.8} color="#7c3aed" />
              <directionalLight position={[0, 5, 0]} intensity={1} color="#ffffff" />
              <FloatingTorus />
            </Canvas>

            {/* Floating skill tags */}
            {[
              { label: 'AI/ML', top: '12%', left: '-8%', color: 'var(--accent-primary)', bg: 'rgba(79,70,229,0.08)' },
              { label: 'React', top: '72%', left: '-4%', color: 'var(--accent-cyan)', bg: 'rgba(8,145,178,0.08)' },
              { label: 'Python', top: '35%', right: '-8%', left: 'auto', color: 'var(--accent-violet)', bg: 'rgba(124,58,237,0.08)' },
              { label: 'CV', top: '78%', right: '-4%', left: 'auto', color: 'var(--accent-green)', bg: 'rgba(5,150,105,0.08)' },
            ].map((tag, i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -7, 0] }}
                transition={{ repeat: Infinity, duration: 2.2 + i * 0.5, ease: 'easeInOut' }}
                style={{
                  position: 'absolute', top: tag.top,
                  left: tag.left, right: tag.right || 'auto',
                  background: 'rgba(255,255,255,0.9)',
                  border: `1px solid ${tag.color}30`,
                  borderRadius: '10px', padding: '6px 14px',
                  fontFamily: 'var(--font-mono)', fontSize: '0.75rem',
                  color: tag.color, fontWeight: 600,
                  backdropFilter: 'blur(12px)',
                  boxShadow: `0 4px 16px rgba(15,23,42,0.08), 0 0 0 1px ${tag.color}15`,
                }}
              >
                {tag.label}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr !important; }
          .about-3d { display: none !important; }
        }
      `}</style>
    </section>
  );
}
