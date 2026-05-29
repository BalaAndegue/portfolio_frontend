import { getPersonalInfo, getCertificates } from '@/lib/actions';
import { PersonalInfo, Certificate } from '@/types';
import Image from 'next/image';
import { ExternalLink, Calendar, MapPin, Mail, Phone } from 'lucide-react';

export default async function CertificatesPage() {
  const profile = (await getPersonalInfo()) as PersonalInfo;
  const { data: certs } = await getCertificates();

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#080812', color: '#F0E6C8' }}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12 flex flex-col lg:flex-row gap-8">

        {/* Sidebar */}
        <aside className="lg:w-64 xl:w-72 shrink-0">
          <div className="rounded-xl p-5 lg:sticky lg:top-24"
            style={{ backgroundColor: '#0e0e1c', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="text-center mb-5">
              {profile?.avatar && (
                <div className="relative w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden"
                  style={{ boxShadow: '0 0 20px rgba(167,139,250,0.2)' }}>
                  <Image src={profile.avatar} alt={profile.name} fill className="object-cover" />
                </div>
              )}
              <h2 className="font-bold text-sm" style={{ color: '#F0E6C8' }}>{profile?.name}</h2>
              <p className="font-sys-mono text-[11px] mt-1" style={{ color: '#a78bfa' }}>
                {profile?.title?.split('|')[0]?.trim()}
              </p>
            </div>

            <div className="space-y-2.5 text-xs pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="flex items-center gap-2" style={{ color: '#8892a4' }}>
                <Mail className="h-3.5 w-3.5 shrink-0" style={{ color: '#a78bfa', opacity: 0.7 }} />
                <span className="truncate">{profile?.email}</span>
              </div>
              <div className="flex items-center gap-2" style={{ color: '#8892a4' }}>
                <Phone className="h-3.5 w-3.5 shrink-0" style={{ color: '#a78bfa', opacity: 0.7 }} />
                {profile?.phone}
              </div>
              <div className="flex items-center gap-2" style={{ color: '#8892a4' }}>
                <MapPin className="h-3.5 w-3.5 shrink-0" style={{ color: '#a78bfa', opacity: 0.7 }} />
                {profile?.location}
              </div>
            </div>

            <div className="mt-5 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <p className="font-sys-mono text-[10px] mb-3 tracking-widest uppercase" style={{ color: 'rgba(167,139,250,0.5)' }}>
                // skills
              </p>
              <div className="flex flex-wrap gap-1.5">
                {profile?.skills?.slice(0, 8).map((s: string) => (
                  <span key={s} className="font-sys-mono text-[10px] px-1.5 py-0.5 rounded"
                    style={{
                      backgroundColor: 'rgba(167,139,250,0.08)',
                      border: '1px solid rgba(167,139,250,0.2)',
                      color: '#a78bfa',
                    }}>
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
            <p className="font-sys-mono text-xs tracking-widest uppercase mb-2" style={{ color: 'rgba(167,139,250,0.6)' }}>
              // certifications
            </p>
            <h1 className="text-3xl font-bold" style={{ color: '#F0E6C8' }}>Licences &amp; Certifications</h1>
            <p className="mt-2 text-sm" style={{ color: '#8892a4' }}>
              {certs.length} certification{certs.length > 1 ? 's' : ''}
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            {(certs as Certificate[]).map((cert) => (
              <div
                key={cert.id}
                className="sys-card-purple flex gap-4 p-4 rounded-xl transition-all duration-300"
                style={{ backgroundColor: '#0e0e1c', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                {cert.image && (
                  <div className="relative h-14 w-14 rounded-lg overflow-hidden shrink-0 bg-white border border-white/10">
                    <Image src={cert.image} alt={cert.title} fill className="object-contain p-1" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm leading-snug mb-0.5 line-clamp-2" style={{ color: '#F0E6C8' }}>
                    {cert.title}
                  </h3>
                  <p className="font-sys-mono text-xs mb-1.5" style={{ color: '#a78bfa' }}>{cert.issuer}</p>
                  <div className="flex items-center gap-1.5 text-[11px] mb-2" style={{ color: '#8892a4' }}>
                    <Calendar className="h-3 w-3 shrink-0" />
                    {new Date(cert.date).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
                  </div>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {cert.skills.slice(0, 3).map((s: string) => (
                      <span key={s} className="font-sys-mono text-[9px] px-1.5 py-0.5 rounded"
                        style={{ backgroundColor: 'rgba(167,139,250,0.08)', border: '1px solid rgba(167,139,250,0.18)', color: '#a78bfa' }}>
                        {s}
                      </span>
                    ))}
                    {cert.skills.length > 3 && (
                      <span className="font-sys-mono text-[9px] px-1.5 py-0.5 rounded"
                        style={{ color: '#8892a4', border: '1px solid rgba(255,255,255,0.08)' }}>
                        +{cert.skills.length - 3}
                      </span>
                    )}
                  </div>
                  {cert.credentialUrl && (
                    <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer"
                      className="sys-diplome inline-flex items-center gap-1 font-sys-mono text-[10px] px-2.5 py-1 rounded transition-all"
                      style={{ border: '1px solid rgba(167,139,250,0.3)', color: '#a78bfa' }}>
                      Afficher le diplôme <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </main>

      </div>
    </div>
  );
}
