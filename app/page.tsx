"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Brain, Bot, Zap, Target, ArrowRight, Github, Mail,
  ChevronDown, Cpu, Globe, Shield, Sparkles, Menu, X, ExternalLink
} from "lucide-react";

// ─── Typewriter ──────────────────────────────────────────────────────────────
function Typewriter({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[index];
    if (!deleting && subIndex === current.length) {
      setTimeout(() => setDeleting(true), 2000);
      return;
    }
    if (deleting && subIndex === 0) {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
      return;
    }
    const timeout = setTimeout(() => {
      setSubIndex((s) => s + (deleting ? -1 : 1));
    }, deleting ? 40 : 80);
    return () => clearTimeout(timeout);
  }, [subIndex, deleting, index, words]);

  return (
    <span>
      <span className="gradient-text">{words[index].substring(0, subIndex)}</span>
      <span className="cursor" />
    </span>
  );
}

// ─── Particles ───────────────────────────────────────────────────────────────
function Particles() {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 15}s`,
    duration: `${10 + Math.random() * 20}s`,
    size: `${1 + Math.random() * 3}px`,
  }));

  return (
    <div className="particle-field">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            animationDelay: p.delay,
            animationDuration: p.duration,
            width: p.size,
            height: p.size,
          }}
        />
      ))}
    </div>
  );
}

// ─── Reveal ──────────────────────────────────────────────────────────────────
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
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
    <nav
      aria-label="Main navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass border-b border-[rgba(0,212,255,0.1)] py-3" : "py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-lg gradient-border flex items-center justify-center text-sm font-bold text-[#00d4ff] font-space">
            IL
          </div>
          <span className="font-space font-semibold text-lg tracking-tight">
            Impression <span className="text-[#00d4ff]">Labz</span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8 text-sm text-slate-400">
          {["Services", "Work", "About", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="hover:text-[#00d4ff] transition-colors"
            >
              {item}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#contact"
          className="hidden md:flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium bg-[#00d4ff] text-[#0a0a0f] hover:bg-white transition-colors"
        >
          Get Started <ArrowRight size={14} />
        </a>

        {/* Mobile toggle */}
        <button className="md:hidden text-slate-400" onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-[rgba(0,212,255,0.1)] px-6 py-4 flex flex-col gap-4"
          >
            {["Services", "Work", "About", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-slate-300 hover:text-[#00d4ff]"
                onClick={() => setOpen(false)}
              >
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      id="hero"
      aria-label="Hero — Impression Labz AI Solutions"
      className="relative min-h-screen flex items-center justify-center grid-bg overflow-hidden"
    >
      <div className="scan-line" />
      <Particles />

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(124,58,237,0.12) 0%, rgba(0,212,255,0.06) 40%, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center pt-24">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-medium text-slate-400 mb-8 border border-[rgba(0,212,255,0.2)]"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
          Based in California 🌴 &nbsp;·&nbsp; Powered by AI 🤖
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-space font-bold leading-tight mb-6"
        >
          Building the Future of
          <br />
          <Typewriter words={["AI Solutions", "Agent Enablement", "Platform Intelligence", "OpenClaw Agents"]} />
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Where human intelligence meets machine precision. We craft AI systems that think,
          act, and evolve — so your platforms do too.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-center gap-4 flex-wrap"
        >
          <a
            href="#contact"
            className="flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-[#0a0a0f] bg-[#00d4ff] hover:bg-white transition-all hover:scale-105 glow-box-cyan"
          >
            Start a Project <ArrowRight size={16} />
          </a>
          <a
            href="#work"
            className="flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-[#00d4ff] border border-[#00d4ff] hover:bg-[rgba(0,212,255,0.08)] transition-all"
          >
            See Our Work
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="mt-24 flex justify-center text-slate-600"
        >
          <ChevronDown size={24} />
        </motion.div>
      </div>
    </section>
  );
}

// ─── Services ─────────────────────────────────────────────────────────────────
const services = [
  {
    icon: Brain,
    title: "Platform AI",
    color: "#00d4ff",
    desc: "Embed intelligence directly into your existing platforms. From recommendation engines to real-time decision systems — we make your software think.",
    tags: ["LLM Integration", "RAG Pipelines", "Custom Models"],
  },
  {
    icon: Bot,
    title: "OpenClaw Agents",
    color: "#7c3aed",
    desc: "Custom autonomous agents built on the OpenClaw framework. Multi-modal, memory-equipped, and ready to handle complex real-world workflows.",
    tags: ["Autonomous Agents", "Tool Use", "Multi-Agent"],
  },
  {
    icon: Zap,
    title: "Agent Enablement",
    color: "#10b981",
    desc: "Deploy, train, and scale AI agents across your organization. We handle the infrastructure so your team can focus on outcomes.",
    tags: ["Deployment", "Monitoring", "Training"],
  },
  {
    icon: Target,
    title: "AI Consulting",
    color: "#f59e0b",
    desc: "Strategic AI roadmaps tailored to your business. We identify high-impact opportunities and build the path from prototype to production.",
    tags: ["Strategy", "Roadmapping", "ROI Analysis"],
  },
];

function Services() {
  return (
    <section id="services" aria-label="Services" className="py-32 max-w-7xl mx-auto px-6">
      <Reveal>
        <div className="text-center mb-16">
          <p className="text-[#00d4ff] text-sm font-medium tracking-widest uppercase mb-4">What We Build</p>
          <h2 className="text-4xl md:text-5xl font-space font-bold mb-4">
            AI Solutions That <span className="gradient-text">Actually Work</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Every engagement starts with understanding your problem. We build solutions that fit your reality, not the other way around.
          </p>
        </div>
      </Reveal>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.1}>
            <article
              aria-label={`Service: ${s.title}`}
              className="glass rounded-2xl p-6 hover-lift gradient-border group cursor-default h-full flex flex-col"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ background: `${s.color}15`, border: `1px solid ${s.color}30` }}
              >
                <s.icon size={22} style={{ color: s.color }} />
              </div>
              <h3 className="font-space font-bold text-lg mb-3">{s.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed flex-1">{s.desc}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {s.tags.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2 py-1 rounded-full"
                    style={{ background: `${s.color}10`, color: s.color, border: `1px solid ${s.color}25` }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ─── How We Work ──────────────────────────────────────────────────────────────
const steps = [
  { step: "01", title: "Discover", color: "#00d4ff", desc: "We audit your stack, understand your goals, and map the AI opportunity landscape for your business." },
  { step: "02", title: "Build", color: "#7c3aed", desc: "Our team ships fast. Prototype in week one, production-ready system within weeks — not quarters." },
  { step: "03", title: "Deploy & Scale", color: "#10b981", desc: "We don't just hand over code. We deploy, monitor, and iterate until your system performs at scale." },
];

function HowWeWork() {
  return (
    <section aria-label="Our process" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(124,58,237,0.08) 0%, transparent 70%)" }}
      />
      <div className="max-w-6xl mx-auto px-6 relative">
        <Reveal>
          <div className="text-center mb-16">
            <p className="text-[#7c3aed] text-sm font-medium tracking-widest uppercase mb-4">The Process</p>
            <h2 className="text-4xl md:text-5xl font-space font-bold">
              From Idea to <span className="gradient-text">Production</span>
            </h2>
          </div>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((s, i) => (
            <Reveal key={s.step} delay={i * 0.15}>
              <div className="relative">
                <div className="text-7xl font-space font-black opacity-5 absolute -top-4 -left-2"
                  style={{ color: s.color }}>{s.step}</div>
                <div className="glass rounded-2xl p-8 relative">
                  <div className="text-sm font-mono mb-3" style={{ color: s.color }}>STEP {s.step}</div>
                  <h3 className="font-space font-bold text-2xl mb-3">{s.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{s.desc}</p>
                  <div className="mt-6 w-8 h-0.5 rounded" style={{ background: s.color }} />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Projects ─────────────────────────────────────────────────────────────────
const projects = [
  {
    title: "NeuralShift Commerce",
    tag: "Platform AI",
    color: "#00d4ff",
    desc: "Deployed a real-time product recommendation engine for a $200M e-commerce brand. Achieved 34% uplift in conversion within 90 days using hybrid collaborative filtering + LLM reranking.",
    metrics: ["+34% CVR", "90-day delivery", "200M GMV"],
  },
  {
    title: "AgentOps Fleet",
    tag: "OpenClaw Agents",
    color: "#7c3aed",
    desc: "Built a fleet of 12 coordinated OpenClaw agents for a logistics company. Agents handle order tracking, customer communication, and exception routing — fully autonomous, 24/7.",
    metrics: ["12 agents", "99.7% uptime", "$2M saved/yr"],
  },
  {
    title: "Aria — Legal AI",
    tag: "Agent Enablement",
    color: "#10b981",
    desc: "Enabled a 300-person law firm with AI agents for contract review, due diligence, and research. Reduced document processing time from 8 hours to 12 minutes.",
    metrics: ["97% accuracy", "40x faster", "300 users"],
  },
];

function Projects() {
  return (
    <section id="work" aria-label="Featured projects" className="py-24 max-w-7xl mx-auto px-6">
      <Reveal>
        <div className="text-center mb-16">
          <p className="text-[#10b981] text-sm font-medium tracking-widest uppercase mb-4">Case Studies</p>
          <h2 className="text-4xl md:text-5xl font-space font-bold">
            Work That <span className="gradient-text">Moves Numbers</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto">Real systems. Real results. No slides-only engagements.</p>
        </div>
      </Reveal>

      <div className="grid md:grid-cols-3 gap-8">
        {projects.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.1}>
            <article aria-label={`Project: ${p.title}`}
              className="glass rounded-2xl p-7 hover-lift flex flex-col h-full group"
              style={{ borderTop: `2px solid ${p.color}` }}
            >
              <div className="flex items-center justify-between mb-5">
                <span className="text-xs font-medium px-3 py-1 rounded-full"
                  style={{ background: `${p.color}15`, color: p.color }}>
                  {p.tag}
                </span>
                <ExternalLink size={14} className="text-slate-600 group-hover:text-slate-400 transition-colors" />
              </div>
              <h3 className="font-space font-bold text-xl mb-3">{p.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed flex-1">{p.desc}</p>
              <div className="flex gap-3 mt-6 flex-wrap">
                {p.metrics.map((m) => (
                  <div key={m} className="text-xs font-mono font-bold px-3 py-1.5 rounded-lg"
                    style={{ background: `${p.color}10`, color: p.color }}>
                    {m}
                  </div>
                ))}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ─── Tech Stack ───────────────────────────────────────────────────────────────
const tech = [
  { name: "OpenClaw", icon: "🦞", desc: "Agent framework" },
  { name: "Claude", icon: "🤖", desc: "AI backbone" },
  { name: "Next.js", icon: "▲", desc: "Web platform" },
  { name: "Vercel", icon: "⚡", desc: "Deployment" },
  { name: "Python", icon: "🐍", desc: "ML pipeline" },
  { name: "PostgreSQL", icon: "🐘", desc: "Data layer" },
  { name: "Redis", icon: "⚡", desc: "Caching" },
  { name: "Docker", icon: "🐳", desc: "Infrastructure" },
];

function TechStack() {
  return (
    <section aria-label="Technology stack" className="py-20 border-y border-[rgba(0,212,255,0.08)]">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <p className="text-center text-slate-500 text-sm uppercase tracking-widest mb-10">Built on the best</p>
        </Reveal>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
          {tech.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.05}>
              <div className="glass rounded-xl p-4 text-center hover-lift group">
                <div className="text-2xl mb-2">{t.icon}</div>
                <div className="text-xs font-semibold text-slate-300">{t.name}</div>
                <div className="text-xs text-slate-600 mt-0.5">{t.desc}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────
function About() {
  return (
    <section id="about" aria-label="About Impression Labz" className="py-32 max-w-7xl mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <Reveal>
          <div>
            <p className="text-[#00d4ff] text-sm font-medium tracking-widest uppercase mb-4">Our Story</p>
            <h2 className="text-4xl md:text-5xl font-space font-bold mb-6">
              Humans who believe in <span className="gradient-text">machines</span>
            </h2>
            <p className="text-slate-400 leading-relaxed mb-4">
              Impression Labz was born from a simple conviction: AI isn't a replacement for human intelligence — it's an amplifier of it. We're a California-based team of engineers, strategists, and researchers who've spent years at the frontier of AI.
            </p>
            <p className="text-slate-400 leading-relaxed mb-8">
              We build with OpenClaw at our core — enabling autonomous agents that collaborate, reason, and execute. Our systems aren't black boxes. They're transparent, auditable, and designed to work alongside your team.
            </p>
            <div className="flex gap-8">
              {[["40+", "Projects Shipped"], ["3", "Years in AI"], ["99%", "Client Retention"]].map(([n, l]) => (
                <div key={l}>
                  <div className="text-3xl font-space font-black text-[#00d4ff]">{n}</div>
                  <div className="text-sm text-slate-500">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="relative">
            <div className="glass rounded-3xl p-8 gradient-border">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
                <span className="text-xs font-mono text-slate-500">system.status = ONLINE</span>
              </div>
              {[
                { label: "Mission", value: "Democratize enterprise AI" },
                { label: "Location", value: "California, USA 🌴" },
                { label: "Stack", value: "OpenClaw + Claude + Next.js" },
                { label: "Contact", value: "theo@impressionlabz.com" },
                { label: "Philosophy", value: "Human + Machine = ∞" },
              ].map((row) => (
                <div key={row.label} className="flex justify-between py-3 border-b border-[rgba(0,212,255,0.08)] last:border-0">
                  <span className="text-sm text-slate-500 font-mono">{row.label}</span>
                  <span className="text-sm text-slate-300">{row.value}</span>
                </div>
              ))}
            </div>
            {/* Floating orbs */}
            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-20 blur-2xl"
              style={{ background: "#00d4ff" }} />
            <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full opacity-20 blur-2xl"
              style={{ background: "#7c3aed" }} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────
function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact" aria-label="Contact Impression Labz" className="py-32 relative">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(0,212,255,0.06) 0%, transparent 60%)" }}
      />
      <div className="max-w-3xl mx-auto px-6 relative">
        <Reveal>
          <div className="text-center mb-12">
            <p className="text-[#00d4ff] text-sm font-medium tracking-widest uppercase mb-4">Let's Build</p>
            <h2 className="text-4xl md:text-5xl font-space font-bold mb-4">
              Ready to <span className="gradient-text">Get Started?</span>
            </h2>
            <p className="text-slate-400">
              Tell us what you're building. We'll respond within 24 hours.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="glass rounded-3xl p-8 gradient-border">
            {sent ? (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">🤖</div>
                <h3 className="font-space font-bold text-2xl mb-2">Message received!</h3>
                <p className="text-slate-400">We'll be in touch within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs text-slate-500 uppercase tracking-widest mb-2 block">Name</label>
                    <input
                      type="text" required placeholder="Your name"
                      className="w-full bg-[rgba(255,255,255,0.04)] border border-[rgba(0,212,255,0.15)] rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-[#00d4ff] transition-colors"
                      value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 uppercase tracking-widest mb-2 block">Email</label>
                    <input
                      type="email" required placeholder="your@company.com"
                      className="w-full bg-[rgba(255,255,255,0.04)] border border-[rgba(0,212,255,0.15)] rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-[#00d4ff] transition-colors"
                      value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-slate-500 uppercase tracking-widest mb-2 block">What are you building?</label>
                  <textarea
                    required rows={5} placeholder="Tell us about your project, team size, and timeline..."
                    className="w-full bg-[rgba(255,255,255,0.04)] border border-[rgba(0,212,255,0.15)] rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-[#00d4ff] transition-colors resize-none"
                    value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl font-semibold text-[#0a0a0f] bg-[#00d4ff] hover:bg-white transition-all flex items-center justify-center gap-2"
                >
                  Send Message <ArrowRight size={16} />
                </button>
              </form>
            )}

            <div className="mt-8 pt-6 border-t border-[rgba(0,212,255,0.08)] flex items-center justify-center gap-6 text-sm text-slate-500">
              <a href="mailto:theo@impressionlabz.com"
                className="flex items-center gap-2 hover:text-[#00d4ff] transition-colors">
                <Mail size={14} /> theo@impressionlabz.com
              </a>
              <a href="https://github.com/theo-impressionlabz" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#00d4ff] transition-colors">
                <Github size={14} /> GitHub
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer role="contentinfo" className="border-t border-[rgba(0,212,255,0.08)] py-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-600">
        <div className="flex items-center gap-2">
          <span className="font-space font-semibold text-slate-400">Impression <span className="text-[#00d4ff]">Labz</span></span>
          <span>·</span>
          <span>California, USA</span>
        </div>
        <div>© {new Date().getFullYear()} Impression Labz. All rights reserved.</div>
        <div className="flex gap-4">
          <a href="/llms.txt" className="hover:text-slate-400 transition-colors flex items-center gap-1">
            <Cpu size={12} /> llms.txt
          </a>
          <a href="/sitemap.xml" className="hover:text-slate-400 transition-colors flex items-center gap-1">
            <Globe size={12} /> Sitemap
          </a>
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
      <Services />
      <HowWeWork />
      <Projects />
      <TechStack />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
