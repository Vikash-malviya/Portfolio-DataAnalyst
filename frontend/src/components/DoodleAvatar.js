import { motion } from "framer-motion";

const INK = "#F5F5F7";
const GOLD = "#D4AF37";

export default function DoodleAvatar() {
  return (
    <motion.div
      data-testid="about-doodle-avatar"
      className="relative flex h-full min-h-[420px] items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-[#0A0A0C]"
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      {/* speech bubble on hover */}
      <motion.div
        variants={{ rest: { opacity: 0, y: 8, scale: 0.9 }, hover: { opacity: 1, y: 0, scale: 1 } }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="absolute right-6 top-8 z-10 rounded-2xl rounded-br-sm border border-gold/40 bg-black/70 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-gold backdrop-blur-xl"
      >
        Let's talk data!
      </motion.div>

      <motion.svg
        viewBox="0 0 400 480"
        className="h-[85%] w-auto max-w-full"
        animate={{ y: [0, -9, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        role="img"
        aria-label="Hand-drawn doodle avatar of Vikash Malviya with glasses and a laptop showing a bar chart"
      >
        {/* floating bar-chart doodle */}
        <motion.g
          stroke={GOLD}
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          animate={{ y: [0, -7, 0], rotate: [0, 4, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <path d="M40 110 L40 150 L82 150" />
          <path d="M50 150 L50 132" />
          <path d="M60 150 L60 120" />
          <path d="M70 150 L70 138" />
        </motion.g>

        {/* floating pie doodle */}
        <motion.g
          stroke={GOLD}
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          animate={{ y: [0, 8, 0], rotate: [0, -6, 0] }}
          transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
        >
          <circle cx="342" cy="96" r="22" />
          <path d="M342 96 L342 74" />
          <path d="M342 96 L360 106" />
        </motion.g>

        {/* floating % doodle */}
        <motion.g
          stroke={GOLD}
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 1.1 }}
        >
          <circle cx="330" cy="196" r="5" />
          <circle cx="352" cy="176" r="5" />
          <path d="M328 178 L356 196" />
        </motion.g>

        <motion.g
          variants={{ rest: { rotate: 0 }, hover: { rotate: -2.5 } }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{ originX: "200px", originY: "300px" }}
        >
          {/* body / shirt */}
          <path
            d="M104 452 C106 368 128 322 200 318 C272 322 296 368 298 452"
            stroke={INK}
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
          {/* collar */}
          <path d="M178 322 L200 344 L224 322" stroke={GOLD} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />

          {/* waving arm */}
          <motion.g
            variants={{ rest: { rotate: 0 }, hover: { rotate: [0, -18, 8, -14, 0] } }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            style={{ originX: "292px", originY: "352px" }}
          >
            <path d="M292 352 C318 340 332 320 336 296" stroke={INK} strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M336 296 C334 286 340 278 348 280 C356 282 358 292 352 300 C348 306 340 304 336 296 Z" stroke={INK} strokeWidth="3.5" fill="none" />
            <path d="M348 276 L350 268 M356 280 L360 272" stroke={GOLD} strokeWidth="3" strokeLinecap="round" />
          </motion.g>

          {/* head — deliberately imperfect hand-drawn line */}
          <path
            d="M118 168 C110 104 154 62 202 64 C252 62 292 106 284 168 C292 228 250 268 200 268 C148 268 110 226 118 168 Z"
            stroke={INK}
            strokeWidth="4"
            strokeLinecap="round"
            fill="#0A0A0C"
          />
          {/* hair */}
          <path d="M124 138 C126 92 164 58 202 60 C244 58 280 94 280 140 C268 116 258 112 250 96 C244 114 228 108 220 96 C212 112 190 112 182 98 C172 114 150 110 144 100 C136 116 128 122 124 138 Z" stroke={INK} strokeWidth="3.5" fill="none" strokeLinecap="round" />

          {/* glasses */}
          <g stroke={GOLD} strokeWidth="3" fill="none">
            <circle cx="168" cy="166" r="27" />
            <circle cx="238" cy="166" r="27" />
            <path d="M195 166 C198 160 206 160 211 166" />
            <path d="M141 162 C132 158 126 156 120 156" />
            <path d="M265 162 C274 158 280 156 284 156" />
          </g>

          {/* eyes — blink */}
          <motion.circle
            cx="168"
            cy="168"
            r="4.5"
            fill={INK}
            animate={{ scaleY: [1, 1, 0.12, 1, 1] }}
            transition={{ duration: 4.2, times: [0, 0.88, 0.93, 0.98, 1], repeat: Infinity }}
            style={{ originX: "168px", originY: "168px" }}
          />
          <motion.circle
            cx="238"
            cy="168"
            r="4.5"
            fill={INK}
            animate={{ scaleY: [1, 1, 0.12, 1, 1] }}
            transition={{ duration: 4.2, times: [0, 0.88, 0.93, 0.98, 1], repeat: Infinity }}
            style={{ originX: "238px", originY: "168px" }}
          />

          {/* brows */}
          <path d="M154 142 C160 137 172 137 180 141" stroke={INK} strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M226 141 C234 137 246 137 252 142" stroke={INK} strokeWidth="3" strokeLinecap="round" fill="none" />

          {/* nose + smile */}
          <path d="M201 180 C200 190 198 196 195 200" stroke={INK} strokeWidth="3" strokeLinecap="round" fill="none" />
          <motion.path
            d="M180 220 Q202 238 224 220"
            stroke={INK}
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
            variants={{ rest: { scale: 1 }, hover: { scale: 1.12 } }}
            style={{ originX: "202px", originY: "224px" }}
          />

          {/* laptop with chart */}
          <g>
            <path d="M138 452 L138 402 C138 396 142 392 148 392 L252 392 C258 392 262 396 262 402 L262 452" stroke={INK} strokeWidth="4" strokeLinecap="round" fill="#0A0A0C" />
            <path d="M120 452 L280 452" stroke={INK} strokeWidth="4" strokeLinecap="round" />
            <path d="M152 436 L152 420 M164 436 L164 410 M176 436 L176 426 M188 436 L188 404" stroke={GOLD} strokeWidth="3.5" strokeLinecap="round" />
            <path d="M148 438 L196 438" stroke={GOLD} strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
          </g>
        </motion.g>
      </motion.svg>

      {/* soft gold glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-[100px]" />
    </motion.div>
  );
}
