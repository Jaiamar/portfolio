import React, { useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

// ── 3D Orbital System ──────────────────────────────────────────────────────────
function SkillOrb({ color, orbitRadius, orbitSpeed, orbitAngleOffset }) {
  const ref = useRef();
  useFrame((state) => {
    const t = state.clock.elapsedTime * orbitSpeed + orbitAngleOffset;
    if (ref.current) {
      ref.current.position.x = Math.cos(t) * orbitRadius;
      ref.current.position.z = Math.sin(t) * orbitRadius;
      ref.current.position.y = Math.sin(t * 0.6) * 0.3;
    }
  });
  return (
    <group ref={ref}>
      <Sphere args={[0.16, 32, 32]}>
        <meshStandardMaterial color={color} roughness={0.1} metalness={0.7}
          emissive={color} emissiveIntensity={0.2} />
      </Sphere>
    </group>
  );
}

function CenterSphere() {
  const ref = useRef();
  useFrame(state => { if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.4; });
  return (
    <group ref={ref}>
      <Sphere args={[0.5, 64, 64]}>
        <meshStandardMaterial color="#4f46e5" roughness={0.05} metalness={0.9}
          emissive="#6366f1" emissiveIntensity={0.15} />
      </Sphere>
      <Sphere args={[0.62, 16, 16]}>
        <meshBasicMaterial color="#6366f1" transparent opacity={0.06} wireframe />
      </Sphere>
    </group>
  );
}

function OrbitRing({ radius, color }) {
  const points = useMemo(() => {
    return Array.from({ length: 129 }, (_, i) => {
      const angle = (i / 128) * Math.PI * 2;
      return new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius);
    });
  }, [radius]);
  const geometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points]);
  return (
    <line geometry={geometry}>
      <lineBasicMaterial color={color} transparent opacity={0.25} />
    </line>
  );
}

function OrbitalSystem() {
  const skills = [
    { color: '#4f46e5', r: 1.2, speed: 0.55, offset: 0 },
    { color: '#0891b2', r: 1.2, speed: 0.55, offset: 2.1 },
    { color: '#f59e0b', r: 1.2, speed: 0.55, offset: 4.2 },
    { color: '#10b981', r: 1.9, speed: 0.36, offset: 0 },
    { color: '#ef4444', r: 1.9, speed: 0.36, offset: 1.57 },
    { color: '#0891b2', r: 1.9, speed: 0.36, offset: 3.14 },
    { color: '#8b5cf6', r: 1.9, speed: 0.36, offset: 4.71 },
    { color: '#7c3aed', r: 2.65, speed: 0.2, offset: 0 },
    { color: '#db2777', r: 2.65, speed: 0.2, offset: 0.8 },
    { color: '#f97316', r: 2.65, speed: 0.2, offset: 1.6 },
    { color: '#6366f1', r: 2.65, speed: 0.2, offset: 2.4 },
    { color: '#059669', r: 2.65, speed: 0.2, offset: 3.2 },
  ];
  return (
    <>
      <ambientLight intensity={1.2} />
      <pointLight position={[4, 4, 4]} intensity={1.5} color="#4f46e5" />
      <pointLight position={[-4, -4, -4]} intensity={0.6} color="#7c3aed" />
      <directionalLight position={[0, 6, 0]} intensity={1} color="#ffffff" />
      <CenterSphere />
      <OrbitRing radius={1.2} color="#4f46e5" />
      <OrbitRing radius={1.9} color="#7c3aed" />
      <OrbitRing radius={2.65} color="#8b5cf6" />
      {skills.map((s, i) => (
        <SkillOrb key={i} color={s.color} orbitRadius={s.r} orbitSpeed={s.speed} orbitAngleOffset={s.offset} />
      ))}
    </>
  );
}

// ── Skill Categories ──────────────────────────────────────────────────────────
const categories = [
  {
    title: 'AI & Computer Vision',
    icon: '🧠',
    color: '#4f46e5',
    bg: 'rgba(79,70,229,0.06)',
    border: 'rgba(79,70,229,0.12)',
    skills: ['Deep Learning (CNNs)', 'Image Processing', 'Pattern Recognition', 'TensorFlow/Keras', 'PyTorch', 'Data Annotation'],
  },
  {
    title: 'Software & Web Dev',
    icon: '⚙️',
    color: '#7c3aed',
    bg: 'rgba(124,58,237,0.06)',
    border: 'rgba(124,58,237,0.12)',
    skills: ['Python', 'Node.js', 'React', 'Flutter', 'Dart', 'SQL/PostgreSQL', 'HTML/CSS', 'Git/GitHub', 'FastAPI', 'Firebase'],
  },
  {
    title: 'Visual Intelligence & Design',
    icon: '🎨',
    color: '#db2777',
    bg: 'rgba(219,39,119,0.05)',
    border: 'rgba(219,39,119,0.12)',
    skills: ['Image Composition', 'Color Theory', 'Visual Storytelling', 'UI/UX Principles', 'Brand Identity', 'Graphic Design'],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="section" style={{
      background: 'linear-gradient(180deg, #f8f9ff 0%, #f0f3ff 60%, #f5f8ff 100%)',
    }}>
      {/* Deco elements */}
      <div style={{
        position: 'absolute', top: 0, right: 0, width: '40%', height: '100%',
        background: 'radial-gradient(ellipse at top right, rgba(124,58,237,0.06) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />
      <div className="dot-grid" style={{ position: 'absolute', inset: 0, opacity: 0.4, pointerEvents: 'none' }} />

      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: '70px' }}
        >
          <div className="section-tag" style={{ justifyContent: 'center' }}>Technical Skills</div>
          <h2 className="section-title">My <span className="gradient-text">Arsenal</span></h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '480px', margin: '0 auto' }}>
            Tools, frameworks, and disciplines I use to build intelligent systems
          </p>
        </motion.div>

        {/* 3D Orbital System */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          style={{ height: '460px', marginBottom: '80px', position: 'relative' }}
        >
          {/* Soft circular glow underneath */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%,-50%)',
            width: '380px', height: '380px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(79,70,229,0.08) 0%, transparent 70%)',
            filter: 'blur(40px)', pointerEvents: 'none',
          }} />
          <Canvas camera={{ position: [0, 2.5, 6], fov: 52 }}>
            <OrbitalSystem />
          </Canvas>
          <div style={{
            position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)',
            fontFamily: 'var(--font-mono)', fontSize: '0.68rem',
            color: 'var(--text-muted)', letterSpacing: '0.1em',
          }}>
            ↻ Skills in orbit — scroll to explore
          </div>
        </motion.div>

        {/* Badge grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '22px' }} className="skills-grid">
          {categories.map((cat, ci) => (
            <motion.div
              key={ci}
              initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: ci * 0.12, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
              style={{
                background: cat.bg,
                border: `1px solid ${cat.border}`,
                borderRadius: '20px', padding: '28px',
                position: 'relative', overflow: 'hidden',
                backdropFilter: 'blur(12px)',
                boxShadow: `0 4px 20px rgba(15,23,42,0.06)`,
                transition: 'all 0.3s',
              }}
            >
              {/* Top accent bar */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
                background: `linear-gradient(90deg, ${cat.color}, transparent)`,
                borderRadius: '20px 20px 0 0',
              }} />

              <div style={{ marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{
                  fontSize: '1.4rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: '44px', height: '44px', background: `${cat.color}12`,
                  borderRadius: '12px', border: `1px solid ${cat.color}20`,
                }}>{cat.icon}</span>
                <h3 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-primary)' }}>{cat.title}</h3>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {cat.skills.map((skill, si) => (
                  <motion.span
                    key={si}
                    className="skill-badge"
                    whileHover={{ scale: 1.06, y: -1 }}
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: ci * 0.08 + si * 0.04 }}
                    style={{
                      borderColor: `${cat.color}35`,
                      color: cat.color,
                      background: `${cat.color}08`,
                      boxShadow: 'none',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.boxShadow = `0 0 12px ${cat.color}22`;
                      e.currentTarget.style.background = `${cat.color}14`;
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.background = `${cat.color}08`;
                    }}
                    data-cursor
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .skills-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
