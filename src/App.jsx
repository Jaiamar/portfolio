import React, { useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import './index.css';

import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Services from './components/Services';
import Timeline from './components/Timeline';
import Awards from './components/Awards';
import Contact from './components/Contact';

// ── Scroll progress bar ───────────────────────────────────────────────────────
function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        height: '2px',
        background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-violet), var(--accent-pink))',
        transformOrigin: '0%',
        scaleX,
        zIndex: 9999,
      }}
    />
  );
}

// ── Section wrapper with scroll transition ────────────────────────────────────
function SectionTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ── Noise film grain overlay ──────────────────────────────────────────────────
function NoiseOverlay() {
  return <div className="noise-overlay" />;
}

export default function App() {
  // Smooth scroll using native CSS — no Lenis needed for compatibility
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  return (
    <>
      <NoiseOverlay />
      <Cursor />
      <ScrollProgressBar />
      <Navbar />

      <main>
        {/* Hero — no wrapper, it controls its own entrance */}
        <Hero />

        <SectionTransition>
          <About />
        </SectionTransition>

        <SectionTransition>
          <Skills />
        </SectionTransition>

        <SectionTransition>
          <Projects />
        </SectionTransition>

        <SectionTransition>
          <Services />
        </SectionTransition>

        <SectionTransition>
          <Timeline />
        </SectionTransition>

        <SectionTransition>
          <Awards />
        </SectionTransition>

        <SectionTransition>
          <Contact />
        </SectionTransition>
      </main>
    </>
  );
}
