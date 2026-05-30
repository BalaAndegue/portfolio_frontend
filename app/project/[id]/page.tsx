import { getProject } from '@/lib/actions';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Calendar, Tag } from 'lucide-react';

function GhIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

interface Props { params: { id: string } }

export default async function ProjectDetailPage({ params }: Props) {
  const project = await getProject(params.id);
  if (!project) notFound();

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="mx-auto max-w-4xl px-6 lg:px-8 py-12">

        {/* Back */}
        <Link href="/project"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 transition-colors mb-8 font-sys-mono">
          <ArrowLeft className="h-4 w-4" />
          Retour aux projets
        </Link>

        {/* Hero image */}
        {project.image && (
          <div className="relative h-64 sm:h-80 rounded-xl overflow-hidden mb-8 border border-gray-200">
            <Image src={project.image} alt={project.title} fill className="object-cover" priority />
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="font-sys-mono text-[11px] px-2 py-0.5 rounded text-white"
                style={{
                  backgroundColor: project.status === 'completed' ? 'rgba(5,150,105,0.85)' : 'rgba(79,172,254,0.85)',
                }}>
                {project.status === 'completed' ? 'TERMINÉ' : 'EN COURS'}
              </span>
              <span className="font-sys-mono text-[11px] text-gray-400 flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {project.startDate}{project.endDate ? ` → ${project.endDate}` : ' → présent'}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">{project.title}</h1>
          </div>

          <div className="flex gap-3 shrink-0">
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:border-gray-400 hover:text-gray-900 transition-all font-sys-mono">
                <GhIcon className="h-4 w-4" />
                Code
              </a>
            )}
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-white font-sys-mono transition-all"
                style={{ backgroundColor: '#4facfe' }}>
                <ExternalLink className="h-4 w-4" />
                Live
              </a>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="prose prose-gray max-w-none mb-8">
          <p className="text-gray-600 leading-relaxed text-base">
            {project.longDescription || project.description}
          </p>
        </div>

        {/* Technologies */}
        <div className="mb-8">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-gray-500 font-sys-mono uppercase tracking-widest mb-4">
            <Tag className="h-3.5 w-3.5" />
            Technologies
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech: string) => (
              <span key={tech} className="font-sys-mono text-xs px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 border border-blue-100">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Gallery */}
        {project.images && project.images.length > 1 && (
          <div>
            <h2 className="text-sm font-semibold text-gray-500 font-sys-mono uppercase tracking-widest mb-4">
              Captures d'écran
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.images.slice(1).map((img: string, i: number) => (
                <div key={i} className="relative h-44 rounded-lg overflow-hidden border border-gray-200">
                  <Image src={img} alt={`${project.title} ${i + 2}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
