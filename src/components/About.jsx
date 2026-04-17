import React from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Torus, MeshDistortMaterial } from '@react-three/drei';

function FloatingTorus() {
  const ref = React.useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.4;
      ref.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });
  return (
    <Torus ref={ref} args={[1.2, 0.45, 32, 100]}>
      <MeshDistortMaterial
        color="#7c3aed"
        attach="material"
        distort={0.35}
        speed={2}
        roughness={0.1}
        metalness={0.8}
        wireframe={false}
        emissive="#00d4ff"
        emissiveIntensity={0.15}
      />
    </Torus>
  );
}

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50, filter: 'blur(10px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

const cardVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function About() {
  const philosophies = [
    {
      icon: '⚡',
      title: 'Engineering Philosophy',
      text: 'I believe that the best software bridges the gap between rigorous, complex backend logic and seamless frontend execution. My technical foundation spans full-stack web and mobile application development, alongside a deep, active focus on computer vision and deep learning frameworks.',
    },
    {
      icon: '🌐',
      title: 'Beyond the Screen',
      text: 'Driven by continuous learning — actively studying Japanese (post-JLPT N5), researching motorcycle mechanics and adventure bikes, playing basketball, and optimizing competitive gaming setups.',
    },
  ];

  return (
    <section id="about" className="section" style={{
      background: 'linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 50%, var(--bg-primary) 100%)',
    }}>
      {/* Background glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px', height: '600px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)',
        filter: 'blur(80px)', pointerEvents: 'none',
      }} />

      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 400px',
          gap: '80px',
          alignItems: 'center',
        }} className="about-grid">

          {/* Left — Text */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div variants={itemVariants}>
              <div className="section-tag">About Me</div>
              <h2 className="section-title">
                Building the future,<br />
                <span className="gradient-text">one system at a time</span>
              </h2>
            </motion.div>

            <motion.p variants={itemVariants} style={{
              color: 'var(--text-secondary)', lineHeight: 1.8,
              fontSize: '1.05rem', marginBottom: '40px',
            }}>
              I'm <strong style={{ color: 'var(--text-primary)' }}>Jaiamar S.</strong>, a software developer with a primary focus on AI, Machine Learning, and Full-Stack Engineering.
              I build and optimize dynamic applications using Java, Python, and modern web/mobile frameworks including React and Flutter.
              My development approach combines rigorous backend logic with seamless frontend execution, ensuring high-performance code from database deployment to the user interface.
            </motion.p>

            <motion.div variants={sectionVariants} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {philosophies.map((p, i) => (
                <motion.div
                  key={i}
                  variants={cardVariants}
                  className="glass-card"
                  style={{ padding: '24px', position: 'relative', overflow: 'hidden' }}
                  whileHover={{ scale: 1.01, borderColor: 'rgba(0,212,255,0.18)' }}
                  data-cursor
                >
                  {/* glow accent */}
                  <div style={{
                    position: 'absolute', top: 0, left: 0, bottom: 0, width: '3px',
                    background: 'linear-gradient(to bottom, var(--accent-cyan), var(--accent-violet))',
                    borderRadius: '3px 0 0 3px',
                  }} />
                  <div style={{ paddingLeft: '16px' }}>
                    <div style={{ fontSize: '1.4rem', marginBottom: '8px' }}>{p.icon}</div>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '8px', color: 'var(--text-primary)' }}>
                      {p.title}
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7 }}>
                      {p.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — 3D Canvas */}
          <motion.div
            initial={{ opacity: 0, x: 60, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            style={{ height: '420px', position: 'relative' }}
            className="about-3d"
          >
            {/* Glow behind */}
            <div style={{
              position: 'absolute', inset: 0, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(124,58,237,0.25) 0%, transparent 70%)',
              filter: 'blur(40px)',
            }} />

            <Canvas camera={{ position: [0, 0, 4] }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[5, 5, 5]} intensity={1.5} color="#00d4ff" />
              <pointLight position={[-5, -5, -5]} intensity={0.5} color="#7c3aed" />
              <FloatingTorus />
            </Canvas>

            {/* Floating tags on side */}
            {[
              { label: 'AI/ML', top: '15%', left: '-10%', color: 'var(--accent-cyan)' },
              { label: 'React', top: '70%', left: '-5%', color: 'var(--accent-violet)' },
              { label: 'Python', top: '40%', right: '-10%', left: 'auto', color: 'var(--accent-pink)' },
              { label: 'CV', top: '80%', right: '-5%', left: 'auto', color: 'var(--accent-green)' },
            ].map((tag, i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 2 + i * 0.5, ease: 'easeInOut' }}
                style={{
                  position: 'absolute', top: tag.top,
                  left: tag.left, right: tag.right || 'auto',
                  background: 'rgba(10,15,30,0.85)',
                  border: `1px solid ${tag.color}40`,
                  borderRadius: '8px', padding: '6px 12px',
                  fontFamily: 'var(--font-mono)', fontSize: '0.75rem',
                  color: tag.color,
                  backdropFilter: 'blur(10px)',
                  boxShadow: `0 0 20px ${tag.color}20`,
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
