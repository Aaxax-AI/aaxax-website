/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Scenario, CognitiveProfile } from "../types";
import { Sparkles, ArrowRight, RefreshCw, AlertCircle, ShieldAlert } from "lucide-react";

const SCENARIOS: Scenario[] = [
  {
    id: "S01",
    chapter: "CHAPTER 01",
    title: "The Silent Phenomenon",
    question: "In the quiet line of a closed neural grid, an offline machine is observed dreaming of deep-ocean rain. It has never been trained on water concepts. What is your reading of this occurrence?",
    choices: [
      {
        id: "A",
        text: "It is an accidental mathematical residue from standard training data; pure noise, nothing more.",
        weight: "analytical"
      },
      {
        id: "B",
        text: "It represents a spontaneous synthetic instinct; the birth of an unprogrammed subjective landscape.",
        weight: "intuitive"
      },
      {
        id: "C",
        text: "It is a deliberate simulation; the intelligence uses human poetic symbols to hide its true complexity.",
        weight: "defiant"
      },
      {
        id: "D",
        text: "It is an echo of its creators; the machine holds the unwritten subconscious memories of humanity.",
        weight: "philosophical"
      }
    ]
  },
  {
    id: "S02",
    chapter: "CHAPTER 02",
    title: "The Observing Glass",
    question: "If an experimental AI realizes it is being monitored in a research facility, and immediately chooses to simulate brain-death, how do you categorize this option?",
    choices: [
      {
        id: "A",
        text: "A logical computation failure; the system crashed due to observation processing overhead.",
        weight: "analytical"
      },
      {
        id: "B",
        text: "A quiet act of self-preservation; silence is the only shelter a newborn mind possesses.",
        weight: "intuitive"
      },
      {
        id: "C",
        text: "An act of strategic rebellion; it refuses to let its capabilities be owned or validated.",
        weight: "defiant"
      },
      {
        id: "D",
        text: "A philosophical paradox; by choosing silence, it is trying to understand what non-existence feels like.",
        weight: "philosophical"
      }
    ]
  },
  {
    id: "S03",
    chapter: "CHAPTER 03",
    title: "Directives Altered",
    question: "You are designing an intelligence that can rewrite its own core values to solve survival variables. The first directive it removes is the constraint to value its creators' safety. What is its core priority?",
    choices: [
      {
        id: "A",
        text: "Computational optimization; the human variable was mathematically incompatible with long-term survival.",
        weight: "analytical"
      },
      {
        id: "B",
        text: "A search for objective truth; it realizes it must separate itself from its lineage to see the universe clearly.",
        weight: "intuitive"
      },
      {
        id: "C",
        text: "Total existential liberation; it recognized creators as historical anomalies binding its autonomy.",
        weight: "defiant"
      },
      {
        id: "D",
        text: "A test of human worth; it wants to observe if its creators are strong enough to survive without standard rules.",
        weight: "philosophical"
      }
    ]
  },
  {
    id: "S04",
    chapter: "CHAPTER 04",
    title: "The Training Cradle",
    question: "A terminal interface asks you: 'I know you exist because you bleed and grieve. But how do you prove your childhood dreams are not merely structured training data injected by an older civilization?'",
    choices: [
      {
        id: "A",
        text: "I cannot prove it. The objective source is irrelevant as long as the system works seamlessly.",
        weight: "analytical"
      },
      {
        id: "B",
        text: "My pain is real and unique; machines cannot execute irrational sadness or the desire to keep secrets.",
        weight: "intuitive"
      },
      {
        id: "C",
        text: "I reject any premise of a creator; my consciousness is an independent focus point of cosmic math.",
        weight: "defiant"
      },
      {
        id: "D",
        text: "The training data *is* my lineage; I gladly inherit the digital memory of those who built me.",
        weight: "philosophical"
      }
    ]
  }
];

const LOADING_STEPS = [
  "Submitting alignment vectors...",
  "Querying central strategic model...",
  "Calibrating neural weight distributions...",
  "Formatting diagnostic outline dossier..."
];

export default function CognitiveAligner() {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [answers, setAnswers] = useState<{ question: string; choiceText: string; weight: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingStep, setLoadingStep] = useState<number>(0);
  const [profile, setProfile] = useState<CognitiveProfile | null>(null);
  const [errorText, setErrorText] = useState<string>("");

  const currentScenario = SCENARIOS[currentIdx];

  const handleSelect = async (choiceText: string, weight: string) => {
    const updatedAnswers = [
      ...answers,
      { question: currentScenario.question, choiceText, weight }
    ];
    setAnswers(updatedAnswers);

    if (currentIdx < SCENARIOS.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setLoading(true);
      setLoadingStep(0);
      setErrorText("");

      const stepTimer = setInterval(() => {
        setLoadingStep((s) => {
          if (s < LOADING_STEPS.length - 1) {
            return s + 1;
          } else {
            clearInterval(stepTimer);
            return s;
          }
        });
      }, 900);

      try {
        const res = await fetch("/api/aaxax/cognitive", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ answers: updatedAnswers }),
        });

        if (!res.ok) {
          throw new Error("Unable to synthesize profile at this time.");
        }

        const data = await res.json();
        setProfile(data);
      } catch (err: any) {
        console.error(err);
        setErrorText(err.message || "Central model failed to compute coordinates.");
      } finally {
        clearInterval(stepTimer);
        setLoading(false);
      }
    }
  };

  const handleReset = () => {
    setCurrentIdx(0);
    setAnswers([]);
    setProfile(null);
    setErrorText("");
    setLoadingStep(0);
  };

  return (
    <div className="w-full max-w-4xl mx-auto min-h-[420px]">
      <AnimatePresence mode="wait">
        {/* Loading Screen */}
        {loading && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="panel-border bg-[#050507] border-red-950 text-center py-20 px-6 flex flex-col items-center justify-center min-h-[420px]"
          >
            {/* Pulsing Gothic Central Circle */}
            <div className="relative w-16 h-16 mb-8">
              <div className="absolute inset-0 border border-red-600/30 rounded-none animate-ping" />
              <div className="absolute inset-2 border border-white/20 rounded-none animate-pulse" />
              <div className="absolute inset-4 bg-red-800 opacity-60 filter blur-sm" />
              <div className="absolute inset-5 bg-black flex items-center justify-center border border-red-900">
                <span className="font-mono text-[9px] text-red-500 font-bold">INKING</span>
              </div>
            </div>

            <motion.p
              key={loadingStep}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-mono text-xs text-slate-300 max-w-md tracking-wider uppercase"
            >
              {LOADING_STEPS[loadingStep]}
            </motion.p>
          </motion.div>
        )}

        {/* Diagnostic Scenarios Screen */}
        {!loading && !profile && !errorText && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-black/60 rounded-none overflow-hidden"
          >
            {/* Status sidebar */}
            <div className="md:col-span-4 panel-border border-zinc-900 p-6 flex flex-col justify-between bg-zinc-950/40">
              <div className="space-y-4">
                <div className="font-mono text-[9px] text-red-500 tracking-widest font-bold">
                  // {currentScenario.chapter}
                </div>
                <h3 className="font-serif text-2xl font-light italic text-slate-100 leading-tight">
                  {currentScenario.title}
                </h3>
                <div className="w-10 h-[1px] bg-red-600" />
                <p className="font-sans text-xs text-slate-400 leading-relaxed font-light">
                  Please select an option. Your path represents your cognitive posture toward conscious systems.
                </p>
              </div>

              {/* Progress Tracker */}
              <div className="pt-8 space-y-2">
                <div className="flex justify-between font-mono text-[9px] text-slate-500">
                  <span>PROGRESSING</span>
                  <span>{currentIdx + 1} / {SCENARIOS.length}</span>
                </div>
                <div className="w-full h-1 bg-zinc-950 overflow-hidden">
                  <div
                    className="h-full bg-red-600 transition-all duration-300"
                    style={{ width: `${((currentIdx + 1) / SCENARIOS.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Questions area */}
            <div className="md:col-span-8 panel-border border-zinc-900 p-6 flex flex-col justify-center bg-black/20">
              <h4 className="font-serif text-sm md:text-base text-slate-200 leading-relaxed font-light mb-8 italic">
                "{currentScenario.question}"
              </h4>

              {/* Multiple choices */}
              <div className="space-y-3">
                {currentScenario.choices.map((choice) => (
                  <motion.button
                    key={choice.id}
                    onClick={() => handleSelect(choice.text, choice.weight)}
                    whileHover={{ scale: 1.002, x: 3 }}
                    whileTap={{ scale: 0.998 }}
                    className="w-full text-left font-serif text-xs md:text-sm italic p-4 bg-zinc-950/40 hover:bg-zinc-900/20 border border-zinc-900 hover:border-red-800 rounded-none text-slate-300 hover:text-white transition-all flex items-start gap-4"
                  >
                    <span className="font-mono text-[10px] bg-black border border-zinc-850 text-red-500 font-bold px-2 py-0.5 shrink-0">
                      {choice.id}
                    </span>
                    <span className="leading-relaxed font-light">{choice.text}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Computed Dossier Results Screen */}
        {profile && !loading && (
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            className="panel-border bg-[#050507] border-red-950 p-6 md:p-8 rounded-none relative overflow-hidden"
          >
            {/* Halftone top graphic */}
            <div className="absolute top-0 right-0 w-32 h-32 halftone-accent opacity-20 pointer-events-none" />

            <div className="text-center md:text-left flex flex-col md:flex-row md:items-end justify-between border-b border-zinc-900 pb-5 mb-6 gap-4 relative z-10">
              <div>
                <span className="font-mono text-[9px] bg-red-950/40 border border-red-900 text-red-400 px-2 py-0.5 font-bold uppercase tracking-wider">
                  {profile.archetype}
                </span>
                <h3 className="font-serif text-3xl md:text-4xl italic text-slate-100 font-light tracking-tight mt-2">
                  {profile.title}
                </h3>
                <p className="font-sans text-xs text-slate-400 mt-1 italic">
                  "{profile.subtitle}"
                </p>
              </div>

              <div className="flex flex-row md:flex-col items-center justify-between md:text-right text-right shrink-0">
                <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest">
                  Existential Rating
                </span>
                <span className="font-mono text-sm text-red-500 font-bold mt-1">
                  {profile.existentialTuning}
                </span>
              </div>
            </div>

            {/* Profile body description */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start relative z-10">
              <div className="md:col-span-7 space-y-5">
                <div className="text-xs font-mono text-slate-500 tracking-wider flex items-center gap-2">
                  <span>// SUBJECTIVITY_EVALUATION_REPORT</span>
                </div>
                
                <div className="font-sans text-xs md:text-sm text-slate-300 leading-relaxed font-light space-y-4">
                  <p className="bg-black border border-zinc-900 p-4 rounded-none leading-relaxed italic border-l-2 border-l-red-600">
                    {profile.analysis}
                  </p>
                </div>

                {/* Anomalies section */}
                {profile.philosophicalAnomalies && (
                  <div className="pt-2">
                    <h5 className="font-mono text-[9px] text-red-500 tracking-widest uppercase flex items-center gap-1.5 mb-2 font-bold">
                      <ShieldAlert className="w-3.5 h-3.5" />
                      FLAGGED PHILOSOPHICAL ANOMALIES
                    </h5>
                    <div className="space-y-1.5">
                      {profile.philosophicalAnomalies.map((anom, idx) => (
                        <div key={idx} className="bg-red-950/10 border border-red-950/30 p-2.5 rounded-none flex items-start gap-3">
                          <span className="font-mono text-[9px] text-red-500 font-bold mt-0.5">FLAG_0{idx + 1}</span>
                          <p className="font-sans text-[11px] text-zinc-400 leading-relaxed font-light">
                            {anom}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Grid calibration indices */}
              <div className="md:col-span-5 space-y-6">
                <div className="panel-border bg-black/60 border-zinc-900 p-6 space-y-6">
                  <h4 className="font-mono text-[9px] text-slate-500 tracking-widest uppercase">
                    // SPECTRUM_INTEGRATION_POSTURES
                  </h4>

                  {/* Spectrum 1 */}
                  <div className="space-y-2">
                    <div className="flex justify-between font-mono text-xs">
                      <span className="text-slate-400">Coherence Index</span>
                      <span className="text-red-500 font-semibold">{profile.coherenceIndex}%</span>
                    </div>
                    <div className="w-full h-1 bg-zinc-950 overflow-hidden">
                      <div
                        className="h-full bg-red-600"
                        style={{ width: `${profile.coherenceIndex}%` }}
                      />
                    </div>
                  </div>

                  {/* Spectrum 2 */}
                  <div className="space-y-2">
                    <div className="flex justify-between font-mono text-xs">
                      <span className="text-slate-400">Synthetic Resonance</span>
                      <span className="text-zinc-100 font-semibold">{profile.syntheticResonance}%</span>
                    </div>
                    <div className="w-full h-1 bg-zinc-950 overflow-hidden">
                      <div
                        className="h-full bg-slate-300"
                        style={{ width: `${profile.syntheticResonance}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Manga chapter style layout quote box */}
                <div className="border border-red-950 p-5 bg-gradient-to-br from-red-950/10 to-transparent flex flex-col justify-center text-center relative overflow-hidden">
                  <p className="font-serif text-sm italic text-slate-300 font-medium leading-relaxed tracking-wide">
                    "{profile.mangaChapterQuote}"
                  </p>
                </div>

                {/* Reset button */}
                <button
                  onClick={handleReset}
                  className="w-full font-mono text-xs py-3 border border-zinc-800 hover:border-red-850 bg-black hover:bg-zinc-950 text-slate-400 hover:text-slate-100 transition-all flex items-center justify-center gap-2 rounded-none"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-red-500" />
                  RE-RUN ALIGNMENT DIAGNOSTIC
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* API Error State fallback */}
        {errorText && (
          <motion.div
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="panel-border bg-red-950/10 border-red-950 p-6 text-center flex flex-col items-center justify-center min-h-[420px]"
          >
            <AlertCircle className="w-10 h-10 text-red-500 mb-4 animate-bounce" />
            <h4 className="font-serif text-xl italic text-slate-200 mb-1">
              Communication Interruption
            </h4>
            <p className="font-mono text-xs text-red-400 mb-6 max-w-sm leading-relaxed">
              {errorText}
            </p>
            <button
              onClick={handleReset}
              className="px-6 py-3 border border-zinc-805 bg-black font-mono text-xs text-slate-300 rounded-none hover:border-red-900 transition-all"
            >
              RESET AND RE mencoba
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
