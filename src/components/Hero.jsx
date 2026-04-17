import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// ── Cinematic Canvas Background (Matrix-style digital rain + pulse waves) ──────
function CinematicCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let w, h;
    const FONT_SIZE = 13;
    const CHARS = '01アイウエオカキクケコ∑∆∇∈⊕λμσ{}[]<>/*&^%#@!';
    let columns = [];

    const buildColumns = () => {
      const numCols = Math.floor(w / (FONT_SIZE * 1.6));
      columns = Array.from({ length: numCols }, (_, i) => ({
        x: i * FONT_SIZE * 1.6,
        y: Math.random() * -h,
        speed: 0.8 + Math.random() * 2,
        len: 6 + Math.floor(Math.random() * 18),
        chars: Array.from({ length: 30 }, () => CHARS[Math.floor(Math.random() * CHARS.length)]),
        timer: 0,
        opacity: 0.25 + Math.random() * 0.55,
        cyan: Math.random() < 0.65,
      }));
    };

    const resize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
      buildColumns();
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let pulseT = 0;

    const draw = () => {
      ctx.fillStyle = 'rgba(3, 7, 18, 0.15)';
      ctx.fillRect(0, 0, w, h);

      ctx.font = `${FONT_SIZE}px 'JetBrains Mono', monospace`;

      columns.forEach((col) => {
        col.timer++;
        if (col.timer > 5) {
          col.chars.shift();
          col.chars.push(CHARS[Math.floor(Math.random() * CHARS.length)]);
          col.timer = 0;
        }
        for (let ci = 0; ci < col.len; ci++) {
          const charY = col.y - ci * FONT_SIZE;
          if (charY < 0 || charY > h) continue;
          const a = ci === 0 ? 1 : Math.max(0, (1 - ci / col.len)) * col.opacity;
          if (ci === 0) {
            ctx.fillStyle = `rgba(200, 255, 255, ${a})`;
          } else if (col.cyan) {
            ctx.fillStyle = `rgba(0, 212, 255, ${a * 0.65})`;
          } else {
            ctx.fillStyle = `rgba(168, 85, 247, ${a * 0.5})`;
          }
          ctx.fillText(col.chars[ci] || '0', col.x, charY);
        }
        col.y += col.speed;
        if (col.y - col.len * FONT_SIZE > h) {
          col.y = Math.random() * -150;
          col.speed = 0.8 + Math.random() * 2;
          col.cyan = Math.random() < 0.65;
        }
      });

      // Radial pulse waves from center
      pulseT += 0.006;
      const cx = w / 2, cy = h / 2;
      for (let r = 0; r < 3; r++) {
        const rad = ((pulseT * 160 + r * 130) % 700);
        const a = Math.max(0, 1 - rad / 600) * 0.05;
        if (a < 0.001 || rad < 4) continue;
        const g = ctx.createRadialGradient(cx, cy, Math.max(0, rad - 3), cx, cy, rad + 3);
        g.addColorStop(0, `rgba(0,212,255,${a})`);
        g.addColorStop(1, 'transparent');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      }

      // Vignette
      const vig = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.hypot(cx, cy));
      vig.addColorStop(0, 'transparent');
      vig.addColorStop(0.6, 'rgba(3,7,18,0.4)');
      vig.addColorStop(1, 'rgba(3,7,18,0.95)');
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, w, h);

      // Bottom fade
      const btm = ctx.createLinearGradient(0, h * 0.55, 0, h);
      btm.addColorStop(0, 'transparent');
      btm.addColorStop(1, 'rgba(3,7,18,1)');
      ctx.fillStyle = btm;
      ctx.fillRect(0, 0, w, h);

      // Scanlines
      for (let y = 0; y < h; y += 4) {
        ctx.fillStyle = 'rgba(0,0,0,0.055)';
        ctx.fillRect(0, y, w, 2);
      }

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute', inset: 0, zIndex: 0,
        width: '100%', height: '100%',
      }}
    />
  );
}

// ── 3D Particle Field ──────────────────────────────────────────────────────────
function ParticleField() {
  const ref = useRef();
  const count = 3000;

  const positions = React.useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.03;
      ref.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#00d4ff"
        size={0.035}
        sizeAttenuation
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
}

// ── Typing animation ───────────────────────────────────────────────────────────
const roles = [
  'AI/ML Engineer',
  'Full-Stack Developer',
  'Computer Vision Engineer',
  'Software Architect',
];

function TypingText() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const role = roles[roleIdx];
    let timeout;
    if (paused) {
      timeout = setTimeout(() => { setDeleting(true); setPaused(false); }, 1800);
      return () => clearTimeout(timeout);
    }
    if (!deleting && displayed.length < role.length) {
      timeout = setTimeout(() => setDisplayed(role.slice(0, displayed.length + 1)), 70);
    } else if (!deleting && displayed.length === role.length) {
      setPaused(true);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIdx((roleIdx + 1) % roles.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, paused, roleIdx]);

  return (
    <span style={{ color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>
      {displayed}
      <span style={{ animation: 'blink 1s infinite', color: 'var(--accent-violet)' }}>|</span>
    </span>
  );
}

// ── Scroll indicator ───────────────────────────────────────────────────────────
function ScrollIndicator() {
  return (
    <motion.div
      animate={{ y: [0, 10, 0] }}
      transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
      style={{
        position: 'absolute', bottom: '40px', left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
        color: 'var(--text-muted)', fontSize: '0.75rem', fontFamily: 'var(--font-mono)',
        letterSpacing: '0.1em', zIndex: 5,
      }}
    >
      <span>scroll</span>
      <div style={{
        width: '1px', height: '50px',
        background: 'linear-gradient(to bottom, var(--accent-cyan), transparent)',
      }} />
    </motion.div>
  );
}

// ── Main Hero ─────────────────────────────────────────────────────────────────
export default function Hero() {
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section id="hero" style={{ position: 'relative', height: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>

      {/* ── Cinematic Canvas Background (digital rain + pulse) ─ */}
      <CinematicCanvas />

      {/* Purple/cyan ambient glow */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(124,58,237,0.1) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      {/* ── 3D Particle Canvas ───────────────────────────── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, opacity: 0.45 }}>
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ParticleField />
        </Canvas>
      </div>

      {/* ── Glowing grid lines ───────────────────────────── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        backgroundImage: `
          linear-gradient(rgba(0,212,255,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,212,255,0.04) 1px, transparent 1px)
        `,
        backgroundSize: '80px 80px',
        maskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 80%)',
        WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 80%)',
        pointerEvents: 'none',
      }} />

      {/* ── Content ──────────────────────────────────────── */}
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ maxWidth: '780px' }}
        >
          {/* Top tag */}
          <motion.div variants={childVariants} style={{ marginBottom: '24px' }}>
            <span className="section-tag" style={{ marginBottom: 0 }}>
              <span style={{
                display: 'inline-block', width: '8px', height: '8px',
                borderRadius: '50%', background: 'var(--accent-green)',
                animation: 'pulse-glow 2s infinite',
                boxShadow: '0 0 10px var(--accent-green)',
              }} />
              Available for opportunities
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1 variants={childVariants} style={{
            fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
            fontWeight: 900, lineHeight: 1.05,
            marginBottom: '16px',
            letterSpacing: '-0.02em',
          }}>
            I'm{' '}
            <span className="gradient-text">Jaiamar S.</span>
          </motion.h1>

          {/* Typing role */}
          <motion.div variants={childVariants} style={{
            fontSize: 'clamp(1.1rem, 3vw, 1.8rem)',
            fontWeight: 600, marginBottom: '24px',
            minHeight: '2.5rem',
          }}>
            <TypingText />
          </motion.div>

          {/* Description */}
          <motion.p variants={childVariants} style={{
            fontSize: '1.05rem', lineHeight: 1.75,
            color: 'var(--text-secondary)', maxWidth: '580px',
            marginBottom: '40px',
          }}>
            I architect scalable digital infrastructure and engineer intelligent, data-driven systems.
            My focus is bridging complex backend logic with seamless, user-centric design.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={childVariants} style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <a
              href="#projects"
              className="btn-primary"
              data-cursor
              onClick={e => {
                e.preventDefault();
                document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span>View Projects</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
            <a href="mailto:jaiamarifs@gmail.com" className="btn-secondary" data-cursor>
              <span>Get In Touch</span>
            </a>
          </motion.div>

          {/* Stats row */}
          <motion.div variants={childVariants} style={{
            display: 'flex', gap: '40px', marginTop: '56px', flexWrap: 'wrap',
          }}>
            {[
              { num: '4+', label: 'Internships' },
              { num: '4', label: 'AI Projects' },
              { num: 'IEEE', label: 'Researcher' },
            ].map((s, i) => (
              <div key={i}>
                <div style={{
                  fontSize: '2rem', fontWeight: 800,
                  background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-violet))',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                }}>
                  {s.num}
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <ScrollIndicator />

      {/* Corner glow decorations */}
      <div style={{
        position: 'absolute', top: '20%', right: '8%', zIndex: 2,
        width: '300px', height: '300px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)',
        filter: 'blur(60px)', animation: 'float 8s ease-in-out infinite',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '15%', right: '15%', zIndex: 2,
        width: '200px', height: '200px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,212,255,0.1) 0%, transparent 70%)',
        filter: 'blur(40px)', animation: 'float 6s ease-in-out infinite 2s',
        pointerEvents: 'none',
      }} />
    </section>
  );
}
