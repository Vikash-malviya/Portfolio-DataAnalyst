import { MessageCircle, Mail, Phone, Linkedin, Github, Instagram, Briefcase, ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { LogoMark } from "./Navbar";
import QueryForm from "./QueryForm";
import { profile } from "../data/profile";

const channels = [
  { id: "whatsapp", icon: MessageCircle, label: "WhatsApp", value: profile.phoneDisplay, href: profile.whatsapp, external: true },
  { id: "email", icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}`, external: false },
  { id: "phone", icon: Phone, label: "Call", value: profile.phoneDisplay, href: profile.phoneHref, external: false },
];

const socials = [
  { id: "linkedin", icon: Linkedin, label: "LinkedIn", href: profile.socials.linkedin },
  { id: "github", icon: Github, label: "GitHub", href: profile.socials.github },
  { id: "instagram", icon: Instagram, label: "Instagram", href: profile.socials.instagram },
  { id: "naukri", icon: Briefcase, label: "Naukri", href: profile.socials.naukri },
];

export default function Contact() {
  return (
    <footer id="contact" data-testid="contact-section" className="relative overflow-hidden border-t border-white/10 bg-[#0A0A0C] pt-28 pb-12 lg:pt-36">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[42rem] -translate-x-1/2 rounded-full bg-gold/10 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="text-center">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold">06 — Contact</p>
          <h2 className="mx-auto mt-6 max-w-4xl font-serif text-5xl sm:text-6xl lg:text-7xl leading-[1.02] tracking-tight text-zinc-100">
            Let's turn data into <span className="italic text-gold">decisions.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-zinc-400">
            Hiring for a Data Analyst, Business Analyst or MIS Reporting role? My inbox — and my WhatsApp — is one tap away.
          </p>
        </Reveal>

        <QueryForm />

        <div className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3">
          {channels.map((c, i) => (
            <Reveal key={c.id} delay={0.08 + i * 0.07}>
              <a
                data-testid={`contact-${c.id}-button`}
                href={c.href}
                {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group flex h-full flex-col items-center gap-3 rounded-3xl border border-white/10 bg-black/50 px-6 py-8 backdrop-blur-xl transition-colors duration-300 hover:border-gold/50"
              >
                <c.icon size={22} className="text-gold" />
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">{c.label}</span>
                <span className="break-all text-center text-sm text-zinc-200 transition-colors duration-300 group-hover:text-gold">{c.value}</span>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.25} className="mt-10">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {socials.map((s) => (
              <a
                key={s.id}
                data-testid={`social-${s.id}-link`}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-300 transition-colors duration-300 hover:border-gold/60 hover:text-gold"
              >
                <s.icon size={15} />
                {s.label}
                <ArrowUpRight size={13} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            ))}
          </div>
        </Reveal>

        <div className="mt-24 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-10 sm:flex-row">
          <a href="#home" data-testid="footer-logo" className="flex items-center gap-3">
            <LogoMark className="h-8 w-8" />
            <span className="font-serif text-base text-zinc-300">
              Vikash <span className="italic text-gold">Malviya</span>
            </span>
          </a>
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-600">
            © 2026 · Sojat, Rajasthan · Crafted with data & gold
          </p>
        </div>
      </div>
    </footer>
  );
}
