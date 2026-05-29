'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ROWS: { label: string; color: string; textColor: string }[][] = [
  [
    { label: 'React',  color: '#20232a', textColor: '#61DAFB' },
    { label: 'Next',   color: '#000000', textColor: '#ffffff' },
    { label: 'TS',     color: '#3178C6', textColor: '#ffffff' },
    { label: 'JS',     color: '#F7DF1E', textColor: '#000000' },
    { label: 'Node',   color: '#339933', textColor: '#ffffff' },
    { label: 'Python', color: '#3776AB', textColor: '#FFD43B' },
  ],
  [
    { label: 'Prisma', color: '#2D3748', textColor: '#38B2AC' },
    { label: 'Docker', color: '#2496ED', textColor: '#ffffff' },
    { label: 'Git',    color: '#F05032', textColor: '#ffffff' },
    { label: 'Linux',  color: '#FCC624', textColor: '#000000' },
    { label: 'Java',   color: '#E76F00', textColor: '#ffffff' },
    { label: 'Spring', color: '#6DB33F', textColor: '#ffffff' },
  ],
  [
    { label: 'SQL',    color: '#4479A1', textColor: '#ffffff' },
    { label: 'GQL',    color: '#E10098', textColor: '#ffffff' },
    { label: 'TW',     color: '#06B6D4', textColor: '#ffffff' },
    { label: 'ML',     color: '#FF6F00', textColor: '#ffffff' },
    { label: 'REST',   color: '#009688', textColor: '#ffffff' },
    { label: 'AWS',    color: '#FF9900', textColor: '#232F3E' },
  ],
];

const ALL_KEYS = ROWS.flatMap((row, r) => row.map((_, c) => `${r}-${c}`));

type Mode = 'normal' | 'burst' | 'wave';

export function TechKeyboard() {
  const [active, setActive]     = useState<Set<string>>(new Set());
  const [pressed, setPressed]   = useState<string | null>(null);
  const [mode, setMode]         = useState<Mode>('normal');
  const waveRef = useRef<number | null>(null);

  /* ─── flash a set of keys then clear ─── */
  const flash = useCallback((keys: string[], duration = 380) => {
    setActive(new Set(keys));
    setTimeout(() => setActive(new Set()), duration);
  }, []);

  /* ─── NORMAL: 4-6 random keys ─── */
  const doNormal = useCallback(() => {
    const count = 3 + Math.floor(Math.random() * 4);
    const shuffled = [...ALL_KEYS].sort(() => Math.random() - 0.5);
    flash(shuffled.slice(0, count));
  }, [flash]);

  /* ─── BURST: 10-15 keys explode ─── */
  const doBurst = useCallback(() => {
    const count = 10 + Math.floor(Math.random() * 6);
    const shuffled = [...ALL_KEYS].sort(() => Math.random() - 0.5);
    flash(shuffled.slice(0, count), 600);
  }, [flash]);

  /* ─── WAVE: row by row ─── */
  const doWave = useCallback(() => {
    ROWS.forEach((row, r) => {
      const delay = r * 140;
      setTimeout(() => {
        flash(row.map((_, c) => `${r}-${c}`), 300);
      }, delay);
    });
  }, [flash]);

  /* ─── PRESS: random key depresses ─── */
  const doPress = useCallback(() => {
    const key = ALL_KEYS[Math.floor(Math.random() * ALL_KEYS.length)];
    setPressed(key);
    setTimeout(() => setPressed(null), 160);
  }, []);

  useEffect(() => {
    /* normal flash every 520ms */
    const n = setInterval(doNormal, 520);

    /* press every 700ms */
    const p = setInterval(doPress, 700);

    /* burst every 3.5s */
    const b = setInterval(doBurst, 3500);

    /* wave every 6s */
    const w = setInterval(doWave, 6000);

    return () => { clearInterval(n); clearInterval(p); clearInterval(b); clearInterval(w); };
  }, [doNormal, doPress, doBurst, doWave]);

  return (
    <div className="flex flex-col items-center gap-1.5 select-none" aria-hidden="true">
      {ROWS.map((row, rowIdx) => (
        <div key={rowIdx} className="flex gap-1.5">
          {row.map((key, colIdx) => {
            const id      = `${rowIdx}-${colIdx}`;
            const isActive = active.has(id);
            const isPressed= pressed === id;

            return (
              <motion.div
                key={id}
                animate={{
                  scale:      isPressed ? 0.84 : isActive ? 1.1 : 1,
                  y:          isPressed ? 2    : 0,
                  opacity:    isActive  ? 1    : 0.65,
                  backgroundColor: isActive
                    ? key.color
                    : `${key.color}bb`,
                  boxShadow: isActive
                    ? `0 0 14px 4px ${key.color}88, 0 0 28px 8px ${key.color}33`
                    : isPressed
                    ? `0 1px 0 ${key.color}99`
                    : `0 3px 0 ${key.color}88`,
                }}
                transition={{ type: 'spring', stiffness: 600, damping: 22 }}
                className="rounded-md text-[10px] font-bold cursor-default min-w-[46px] text-center px-2 py-1.5 font-sys-mono"
                style={{
                  color: key.textColor,
                  border: `1px solid ${key.color}44`,
                  borderBottom: isPressed ? `1px solid ${key.color}99` : `3px solid ${key.color}99`,
                }}
              >
                {key.label}
              </motion.div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
