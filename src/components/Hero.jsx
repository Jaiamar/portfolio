import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// ═══════════════════════════════════════════════════════════════════════════════
// CINEMATIC 3D TECH BACKGROUND — Multi-layer canvas animation
// ═══════════════════════════════════════════════════════════════════════════════
function CinematicCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId, w, h, cx, cy;

    // ── State ──────────────────────────────────────────────
    let t = 0;

    // Neural network nodes
    const NODE_COUNT = 55;
    let nodes = [];

    // Data particles flying along connection paths
    let dataParticles = [];

    // Floating bokeh orbs (depth-of-field)
    let bokeh = [];

    // Circuit line tracers
    let tracers = [];

    const init = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
      cx = w / 2; cy = h / 2;

      // Build nodes spread across the viewport in 3D-like clusters
      nodes = Array.from({ length: NODE_COUNT }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        z: 0.2 + Math.random() * 0.8,          // depth 0.2–1.0
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: 2 + Math.random() * 4,
        hue: [258, 217, 195, 290, 320][Math.floor(Math.random() * 5)], // violet/indigo/cyan/purple/pink
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.04,
        connections: [],
      }));

      // Build connection map (edges) for nearby nodes
      nodes.forEach((n, i) => {
        n.connections = nodes
          .map((m, j) => j !== i ? { idx: j, dist: Math.hypot(n.x - m.x, n.y - m.y) } : null)
          .filter(Boolean)
          .sort((a, b) => a.dist - b.dist)
          .slice(0, 3)
          .filter(c => c.dist < 200)
          .map(c => c.idx);
      });

      // Data particles on connections
      dataParticles = Array.from({ length: 40 }, () => {
        const fromIdx = Math.floor(Math.random() * nodes.length);
        const toIdxArr = nodes[fromIdx].connections;
        if (!toIdxArr.length) return null;
        return {
          fromIdx,
          toIdx: toIdxArr[Math.floor(Math.random() * toIdxArr.length)],
          t: Math.random(),
          speed: 0.004 + Math.random() * 0.008,
          hue: [258, 195, 320][Math.floor(Math.random() * 3)],
          size: 2 + Math.random() * 2,
        };
      }).filter(Boolean);

      // Bokeh orbs (blurry depth balls)
      bokeh = Array.from({ length: 28 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 20 + Math.random() * 80,
        hue: [258, 217, 195, 290][Math.floor(Math.random() * 4)],
        alpha: 0.04 + Math.random() * 0.1,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        phase: Math.random() * Math.PI * 2,
      }));

      // Circuit tracers — scan lines that draw horizontal/vertical bright streaks
      tracers = Array.from({ length: 12 }, (_, i) => ({
        x: Math.random() * w,
        y: Math.random() * h,
        dir: Math.random() < 0.5 ? 'h' : 'v',
        speed: 1.5 + Math.random() * 3,
        len: 60 + Math.random() * 160,
        hue: [258, 195, 290][Math.floor(Math.random() * 3)],
        alpha: 0.5 + Math.random() * 0.5,
        life: 0,
        maxLife: 80 + Math.random() * 120,
      }));
    };

    init();
    const ro = new ResizeObserver(init);
    ro.observe(canvas);

    // ── Draw loop ─────────────────────────────────────────
    const draw = () => {
      t++;

      // Semi-transparent clear — creates motion trail
      ctx.fillStyle = 'rgba(6, 4, 28, 0.18)';
      ctx.fillRect(0, 0, w, h);

      // ─────────────────────────────────────────
      // LAYER 1: Deep space background gradient
      // ─────────────────────────────────────────
      if (t === 1) {
        const bg = ctx.createRadialGradient(cx, cy * 0.7, 0, cx, cy, Math.max(w, h) * 0.85);
        bg.addColorStop(0, 'rgba(20, 10, 60, 1)');
        bg.addColorStop(0.4, 'rgba(10, 5, 40, 1)');
        bg.addColorStop(1, 'rgba(4, 2, 18, 1)');
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, w, h);
      }

      // ─────────────────────────────────────────
      // LAYER 2: 3D Perspective grid (floor grid)
      // ─────────────────────────────────────────
      const gridHorizon = h * 0.55;
      const gridVanish = cx;
      const GRID_COLS = 16;
      const GRID_ROWS = 14;
      const gridW = w * 1.6;
      const gridLeft = cx - gridW / 2;

      for (let col = 0; col <= GRID_COLS; col++) {
        const xStart = gridLeft + (gridW / GRID_COLS) * col;
        const xEnd = cx + (xStart - cx) * 0.04;
        const pulse = 0.3 + 0.15 * Math.sin(t * 0.02 + col * 0.3);
        ctx.beginPath();
        ctx.moveTo(xEnd, gridHorizon);
        ctx.lineTo(xStart, h + 80);
        ctx.strokeStyle = `rgba(99,102,241,${pulse})`;
        ctx.lineWidth = col === GRID_COLS / 2 ? 1.5 : 0.8;
        ctx.stroke();
      }

      for (let row = 0; row <= GRID_ROWS; row++) {
        const rowT = row / GRID_ROWS;
        const y = gridHorizon + Math.pow(rowT, 2) * (h + 80 - gridHorizon);
        const xL = gridLeft + (cx - gridLeft) * (1 - rowT * 0.96);
        const xR = gridLeft + gridW - (gridLeft + gridW - cx) * (1 - rowT * 0.96);
        const alpha = 0.12 + rowT * 0.45 + 0.1 * Math.sin(t * 0.025 - row * 0.4);
        ctx.beginPath();
        ctx.moveTo(xL, y);
        ctx.lineTo(xR, y);
        ctx.strokeStyle = `rgba(139,92,246,${alpha})`;
        ctx.lineWidth = 0.7 + rowT * 1.2;
        ctx.stroke();
      }

      // Glowing horizon line
      const horizGrad = ctx.createLinearGradient(0, gridHorizon, w, gridHorizon);
      horizGrad.addColorStop(0, 'transparent');
      horizGrad.addColorStop(0.2, 'rgba(99,102,241,0.6)');
      horizGrad.addColorStop(0.5, 'rgba(167,139,250,0.9)');
      horizGrad.addColorStop(0.8, 'rgba(99,102,241,0.6)');
      horizGrad.addColorStop(1, 'transparent');
      ctx.beginPath();
      ctx.moveTo(0, gridHorizon);
      ctx.lineTo(w, gridHorizon);
      ctx.strokeStyle = horizGrad;
      ctx.lineWidth = 2.5;
      ctx.shadowColor = 'rgba(167,139,250,0.9)';
      ctx.shadowBlur = 18;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // ─────────────────────────────────────────
      // LAYER 3: Bokeh depth orbs
      // ─────────────────────────────────────────
      bokeh.forEach(b => {
        b.x += b.vx + Math.sin(t * 0.01 + b.phase) * 0.15;
        b.y += b.vy;
        if (b.x < -b.r * 2) b.x = w + b.r;
        if (b.x > w + b.r * 2) b.x = -b.r;
        if (b.y < -b.r * 2) b.y = h + b.r;
        if (b.y > h + b.r * 2) b.y = -b.r;

        const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
        const a = b.alpha * (0.7 + 0.3 * Math.sin(t * 0.015 + b.phase));
        g.addColorStop(0, `hsla(${b.hue},80%,75%,${a})`);
        g.addColorStop(0.5, `hsla(${b.hue},70%,60%,${a * 0.4})`);
        g.addColorStop(1, 'transparent');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // ─────────────────────────────────────────
      // LAYER 4: Neural network — connections
      // ─────────────────────────────────────────
      nodes.forEach((n, i) => {
        n.connections.forEach(j => {
          if (j > i) {
            const m = nodes[j];
            const dist = Math.hypot(n.x - m.x, n.y - m.y);
            const alpha = (1 - dist / 200) * 0.35 * (n.z + m.z) / 2;
            if (alpha <= 0) return;

            const midHue = (n.hue + m.hue) / 2;
            const lineGrad = ctx.createLinearGradient(n.x, n.y, m.x, m.y);
            lineGrad.addColorStop(0, `hsla(${n.hue},90%,75%,${alpha})`);
            lineGrad.addColorStop(1, `hsla(${m.hue},90%,75%,${alpha})`);
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(m.x, m.y);
            ctx.strokeStyle = lineGrad;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        });
      });

      // ─────────────────────────────────────────
      // LAYER 5: Neural network — nodes
      // ─────────────────────────────────────────
      nodes.forEach(n => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
        n.pulse += n.pulseSpeed;

        const pulseMult = 0.9 + 0.2 * Math.sin(n.pulse);
        const r = n.r * n.z * pulseMult;
        const brightness = 60 + 20 * Math.sin(n.pulse);
        const alpha = 0.6 + 0.4 * Math.sin(n.pulse) * n.z;

        // Outer glow
        const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 4);
        glow.addColorStop(0, `hsla(${n.hue},90%,${brightness}%,${alpha * 0.5})`);
        glow.addColorStop(0.4, `hsla(${n.hue},85%,${brightness - 10}%,${alpha * 0.15})`);
        glow.addColorStop(1, 'transparent');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r * 4, 0, Math.PI * 2);
        ctx.fill();

        // Core dot
        ctx.fillStyle = `hsla(${n.hue},95%,${brightness + 10}%,${alpha})`;
        ctx.shadowColor = `hsla(${n.hue},100%,80%,0.9)`;
        ctx.shadowBlur = 12 * n.z;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // ─────────────────────────────────────────
      // LAYER 6: Data particles on connections
      // ─────────────────────────────────────────
      dataParticles.forEach(p => {
        p.t += p.speed;
        if (p.t > 1) {
          p.t = 0;
          p.fromIdx = p.toIdx;
          const next = nodes[p.fromIdx].connections;
          if (next.length) p.toIdx = next[Math.floor(Math.random() * next.length)];
        }
        const from = nodes[p.fromIdx];
        const to = nodes[p.toIdx];
        const x = from.x + (to.x - from.x) * p.t;
        const y = from.y + (to.y - from.y) * p.t;

        ctx.fillStyle = `hsla(${p.hue},100%,85%,0.9)`;
        ctx.shadowColor = `hsla(${p.hue},100%,90%,1)`;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // ─────────────────────────────────────────
      // LAYER 7: Circuit tracers
      // ─────────────────────────────────────────
      tracers.forEach(tr => {
        tr.life++;
        if (tr.life > tr.maxLife) {
          tr.x = Math.random() * w;
          tr.y = Math.random() * h;
          tr.dir = Math.random() < 0.5 ? 'h' : 'v';
          tr.speed = 1.5 + Math.random() * 3;
          tr.len = 60 + Math.random() * 160;
          tr.hue = [258, 195, 290][Math.floor(Math.random() * 3)];
          tr.life = 0;
          tr.maxLife = 80 + Math.random() * 120;
        }

        const progress = tr.life / tr.maxLife;
        const alpha = tr.alpha * Math.sin(progress * Math.PI);
        const tail = tr.len * progress;

        if (tr.dir === 'h') {
          tr.x += tr.speed;
          if (tr.x > w + tr.len) tr.life = tr.maxLife;
          const grad = ctx.createLinearGradient(tr.x - tail, tr.y, tr.x, tr.y);
          grad.addColorStop(0, 'transparent');
          grad.addColorStop(0.7, `hsla(${tr.hue},100%,80%,${alpha * 0.4})`);
          grad.addColorStop(1, `hsla(${tr.hue},100%,95%,${alpha})`);
          ctx.beginPath();
          ctx.moveTo(tr.x - tail, tr.y);
          ctx.lineTo(tr.x, tr.y);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.5;
          ctx.shadowColor = `hsla(${tr.hue},100%,80%,0.6)`;
          ctx.shadowBlur = 8;
          ctx.stroke();
        } else {
          tr.y += tr.speed;
          if (tr.y > h + tr.len) tr.life = tr.maxLife;
          const grad = ctx.createLinearGradient(tr.x, tr.y - tail, tr.x, tr.y);
          grad.addColorStop(0, 'transparent');
          grad.addColorStop(0.7, `hsla(${tr.hue},100%,80%,${alpha * 0.4})`);
          grad.addColorStop(1, `hsla(${tr.hue},100%,95%,${alpha})`);
          ctx.beginPath();
          ctx.moveTo(tr.x, tr.y - tail);
          ctx.lineTo(tr.x, tr.y);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.5;
          ctx.shadowColor = `hsla(${tr.hue},100%,80%,0.6)`;
          ctx.shadowBlur = 8;
          ctx.stroke();
        }
        ctx.shadowBlur = 0;
      });

      // ─────────────────────────────────────────
      // LAYER 8: Central radial energy burst
      // ─────────────────────────────────────────
      const burstAlpha = 0.06 + 0.03 * Math.sin(t * 0.04);
      const burst = ctx.createRadialGradient(cx, cy * 0.5, 0, cx, cy * 0.5, w * 0.55);
      burst.addColorStop(0, `rgba(130,100,255,${burstAlpha * 2})`);
      burst.addColorStop(0.3, `rgba(100,70,220,${burstAlpha})`);
      burst.addColorStop(0.7, `rgba(70,40,160,${burstAlpha * 0.4})`);
      burst.addColorStop(1, 'transparent');
      ctx.fillStyle = burst;
      ctx.fillRect(0, 0, w, h);

      // ─────────────────────────────────────────
      // LAYER 9: Scan line overlay
      // ─────────────────────────────────────────
      for (let y = 0; y < h; y += 3) {
        ctx.fillStyle = 'rgba(0,0,0,0.06)';
        ctx.fillRect(0, y, w, 1.5);
      }

      // ─────────────────────────────────────────
      // LAYER 10: Edge vignette — keep center bright
      // ─────────────────────────────────────────
      const vig = ctx.createRadialGradient(cx, cy, h * 0.15, cx, cy, Math.hypot(cx, cy) * 1.1);
      vig.addColorStop(0, 'transparent');
      vig.addColorStop(0.6, 'rgba(4,2,18,0.1)');
      vig.addColorStop(1, 'rgba(4,2,18,0.8)');
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, w, h);

      animId = requestAnimationFrame(draw);
    };

    // Initialize the background fill once before animation starts
    ctx.fillStyle = 'rgb(6,4,28)';
    ctx.fillRect(0, 0, w, h);
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

// ── 3D Floating Particle Field ─────────────────────────────────────────────────
function ParticleField() {
  const ref = useRef();
  const count = 2000;
  const positions = React.useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 16;
    }
    return pos;
  }, []);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.x = clock.elapsedTime * 0.025;
      ref.current.rotation.y = clock.elapsedTime * 0.04;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial
        transparent color="#a78bfa"
        size={0.04} sizeAttenuation depthWrite={false} opacity={0.55}
      />
    </Points>
  );
}

// ── Typing Text ────────────────────────────────────────────────────────────────
const roles = ['AI/ML Engineer', 'Full-Stack Developer', 'Computer Vision Engineer', 'Software Architect'];

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
      setRoleIdx(i => (i + 1) % roles.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, paused, roleIdx]);

  return (
    <span style={{
      background: 'linear-gradient(135deg, #a78bfa, #60a5fa)',
      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
      fontFamily: 'var(--font-mono)', fontWeight: 700,
    }}>
      {displayed}
      <span style={{ animation: 'blink 1s infinite', WebkitTextFillColor: '#a78bfa' }}>|</span>
    </span>
  );
}

// ── Scroll Indicator ───────────────────────────────────────────────────────────
function ScrollIndicator() {
  return (
    <motion.div
      animate={{ y: [0, 10, 0] }}
      transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
      style={{
        position: 'absolute', bottom: '40px', left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
        color: 'rgba(167,139,250,0.7)', fontSize: '0.72rem', fontFamily: 'var(--font-mono)',
        letterSpacing: '0.12em', zIndex: 5, textShadow: '0 0 12px rgba(167,139,250,0.5)',
      }}
    >
      <span>scroll</span>
      <div style={{
        width: '1px', height: '48px',
        background: 'linear-gradient(to bottom, #a78bfa, transparent)',
        boxShadow: '0 0 8px rgba(167,139,250,0.4)',
      }} />
    </motion.div>
  );
}

// ── HERO SECTION ──────────────────────────────────────────────────────────────
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
      background: 'rgb(6,4,28)',         // dark base so canvas renders on solid bg
    }}>
      {/* ── 3D Cinematic Tech Canvas ─────────────────── */}
      <CinematicCanvas />

      {/* ── 3D Particle field ────────────────────────── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, opacity: 0.4 }}>
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ParticleField />
        </Canvas>
      </div>

      {/* ── Bright neon glow orbs ─────────────────────── */}
      <div style={{
        position: 'absolute', top: '5%', right: '3%', zIndex: 1,
        width: '420px', height: '420px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(139,92,246,0.25) 0%, rgba(99,102,241,0.1) 40%, transparent 70%)',
        filter: 'blur(50px)', animation: 'float 9s ease-in-out infinite',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '10%', left: '2%', zIndex: 1,
        width: '360px', height: '360px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(96,165,250,0.18) 0%, transparent 70%)',
        filter: 'blur(60px)', animation: 'float 7s ease-in-out infinite 2s',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: '45%', right: '18%', zIndex: 1,
        width: '280px', height: '280px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(244,114,182,0.15) 0%, transparent 70%)',
        filter: 'blur(40px)', animation: 'float 11s ease-in-out infinite 4s',
        pointerEvents: 'none',
      }} />

      {/* ── Content ──────────────────────────────────── */}
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
              padding: '6px 18px', borderRadius: '50px',
              background: 'rgba(139,92,246,0.15)',
              border: '1px solid rgba(139,92,246,0.35)',
              fontFamily: 'var(--font-mono)', fontSize: '0.75rem',
              color: '#c4b5fd', fontWeight: 500, letterSpacing: '0.06em',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 0 20px rgba(139,92,246,0.15)',
            }}>
              <span style={{
                display: 'inline-block', width: '7px', height: '7px',
                borderRadius: '50%', background: '#34d399',
                boxShadow: '0 0 10px #34d399, 0 0 20px rgba(52,211,153,0.4)',
                animation: 'blink 2s ease-in-out infinite',
              }} />
              AVAILABLE FOR OPPORTUNITIES
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1 variants={childVariants} style={{
            fontSize: 'clamp(2.8rem, 7vw, 5.8rem)',
            fontWeight: 900, lineHeight: 1.05,
            color: '#f1f5f9',
            marginBottom: '16px',
            letterSpacing: '-0.03em',
            textShadow: '0 0 60px rgba(139,92,246,0.3)',
          }}>
            I'm{' '}
            <span style={{
              background: 'linear-gradient(135deg, #a78bfa 0%, #60a5fa 50%, #f472b6 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 20px rgba(167,139,250,0.5))',
            }}>
              Jaiamar S.
            </span>
          </motion.h1>

          {/* Role */}
          <motion.div variants={childVariants} style={{
            fontSize: 'clamp(1.1rem, 3vw, 1.75rem)',
            fontWeight: 700, marginBottom: '24px', minHeight: '2.5rem',
          }}>
            <TypingText />
          </motion.div>

          {/* Description */}
          <motion.p variants={childVariants} style={{
            fontSize: '1.05rem', lineHeight: 1.8,
            color: 'rgba(203,213,225,0.85)', maxWidth: '560px',
            marginBottom: '44px',
            textShadow: '0 1px 4px rgba(0,0,0,0.3)',
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
              style={{ textDecoration: 'none', boxShadow: '0 0 30px rgba(139,92,246,0.45), 0 4px 20px rgba(99,102,241,0.3)' }}
              onClick={e => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }); }}
            >
              <span>View Projects</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
            <a href="mailto:jaiamarifs@gmail.com" data-cursor style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '13px 32px', background: 'rgba(255,255,255,0.06)',
              border: '1.5px solid rgba(167,139,250,0.4)', borderRadius: '50px',
              color: '#c4b5fd', fontFamily: 'var(--font-main)', fontSize: '1rem',
              fontWeight: 600, textDecoration: 'none', backdropFilter: 'blur(12px)',
              transition: 'all 0.3s', cursor: 'none',
            }}>
              <span>Get In Touch</span>
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div variants={childVariants} style={{
            display: 'flex', gap: '16px', marginTop: '60px', flexWrap: 'wrap',
          }}>
            {[
              { num: '4+', label: 'Internships', icon: '💼', color: '#a78bfa' },
              { num: '4', label: 'AI Projects', icon: '🤖', color: '#60a5fa' },
              { num: 'IEEE', label: 'Researcher', icon: '📄', color: '#f472b6' },
            ].map((s, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.06, y: -3 }}
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(167,139,250,0.2)',
                  borderRadius: '16px', padding: '14px 22px',
                  backdropFilter: 'blur(16px)',
                  boxShadow: `0 4px 20px rgba(0,0,0,0.3), 0 0 30px ${s.color}15`,
                  transition: 'all 0.3s',
                }}
              >
                <div style={{ fontSize: '0.9rem', marginBottom: '4px' }}>{s.icon}</div>
                <div style={{
                  fontSize: '1.8rem', fontWeight: 800, color: s.color,
                  textShadow: `0 0 20px ${s.color}60`,
                }}>{s.num}</div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(148,163,184,0.8)', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>
                  {s.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <ScrollIndicator />

      {/* Bottom gradient fade into next section */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '180px', zIndex: 3,
        background: 'linear-gradient(to bottom, transparent, rgba(6,4,28,0.6) 60%, #0a0614)',
        pointerEvents: 'none',
      }} />
    </section>
  );
}
