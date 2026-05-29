import { getPersonalInfo } from '@/lib/actions';
import { PersonalInfo } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { MatrixRain } from '@/components/animations/MatrixRain';
import { TerminalBoot } from '@/components/animations/TerminalBoot';
import { SkillBars } from '@/components/about/SkillBars';
import { MapPin, Linkedin, Mail, Download, Code2, Database, Cpu, Globe, Server, Terminal } from 'lucide-react';

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

export default async function AboutPage() {
  const profile = (await getPersonalInfo()) as PersonalInfo;
  if (!profile) return null;

  const BOOT_LINES = [
    { text: '$ sudo ./init_profile.sh --verbose', color: '#00ff41', delay: 400 },
    { text: '[  0.001] Kernel: Linux 6.2.0 aarch64', color: '#8892a4', delay: 120 },
    { text: '[  0.012] CPU: Cortex-A72 @ 1.8GHz', color: '#8892a4', delay: 100 },
    { text: '[  0.034] Loading developer profile...', color: '#F0E6C8', delay: 150 },
    { text: `[  0.058] NAME="${profile.name}"`, color: '#4facfe', delay: 100 },
    { text: `[  0.071] ROLE="Full Stack Engineer + ML"`, color: '#4facfe', delay: 100 },
    { text: `[  0.089] LOC="${profile.location}"`, color: '#4facfe', delay: 100 },
    { text: '[  0.103] GitHub: 69 repos · 5 orgs · 1K+ commits', color: '#a78bfa', delay: 120 },
    { text: '[  0.118] Status: AVAILABLE FOR PROJECTS ✓', color: '#00ff41', delay: 300 },
    { text: '$ _', color: '#00ff41', delay: 99999 },
  ];

  const DOMAINS = [
    { icon: Code2, title: 'Full Stack Web', desc: 'React, Next.js, Node.js, Spring Boot — du composant à l\'API REST', color: '#61DAFB' },
    { icon: Database, title: 'Data & Bases', desc: 'PostgreSQL, SQLite, Prisma ORM — modélisation et requêtes optimisées', color: '#4479A1' },
    { icon: Cpu, title: 'Machine Learning', desc: 'Scikit-learn, TensorFlow, analyse de données et modèles prédictifs', color: '#FF6F00' },
    { icon: Server, title: 'Systèmes & CI/CD', desc: 'Linux, Docker, pipelines CI/CD, microservices et déploiement cloud', color: '#339933' },
    { icon: Globe, title: 'Cloud & Déploiement', desc: 'Vercel, Railway, Google Cloud — architecture et scalabilité', color: '#4facfe' },
    { icon: Terminal, title: 'Bas Niveau', desc: 'C/C++, assembleur x86, systèmes embarqués et programmation système', color: '#00ff41' },
  ];

  const experiences = (profile.experience as any[]) || [];

  const education = [
    { period: '2021 — Présent', title: 'Génie Informatique', school: 'École d\'Ingénierie, Yaoundé', desc: '4ème année — Systèmes, Réseaux, IA, Développement logiciel' },
    { period: 'Déc. 2023', title: 'Formation Data Science & IA', school: 'Data Afrique Hub', desc: 'Machine Learning, Analyse de données, Visualisation, Big Data' },
  ];

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: '#080812',
        color: '#F0E6C8',
        fontFamily: 'var(--font-space), sans-serif',
      }}
    >
      {/* ═══ SCAN LINE overlay ═══ */}
      <div
        className="pointer-events-none fixed inset-0 z-50"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)',
        }}
        aria-hidden="true"
      />

      {/* ═══════════════════════════════════════════════
          HERO — matrix rain + boot sequence
      ═══════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden border-b border-[#00ff41]/10">
        <MatrixRain opacity={0.22} color="#00ff41" />

        {/* dark vignette on sides */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#080812]/80 via-transparent to-[#080812]/80 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080812]/60 via-transparent to-[#080812] pointer-events-none" />

        <div className="relative z-10 container mx-auto px-6 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left — avatar + identity */}
            <div className="flex flex-col gap-8">
              {/* Avatar with glitch ring */}
              <div className="relative w-40 h-40">
                <div className="absolute inset-0 rounded-full border-2 border-[#00ff41]/40 animate-ping" style={{ animationDuration: '3s' }} />
                <div className="absolute inset-1 rounded-full border border-[#4facfe]/30" />
                <div className="relative w-full h-full rounded-full overflow-hidden ring-2 ring-[#00ff41]/50">
                  <Image src={profile.avatar} alt={profile.name} fill className="object-cover" priority />
                </div>
                {/* corner decorations */}
                <span className="absolute -top-1 -left-1 text-[#00ff41]/60 font-mono text-[10px]">◤</span>
                <span className="absolute -bottom-1 -right-1 text-[#00ff41]/60 font-mono text-[10px]">◢</span>
              </div>

              {/* Name with glitch style */}
              <div>
                <p className="font-mono text-xs text-[#00ff41]/70 mb-2 tracking-[0.2em] uppercase">// Profil chargé</p>
                <h1
                  className="text-4xl sm:text-5xl font-bold leading-tight"
                  style={{ color: '#F0E6C8', fontFamily: 'var(--font-space)' }}
                >
                  {profile.name}
                </h1>
                <p className="mt-3 text-lg font-mono" style={{ color: '#4facfe' }}>
                  {profile.title}
                </p>
                <div className="mt-2 flex items-center gap-2 text-sm" style={{ color: '#8892a4' }}>
                  <MapPin className="h-3.5 w-3.5 text-[#00ff41]/60" />
                  {profile.location}
                </div>
              </div>

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-3">
                <a
                  href={profile.github ?? '#'}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded border border-[#00ff41]/40 text-[#00ff41] font-mono text-sm hover:bg-[#00ff41]/10 transition-all"
                >
                  <GithubIcon className="h-4 w-4" /> GitHub
                </a>
                <a
                  href={profile.linkedin ?? '#'}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded border border-[#4facfe]/40 text-[#4facfe] font-mono text-sm hover:bg-[#4facfe]/10 transition-all"
                >
                  <Linkedin className="h-4 w-4" /> LinkedIn
                </a>
                <Link
                  href="/contact"
                  className="flex items-center gap-2 px-4 py-2 rounded border border-[#F0E6C8]/20 font-mono text-sm hover:bg-white/5 transition-all"
                  style={{ color: '#F0E6C8' }}
                >
                  <Mail className="h-4 w-4" /> Contact
                </Link>
                <button
                  className="flex items-center gap-2 px-4 py-2 rounded border border-[#a78bfa]/40 text-[#a78bfa] font-mono text-sm hover:bg-[#a78bfa]/10 transition-all"
                >
                  <Download className="h-4 w-4" /> CV.pdf
                </button>
              </div>
            </div>

            {/* Right — terminal boot sequence */}
            <div
              className="rounded-lg border border-[#00ff41]/20 overflow-hidden shadow-2xl"
              style={{ backgroundColor: 'rgba(0,255,65,0.03)', backdropFilter: 'blur(4px)' }}
            >
              {/* Terminal title bar */}
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[#00ff41]/10" style={{ backgroundColor: 'rgba(0,255,65,0.06)' }}>
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                </div>
                <span className="font-mono text-[11px] text-[#8892a4] ml-2">bash — profile@bala:~</span>
              </div>
              <div className="p-5 min-h-[260px]">
                <TerminalBoot lines={BOOT_LINES} speed={30} />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SKILLS — memory map style
      ═══════════════════════════════════════════════ */}
      <section className="relative py-24 overflow-hidden border-b border-[#00ff41]/10">
        <MatrixRain opacity={0.07} color="#4facfe" />
        <div className="relative z-10 container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            <div>
              <p className="font-mono text-xs text-[#00ff41]/60 mb-2 tracking-widest uppercase">// memory_map.dump</p>
              <h2 className="text-3xl font-bold mb-2" style={{ color: '#F0E6C8' }}>Stack Technique</h2>
              <p className="font-mono text-sm mb-10" style={{ color: '#8892a4' }}>
                {`> cat /proc/skills | hexdump -C`}
              </p>
              <SkillBars />
            </div>

            <div>
              <p className="font-mono text-xs text-[#00ff41]/60 mb-2 tracking-widest uppercase">// lscpu --verbose</p>
              <h2 className="text-3xl font-bold mb-8" style={{ color: '#F0E6C8' }}>Domaines</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {DOMAINS.map((d) => (
                  <div
                    key={d.title}
                    className="group p-4 rounded border border-white/5 hover:border-[#00ff41]/30 transition-all duration-300 cursor-default"
                    style={{ backgroundColor: 'rgba(255,255,255,0.02)' }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <d.icon className="h-5 w-5 shrink-0 transition-transform group-hover:scale-110" style={{ color: d.color }} />
                      <span className="font-semibold text-sm" style={{ color: '#F0E6C8' }}>{d.title}</span>
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: '#8892a4' }}>{d.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          EXPERIENCE — git log style
      ═══════════════════════════════════════════════ */}
      <section className="relative py-24 overflow-hidden border-b border-[#00ff41]/10">
        <div className="relative z-10 container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            {/* Expérience */}
            <div>
              <p className="font-mono text-xs text-[#00ff41]/60 mb-2 tracking-widest uppercase">// git log --oneline --graph</p>
              <h2 className="text-3xl font-bold mb-8" style={{ color: '#F0E6C8' }}>Expérience</h2>
              <div className="space-y-0">
                {experiences.map((exp: any, i: number) => (
                  <div key={i} className="flex gap-4 group">
                    {/* git graph column */}
                    <div className="flex flex-col items-center pt-1">
                      <div className="w-3 h-3 rounded-full border-2 border-[#00ff41] bg-[#080812] shrink-0 group-hover:bg-[#00ff41] transition-colors" />
                      {i < experiences.length - 1 && (
                        <div className="w-px flex-1 bg-[#00ff41]/20 my-1" style={{ minHeight: 48 }} />
                      )}
                    </div>
                    <div className="pb-8">
                      <div className="font-mono text-[11px] mb-1" style={{ color: '#8892a4' }}>
                        <span style={{ color: '#f59e0b' }}>commit</span>{' '}
                        <span style={{ color: '#a78bfa' }}>{Math.random().toString(16).slice(2, 9)}</span>
                      </div>
                      <div className="font-mono text-[11px] mb-2" style={{ color: '#8892a4' }}>
                        Date: {exp.startDate}{exp.endDate ? ` → ${exp.endDate}` : ' → présent'}
                      </div>
                      <h3 className="font-semibold" style={{ color: '#F0E6C8' }}>{exp.title}</h3>
                      <p className="font-mono text-xs mb-2" style={{ color: '#00ff41' }}>{exp.company}</p>
                      <p className="text-sm" style={{ color: '#8892a4' }}>{exp.description}</p>
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {(exp.skills || []).map((s: string) => (
                          <span key={s} className="font-mono text-[10px] px-2 py-0.5 rounded border border-[#4facfe]/30" style={{ color: '#4facfe' }}>{s}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Formation */}
            <div>
              <p className="font-mono text-xs text-[#00ff41]/60 mb-2 tracking-widest uppercase">// cat /etc/education</p>
              <h2 className="text-3xl font-bold mb-8" style={{ color: '#F0E6C8' }}>Formation</h2>
              <div className="space-y-0">
                {education.map((edu, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div className="flex flex-col items-center pt-1">
                      <div className="w-3 h-3 rounded-full border-2 border-[#4facfe] bg-[#080812] shrink-0 group-hover:bg-[#4facfe] transition-colors" />
                      {i < education.length - 1 && (
                        <div className="w-px flex-1 bg-[#4facfe]/20 my-1" style={{ minHeight: 48 }} />
                      )}
                    </div>
                    <div className="pb-8">
                      <div className="font-mono text-[11px] mb-2" style={{ color: '#8892a4' }}>
                        <span style={{ color: '#f59e0b' }}>period</span>{' '}
                        <span style={{ color: '#a78bfa' }}>{edu.period}</span>
                      </div>
                      <h3 className="font-semibold" style={{ color: '#F0E6C8' }}>{edu.title}</h3>
                      <p className="font-mono text-xs mb-2" style={{ color: '#4facfe' }}>{edu.school}</p>
                      <p className="text-sm" style={{ color: '#8892a4' }}>{edu.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* GitHub stats box */}
              <div
                className="mt-4 rounded-lg border border-[#a78bfa]/20 p-5"
                style={{ backgroundColor: 'rgba(167,139,250,0.05)' }}
              >
                <p className="font-mono text-xs mb-4" style={{ color: '#a78bfa' }}>
                  {`> gh api user/stats | jq`}
                </p>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { v: '69', l: 'Dépôts' },
                    { v: '1K+', l: 'Commits/an' },
                    { v: '5', l: 'Orgs' },
                  ].map((s) => (
                    <div key={s.l} className="text-center">
                      <p className="text-2xl font-bold" style={{ color: '#F0E6C8' }}>{s.v}</p>
                      <p className="font-mono text-[10px]" style={{ color: '#8892a4' }}>{s.l}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          PHILOSOPHY — terminal cat
      ═══════════════════════════════════════════════ */}
      <section className="relative py-28 overflow-hidden">
        <MatrixRain opacity={0.12} color="#a78bfa" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080812]/80 via-transparent to-[#080812]/80 pointer-events-none" />
        <div className="relative z-10 container mx-auto px-6 max-w-3xl text-center">
          <p className="font-mono text-sm mb-6" style={{ color: '#00ff41' }}>
            {'$ cat ~/philosophy.txt'}
          </p>
          <blockquote
            className="text-2xl sm:text-3xl font-medium leading-relaxed"
            style={{ color: '#F0E6C8' }}
          >
            "Je crois en une approche où la technologie sert à résoudre des
            problèmes réels. Chaque ligne de code doit avoir un but, chaque
            système doit évoluer avec élégance — du bit au service."
          </blockquote>
          <p className="font-mono text-xs mt-8" style={{ color: '#8892a4' }}>
            — Bala Andegue · {`// EOF`}
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Link href="/project">
              <button className="px-6 py-3 rounded border border-[#00ff41]/50 text-[#00ff41] font-mono text-sm hover:bg-[#00ff41]/10 transition-all">
                {'> voir mes projets'}
              </button>
            </Link>
            <Link href="/contact">
              <button className="px-6 py-3 rounded border border-[#4facfe]/50 text-[#4facfe] font-mono text-sm hover:bg-[#4facfe]/10 transition-all">
                {'> me contacter'}
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
