import { motion } from "framer-motion";
import { Reveal, SectionHeading } from "./Reveal";
import { skillGroups } from "../data/profile";

export default function Skills() {
  return (
    <section id="skills" data-testid="skills-section" className="relative bg-[#0A0A0C] py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="02 — Skills"
          title="The analyst's"
          accent="instrument panel."
          description="A toolkit sharpened on real operational data — from sales-order tracking to predictive modelling."
        />

        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-6" delay={0.05}>
            <div className="h-full rounded-3xl border border-white/10 bg-black/40 p-8 backdrop-blur-xl sm:p-10">
              <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-gold">{skillGroups[0].title}</h3>
              <div className="mt-8 space-y-7">
                {skillGroups[0].skills.map((s, i) => (
                  <div key={s.name} data-testid={`skill-bar-${i}`}>
                    <div className="mb-2.5 flex items-baseline justify-between gap-4">
                      <span className="text-sm text-zinc-200">{s.name}</span>
                      <span className="font-mono text-xs text-gold">{s.level}%</span>
                    </div>
                    <div className="h-[3px] w-full overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${s.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                        className="h-full rounded-full bg-gold"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {skillGroups.slice(1).map((group, gi) => (
            <Reveal key={group.title} className="lg:col-span-3" delay={0.12 + gi * 0.08}>
              <div className="h-full rounded-3xl border border-white/10 bg-black/40 p-8 backdrop-blur-xl transition-colors duration-300 hover:border-gold/30">
                <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-gold">{group.title}</h3>
                <div className="mt-7 flex flex-wrap gap-2.5">
                  {group.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs text-zinc-300 transition-colors duration-300 hover:border-gold/50 hover:text-gold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
