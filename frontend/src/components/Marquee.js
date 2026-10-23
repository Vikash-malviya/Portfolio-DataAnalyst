import { marqueeItems } from "../data/profile";

export default function Marquee() {
  const row = [...marqueeItems, ...marqueeItems];
  return (
    <div data-testid="editorial-marquee" className="relative overflow-hidden border-y border-white/10 bg-[#0A0A0C] py-6">
      <div className="animate-marquee flex w-max items-center">
        {row.map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="px-8 font-serif text-2xl sm:text-3xl italic tracking-tight text-zinc-500">{item}</span>
            <svg viewBox="0 0 10 10" className="h-2.5 w-2.5 text-gold" aria-hidden="true">
              <path d="M5 0 L10 5 L5 10 L0 5 Z" fill="currentColor" />
            </svg>
          </span>
        ))}
      </div>
    </div>
  );
}
