# Impression Labz — CLAUDE.md

Project context and conventions for Claude Code sessions.

## Project Overview

**Impression Labz** — AI solutions & agent enablement firm, based in California.
Site: `https://impressionlabz.com` | Contact: `theo@impressionlabz.com`

Single-page Next.js marketing site with sections: Hero → Products → Solutions → Case Studies → Trust → Pricing → Get Started → Footer.

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js (App Router, `app/` dir) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + CSS custom properties |
| Animation | Framer Motion |
| Icons | Lucide React |
| Fonts | Lexend (body) + Lexend Deca (headings) via `next/font/google` |
| Deploy | Vercel (native Next.js, no `output:export`) |

## Key Files

```
app/
  layout.tsx      — Root layout, fonts, metadata, JSON-LD schema
  page.tsx        — Entire single-page app (~900 lines)
  globals.css     — Design tokens (CSS vars) + utility classes
public/
  2125.html       — Standalone cyberpunk artifact page
  llms.txt        — LLM-readable site description
```

## Design System

### Color Tokens (in `globals.css :root`)

```css
--bg: #050510           /* Near-black space */
--surface: #0a0a1e      /* Card background */
--surface-2: #0f0f28    /* Raised surface */
--surface-3: #15153a    /* Highest elevation */
--border: rgba(99,102,241,0.15)
--border-bright: rgba(99,102,241,0.45)
--text: #e8eaf6
--text-muted: #6e7a9e
--text-dim: #363d5c
--accent: #6366f1       /* Indigo — primary CTAs */
--accent-hover: #818cf8
--cyan: #22d3ee         /* Metric numbers, cursor, highlights */
--violet: #a78bfa       /* Gradient mid-stop */
--green: #34d399        /* Live status dot */
--glow: rgba(99,102,241,0.22)
--glow-sm: rgba(99,102,241,0.1)
--glow-cyan: rgba(34,211,238,0.15)
```

### CSS Utility Classes

| Class | Purpose |
|-------|---------|
| `.grid-bg` | 64px indigo grid lines |
| `.card` | Surface card, 16px radius |
| `.card-lg` | Large card, 24px radius |
| `.card-hover` | Hover: indigo border glow + bg lift |
| `.gradient-text` | Indigo→violet→cyan text gradient |
| `.btn-ghost` | Ghost button (border only, hover glow) |
| `.hover-lift` | translateY(-4px) on hover |
| `.orb-1/2/3` | Floating gradient blob animations |
| `.dot-pulse` | Live status dot pulse |
| `.form-input` | Styled input with focus ring |
| `.cursor` | Typewriter cursor (cyan blink) |

### Typography

- **Headings**: `font-space` (Lexend Deca), `letter-spacing: -0.025em`
- **Body**: `font-inter` (Lexend)
- **Labels/mono bits**: `font-mono` system monospace
- **Gradient text**: `.gradient-text` class
- **Typewriter**: `<Typewriter words={[...]} />` component (in page.tsx)

### Button Conventions

```jsx
// Primary CTA
style={{
  background: "linear-gradient(135deg, #6366f1, #818cf8)",
  color: "#fff",
  boxShadow: "0 0 28px rgba(99,102,241,0.35)",
}}

// Ghost / secondary
className="btn-ghost"
```

### Section Label Convention

```jsx
<Label>Section Name</Label>
// Renders: cyan vertical bar + indigo monospace text
```

## Component Architecture

All components are co-located in `app/page.tsx`:

- `Reveal` — Scroll-triggered fade-up via Framer Motion + useInView
- `Typewriter` — Character-by-character typing effect with gradient text
- `Label` — Section eyebrow with cyan bar + monospace
- `Nav` — Sticky navbar, blur on scroll, mobile menu
- `Hero` — Full-screen: grid bg + floating orbs + typewriter + metrics
- `PainBanner` — Infinite scroll ticker with fade edges
- `Products` — 4-tab product showcase (2×2 mobile / row desktop)
- `Solutions` — Role-based use case cards
- `CaseStudies` — 3-column case study cards
- `TrustBar` — 6-icon trust indicators
- `Pricing` — 3-plan pricing with highlighted "Growth" plan
- `GetStarted` — 4-step quiz + contact form
- `Footer` — 4-column footer

## Conventions & Rules

1. **No new dependencies** without user approval — keep bundle lean
2. **CSS vars for all colors** — never hardcode hex values outside of `--accent` button gradients
3. **Framer Motion for all enter animations** — use `<Reveal>` wrapper
4. **Inline styles for dynamic/computed values**, Tailwind for layout/spacing
5. **Never add `output:export`** — Vercel handles Next.js natively
6. **Font mono for technical labels** — eyebrow labels, form hints, monospace accents
7. **Cyan (`var(--cyan)`) for metrics/numbers**, Indigo (`var(--accent)`) for CTAs
8. **White (`#fff`) text on all colored/gradient buttons** (not dark text)
9. **Glow via `box-shadow`** — `0 0 Xpx rgba(99,102,241,Y)` pattern
10. **Max container widths**: `max-w-4xl` (hero/form), `max-w-5xl` (sections)

## Products Data

| Product | Icon | Badge |
|---------|------|-------|
| AgentOS | Bot | Most Popular |
| DataMind | Database | New |
| AutoFlow | Zap | — |
| InsightPulse | BarChart3 | — |

## Pricing Plans

| Plan | Price | Highlight |
|------|-------|-----------|
| AI Pilot | $15K one-time | No |
| Growth | $8K/month | **Yes** |
| Enterprise | Custom | No |

## Git / Deploy

- **Branch**: `claude/sad-wright` (worktree)
- **Main branch**: `master`
- **Deploy**: Vercel auto-deploys from `master`
- Push to `master` only with explicit user confirmation
