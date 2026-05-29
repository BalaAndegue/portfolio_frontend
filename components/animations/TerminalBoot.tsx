'use client';

import { useState, useEffect } from 'react';

const CREAM = '#F0E6C8';

interface Props {
  lines: { text: string; color?: string; delay?: number }[];
  speed?: number;
}

export function TerminalBoot({ lines, speed = 35 }: Props) {
  const [done, setDone] = useState<number>(0);
  const [cursor, setCursor] = useState(0);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    if (done >= lines.length) return;
    const total = lines[done].text.length;
    if (cursor < total) {
      const t = setTimeout(() => setCursor(c => c + 1), speed + Math.random() * 20);
      return () => clearTimeout(t);
    }
    const pause = lines[done].delay ?? 200;
    const t = setTimeout(() => { setDone(d => d + 1); setCursor(0); }, pause);
    return () => clearTimeout(t);
  }, [done, cursor, lines, speed]);

  useEffect(() => {
    const t = setInterval(() => setBlink(b => !b), 530);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="font-mono text-xs sm:text-sm leading-6 select-none" aria-live="polite">
      {lines.slice(0, done).map((l, i) => (
        <div key={i} style={{ color: l.color ?? CREAM }} className="opacity-80">
          {l.text}
        </div>
      ))}
      {done < lines.length && (
        <div style={{ color: lines[done].color ?? CREAM }}>
          {lines[done].text.slice(0, cursor)}
          <span style={{ color: '#00ff41', opacity: blink ? 1 : 0 }}>█</span>
        </div>
      )}
      {done >= lines.length && (
        <span style={{ color: '#00ff41', opacity: blink ? 1 : 0 }}>█</span>
      )}
    </div>
  );
}
