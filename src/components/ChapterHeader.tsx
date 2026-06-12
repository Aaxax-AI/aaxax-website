/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";

interface ChapterHeaderProps {
  number: string;
  title: string;
  subtitle: string;
  className?: string;
}

export default function ChapterHeader({ number, title, subtitle, className = "" }: ChapterHeaderProps) {
  return (
    <div className={`relative flex flex-col items-center text-center py-10 md:py-16 ${className}`}>
      {/* Decorative vertical divider line */}
      <div className="w-[1px] h-12 md:h-16 bg-gradient-to-b from-red-500/0 via-red-600/60 to-red-500/0 mb-6" />

      {/* Chapter Number Badge */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="font-mono text-xs text-red-500 tracking-[0.3em] uppercase mb-3 flex items-center gap-3"
      >
        <span className="w-1.5 h-1.5 bg-red-600 rounded-sm inline-block" />
        SECTION {number}
        <span className="w-1.5 h-1.5 bg-zinc-100 rounded-sm inline-block" />
      </motion.div>

      {/* Title */}
      <motion.h2 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1, duration: 0.8 }}
        className="font-serif text-3xl md:text-5xl lg:text-6xl font-light text-slate-100 italic tracking-tight mb-3"
      >
        {title}
      </motion.h2>

      {/* Subtext */}
      <motion.p 
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="max-w-md font-sans text-xs md:text-sm text-slate-400 tracking-[0.05em] leading-relaxed"
      >
        {subtitle}
      </motion.p>
    </div>
  );
}
