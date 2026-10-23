import { useState } from "react";
import { MessageCircle, Mail, Send } from "lucide-react";
import { Reveal } from "./Reveal";
import { profile } from "../data/profile";

const initial = { name: "", email: "", message: "" };

export default function QueryForm() {
  const [form, setForm] = useState(initial);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
  const valid = form.name.trim() && form.message.trim();

  const body = `Hi Vikash, I'm ${form.name.trim()}${form.email.trim() ? ` (${form.email.trim()})` : ""}.\n\n${form.message.trim()}`;
  const whatsappHref = `https://wa.me/919929691872?text=${encodeURIComponent(body)}`;
  const emailHref = `mailto:${profile.email}?subject=${encodeURIComponent(
    `Portfolio enquiry from ${form.name.trim() || "a visitor"}`,
  )}&body=${encodeURIComponent(body)}`;

  const inputCls =
    "w-full rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3.5 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none transition-colors duration-300 focus:border-gold/60";

  return (
    <Reveal delay={0.15} className="mx-auto mt-16 max-w-3xl">
      <form
        data-testid="query-form"
        onSubmit={(e) => e.preventDefault()}
        className="rounded-3xl border border-white/10 bg-black/50 p-8 backdrop-blur-xl sm:p-10"
      >
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-gold">Send an enquiry</p>
        <h3 className="mt-3 font-serif text-2xl tracking-tight text-zinc-100">
          Write once — it lands in my <span className="italic text-gold">WhatsApp or inbox.</span>
        </h3>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <input
            data-testid="query-form-name"
            type="text"
            required
            placeholder="Your name"
            value={form.name}
            onChange={set("name")}
            className={inputCls}
          />
          <input
            data-testid="query-form-email"
            type="email"
            placeholder="Your email (optional)"
            value={form.email}
            onChange={set("email")}
            className={inputCls}
          />
        </div>
        <textarea
          data-testid="query-form-message"
          required
          rows={4}
          placeholder="Tell me about the role or project..."
          value={form.message}
          onChange={set("message")}
          className={`${inputCls} mt-4 resize-none`}
        />

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            data-testid="query-form-send-whatsapp"
            href={valid ? whatsappHref : undefined}
            target="_blank"
            rel="noopener noreferrer"
            aria-disabled={!valid}
            className={`inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 font-mono text-xs uppercase tracking-[0.18em] transition-all duration-300 ${
              valid
                ? "bg-gold text-black hover:-translate-y-0.5 active:scale-[0.98]"
                : "cursor-not-allowed bg-white/5 text-zinc-600"
            }`}
          >
            <MessageCircle size={15} /> Send via WhatsApp
          </a>
          <a
            data-testid="query-form-send-email"
            href={valid ? emailHref : undefined}
            aria-disabled={!valid}
            className={`inline-flex items-center gap-2.5 rounded-full border px-7 py-3.5 font-mono text-xs uppercase tracking-[0.18em] transition-colors duration-300 ${
              valid
                ? "border-white/15 bg-white/5 text-zinc-200 hover:border-gold/60 hover:text-gold active:scale-[0.98]"
                : "cursor-not-allowed border-white/5 text-zinc-600"
            }`}
          >
            <Send size={14} /> Send via Email
          </a>
        </div>
        <p className="mt-4 flex items-center gap-2 text-xs text-zinc-600">
          <Mail size={12} className="text-gold/60" /> No servers involved — your message opens directly in your WhatsApp or mail app.
        </p>
      </form>
    </Reveal>
  );
}
