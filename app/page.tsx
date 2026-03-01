"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Bot, Zap, BarChart3, ArrowRight, Github, Mail,
  ChevronDown, CheckCircle2, Menu, X, ExternalLink,
  Clock, TrendingUp, Shield, Star, ChevronRight,
  Database, Globe, Play, Calendar, Users, Linkedin
} from "lucide-react";

// ─── Utilities ────────────────────────────────────────────────────────────────

function Reveal({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}>
      {children}
    </motion.div>
  );
}

function Typewriter({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  const [sub, setSub] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const cur = words[index];
    if (!del && sub === cur.length) { setTimeout(() => setDel(true), 2400); return; }
    if (del && sub === 0) { setDel(false); setIndex(i => (i + 1) % words.length); return; }
    const t = setTimeout(() => setSub(s => s + (del ? -1 : 1)), del ? 40 : 85);
    return () => clearTimeout(t);
  }, [sub, del, index, words]);
  return (
    <span>
      <span className="gradient-text">{words[index].substring(0, sub)}</span>
      <span className="cursor" />
    </span>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2.5 mb-5">
      <span className="w-0.5 h-4 rounded-full" style={{ background: "var(--cyan)", opacity: 0.9 }} />
      <p className="text-xs font-semibold tracking-[0.15em] uppercase font-mono"
        style={{ color: "var(--accent)" }}>
        {children}
      </p>
    </div>
  );
}

// ─── Nav ──────────────────────────────────────────────────────────────────────

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav aria-label="Main navigation"
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(5,5,16,0.94)" : "transparent",
        backdropFilter: scrolled ? "blur(24px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(99,102,241,0.12)" : "none",
        paddingTop: scrolled ? "14px" : "20px",
        paddingBottom: scrolled ? "14px" : "20px",
      }}>
      <div className="max-w-5xl mx-auto px-8 md:px-14 flex items-center justify-between">

        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
            style={{
              background: "linear-gradient(135deg, #6366f1, #818cf8)",
              boxShadow: "0 0 16px rgba(99,102,241,0.35)",
              color: "#fff",
            }}>
            IL
          </div>
          <span className="font-space font-semibold" style={{ color: "var(--text)" }}>
            Impression <span style={{ color: "var(--accent)" }}>Labz</span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8 text-sm" style={{ color: "var(--text-muted)" }}>
          {["Products", "Solutions", "Pricing", "Work"].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`}
              className="hover:text-[var(--text)] transition-colors">
              {item}
            </a>
          ))}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <a href="#get-started" className="text-sm px-4 py-2 transition-colors"
            style={{ color: "var(--text-muted)" }}>
            Contact
          </a>
          <a href="#get-started"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all"
            style={{
              background: "linear-gradient(135deg, #6366f1, #818cf8)",
              color: "#fff",
              boxShadow: "0 0 20px rgba(99,102,241,0.3)",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 0 32px rgba(99,102,241,0.5)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(99,102,241,0.3)"; }}>
            Book a Demo <Calendar size={13} />
          </a>
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden p-1" style={{ color: "var(--text-muted)" }}
          onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden px-5 py-6 flex flex-col gap-5"
            style={{ background: "var(--surface)", borderTop: "1px solid var(--border)" }}>
            {["Products", "Solutions", "Pricing", "Work"].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`}
                className="text-base transition-colors" style={{ color: "var(--text-muted)" }}
                onClick={() => setOpen(false)}>{item}</a>
            ))}
            <a href="#get-started"
              className="mt-2 text-center py-3 rounded-full font-semibold text-sm"
              style={{
                background: "linear-gradient(135deg, #6366f1, #818cf8)",
                color: "#fff",
                boxShadow: "0 0 20px rgba(99,102,241,0.25)",
              }}>
              Book a Demo
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

const metrics = [
  { value: "10x", label: "Faster than building in-house" },
  { value: "$2M+", label: "Average annual savings per client" },
  { value: "40+", label: "Production AI systems shipped" },
  { value: "99%", label: "Client retention rate" },
];

function Hero() {
  return (
    <section aria-label="Hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* Grid */}
      <div className="absolute inset-0 grid-bg" />

      {/* Radial vignette over grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 80% 60% at 50% 40%, transparent 30%, rgba(5,5,16,0.85) 100%)"
      }} />

      {/* Floating orbs */}
      <div className="orb-1 absolute pointer-events-none" style={{
        top: "-15%", left: "10%", width: "52vw", height: "52vw",
        background: "radial-gradient(circle, rgba(99,102,241,0.16) 0%, transparent 65%)",
        filter: "blur(80px)",
      }} />
      <div className="orb-2 absolute pointer-events-none" style={{
        top: "25%", right: "-8%", width: "38vw", height: "38vw",
        background: "radial-gradient(circle, rgba(34,211,238,0.1) 0%, transparent 65%)",
        filter: "blur(80px)",
      }} />
      <div className="orb-3 absolute pointer-events-none" style={{
        bottom: "0", left: "-8%", width: "42vw", height: "42vw",
        background: "radial-gradient(circle, rgba(167,139,250,0.09) 0%, transparent 65%)",
        filter: "blur(80px)",
      }} />

      <div className="relative z-10 max-w-4xl mx-auto px-8 md:px-14 text-center pt-36 pb-24">

        {/* Live badge */}
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-medium mb-10"
          style={{
            background: "rgba(99,102,241,0.08)",
            border: "1px solid rgba(99,102,241,0.25)",
            color: "var(--text-muted)",
          }}>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full dot-pulse" style={{ background: "var(--green)" }} />
            <span className="font-mono text-[10px] font-bold" style={{ color: "var(--green)" }}>LIVE</span>
          </span>
          <span style={{ color: "rgba(99,102,241,0.4)" }}>·</span>
          California's AI solutions firm · Built on OpenClaw
        </motion.div>

        {/* Headline */}
        <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl font-space font-bold mb-8"
          style={{ lineHeight: 1.1 }}>
          Your enterprise runs on
          <br />
          <span className="block mt-3">
            <Typewriter words={["outdated software.", "manual processes.", "missed opportunities.", "human bottlenecks."]} />
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}
          className="text-lg md:text-xl max-w-2xl mx-auto mb-3 leading-relaxed"
          style={{ color: "var(--text-muted)" }}>
          We fix that. Impression Labz deploys production-ready AI agents that eliminate
          bottlenecks, cut costs, and compound over time.
        </motion.p>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          className="text-sm mb-12 font-mono" style={{ color: "var(--text-dim)" }}>
          // No R&D overhead. No 18-month roadmaps. Just working AI, fast.
        </motion.p>

        {/* CTAs */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
          className="flex items-center justify-center gap-4 flex-wrap mb-24">
          <a href="#get-started"
            className="flex items-center gap-2.5 px-8 py-4 rounded-full font-semibold text-base transition-all"
            style={{
              background: "linear-gradient(135deg, #6366f1, #818cf8)",
              color: "#fff",
              boxShadow: "0 0 28px rgba(99,102,241,0.35)",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 0 48px rgba(99,102,241,0.55)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 0 28px rgba(99,102,241,0.35)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}>
            Book a Free Strategy Call <Calendar size={16} />
          </a>
          <a href="#products"
            className="flex items-center gap-2.5 px-8 py-4 rounded-full font-semibold text-base btn-ghost transition-all">
            <Play size={14} /> See Products
          </a>
        </motion.div>

        {/* Metrics */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {metrics.map(m => (
            <div key={m.label} className="card p-6 md:p-8 text-left relative overflow-hidden">
              {/* Corner accent */}
              <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none" style={{
                background: "radial-gradient(circle at 0% 0%, rgba(99,102,241,0.15), transparent 70%)"
              }} />
              <div className="text-3xl md:text-4xl font-space font-black mb-2" style={{
                color: "var(--cyan)",
                textShadow: "0 0 20px rgba(34,211,238,0.35)",
              }}>{m.value}</div>
              <div className="text-xs leading-snug" style={{ color: "var(--text-dim)" }}>{m.label}</div>
            </div>
          ))}
        </motion.div>

        <motion.div animate={{ y: [0, 7, 0] }} transition={{ repeat: Infinity, duration: 2.4 }}
          className="mt-20 flex justify-center" style={{ color: "var(--text-dim)" }}>
          <ChevronDown size={20} />
        </motion.div>
      </div>
    </section>
  );
}

// ─── Pain Banner ──────────────────────────────────────────────────────────────

const pains = [
  "Repetitive manual processes killing productivity?",
  "Customer support overwhelmed and expensive?",
  "Data siloed across a dozen tools?",
  "Competitors moving faster with AI?",
  "Engineering team too busy to build AI?",
  "Can't justify AI ROI to your board?",
];

function PainBanner() {
  return (
    <div className="py-5 overflow-hidden relative"
      style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
      {/* Fade edges */}
      <div className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, var(--bg), transparent)" }} />
      <div className="absolute inset-y-0 right-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, var(--bg), transparent)" }} />

      <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="flex gap-16 whitespace-nowrap">
        {[...pains, ...pains].map((p, i) => (
          <span key={i} className="text-sm flex items-center gap-3 font-mono"
            style={{ color: "var(--text-muted)" }}>
            <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: "var(--cyan)" }} />
            {p}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ─── Products ─────────────────────────────────────────────────────────────────

const products = [
  {
    icon: Bot, name: "AgentOS", tagline: "Your AI workforce, managed.", badge: "Most Popular",
    desc: "Deploy, coordinate, and monitor a fleet of AI agents across your entire organization. AgentOS gives you a unified control plane for every automated workflow — from customer service to internal ops.",
    features: ["Multi-agent orchestration via OpenClaw", "Real-time monitoring & alerting dashboard", "Role-based agent permissions", "Integrates with Slack, Notion, CRMs, ERPs", "Auto-escalation to human operators"],
    metric: "Teams using AgentOS reduce operational overhead by 60% in 90 days.",
  },
  {
    icon: Database, name: "DataMind", tagline: "AI that knows your business.", badge: "New",
    desc: "Stop using generic AI that doesn't know your products, customers, or processes. DataMind connects your entire knowledge base and makes it queryable by any agent or employee.",
    features: ["Connects to 50+ data sources", "RAG-powered semantic search", "Auto-syncing from live databases", "Compliance-ready (SOC2, HIPAA)", "Enterprise SSO & audit logs"],
    metric: "Cut research and reporting time from hours to seconds.",
  },
  {
    icon: Zap, name: "AutoFlow", tagline: "Kill your manual processes.", badge: null,
    desc: "Map your most painful manual workflows, hand them to AutoFlow's AI agents, and watch them run 24/7 without error. Built for operations teams drowning in repetitive work.",
    features: ["Visual workflow builder (no-code)", "AI agents handle exceptions intelligently", "Trigger via API, schedule, or event", "Full audit trail on every action", "Works with your existing tools"],
    metric: "Average client saves 400+ employee-hours per month.",
  },
  {
    icon: BarChart3, name: "InsightPulse", tagline: "Decisions backed by intelligence.", badge: null,
    desc: "Turn raw business data into executive-ready insights automatically. InsightPulse monitors KPIs, detects anomalies, and delivers plain-English summaries — no analyst required.",
    features: ["Auto-generated weekly board reports", "Anomaly detection with root cause analysis", "Connects to your BI tools and databases", "Natural language Q&A on your data", "Predictive forecasting models"],
    metric: "Know what's happening before it becomes a problem.",
  },
];

function Products() {
  const [active, setActive] = useState(0);
  const p = products[active];
  return (
    <section id="products" aria-label="Products" className="py-32 md:py-40">
      <div className="max-w-5xl mx-auto px-8 md:px-14">
        <Reveal>
          <div className="mb-16">
            <Label>The Product Suite</Label>
            <h2 className="text-4xl md:text-5xl font-space font-bold mb-5">
              Four products.<br className="hidden md:block" />{" "}
              <span className="gradient-text">One AI advantage.</span>
            </h2>
            <p className="text-lg max-w-lg" style={{ color: "var(--text-muted)" }}>
              Each built for a specific business problem. Deploy one or all four — they're designed to work together.
            </p>
          </div>
        </Reveal>

        {/* Tabs — 2×2 grid on mobile, row on desktop */}
        <Reveal delay={0.1}>
          <div className="grid grid-cols-2 md:flex md:flex-wrap mb-8 md:mb-10 gap-2 md:gap-0"
            style={{ borderBottom: "1px solid var(--border)" }}>
            {products.map((prod, i) => (
              <button key={prod.name} onClick={() => setActive(i)}
                className="flex items-center justify-center md:justify-start gap-2 px-4 py-4 md:px-5 md:py-3 text-sm font-medium transition-all relative rounded-xl md:rounded-none"
                style={{
                  color: active === i ? "var(--text)" : "var(--text-muted)",
                  background: active === i ? "rgba(99,102,241,0.08)" : "transparent",
                  border: `1px solid ${active === i ? "rgba(99,102,241,0.35)" : "var(--border)"}`,
                  boxShadow: active === i ? "0 0 20px rgba(99,102,241,0.08)" : "none",
                }}>
                <prod.icon size={15} style={{ color: active === i ? "var(--accent)" : "inherit", flexShrink: 0 }} />
                <span className="truncate">{prod.name}</span>
                {prod.badge && (
                  <span className="hidden sm:inline text-[10px] px-1.5 py-0.5 rounded font-semibold flex-shrink-0 font-mono"
                    style={{ background: "rgba(99,102,241,0.12)", color: "var(--accent)" }}>
                    {prod.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Product detail */}
        <AnimatePresence mode="wait">
          <motion.div key={active}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
            className="card-lg p-10 md:p-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">

              {/* Left column */}
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                    style={{
                      background: "rgba(99,102,241,0.1)",
                      border: "1px solid rgba(99,102,241,0.2)",
                    }}>
                    <p.icon size={22} style={{ color: "var(--accent)" }} />
                  </div>
                  {p.badge && (
                    <span className="text-xs font-semibold px-3 py-1 rounded-full font-mono"
                      style={{ background: "rgba(99,102,241,0.1)", color: "var(--accent)" }}>
                      {p.badge}
                    </span>
                  )}
                </div>
                <h3 className="text-3xl md:text-4xl font-space font-bold mb-2">{p.name}</h3>
                <p className="text-base font-medium mb-6" style={{ color: "var(--accent)" }}>{p.tagline}</p>
                <p className="text-base leading-relaxed mb-8" style={{ color: "var(--text-muted)" }}>{p.desc}</p>

                {/* Metric quote */}
                <div className="p-5 rounded-xl mb-10 text-sm italic leading-relaxed"
                  style={{
                    background: "rgba(99,102,241,0.06)",
                    borderLeft: "2px solid var(--accent)",
                    color: "var(--accent-hover)",
                  }}>
                  {p.metric}
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <a href="#get-started"
                    className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-base transition-all"
                    style={{
                      background: "linear-gradient(135deg, #6366f1, #818cf8)",
                      color: "#fff",
                      boxShadow: "0 0 24px rgba(99,102,241,0.3)",
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 0 40px rgba(99,102,241,0.5)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 0 24px rgba(99,102,241,0.3)"; }}>
                    Request Demo <ArrowRight size={16} />
                  </a>
                  <a href="#pricing"
                    className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-2xl font-semibold text-base btn-ghost transition-all">
                    See Pricing
                  </a>
                </div>
              </div>

              {/* Right column */}
              <div>
                <p className="text-xs font-semibold tracking-[0.15em] uppercase mb-6 font-mono"
                  style={{ color: "var(--text-dim)" }}>
                  What's included
                </p>
                <div className="space-y-0">
                  {p.features.map(f => (
                    <div key={f} className="flex items-center gap-4 py-4"
                      style={{ borderBottom: "1px solid var(--border)" }}>
                      <CheckCircle2 size={16} className="flex-shrink-0" style={{ color: "var(--accent)" }} />
                      <span className="text-sm" style={{ color: "var(--text-muted)" }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

// ─── Solutions ────────────────────────────────────────────────────────────────

const roles = [
  { role: "CEO / Founder", icon: "👔", problem: "You know AI matters but can't bet 18 months on an internal R&D bet.", solution: "We deliver a working AI system in 6 weeks with measurable ROI. If it doesn't pay for itself, we don't stop until it does.", recs: ["AgentOS", "InsightPulse"] },
  { role: "CTO / VP Engineering", icon: "🧠", problem: "Your engineers are too busy maintaining existing systems to build AI.", solution: "We plug in as your AI engineering team. You get OpenClaw-powered agents without burning your existing team's capacity.", recs: ["AgentOS", "DataMind", "AutoFlow"] },
  { role: "COO / Operations", icon: "⚙️", problem: "Your operations are held together with spreadsheets and manual handoffs.", solution: "AutoFlow maps your most painful workflows and hands them to AI agents that run 24/7 without error.", recs: ["AutoFlow", "AgentOS"] },
  { role: "VP Sales / Marketing", icon: "📈", problem: "Your team spends 60% of their time on admin instead of selling.", solution: "AI agents handle lead research, follow-ups, reporting, and content so your humans only do the work humans should do.", recs: ["DataMind", "InsightPulse"] },
];

function Solutions() {
  const [active, setActive] = useState(0);
  const r = roles[active];
  return (
    <section id="solutions" aria-label="Solutions" className="py-32 md:py-40"
      style={{ borderTop: "1px solid var(--border)" }}>
      <div className="max-w-5xl mx-auto px-8 md:px-14">
        <Reveal>
          <div className="mb-16">
            <Label>Built for Decision-Makers</Label>
            <h2 className="text-4xl md:text-5xl font-space font-bold mb-5">
              Find your <span className="gradient-text">use case</span>
            </h2>
            <p className="text-lg max-w-lg" style={{ color: "var(--text-muted)" }}>
              Tell us your role — we'll show you exactly how AI applies to your world.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {roles.map((role, i) => (
            <button key={role.role} onClick={() => setActive(i)}
              className="p-6 md:p-8 rounded-2xl text-left transition-all"
              style={{
                background: active === i ? "rgba(99,102,241,0.08)" : "var(--surface)",
                border: `1px solid ${active === i ? "rgba(99,102,241,0.35)" : "var(--border)"}`,
                boxShadow: active === i ? "0 0 20px rgba(99,102,241,0.08)" : "none",
              }}>
              <div className="text-2xl mb-3">{role.icon}</div>
              <div className="text-sm font-semibold leading-snug"
                style={{ color: active === i ? "var(--text)" : "var(--text-muted)" }}>
                {role.role}
              </div>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={active}
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}
            className="card-lg p-10 md:p-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
              <div>
                <p className="text-xs font-semibold tracking-[0.15em] uppercase mb-4 font-mono"
                  style={{ color: "var(--text-dim)" }}>The Problem</p>
                <p className="text-xl leading-relaxed mb-10" style={{ color: "var(--text)" }}>
                  "{r.problem}"
                </p>
                <p className="text-xs font-semibold tracking-[0.15em] uppercase mb-4 font-mono"
                  style={{ color: "var(--text-dim)" }}>Our Solution</p>
                <p className="leading-relaxed" style={{ color: "var(--text-muted)" }}>{r.solution}</p>
              </div>
              <div>
                <p className="text-xs font-semibold tracking-[0.15em] uppercase mb-6 font-mono"
                  style={{ color: "var(--text-dim)" }}>Recommended Products</p>
                <div className="space-y-3">
                  {r.recs.map(name => {
                    const prod = products.find(p => p.name === name)!;
                    return (
                      <div key={name} className="flex items-center gap-4 p-5 md:p-6 rounded-2xl transition-all card-hover"
                        style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}>
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ background: "rgba(99,102,241,0.1)" }}>
                          <prod.icon size={17} style={{ color: "var(--accent)" }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-semibold" style={{ color: "var(--text)" }}>{prod.name}</div>
                          <div className="text-xs truncate" style={{ color: "var(--text-dim)" }}>{prod.tagline}</div>
                        </div>
                        <ChevronRight size={14} style={{ color: "var(--text-dim)" }} />
                      </div>
                    );
                  })}
                </div>
                <a href="#get-started"
                  className="mt-8 w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-semibold text-sm transition-all"
                  style={{
                    background: "linear-gradient(135deg, #6366f1, #818cf8)",
                    color: "#fff",
                    boxShadow: "0 0 24px rgba(99,102,241,0.25)",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 0 40px rgba(99,102,241,0.45)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 0 24px rgba(99,102,241,0.25)"; }}>
                  Get a Custom Plan <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

// ─── Case Studies ─────────────────────────────────────────────────────────────

const cases = [
  {
    company: "NeuralShift Commerce", industry: "E-Commerce",
    challenge: "A $200M GMV retailer with no personalization — every customer saw the same homepage.",
    solution: "Deployed AgentOS + DataMind for a real-time recommendation engine using purchase history, browsing patterns, and inventory signals.",
    results: [{ metric: "+34%", label: "Conversion rate" }, { metric: "-28%", label: "Cart abandonment" }, { metric: "6 wks", label: "To production" }],
  },
  {
    company: "Meridian Legal Group", industry: "Legal Tech",
    challenge: "300 attorneys spending 8+ hours per week on contract review and due diligence.",
    solution: "Built Aria — a legal AI agent on DataMind that reviews contracts, flags risks, and surfaces relevant case law in minutes.",
    results: [{ metric: "40x", label: "Faster review" }, { metric: "97%", label: "Accuracy" }, { metric: "$1.8M", label: "Annual savings" }],
  },
  {
    company: "Cloudpath Logistics", industry: "Supply Chain",
    challenge: "12 ops staff manually routing 3,000+ shipments daily with constant exception handling.",
    solution: "AutoFlow agents handle order intake, routing, carrier selection, and customer notifications — fully autonomous.",
    results: [{ metric: "12→0", label: "Manual routers" }, { metric: "99.7%", label: "SLA compliance" }, { metric: "$2.1M", label: "Saved per year" }],
  },
];

function CaseStudies() {
  return (
    <section id="work" aria-label="Case studies" className="py-32 md:py-40"
      style={{ borderTop: "1px solid var(--border)" }}>
      <div className="max-w-5xl mx-auto px-8 md:px-14">
        <Reveal>
          <div className="mb-16">
            <Label>Proof of Work</Label>
            <h2 className="text-4xl md:text-5xl font-space font-bold mb-5">
              Real clients. <span className="gradient-text">Real numbers.</span>
            </h2>
            <p className="text-lg max-w-lg" style={{ color: "var(--text-muted)" }}>
              We don't do pilots that never go to production. Every engagement ships.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {cases.map((c, i) => (
            <Reveal key={c.company} delay={i * 0.08}>
              <article className="card p-10 md:p-12 flex flex-col h-full card-hover hover-lift">
                <div className="mb-6">
                  <span className="text-xs font-semibold px-3 py-1.5 rounded-full font-mono"
                    style={{
                      background: "rgba(99,102,241,0.08)",
                      color: "var(--accent)",
                      border: "1px solid rgba(99,102,241,0.2)",
                    }}>
                    {c.industry}
                  </span>
                </div>
                <h3 className="text-lg font-space font-bold mb-6" style={{ color: "var(--text)" }}>{c.company}</h3>
                <div className="mb-5">
                  <p className="text-xs font-semibold tracking-[0.15em] uppercase mb-3 font-mono"
                    style={{ color: "var(--text-dim)" }}>Challenge</p>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{c.challenge}</p>
                </div>
                <div className="mb-8 flex-1">
                  <p className="text-xs font-semibold tracking-[0.15em] uppercase mb-3 font-mono"
                    style={{ color: "var(--text-dim)" }}>Solution</p>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{c.solution}</p>
                </div>
                <div className="grid grid-cols-3 gap-3 pt-6" style={{ borderTop: "1px solid var(--border)" }}>
                  {c.results.map(res => (
                    <div key={res.label} className="text-center">
                      <div className="text-xl font-space font-black mb-1" style={{
                        color: "var(--cyan)",
                        textShadow: "0 0 16px rgba(34,211,238,0.3)",
                      }}>{res.metric}</div>
                      <div className="text-xs leading-tight" style={{ color: "var(--text-dim)" }}>{res.label}</div>
                    </div>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Trust Bar ────────────────────────────────────────────────────────────────

const trust = [
  { icon: Shield, text: "SOC2 Ready" },
  { icon: Globe, text: "California Based" },
  { icon: Clock, text: "6-Week Delivery" },
  { icon: TrendingUp, text: "ROI Guaranteed" },
  { icon: Users, text: "Dedicated Team" },
  { icon: Star, text: "99% Retention" },
];

function TrustBar() {
  return (
    <div className="py-10" style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
      <div className="max-w-5xl mx-auto px-8 md:px-14 grid grid-cols-3 md:grid-cols-6 gap-6 md:gap-8">
        {trust.map(t => (
          <div key={t.text} className="flex flex-col items-center gap-3 text-center">
            <t.icon size={18} style={{ color: "var(--accent)", opacity: 0.75 }} />
            <span className="text-xs font-medium leading-tight font-mono"
              style={{ color: "var(--text-dim)" }}>{t.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Pricing ──────────────────────────────────────────────────────────────────

const plans = [
  {
    name: "AI Pilot", price: "$15K", period: "one-time · 6 weeks", highlight: false,
    desc: "Pick one high-impact process. We'll automate it, measure the ROI, and hand you a roadmap for the rest.",
    includes: ["1 production AI agent or workflow", "DataMind or AutoFlow integration", "ROI measurement & reporting", "6-week dedicated delivery", "Handover docs & training"],
    cta: "Start a Pilot",
  },
  {
    name: "Growth", price: "$8K", period: "per month", highlight: true,
    desc: "An embedded AI engineering team. We continuously build, deploy, and improve AI systems across your business.",
    includes: ["Everything in Pilot", "Full AgentOS deployment", "Up to 10 active AI agents", "Monthly strategy sessions", "Dedicated Slack support", "Early access to new products"],
    cta: "Talk to Sales",
  },
  {
    name: "Enterprise", price: "Custom", period: "annual", highlight: false,
    desc: "Full-scale AI transformation. Multi-product deployment, custom integrations, and a dedicated team.",
    includes: ["Everything in Growth", "All 4 products deployed", "Unlimited AI agents", "On-site workshops", "SOC2 compliance support", "SLA-backed guarantees"],
    cta: "Contact Us",
  },
];

function Pricing() {
  return (
    <section id="pricing" aria-label="Pricing" className="py-32 md:py-40"
      style={{ borderTop: "1px solid var(--border)" }}>
      <div className="max-w-5xl mx-auto px-8 md:px-14">
        <Reveal>
          <div className="mb-16">
            <Label>Transparent Pricing</Label>
            <h2 className="text-4xl md:text-5xl font-space font-bold mb-5">
              Start small. <span className="gradient-text">Scale fast.</span>
            </h2>
            <p className="text-lg max-w-lg" style={{ color: "var(--text-muted)" }}>
              No retainers for retainers' sake. Every tier is tied to deliverables.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {plans.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 0.08}>
              <div className="flex flex-col h-full relative"
                style={{
                  background: plan.highlight ? "#0c0c28" : "var(--surface)",
                  border: `1px solid ${plan.highlight ? "rgba(99,102,241,0.5)" : "var(--border)"}`,
                  borderRadius: "24px",
                  padding: "clamp(32px, 5vw, 48px)",
                  boxShadow: plan.highlight
                    ? "0 0 60px rgba(99,102,241,0.14), 0 0 120px rgba(99,102,241,0.06), inset 0 0 60px rgba(99,102,241,0.03)"
                    : "none",
                }}>
                {plan.highlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full text-xs font-semibold font-mono"
                    style={{
                      background: "linear-gradient(135deg, #6366f1, #818cf8)",
                      color: "#fff",
                      boxShadow: "0 0 16px rgba(99,102,241,0.4)",
                    }}>
                    Most Popular
                  </div>
                )}
                <div className="mb-8">
                  <p className="text-sm font-medium mb-4 font-mono" style={{ color: "var(--text-muted)" }}>
                    {plan.name}
                  </p>
                  <div className="flex items-end gap-2 mb-4">
                    <span className="text-5xl font-space font-black" style={{
                      color: plan.highlight ? "var(--cyan)" : "var(--text)",
                      textShadow: plan.highlight ? "0 0 24px rgba(34,211,238,0.3)" : "none",
                    }}>
                      {plan.price}
                    </span>
                    <span className="text-sm mb-2 font-mono" style={{ color: "var(--text-dim)" }}>{plan.period}</span>
                  </div>
                  <p className="leading-relaxed text-sm" style={{ color: "var(--text-muted)" }}>{plan.desc}</p>
                </div>

                <div className="space-y-4 flex-1 mb-10">
                  {plan.includes.map(f => (
                    <div key={f} className="flex items-start gap-3">
                      <CheckCircle2 size={15} className="mt-0.5 flex-shrink-0" style={{ color: "var(--accent)" }} />
                      <span className="text-sm leading-snug" style={{ color: "var(--text-muted)" }}>{f}</span>
                    </div>
                  ))}
                </div>

                <a href="#get-started"
                  className="w-full py-4 rounded-2xl font-semibold text-center text-sm block transition-all"
                  style={plan.highlight
                    ? {
                      background: "linear-gradient(135deg, #6366f1, #818cf8)",
                      color: "#fff",
                      boxShadow: "0 0 24px rgba(99,102,241,0.3)",
                    }
                    : {
                      border: "1px solid var(--border)",
                      color: "var(--text-muted)",
                    }}
                  onMouseEnter={e => {
                    if (plan.highlight) {
                      (e.currentTarget as HTMLElement).style.boxShadow = "0 0 40px rgba(99,102,241,0.5)";
                    } else {
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(99,102,241,0.4)";
                      (e.currentTarget as HTMLElement).style.color = "var(--text)";
                    }
                  }}
                  onMouseLeave={e => {
                    if (plan.highlight) {
                      (e.currentTarget as HTMLElement).style.boxShadow = "0 0 24px rgba(99,102,241,0.3)";
                    } else {
                      (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                      (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
                    }
                  }}>
                  {plan.cta}
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <p className="text-center text-sm mt-10" style={{ color: "var(--text-dim)" }}>
            All plans include a free 30-min strategy call before any commitment. &nbsp;
            <a href="#get-started" className="hover:underline transition-colors" style={{ color: "var(--accent)" }}>
              Schedule yours →
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Get Started ──────────────────────────────────────────────────────────────

const formSteps = [
  { title: "What's your role?", key: "role", options: ["CEO / Founder", "CTO / VP Engineering", "COO / VP Operations", "VP Sales / Marketing", "Other Executive"] },
  { title: "What's your biggest challenge?", key: "challenge", options: ["Too many manual processes", "Customer support can't scale", "Data is siloed and unusable", "Competitors moving faster with AI", "Engineering team is overloaded", "Need to justify AI ROI to leadership"] },
  { title: "How large is your team?", key: "size", options: ["1–10 people", "11–50 people", "51–200 people", "201–1,000 people", "1,000+ people"] },
  { title: "When do you need this live?", key: "timeline", options: ["ASAP (within weeks)", "1–3 months", "3–6 months", "Just exploring for now"] },
];

function GetStarted() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [contact, setContact] = useState({ name: "", email: "", company: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSelect = (val: string) => {
    setAnswers(prev => ({ ...prev, [formSteps[step].key]: val }));
    if (step < formSteps.length - 1) setTimeout(() => setStep(s => s + 1), 280);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...contact, answers }),
      });
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

  return (
    <section id="get-started" aria-label="Get started" className="py-32 md:py-40"
      style={{ borderTop: "1px solid var(--border)" }}>
      <div className="max-w-xl mx-auto px-8 md:px-12">
        <Reveal>
          <div className="mb-14">
            <Label>Let's Build Together</Label>
            <h2 className="text-4xl md:text-5xl font-space font-bold mb-5">
              Start your <span className="gradient-text">AI journey</span>
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Answer 4 quick questions — we'll match you to the right product and schedule a call.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="card-lg p-10 md:p-16">
            {submitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12">
                <div className="text-5xl mb-6">🤖</div>
                <h3 className="font-space font-bold text-2xl mb-4" style={{ color: "var(--text)" }}>
                  You're on the list.
                </h3>
                <p className="leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  We'll reach out to <span style={{ color: "var(--cyan)" }}>{contact.email}</span> within 24 hours.
                </p>
              </motion.div>
            ) : step < formSteps.length ? (
              <div>
                {/* Progress bar */}
                <div className="flex gap-2 mb-10">
                  {formSteps.map((_, i) => (
                    <div key={i} className="flex-1 h-0.5 rounded-full transition-all duration-500"
                      style={{
                        background: i <= step
                          ? "linear-gradient(90deg, #6366f1, #818cf8)"
                          : "var(--border)",
                        boxShadow: i <= step ? "0 0 8px rgba(99,102,241,0.4)" : "none",
                      }} />
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}>
                    <p className="text-xs font-semibold tracking-[0.15em] uppercase mb-3 font-mono"
                      style={{ color: "var(--text-dim)" }}>
                      Step {step + 1} of {formSteps.length}
                    </p>
                    <h3 className="font-space font-bold text-2xl mb-8" style={{ color: "var(--text)" }}>
                      {formSteps[step].title}
                    </h3>
                    <div className="space-y-2.5">
                      {formSteps[step].options.map(opt => (
                        <button key={opt} onClick={() => handleSelect(opt)}
                          className="w-full text-left px-5 py-4 rounded-2xl text-sm transition-all"
                          style={{
                            background: answers[formSteps[step].key] === opt
                              ? "rgba(99,102,241,0.1)"
                              : "var(--surface-2)",
                            border: `1px solid ${answers[formSteps[step].key] === opt
                              ? "rgba(99,102,241,0.45)"
                              : "var(--border)"}`,
                            color: answers[formSteps[step].key] === opt
                              ? "var(--accent-hover)"
                              : "var(--text-muted)",
                            boxShadow: answers[formSteps[step].key] === opt
                              ? "0 0 16px rgba(99,102,241,0.1)"
                              : "none",
                          }}>
                          {opt}
                        </button>
                      ))}
                    </div>
                    {step > 0 && (
                      <button onClick={() => setStep(s => s - 1)} className="mt-6 text-sm transition-colors font-mono"
                        style={{ color: "var(--text-dim)" }}>
                        ← back
                      </button>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            ) : (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                {/* Progress bar - complete */}
                <div className="flex gap-2 mb-10">
                  {formSteps.map((_, i) => (
                    <div key={i} className="flex-1 h-0.5 rounded-full"
                      style={{
                        background: "linear-gradient(90deg, #6366f1, #818cf8)",
                        boxShadow: "0 0 8px rgba(99,102,241,0.4)",
                      }} />
                  ))}
                </div>
                <h3 className="font-space font-bold text-2xl mb-2" style={{ color: "var(--text)" }}>
                  Almost there.
                </h3>
                <p className="mb-8 text-sm" style={{ color: "var(--text-muted)" }}>
                  Where should we send your custom AI roadmap?
                </p>
                <form onSubmit={handleSubmit} className="space-y-3">
                  {[
                    { key: "name", placeholder: "Your full name", type: "text" },
                    { key: "company", placeholder: "Company name", type: "text" },
                    { key: "email", placeholder: "Work email", type: "email" },
                  ].map(f => (
                    <input key={f.key} type={f.type} required placeholder={f.placeholder}
                      className="form-input w-full px-5 py-4 rounded-2xl text-sm"
                      value={contact[f.key as keyof typeof contact]}
                      onChange={e => setContact(prev => ({ ...prev, [f.key]: e.target.value }))} />
                  ))}
                  <button type="submit" disabled={loading}
                    className="w-full py-4 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 transition-all mt-2"
                    style={{
                      background: "linear-gradient(135deg, #6366f1, #818cf8)",
                      color: "#fff",
                      boxShadow: "0 0 28px rgba(99,102,241,0.35)",
                      opacity: loading ? 0.7 : 1,
                    }}
                    onMouseEnter={e => { if (!loading) (e.currentTarget as HTMLElement).style.boxShadow = "0 0 44px rgba(99,102,241,0.55)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 0 28px rgba(99,102,241,0.35)"; }}>
                    {loading ? "Sending…" : <><span>Book My Strategy Call</span><Calendar size={15} /></>}
                  </button>
                  <p className="text-xs text-center pt-1 font-mono" style={{ color: "var(--text-dim)" }}>
                    // No spam. No pressure. Just an honest conversation.
                  </p>
                </form>
                <button onClick={() => setStep(s => s - 1)} className="mt-5 text-sm transition-colors font-mono"
                  style={{ color: "var(--text-dim)" }}>
                  ← back
                </button>
              </motion.div>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="flex items-center justify-center gap-8 mt-10 text-sm flex-wrap" style={{ color: "var(--text-dim)" }}>
            <a href="mailto:theo@impressionlabz.com"
              className="flex items-center gap-2 transition-colors hover:text-[var(--accent)]">
              <Mail size={14} /> theo@impressionlabz.com
            </a>
            <a href="https://github.com/theo-impressionlabz" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 transition-colors hover:text-[var(--accent)]">
              <Github size={14} /> GitHub
            </a>
            <a href="https://linkedin.com/company/impressionlabz" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 transition-colors hover:text-[var(--accent)]">
              <Linkedin size={14} /> LinkedIn
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer role="contentinfo" className="pt-20 pb-12" style={{ borderTop: "1px solid var(--border)" }}>
      <div className="max-w-5xl mx-auto px-8 md:px-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-16 mb-16">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
                style={{
                  background: "linear-gradient(135deg, #6366f1, #818cf8)",
                  boxShadow: "0 0 14px rgba(99,102,241,0.3)",
                  color: "#fff",
                }}>
                IL
              </div>
              <span className="font-space font-semibold" style={{ color: "var(--text)" }}>
                Impression <span style={{ color: "var(--accent)" }}>Labz</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-dim)" }}>
              Where human intelligence meets machine precision.
            </p>
            <p className="text-xs font-mono" style={{ color: "var(--text-dim)" }}>California, USA 🌴</p>
          </div>

          {[
            { label: "Products", items: products.map(p => [p.name, "#products"]) },
            { label: "Solutions", items: roles.map(r => [r.role, "#solutions"]) },
            { label: "Company", items: [["Pricing", "#pricing"], ["Case Studies", "#work"], ["LinkedIn", "https://linkedin.com/company/impressionlabz"], ["GitHub", "https://github.com/theo-impressionlabz"], ["Privacy Policy", "/privacy"], ["Terms of Service", "/terms"]] },
          ].map(col => (
            <div key={col.label}>
              <p className="text-xs font-semibold tracking-[0.15em] uppercase mb-5 font-mono"
                style={{ color: "var(--text-dim)" }}>{col.label}</p>
              <div className="space-y-3.5">
                {col.items.map(([label, href]) => (
                  <a key={label} href={href}
                    className="block text-sm transition-colors hover:text-[var(--text)]"
                    style={{ color: "var(--text-dim)" }}>
                    {label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-3 pt-8 text-xs font-mono"
          style={{ borderTop: "1px solid var(--border)", color: "var(--text-dim)" }}>
          <span>© {new Date().getFullYear()} Impression Labz. All rights reserved.</span>
          <span>Built with OpenClaw 🦞 · California, USA</span>
        </div>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <main style={{ background: "var(--bg)" }}>
      <Nav />
      <Hero />
      <PainBanner />
      <Products />
      <Solutions />
      <CaseStudies />
      <TrustBar />
      <Pricing />
      <GetStarted />
      <Footer />
    </main>
  );
}
