/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  ChevronDown, 
  Layers, 
  HelpCircle,
  Clock
} from "lucide-react";

// Import modular components
import ChapterHeader from "./components/ChapterHeader";
import ResearchGrid from "./components/ResearchGrid";
import CognitiveAligner from "./components/CognitiveAligner";
import ActiveTerminal from "./components/ActiveTerminal";
import Manifesto from "./components/Manifesto";

import LogoImage from "./assets/images/Aakaxx.png";

export default function App() {
  const [activeSection, setActiveSection] = useState("ingress");
  const [currentTime, setCurrentTime] = useState("");

  // Read current real-world clock time in Indian Standard Time (IST)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const istTimeStr = now.toLocaleTimeString("en-GB", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      });
      setCurrentTime(`${istTimeStr} IST`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Update active section highlights based on scroll positions
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const height = window.innerHeight;
      
      if (scrollY < height * 0.7) {
        setActiveSection("ingress");
      } else if (scrollY < height * 1.7) {
        setActiveSection("research");
      } else if (scrollY < height * 2.8) {
        setActiveSection("cognitive");
      } else if (scrollY < height * 3.8) {
        setActiveSection("manifesto");
      } else {
        setActiveSection("terminal");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const jumpToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#050507] scanlines selection:bg-red-700 selection:text-white overflow-hidden">
      {/* Background ink washes & structures */}
      <div className="fixed inset-0 cyber-grid -z-20 opacity-30 pointer-events-none" />
      <div className="fixed inset-0 noise-overlay -z-20" />
      
      {/* Gothic elegant mist glows - Crimson & Charcoal */}
      <div className="fixed top-[15%] left-[-10%] w-[55vw] h-[55vh] mist-glow-dark-red -z-10 pointer-events-none" />
      <div className="fixed bottom-[12%] right-[-10%] w-[65vw] h-[65vh] mist-glow-crimson -z-10 pointer-events-none" />
      <div className="fixed top-[55%] left-[35%] w-[45vw] h-[45vh] mist-glow-white -z-10 pointer-events-none" />

      {/* Elegant minimalist header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-gradient-to-b from-[#050507] to-transparent backdrop-blur-md z-40 border-b border-zinc-900/60 flex items-center justify-between px-6 md:px-12 select-none">
        {/* Brand signature */}
        <div className="flex items-center gap-3">
          <img
            src={LogoImage}
            alt="AAXAX Logo"
            referrerPolicy="no-referrer"
            className="h-10 w-auto object-contain filter invert select-none mr-2"
          />
          <div className="flex flex-col">
            <span className="font-serif font-light text-slate-100 italic text-lg tracking-[0.2em] leading-none">
              AAXAX
            </span>
            <span className="font-mono text-[7.5px] text-red-500 font-bold tracking-[0.25em] mt-1.5 uppercase">
              STUDIO // INTELLIGENCE SYSTEM
            </span>
          </div>
        </div>

        {/* Honest dynamic clock only - no fake simulation signals */}
        <div className="hidden md:flex items-center gap-6 font-mono text-[9.5px]">
          <div className="flex items-center gap-2 text-zinc-400">
            <Clock className="w-3 h-3 text-red-600" />
            <span className="text-zinc-500">TIME:</span>
            <span className="text-zinc-300 tracking-wider font-medium">{currentTime || "GMT_CALIBRATION"}</span>
          </div>
        </div>
      </header>

      {/* Floating vertical chapter navigation rail */}
      <div className="fixed right-6 md:right-12 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-6 select-none">
        <span className="font-mono text-[7px] text-red-500 font-bold vertical-writing tracking-[0.35em] uppercase">
          INDEX
        </span>
        <div className="w-[1px] h-10 bg-zinc-900" />
        
        {/* Chapter dots bar */}
        <div className="flex flex-col gap-4">
          {[
            { id: "ingress", label: "01", tip: "Title Cover" },
            { id: "research", label: "02", tip: "Research Files" },
            { id: "cognitive", label: "03", tip: "Alignment Diagnostic" },
            { id: "manifesto", label: "04", tip: "Founders Blueprint" },
            { id: "terminal", label: "05", tip: "MIND-X01 Console" }
          ].map((ch) => {
            const isSelected = activeSection === ch.id;
            return (
              <button
                key={ch.id}
                onClick={() => jumpToSection(ch.id)}
                className="group relative flex items-center justify-center p-1 focus:outline-none"
                title={ch.tip}
              >
                {/* Micro hovering tooltip labels */}
                <div className="absolute right-8 pr-2 bg-black border border-red-950 text-[8.5px] font-mono text-zinc-300 tracking-widest uppercase py-1 px-2.5 rounded-none opacity-0 group-hover:opacity-100 transition-opacity duration-250 whitespace-nowrap pointer-events-none shadow-xl">
                  {ch.label} // {ch.tip}
                </div>

                {/* Animated visual dot mimicking manga ink marks */}
                <div className={`transition-all duration-300 rounded-none relative ${
                  isSelected 
                    ? "w-2 h-2 bg-red-600 border border-red-500 scale-125 shadow-[0_0_10px_rgba(220,10,10,0.8)]" 
                    : "w-1.5 h-1.5 bg-zinc-800 hover:bg-zinc-400"
                }`} />
              </button>
            );
          })}
        </div>
        
        <div className="w-[1px] h-10 bg-zinc-900" />
        <span className="font-mono text-[9px] text-zinc-650 font-bold tracking-tight">AAX</span>
      </div>

      {/* Chapter 1: The Ingress (Hero Cover Page) */}
      <section
        id="ingress"
        className="min-h-screen relative flex flex-col justify-center items-center px-6 md:px-12 pt-16 overflow-hidden"
      >
        {/* Glowing cybernet matrix central layout */}
        <div className="relative flex flex-col items-center mt-8 mb-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.3, ease: "easeOut" }}
            className="w-56 h-56 md:w-72 md:h-72 rounded-full relative flex items-center justify-center"
          >
            {/* Spinning background circles */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border border-dashed border-red-950 rounded-full"
            />
            <motion.div 
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-8 border border-zinc-900 rounded-full"
            />
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute inset-12 border border-red-900 border-t-red-700/60 rounded-full"
            />

            {/* Preserving Illustration */}
            <div className="w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden border border-zinc-900 p-2.5 bg-[#020205] relative flex items-center justify-center">
              <img
                src="/src/assets/images/aaxax_core_symbol_1781264204725.jpg"
                alt="AAXAX Core Blueprint Symbol"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-full opacity-80 filter grayscale contrast-125 saturate-125 hover:grayscale-0 transition-opacity duration-500 p-1"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-red-950/20 via-transparent to-black pointer-events-none rounded-full" />
            </div>
          </motion.div>

          {/* Sci-fi manga vertical typography accent */}
          <div className="absolute left-[-20%] top-1/2 -translate-y-1/2 font-mono text-[8.5px] text-red-500/25 hidden xl:block vertical-writing tracking-[0.4em] font-bold">
            AAXAX_COGNITIVE_RESEARCH_SECTION
          </div>
          <div className="absolute right-[-20%] top-1/2 -translate-y-1/2 font-mono text-[8.5px] text-zinc-500/30 hidden xl:block vertical-writing tracking-[0.4em]">
            WE_BUILD_TOOLS_THAT_THINK_CORE
          </div>
        </div>

        {/* Narrative titles block */}
        <div className="text-center space-y-4 max-w-3xl relative z-10 px-4">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="font-mono text-xs text-red-500 tracking-[0.45em] uppercase font-bold"
          >
            A LITERARY COGNITIVE RESEARCH EXPERIMENT
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1.2 }}
            className="font-serif text-4xl md:text-6xl lg:text-7xl font-extralight tracking-tight text-slate-100 italic"
          >
            We build tools that think.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 0.9, duration: 0.9 }}
            className="text-xs md:text-sm text-slate-400 font-sans tracking-[0.05em] max-w-md mx-auto leading-relaxed font-light"
          >
            An obsession with understanding the boundaries of language and cognition. Guided by severe focus, silence, and genuine mathematical curiosity.
          </motion.p>
        </div>

        {/* Silent minimal visual balance indicator */}
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          onClick={() => jumpToSection("research")}
          className="absolute bottom-8 flex flex-col items-center cursor-pointer select-none text-zinc-600 hover:text-red-500 transition-colors"
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </section>

      {/* Chapter 2: The Research Files (Bento grid parameters) */}
      <section
        id="research"
        className="min-h-screen py-20 px-6 md:px-12 max-w-7xl mx-auto relative"
      >
        <ChapterHeader 
          number="02" 
          title="The Technical Records" 
          subtitle="Explore our quiet, core active computational intelligence operations"
        />

        {/* Bento Grid layout with detailed modal overview popup */}
        <ResearchGrid />
      </section>

      {/* Chapter 3: The Cognitive Alignment Test */}
      <section
        id="cognitive"
        className="min-h-screen py-20 px-6 md:px-12 max-w-7xl mx-auto relative"
      >
        <ChapterHeader 
          number="03" 
          title="The Alignment Protocol" 
          subtitle="Evaluate your own subjective resonance and cognitive posture boundaries"
        />

        {/* Aligner Game with Gemini profiling */}
        <CognitiveAligner />
      </section>

      {/* Chapter 4: The Founder's Blueprint (Philosophy vectors) */}
      <section
        id="manifesto"
        className="min-h-screen py-20 px-6 md:px-12 max-w-7xl mx-auto relative"
      >
        <ChapterHeader 
          number="04" 
          title="Core Manifesto" 
          subtitle="Simple values shaping our commitment to cognitive agency"
        />

        {/* Philosophy and values */}
        <Manifesto />
      </section>

      {/* Chapter 5: Retro Chat Console */}
      <section
        id="terminal"
        className="min-h-screen py-20 px-6 md:px-12 max-w-7xl mx-auto pb-32 relative"
      >
        <ChapterHeader 
          number="05" 
          title="Direct Resonance" 
          subtitle="Formulate direct dialogues to examine reasoning coordinates with MIND-X01"
        />

        {/* System Chat Box */}
        <ActiveTerminal />
      </section>

      {/* Footer copyright */}
      <footer className="border-t border-zinc-900 bg-black py-16 px-6 md:px-12 select-none">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Brand Signature and detail */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={LogoImage}
                alt="AAXAX Logo"
                referrerPolicy="no-referrer"
                className="h-8 w-auto object-contain filter invert select-none"
              />
              <span className="font-mono text-[9px] text-red-500 bg-zinc-950 border border-zinc-900 px-2 py-0.5 rounded-none font-bold">
                RECORD_DRAFT
              </span>
            </div>
            <p className="font-sans text-xs text-zinc-500 font-light max-w-sm leading-relaxed">
              We focus purely on the architecture. Aligning high-dimensional models to act as elegant tools and mirrors to human curiosity.
            </p>
          </div>

          {/* Directory Links */}
          <div className="md:col-span-4 space-y-2">
            <span className="block font-mono text-[9px] text-red-500 font-bold uppercase tracking-widest">// ARCHIVE_INDEX</span>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono text-zinc-400">
              <button onClick={() => jumpToSection("ingress")} className="text-left hover:text-red-500 transition-colors">// INGRESS</button>
              <button onClick={() => jumpToSection("research")} className="text-left hover:text-red-500 transition-colors">// RESEARCH_FILES</button>
              <button onClick={() => jumpToSection("cognitive")} className="text-left hover:text-red-500 transition-colors">// DIAGNOSTIC</button>
              <button onClick={() => jumpToSection("manifesto")} className="text-left hover:text-red-500 transition-colors">// PHILOSOPHY</button>
              <button onClick={() => jumpToSection("terminal")} className="text-left hover:text-red-500 transition-colors">// TERMINAL_CONSOLE</button>
            </div>
          </div>

          {/* Philosophical sign off */}
          <div className="md:col-span-3 text-left md:text-right space-y-2">
            <span className="block font-mono text-[9px] text-zinc-600 tracking-[0.1em] uppercase">MANDATE</span>
            <p className="font-serif italic text-xs text-zinc-400 font-light leading-relaxed">
              "Technology should help people create."
            </p>
            <span className="block font-sans text-[10px] text-zinc-650 mt-4">
              © 2026 AAXAX Laboratory. All silences preserved.
            </span>
          </div>
          
        </div>
      </footer>
    </div>
  );
}
