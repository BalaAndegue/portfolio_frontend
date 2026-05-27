'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CODE_SNIPPETS = [
  'MOV AX, 0x1337',
  'PUSH EBP',
  'XOR EAX, EAX',
  'INT 0x80',
  'JMP 0xDEADBEEF',
  'CMP BX, 0xFF',
  'SUB SP, 0x10',
  'CALL 0x4050A0',
  'NOP ; padding',
  'RET',
  'LEA RCX, [RBP-8]',
  'ADD RAX, 0x1',
  'MOV [RSP+8], RDX',
  'TEST AL, AL',
  'JNZ short_loop',
  'SYSCALL',
  'POP RBX',
  'MOV RDI, RAX',
  '0xB8 0x00 0x00 0x00 0x00',
  'FF D0  ; call rax',
  '48 89 C7  ; mov rdi,rax',
  '0b10110001 0xFF',
  'LOOP: DEC CX',
  'IMUL EBX, [ESI+4]',
];

const BINARY_WORDS = [
  '01001000 01100101',
  '11001010 00110011',
  '10101010 01010101',
  '00110011 11001100',
  '11110000 00001111',
  '01111110 10000001',
];

interface FlashItem {
  id: number;
  text: string;
  x: number;
  y: number;
  color: string;
  size: number;
  duration: number;
  isBinary: boolean;
}

const COLORS = [
  '#22d3ee', // cyan
  '#4ade80', // green
  '#a78bfa', // purple
  '#f59e0b', // amber
  '#f87171', // red
  '#38bdf8', // sky
];

let counter = 0;

export function CodeFlash() {
  const [items, setItems] = useState<FlashItem[]>([]);

  useEffect(() => {
    const spawn = () => {
      const isBinary = Math.random() < 0.25;
      const pool = isBinary ? BINARY_WORDS : CODE_SNIPPETS;
      const text = pool[Math.floor(Math.random() * pool.length)];

      const item: FlashItem = {
        id: counter++,
        text,
        x: Math.random() * 85 + 2,
        y: Math.random() * 85 + 2,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: Math.random() * 3 + 9,
        duration: Math.random() * 1.5 + 1,
        isBinary,
      };

      setItems((prev) => [...prev.slice(-14), item]);
    };

    const interval = setInterval(spawn, 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <AnimatePresence>
        {items.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: [0, 0.7, 0.7, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: item.duration, ease: 'easeInOut' }}
            className="absolute font-mono font-semibold whitespace-nowrap"
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
              color: item.color,
              fontSize: `${item.size}px`,
              textShadow: `0 0 8px ${item.color}88`,
              letterSpacing: item.isBinary ? '0.05em' : '0.02em',
            }}
          >
            {item.text}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
