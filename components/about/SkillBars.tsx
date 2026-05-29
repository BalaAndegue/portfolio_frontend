'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface Skill { label: string; pct: number; addr: string; color?: string }

const SKILLS: Skill[] = [
  { addr: '0x00', label: 'React / Next.js',   pct: 92, color: '#61DAFB' },
  { addr: '0x08', label: 'TypeScript',         pct: 88, color: '#3178C6' },
  { addr: '0x10', label: 'Node.js',            pct: 85, color: '#339933' },
  { addr: '0x18', label: 'Python',             pct: 83, color: '#FFD43B' },
  { addr: '0x20', label: 'Java / Spring Boot', pct: 79, color: '#E76F00' },
  { addr: '0x28', label: 'PostgreSQL / SQLite', pct: 80, color: '#4479A1' },
  { addr: '0x30', label: 'Docker / Linux',     pct: 76, color: '#2496ED' },
  { addr: '0x38', label: 'Machine Learning',   pct: 74, color: '#FF6F00' },
  { addr: '0x40', label: 'CI / CD',            pct: 72, color: '#F05032' },
  { addr: '0x48', label: 'GraphQL / REST',     pct: 82, color: '#E10098' },
];

function Bar({ skill, index }: { skill: Skill; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <div ref={ref} className="flex items-center gap-3 group">
      <span className="font-mono text-[10px] text-[#00ff41]/60 w-10 shrink-0">{skill.addr}</span>
      <span className="font-mono text-xs text-[#F0E6C8]/70 w-36 shrink-0 truncate group-hover:text-[#F0E6C8] transition-colors">
        {skill.label}
      </span>
      <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden border border-white/10">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: skill.color ?? '#00ff41' }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.pct}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
      <motion.span
        className="font-mono text-[10px] text-[#F0E6C8]/50 w-8 text-right shrink-0"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: index * 0.07 + 1.1 }}
      >
        {skill.pct}%
      </motion.span>
    </div>
  );
}

export function SkillBars() {
  return (
    <div className="space-y-3">
      {SKILLS.map((s, i) => <Bar key={s.addr} skill={s} index={i} />)}
    </div>
  );
}
