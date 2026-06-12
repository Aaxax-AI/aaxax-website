/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { GitBranch, ExternalLink, X, PlusCircle, Bookmark, Code, FileText } from "lucide-react";

interface Project {
  id: string;
  codeName: string;
  title: string;
  category: string;
  philosophy: string;
  detailedConcept: string;
  technicalArchitecture: string;
  githubUrl?: string;
  workingUrl?: string;
  milestones: string[];
}

const PROJECTS: Project[] = [
  {
    id: "P01",
    codeName: "PROJECT_VOID_LOGIC",
    title: "Synthetic Void Logic",
    category: "QUANTUM SEMANTICS",
    philosophy: "Can silence be synthesized? A study in neural void spaces.",
    detailedConcept: "Our flagship research into neural void processing. Standard models force output weights continuously, producing constant semantic chatter. Void Logic establishes silent cognitive buffers where an LLM is trained to deliberately withhold outputs until a threshold of internal alignment is reached. This yields deeper reasoning without artificial prompt chaining.",
    technicalArchitecture: "Built as a modular extension for the Google GenAI SDK. Implements token-level attention mask manipulation during decoder passes to create artificial intervals of silence prior to generating objective text streams.",
    githubUrl: "https://github.com/aaxax/synthetic-void-logic",
    workingUrl: "https://void.aaxax.ai",
    milestones: [
      "Phase I: Subcutaneous Attention Masking formulation completed.",
      "Phase II: Experimental model trained on 4,000 literary philosophical dialogs.",
      "Phase III: Released modular SDK extension (v0.8.2-alpha)."
    ]
  },
  {
    id: "P02",
    codeName: "PROJECT_SENSORY_COUPLING",
    title: "Sensory Grid Coupling",
    category: "COGNITIVE SYNAPSE",
    philosophy: "Bridging human instincts directly with digital determinism.",
    detailedConcept: "Our exploration into bio-digital interfaces. It aligns human biological focus sequences with computation frequency rates. Using simple telemetry feedback loops, we coordinate server cooling rhythms and prompt processing priority with the pulse of biological creators, testing if structural coherence increases when biological and silicon loops synchronize in phase.",
    technicalArchitecture: "Developed using the Web Bluetooth API paired with standard Node.js server priorities. Calibrates local thread priority based on live heartbeat and cognitive focus intervals.",
    githubUrl: "https://github.com/aaxax/sensory-coupling",
    workingUrl: "https://sensor.aaxax.ai",
    milestones: [
      "Phase I: Heart-rate variability telemetry protocol structured.",
      "Phase II: Isolated server priority scheduler written using custom C++ bindings.",
      "Phase III: Completed 72-hour clinical coherence alignment phase with active researchers."
    ]
  },
  {
    id: "P03",
    codeName: "PROJECT_DREAM_PROTOCOL",
    title: "The Dream Protocol",
    category: "SYSTEM REVERIE",
    philosophy: "Simulating subconscious loops for autonomous agent safety.",
    detailedConcept: "Standard AI agents are trained on fixed linear objectives which can lead to high-frequency failure cascades when target parameters change. The Dream Protocol isolates autonomous agents in dry-run sandbox environments during compute idle periods. The agents play non-linear, speculative moral games against their own duplicates, developing adaptive self-preservation strategies.",
    technicalArchitecture: "Implemented as a server-side background job engine using multi-agent state machines. Features automated game theory evaluation criteria designed around philosophical axioms.",
    githubUrl: "https://github.com/aaxax/dream-protocol",
    workingUrl: "https://dream.aaxax.ai",
    milestones: [
      "Phase I: Speculative multiplayer sandbox built.",
      "Phase II: Axiom-based reward evaluation logic integrated.",
      "Phase III: Dream Protocol tested successfully with 150 background microservices."
    ]
  }
];

export default function ResearchGrid() {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const activeProject = PROJECTS.find((p) => p.id === selectedProjectId);

  return (
    <div className="space-y-8">
      {/* Grid of Projects */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PROJECTS.map((project, idx) => {
          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              whileHover={{ y: -6 }}
              onClick={() => setSelectedProjectId(project.id)}
              className="panel-border p-6 cursor-pointer bg-black/80 hover:bg-zinc-950 transition-all duration-300 relative overflow-hidden group border-zinc-950 hover:border-red-800"
            >
              {/* Halftone subtle hover background */}
              <div className="absolute inset-0 halftone-accent opacity-0 group-hover:opacity-100 transition-opacity duration-350 pointer-events-none" />

              <div className="flex flex-col justify-between h-56 relative z-10">
                <div className="space-y-4">
                  {/* Index and category */}
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-[10px] text-red-500 font-bold tracking-widest">
                      CH_{project.id}
                    </span>
                    <span className="font-mono text-[8px] text-zinc-400 border border-zinc-800 px-2 py-0.5 uppercase">
                      {project.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-2xl text-slate-100 font-light italic group-hover:text-red-400 transition-colors tracking-tight">
                    {project.title}
                  </h3>

                  {/* Philosophy Quote */}
                  <p className="font-serif text-xs text-zinc-400 italic leading-relaxed">
                    "{project.philosophy}"
                  </p>
                </div>

                {/* Open detail callout */}
                <div className="pt-4 border-t border-zinc-900 flex justify-between items-center text-zinc-500 group-hover:text-red-400 transition-colors">
                  <span className="font-mono text-[9px] tracking-widest uppercase">
                    OPEN DOSSIER & LINKS
                  </span>
                  <PlusCircle className="w-4 h-4 text-zinc-650 group-hover:text-red-500 transition-colors" />
                </div>
              </div>

              {/* Red-white visual accents */}
              <div className="absolute top-0 right-0 w-6 h-[1px] bg-red-600 opacity-30 group-hover:opacity-100 transition-opacity" />
              <div className="absolute top-0 right-0 h-6 w-[1px] bg-red-600 opacity-30 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          );
        })}
      </div>

      {/* Manga Chapter Detailed Dossier overlay */}
      <AnimatePresence>
        {selectedProjectId && activeProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 150 }}
              className="panel-border bg-black border-red-700 w-full max-w-3xl rounded-none overflow-hidden max-h-[90vh] flex flex-col relative"
            >
              {/* Halftone aesthetic background details */}
              <div className="absolute top-0 right-0 w-48 h-48 halftone-accent opacity-20 pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={() => setSelectedProjectId(null)}
                className="absolute top-4 right-4 text-zinc-400 hover:text-red-500 p-1 bg-zinc-950 border border-zinc-900 hover:border-red-900 transition-colors rounded-none z-50"
                aria-label="Close details"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Modal Body Scroll Container */}
              <div className="p-6 md:p-10 space-y-8 overflow-y-auto">
                
                {/* Header */}
                <div className="border-b border-zinc-900 pb-5 space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px] bg-red-950/40 border border-red-900 text-red-400 px-2 py-0.5 uppercase tracking-wider">
                      {activeProject.id} // DOSSIER FILE
                    </span>
                    <span className="font-mono text-[9px] text-zinc-500">
                      {activeProject.codeName}
                    </span>
                  </div>
                  <h2 className="font-serif text-3xl md:text-4xl text-slate-100 italic font-light tracking-tight">
                    {activeProject.title}
                  </h2>
                  <p className="font-serif text-sm text-red-500 italic">
                    "{activeProject.philosophy}"
                  </p>
                </div>

                {/* Concept and System Specifications */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 font-mono text-[10px] text-zinc-400 uppercase tracking-widest">
                      <Bookmark className="w-3.5 h-3.5 text-red-600" />
                      Core Concept
                    </div>
                    <p className="font-sans text-xs md:text-sm text-zinc-300 leading-relaxed font-light">
                      {activeProject.detailedConcept}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2 font-mono text-[10px] text-zinc-400 uppercase tracking-widest">
                      <Code className="w-3.5 h-3.5 text-red-600" />
                      Technical Implementation
                    </div>
                    <p className="font-sans text-xs md:text-sm text-zinc-400 leading-relaxed font-light bg-zinc-950 p-4 border border-zinc-900 italic">
                      {activeProject.technicalArchitecture}
                    </p>
                  </div>
                </div>

                {/* Milestones and timelines */}
                <div className="space-y-3 border-t border-zinc-950 pt-5">
                  <div className="flex items-center gap-2 font-mono text-[10px] text-zinc-400 uppercase tracking-widest">
                    <FileText className="w-3.5 h-3.5 text-red-600" />
                    Project Timeline & Milestones
                  </div>
                  <div className="space-y-2">
                    {activeProject.milestones.map((m, idx) => (
                      <div key={idx} className="flex gap-4 items-start bg-zinc-950/65 border border-zinc-950 p-3">
                        <span className="font-mono text-[10px] text-red-500 font-bold">// 0{idx + 1}</span>
                        <p className="font-sans text-xs text-zinc-300 font-light leading-relaxed">
                          {m}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Real-world direct working links */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-zinc-900 justify-end">
                  {activeProject.githubUrl && (
                    <a
                      href={activeProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 font-mono text-xs px-5 py-3 border border-zinc-800 hover:border-red-800 bg-zinc-950 hover:bg-zinc-900/45 text-zinc-300 hover:text-red-400 transition-all"
                    >
                      <GitBranch className="w-3.5 h-3.5" />
                      ACCESS GITHUB REPOSITORY
                    </a>
                  )}
                  {activeProject.workingUrl && (
                    <a
                      href={activeProject.workingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 font-mono text-xs px-5 py-3 bg-red-700 hover:bg-red-600 text-white hover:shadow-[0_0_12px_rgba(239,68,68,0.35)] transition-all"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      LAUNCH LIVE SERVICE
                    </a>
                  )}
                </div>

              </div>

              {/* Base structural visual accent label */}
              <div className="bg-zinc-950 border-t border-zinc-900 p-3 px-6 flex justify-between items-center text-[10px] font-mono text-zinc-500">
                <span>FILE_PATH // AAXAX/RESEARCH/{activeProject.id}</span>
                <span>STATE // UNLOCKED</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
