import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// ── Light Cinematic Canvas Background ─────────────────────────────────────────
// Renders animated flowing light streams, soft ink-drop ripples, and geometric pulses
function CinematicCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId, w, h;

    // Particle streams
    const STREAM_COUNT = 60;
    let streams = [];

    const buildStreams = () => {
      streams = Array.from({ length: STREAM_COUNT }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -0.4 - Math.random() * 0.8,
        len: 40 + Math.random() * 80,
        opacity: 0.2 + Math.random() * 0.5,
        size: 1 + Math.random() * 2,
        hue: Math.random() < 0.6 ? 'indigo' : Math.random() < 0.5 ? 'violet' : 'cyan',
        life: Math.random() * 100,
        maxLife: 120 + Math.random() * 80,
      }));
    };

    const resize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
      buildStreams();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Ripples
    let ripples = [];
    const addRipple = () => {
      ripples.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0,
        maxR: 80 + Math.random() * 120,
        alpha: 0.15,
        hue: Math.random() < 0.5 ? 'rgba(79,70,229,' : 'rgba(124,58,237,',
      });
    };
    const rippleInterval = setInterval(addRipple, 1200);

    let t = 0;

    const draw = () => {
      t++;
      // Soft clear — trails fade slowly
      ctx.fillStyle = 'rgba(248,249,255,0.10)';
      ctx.fillRect(0, 0, w, h);

      // ── Draw ripples ─────────────────────────────────
      ripples = ripples.filter(rp => rp.r < rp.maxR);
      ripples.forEach(rp => {
        rp.r += 1.2;
        rp.alpha = 0.12 * (1 - rp.r / rp.maxR);
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
        ctx.strokeStyle = `${rp.hue}${rp.alpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      // ── Draw particle streams ─────────────────────────
      streams.forEach(s => {
        s.life++;
        s.x += s.vx + Math.sin(t * 0.01 + s.y * 0.005) * 0.2;
        s.y += s.vy;

        if (s.y < -20 || s.life > s.maxLife) {
          s.x = Math.random() * w;
          s.y = h + 10;
          s.life = 0;
          s.vy = -0.4 - Math.random() * 0.8;
          s.opacity = 0.15 + Math.random() * 0.5;
        }

        const lifeRatio = s.life / s.maxLife;
        const alpha = s.opacity * Math.sin(lifeRatio * Math.PI);

        let color;
        if (s.hue === 'indigo') color = `rgba(79,70,229,${alpha})`;
        else if (s.hue === 'violet') color = `rgba(124,58,237,${alpha})`;
        else color = `rgba(8,145,178,${alpha})`;

        // Draw streak
        ctx.beginPath();
        const grad = ctx.createLinearGradient(s.x, s.y, s.x + s.vx * s.len, s.y + s.vy * s.len * 0.8);
        grad.addColorStop(0, color);
        grad.addColorStop(1, 'transparent');
        ctx.strokeStyle = grad;
        ctx.lineWidth = s.size;
        ctx.lineCap = 'round';
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x + s.vx * s.len, s.y + s.vy * s.len * 0.8);
        ctx.stroke();

        // Head dot
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * 0.8, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
      });

      // ── Subtle grid pulse ─────────────────────────────
      const pulseAlpha = 0.015 + 0.01 * Math.sin(t * 0.02);
      ctx.strokeStyle = `rgba(79,70,229,${pulseAlpha})`;
      ctx.lineWidth = 0.5;
      const gSize = 60;
      for (let gx = 0; gx < w; gx += gSize) {
        ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, h); ctx.stroke();
      }
      for (let gy = 0; gy < h; gy += gSize) {
        ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(w, gy); ctx.stroke();
      }

      // Vignette edges
      const vg = ctx.createRadialGradient(w / 2, h / 2, h * 0.3, w / 2, h / 2, Math.hypot(w / 2, h / 2));
      vg.addColorStop(0, 'transparent');
      vg.addColorStop(1, 'rgba(248,249,255,0.6)');
      ctx.fillStyle = vg;
      ctx.fillRect(0, 0, w, h);

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      clearInterval(rippleInterval);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute', inset: 0, zIndex: 0,
        width: '100%', height: '100%',
        opacity: 1,
      }}
    />
  );
}

// ── 3D Particle Field (Light — soft indigo dots) ───────────────────────────────
function ParticleField() {
  const ref = useRef();
  const count = 2500;

  const positions = React.useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 18;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 18;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.025;
      ref.current.rotation.y = state.clock.elapsedTime * 0.04;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#4f46e5"
        size={0.03}
        sizeAttenuation
        depthWrite={false}
        opacity={0.35}
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
    <span style={{
      background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-violet))',
      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
      fontFamily: 'var(--font-mono)', fontWeight: 700,
    }}>
      {displayed}
      <span style={{ animation: 'blink 1s infinite', WebkitTextFillColor: 'var(--accent-primary)' }}>|</span>
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
        color: 'var(--text-muted)', fontSize: '0.72rem', fontFamily: 'var(--font-mono)',
        letterSpacing: '0.12em', zIndex: 5,
      }}
    >
      <span>scroll</span>
      <div style={{
        width: '1px', height: '48px',
        background: 'linear-gradient(to bottom, var(--accent-primary), transparent)',
      }} />
    </motion.div>
  );
}

// ── Main Hero ──────────────────────────────────────────────────────────────────
export default function Hero() {
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.14 } },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section id="hero" style={{
      position: 'relative', height: '100vh', overflow: 'hidden',
      display: 'flex', alignItems: 'center',
      background: 'linear-gradient(135deg, #f0f3ff 0%, #f8f9ff 40%, #fdf4ff 100%)',
    }}>
      {/* Cinematic light canvas */}
      <CinematicCanvas />

      {/* Floating gradient orbs */}
      <div style={{
        position: 'absolute', top: '10%', right: '5%', zIndex: 1,
        width: '500px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(79,70,229,0.12) 0%, rgba(124,58,237,0.06) 50%, transparent 70%)',
        filter: 'blur(60px)', animation: 'float 9s ease-in-out infinite',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '10%', left: '5%', zIndex: 1,
        width: '380px', height: '380px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(8,145,178,0.1) 0%, transparent 70%)',
        filter: 'blur(60px)', animation: 'float 7s ease-in-out infinite 1.5s',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: '40%', right: '20%', zIndex: 1,
        width: '300px', height: '300px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(219,39,119,0.08) 0%, transparent 70%)',
        filter: 'blur(50px)', animation: 'float 11s ease-in-out infinite 3s',
        pointerEvents: 'none',
      }} />

      {/* 3D Particle canvas — very subtle */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, opacity: 0.3 }}>
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ParticleField />
        </Canvas>
      </div>

      {/* Dot grid pattern */}
      <div className="dot-grid" style={{
        position: 'absolute', inset: 0, zIndex: 1, opacity: 0.6, pointerEvents: 'none',
        maskImage: 'radial-gradient(ellipse 65% 65% at 50% 50%, black 0%, transparent 80%)',
        WebkitMaskImage: 'radial-gradient(ellipse 65% 65% at 50% 50%, black 0%, transparent 80%)',
      }} />

      {/* ── Content ──────────────────────────────────────── */}
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ maxWidth: '760px' }}
        >
          {/* Status chip */}
          <motion.div variants={childVariants} style={{ marginBottom: '28px' }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '6px 16px', borderRadius: '50px',
              background: 'rgba(79,70,229,0.08)',
              border: '1px solid rgba(79,70,229,0.18)',
              fontFamily: 'var(--font-mono)', fontSize: '0.75rem',
              color: 'var(--accent-primary)', fontWeight: 500,
              letterSpacing: '0.06em',
            }}>
              <span style={{
                display: 'inline-block', width: '7px', height: '7px',
                borderRadius: '50%', background: 'var(--accent-green)',
                animation: 'pulse-soft 2s infinite',
                boxShadow: '0 0 8px var(--accent-green)',
              }} />
              AVAILABLE FOR OPPORTUNITIES
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1 variants={childVariants} style={{
            fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
            fontWeight: 900, lineHeight: 1.05,
            color: 'var(--text-primary)',
            marginBottom: '16px',
            letterSpacing: '-0.03em',
          }}>
            I'm{' '}
            <span className="gradient-text">Jaiamar S.</span>
          </motion.h1>

          {/* Role typing */}
          <motion.div variants={childVariants} style={{
            fontSize: 'clamp(1.1rem, 3vw, 1.75rem)',
            fontWeight: 700, marginBottom: '24px',
            minHeight: '2.5rem',
          }}>
            <TypingText />
          </motion.div>

          {/* Description */}
          <motion.p variants={childVariants} style={{
            fontSize: '1.05rem', lineHeight: 1.8,
            color: 'var(--text-secondary)', maxWidth: '560px',
            marginBottom: '44px',
          }}>
            I architect scalable digital infrastructure and engineer intelligent, data-driven systems.
            My focus is bridging complex backend logic with seamless, user-centric design.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={childVariants} style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
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
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
            <a href="mailto:jaiamarifs@gmail.com" className="btn-secondary" data-cursor>
              <span>Get In Touch</span>
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div variants={childVariants} style={{
            display: 'flex', gap: '40px', marginTop: '60px', flexWrap: 'wrap',
          }}>
            {[
              { num: '4+', label: 'Internships', icon: '💼' },
              { num: '4', label: 'AI Projects', icon: '🤖' },
              { num: 'IEEE', label: 'Researcher', icon: '📄' },
            ].map((s, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                style={{
                  background: 'rgba(255,255,255,0.7)',
                  border: '1px solid rgba(79,70,229,0.12)',
                  borderRadius: '14px',
                  padding: '14px 20px',
                  backdropFilter: 'blur(12px)',
                  boxShadow: '0 2px 12px rgba(79,70,229,0.08)',
                }}
              >
                <div style={{ fontSize: '0.9rem', marginBottom: '4px' }}>{s.icon}</div>
                <div style={{
                  fontSize: '1.8rem', fontWeight: 800,
                  background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-violet))',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                }}>
                  {s.num}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>
                  {s.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <ScrollIndicator />

      {/* Bottom wave separator */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 3, pointerEvents: 'none',
        lineHeight: 0,
      }}>
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%' }}>
          <path d="M0 60L60 50C120 40 240 20 360 15C480 10 600 20 720 25C840 30 960 30 1080 25C1200 20 1320 10 1380 5L1440 0V60H1380C1320 60 1200 60 1080 60C960 60 840 60 720 60C600 60 480 60 360 60C240 60 120 60 60 60H0Z" fill="#f0f3ff"/>
        </svg>
      </div>
    </section>
  );
}
