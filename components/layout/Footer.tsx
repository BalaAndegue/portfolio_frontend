'use client';
import Link from 'next/link';
import { Linkedin, Mail, MapPin, Phone, Terminal } from 'lucide-react';

function GhIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

const NAV_LINKS = [
  { name: 'Accueil',        href: '/' },
  { name: 'À propos',       href: '/about' },
  { name: 'Projets',        href: '/project' },
  { name: 'Certifications', href: '/certificates' },
  { name: 'Contact',        href: '/contact' },
];

export function Footer() {
  return (
    <footer
      style={{
        backgroundColor: '#06060f',
        borderTop: '1px solid rgba(0,255,65,0.1)',
      }}
    >
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4 group w-fit">
              <div
                className="w-7 h-7 rounded flex items-center justify-center"
                style={{
                  border: '1px solid rgba(0,255,65,0.4)',
                  backgroundColor: 'rgba(0,255,65,0.07)',
                  boxShadow: '0 0 8px rgba(0,255,65,0.15)',
                }}
              >
                <Terminal className="h-3.5 w-3.5" style={{ color: '#00ff41' }} />
              </div>
              <span className="font-sys-mono font-bold text-base" style={{ color: '#F0E6C8' }}>
                bala<span style={{ color: '#00ff41' }}>@</span>dev
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: '#8892a4' }}>
              Développeur Full Stack & IA · Génie Informatique 4A · Yaoundé, Cameroun
            </p>
            <div className="flex items-center gap-3 mt-5">
              <a
                href="https://github.com/BalaAndegue"
                target="_blank" rel="noopener noreferrer"
                className="transition-opacity hover:opacity-80"
                style={{ color: '#8892a4' }}
                aria-label="GitHub"
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#F0E6C8'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#8892a4'}
              >
                <GhIcon className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/fran%C3%A7ois-lionnel-bala-andegue-0118612b2"
                target="_blank" rel="noopener noreferrer"
                style={{ color: '#8892a4' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#4facfe'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#8892a4'}
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5 transition-colors" />
              </a>
              <a
                href="mailto:balaandeguefrancoislionnel@gmail.com"
                style={{ color: '#8892a4' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#00ff41'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#8892a4'}
                aria-label="Email"
              >
                <Mail className="h-5 w-5 transition-colors" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-sys-mono text-xs tracking-widest uppercase mb-5" style={{ color: '#00ff41', opacity: 0.7 }}>
              // Navigation
            </h3>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((l) => (
                <li key={l.name}>
                  <Link
                    href={l.href}
                    className="text-sm transition-colors flex items-center gap-2 group w-fit"
                    style={{ color: '#8892a4' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#F0E6C8'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#8892a4'}
                  >
                    <span className="font-sys-mono text-[10px]" style={{ color: 'rgba(0,255,65,0.4)' }}>›</span>
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-sys-mono text-xs tracking-widest uppercase mb-5" style={{ color: '#4facfe', opacity: 0.7 }}>
              // Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <Mail className="h-4 w-4 mt-0.5 shrink-0" style={{ color: '#4facfe', opacity: 0.6 }} />
                <span className="text-sm break-all" style={{ color: '#8892a4' }}>
                  balaandeguefrancoislionnel@gmail.com
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0" style={{ color: '#4facfe', opacity: 0.6 }} />
                <span className="text-sm" style={{ color: '#8892a4' }}>+237 656 616 751</span>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 shrink-0" style={{ color: '#4facfe', opacity: 0.6 }} />
                <span className="text-sm" style={{ color: '#8892a4' }}>Yaoundé, Cameroun</span>
              </li>
            </ul>

            <div
              className="mt-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
              style={{
                backgroundColor: 'rgba(0,255,65,0.07)',
                border: '1px solid rgba(0,255,65,0.2)',
              }}
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
              </span>
              <span className="font-sys-mono text-[10px]" style={{ color: '#00ff41' }}>
                Disponible pour des projets
              </span>
            </div>
          </div>

        </div>
      </div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="mx-auto max-w-7xl px-6 py-4 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-sys-mono text-[11px]" style={{ color: '#8892a4', opacity: 0.6 }}>
            © {new Date().getFullYear()} Bala Andegue François Lionnel
          </p>
          <p className="font-sys-mono text-[11px]" style={{ color: '#8892a4', opacity: 0.4 }}>
            Built with Next.js · Prisma · Vercel
          </p>
        </div>
      </div>
    </footer>
  );
}
