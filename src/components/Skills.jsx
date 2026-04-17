import React, { useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Sphere } from '@react-three/drei';
import * as THREE from 'three';

// ── 3D Orbiting Skill Spheres ─────────────────────────────────────────────────
function SkillOrb({ position, color, label, orbitRadius, orbitSpeed, orbitAngleOffset }) {
  const ref = useRef();
  const textRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime * orbitSpeed + orbitAngleOffset;
    if (ref.current) {
      ref.current.position.x = Math.cos(t) * orbitRadius;
      ref.current.position.z = Math.sin(t) * orbitRadius;
      ref.current.position.y = Math.sin(t * 0.5) * 0.4;
      ref.current.rotation.y += 0.01;
    }
  });

  const c = new THREE.Color(color);

  return (
    <group ref={ref} position={position}>
      <Sphere args={[0.18, 32, 32]}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.4}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
      {/* Glow halo */}
      <Sphere args={[0.26, 16, 16]}>
        <meshBasicMaterial color={color} transparent opacity={0.08} />
      </Sphere>
    </group>
  );
}

function CenterSphere() {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.3;
  });
  return (
    <group ref={ref}>
      <Sphere args={[0.5, 64, 64]}>
        <meshStandardMaterial
          color="#7c3aed"
          emissive="#00d4ff"
          emissiveIntensity={0.2}
          roughness={0.05}
          metalness={0.95}
        />
      </Sphere>
      <Sphere args={[0.65, 16, 16]}>
        <meshBasicMaterial color="#00d4ff" transparent opacity={0.04} wireframe />
      </Sphere>
    </group>
  );
}

function OrbitRing({ radius, color, tilt = 0 }) {
  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 128; i++) {
      const angle = (i / 128) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius));
    }
    return pts;
  }, [radius]);

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry().setFromPoints(points);
    return g;
  }, [points]);

  return (
    <line geometry={geometry} rotation={[tilt, 0, 0]}>
      <lineBasicMaterial color={color} transparent opacity={0.15} />
    </line>
  );
}

function OrbitalSystem() {
  const skills = [
    { label: 'Python', color: '#3b82f6', r: 1.2, speed: 0.6, offset: 0 },
    { label: 'React', color: '#06b6d4', r: 1.2, speed: 0.6, offset: 2.1 },
    { label: 'TensorFlow', color: '#f59e0b', r: 1.2, speed: 0.6, offset: 4.2 },
    { label: 'Node.js', color: '#10b981', r: 1.9, speed: 0.38, offset: 0 },
    { label: 'PyTorch', color: '#ef4444', r: 1.9, speed: 0.38, offset: 1.57 },
    { label: 'Flutter', color: '#06b6d4', r: 1.9, speed: 0.38, offset: 3.14 },
    { label: 'FastAPI', color: '#8b5cf6', r: 1.9, speed: 0.38, offset: 4.71 },
    { label: 'PostgreSQL', color: '#a78bfa', r: 2.6, speed: 0.22, offset: 0 },
    { label: 'Firebase', color: '#fbbf24', r: 2.6, speed: 0.22, offset: 0.8 },
    { label: 'Git', color: '#f97316', r: 2.6, speed: 0.22, offset: 1.6 },
    { label: 'Three.js', color: '#e2e8f0', r: 2.6, speed: 0.22, offset: 2.4 },
    { label: 'OpenCV', color: '#ec4899', r: 2.6, speed: 0.22, offset: 3.2 },
  ];

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[3, 3, 3]} intensity={1} color="#00d4ff" />
      <pointLight position={[-3, -3, -3]} intensity={0.5} color="#7c3aed" />
      <pointLight position={[0, 3, 0]} intensity={0.4} color="#a855f7" />

      <CenterSphere />
      <OrbitRing radius={1.2} color="#00d4ff" tilt={0.1} />
      <OrbitRing radius={1.9} color="#7c3aed" tilt={-0.15} />
      <OrbitRing radius={2.6} color="#a855f7" tilt={0.2} />

      {skills.map((s, i) => (
        <SkillOrb
          key={i}
          position={[s.r, 0, 0]}
          color={s.color}
          label={s.label}
          orbitRadius={s.r}
          orbitSpeed={s.speed}
          orbitAngleOffset={s.offset}
        />
      ))}
    </>
  );
}

// ── Skill Category Badge Grid ──────────────────────────────────────────────────
const categories = [
  {
    title: 'AI & Computer Vision',
    icon: '🧠',
    color: 'var(--accent-cyan)',
    skills: ['Deep Learning (CNNs)', 'Image Processing', 'Pattern Recognition', 'TensorFlow/Keras', 'PyTorch', 'Data Annotation'],
  },
  {
    title: 'Software & Web Dev',
    icon: '⚙️',
    color: 'var(--accent-violet)',
    skills: ['Python', 'Node.js', 'React', 'Flutter', 'Dart', 'SQL/PostgreSQL', 'HTML/CSS', 'Git/GitHub', 'FastAPI', 'Firebase'],
  },
  {
    title: 'Visual Intelligence & Design',
    icon: '🎨',
    color: 'var(--accent-pink)',
    skills: ['Image Composition', 'Color Theory', 'Visual Storytelling', 'UI/UX Principles', 'Brand Identity', 'Graphic Design'],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="section" style={{ background: 'var(--bg-secondary)', overflow: 'hidden' }}>
      {/* Background decoration */}
      <div style={{
        position: 'absolute', top: 0, right: 0, width: '50%', height: '100%',
        background: 'radial-gradient(ellipse at right, rgba(124,58,237,0.07) 0%, transparent 60%)',
        pointerEvents: 'none',
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
          <div className="section-tag" style={{ justifyContent: 'center' }}>Technical Skills</div>
          <h2 className="section-title">
            My <span className="gradient-text">Arsenal</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '500px', margin: '0 auto' }}>
            Tools, frameworks, and disciplines I use to build intelligent systems
          </p>
        </motion.div>

        {/* 3D Orbital System */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          style={{ height: '480px', marginBottom: '80px', position: 'relative' }}
        >
          {/* Glow */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%,-50%)',
            width: '400px', height: '400px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)',
            filter: 'blur(60px)', pointerEvents: 'none',
          }} />
          <Canvas camera={{ position: [0, 2, 6], fov: 55 }}>
            <OrbitalSystem />
          </Canvas>
          {/* Label */}
          <div style={{
            position: 'absolute', bottom: '16px', left: '50%',
            transform: 'translateX(-50%)',
            fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
            color: 'var(--text-muted)', letterSpacing: '0.1em',
          }}>
            ↻ Skills in orbit — hover to interact
          </div>
        </motion.div>

        {/* Badge grids by category */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px',
        }} className="skills-grid">
          {categories.map((cat, ci) => (
            <motion.div
              key={ci}
              initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: ci * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="glass-card"
              style={{ padding: '28px', position: 'relative', overflow: 'hidden' }}
            >
              {/* accent top bar */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                background: `linear-gradient(90deg, ${cat.color}, transparent)`,
              }} />
              {/* glow bg */}
              <div style={{
                position: 'absolute', top: '-20px', left: '-20px',
                width: '80px', height: '80px', borderRadius: '50%',
                background: cat.color, opacity: 0.07, filter: 'blur(30px)',
              }} />

              <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '1.4rem' }}>{cat.icon}</span>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700 }}>{cat.title}</h3>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {cat.skills.map((skill, si) => (
                  <motion.span
                    key={si}
                    className="skill-badge"
                    style={{ borderColor: `${cat.color}40`, color: cat.color }}
                    whileHover={{
                      scale: 1.08,
                      backgroundColor: `${cat.color}18`,
                      boxShadow: `0 0 15px ${cat.color}30`,
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: ci * 0.1 + si * 0.04 }}
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
        @media (max-width: 900px) {
          .skills-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          .skills-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
