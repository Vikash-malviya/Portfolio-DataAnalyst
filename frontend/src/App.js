import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Lenis from "lenis";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Dashboard from "./components/Dashboard";
import Experience from "./components/Experience";
import Contact from "./components/Contact";

function Intro() {
  return (
    <motion.div
      data-testid="intro-overlay"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050505]"
      exit={{ y: "-100%" }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="overflow-hidden">
        <motion.p
          initial={{ y: "110%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-3xl sm:text-4xl tracking-tight text-zinc-100"
        >
          Vikash <span className="italic text-gold">Malviya</span>
        </motion.p>
      </div>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-24 h-px w-48 origin-left bg-gold"
      />
    </motion.div>
  );
}

function App() {
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09, anchors: true });
    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    const t = setTimeout(() => setIntroDone(true), 1600);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      clearTimeout(t);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 antialiased">
      <AnimatePresence>{!introDone && <Intro />}</AnimatePresence>
      <div className="grain-overlay" aria-hidden="true" />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Projects />
        <Dashboard />
        <Experience />
        <Contact />
      </main>
    </div>
  );
}

export default App;
