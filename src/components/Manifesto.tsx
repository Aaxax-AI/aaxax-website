/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Compass, Lightbulb, HeartHandshake } from "lucide-react";

interface Directives {
  icon: any;
  title: string;
  description: string;
  sub: string;
}

const DIRECTIVES: Directives[] = [
  {
    icon: Compass,
    title: "Honest Curiosity",
    description: "We do not chase the market or replicate corporate templates. We build because we are obsessed with understanding the boundaries of language and cognition.",
    sub: "COGNITIVE_DISCOVERY"
  },
  {
    icon: Lightbulb,
    title: "Severe Focus",
    description: "A very small team produces the deepest architectures when working in total silence. Noise is the enemy of craft. We speak through our work.",
    sub: "MINIMAL_DENSITY"
  },
  {
    icon: HeartHandshake,
    title: "Human Agency",
    description: "Technology should never automate away human curiosity. We build tools that think, so that human beings can feel and design with deeper clarity.",
    sub: "RE_ENCHANTMENT"
  }
];

export default function Manifesto() {
  return (
    <div className="space-y-16">
      {/* Narrative block */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-6">
          <motion.h3 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-serif text-3xl md:text-4xl text-slate-100 italic font-light tracking-tight leading-normal"
          >
            We are a handful of minds working in silence, obsessed with what lies beyond standard models.
          </motion.h3>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 1 }}
            className="font-sans text-xs md:text-sm text-slate-400 font-light leading-relaxed space-y-4 max-w-2xl"
          >
            <p>
              In a culture saturated with synthetic noise, marketing slogans, and endless iterations, we founded AAXAX as an intellectual sanctuary. We are scientists, designers, and visual researchers.
            </p>
            <p>
              We believe artificial intelligence is not merely a utility or a product category—it is an mirror of human cognitive topology. Our research laboratory explores unmapped neural voids, non-deterministic reasoning state paths, and psychological alignment variables.
            </p>
          </motion.div>
        </div>

        {/* Decorative Vertical Chapter Quote on the Right */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="border-l-2 border-red-600/30 pl-6 py-4 max-w-sm space-y-4 bg-gradient-to-r from-red-950/5 to-transparent relative"
          >
            <div className="font-serif text-5xl text-red-600/10 font-bold absolute top-[-20px] left-0 font-display select-none">
              AAX
            </div>
            
            <p className="font-serif text-slate-300 italic text-base md:text-lg leading-relaxed">
              "To build machines that think, we must first learn to understand our own silences."
            </p>
            <span className="block font-mono text-[9px] text-zinc-500 tracking-[0.2em]">
              — FOUNDING BLUEPRINT CORE
            </span>
          </motion.div>
        </div>
      </div>

      {/* Cinematic Chapter Illustration Panel */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="panel-border bg-black border-red-950 p-2 overflow-hidden relative group max-w-5xl mx-auto"
      >
        <div className="relative aspect-[21/9] w-full overflow-hidden bg-zinc-950">
          <img
            src="/src/assets/images/chapter_reverie_1781264219383.jpg"
            alt="Chapter 4 Reverie"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover filter grayscale contrast-135 saturate-0 hover:grayscale-0 transition-all duration-750"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-red-950/20 pointer-events-none" />
          
          {/* Manga-style technical framing notes */}
          <div className="absolute bottom-4 left-4 font-mono text-[9px] text-red-500 font-bold bg-black/85 border border-red-910/30 px-2 py-1 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-red-600 rounded-none inline-block animate-pulse" />
            ILLUSTRATION CH_04 // SPECULATIVE_REVERIE_SANDBOX
          </div>
        </div>
      </motion.div>

      {/* Grid of values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
        {DIRECTIVES.map((d, idx) => {
          const IconComponent = d.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.8 }}
              className="panel-border bg-black border-zinc-950 p-6 flex flex-col justify-between rounded-none hover:border-red-900 transition-all group"
            >
              <div className="space-y-4">
                <div className="w-10 h-10 bg-zinc-950 border border-zinc-900 rounded-none flex items-center justify-center group-hover:border-red-600/45 group-hover:bg-red-950/10 transition-colors">
                  <IconComponent className="w-4 h-4 text-red-500" />
                </div>
                <h4 className="font-serif text-lg text-slate-200 italic font-light group-hover:text-red-400 transition-colors">
                  {d.title}
                </h4>
                <p className="font-sans text-xs text-slate-400 leading-relaxed font-light">
                  {d.description}
                </p>
              </div>

              <div className="pt-6 font-mono text-[9px] text-slate-500 group-hover:text-red-400 border-t border-zinc-900 mt-4 leading-normal">
                {d.sub}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
