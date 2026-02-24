"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Brain, Bot, Zap, BarChart3, ArrowRight, Github, Mail,
  ChevronDown, CheckCircle2, Menu, X, ExternalLink,
  Users, Clock, TrendingUp, Shield, Star, ChevronRight,
  Layers, Activity, Database, Cpu, Globe, Play, Calendar
} from "lucide-react";

// ─── Utils ───────────────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.25, 0.46, 0.45, 0.94] }}>
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
    if (!del && sub === cur.length) { setTimeout(() => setDel(true), 2200); return; }
    if (del && sub === 0) { setDel(false); setIndex(i => (i + 1) % words.length); return; }
    const t = setTimeout(() => setSub(s => s + (del ? -1 : 1)), del ? 35 : 75);
    return () => clearTimeout(t);
  }, [sub, del, index, words]);
  return <span><span className="gradient-text">{words[index].substring(0, sub)}</span><span className="cursor" /></span>;
}

function Particles() {
  const p = Array.from({ length: 25 }, (_, i) => ({
    id: i, left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 15}s`, dur: `${12 + Math.random() * 18}s`,
    size: `${1 + Math.random() * 2.5}px`,
  }));
  return (
    <div className="particle-field">
      {p.map(x => <div key={x.id} className="particle" style={{ left: x.left, animationDelay: x.delay, animationDuration: x.dur, width: x.size, height: x.size }} />)}
    </div>
  );
}

// ─── Nav ─────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav aria-label="Main navigation" className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "glass border-b border-[rgba(0,212,255,0.1)] py-3" : "py-5"}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg gradient-border flex items-center justify-center text-xs font-bold text-[#00d4ff] font-space">IL</div>
          <span className="font-space font-semibold tracking-tight">Impression <span className="text-[#00d4ff]">Labz</span></span>
        </a>
        <div className="hidden md:flex items-center gap-8 text-sm text-slate-400">
          {["Products", "Solutions", "Pricing", "About"].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-[#00d4ff] transition-colors">{item}</a>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-3">
          <a href="#contact" className="text-sm text-slate-400 hover:text-white transition-colors px-4 py-2">Sign in</a>
          <a href="#get-started" className="flex items-center gap-1.5 px-5 py-2 rounded-full text-sm font-semibold bg-[#00d4ff] text-[#0a0a0f] hover:bg-white transition-all">
            Book a Demo <Calendar size={13} />
          </a>
        </div>
        <button className="md:hidden text-slate-400" onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-[rgba(0,212,255,0.1)] px-6 py-4 flex flex-col gap-4">
            {["Products", "Solutions", "Pricing", "About"].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-slate-300 hover:text-[#00d4ff]" onClick={() => setOpen(false)}>{item}</a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
const metrics = [
  { value: "10x", label: "Faster delivery vs in-house" },
  { value: "$2M+", label: "Avg. annual savings per client" },
  { value: "40+", label: "Production AI systems shipped" },
  { value: "99%", label: "Client retention rate" },
];

function Hero() {
  return (
    <section id="hero" aria-label="Hero" className="relative min-h-screen flex items-center justify-center grid-bg overflow-hidden">
      <div className="scan-line" />
      <Particles />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(124,58,237,0.1) 0%, rgba(0,212,255,0.05) 45%, transparent 70%)" }} />

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6 text-center pt-28 pb-16">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-medium text-slate-400 mb-8 border border-[rgba(0,212,255,0.2)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
          California's leading AI solutions firm &nbsp;·&nbsp; Powered by OpenClaw 🦞
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-space font-bold leading-[1.1] mb-6">
          Your Enterprise Runs on<br />
          <Typewriter words={["Outdated Software.", "Manual Processes.", "Missed Opportunities.", "Human Bottlenecks."]} />
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-4 leading-relaxed">
          We fix that. Impression Labz deploys production-ready AI agents and platform intelligence
          that eliminate bottlenecks, cut costs, and compound over time.
        </motion.p>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          className="text-sm text-slate-600 mb-10">No R&D overhead. No 18-month roadmaps. Just working AI, fast.</motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
          className="flex items-center justify-center gap-4 flex-wrap mb-16">
          <a href="#get-started"
            className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-[#0a0a0f] bg-[#00d4ff] hover:bg-white transition-all hover:scale-105 text-base">
            Book a Free Strategy Call <Calendar size={16} />
          </a>
          <a href="#products"
            className="flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-slate-300 border border-slate-700 hover:border-[#00d4ff] hover:text-[#00d4ff] transition-all">
            <Play size={14} /> See Our Products
          </a>
        </motion.div>

        {/* Metrics bar */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {metrics.map((m) => (
            <div key={m.label} className="glass rounded-2xl px-4 py-5 border border-[rgba(0,212,255,0.08)]">
              <div className="text-3xl font-space font-black text-[#00d4ff] mb-1">{m.value}</div>
              <div className="text-xs text-slate-500">{m.label}</div>
            </div>
          ))}
        </motion.div>

        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="mt-16 flex justify-center text-slate-700">
          <ChevronDown size={22} />
        </motion.div>
      </div>
    </section>
  );
}

// ─── Pain Points Banner ────────────────────────────────────────────────────────
const pains = [
  "Repetitive manual processes killing productivity?",
  "Customer support overwhelmed?",
  "Data siloed across 10 different tools?",
  "Competitors moving faster with AI?",
  "Engineering team too busy to build AI?",
  "Can't justify AI ROI to the board?",
];

function PainBanner() {
  return (
    <div className="py-4 border-y border-[rgba(0,212,255,0.06)] overflow-hidden bg-[rgba(0,212,255,0.02)]">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="flex gap-16 whitespace-nowrap"
      >
        {[...pains, ...pains].map((p, i) => (
          <span key={i} className="text-sm text-slate-600 flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7c3aed] inline-block" />
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
    icon: Bot,
    name: "AgentOS",
    tagline: "Your AI workforce, managed.",
    color: "#00d4ff",
    badge: "Most Popular",
    desc: "Deploy, coordinate, and monitor a fleet of AI agents across your entire organization. AgentOS gives you a unified control plane for every automated workflow — from customer service to internal ops.",
    features: [
      "Multi-agent orchestration via OpenClaw",
      "Real-time monitoring & alerting dashboard",
      "Role-based agent permissions",
      "Integrates with Slack, Notion, CRMs, ERPs",
      "Auto-escalation to human operators",
    ],
    metric: "Teams using AgentOS reduce operational overhead by 60% in 90 days.",
  },
  {
    icon: Database,
    name: "DataMind",
    tagline: "AI that knows your business.",
    color: "#7c3aed",
    badge: "New",
    desc: "Stop using generic AI that doesn't know your products, customers, or processes. DataMind connects your entire knowledge base — docs, CRM, databases, emails — and makes it queryable by any AI agent or employee.",
    features: [
      "Connects to 50+ data sources",
      "RAG-powered semantic search",
      "Auto-syncing from live databases",
      "Compliance-ready (SOC2, HIPAA)",
      "Enterprise SSO & audit logs",
    ],
    metric: "Cut research and reporting time from hours to seconds.",
  },
  {
    icon: Zap,
    name: "AutoFlow",
    tagline: "Kill your manual processes.",
    color: "#10b981",
    badge: null,
    desc: "Map your most painful manual workflows, hand them to AutoFlow's AI agents, and watch them run 24/7 without error. Built for operations teams that are drowning in repetitive work.",
    features: [
      "Visual workflow builder (no-code)",
      "AI agents handle exceptions intelligently",
      "Trigger via API, schedule, or event",
      "Full audit trail on every action",
      "Works with existing tools (no rip & replace)",
    ],
    metric: "Average AutoFlow client saves 400+ employee-hours per month.",
  },
  {
    icon: BarChart3,
    name: "InsightPulse",
    tagline: "Decisions backed by AI intelligence.",
    color: "#f59e0b",
    badge: null,
    desc: "Turn your raw business data into executive-ready insights automatically. InsightPulse monitors KPIs, detects anomalies, and delivers plain-English summaries to your inbox — no analyst required.",
    features: [
      "Auto-generated weekly CEO/board reports",
      "Anomaly detection with root cause analysis",
      "Connects to your BI tools and databases",
      "Natural language Q&A on your data",
      "Predictive forecasting models",
    ],
    metric: "Know what's happening in your business before it becomes a problem.",
  },
];

function Products() {
  const [active, setActive] = useState(0);
  const p = products[active];

  return (
    <section id="products" aria-label="Products" className="py-16 md:py-28 max-w-7xl mx-auto px-4 md:px-6 overflow-x-hidden">
      <Reveal>
        <div className="text-center mb-14">
          <p className="text-[#00d4ff] text-xs font-semibold tracking-widest uppercase mb-4">The Product Suite</p>
          <h2 className="text-4xl md:text-5xl font-space font-bold mb-4">
            Four Products. <span className="gradient-text">One AI Advantage.</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">Each built for a specific business problem. Deploy one or all four — they're designed to work together.</p>
        </div>
      </Reveal>

      {/* Tab selector */}
      <Reveal delay={0.1}>
        <div className="flex gap-3 justify-center flex-wrap mb-10">
          {products.map((p, i) => (
            <button key={p.name} onClick={() => setActive(i)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${active === i ? "text-[#0a0a0f]" : "glass text-slate-400 hover:text-white border border-[rgba(255,255,255,0.06)]"}`}
              style={active === i ? { background: p.color } : {}}>
              <p.icon size={14} />
              {p.name}
              {p.badge && <span className="text-xs px-1.5 py-0.5 rounded-full bg-[rgba(0,0,0,0.3)] text-white">{p.badge}</span>}
            </button>
          ))}
        </div>
      </Reveal>

      {/* Product detail */}
      <AnimatePresence mode="wait">
        <motion.div key={active}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35 }}
          className="glass rounded-3xl p-8 md:p-12 gradient-border"
          style={{ borderColor: p.color }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-start">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{ background: `${p.color}20`, border: `1px solid ${p.color}40` }}>
                  <p.icon size={22} style={{ color: p.color }} />
                </div>
                {p.badge && (
                  <span className="text-xs font-bold px-3 py-1 rounded-full"
                    style={{ background: `${p.color}20`, color: p.color }}>
                    {p.badge}
                  </span>
                )}
              </div>
              <h3 className="text-3xl font-space font-black mb-1">{p.name}</h3>
              <p className="text-lg mb-5" style={{ color: p.color }}>{p.tagline}</p>
              <p className="text-slate-400 leading-relaxed mb-8">{p.desc}</p>
              <div className="p-4 rounded-xl mb-8 text-sm font-medium italic"
                style={{ background: `${p.color}10`, borderLeft: `3px solid ${p.color}`, color: p.color }}>
                💡 {p.metric}
              </div>
              <div className="flex gap-3">
                <a href="#get-started"
                  className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-[#0a0a0f] transition-all hover:scale-105"
                  style={{ background: p.color }}>
                  Request Demo <ArrowRight size={14} />
                </a>
                <a href="#pricing"
                  className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-slate-400 border border-slate-700 hover:border-slate-500 transition-all">
                  See Pricing
                </a>
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-xs text-slate-600 uppercase tracking-widest font-semibold mb-5">What's included</p>
              {p.features.map((f) => (
                <div key={f} className="flex items-start gap-3 py-3 border-b border-[rgba(255,255,255,0.04)] last:border-0">
                  <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0" style={{ color: p.color }} />
                  <span className="text-slate-300 text-sm">{f}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

// ─── Solutions by Role ─────────────────────────────────────────────────────────
const roles = [
  {
    role: "CEO / Founder",
    icon: "👔",
    problem: "You know AI matters but can't bet 18 months on an internal R&D bet.",
    solution: "We deliver a working AI system in 6 weeks with measurable ROI. If it doesn't pay for itself, we don't stop until it does.",
    products: ["AgentOS", "InsightPulse"],
  },
  {
    role: "CTO / VP Engineering",
    icon: "🧠",
    problem: "Your engineers are too busy maintaining existing systems to build AI.",
    solution: "We plug in as an AI engineering team. You get OpenClaw-powered agents without burning your existing team's capacity.",
    products: ["AgentOS", "DataMind", "AutoFlow"],
  },
  {
    role: "COO / VP Operations",
    icon: "⚙️",
    problem: "Your operations are held together with spreadsheets and manual handoffs.",
    solution: "AutoFlow maps your most painful workflows and hands them to AI agents that run 24/7 without error or escalation lag.",
    products: ["AutoFlow", "AgentOS"],
  },
  {
    role: "VP Sales / Marketing",
    icon: "📈",
    problem: "Your team spends 60% of their time on admin instead of selling.",
    solution: "We deploy AI agents that handle lead research, follow-ups, reporting, and content — so your humans only do the work humans should do.",
    products: ["DataMind", "InsightPulse"],
  },
];

function Solutions() {
  const [active, setActive] = useState(0);
  const r = roles[active];
  return (
    <section id="solutions" aria-label="Solutions by role" className="py-24 relative">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 30% 50%, rgba(124,58,237,0.06) 0%, transparent 60%)" }} />
      <div className="max-w-6xl mx-auto px-6 relative">
        <Reveal>
          <div className="text-center mb-14">
            <p className="text-[#7c3aed] text-xs font-semibold tracking-widest uppercase mb-4">Built for Decision-Makers</p>
            <h2 className="text-4xl md:text-5xl font-space font-bold">
              Find Your <span className="gradient-text">Use Case</span>
            </h2>
          </div>
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {roles.map((r, i) => (
            <button key={r.role} onClick={() => setActive(i)}
              className={`px-4 py-4 rounded-2xl text-left transition-all ${active === i ? "glass border border-[rgba(124,58,237,0.4)] bg-[rgba(124,58,237,0.1)]" : "glass border border-transparent hover:border-[rgba(255,255,255,0.08)]"}`}>
              <div className="text-2xl mb-2">{r.icon}</div>
              <div className="text-sm font-semibold">{r.role}</div>
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={active}
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
            className="glass rounded-3xl p-8 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
              <div>
                <div className="text-xs text-slate-600 uppercase tracking-widest mb-3">The Problem</div>
                <p className="text-slate-300 text-lg leading-relaxed mb-8">"{r.problem}"</p>
                <div className="text-xs text-slate-600 uppercase tracking-widest mb-3">Our Solution</div>
                <p className="text-slate-300 leading-relaxed">{r.solution}</p>
              </div>
              <div>
                <div className="text-xs text-slate-600 uppercase tracking-widest mb-4">Recommended Products</div>
                <div className="space-y-3">
                  {r.products.map(name => {
                    const prod = products.find(p => p.name === name)!;
                    return (
                      <div key={name} className="flex items-center gap-3 p-4 rounded-xl"
                        style={{ background: `${prod.color}08`, border: `1px solid ${prod.color}25` }}>
                        <prod.icon size={18} style={{ color: prod.color }} />
                        <div>
                          <div className="font-semibold text-sm">{prod.name}</div>
                          <div className="text-xs text-slate-500">{prod.tagline}</div>
                        </div>
                        <ChevronRight size={14} className="ml-auto text-slate-600" />
                      </div>
                    );
                  })}
                </div>
                <a href="#get-started"
                  className="mt-6 w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold bg-[#7c3aed] text-white hover:bg-[#6d28d9] transition-all">
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
    company: "NeuralShift Commerce", industry: "E-Commerce", color: "#00d4ff",
    challenge: "A $200M GMV retailer with no personalization layer — every customer saw the same homepage.",
    solution: "Deployed AgentOS + DataMind to build a real-time recommendation engine using purchase history, browsing patterns, and inventory signals.",
    results: [{ metric: "+34%", label: "Conversion rate" }, { metric: "-28%", label: "Cart abandonment" }, { metric: "6 weeks", label: "Time to production" }],
  },
  {
    company: "Meridian Legal Group", industry: "Legal Tech", color: "#7c3aed",
    challenge: "300 attorneys spending 8+ hours per week on contract review and due diligence research.",
    solution: "Built Aria — a custom legal AI agent on DataMind that reviews contracts, flags risks, and surfaces relevant case law in minutes.",
    results: [{ metric: "40x", label: "Faster doc review" }, { metric: "97%", label: "Accuracy rate" }, { metric: "$1.8M", label: "Annual savings" }],
  },
  {
    company: "Cloudpath Logistics", industry: "Supply Chain", color: "#10b981",
    challenge: "12 operations staff manually routing 3,000+ shipments daily with constant exception handling.",
    solution: "AutoFlow agent fleet handles order intake, routing logic, carrier selection, and customer notifications — fully autonomous.",
    results: [{ metric: "12 agents", label: "Replace 8 FTEs" }, { metric: "99.7%", label: "SLA compliance" }, { metric: "$2.1M", label: "Saved annually" }],
  },
];

function CaseStudies() {
  return (
    <section id="work" aria-label="Case studies" className="py-16 md:py-24 max-w-7xl mx-auto px-4 md:px-6">
      <Reveal>
        <div className="text-center mb-14">
          <p className="text-[#10b981] text-xs font-semibold tracking-widest uppercase mb-4">Proof of Work</p>
          <h2 className="text-4xl md:text-5xl font-space font-bold">
            Real Clients. <span className="gradient-text">Real Numbers.</span>
          </h2>
          <p className="text-slate-400 mt-3 max-w-lg mx-auto">We don't do pilots that never go to production. Every engagement ships.</p>
        </div>
      </Reveal>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cases.map((c, i) => (
          <Reveal key={c.company} delay={i * 0.1}>
            <article className="glass rounded-2xl overflow-hidden hover-lift h-full flex flex-col">
              <div className="h-1.5 w-full" style={{ background: `linear-gradient(90deg, ${c.color}, transparent)` }} />
              <div className="p-7 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-5">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ background: `${c.color}15`, color: c.color }}>{c.industry}</span>
                  <ExternalLink size={13} className="text-slate-700" />
                </div>
                <h3 className="font-space font-bold text-lg mb-4">{c.company}</h3>
                <div className="mb-3">
                  <p className="text-xs text-slate-600 uppercase tracking-widest mb-2">Challenge</p>
                  <p className="text-sm text-slate-400 leading-relaxed">{c.challenge}</p>
                </div>
                <div className="mb-6 flex-1">
                  <p className="text-xs text-slate-600 uppercase tracking-widest mb-2">Solution</p>
                  <p className="text-sm text-slate-400 leading-relaxed">{c.solution}</p>
                </div>
                <div className="grid grid-cols-3 gap-2 pt-4 border-t border-[rgba(255,255,255,0.05)]">
                  {c.results.map(r => (
                    <div key={r.label} className="text-center">
                      <div className="font-space font-black text-lg" style={{ color: c.color }}>{r.metric}</div>
                      <div className="text-xs text-slate-600 leading-tight">{r.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ─── Pricing ──────────────────────────────────────────────────────────────────
const plans = [
  {
    name: "AI Pilot",
    price: "$15K",
    period: "one-time / 6 weeks",
    color: "#00d4ff",
    highlight: false,
    desc: "Pick one high-impact process. We'll automate it, measure the ROI, and hand you a roadmap for the rest.",
    includes: [
      "1 production AI agent or workflow",
      "DataMind or AutoFlow integration",
      "ROI measurement & reporting",
      "6-week dedicated delivery",
      "Handover documentation & training",
    ],
    cta: "Start a Pilot",
  },
  {
    name: "Growth",
    price: "$8K",
    period: "/ month",
    color: "#7c3aed",
    highlight: true,
    desc: "An embedded AI engineering team. We continuously build, deploy, and improve AI systems across your business.",
    includes: [
      "Everything in Pilot",
      "Full AgentOS deployment",
      "Up to 10 active AI agents",
      "Monthly strategy & roadmap sessions",
      "Dedicated Slack channel & support",
      "Priority access to new products",
    ],
    cta: "Talk to Sales",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "annual contract",
    color: "#10b981",
    highlight: false,
    desc: "Full-scale AI transformation. Multi-product deployment, custom integrations, and a dedicated team.",
    includes: [
      "Everything in Growth",
      "All 4 products deployed",
      "Unlimited AI agents",
      "On-site strategy workshops",
      "SOC2 / compliance support",
      "SLA-backed uptime guarantees",
    ],
    cta: "Contact Enterprise",
  },
];

function Pricing() {
  return (
    <section id="pricing" aria-label="Pricing" className="py-24 relative">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 70% 50%, rgba(0,212,255,0.05) 0%, transparent 60%)" }} />
      <div className="max-w-6xl mx-auto px-4 md:px-6 relative">
        <Reveal>
          <div className="text-center mb-14">
            <p className="text-[#f59e0b] text-xs font-semibold tracking-widest uppercase mb-4">Transparent Pricing</p>
            <h2 className="text-4xl md:text-5xl font-space font-bold">
              Start Small. <span className="gradient-text">Scale Fast.</span>
            </h2>
            <p className="text-slate-400 mt-3 max-w-lg mx-auto">No retainers for retainers' sake. Every tier is tied to deliverables.</p>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 0.1}>
              <div className={`rounded-3xl p-8 flex flex-col h-full relative ${plan.highlight ? "gradient-border" : "glass"}`}
                style={plan.highlight ? { background: "rgba(124,58,237,0.1)" } : {}}>
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold bg-[#7c3aed] text-white">
                    Most Popular
                  </div>
                )}
                <div className="mb-6">
                  <p className="text-sm font-semibold text-slate-400 mb-2">{plan.name}</p>
                  <div className="flex items-end gap-1 mb-1">
                    <span className="text-4xl font-space font-black" style={{ color: plan.color }}>{plan.price}</span>
                    <span className="text-slate-500 text-sm mb-1">{plan.period}</span>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">{plan.desc}</p>
                </div>
                <div className="space-y-3 flex-1 mb-8">
                  {plan.includes.map(f => (
                    <div key={f} className="flex items-start gap-2.5">
                      <CheckCircle2 size={14} className="mt-0.5 flex-shrink-0" style={{ color: plan.color }} />
                      <span className="text-sm text-slate-300">{f}</span>
                    </div>
                  ))}
                </div>
                <a href="#get-started"
                  className="w-full py-3.5 rounded-xl font-bold text-center block transition-all hover:opacity-90"
                  style={plan.highlight ? { background: plan.color, color: "#0a0a0f" } : { border: `1px solid ${plan.color}40`, color: plan.color }}>
                  {plan.cta}
                </a>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.3}>
          <p className="text-center text-sm text-slate-600 mt-8">
            All plans include a free 30-min strategy call before any commitment. &nbsp;
            <a href="#get-started" className="text-[#00d4ff] hover:underline">Schedule yours →</a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Multi-Step Lead Form ──────────────────────────────────────────────────────
const steps = [
  {
    title: "What's your role?",
    key: "role",
    options: ["CEO / Founder", "CTO / VP Engineering", "COO / VP Operations", "VP Sales / Marketing", "Other Executive"],
  },
  {
    title: "What's your biggest AI challenge?",
    key: "challenge",
    options: [
      "Too many manual processes slowing us down",
      "Customer support can't scale",
      "Data is siloed — we can't act on it",
      "Competitors are moving faster with AI",
      "Engineering team is overloaded",
      "We need to justify AI ROI to leadership",
    ],
  },
  {
    title: "How large is your team?",
    key: "size",
    options: ["1–10 people", "11–50 people", "51–200 people", "201–1,000 people", "1,000+ people"],
  },
  {
    title: "When do you need this live?",
    key: "timeline",
    options: ["ASAP (within weeks)", "1–3 months", "3–6 months", "Just exploring for now"],
  },
];

function GetStarted() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [contact, setContact] = useState({ name: "", email: "", company: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (val: string) => {
    const newAnswers = { ...answers, [steps[step].key]: val };
    setAnswers(newAnswers);
    if (step < steps.length - 1) setTimeout(() => setStep(s => s + 1), 300);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="get-started" aria-label="Get started with Impression Labz" className="py-24 relative">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(0,212,255,0.07) 0%, transparent 60%)" }} />
      <div className="max-w-2xl mx-auto px-4 md:px-6 relative">
        <Reveal>
          <div className="text-center mb-12">
            <p className="text-[#00d4ff] text-xs font-semibold tracking-widest uppercase mb-4">Let's Build Together</p>
            <h2 className="text-4xl md:text-5xl font-space font-bold mb-3">
              Start Your <span className="gradient-text">AI Journey</span>
            </h2>
            <p className="text-slate-400">Answer 4 quick questions — we'll match you to the right product and schedule a call.</p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="glass rounded-3xl p-8 gradient-border">
            {submitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10">
                <div className="text-6xl mb-5">🤖</div>
                <h3 className="font-space font-bold text-2xl mb-3">You're on the list.</h3>
                <p className="text-slate-400 mb-2">We'll reach out to <span className="text-[#00d4ff]">{contact.email}</span> within 24 hours to schedule your strategy call.</p>
                <p className="text-sm text-slate-600">In the meantime, check out our case studies above.</p>
              </motion.div>
            ) : step < steps.length ? (
              <div>
                {/* Progress */}
                <div className="flex gap-1.5 mb-8">
                  {steps.map((_, i) => (
                    <div key={i} className="flex-1 h-1 rounded-full transition-all duration-500"
                      style={{ background: i <= step ? "#00d4ff" : "rgba(255,255,255,0.08)" }} />
                  ))}
                </div>
                <AnimatePresence mode="wait">
                  <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <p className="text-xs text-slate-600 uppercase tracking-widest mb-2">Step {step + 1} of {steps.length}</p>
                    <h3 className="font-space font-bold text-xl mb-6">{steps[step].title}</h3>
                    <div className="space-y-3">
                      {steps[step].options.map(opt => (
                        <button key={opt} onClick={() => handleSelect(opt)}
                          className={`w-full text-left px-5 py-4 rounded-xl border transition-all text-sm hover:border-[#00d4ff] hover:text-[#00d4ff] ${answers[steps[step].key] === opt ? "border-[#00d4ff] text-[#00d4ff] bg-[rgba(0,212,255,0.06)]" : "border-[rgba(255,255,255,0.08)] text-slate-300 bg-[rgba(255,255,255,0.02)]"}`}>
                          {opt}
                        </button>
                      ))}
                    </div>
                    {step > 0 && (
                      <button onClick={() => setStep(s => s - 1)} className="mt-5 text-sm text-slate-600 hover:text-slate-400 transition-colors">
                        ← Back
                      </button>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            ) : (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <div className="flex gap-1.5 mb-8">
                  {steps.map((_, i) => <div key={i} className="flex-1 h-1 rounded-full bg-[#00d4ff]" />)}
                </div>
                <h3 className="font-space font-bold text-xl mb-2">Almost there!</h3>
                <p className="text-slate-400 text-sm mb-6">Where should we send your custom AI roadmap?</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {[
                    { key: "name", placeholder: "Your full name", type: "text" },
                    { key: "company", placeholder: "Company name", type: "text" },
                    { key: "email", placeholder: "Work email address", type: "email" },
                  ].map(f => (
                    <input key={f.key} type={f.type} required placeholder={f.placeholder}
                      className="w-full bg-[rgba(255,255,255,0.04)] border border-[rgba(0,212,255,0.15)] rounded-xl px-4 py-3.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-[#00d4ff] transition-colors"
                      value={contact[f.key as keyof typeof contact]}
                      onChange={e => setContact({ ...contact, [f.key]: e.target.value })} />
                  ))}
                  <button type="submit"
                    className="w-full py-4 rounded-xl font-bold text-[#0a0a0f] bg-[#00d4ff] hover:bg-white transition-all flex items-center justify-center gap-2">
                    Book My Strategy Call <Calendar size={16} />
                  </button>
                  <p className="text-xs text-slate-600 text-center">No spam. No sales pressure. Just an honest conversation.</p>
                </form>
                <button onClick={() => setStep(s => s - 1)} className="mt-3 text-sm text-slate-600 hover:text-slate-400 transition-colors">
                  ← Back
                </button>
              </motion.div>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="flex items-center justify-center gap-8 mt-8 text-sm text-slate-600">
            <a href="mailto:theo@impressionlabz.com" className="flex items-center gap-2 hover:text-[#00d4ff] transition-colors">
              <Mail size={14} /> theo@impressionlabz.com
            </a>
            <a href="https://github.com/theo-impressionlabz" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-[#00d4ff] transition-colors">
              <Github size={14} /> GitHub
            </a>
          </div>
        </Reveal>
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
    <div className="border-y border-[rgba(0,212,255,0.06)] py-6">
      <div className="max-w-5xl mx-auto px-4 md:px-6 grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4">
        {trust.map(t => (
          <div key={t.text} className="flex flex-col items-center gap-2 text-center">
            <t.icon size={18} className="text-[#00d4ff] opacity-70" />
            <span className="text-xs text-slate-600 font-medium">{t.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer role="contentinfo" className="border-t border-[rgba(0,212,255,0.06)] pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg gradient-border flex items-center justify-center text-xs font-bold text-[#00d4ff]">IL</div>
              <span className="font-space font-semibold">Impression <span className="text-[#00d4ff]">Labz</span></span>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">Where human intelligence meets machine precision. California, USA.</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">Products</p>
            <div className="space-y-2.5">
              {products.map(p => <a key={p.name} href="#products" className="block text-sm text-slate-600 hover:text-slate-300 transition-colors">{p.name}</a>)}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">Solutions</p>
            <div className="space-y-2.5">
              {roles.map(r => <a key={r.role} href="#solutions" className="block text-sm text-slate-600 hover:text-slate-300 transition-colors">{r.role}</a>)}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">Company</p>
            <div className="space-y-2.5">
              {[["Pricing", "#pricing"], ["Case Studies", "#work"], ["GitHub", "https://github.com/theo-impressionlabz"], ["Email", "mailto:theo@impressionlabz.com"], ["llms.txt", "/llms.txt"]].map(([label, href]) => (
                <a key={label} href={href} className="block text-sm text-slate-600 hover:text-slate-300 transition-colors">{label}</a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-[rgba(255,255,255,0.04)] pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-700">
          <span>© {new Date().getFullYear()} Impression Labz. All rights reserved.</span>
          <span>Built with OpenClaw 🦞 · Deployed on GitHub Pages · California, USA</span>
        </div>
      </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <main>
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
