import { motion } from "framer-motion";
import {
  Database, Eraser, Search, Gauge, TrendingUp, Sigma, FileBarChart, CheckCheck, Users,
  Zap, FunctionSquare, BarChart3, MessagesSquare, Puzzle, Presentation,
} from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";
import { skillGroups } from "../data/profile";

const SI = (slug) => `https://cdn.simpleicons.org/${slug}/EE2737`;

const tagIcons = {
  "Data Cleaning": Eraser,
  EDA: Search,
  "KPI Analysis": Gauge,
  "Trend Analysis": TrendingUp,
  "Statistical Analysis": Sigma,
  "MIS Reporting": FileBarChart,
  "Data Validation": CheckCheck,
  "Stakeholder Reporting": Users,
  "Power Query": Zap,
  DAX: FunctionSquare,
  Seaborn: BarChart3,
  Communication: MessagesSquare,
  "Problem Solving": Puzzle,
  Presentation: Presentation,
};
const tagSlugs = { Jira: "jira", "Git & GitHub": "github" };

export function SkillLogo({ slug, icon: Icon, size = 16, name }) {
  if (slug) {
    return (
      <img
        src={SI(slug)}
        alt={`${name} logo`}
        loading="lazy"
        width={size}
        height={size}
        className="shrink-0"
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />
    );
  }
  if (Icon) return <Icon size={size} className="shrink-0 text-gold" />;
  return (
    <svg viewBox="0 0 10 10" width={size * 0.6} height={size * 0.6} className="shrink-0 text-gold" aria-hidden="true">
      <path d="M5 0 L10 5 L5 10 L0 5 Z" fill="currentColor" />
    </svg>
  );
}

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
                    <div className="mb-2.5 flex items-center justify-between gap-4">
                      <span className="flex items-center gap-3 text-sm text-zinc-200">
                        <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                          <SkillLogo slug={s.slug} icon={s.icon === "db" ? Database : null} name={s.name} size={16} />
                        </span>
                        {s.name}
                      </span>
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
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs text-zinc-300 transition-colors duration-300 hover:border-gold/50 hover:text-gold"
                    >
                      <SkillLogo slug={tagSlugs[tag]} icon={tagIcons[tag]} name={tag} size={13} />
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
