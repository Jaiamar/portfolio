import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

import aiForgeryImg from '../assets/projects/ai_forgery.png';
import opinionlensImg from '../assets/projects/opinionlens.png';
import blockchainImg from '../assets/projects/blockchain_health.png';
import crowdIntelImg from '../assets/projects/crowd_intel.png';

const projects = [
  {
    title: 'AI Image Forgery Detection',
    description:
      'An advanced deep learning system that detects manipulated and forged images using Error Level Analysis (ELA) and an Enhanced CNN. Specifically designed to identify sophisticated forgeries that traditional methods miss.',
    image: aiForgeryImg,
    tags: ['Deep Learning', 'CNN', 'Python', 'TensorFlow', 'Computer Vision'],
    github: 'https://github.com/Jaiamar/AI-Image-Forgery-Detection',
    accent: '#4f46e5',
    tagBg: 'rgba(79,70,229,0.08)',
    tagBorder: 'rgba(79,70,229,0.18)',
  },
  {
    title: 'OpinionLens',
    description:
      'A web-based brand sentiment and market intelligence tool. Aggregates and analyzes community discussions from Reddit to provide actionable insights into public opinion on brands, products, and topics.',
    image: opinionlensImg,
    tags: ['NLP', 'Reddit API', 'React', 'Python', 'FastAPI', 'Sentiment AI'],
    github: 'https://github.com/Jaiamar/OpinionLens',
    accent: '#d97706',
    tagBg: 'rgba(217,119,6,0.08)',
    tagBorder: 'rgba(217,119,6,0.2)',
  },
  {
    title: 'Blockchain in Healthcare',
    description:
      'A role-based, blockchain-oriented healthcare web application providing a secure interface for stakeholders. Focuses on safely managing medical records, permissions, and network structures.',
    image: blockchainImg,
    tags: ['Blockchain', 'Healthcare', 'Web3', 'Node.js', 'React', 'Solidity'],
    github: 'https://github.com/Jaiamar/Blockchain-In-Healthcare',
    accent: '#059669',
    tagBg: 'rgba(5,150,105,0.08)',
    tagBorder: 'rgba(5,150,105,0.2)',
  },
  {
    title: 'Passive Crowd Intelligence',
    description:
      'A full-stack platform analyzing crowd density and patterns using computer vision and cellular network data. Features a modern real-time dashboard for displaying video analytics and insights.',
    image: crowdIntelImg,
    tags: ['Computer Vision', 'OpenCV', 'React', 'FastAPI', 'Real-time', 'Analytics'],
    github: 'https://github.com/Jaiamar/Passive-Crowd-Intelligence-System',
    accent: '#7c3aed',
    tagBg: 'rgba(124,58,237,0.08)',
    tagBorder: 'rgba(124,58,237,0.2)',
  },
];

// ── 3D Tilt Card ──────────────────────────────────────────────────────────────
function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 22 });
  const springY = useSpring(y, { stiffness: 180, damping: 22 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-6, 6]);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0); y.set(0); setHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: '1200px' }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX, rotateY,
          transformStyle: 'preserve-3d',
          borderRadius: '20px',
          overflow: 'hidden',
          background: '#ffffff',
          border: `1px solid ${hovered ? project.accent + '30' : 'rgba(148,163,184,0.15)'}`,
          boxShadow: hovered
            ? `0 20px 60px rgba(15,23,42,0.12), 0 0 0 1px ${project.accent}20, 0 8px 24px ${project.accent}15`
            : '0 4px 24px rgba(15,23,42,0.07)',
          transition: 'border-color 0.3s, box-shadow 0.3s',
          cursor: 'none',
        }}
        data-cursor
      >
        {/* Image */}
        <div style={{ position: 'relative', height: '210px', overflow: 'hidden' }}>
          <motion.img
            src={project.image}
            alt={project.title}
            style={{
              width: '100%', height: '100%', objectFit: 'cover',
              filter: hovered ? 'brightness(1) saturate(1.1)' : 'brightness(0.95) saturate(1)',
              transform: hovered ? 'scale(1.06)' : 'scale(1)',
              transition: 'all 0.5s ease',
            }}
          />
          {/* Subtle gradient over bottom of image */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, transparent 50%, rgba(255,255,255,0.95) 100%)',
          }} />

          {/* Tag chip in corner */}
          <div style={{
            position: 'absolute', top: '14px', right: '14px',
            background: 'rgba(255,255,255,0.92)',
            border: `1px solid ${project.accent}25`,
            borderRadius: '8px', padding: '4px 10px',
            fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
            color: project.accent, backdropFilter: 'blur(10px)',
            fontWeight: 600,
          }}>
            {project.tags[0]}
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '24px' }}>
          {/* Accent line */}
          <div style={{
            width: '32px', height: '3px', borderRadius: '3px',
            background: `linear-gradient(90deg, ${project.accent}, transparent)`,
            marginBottom: '14px',
          }} />

          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>
            {project.title}
          </h3>

          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.72, marginBottom: '18px' }}>
            {project.description}
          </p>

          {/* Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
            {project.tags.map((t, i) => (
              <span key={i} style={{
                padding: '3px 10px', borderRadius: '50px',
                background: project.tagBg, color: project.accent,
                fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
                border: `1px solid ${project.tagBorder}`, fontWeight: 500,
              }}>
                {t}
              </span>
            ))}
          </div>

          {/* GitHub link */}
          <motion.a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            whileHover={{ x: 4 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              color: project.accent, fontWeight: 600, fontSize: '0.88rem',
              textDecoration: 'none', fontFamily: 'var(--font-main)',
              padding: '8px 16px',
              background: project.tagBg,
              border: `1px solid ${project.tagBorder}`,
              borderRadius: '50px',
              transition: 'background 0.2s',
            }}
            data-cursor
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            View on GitHub
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </motion.a>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="section" style={{
      background: 'linear-gradient(180deg, #f0f3ff 0%, #fafbff 60%, #f0f3ff 100%)',
    }}>
      <div style={{
        position: 'absolute', top: '15%', right: '-8%',
        width: '500px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(79,70,229,0.07) 0%, transparent 70%)',
        filter: 'blur(80px)', pointerEvents: 'none',
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
          <div className="section-tag" style={{ justifyContent: 'center' }}>Featured Projects</div>
          <h2 className="section-title">What I've <span className="gradient-text">Built</span></h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '480px', margin: '0 auto' }}>
            Real-world AI and full-stack systems solving complex problems
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '28px' }} className="projects-grid">
          {projects.map((p, i) => <ProjectCard key={i} project={p} index={i} />)}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{ textAlign: 'center', marginTop: '52px' }}
        >
          <a href="https://github.com/Jaiamar" target="_blank" rel="noreferrer" className="btn-secondary" data-cursor>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            <span>View All Projects on GitHub</span>
          </a>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) { .projects-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
