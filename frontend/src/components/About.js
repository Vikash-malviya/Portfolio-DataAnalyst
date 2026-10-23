import { motion } from "framer-motion";
import { GraduationCap, MapPin, Sparkles, Award } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";
import { profile, stats } from "../data/profile";

const PORTRAIT =
  "https://images.pexels.com/photos/20502925/pexels-photo-20502925.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";

const Counter = ({ value, suffix }) => (
  <motion.span
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    className="font-serif text-4xl text-gold"
  >
    {value.toLocaleString("en-IN")}
    {suffix}
  </motion.span>
);

export default function About() {
  return (
    <section id="about" data-testid="about-section" className="relative mx-auto max-w-7xl px-6 py-28 lg:px-10 lg:py-36">
      <SectionHeading
        eyebrow="01 — About"
        title="Numbers, nuance &"
        accent="narrative."
        description="BCA graduate focused on Data Analytics and Business Intelligence — hands-on with SQL, Power BI, Advanced Excel and Python for cleaning, analysing and visualising data into reports that support real business decisions."
      />

      <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-12">
        <Reveal className="md:col-span-5" delay={0.05}>
          <div className="group relative h-full overflow-hidden rounded-3xl border border-white/10">
            <img
              src={PORTRAIT}
              alt="Moody portrait representing Vikash Malviya, data analyst from Rajasthan"
              loading="lazy"
              className="h-full min-h-[420px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-center gap-3 rounded-2xl border border-white/10 bg-black/60 px-5 py-4 backdrop-blur-xl">
              <MapPin size={16} className="shrink-0 text-gold" />
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-300">{profile.location}</p>
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:col-span-7">
          <Reveal delay={0.1} className="sm:col-span-2">
            <div className="h-full rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl">
              <Sparkles size={20} className="text-gold" />
              <p className="mt-4 text-base leading-relaxed text-zinc-300">
                I build interactive Power BI dashboards, SQL-based analyses and Excel reports that identify trends,
                track KPIs and uncover insights. Currently strengthening my craft through real-world analytics projects
                and the Google Data Analytics curriculum — with a strong interest in Data Analyst, BI and Reporting roles.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="h-full rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl transition-colors duration-300 hover:border-gold/30">
              <GraduationCap size={20} className="text-gold" />
              <h3 className="mt-4 font-serif text-xl text-zinc-100">BCA — Data Analytics</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">Manipal University Jaipur · 2023 — 2026</p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="h-full rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl transition-colors duration-300 hover:border-gold/30">
              <Award size={20} className="text-gold" />
              <h3 className="mt-4 font-serif text-xl text-zinc-100">Certified</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">Tata · Deloitte · HP LIFE · IBM job simulations & certificates</p>
            </div>
          </Reveal>

          {stats.map((s, i) => (
            <Reveal key={s.label} delay={0.1 + i * 0.06} className="sm:col-span-1">
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 text-center backdrop-blur-xl">
                <Counter value={s.value} suffix={s.suffix} />
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
