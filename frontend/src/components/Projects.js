import { ArrowUpRight } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";
import { projects, profile } from "../data/profile";

export default function Projects() {
  return (
    <section id="projects" data-testid="projects-section" className="mx-auto max-w-7xl px-6 py-28 lg:px-10 lg:py-36">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          eyebrow="03 — Projects"
          title="Selected"
          accent="case studies."
          description="End-to-end analytics work — from raw transactional data to boardroom-ready insight."
        />
        <Reveal delay={0.1}>
          <a
            data-testid="projects-github-link"
            href={profile.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-300 transition-colors duration-300 hover:border-gold/60 hover:text-gold"
          >
            GitHub <ArrowUpRight size={14} />
          </a>
        </Reveal>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-12">
        {projects.map((p, i) => (
          <Reveal key={p.id} className={p.span} delay={0.08 + i * 0.07}>
            <article
              data-testid={`project-card-${p.id}`}
              className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl transition-colors duration-500 hover:border-gold/40"
            >
              <div className={`relative overflow-hidden ${p.span === "md:col-span-12" ? "h-64 sm:h-80" : "h-64"}`}>
                <img
                  src={p.image}
                  alt={p.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/30 to-transparent" />
                <span className="absolute left-6 top-6 rounded-full border border-gold/30 bg-black/60 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-gold backdrop-blur-xl">
                  {p.subtitle}
                </span>
              </div>
              <div className="p-8">
                <h3 className="font-serif text-xl sm:text-2xl tracking-tight text-zinc-100 transition-colors duration-300 group-hover:text-gold">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">{p.description}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="rounded-full border border-white/10 px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-zinc-400">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
