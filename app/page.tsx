
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Download, Linkedin, Mail, ExternalLink, MapPin } from 'lucide-react';
import { getPersonalInfo, getProjects, getCertificates } from '@/lib/actions';
import { Project, Certificate } from '@/types';
import { CodeFlash } from '@/components/animations/CodeFlash';
import { DevScene } from '@/components/home/DevScene';

function GhIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

export default async function HomePage() {
  const [personalInfo, projectsRes, certificatesRes] = await Promise.all([
    getPersonalInfo(),
    getProjects({ limit: 6 }),
    getCertificates({ limit: 6 }),
  ]);

  if (!personalInfo) {
    return (
      <div className="flex min-h-screen items-center justify-center" style={{ backgroundColor: '#080812' }}>
        <p className="font-sys-mono text-sm" style={{ color: '#8892a4' }}>
          {'> '}<code className="px-2 py-0.5 rounded" style={{ backgroundColor: '#0e0e1c', color: '#00ff41' }}>npx prisma db seed</code>
        </p>
      </div>
    );
  }

  const featuredProjects = projectsRes.data.filter((p: Project) => p.featured).slice(0, 3);
  const featuredCerts    = certificatesRes.data.filter((c: Certificate) => c.featured);

  return (
    <div className="flex flex-col" style={{ backgroundColor: '#080812', color: '#F0E6C8' }}>

      {/* ══ HERO ══════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden min-h-screen flex items-center"
        style={{ borderBottom: '1px solid rgba(0,255,65,0.08)' }}
      >
        <CodeFlash />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080812]/90 via-transparent to-[#080812]/50 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080812]/40 via-transparent to-[#080812] pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 w-full py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center">

            {/* Identity */}
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left gap-6">

              {/* Avatar */}
              <div className="relative w-28 h-28 sm:w-32 sm:h-32">
                <div className="absolute inset-0 rounded-full animate-ping opacity-20"
                  style={{ border: '2px solid #00ff41', animationDuration: '3s' }} />
                <div className="absolute inset-1 rounded-full"
                  style={{ border: '1px solid rgba(79,172,254,0.2)' }} />
                <div className="relative w-full h-full rounded-full overflow-hidden"
                  style={{ boxShadow: '0 0 32px rgba(0,255,65,0.2), 0 0 0 2px rgba(0,255,65,0.3)' }}>
                  <Image src={personalInfo.avatar} alt={personalInfo.name} fill className="object-cover" priority />
                </div>
              </div>

              {/* Availability */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full font-sys-mono text-xs"
                style={{ border: '1px solid rgba(0,255,65,0.3)', backgroundColor: 'rgba(0,255,65,0.06)', color: '#00ff41' }}>
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
                </span>
                Disponible pour des projets
              </div>

              {/* Name */}
              <div>
                <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold leading-tight" style={{ color: '#F0E6C8' }}>
                  {personalInfo.name}
                </h1>
                <p className="mt-3 text-base sm:text-lg font-sys-mono" style={{ color: '#4facfe' }}>
                  {personalInfo.title}
                </p>
                <p className="mt-3 text-sm leading-7 max-w-lg" style={{ color: '#8892a4' }}>
                  {personalInfo.bio}
                </p>
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 text-sm" style={{ color: '#8892a4' }}>
                <MapPin className="h-3.5 w-3.5" style={{ color: '#00ff41', opacity: 0.7 }} />
                {personalInfo.location}
              </div>

              {/* CTA */}
              <div className="flex flex-wrap gap-3">
                <Link href="/contact">
                  <button
                    className="sys-glow-blue flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all"
                    style={{ backgroundColor: '#4facfe', color: '#080812', boxShadow: '0 0 20px rgba(79,172,254,0.3)' }}
                  >
                    <Mail className="h-4 w-4" />
                    Me contacter
                  </button>
                </Link>
                <button
                  className="sys-btn-glass flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all"
                  style={{ border: '1px solid rgba(240,230,200,0.2)', color: '#F0E6C8' }}
                >
                  <Download className="h-4 w-4" />
                  Télécharger CV
                </button>
              </div>

              {/* Social */}
              <div className="flex items-center gap-5">
                {personalInfo.github && (
                  <a href={personalInfo.github} target="_blank" rel="noopener noreferrer"
                    className="sys-link flex items-center gap-1.5 text-xs transition-colors"
                    style={{ color: '#8892a4' }}>
                    <GhIcon className="h-4 w-4" />
                    <span className="hidden sm:inline">GitHub</span>
                  </a>
                )}
                {personalInfo.linkedin && (
                  <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer"
                    className="sys-link-blue flex items-center gap-1.5 text-xs transition-colors"
                    style={{ color: '#8892a4' }}>
                    <Linkedin className="h-4 w-4" />
                    <span className="hidden sm:inline">LinkedIn</span>
                  </a>
                )}
                <a href={`mailto:${personalInfo.email}`}
                  className="sys-link-green flex items-center gap-1.5 text-xs transition-colors"
                  style={{ color: '#8892a4' }}>
                  <Mail className="h-4 w-4" />
                  <span className="hidden sm:inline">Email</span>
                </a>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-4 gap-3 w-full max-w-xs sm:max-w-sm">
                {[
                  { v: '69',  l: 'Repos' },
                  { v: '1K+', l: 'Commits' },
                  { v: '5',   l: 'Orgs' },
                  { v: '6+',  l: 'Certifs' },
                ].map(s => (
                  <div key={s.l} className="text-center rounded-lg py-2.5 transition-colors"
                    style={{ backgroundColor: 'rgba(14,14,28,0.8)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <p className="text-lg font-extrabold" style={{ color: '#4facfe' }}>{s.v}</p>
                    <p className="font-sys-mono text-[9px] mt-0.5" style={{ color: '#8892a4' }}>{s.l}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* DevScene desktop */}
            <div className="hidden lg:block">
              <DevScene />
            </div>
          </div>
        </div>
      </section>

      {/* ══ SKILLS ══════════════════════════════════════════════ */}
      <section className="py-20" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-10 text-center">
            <p className="font-sys-mono text-xs mb-2 tracking-widest uppercase" style={{ color: 'rgba(0,255,65,0.6)' }}>// skills</p>
            <h2 className="text-3xl font-bold" style={{ color: '#F0E6C8' }}>Compétences</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-2.5 max-w-3xl mx-auto">
            {personalInfo.skills.map((skill: string) => (
              <span
                key={skill}
                className="sys-skill px-3 py-1.5 rounded text-xs font-sys-mono transition-all cursor-default"
                style={{
                  backgroundColor: 'rgba(14,14,28,0.9)',
                  border: '1px solid rgba(79,172,254,0.15)',
                  color: '#8892a4',
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PROJECTS ══════════════════════════════════════════════ */}
      <section className="py-20" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="font-sys-mono text-xs mb-2 tracking-widest uppercase" style={{ color: 'rgba(79,172,254,0.6)' }}>// projects</p>
            <h2 className="text-3xl font-bold" style={{ color: '#F0E6C8' }}>Projets Récents</h2>
            <p className="mt-3 text-sm" style={{ color: '#8892a4' }}>Applications actives en production</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredProjects.map((project: Project) => (
              <div
                key={project.id}
                className="sys-card group rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
                style={{
                  backgroundColor: 'rgba(14,14,28,0.9)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
                }}
              >
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src={project.image} alt={project.title} fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e1c] via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="font-sys-mono text-[10px] px-2 py-0.5 rounded"
                      style={{
                        backgroundColor: project.status === 'completed' ? 'rgba(0,255,65,0.15)' : 'rgba(79,172,254,0.15)',
                        color: project.status === 'completed' ? '#00ff41' : '#4facfe',
                        border: `1px solid ${project.status === 'completed' ? 'rgba(0,255,65,0.3)' : 'rgba(79,172,254,0.3)'}`,
                      }}>
                      {project.status === 'completed' ? 'DONE' : 'ACTIVE'}
                    </span>
                    <div className="flex gap-2">
                      {project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                          className="text-white/50 hover:text-white transition-colors">
                          <GhIcon className="h-3.5 w-3.5" />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                          className="text-white/50 hover:text-white transition-colors">
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-sm mb-1.5 line-clamp-1" style={{ color: '#F0E6C8' }}>{project.title}</h3>
                  <p className="text-xs leading-relaxed line-clamp-2 mb-3" style={{ color: '#8892a4' }}>{project.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 3).map((tech: string) => (
                      <span key={tech} className="font-sys-mono text-[10px] px-1.5 py-0.5 rounded"
                        style={{ backgroundColor: 'rgba(79,172,254,0.08)', border: '1px solid rgba(79,172,254,0.2)', color: '#4facfe' }}>
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="font-sys-mono text-[10px] px-1.5 py-0.5 rounded"
                        style={{ color: '#8892a4', border: '1px solid rgba(255,255,255,0.08)' }}>
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link href="/project">
              <button
                className="sys-btn-blue inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-sys-mono transition-all"
                style={{ border: '1px solid rgba(79,172,254,0.3)', color: '#4facfe' }}
              >
                Voir tous les projets
                <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ══ CERTIFICATIONS ══════════════════════════════════════════════ */}
      <section className="py-20" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="font-sys-mono text-xs mb-2 tracking-widest uppercase" style={{ color: 'rgba(167,139,250,0.6)' }}>// certifications</p>
            <h2 className="text-3xl font-bold" style={{ color: '#F0E6C8' }}>Certifications</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 max-w-3xl mx-auto">
            {featuredCerts.map((cert: Certificate) => (
              <div
                key={cert.id}
                className="sys-card-purple flex gap-4 p-4 rounded-xl transition-all"
                style={{ backgroundColor: 'rgba(14,14,28,0.9)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                {cert.image && (
                  <div className="relative h-12 w-12 rounded-lg overflow-hidden shrink-0 bg-white">
                    <Image src={cert.image} alt={cert.title} fill className="object-contain p-1" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm line-clamp-1 mb-0.5" style={{ color: '#F0E6C8' }}>{cert.title}</h3>
                  <p className="font-sys-mono text-xs mb-1" style={{ color: '#a78bfa' }}>{cert.issuer}</p>
                  <p className="font-sys-mono text-[10px]" style={{ color: '#8892a4' }}>
                    {new Date(cert.date).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })}
                  </p>
                  {cert.credentialUrl && (
                    <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer"
                      className="sys-link-blue inline-flex items-center gap-1 font-sys-mono text-[10px] mt-2 transition-colors"
                      style={{ color: '#4facfe' }}>
                      Voir le diplôme <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link href="/certificates">
              <button
                className="sys-btn-purple inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-sys-mono transition-all"
                style={{ border: '1px solid rgba(167,139,250,0.3)', color: '#a78bfa' }}
              >
                Voir toutes les certifications
                <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ══ CTA ══════════════════════════════════════════════ */}
      <section className="py-24 relative overflow-hidden">
        <CodeFlash />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080812]/80 via-transparent to-[#080812]/80 pointer-events-none" />
        <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
          <p className="font-sys-mono text-xs mb-4 tracking-widest uppercase" style={{ color: 'rgba(0,255,65,0.6)' }}>
            {'$ ./contact.sh --init'}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-6" style={{ color: '#F0E6C8' }}>
            Travaillons ensemble
          </h2>
          <p className="text-sm mb-10 leading-relaxed" style={{ color: '#8892a4' }}>
            Vous avez un projet en tête ? Discutons-en — de la conception à la mise en production.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/contact">
              <button
                className="sys-glow-blue flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all"
                style={{ backgroundColor: '#4facfe', color: '#080812', boxShadow: '0 0 24px rgba(79,172,254,0.35)' }}
              >
                <Mail className="h-4 w-4" /> Me contacter
              </button>
            </Link>
            <Link href="/about">
              <button
                className="sys-btn-glass flex items-center gap-2 px-6 py-3 rounded-lg text-sm transition-all"
                style={{ border: '1px solid rgba(240,230,200,0.2)', color: '#F0E6C8' }}
              >
                En savoir plus <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
