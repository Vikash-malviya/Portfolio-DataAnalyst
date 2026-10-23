import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FileDown, MessageCircle, Mail, MapPin } from "lucide-react";
import GlobeScene from "./GlobeScene";
import { profile } from "../data/profile";

const CAROUSEL_SKILLS = ["SQL", "Power BI", "Advanced Excel", "Python", "DAX", "Data Storytelling"];

const MaskedLine = ({ children, delay, className = "" }) => (
  <span className={`block overflow-hidden ${className}`}>
    <motion.span
      className="block"
      initial={{ y: "115%" }}
      animate={{ y: 0 }}
      transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.span>
  </span>
);

function SkillCarousel() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % CAROUSEL_SKILLS.length), 2200);
    return () => clearInterval(t);
  }, []);
  return (
    <span data-testid="hero-skill-carousel" className="inline-flex items-baseline gap-3 font-mono text-xs uppercase tracking-[0.25em] text-zinc-500">
      Fluent in
      <span className="relative inline-block h-5 w-44 overflow-hidden text-left">
        <AnimatePresence mode="wait">
          <motion.span
            key={CAROUSEL_SKILLS[index]}
            initial={{ y: 18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -18, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 top-0 whitespace-nowrap font-serif text-base normal-case italic tracking-tight text-gold"
          >
            {CAROUSEL_SKILLS[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
}

export default function Hero() {
  return (
    <section id="home" data-testid="hero-section" className="relative flex min-h-screen flex-col overflow-hidden">
      {/* interactive 3D globe */}
      <motion.div
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, delay: 1.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-x-0 bottom-0 top-1/3 opacity-80 lg:inset-y-0 lg:left-1/2 lg:opacity-100"
      >
        <GlobeScene />
      </motion.div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,#050505_92%)] lg:bg-none" />

      <div className="pointer-events-none relative z-10 mx-auto flex w-full max-w-7xl flex-1 items-center px-6 pt-32 pb-40 lg:px-10 lg:pb-32">
        <div className="max-w-2xl">
          <MaskedLine delay={1.7}>
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.25em] text-gold">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />
              Open to Data Analyst roles
            </span>
          </MaskedLine>

          <h1 className="mt-8 font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-zinc-100">
            <MaskedLine delay={1.85}>Vikash Malviya</MaskedLine>
            <MaskedLine delay={2.0}>
              <span className="italic text-gold">Data Analyst</span>
            </MaskedLine>
          </h1>

          <MaskedLine delay={2.1} className="mt-6">
            <div className="h-px w-44 bg-gradient-to-r from-gold via-sky-400 to-transparent" />
          </MaskedLine>

          <MaskedLine delay={2.2} className="mt-5">
            <p className="max-w-xl text-base sm:text-lg leading-relaxed text-zinc-400">{profile.tagline}</p>
          </MaskedLine>

          <MaskedLine delay={2.3} className="mt-6">
            <SkillCarousel />
          </MaskedLine>

          <MaskedLine delay={2.35} className="mt-4">
            <p className="flex items-center gap-2 text-sm text-zinc-400">
              <MapPin size={14} className="text-gold" /> {profile.location}
            </p>
          </MaskedLine>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.55, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              data-testid="hero-resume-button"
              href={profile.resumeUrl}
              download="Vikash_Malviya_Resume.pdf"
              className="group inline-flex items-center gap-2.5 rounded-full bg-gold px-7 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-black transition-transform duration-300 hover:-translate-y-0.5 active:scale-[0.98]"
            >
              <FileDown size={15} className="transition-transform duration-300 group-hover:translate-y-0.5" />
              Download Resume
            </a>
            <a
              data-testid="hero-whatsapp-button"
              href={profile.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-7 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-zinc-200 backdrop-blur-xl transition-colors duration-300 hover:border-gold/60 hover:text-gold active:scale-[0.98]"
            >
              <MessageCircle size={15} /> WhatsApp Me
            </a>
          </motion.div>
        </div>
      </div>

      {/* floating glass action bar */}
      <motion.div
        data-testid="hero-action-bar"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 2.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-x-0 bottom-8 z-20 mx-auto w-fit max-w-[92vw]"
      >
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 rounded-full border border-white/10 bg-black/60 px-8 py-4 shadow-2xl shadow-black/60 backdrop-blur-2xl">
          <a data-testid="actionbar-email" href={`mailto:${profile.email}`} className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-300 transition-colors duration-300 hover:text-gold">
            <Mail size={14} className="text-gold" /> {profile.email}
          </a>
          <span className="hidden h-4 w-px bg-white/15 sm:block" />
          <a data-testid="actionbar-phone" href={profile.phoneHref} className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-300 transition-colors duration-300 hover:text-gold">
            {profile.phoneDisplay}
          </a>
        </div>
      </motion.div>
    </section>
  );
}
