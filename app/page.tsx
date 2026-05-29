
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Download, Linkedin, Mail, ExternalLink, MapPin } from 'lucide-react';
import { getPersonalInfo, getProjects, getCertificates } from '@/lib/actions';
import { Project, Certificate } from '@/types';
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
      <div className="flex min-h-screen items-center justify-center bg-white">
        <p className="text-sm text-gray-500">
          Initialiser la DB :{' '}
          <code className="px-2 py-0.5 rounded bg-gray-100 font-sys-mono text-xs">npx prisma db seed</code>
        </p>
      </div>
    );
  }

  const featuredProjects = projectsRes.data.filter((p: Project) => p.featured).slice(0, 3);
  const featuredCerts    = certificatesRes.data.filter((c: Certificate) => c.featured);

  return (
    <div className="flex flex-col bg-white text-gray-900">

      {/* ══ HERO ══════════════════════════════════════════════ */}
      <section className="relative overflow-hidden min-h-screen flex items-center border-b border-gray-100">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 -z-10"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(79,172,254,0.08) 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }} />
        {/* Soft gradient */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50/60 via-white to-white" />

        <div className="mx-auto max-w-7xl px-6 lg:px-8 w-full py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center">

            {/* ── Identity ── */}
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left gap-6">

              {/* Avatar */}
              <div className="relative w-28 h-28 sm:w-32 sm:h-32">
                <div className="absolute inset-0 rounded-full"
                  style={{ boxShadow: '0 0 0 4px white, 0 0 0 6px rgba(79,172,254,0.3)' }} />
                <div className="relative w-full h-full rounded-full overflow-hidden">
                  <Image src={personalInfo.avatar} alt={personalInfo.name} fill className="object-cover" priority />
                </div>
              </div>

              {/* Availability badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-sys-mono bg-emerald-50 border border-emerald-200 text-emerald-700">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                </span>
                Disponible pour des projets
              </div>

              {/* Name */}
              <div>
                <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold leading-tight text-gray-900">
                  {personalInfo.name}
                </h1>
                <p className="mt-3 text-base sm:text-lg font-sys-mono text-[#4facfe] font-medium">
                  {personalInfo.title}
                </p>
                <p className="mt-3 text-sm leading-7 text-gray-500 max-w-lg">
                  {personalInfo.bio}
                </p>
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <MapPin className="h-3.5 w-3.5 text-[#4facfe]" />
                {personalInfo.location}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3">
                <Link href="/contact">
                  <button
                    className="sys-glow-blue flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-all"
                    style={{ backgroundColor: '#4facfe', boxShadow: '0 4px 16px rgba(79,172,254,0.3)' }}
                  >
                    <Mail className="h-4 w-4" />
                    Me contacter
                  </button>
                </Link>
                <button
                  className="sys-btn-glass flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-gray-700 border border-gray-200 transition-all"
                >
                  <Download className="h-4 w-4" />
                  Télécharger CV
                </button>
              </div>

              {/* Social */}
              <div className="flex items-center gap-5">
                {personalInfo.github && (
                  <a href={personalInfo.github} target="_blank" rel="noopener noreferrer"
                    className="sys-link flex items-center gap-1.5 text-sm text-gray-400 transition-colors">
                    <GhIcon className="h-4 w-4" />
                    <span className="hidden sm:inline">GitHub</span>
                  </a>
                )}
                {personalInfo.linkedin && (
                  <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer"
                    className="sys-link-blue flex items-center gap-1.5 text-sm text-gray-400 transition-colors">
                    <Linkedin className="h-4 w-4" />
                    <span className="hidden sm:inline">LinkedIn</span>
                  </a>
                )}
                <a href={`mailto:${personalInfo.email}`}
                  className="sys-link-green flex items-center gap-1.5 text-sm text-gray-400 transition-colors">
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
                  <div key={s.l} className="text-center rounded-lg py-2.5 bg-gray-50 border border-gray-100">
                    <p className="text-lg font-extrabold text-[#4facfe]">{s.v}</p>
                    <p className="font-sys-mono text-[9px] text-gray-400 mt-0.5">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── DevScene — terminaux sombres (absolument nécessaire pour le code) ── */}
            <div className="hidden lg:block">
              <DevScene />
            </div>
          </div>
        </div>
      </section>

      {/* ══ SKILLS ══ */}
      <section className="py-20 bg-gray-50 border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-10 text-center">
            <p className="font-sys-mono text-xs text-[#4facfe] mb-2 tracking-widest uppercase">// skills</p>
            <h2 className="text-3xl font-bold text-gray-900">Compétences</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-2.5 max-w-3xl mx-auto">
            {personalInfo.skills.map((skill: string) => (
              <span
                key={skill}
                className="sys-skill px-3 py-1.5 rounded-lg text-xs font-sys-mono cursor-default transition-all bg-white border border-gray-200 text-gray-600"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PROJECTS ══ */}
      <section className="py-20 bg-white border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="font-sys-mono text-xs text-[#4facfe] mb-2 tracking-widest uppercase">// projects</p>
            <h2 className="text-3xl font-bold text-gray-900">Projets Récents</h2>
            <p className="mt-3 text-sm text-gray-500">Applications actives en production</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project: Project) => (
              <div
                key={project.id}
                className="sys-card group rounded-xl overflow-hidden border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={project.image} alt={project.title} fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="font-sys-mono text-[10px] px-2 py-0.5 rounded text-white"
                      style={{
                        backgroundColor: project.status === 'completed'
                          ? 'rgba(5,150,105,0.85)'
                          : 'rgba(79,172,254,0.85)',
                      }}>
                      {project.status === 'completed' ? 'DONE' : 'ACTIVE'}
                    </span>
                    <div className="flex gap-2">
                      {project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                          className="text-white/70 hover:text-white transition-colors">
                          <GhIcon className="h-3.5 w-3.5" />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                          className="text-white/70 hover:text-white transition-colors">
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-sm mb-1.5 line-clamp-1 text-gray-900">{project.title}</h3>
                  <p className="text-xs leading-relaxed line-clamp-2 mb-3 text-gray-500">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 3).map((tech: string) => (
                      <span key={tech} className="font-sys-mono text-[10px] px-1.5 py-0.5 rounded bg-blue-50 text-blue-600 border border-blue-100">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="font-sys-mono text-[10px] px-1.5 py-0.5 rounded text-gray-400 border border-gray-200">
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
              <button className="sys-btn-blue inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-sys-mono border border-[#4facfe] text-[#4facfe] transition-all">
                Voir tous les projets <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ══ CERTIFICATIONS ══ */}
      <section className="py-20 bg-gray-50 border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="font-sys-mono text-xs text-purple-500 mb-2 tracking-widest uppercase">// certifications</p>
            <h2 className="text-3xl font-bold text-gray-900">Certifications</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 max-w-3xl mx-auto">
            {featuredCerts.map((cert: Certificate) => (
              <div
                key={cert.id}
                className="sys-card-purple flex gap-4 p-4 rounded-xl bg-white border border-gray-200 transition-all"
              >
                {cert.image && (
                  <div className="relative h-12 w-12 rounded-lg overflow-hidden shrink-0 bg-white border border-gray-100">
                    <Image src={cert.image} alt={cert.title} fill className="object-contain p-1" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm line-clamp-1 mb-0.5 text-gray-900">{cert.title}</h3>
                  <p className="font-sys-mono text-xs text-purple-500 mb-1">{cert.issuer}</p>
                  <p className="font-sys-mono text-[10px] text-gray-400">
                    {new Date(cert.date).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })}
                  </p>
                  {cert.credentialUrl && (
                    <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer"
                      className="sys-link-blue inline-flex items-center gap-1 font-sys-mono text-[10px] mt-2 text-[#4facfe] transition-colors">
                      Voir le diplôme <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link href="/certificates">
              <button className="sys-btn-purple inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-sys-mono border border-purple-200 text-purple-500 transition-all">
                Voir toutes les certifications <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ══ CTA — sombre car section de rupture (absolument nécessaire) ══ */}
      <section className="py-24 relative overflow-hidden" style={{ backgroundColor: '#0a0a12' }}>
        <div className="absolute inset-0 -z-10"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(79,172,254,0.06) 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }} />
        <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
          <p className="font-sys-mono text-xs mb-4 tracking-widest uppercase text-[#4facfe] opacity-70">
            {'$ ./contact.sh --init'}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">
            Travaillons ensemble
          </h2>
          <p className="text-sm mb-10 leading-relaxed text-gray-400">
            Vous avez un projet en tête ? Discutons-en — de la conception à la mise en production.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/contact">
              <button
                className="sys-glow-blue flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm text-white transition-all"
                style={{ backgroundColor: '#4facfe', boxShadow: '0 4px 20px rgba(79,172,254,0.35)' }}
              >
                <Mail className="h-4 w-4" /> Me contacter
              </button>
            </Link>
            <Link href="/about">
              <button className="sys-btn-glass flex items-center gap-2 px-6 py-3 rounded-lg text-sm text-gray-300 border border-white/10 transition-all">
                En savoir plus <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
