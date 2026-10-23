import { Reveal, SectionHeading } from "./Reveal";
import { timeline } from "../data/profile";

export default function Experience() {
  return (
    <section id="journey" data-testid="journey-section" className="mx-auto max-w-7xl px-6 py-28 lg:px-10 lg:py-36">
      <SectionHeading
        eyebrow="05 — Journey"
        title="The road"
        accent="so far."
        description="From classrooms in Jaipur to the shop floor of a working business — every step measured in data."
      />

      <div className="relative mt-20">
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-gold/60 via-white/10 to-transparent md:left-1/2" />
        <div className="space-y-14">
          {timeline.map((t, i) => (
            <Reveal key={t.title} delay={0.08 * i}>
              <div className={`relative flex flex-col gap-6 pl-10 md:w-1/2 md:pl-0 ${i % 2 === 0 ? "md:pr-14 md:text-right" : "md:ml-auto md:pl-14"}`}>
                <span
                  className={`absolute top-2 h-[15px] w-[15px] rounded-full border-2 border-gold bg-[#050505] left-0 ${
                    i % 2 === 0 ? "md:left-auto md:-right-[7.5px]" : "md:-left-[7.5px]"
                  }`}
                />
                <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold">{t.period}</p>
                <div>
                  <h3 className="font-serif text-2xl tracking-tight text-zinc-100">{t.title}</h3>
                  <p className="mt-1 text-sm text-zinc-500">{t.org}</p>
                </div>
                <ul className={`space-y-2 text-sm leading-relaxed text-zinc-400 ${i % 2 === 0 ? "md:ml-auto" : ""}`}>
                  {t.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
