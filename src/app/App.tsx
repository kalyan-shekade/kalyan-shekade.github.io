import { useState, useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
} from "motion/react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import kalyanPhoto from "@/imports/KalyanShekade.jpg";
import { Mail, Phone, MapPin, ExternalLink, ChevronDown, Award } from "lucide-react";

// ─── Static Data ──────────────────────────────────────────────────────────────

const HERO_WORDS = ["UI/UX", "Designer.", "Creative", "Director.", "Visual", "Storyteller."];

const STATS = [
  { value: 16, suffix: "+", label: "Years" },
  { value: 9, suffix: "", label: "Awards" },
  { value: 4, suffix: "", label: "Agencies" },
  { value: 50, suffix: "+", label: "Brands" },
];

const CLIENTS = [
  "Godrej", "Kellogg's", "Reebok", "Air Asia", "Asian Paints", "Tata Housing",
  "MTV", "Emirates", "McDonald's", "Reliance", "Vicks", "Mahindra", "3M",
  "London Dairy", "Sterling Holidays", "Shapoorji Pallonji", "LIC",
];

const EXPERTISE_TAGS = [
  "UI/UX Design", "Figma", "Adobe XD", "Photoshop", "Illustrator",
  "After Effects", "Wireframing", "Branding", "HTML5 Banners",
  "Web Interactive", "Team Leadership", "Motion Design", "GWD", "CSS3",
];

const EXPERIENCE = [
  {
    period: "Apr 2024 — Present",
    role: "Assistant Vice President",
    company: "ANAROCK Digital",
    current: true,
    desc: "Leading creative UI/UX direction for India's largest proptech platform, driving campaigns for premium real-estate developers.",
    tags: ["Figma", "Adobe XD", "After Effects", "Team Lead", "Wireframe"],
  },
  {
    period: "Aug 2021 — Mar 2024",
    role: "Sr. Manager — Creative UI/UX",
    company: "ANAROCK Property Consultants",
    current: false,
    desc: "Spearheaded digital marketing design for marquee real estate brands. Led creative ideation, pitches, and cross-functional teams.",
    tags: ["UI/UX", "Photoshop Animation", "Social Media", "Pitches"],
  },
  {
    period: "Jun 2017 — Jul 2021",
    role: "Senior Creative Manager",
    company: "NetBiz System Pvt. Ltd.",
    current: false,
    desc: "Managed creative output for 15+ global and Indian brands. Built and mentored a design team of 8 across digital channels.",
    tags: ["UI/UX", "FB Apps", "Flash Animation", "Brand Design"],
  },
  {
    period: "Jan 2013 — Jun 2017",
    role: "Art Supervisor / Sr. Designer",
    company: "Isobar India — Dentsu Aegis",
    current: false,
    desc: "Won industry recognition including the Isobar Grant Prix. Designed award-winning interactive campaigns for FMCG giants.",
    tags: ["Interactive Design", "Banners", "Social Media", "Flash"],
  },
  {
    period: "Jun 2008 — Dec 2012",
    role: "Senior Designer",
    company: "Tribal DDB India — Mudra Group",
    current: false,
    desc: "Conceptualized and executed digital campaigns for Idea, Reliance, McDonald's. Won multiple ABBYs and WAT Awards.",
    tags: ["Layout Design", "HTML", "CSS", "Flash ActionScript"],
  },
];

const SOFTWARE = [
  { name: "Adobe Photoshop", pct: 95, color: "#31A8FF" },
  { name: "Figma", pct: 95, color: "#A259FF" },
  { name: "Adobe XD", pct: 90, color: "#FF61F6" },
  { name: "Adobe Illustrator", pct: 88, color: "#FF7C00" },
  { name: "After Effects", pct: 82, color: "#9999FF" },
  { name: "Adobe Premiere", pct: 75, color: "#EA77FF" },
];

const AWARDS = [
  { year: "2015", title: "Isobar Grant Prix — Future Face Competition", tier: "Grand", icon: "🏆" },
  { year: "2010", title: "BBC Campaign India — Use Mobile Save Paper (B2C Best Integrated)", tier: "Gold", icon: "🥇" },
  { year: "2012", title: "ABBYs — Fox Action Movie Interactive Web Banner", tier: "Silver", icon: "🥈" },
  { year: "2012", title: "ABBYs — Vardenchi Website (Best Product Website)", tier: "Bronze", icon: "🥉" },
  { year: "2011", title: "ABBYs — Idea Roadie Mobile Challenge 3.0", tier: "Silver", icon: "🥈" },
  { year: "2011", title: "Olive Crown Green Awards — Use Mobile Save Paper", tier: "Silver", icon: "🥈" },
  { year: "2011", title: "WAT Awards — Idea Cellular Language Barrier", tier: "Silver", icon: "🥈" },
  { year: "2011", title: "WAT Awards — Idea Mobile Roadie Hunt", tier: "Silver", icon: "🥈" },
  { year: "2010", title: "BBC Campaign India — Technology & Telecoms", tier: "Silver", icon: "🥈" },
];

const TIER_COLORS: Record<string, string> = {
  Grand: "#FFB800",
  Gold: "#FFD700",
  Silver: "#C0C0C0",
  Bronze: "#CD7F32",
};

// ─── Hooks ────────────────────────────────────────────────────────────────────

function useCounter(target: number, active: boolean, duration = 1400) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setVal(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(step);
      else setVal(target);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return val;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function AnimCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const count = useCounter(value, inView);
  return (
    <div ref={ref} className="text-center group">
      <p
        className="text-5xl lg:text-6xl font-black leading-none mb-1"
        style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
      >
        <span className="bg-gradient-to-br from-[#00D4B8] to-[#6C63FF] bg-clip-text text-transparent">
          {count}{suffix}
        </span>
      </p>
      <p className="text-xs text-white/40 tracking-[0.2em] uppercase" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
        {label}
      </p>
    </div>
  );
}

function SkillBar({ name, pct, color, index }: { name: string; pct: number; color: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.07, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <div className="flex justify-between mb-2">
        <span className="text-sm text-white/70 group-hover:text-white transition-colors" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
          {name}
        </span>
        <span className="text-xs font-mono" style={{ color, fontFamily: "'JetBrains Mono', monospace" }}>
          {pct}%
        </span>
      </div>
      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}90, ${color})` }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${pct}%` } : {}}
          transition={{ delay: index * 0.07 + 0.2, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </motion.div>
  );
}

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SectionTitle({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <div className="mb-16">
      <p className="text-xs text-[#00D4B8] mb-3 tracking-[0.3em] uppercase" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
        {index}
      </p>
      <h2
        className="text-4xl lg:text-6xl font-black leading-none"
        style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
      >
        {children}
      </h2>
    </div>
  );
}

// ─── Marquee ─────────────────────────────────────────────────────────────────

function Marquee({ items }: { items: string[] }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden py-4 border-y border-white/5">
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-8 text-xs text-white/25 tracking-[0.25em] uppercase flex-shrink-0" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            {item}
            <span className="w-1 h-1 rounded-full bg-[#00D4B8]/40" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ─── Rotating words hero text ─────────────────────────────────────────────────

function RotatingWord() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % HERO_WORDS.length), 2200);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="relative inline-block overflow-hidden h-[1.1em]">
      <motion.span
        key={index}
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "-100%", opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="inline-block bg-gradient-to-r from-[#00D4B8] via-[#6C63FF] to-[#00D4B8] bg-clip-text text-transparent bg-[length:200%_auto]"
        style={{ animation: "shimmer 3s linear infinite" }}
      >
        {HERO_WORDS[index]}
      </motion.span>
    </span>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Smooth cursor glow
  const cursorX = useMotionValue(-400);
  const cursorY = useMotionValue(-400);
  const springCfg = { stiffness: 400, damping: 40 };
  const cx = useSpring(cursorX, springCfg);
  const cy = useSpring(cursorY, springCfg);

  useEffect(() => {
    const mv = (e: MouseEvent) => { cursorX.set(e.clientX - 200); cursorY.set(e.clientY - 200); };
    const sc = () => setNavScrolled(window.scrollY > 50);
    window.addEventListener("mousemove", mv);
    window.addEventListener("scroll", sc);
    return () => { window.removeEventListener("mousemove", mv); window.removeEventListener("scroll", sc); };
  }, []);

  const { scrollYProgress } = useScroll({ target: containerRef });
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <>
      {/* Global styles */}
      <style>{`
        @keyframes shimmer { 0%{background-position:0% 50%} 100%{background-position:200% 50%} }
        @keyframes blob {
          0%,100%{border-radius:60% 40% 30% 70%/60% 30% 70% 40%}
          50%{border-radius:30% 60% 70% 40%/50% 60% 30% 60%}
        }
        @keyframes orbit { from{transform:rotate(0deg) translateX(180px) rotate(0deg)} to{transform:rotate(360deg) translateX(180px) rotate(-360deg)} }
        @keyframes orbitR { from{transform:rotate(0deg) translateX(130px) rotate(0deg)} to{transform:rotate(-360deg) translateX(130px) rotate(360deg)} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
        @keyframes pulse-ring { 0%{transform:scale(1);opacity:0.4} 100%{transform:scale(1.6);opacity:0} }
        .blob { animation: blob 8s ease-in-out infinite; }
        .float { animation: float 5s ease-in-out infinite; }
        .shimmer-text { background: linear-gradient(90deg,#00D4B8,#6C63FF,#00D4B8); background-size:200% auto; -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent; animation:shimmer 3s linear infinite; }
        ::-webkit-scrollbar{width:4px} ::-webkit-scrollbar-track{background:transparent} ::-webkit-scrollbar-thumb{background:#00D4B820;border-radius:4px}
        ::-webkit-scrollbar-thumb:hover{background:#00D4B840}
        .noise::after{content:'';position:absolute;inset:0;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");pointer-events:none;z-index:0}
        .glow-border{position:relative} .glow-border::before{content:'';position:absolute;inset:-1px;border-radius:inherit;background:linear-gradient(135deg,#00D4B840,#6C63FF40,#00D4B840);z-index:-1;opacity:0;transition:opacity 0.3s} .glow-border:hover::before{opacity:1}
      `}</style>

      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 h-[2px] z-[100] origin-left"
        style={{ width: progressWidth, background: "linear-gradient(90deg, #00D4B8, #6C63FF)" }}
      />

      {/* Cursor glow */}
      <motion.div
        className="fixed w-[400px] h-[400px] rounded-full pointer-events-none z-[1] hidden lg:block"
        style={{ x: cx, y: cy, background: "radial-gradient(circle, rgba(0,212,184,0.06) 0%, transparent 70%)" }}
      />

      <div ref={containerRef} className="min-h-screen bg-[#07070F] text-white overflow-x-hidden" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>

        {/* ── NAV ── */}
        <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${navScrolled ? "bg-[#07070F]/80 backdrop-blur-2xl border-b border-white/5" : ""}`}>
          <div className="max-w-7xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
            <motion.button
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              onClick={() => scrollTo("hero")}
              className="flex items-center gap-2.5 group"
            >
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#00D4B8] to-[#6C63FF] opacity-80 group-hover:opacity-100 transition-opacity" />
                <span className="relative z-10 flex items-center justify-center w-full h-full text-[10px] font-black text-[#07070F]" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>KS</span>
              </div>
              <span className="text-sm font-semibold hidden sm:block" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>Kalyan T Shekade</span>
            </motion.button>

            <nav className="hidden md:flex items-center gap-8">
              {["about", "experience", "skills", "awards", "contact"].map((s, i) => (
                <motion.button
                  key={s}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  onClick={() => scrollTo(s)}
                  className="text-xs text-white/40 hover:text-[#00D4B8] transition-colors tracking-widest uppercase"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {s}
                </motion.button>
              ))}
            </nav>

            <motion.button
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
              onClick={() => scrollTo("contact")}
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full text-[10px] tracking-[0.15em] uppercase text-[#00D4B8] border border-[#00D4B8]/30 hover:bg-[#00D4B8]/10 transition-all"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              <Mail size={11} /> Hire Me
            </motion.button>

            <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 flex flex-col gap-1.5">
              {[0, 1, 2].map((i) => (
                <span key={i} className={`block h-px bg-white transition-all duration-300 ${i === 0 ? (mobileOpen ? "w-5 rotate-45 translate-y-[6px]" : "w-5") : i === 1 ? (mobileOpen ? "opacity-0 w-5" : "w-3") : (mobileOpen ? "w-5 -rotate-45 -translate-y-[6px]" : "w-5")}`} />
              ))}
            </button>
          </div>

          {mobileOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="md:hidden bg-[#0F0F1C]/95 backdrop-blur-xl border-b border-white/5 px-6 py-4 overflow-hidden">
              {["about", "experience", "skills", "awards", "contact"].map((s) => (
                <button key={s} onClick={() => scrollTo(s)} className="block w-full text-left py-3 text-sm text-white/50 hover:text-[#00D4B8] transition-colors border-b border-white/5 last:border-0 capitalize tracking-widest uppercase text-xs" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  {s}
                </button>
              ))}
            </motion.div>
          )}
        </header>

        {/* ══════════════════════════════════════════════════════════════
            HERO
        ══════════════════════════════════════════════════════════════ */}
        <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
          {/* Background blobs */}
          <div className="absolute top-1/4 -left-40 w-[500px] h-[500px] blob" style={{ background: "radial-gradient(circle, rgba(0,212,184,0.12) 0%, transparent 70%)" }} />
          <div className="absolute bottom-0 -right-40 w-[600px] h-[600px] blob" style={{ background: "radial-gradient(circle, rgba(108,99,255,0.1) 0%, transparent 70%)", animationDelay: "4s" }} />
          <div className="absolute top-0 right-1/3 w-[300px] h-[300px] blob" style={{ background: "radial-gradient(circle, rgba(0,180,245,0.07) 0%, transparent 70%)", animationDelay: "2s" }} />

          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "linear-gradient(#00D4B8 1px, transparent 1px), linear-gradient(90deg, #00D4B8 1px, transparent 1px)", backgroundSize: "80px 80px" }} />

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full pt-24 pb-16">
            <div className="grid lg:grid-cols-[1fr_auto] gap-12 lg:gap-20 items-center">
              {/* Left */}
              <div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#00D4B8]/8 border border-[#00D4B8]/20 mb-10"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00D4B8] opacity-50" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00D4B8]" />
                  </span>
                  <span className="text-[11px] text-[#00D4B8] tracking-[0.2em] uppercase" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    Open to new opportunities
                  </span>
                </motion.div>

                <div className="overflow-hidden">
                  <motion.p
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="text-white/30 text-lg mb-2 tracking-wide"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    Hello, I am —
                  </motion.p>
                </div>

                <div className="overflow-hidden mb-4">
                  <motion.h1
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="text-[clamp(3rem,10vw,7rem)] font-black leading-[0.92] tracking-tight"
                    style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
                  >
                    <span className="shimmer-text">KALYAN</span>
                    <br />
                    <span className="text-white/90">T SHEKADE</span>
                  </motion.h1>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.75 }}
                  className="flex items-baseline gap-2 text-2xl lg:text-3xl font-bold mb-8"
                  style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
                >
                  <RotatingWord />
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.85 }}
                  className="text-white/45 max-w-md leading-relaxed mb-10 text-sm lg:text-base"
                >
                  16+ years crafting award-winning digital experiences for India's biggest brands.
                  Currently AVP at ANAROCK Digital, Mumbai.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.95 }}
                  className="flex flex-wrap gap-4"
                >
                  <button
                    onClick={() => scrollTo("experience")}
                    className="group relative px-7 py-3.5 rounded-full text-sm font-semibold overflow-hidden"
                    style={{ fontFamily: "'Instrument Sans', sans-serif" }}
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-[#00D4B8] to-[#6C63FF]" />
                    <span className="absolute inset-0 bg-gradient-to-r from-[#6C63FF] to-[#00D4B8] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <span className="relative z-10 flex items-center gap-2 text-[#07070F] font-bold">
                      View My Work <ExternalLink size={13} />
                    </span>
                  </button>
                  <button
                    onClick={() => scrollTo("contact")}
                    className="px-7 py-3.5 rounded-full text-sm border border-white/15 text-white/60 hover:border-[#00D4B8]/50 hover:text-[#00D4B8] transition-all"
                    style={{ fontFamily: "'Instrument Sans', sans-serif" }}
                  >
                    Let's Talk
                  </button>
                </motion.div>
              </div>

              {/* Right: Photo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="flex justify-center lg:justify-end"
              >
                <div className="relative w-72 sm:w-80">
                  {/* Rotating gradient ring */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-[3px] rounded-[2rem] opacity-70"
                    style={{ background: "conic-gradient(from 0deg, #00D4B8, transparent 30%, #6C63FF, transparent 60%, #00B4F5, transparent 90%, #00D4B8)" }}
                  />
                  <div className="relative rounded-[calc(2rem-3px)] overflow-hidden bg-[#0F0F1C]">
                    <ImageWithFallback
                      src={kalyanPhoto}
                      alt="Kalyan T Shekade — UI/UX Designer"
                      className="w-full h-[420px] sm:h-[480px] object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#07070F] via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-black/50 backdrop-blur-md border border-white/10 w-fit">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00D4B8] animate-pulse" />
                        <span className="text-[11px] text-white/70" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                          AVP @ ANAROCK Digital
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Floating cards */}
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -left-10 top-12 bg-[#0F0F1C]/90 backdrop-blur-xl border border-white/10 rounded-2xl px-4 py-3 shadow-2xl"
                  >
                    <p className="text-2xl font-black text-[#00D4B8]" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>16+</p>
                    <p className="text-xs text-white/40">Years Exp.</p>
                  </motion.div>

                  <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    className="absolute -right-8 bottom-24 bg-[#0F0F1C]/90 backdrop-blur-xl border border-white/10 rounded-2xl px-4 py-3 shadow-2xl"
                  >
                    <p className="text-2xl font-black text-[#6C63FF]" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>9</p>
                    <p className="text-xs text-white/40">Awards</p>
                  </motion.div>

                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute -right-6 top-8 bg-[#00D4B8]/15 backdrop-blur-xl border border-[#00D4B8]/30 rounded-xl px-3 py-2 shadow-xl"
                  >
                    <Award size={14} className="text-[#00D4B8]" />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Scroll cue */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
            onClick={() => scrollTo("about")}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer group"
          >
            <span className="text-[10px] tracking-[0.3em] text-white/20 group-hover:text-white/40 transition-colors uppercase" style={{ fontFamily: "'JetBrains Mono', monospace" }}>scroll</span>
            <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}>
              <ChevronDown size={14} className="text-white/20 group-hover:text-[#00D4B8] transition-colors" />
            </motion.div>
          </motion.div>
        </section>

        {/* ── STATS STRIP ── */}
        <section className="border-y border-white/5 py-12 bg-[#0A0A14]">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-white/5">
              {STATS.map((s) => (
                <AnimCounter key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
              ))}
            </div>
          </div>
        </section>

        {/* ── MARQUEE ── */}
        <Marquee items={CLIENTS} />

        {/* ══════════════════════════════════════════════════════════════
            ABOUT
        ══════════════════════════════════════════════════════════════ */}
        <section id="about" className="py-24 lg:py-36">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <FadeUp>
              <SectionTitle index="01 — About">Who I Am</SectionTitle>
            </FadeUp>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Large text card */}
              <FadeUp className="lg:col-span-2" delay={0.05}>
                <div className="glow-border h-full rounded-3xl bg-[#0F0F1C] border border-white/5 p-8 flex flex-col justify-between" style={{ minHeight: 280 }}>
                  <div>
                    <p className="text-white/60 leading-relaxed text-base mb-6">
                      Creative and visionary UI/UX designer with{" "}
                      <span className="text-white">16+ years</span> in the digital agency space.
                      Experienced in conceptualisation, design, and execution of digital campaigns,
                      UI design, responsive websites, microsites, web banners, and emailers.
                    </p>
                    <p className="text-white/40 leading-relaxed text-sm">
                      I bridge the gap between business goals and user delight — working with teams
                      across India's top real-estate, FMCG, and media brands to create experiences
                      that resonate and perform.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-6">
                    {["English", "Hindi", "Marathi"].map((l) => (
                      <span key={l} className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/8 text-white/40" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{l}</span>
                    ))}
                    <span className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/8 text-white/40 ml-auto" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      <MapPin size={10} className="inline mr-1" />Mumbai, India
                    </span>
                  </div>
                </div>
              </FadeUp>

              {/* Contact card */}
              <FadeUp delay={0.1}>
                <div className="glow-border h-full rounded-3xl bg-gradient-to-br from-[#00D4B8]/10 to-[#6C63FF]/10 border border-[#00D4B8]/15 p-8 flex flex-col justify-between" style={{ minHeight: 280 }}>
                  <div>
                    <p className="text-xs text-[#00D4B8] mb-6 tracking-widest uppercase" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Connect</p>
                    <div className="space-y-4">
                      <a href="mailto:shekade.kalyan@gmail.com" className="flex items-center gap-3 group">
                        <div className="w-8 h-8 rounded-lg bg-[#00D4B8]/10 flex items-center justify-center">
                          <Mail size={13} className="text-[#00D4B8]" />
                        </div>
                        <span className="text-sm text-white/50 group-hover:text-white/80 transition-colors truncate">shekade.kalyan@gmail.com</span>
                      </a>
                      <a href="tel:+919702160103" className="flex items-center gap-3 group">
                        <div className="w-8 h-8 rounded-lg bg-[#00D4B8]/10 flex items-center justify-center">
                          <Phone size={13} className="text-[#00D4B8]" />
                        </div>
                        <span className="text-sm text-white/50 group-hover:text-white/80 transition-colors">+91 9702160103</span>
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => scrollTo("contact")}
                    className="mt-6 w-full py-3 rounded-xl bg-[#00D4B8]/10 border border-[#00D4B8]/25 text-[#00D4B8] text-xs hover:bg-[#00D4B8]/20 transition-colors"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    Hire Me →
                  </button>
                </div>
              </FadeUp>

              {/* Expertise tags */}
              <FadeUp className="lg:col-span-2" delay={0.15}>
                <div className="glow-border rounded-3xl bg-[#0F0F1C] border border-white/5 p-8">
                  <p className="text-xs text-[#00D4B8] mb-5 tracking-widest uppercase" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Expertise</p>
                  <div className="flex flex-wrap gap-2">
                    {EXPERTISE_TAGS.map((tag, i) => (
                      <motion.span
                        key={tag}
                        whileHover={{ scale: 1.05, borderColor: "rgba(0,212,184,0.4)", color: "#00D4B8" }}
                        className="text-xs px-3 py-1.5 rounded-full bg-white/4 border border-white/8 text-white/50 cursor-default transition-colors"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </FadeUp>

              {/* DOB/Education card */}
              <FadeUp delay={0.2}>
                <div className="glow-border rounded-3xl bg-[#0F0F1C] border border-white/5 p-8">
                  <p className="text-xs text-[#6C63FF] mb-5 tracking-widest uppercase" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Education</p>
                  <ul className="space-y-2 text-sm text-white/40">
                    {["B.Sc", "Diploma in Advance Computer Arts", "MCTF — CDAC, Mumbai", "Art Teacher Diploma"].map((e) => (
                      <li key={e} className="flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-[#6C63FF] mt-2 flex-shrink-0" />
                        {e}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 pt-5 border-t border-white/5">
                    <p className="text-xs text-white/20 mb-2" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Hobbies</p>
                    <div className="flex flex-wrap gap-2">
                      {["Sketching", "Painting", "Sports", "Travelling"].map((h) => (
                        <span key={h} className="text-xs px-2 py-0.5 rounded-md bg-[#6C63FF]/10 text-[#6C63FF]/70 border border-[#6C63FF]/15">{h}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            EXPERIENCE
        ══════════════════════════════════════════════════════════════ */}
        <section id="experience" className="py-24 lg:py-36 bg-[#0A0A14]">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <FadeUp>
              <SectionTitle index="02 — Experience">Career<br /><span className="text-white/20">Journey</span></SectionTitle>
            </FadeUp>

            <div className="relative">
              {/* Vertical timeline */}
              <div className="absolute left-4 lg:left-5 top-2 bottom-2 w-px bg-gradient-to-b from-[#00D4B8]/50 via-[#6C63FF]/30 to-transparent" />

              <div className="space-y-6">
                {EXPERIENCE.map((job, i) => (
                  <FadeUp key={i} delay={i * 0.07}>
                    <div className="relative pl-14 lg:pl-16">
                      {/* Dot */}
                      <div className={`absolute left-[13px] lg:left-[15px] top-6 w-2.5 h-2.5 rounded-full border-2 ${job.current ? "bg-[#00D4B8] border-[#00D4B8]" : "bg-[#0A0A14] border-white/20"} ${job.current ? "shadow-[0_0_12px_rgba(0,212,184,0.8)]" : ""}`} />

                      <motion.div
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.2 }}
                        className={`glow-border rounded-2xl border p-6 transition-colors ${job.current ? "bg-gradient-to-br from-[#00D4B8]/5 to-[#6C63FF]/5 border-[#00D4B8]/20" : "bg-[#0F0F1C] border-white/5 hover:border-white/10"}`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                              <h3 className="text-base font-bold" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>{job.role}</h3>
                              {job.current && (
                                <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#00D4B8]/15 text-[#00D4B8] border border-[#00D4B8]/30" style={{ fontFamily: "'JetBrains Mono', monospace" }}>NOW</span>
                              )}
                            </div>
                            <p className="text-sm font-medium" style={{ color: job.current ? "#00D4B8" : "#6C63FF" }}>{job.company}</p>
                          </div>
                          <span className="text-xs text-white/25 whitespace-nowrap" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{job.period}</span>
                        </div>
                        <p className="text-sm text-white/40 leading-relaxed mb-3">{job.desc}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {job.tags.map((t) => (
                            <span key={t} className="text-[10px] px-2.5 py-1 rounded-full bg-white/4 border border-white/6 text-white/35" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{t}</span>
                          ))}
                        </div>
                      </motion.div>
                    </div>
                  </FadeUp>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            SKILLS
        ══════════════════════════════════════════════════════════════ */}
        <section id="skills" className="py-24 lg:py-36">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <FadeUp>
              <SectionTitle index="03 — Skills">Tools &amp;<br /><span className="text-white/20">Mastery</span></SectionTitle>
            </FadeUp>

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
              <FadeUp delay={0.1}>
                <div className="space-y-7">
                  {SOFTWARE.map((s, i) => (
                    <SkillBar key={s.name} {...s} index={i} />
                  ))}
                </div>
              </FadeUp>

              <FadeUp delay={0.2}>
                <div className="space-y-5">
                  {/* Code skills */}
                  <div className="rounded-2xl bg-[#0F0F1C] border border-white/5 p-6">
                    <p className="text-xs text-[#00D4B8] mb-4 tracking-widest uppercase" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Programming / Markup</p>
                    <div className="flex flex-wrap gap-2">
                      {["HTML5", "CSS3", "DIV Layout", "Flash ActionScript", "HTML5 Banners", "GWD", "XD Prototyping", "Figma Prototyping"].map((s) => (
                        <motion.span
                          key={s}
                          whileHover={{ scale: 1.05, color: "#00D4B8", borderColor: "rgba(0,212,184,0.35)" }}
                          className="text-xs px-3 py-1.5 rounded-full bg-white/3 border border-white/7 text-white/40 cursor-default"
                          style={{ fontFamily: "'JetBrains Mono', monospace" }}
                        >
                          {s}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Animated gradient card */}
                  <div className="rounded-2xl overflow-hidden relative p-6" style={{ background: "linear-gradient(135deg, rgba(0,212,184,0.08) 0%, rgba(108,99,255,0.08) 100%)", border: "1px solid rgba(0,212,184,0.12)" }}>
                    <div className="absolute inset-0 opacity-30" style={{ background: "radial-gradient(circle at 80% 20%, rgba(0,212,184,0.15), transparent 60%)" }} />
                    <p className="text-xs text-[#6C63FF] mb-4 tracking-widest uppercase relative z-10" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Also Great At</p>
                    <div className="relative z-10 flex flex-wrap gap-2">
                      {["Wireframing", "Brand Identity", "Responsive Design", "Motion Design", "UI Systems", "Creative Direction", "Pitching", "Team Mentoring"].map((s) => (
                        <span key={s} className="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-[#6C63FF]/20 text-white/50">{s}</span>
                      ))}
                    </div>
                  </div>

                  {/* Mini stats */}
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { v: "Mumbai", l: "Based In" },
                      { v: "20 Jun", l: "Born" },
                      { v: "5★", l: "Leader" },
                    ].map(({ v, l }) => (
                      <div key={l} className="rounded-2xl bg-[#0F0F1C] border border-white/5 p-4 text-center hover:border-white/10 transition-colors">
                        <p className="text-lg font-black text-white/80 mb-1" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>{v}</p>
                        <p className="text-[10px] text-white/25 tracking-widest uppercase" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{l}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            AWARDS
        ══════════════════════════════════════════════════════════════ */}
        <section id="awards" className="py-24 lg:py-36 bg-[#0A0A14] overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <FadeUp>
              <SectionTitle index="04 — Recognition">Awards &amp;<br /><span className="text-white/20">Accolades</span></SectionTitle>
            </FadeUp>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {AWARDS.map((a, i) => (
                <FadeUp key={i} delay={i * 0.05}>
                  <motion.div
                    whileHover={{ y: -6, borderColor: `${TIER_COLORS[a.tier]}30` }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="group glow-border h-full rounded-2xl bg-[#0F0F1C] border border-white/5 p-6 flex flex-col cursor-default"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="relative">
                        <span className="text-3xl">{a.icon}</span>
                        {a.tier === "Grand" && (
                          <motion.div
                            animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute inset-0 rounded-full"
                            style={{ background: `radial-gradient(circle, ${TIER_COLORS[a.tier]}40, transparent)` }}
                          />
                        )}
                      </div>
                      <span className="text-xs text-white/20" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{a.year}</span>
                    </div>
                    <p className="text-sm text-white/60 group-hover:text-white/80 transition-colors leading-relaxed flex-1">{a.title}</p>
                    <div className="mt-4 pt-4 border-t border-white/5">
                      <span className="text-[11px] font-semibold" style={{ color: TIER_COLORS[a.tier], fontFamily: "'JetBrains Mono', monospace" }}>
                        {a.tier === "Grand" ? "Grand Prix" : a.tier}
                      </span>
                    </div>
                  </motion.div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            CONTACT
        ══════════════════════════════════════════════════════════════ */}
        <section id="contact" className="py-24 lg:py-36 relative overflow-hidden">
          {/* Bg accent */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-10 pointer-events-none" style={{ background: "radial-gradient(ellipse, #00D4B8 0%, transparent 70%)" }} />

          <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <FadeUp>
                <SectionTitle index="05 — Contact">Let's Build<br /><span className="shimmer-text">Together.</span></SectionTitle>
                <p className="text-white/40 leading-relaxed mb-10 max-w-md">
                  Have a project, a role, or just want to geek out about design?
                  Drop me a line — I read every message personally.
                </p>
                <div className="space-y-5">
                  {[
                    { icon: Mail, label: "Email", val: "shekade.kalyan@gmail.com", href: "mailto:shekade.kalyan@gmail.com" },
                    { icon: Phone, label: "Phone", val: "+91 9702160103", href: "tel:+919702160103" },
                    { icon: MapPin, label: "Location", val: "Mumbai, Badlapur — India", href: null },
                  ].map(({ icon: Icon, label, val, href }) => (
                    <div key={label} className="flex items-center gap-4 group">
                      <div className="w-11 h-11 rounded-xl bg-[#00D4B8]/8 border border-[#00D4B8]/15 flex items-center justify-center flex-shrink-0 group-hover:bg-[#00D4B8]/15 group-hover:border-[#00D4B8]/30 transition-all">
                        <Icon size={16} className="text-[#00D4B8]" />
                      </div>
                      <div>
                        <p className="text-[10px] text-white/25 mb-0.5 tracking-widest uppercase" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{label}</p>
                        {href ? (
                          <a href={href} className="text-sm text-white/60 hover:text-white transition-colors">{val}</a>
                        ) : (
                          <p className="text-sm text-white/60">{val}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </FadeUp>

              <FadeUp delay={0.15}>
                <div className="rounded-3xl bg-[#0F0F1C] border border-white/6 p-8">
                  <h3 className="text-xl font-bold mb-7" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>Send a Message</h3>
                  <form
                    className="space-y-4"
                    onSubmit={(e) => { e.preventDefault(); alert("Thank you! Kalyan will get back to you soon."); }}
                  >
                    <div className="grid sm:grid-cols-2 gap-4">
                      {[
                        { label: "Name", placeholder: "Your name", type: "text" },
                        { label: "Email", placeholder: "you@example.com", type: "email" },
                      ].map(({ label, placeholder, type }) => (
                        <div key={label}>
                          <label className="text-[11px] text-white/30 block mb-2 tracking-widest uppercase" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{label}</label>
                          <input
                            type={type}
                            placeholder={placeholder}
                            className="w-full px-4 py-3 rounded-xl bg-white/4 border border-white/7 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#00D4B8]/40 focus:bg-[#00D4B8]/4 transition-all"
                          />
                        </div>
                      ))}
                    </div>
                    <div>
                      <label className="text-[11px] text-white/30 block mb-2 tracking-widest uppercase" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Subject</label>
                      <input
                        type="text"
                        placeholder="Project enquiry / Collaboration / Role"
                        className="w-full px-4 py-3 rounded-xl bg-white/4 border border-white/7 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#00D4B8]/40 focus:bg-[#00D4B8]/4 transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-white/30 block mb-2 tracking-widest uppercase" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Message</label>
                      <textarea
                        rows={4}
                        placeholder="Tell me about your project or opportunity..."
                        className="w-full px-4 py-3 rounded-xl bg-white/4 border border-white/7 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#00D4B8]/40 focus:bg-[#00D4B8]/4 transition-all resize-none"
                      />
                    </div>
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      className="w-full py-4 rounded-xl text-sm font-bold text-[#07070F] relative overflow-hidden group"
                      style={{ fontFamily: "'Instrument Sans', sans-serif" }}
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-[#00D4B8] to-[#6C63FF]" />
                      <span className="absolute inset-0 bg-gradient-to-r from-[#6C63FF] to-[#00D4B8] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <span className="relative z-10">Send Message →</span>
                    </motion.button>
                  </form>
                </div>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="border-t border-white/5 py-10">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#00D4B8] to-[#6C63FF] flex items-center justify-center">
                <span className="text-[9px] font-black text-[#07070F]" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>KS</span>
              </div>
              <span className="text-sm text-white/50" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>Kalyan T Shekade</span>
            </div>
            <p className="text-xs text-white/20 text-center" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              UI/UX · Brand · Web Interactive · Mumbai
            </p>
            <p className="text-xs text-white/15" style={{ fontFamily: "'JetBrains Mono', monospace" }}>© 2025</p>
          </div>
        </footer>

      </div>
    </>
  );
}
