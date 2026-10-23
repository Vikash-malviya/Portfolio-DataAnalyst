# PRD — Vikash Malviya · 3D Luxury-Dark Data Analyst Portfolio

## Original problem statement
"Build a responsive website with 3d Effects in Javascript dont USE Backend i share my Linkldn pdf and Resume PDF i want the 3d Avtar with the effective colour like luxury dark And SEO friendly with Githublink insta , linkldn, naukri , all also project section dashboard section A to Z email and phone whatspp click to open query"
+ Follow-up: "Also have image block on project section" (project cards carry large image blocks).

## User personas
- Recruiters/hiring managers for Data Analyst, Business Analyst, MIS Reporting roles (primary)
- Freelance clients looking for dashboard/reporting work (secondary)

## Core requirements (static)
- Responsive single-page portfolio, frontend-only (no backend calls)
- Interactive 3D avatar hero, luxury dark (obsidian + gold) aesthetic
- SEO-friendly (meta, OG/Twitter, JSON-LD, robots.txt, llms.txt)
- Sections: Hero, About, Skills, Projects (with image blocks), Dashboard, Experience/Journey, Contact
- One-tap contact: WhatsApp click-to-chat, mailto email, tel phone
- Social links: LinkedIn, GitHub, Instagram, Naukri
- Resume downloadable, stored as a swappable file

## Architecture
- React 19 + CRA (craco), Tailwind, framer-motion, lenis smooth scroll
- 3D: three.js + @react-three/fiber + @react-three/drei (procedural avatar — no external model deps)
- Charts: recharts (dashboard section, illustrative data)
- All content centralised in `/app/frontend/src/data/profile.js`
- Resume served from `/app/frontend/public/resume.pdf` (replace file to update)

## Implemented
- 2026-10-23: Initial build — intro overlay with masked reveal, 3D avatar hero (mouse-follow, orbiting data rings, particles), editorial marquee, About bento with portrait + stats, Skills with animated bars, Projects bento with image blocks, illustrative analytics Dashboard (KPIs + area/bar charts), Journey timeline, Contact footer with WhatsApp/email/call + LinkedIn/GitHub/Instagram/Naukri
- 2026-10-23: SEO set — title/description, OG/Twitter, Person JSON-LD, favicon.svg (VM gold mark), robots.txt with AI-crawler group, llms.txt, noscript fallback. Canonical/og:image/sitemap omitted until a production domain is confirmed.
- 2026-10-23: Mobile hero layering fix (avatar pushed below text on small screens)
- 2026-10-23: Replaced stock portrait with animated doodle avatar (blink/float/wave-on-hover); Instagram set to @_vikash__malviya___; marquee contrast fix for tablet
- 2026-10-23: About profile-pic slot now renders the same 3D anime-hero model (auto-rotating, drag-to-spin, gold horn added); doodle avatar removed; hero location line restyled to plain readable text per user feedback
- 2026-10-23: Hero globe upgraded to textured Earth (AI-generated golden-continents equirectangular texture /assets/earth-texture.png) with cyan pulsing marker on Rajasthan, warm gold + cool blue mixed lighting; skill logos fixed — Power BI/Excel are inline SVG marks (Microsoft brands absent from simple-icons CDN), python/jira/github served locally from /public/assets/logos/
- 2026-10-23: Removed floating mini-charts from globe; FIXED globe drag (hero text layer was swallowing pointer events — now pointer-events-none with interactive CTAs re-enabled); Saturn gained a 46-rock asteroid belt (gold + silver dodecahedrons orbiting beyond the rings)

## Pending / needs the user
- GitHub and Naukri URLs in `src/data/profile.js` are PLACEHOLDERS — replace with real profile URLs (Instagram confirmed: @_vikash__malviya___)
- Canonical URL, og:image, sitemap.xml — pending confirmed production domain (add at deploy/SEO activation)

## Backlog (prioritized)
- P0: User confirms real GitHub/Instagram/Naukri links
- P1: Real project screenshots/dashboard embeds (Power BI publish-to-web iframes)
- P1: Visitor query form (currently mailto/WhatsApp only — no backend by request)
- P2: Blog/case-study pages per project, per-route SEO
- P2: Dark-gold OG share image (1200×630) once domain confirmed
