'use client';

import { motion } from 'framer-motion';
import { TechKeyboard } from '@/components/animations/TechKeyboard';

/* ── Terminal screen content ── */
const GIT_LINES = [
  '* a3f2b1 feat: matrix rain animation',
  '* d4e5c6 fix: responsive mobile nav',
  '* 7890ab feat: XXCM course platform',
  '* f1e5829 feat: custom world ecommerce',
  '* ceeffcc feat: real certifications',
  '* b7c7cce fix: prisma vercel deploy',
  '* 5454940 feat: about page redesign',
  '* 75f4ebd feat: hero two-col layout',
  '* 431e1ec fix: tsconfig prisma',
  '* 0953cbc feat: tech keyboard anim',
];

const CODE_LINES = [
  'async fn handle(req: Request) {',
  '  let ctx = Context::from(&req);',
  '  let db  = Database::connect()',
  '    .await.unwrap();',
  '  match req.path() {',
  '    "/api/projects" => {',
  '      let data = db.query_all()',
  '        .await?;',
  '      Json(data)',
  '    }',
  '    _ => StatusCode::NOT_FOUND,',
  '  }',
  '}',
  '',
  'fn main() {',
  '  let app = Router::new()',
  '    .route("/api/*", handle)',
  '    .layer(CorsLayer::new());',
  '  Server::new(app)',
  '    .bind("0.0.0.0:8080")',
  '    .serve().await;',
  '}',
];

const HEX_LINES = [
  '0000: 48 89 e5 48 83 ec 20',
  '0007: 48 8b 05 00 00 00 00',
  '000e: 48 85 c0 74 0a 48 8b',
  '0015: 08 ff d1 48 31 c0 c3',
  '001c: 31 c9 ba 01 00 00 00',
  '0023: 48 c7 c0 3c 00 00 00',
  '002a: 0f 05 c3 55 48 89 e5',
  '0031: 41 54 53 48 83 ec 20',
  '0038: 48 89 fb 4c 8d a7 00',
  '003f: be 01 00 00 00 bf 01',
];

const FLOAT_ITEMS = [
  '01', '0xFF', '1337', 'NULL', '0b1010', 'void*', '0xDEAD',
  'malloc', 'struct', 'true', '0x00', 'int32', '255', '0b11',
  'EOF', 'NOP', 'RET', '0x1A', 'XOR', 'MOV', '&&', '||',
  'ptr', '~0', 'SIGSEGV', 'heap',
];

function FloatingNums() {
  const items = FLOAT_ITEMS.map((text, i) => ({
    text,
    left: (i * 3.8 + 2) % 96,
    bottom: (i * 7) % 60,
    delay: (i * 0.4) % 6,
    dur: 3.5 + (i % 5) * 0.8,
    size: 9 + (i % 4) * 2,
    color: ['#00ff41', '#4facfe', '#a78bfa', '#f59e0b', '#00d4aa'][i % 5],
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {items.map((item, i) => (
        <div
          key={i}
          className="absolute font-sys-mono"
          style={{
            left: `${item.left}%`,
            bottom: `${item.bottom}px`,
            fontSize: item.size,
            color: item.color,
            opacity: 0,
            animation: `floatUp ${item.dur}s ${item.delay}s linear infinite`,
          }}
        >
          {item.text}
        </div>
      ))}
    </div>
  );
}

function TermWindow({
  title,
  lines,
  color,
  style,
  className,
}: {
  title: string;
  lines: string[];
  color: string;
  style?: React.CSSProperties;
  className?: string;
}) {
  return (
    <div
      className={`rounded-lg overflow-hidden font-sys-mono text-[10px] shadow-2xl ${className ?? ''}`}
      style={{
        width: 220,
        backgroundColor: 'rgba(6,6,16,0.93)',
        backdropFilter: 'blur(8px)',
        border: `1px solid ${color}33`,
        boxShadow: `0 0 20px ${color}22, 0 8px 32px rgba(0,0,0,0.5)`,
        ...style,
      }}
    >
      {/* Title bar */}
      <div
        className="flex items-center gap-1.5 px-3 py-2"
        style={{
          backgroundColor: `${color}0c`,
          borderBottom: `1px solid ${color}22`,
        }}
      >
        <span className="w-2 h-2 rounded-full bg-red-400/60" />
        <span className="w-2 h-2 rounded-full bg-yellow-400/60" />
        <span className="w-2 h-2 rounded-full bg-green-400/60" />
        <span className="ml-2 text-[10px]" style={{ color: `${color}99` }}>{title}</span>
      </div>
      {/* Scrolling content */}
      <div className="relative overflow-hidden" style={{ height: 120 }}>
        <div
          className="absolute top-0 left-0 w-full screen-scroll"
          style={{ color: `${color}cc`, animationDuration: '9s' }}
        >
          {[...lines, ...lines].map((line, i) => (
            <div key={i} className="px-3 py-px leading-relaxed whitespace-pre-wrap break-all">
              {line}
            </div>
          ))}
        </div>
        {/* Fade top */}
        <div
          className="absolute top-0 left-0 right-0 h-5 pointer-events-none"
          style={{ background: `linear-gradient(to bottom, rgba(6,6,16,0.95), transparent)` }}
        />
        {/* Fade bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 h-5 pointer-events-none"
          style={{ background: `linear-gradient(to top, rgba(6,6,16,0.95), transparent)` }}
        />
      </div>
    </div>
  );
}

function DevSvg() {
  return (
    <svg
      viewBox="0 0 240 180"
      className="w-full max-w-[200px] mx-auto"
      aria-hidden="true"
    >
      <defs>
        <filter id="devGlow">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <radialGradient id="screenGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#4facfe" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#4facfe" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Screen glow on face */}
      <ellipse cx="120" cy="60" rx="40" ry="35" fill="url(#screenGlow)" />

      {/* Head */}
      <circle cx="120" cy="45" r="22" fill="none" stroke="#4facfe" strokeWidth="1.5"
        filter="url(#devGlow)" opacity="0.85" />

      {/* Glasses */}
      <rect x="107" y="41" width="11" height="8" rx="2.5" fill="none" stroke="#00ff41" strokeWidth="1" opacity="0.8" />
      <rect x="122" y="41" width="11" height="8" rx="2.5" fill="none" stroke="#00ff41" strokeWidth="1" opacity="0.8" />
      <line x1="118" y1="45" x2="122" y2="45" stroke="#00ff41" strokeWidth="1" opacity="0.6" />
      {/* Lens reflection */}
      <rect x="108" y="42" width="9" height="6" rx="1.5" fill="#4facfe" opacity="0.25" />
      <rect x="123" y="42" width="9" height="6" rx="1.5" fill="#4facfe" opacity="0.25" />

      {/* Neck */}
      <line x1="120" y1="67" x2="120" y2="78" stroke="#4facfe" strokeWidth="1.5" opacity="0.5" />

      {/* Hoodie */}
      <path d="M96 78 Q120 74 144 78 L138 130 Q120 133 102 130 Z"
        fill="none" stroke="#4facfe" strokeWidth="1.5" opacity="0.5" />
      <path d="M96 80 Q84 72 94 65 Q107 58 120 67 Q133 58 146 65 Q156 72 144 80"
        fill="none" stroke="#4facfe" strokeWidth="1" opacity="0.25" />

      {/* Left arm toward keyboard */}
      <path d="M102 90 Q90 108 72 128" stroke="#4facfe" strokeWidth="1.5" fill="none" opacity="0.6" />
      <path d="M72 128 L65 133" stroke="#4facfe" strokeWidth="1.2" opacity="0.5" />

      {/* Right arm toward keyboard */}
      <path d="M138 90 Q150 108 168 128" stroke="#4facfe" strokeWidth="1.5" fill="none" opacity="0.6" />
      <path d="M168 128 L175 133" stroke="#4facfe" strokeWidth="1.2" opacity="0.5" />

      {/* Desk */}
      <line x1="40" y1="142" x2="200" y2="142" stroke="#4facfe" strokeWidth="1" opacity="0.25" />

      {/* Desk legs */}
      <line x1="55" y1="142" x2="55" y2="175" stroke="#4facfe" strokeWidth="0.8" opacity="0.15" />
      <line x1="185" y1="142" x2="185" y2="175" stroke="#4facfe" strokeWidth="0.8" opacity="0.15" />

      {/* Chair back */}
      <path d="M100 130 L95 165 M140 130 L145 165" stroke="#4facfe" strokeWidth="1" opacity="0.2" />
      <line x1="90" y1="148" x2="150" y2="148" stroke="#4facfe" strokeWidth="1" opacity="0.2" />
    </svg>
  );
}

export function DevScene() {
  return (
    <div className="relative select-none" aria-label="Developer workspace animation">
      <FloatingNums />

      {/* Three terminal screens */}
      <div className="relative flex items-end justify-center gap-2 pb-2 px-2">
        {/* Left — git log */}
        <motion.div
          initial={{ opacity: 0, x: -50, rotate: -10 }}
          animate={{ opacity: 1, x: 0,  rotate: -8  }}
          transition={{ delay: 0.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: 'bottom center', marginBottom: 36, zIndex: 1 }}
        >
          <TermWindow title="git.log" lines={GIT_LINES} color="#a78bfa" />
        </motion.div>

        {/* Center — main code (slightly bigger, more forward) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0  }}
          transition={{ delay: 0.15, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 60, zIndex: 3 }}
        >
          <TermWindow
            title="main.rs"
            lines={CODE_LINES}
            color="#4facfe"
            style={{ width: 250, boxShadow: '0 0 32px rgba(79,172,254,0.2), 0 12px 48px rgba(0,0,0,0.6)' }}
          />
        </motion.div>

        {/* Right — hex dump */}
        <motion.div
          initial={{ opacity: 0, x: 50, rotate: 10 }}
          animate={{ opacity: 1, x: 0,  rotate: 8  }}
          transition={{ delay: 0.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: 'bottom center', marginBottom: 36, zIndex: 1 }}
        >
          <TermWindow title="hexdump" lines={HEX_LINES} color="#00ff41" />
        </motion.div>
      </div>

      {/* Developer silhouette */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0  }}
        transition={{ delay: 0.7, duration: 0.7 }}
        className="relative z-10 -mt-2"
      >
        <DevSvg />
      </motion.div>

      {/* Keyboard + ambient glow */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0  }}
        transition={{ delay: 1, duration: 0.6 }}
        className="relative z-10 flex justify-center -mt-2"
      >
        <div
          className="rounded-xl px-5 py-4 shadow-2xl"
          style={{
            backgroundColor: 'rgba(6,6,16,0.75)',
            border: '1px solid rgba(0,255,65,0.18)',
            boxShadow: '0 0 40px rgba(0,255,65,0.08), 0 8px 32px rgba(0,0,0,0.5)',
          }}
        >
          <p
            className="text-center font-sys-mono text-[9px] mb-3 tracking-[0.25em] uppercase"
            style={{ color: 'rgba(0,255,65,0.45)' }}
          >
            {'<'} stack {'>'}
          </p>
          <TechKeyboard />
          <p
            className="text-center font-sys-mono text-[9px] mt-3 opacity-30"
            style={{ color: '#F0E6C8' }}
          >
            // {new Date().getFullYear()} · Yaoundé
          </p>
        </div>
      </motion.div>
    </div>
  );
}
