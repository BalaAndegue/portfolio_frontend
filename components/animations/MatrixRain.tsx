'use client';

import { useEffect, useRef } from 'react';

const ASM = ['MOV','XOR','PUSH','POP','JMP','CALL','RET','INT','ADD','SUB','NOP','CMP','JNZ','LEA','INC','DEC','SHL','SHR','AND','OR','NOT','MUL','DIV','LOOP'];
const HEX = '0123456789ABCDEF'.split('');

function randChar(): string {
  const r = Math.random();
  if (r < 0.55) return Math.random() > 0.5 ? '0' : '1';
  if (r < 0.75) return HEX[Math.floor(Math.random() * 16)];
  return ASM[Math.floor(Math.random() * ASM.length)];
}

interface Props {
  opacity?: number;
  color?: string;
}

export function MatrixRain({ opacity = 0.18, color = '#00ff41' }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const FS = 11;
    let W = 0, H = 0;
    const drops: number[] = [];

    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
      const cols = Math.floor(W / FS);
      drops.length = 0;
      for (let i = 0; i < cols; i++) drops.push(Math.random() * -(H / FS));
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const frame = () => {
      ctx.fillStyle = 'rgba(8, 8, 18, 0.04)';
      ctx.fillRect(0, 0, W, H);

      ctx.font = `${FS}px 'JetBrains Mono', monospace`;

      for (let i = 0; i < drops.length; i++) {
        const y = drops[i] * FS;
        const ch = randChar();

        if (drops[i] - 1 >= 0) {
          ctx.fillStyle = color;
          ctx.globalAlpha = 0.9;
          ctx.fillText(ch, i * FS, y);
        }

        ctx.globalAlpha = 0.3 + Math.random() * 0.3;
        ctx.fillStyle = ch.length > 1
          ? `rgba(0,212,170,0.7)`
          : color;
        ctx.fillText(ch, i * FS, y - FS);

        ctx.globalAlpha = 1;

        if (y > H && Math.random() > 0.978) drops[i] = 0;
        drops[i] += 0.4 + Math.random() * 0.3;
      }
    };

    const id = setInterval(frame, 45);
    return () => {
      clearInterval(id);
      ro.disconnect();
    };
  }, [color]);

  return (
    <canvas
      ref={canvasRef}
      style={{ opacity }}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}
