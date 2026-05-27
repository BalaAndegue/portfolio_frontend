'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const KEYS: { label: string; color: string; textColor: string }[][] = [
  [
    { label: 'React', color: '#20232a', textColor: '#61DAFB' },
    { label: 'Next.js', color: '#000000', textColor: '#ffffff' },
    { label: 'TS', color: '#3178C6', textColor: '#ffffff' },
    { label: 'JS', color: '#F7DF1E', textColor: '#000000' },
    { label: 'Node', color: '#339933', textColor: '#ffffff' },
    { label: 'Python', color: '#3776AB', textColor: '#FFD43B' },
  ],
  [
    { label: 'Prisma', color: '#2D3748', textColor: '#38B2AC' },
    { label: 'Docker', color: '#2496ED', textColor: '#ffffff' },
    { label: 'Git', color: '#F05032', textColor: '#ffffff' },
    { label: 'Linux', color: '#FCC624', textColor: '#000000' },
    { label: 'Java', color: '#E76F00', textColor: '#ffffff' },
    { label: 'Spring', color: '#6DB33F', textColor: '#ffffff' },
  ],
  [
    { label: 'SQL', color: '#4479A1', textColor: '#ffffff' },
    { label: 'GraphQL', color: '#E10098', textColor: '#ffffff' },
    { label: 'Tailwind', color: '#06B6D4', textColor: '#ffffff' },
    { label: 'ML', color: '#FF6F00', textColor: '#ffffff' },
    { label: 'REST', color: '#009688', textColor: '#ffffff' },
    { label: 'AWS', color: '#FF9900', textColor: '#232F3E' },
  ],
];

interface KeyState {
  row: number;
  col: number;
  active: boolean;
}

export function TechKeyboard() {
  const [activeKeys, setActiveKeys] = useState<Set<string>>(new Set());
  const [pressedKey, setPressedKey] = useState<string | null>(null);

  const getKeyId = (row: number, col: number) => `${row}-${col}`;

  const randomFlash = useCallback(() => {
    const numKeys = Math.floor(Math.random() * 3) + 1;
    const newActive = new Set<string>();
    for (let i = 0; i < numKeys; i++) {
      const row = Math.floor(Math.random() * KEYS.length);
      const col = Math.floor(Math.random() * KEYS[row].length);
      newActive.add(getKeyId(row, col));
    }
    setActiveKeys(newActive);
    setTimeout(() => setActiveKeys(new Set()), 400);
  }, []);

  const randomPress = useCallback(() => {
    const row = Math.floor(Math.random() * KEYS.length);
    const col = Math.floor(Math.random() * KEYS[row].length);
    const id = getKeyId(row, col);
    setPressedKey(id);
    setTimeout(() => setPressedKey(null), 200);
  }, []);

  useEffect(() => {
    const flashInterval = setInterval(randomFlash, 800);
    const pressInterval = setInterval(randomPress, 1200);
    return () => {
      clearInterval(flashInterval);
      clearInterval(pressInterval);
    };
  }, [randomFlash, randomPress]);

  return (
    <div className="flex flex-col items-center gap-2 select-none" aria-hidden="true">
      {KEYS.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-1.5">
          {row.map((key, colIndex) => {
            const id = getKeyId(rowIndex, colIndex);
            const isActive = activeKeys.has(id);
            const isPressed = pressedKey === id;
            return (
              <motion.div
                key={id}
                animate={{
                  scale: isPressed ? 0.88 : isActive ? 1.08 : 1,
                  y: isPressed ? 2 : 0,
                  boxShadow: isActive
                    ? `0 0 12px 3px ${key.color}88, 0 0 24px 6px ${key.color}44`
                    : isPressed
                    ? `0 1px 0 ${key.color}66`
                    : `0 4px 0 ${key.color}99`,
                  backgroundColor: isActive ? key.color : `${key.color}dd`,
                  opacity: isActive ? 1 : 0.75,
                }}
                transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                className="rounded-md px-2.5 py-1.5 text-[10px] font-bold font-mono cursor-default min-w-[48px] text-center border border-white/10"
                style={{
                  color: key.textColor,
                  borderBottom: `3px solid ${key.color}`,
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
