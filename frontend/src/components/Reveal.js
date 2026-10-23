import { motion } from "framer-motion";

export const Reveal = ({ children, delay = 0, className = "", y = 28 }) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-70px" }}
    transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

export const SectionHeading = ({ eyebrow, title, accent, description, align = "left" }) => (
  <Reveal className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
    <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold">{eyebrow}</p>
    <h2 className="mt-4 font-serif text-3xl sm:text-4xl tracking-tight text-zinc-100">
      {title} {accent && <span className="italic text-gold">{accent}</span>}
    </h2>
    {description && <p className="mt-5 text-base leading-relaxed text-zinc-400">{description}</p>}
  </Reveal>
);
