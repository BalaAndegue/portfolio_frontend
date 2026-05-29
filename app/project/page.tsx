import { getPersonalInfo, getProjects } from '@/lib/actions';
import { Project, PersonalInfo } from '@/types';
import Image from 'next/image';
import { ExternalLink, MapPin, Mail, Phone } from 'lucide-react';

function GhIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

export default async function ProjectsPage() {
  const profile = (await getPersonalInfo()) as PersonalInfo;
  const { data: projects } = await getProjects();

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12 flex flex-col lg:flex-row gap-8">

        {/* Sidebar */}
        <aside className="lg:w-64 xl:w-72 shrink-0">
          <div className="rounded-xl p-5 lg:sticky lg:top-24 bg-gray-50 border border-gray-200">
            <div className="text-center mb-5">
              {profile?.avatar && (
                <div className="relative w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden ring-2 ring-blue-100">
                  <Image src={profile.avatar} alt={profile.name} fill className="object-cover" />
                </div>
              )}
              <h2 className="font-bold text-sm text-gray-900">{profile?.name}</h2>
              <p className="font-sys-mono text-[11px] mt-1 text-[#4facfe]">
                {profile?.title?.split('|')[0]?.trim()}
              </p>
            </div>

            <div className="space-y-2.5 text-xs pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2 text-gray-500">
                <Mail className="h-3.5 w-3.5 shrink-0 text-gray-400" />
                <span className="truncate">{profile?.email}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <Phone className="h-3.5 w-3.5 shrink-0 text-gray-400" />
                {profile?.phone}
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-gray-400" />
                {profile?.location}
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-gray-200">
              <p className="font-sys-mono text-[10px] mb-3 tracking-widest uppercase text-[#4facfe] opacity-70">
                // skills
              </p>
              <div className="flex flex-wrap gap-1.5">
                {profile?.skills?.slice(0, 8).map((s: string) => (
                  <span key={s} className="font-sys-mono text-[10px] px-1.5 py-0.5 rounded bg-blue-50 text-blue-600 border border-blue-100">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 min-w-0">
          <div className="mb-8">
            <p className="font-sys-mono text-xs tracking-widest uppercase mb-2 text-[#4facfe] opacity-70">// projects</p>
            <h1 className="text-3xl font-bold text-gray-900">Projets</h1>
            <p className="mt-2 text-sm text-gray-500">
              {projects.length} projets · {projects.filter((p: Project) => p.status === 'completed').length} terminés
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
            {(projects as Project[]).map((p) => (
              <div
                key={p.id}
                className="sys-card group rounded-xl overflow-hidden border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative h-44 overflow-hidden">
                  <Image src={p.image} alt={p.title} fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="font-sys-mono text-[10px] px-2 py-0.5 rounded text-white"
                      style={{
                        backgroundColor: p.status === 'completed' ? 'rgba(5,150,105,0.85)' : 'rgba(79,172,254,0.85)',
                      }}>
                      {p.status === 'completed' ? 'DONE' : 'ACTIVE'}
                    </span>
                    <div className="flex gap-2">
                      {p.githubUrl && (
                        <a href={p.githubUrl} target="_blank" rel="noopener noreferrer"
                          className="text-white/70 hover:text-white transition-colors">
                          <GhIcon className="h-3.5 w-3.5" />
                        </a>
                      )}
                      {p.liveUrl && (
                        <a href={p.liveUrl} target="_blank" rel="noopener noreferrer"
                          className="text-white/70 hover:text-white transition-colors">
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-sm mb-2 text-gray-900">{p.title}</h3>
                  <p className="text-xs leading-relaxed line-clamp-2 mb-3 text-gray-500">{p.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {p.technologies.slice(0, 4).map((t: string) => (
                      <span key={t} className="font-sys-mono text-[10px] px-1.5 py-0.5 rounded bg-blue-50 text-blue-600 border border-blue-100">
                        {t}
                      </span>
                    ))}
                    {p.technologies.length > 4 && (
                      <span className="font-sys-mono text-[10px] px-1.5 py-0.5 rounded text-gray-400 border border-gray-200">
                        +{p.technologies.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
