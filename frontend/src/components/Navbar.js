import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, FileDown } from "lucide-react";
import { profile } from "../data/profile";

const links = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Dashboard", href: "#dashboard" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
];

export const LogoMark = ({ className = "h-9 w-9" }) => (
  <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
    <rect x="2" y="2" width="44" height="44" rx="12" fill="#0A0A0C" stroke="#EE2737" strokeWidth="1.5" />
    <path d="M13 14 L24 35 L35 14" fill="none" stroke="#EE2737" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="24" cy="11" r="2" fill="#EE2737" />
  </svg>
);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-testid="main-navbar"
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-500 ${
        scrolled ? "border-white/10 bg-black/70 backdrop-blur-2xl" : "border-transparent bg-black/40 backdrop-blur-xl"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <a href="#home" data-testid="nav-logo" className="flex items-center gap-3">
          <LogoMark />
          <span className="font-serif text-lg tracking-tight text-zinc-100">
            Vikash <span className="italic text-gold">Malviya</span>
          </span>
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                data-testid={`nav-link-${l.label.toLowerCase()}`}
                href={l.href}
                className="font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-400 transition-colors duration-300 hover:text-gold"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            data-testid="nav-resume-button"
            href={profile.resumeUrl}
            download="Vikash_Malviya_Resume.pdf"
            className="hidden items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-5 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-gold transition-colors duration-300 hover:bg-gold hover:text-black sm:flex"
          >
            <FileDown size={14} /> Resume
          </a>
          <button
            data-testid="nav-mobile-toggle"
            onClick={() => setOpen((v) => !v)}
            className="text-zinc-200 lg:hidden"
            aria-label="Toggle navigation menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-white/10 bg-black/90 backdrop-blur-2xl lg:hidden"
          >
            <ul className="space-y-1 px-6 py-6">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    data-testid={`nav-mobile-link-${l.label.toLowerCase()}`}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block py-2 font-mono text-xs uppercase tracking-[0.25em] text-zinc-300 transition-colors duration-300 hover:text-gold"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  data-testid="nav-mobile-resume-button"
                  href={profile.resumeUrl}
                  download="Vikash_Malviya_Resume.pdf"
                  className="mt-3 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-5 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-gold"
                >
                  <FileDown size={14} /> Resume
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
