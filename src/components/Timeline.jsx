import React, { useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Torus, Sphere, Box, Octahedron, MeshDistortMaterial, Float, Trail } from '@react-three/drei';
import * as THREE from 'three';

// ═══════════════════════════════════════════════════════════════════
// 3D SCENE COMPONENTS — one per timeline gap
// ═══════════════════════════════════════════════════════════════════

// ── Scene 0: Orbiting code rings (Full-Stack Dev at Amdox) ─────────
function CodeRingsScene() {
  const outer = useRef();
  const inner = useRef();
  const core  = useRef();

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (outer.current) { outer.current.rotation.x = t * 0.3; outer.current.rotation.y = t * 0.5; }
    if (inner.current) { inner.current.rotation.x = -t * 0.5; inner.current.rotation.z = t * 0.4; }
    if (core.current)  { core.current.rotation.y = t * 0.9; }
  });

  return (
    <>
      <ambientLight intensity={0.8} />
      <pointLight position={[3, 3, 3]} intensity={3} color="#4f46e5" />
      <pointLight position={[-3, -2, 2]} intensity={1.5} color="#818cf8" />

      {/* Outer ring */}
      <group ref={outer}>
        <Torus args={[1.4, 0.04, 16, 80]}>
          <meshStandardMaterial color="#4f46e5" emissive="#6366f1" emissiveIntensity={1.2} roughness={0} metalness={1} />
        </Torus>
      </group>

      {/* Inner ring */}
      <group ref={inner}>
        <Torus args={[0.9, 0.03, 16, 80]}>
          <meshStandardMaterial color="#818cf8" emissive="#a5b4fc" emissiveIntensity={1.2} roughness={0} metalness={1} />
        </Torus>
      </group>

      {/* Core sphere */}
      <Float speed={2} rotationIntensity={1}>
        <Sphere ref={core} args={[0.35, 32, 32]}>
          <MeshDistortMaterial color="#4f46e5" distort={0.4} speed={3} roughness={0} metalness={0.8} emissive="#6366f1" emissiveIntensity={0.5} />
        </Sphere>
      </Float>

      {/* Orbiting tiny spheres */}
      {[0, Math.PI * 0.66, Math.PI * 1.33].map((offset, i) => (
        <OrbitingSphere key={i} offset={offset} radius={1.4} color="#a5b4fc" size={0.07} />
      ))}
    </>
  );
}

function OrbitingSphere({ offset, radius, color, size }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    const t = clock.elapsedTime + offset;
    if (ref.current) {
      ref.current.position.x = Math.cos(t * 0.7) * radius;
      ref.current.position.y = Math.sin(t * 0.7) * radius * 0.3;
      ref.current.position.z = Math.sin(t * 0.7) * radius * 0.5;
    }
  });
  return (
    <Sphere ref={ref} args={[size, 16, 16]}>
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} roughness={0} metalness={1} />
    </Sphere>
  );
}

// ── Scene 1: Floating Diamond + Color Palette (Graphic Designer) ───
function DesignScene() {
  const group = useRef();
  useFrame(({ clock }) => {
    if (group.current) {
      group.current.rotation.y = clock.elapsedTime * 0.4;
      group.current.position.y = Math.sin(clock.elapsedTime * 0.8) * 0.12;
    }
  });

  const COLORS = ['#db2777', '#f9a8d4', '#9333ea', '#fb923c', '#fbbf24'];

  return (
    <>
      <ambientLight intensity={0.7} />
      <pointLight position={[3, 3, 3]} intensity={2.5} color="#db2777" />
      <pointLight position={[-3, 2, -2]} intensity={1.5} color="#9333ea" />

      <group ref={group}>
        {/* Central octahedron */}
        <Float speed={1.5} floatIntensity={0.3}>
          <Octahedron args={[0.7, 0]}>
            <MeshDistortMaterial color="#db2777" distort={0.25} speed={2} roughness={0.05} metalness={0.9} emissive="#f472b6" emissiveIntensity={0.4} />
          </Octahedron>
        </Float>

        {/* Color palette spheres orbiting */}
        {COLORS.map((col, i) => {
          const angle = (i / COLORS.length) * Math.PI * 2;
          return (
            <Float key={i} speed={1 + i * 0.3} floatIntensity={0.4} rotationIntensity={0.5}>
              <Sphere position={[Math.cos(angle) * 1.2, Math.sin(angle * 0.5) * 0.4, Math.sin(angle) * 1.2]} args={[0.1, 16, 16]}>
                <meshStandardMaterial color={col} emissive={col} emissiveIntensity={1} roughness={0} metalness={0.8} />
              </Sphere>
            </Float>
          );
        })}
      </group>
    </>
  );
}

// ── Scene 2: Spinning Cube Cluster (Software Engineer) ─────────────
function EngineerScene() {
  const group = useRef();
  useFrame(({ clock }) => {
    if (group.current) {
      group.current.rotation.x = clock.elapsedTime * 0.25;
      group.current.rotation.y = clock.elapsedTime * 0.35;
    }
  });

  const boxPositions = [
    [0, 0, 0], [0.8, 0.4, 0.2], [-0.7, 0.5, -0.3],
    [0.3, -0.7, 0.6], [-0.4, -0.5, -0.7], [0.6, -0.3, -0.8],
  ];

  return (
    <>
      <ambientLight intensity={0.7} />
      <pointLight position={[4, 4, 4]} intensity={3} color="#7c3aed" />
      <pointLight position={[-3, -3, 3]} intensity={1.5} color="#a78bfa" />

      <group ref={group}>
        {boxPositions.map(([x, y, z], i) => (
          <SpinningBox key={i} position={[x, y, z]} size={0.22 + i * 0.03} color={['#7c3aed','#8b5cf6','#a78bfa','#6d28d9','#c4b5fd','#4f46e5'][i]} delay={i * 0.3} />
        ))}
      </group>
    </>
  );
}

function SpinningBox({ position, size, color, delay }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.x = clock.elapsedTime * 0.6 + delay;
      ref.current.rotation.z = clock.elapsedTime * 0.4 + delay;
    }
  });
  return (
    <Box ref={ref} position={position} args={[size, size, size]}>
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} roughness={0.1} metalness={0.8} wireframe={Math.random() > 0.6} />
    </Box>
  );
}

// ── Scene 3: Network Nodes + Connections (Full-Stack Cognyfyz) ──────
function NetworkScene() {
  const nodeCount = 8;
  const nodes = useMemo(() => Array.from({ length: nodeCount }, (_, i) => {
    const angle = (i / nodeCount) * Math.PI * 2;
    const r = 0.9 + (i % 2) * 0.4;
    return { x: Math.cos(angle) * r, y: Math.sin(angle * 0.5) * 0.5, z: Math.sin(angle) * r };
  }), []);

  const groupRef = useRef();
  useFrame(({ clock }) => {
    if (groupRef.current) { groupRef.current.rotation.y = clock.elapsedTime * 0.3; }
  });

  // Build line geometry connecting nodes
  const linePoints = useMemo(() => {
    const pts = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (Math.random() > 0.4) {
          pts.push(new THREE.Vector3(nodes[i].x, nodes[i].y, nodes[i].z));
          pts.push(new THREE.Vector3(nodes[j].x, nodes[j].y, nodes[j].z));
        }
      }
    }
    return pts;
  }, [nodes]);

  const lineGeo = useMemo(() => {
    const g = new THREE.BufferGeometry().setFromPoints(linePoints);
    return g;
  }, [linePoints]);

  return (
    <>
      <ambientLight intensity={0.8} />
      <pointLight position={[3, 3, 3]} intensity={2.5} color="#059669" />
      <pointLight position={[-3, 0, -3]} intensity={1.5} color="#34d399" />

      <group ref={groupRef}>
        {/* Connection lines */}
        <lineSegments geometry={lineGeo}>
          <lineBasicMaterial color="#34d399" transparent opacity={0.35} />
        </lineSegments>

        {/* Nodes */}
        {nodes.map((n, i) => (
          <Float key={i} speed={1.2 + i * 0.2} floatIntensity={0.25}>
            <Sphere position={[n.x, n.y, n.z]} args={[0.08 + (i % 3) * 0.04, 16, 16]}>
              <meshStandardMaterial
                color={['#059669','#34d399','#10b981','#6ee7b7'][i % 4]}
                emissive={['#059669','#34d399','#10b981','#6ee7b7'][i % 4]}
                emissiveIntensity={1.2}
                roughness={0} metalness={0.9}
              />
            </Sphere>
          </Float>
        ))}

        {/* Central core */}
        <Float speed={2} floatIntensity={0.4}>
          <Sphere position={[0, 0, 0]} args={[0.18, 32, 32]}>
            <MeshDistortMaterial color="#059669" distort={0.35} speed={2} roughness={0} metalness={0.9} emissive="#34d399" emissiveIntensity={0.6} />
          </Sphere>
        </Float>
      </group>
    </>
  );
}

// ── Scene 4: Megaphone / Signal Waves (Digital Marketing) ──────────
function MarketingScene() {
  const ring1 = useRef();
  const ring2 = useRef();
  const ring3 = useRef();
  const core  = useRef();

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const pulse = (Math.sin(t * 1.5) + 1) / 2; // 0–1

    if (ring1.current) { ring1.current.scale.setScalar(1 + pulse * 0.18); ring1.current.material.opacity = 0.6 - pulse * 0.3; }
    if (ring2.current) { ring2.current.scale.setScalar(1 + pulse * 0.3);  ring2.current.material.opacity = 0.4 - pulse * 0.2; }
    if (ring3.current) { ring3.current.scale.setScalar(1 + pulse * 0.45); ring3.current.material.opacity = 0.25 - pulse * 0.15; }
    if (core.current)  { core.current.rotation.y = t * 0.8; core.current.rotation.z = t * 0.5; }
  });

  return (
    <>
      <ambientLight intensity={0.7} />
      <pointLight position={[3, 3, 3]} intensity={3} color="#d97706" />
      <pointLight position={[-3, -2, 2]} intensity={1.5} color="#fbbf24" />

      {/* Pulse rings representing broadcast waves */}
      <Torus ref={ring1} args={[0.7, 0.025, 16, 80]}>
        <meshStandardMaterial color="#fbbf24" emissive="#f59e0b" emissiveIntensity={1} transparent opacity={0.6} roughness={0} metalness={1} />
      </Torus>
      <Torus ref={ring2} args={[1.0, 0.018, 16, 80]}>
        <meshStandardMaterial color="#f59e0b" emissive="#d97706" emissiveIntensity={1} transparent opacity={0.4} roughness={0} metalness={1} />
      </Torus>
      <Torus ref={ring3} args={[1.3, 0.012, 16, 80]}>
        <meshStandardMaterial color="#d97706" emissive="#b45309" emissiveIntensity={0.8} transparent opacity={0.25} roughness={0} metalness={1} />
      </Torus>

      {/* Core signal source */}
      <group ref={core}>
        <Octahedron args={[0.25, 0]}>
          <MeshDistortMaterial color="#f59e0b" distort={0.3} speed={3} roughness={0} metalness={1} emissive="#fbbf24" emissiveIntensity={0.8} />
        </Octahedron>
      </group>

      {/* Orbiting micro dots */}
      {[0, 1.2, 2.4, 3.6, 4.8].map((o, i) => (
        <OrbitingSphere key={i} offset={o} radius={0.7} color="#fbbf24" size={0.05} />
      ))}
    </>
  );
}

// ── Section header 3D: Journey DNA Helix ───────────────────────────
function DNAHelixScene() {
  const group = useRef();
  const STEPS = 28;
  const HEIGHT = 2.6;
  const RADIUS = 0.55;

  const strandA = useMemo(() => Array.from({ length: STEPS }, (_, i) => {
    const angle = (i / STEPS) * Math.PI * 4;
    const y = (i / STEPS) * HEIGHT - HEIGHT / 2;
    return [Math.cos(angle) * RADIUS, y, Math.sin(angle) * RADIUS];
  }), []);

  const strandB = useMemo(() => Array.from({ length: STEPS }, (_, i) => {
    const angle = (i / STEPS) * Math.PI * 4 + Math.PI;
    const y = (i / STEPS) * HEIGHT - HEIGHT / 2;
    return [Math.cos(angle) * RADIUS, y, Math.sin(angle) * RADIUS];
  }), []);

  useFrame(({ clock }) => {
    if (group.current) { group.current.rotation.y = clock.elapsedTime * 0.4; }
  });

  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[3, 2, 3]} intensity={2} color="#6366f1" />
      <pointLight position={[-3, -2, -2]} intensity={1.5} color="#a78bfa" />
      <pointLight position={[0, 4, 0]} intensity={1} color="#60a5fa" />

      <group ref={group}>
        {/* Strand A nodes */}
        {strandA.map((pos, i) => (
          <Float key={`a-${i}`} speed={1} floatIntensity={0.05}>
            <Sphere position={pos} args={[0.07, 16, 16]}>
              <meshStandardMaterial color="#6366f1" emissive="#818cf8" emissiveIntensity={1.5} roughness={0} metalness={1} />
            </Sphere>
          </Float>
        ))}

        {/* Strand B nodes */}
        {strandB.map((pos, i) => (
          <Float key={`b-${i}`} speed={1} floatIntensity={0.05}>
            <Sphere position={pos} args={[0.07, 16, 16]}>
              <meshStandardMaterial color="#a78bfa" emissive="#c4b5fd" emissiveIntensity={1.5} roughness={0} metalness={1} />
            </Sphere>
          </Float>
        ))}

        {/* Cross-rungs connecting the two strands */}
        {Array.from({ length: STEPS }, (_, i) => {
          if (i % 3 !== 0) return null;
          const a = strandA[i];
          const b = strandB[i];
          const crossPts = [
            new THREE.Vector3(...a),
            new THREE.Vector3(...b),
          ];
          const geo = new THREE.BufferGeometry().setFromPoints(crossPts);
          return (
            <line key={`rung-${i}`} geometry={geo}>
              <lineBasicMaterial color="#c4b5fd" transparent opacity={0.6} />
            </line>
          );
        })}
      </group>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════════════
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
    Scene: CodeRingsScene,
    sceneLabel: 'Full-Stack Dev',
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
    Scene: DesignScene,
    sceneLabel: 'Creative Design',
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
    Scene: EngineerScene,
    sceneLabel: 'Engineering',
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
    Scene: NetworkScene,
    sceneLabel: 'Network Systems',
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
    Scene: MarketingScene,
    sceneLabel: 'Broadcast & Brand',
  },
];

// ═══════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════
export default function Timeline() {
  return (
    <section id="experience" className="section" style={{
      background: 'linear-gradient(180deg, #fafbff 0%, #f5f3ff 50%, #f8f9ff 100%)',
    }}>
      {/* Background orbs */}
      <div style={{
        position: 'absolute', top: '50%', right: '-8%', transform: 'translateY(-50%)',
        width: '450px', height: '450px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)',
        filter: 'blur(70px)', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '10%', left: '-5%',
        width: '350px', height: '350px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)',
        filter: 'blur(60px)', pointerEvents: 'none',
      }} />
      <div className="dot-grid" style={{ position: 'absolute', inset: 0, opacity: 0.4, pointerEvents: 'none' }} />

      <div className="container">

        {/* ── Section Header with DNA Helix ─────────── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: '40px',
          alignItems: 'center',
          marginBottom: '80px',
        }} className="journey-header">

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="section-tag">Experience</div>
            <h2 className="section-title" style={{ marginBottom: '16px' }}>
              My <span className="gradient-text">Journey</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '400px', lineHeight: 1.7 }}>
              A chronicle of roles where I've built, designed, and shipped — each step shaping a stronger engineer.
            </p>

            {/* Stats mini row — Internships only */}
            <div style={{ display: 'flex', gap: '24px', marginTop: '28px', flexWrap: 'wrap' }}>
              {[
                { val: '4+', label: 'Internships', color: '#4f46e5' },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  style={{
                    padding: '10px 18px', borderRadius: '12px',
                    background: `${s.color}08`,
                    border: `1px solid ${s.color}20`,
                  }}
                >
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: s.color }}>{s.val}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{s.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* DNA Helix 3D */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            style={{ width: '200px', height: '320px', position: 'relative', flexShrink: 0 }}
            className="helix-canvas"
          >
            {/* Glow behind helix */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)',
              filter: 'blur(30px)',
            }} />
            <Canvas camera={{ position: [0, 0, 3.5], fov: 60 }}>
              <DNAHelixScene />
            </Canvas>
            <div style={{
              position: 'absolute', bottom: '-4px', left: '50%', transform: 'translateX(-50%)',
              fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-muted)',
              letterSpacing: '0.1em', whiteSpace: 'nowrap',
            }}>
              Career Helix
            </div>
          </motion.div>
        </div>

        {/* ── Timeline ──────────────────────────────── */}
        <div style={{ position: 'relative', maxWidth: '960px', margin: '0 auto' }}>

          {/* Animated center line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'absolute', left: '50%', top: 0, bottom: 0, width: '2px',
              background: 'linear-gradient(to bottom, transparent, #6366f1 15%, #7c3aed 60%, #ec4899 90%, transparent)',
              transform: 'translateX(-50%)', transformOrigin: 'top',
              opacity: 0.4,
            }}
          />

          {experiences.map((exp, i) => {
            const isLeft = i % 2 === 0; // card on left → 3D on right; card on right → 3D on left
            const { Scene } = exp;

            return (
              <div
                key={i}
                className="timeline-entry"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 60px 1fr',
                  gap: '0',
                  paddingBottom: i === experiences.length - 1 ? 0 : '56px',
                  alignItems: 'center',
                  position: 'relative',
                }}
              >
                {/* ── LEFT COLUMN ── */}
                {isLeft ? (
                  // Card on left
                  <motion.div
                    className="tl-left"
                    initial={{ opacity: 0, x: -50, filter: 'blur(8px)' }}
                    whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.75, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '36px' }}
                  >
                    <ExperienceCard exp={exp} />
                  </motion.div>
                ) : (
                  // 3D scene on left
                  <motion.div
                    className="tl-left timeline-3d"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.9, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                    style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '36px' }}
                  >
                    <ThreeDGap exp={exp} Scene={Scene} />
                  </motion.div>
                )}

                {/* ── CENTER: Timeline dot ── */}
                <div className="tl-dot-col" style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '22px' }}>
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 + 0.25, type: 'spring', stiffness: 220, damping: 16 }}
                    style={{
                      width: '16px', height: '16px', borderRadius: '50%',
                      background: exp.color, zIndex: 2,
                      border: '3px solid white',
                      boxShadow: `0 0 0 4px ${exp.color}28, 0 0 16px ${exp.color}50, 0 2px 8px rgba(15,23,42,0.15)`,
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                {/* ── RIGHT COLUMN ── */}
                {!isLeft ? (
                  // Card on right
                  <motion.div
                    className="tl-right"
                    initial={{ opacity: 0, x: 50, filter: 'blur(8px)' }}
                    whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.75, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    style={{ paddingLeft: '36px' }}
                  >
                    <ExperienceCard exp={exp} />
                  </motion.div>
                ) : (
                  // 3D scene on right
                  <motion.div
                    className="tl-right timeline-3d"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.9, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                    style={{ paddingLeft: '36px' }}
                  >
                    <ThreeDGap exp={exp} Scene={Scene} />
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .journey-header { grid-template-columns: 1fr !important; }
          .helix-canvas { display: none !important; }
        }
        @media (max-width: 768px) {
          .timeline-entry {
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            gap: 16px !important;
            padding-bottom: 40px !important;
          }
          .timeline-entry .tl-left,
          .timeline-entry .tl-right {
            width: 100% !important;
            max-width: 100% !important;
            padding: 0 !important;
            justify-content: center !important;
          }
          .timeline-entry .tl-dot-col {
            display: none !important;
          }
          .timeline-3d { display: none !important; }
          .tl-card { max-width: 100% !important; width: 100% !important; }
        }
      `}</style>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════
// EXPERIENCE CARD
// ═══════════════════════════════════════════════════════════════════
function ExperienceCard({ exp }) {
  return (
    <motion.div
      className="tl-card"
      whileHover={{ scale: 1.018, y: -3 }}
      style={{
        width: '100%', maxWidth: '390px',
        background: '#ffffff',
        border: `1px solid ${exp.color}18`,
        borderRadius: '20px',
        padding: '24px',
        boxShadow: `0 4px 24px rgba(15,23,42,0.07), 0 0 0 1px ${exp.color}08`,
        cursor: 'none',
        position: 'relative', overflow: 'hidden',
        transition: 'all 0.3s',
      }}
      data-cursor
    >
      {/* Top accent bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
        background: `linear-gradient(90deg, ${exp.color}, ${exp.color}44, transparent)`,
        borderRadius: '20px 20px 0 0',
      }} />
      {/* Shine */}
      <div className="shine" style={{ position: 'absolute', inset: 0, borderRadius: '20px' }} />

      {/* Current badge */}
      {exp.status === 'current' && (
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '5px',
          padding: '3px 10px', borderRadius: '50px',
          background: 'rgba(5,150,105,0.08)', border: '1px solid rgba(5,150,105,0.2)',
          fontSize: '0.68rem', color: '#059669',
          fontFamily: 'var(--font-mono)', marginBottom: '12px',
        }}>
          <span style={{
            width: '5px', height: '5px', borderRadius: '50%',
            background: '#10b981', display: 'inline-block',
            boxShadow: '0 0 6px #10b981', animation: 'pulse-soft 2s infinite',
          }} />
          CURRENT
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
        {/* Icon box */}
        <div style={{
          fontSize: '1.2rem', flexShrink: 0,
          width: '42px', height: '42px',
          background: exp.bg, borderRadius: '12px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: `1px solid ${exp.color}20`,
          boxShadow: `0 2px 8px ${exp.color}10`,
        }}>
          {exp.icon}
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '3px', lineHeight: 1.3 }}>
            {exp.role}
          </h3>
          <div style={{ fontSize: '0.82rem', color: exp.color, fontWeight: 600, marginBottom: '3px' }}>
            {exp.company}
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '10px' }}>
            📍 {exp.location} · {exp.period}
          </div>
          <p style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', lineHeight: 1.68 }}>
            {exp.desc}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// 3D GAP PANEL
// ═══════════════════════════════════════════════════════════════════
function ThreeDGap({ exp, Scene }) {
  return (
    <div style={{
      width: '100%', maxWidth: '380px',
      height: '220px',
      position: 'relative',
    }}>
      {/* Glowing halo */}
      <div style={{
        position: 'absolute', inset: '-20px',
        background: `radial-gradient(ellipse at center, ${exp.color}12 0%, transparent 70%)`,
        filter: 'blur(20px)',
        pointerEvents: 'none',
      }} />

      {/* Frosted glass panel */}
      <div style={{
        position: 'relative', width: '100%', height: '100%',
        borderRadius: '20px', overflow: 'hidden',
        background: `linear-gradient(135deg, ${exp.color}06, ${exp.color}02)`,
        border: `1px solid ${exp.color}18`,
        boxShadow: `0 4px 24px rgba(15,23,42,0.06), inset 0 1px 0 rgba(255,255,255,0.7)`,
        backdropFilter: 'blur(12px)',
      }}>
        {/* Corner decoration lines */}
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '40px', height: '40px',
          borderTop: `2px solid ${exp.color}40`, borderLeft: `2px solid ${exp.color}40`,
          borderRadius: '20px 0 0 0',
        }} />
        <div style={{
          position: 'absolute', bottom: 0, right: 0, width: '40px', height: '40px',
          borderBottom: `2px solid ${exp.color}40`, borderRight: `2px solid ${exp.color}40`,
          borderRadius: '0 0 20px 0',
        }} />

        {/* Three.js Canvas */}
        <Canvas
          camera={{ position: [0, 0, 3.2], fov: 55 }}
          style={{ width: '100%', height: '100%' }}
        >
          <Scene />
        </Canvas>
      </div>

      {/* Label badge */}
      <div style={{
        position: 'absolute', bottom: '-14px', left: '50%', transform: 'translateX(-50%)',
        padding: '4px 14px', borderRadius: '50px',
        background: '#fff',
        border: `1px solid ${exp.color}25`,
        boxShadow: `0 2px 10px rgba(15,23,42,0.08), 0 0 16px ${exp.color}18`,
        fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
        color: exp.color, fontWeight: 600, letterSpacing: '0.06em',
        whiteSpace: 'nowrap',
      }}>
        ✦ {exp.sceneLabel}
      </div>
    </div>
  );
}
