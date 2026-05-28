
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Download, Github, Linkedin, Mail, ExternalLink, Calendar, MapPin, Code2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getPersonalInfo, getProjects, getCertificates } from '@/lib/actions';
import { Project, Certificate } from '@/types';
import { TechKeyboard } from '@/components/animations/TechKeyboard';
import { CodeFlash } from '@/components/animations/CodeFlash';

export default async function HomePage() {
  const [personalInfo, projectsRes, certificatesRes] = await Promise.all([
    getPersonalInfo(),
    getProjects({ limit: 6 }),
    getCertificates({ limit: 6 })
  ]);

  if (!personalInfo) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center space-y-4">
          <Code2 className="h-12 w-12 mx-auto text-muted-foreground" />
          <p className="text-muted-foreground">Base de données non initialisée.</p>
          <p className="text-sm text-muted-foreground">Exécutez : <code className="font-mono bg-muted px-2 py-1 rounded">npx prisma db seed</code></p>
        </div>
      </div>
    );
  }

  const featuredProjects = projectsRes.data.filter((p: Project) => p.featured);
  const allProjects = featuredProjects.length > 0 ? featuredProjects : projectsRes.data.slice(0, 3);
  const featuredCertificates = certificatesRes.data.filter((c: Certificate) => c.featured);
  const allCerts = featuredCertificates.length > 0 ? featuredCertificates : certificatesRes.data.slice(0, 2);

  return (
    <div className="flex flex-col">
      {/* ── Hero Section ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20 py-20 sm:py-28 min-h-[92vh] flex items-center">
        <CodeFlash />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.08)_50%,transparent_75%,transparent)] bg-[length:20px_20px]" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="text-center lg:text-left">
              <div className="mb-8 flex justify-center lg:justify-start">
                <div className="relative h-36 w-36 rounded-full overflow-hidden ring-4 ring-primary/30 shadow-2xl shadow-primary/20">
                  <Image src={personalInfo.avatar} alt={personalInfo.name} fill className="object-cover" priority />
                </div>
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                <span className="text-sm font-medium text-primary">Disponible pour des projets</span>
              </div>

              <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl leading-tight">
                {personalInfo.name}
              </h1>
              <p className="mt-4 text-xl leading-8 text-primary font-semibold">{personalInfo.title}</p>
              <p className="mt-4 text-base leading-7 text-muted-foreground max-w-xl">{personalInfo.bio}</p>

              <div className="mt-6 flex items-center justify-center lg:justify-start gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-primary" />
                  {personalInfo.location}
                </span>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-3">
                <Button asChild size="lg" className="rounded-full shadow-lg shadow-primary/30">
                  <Link href="/contact"><Mail className="mr-2 h-4 w-4" />Me contacter</Link>
                </Button>
                <Button variant="outline" size="lg" className="rounded-full">
                  <Download className="mr-2 h-4 w-4" />Télécharger CV
                </Button>
              </div>

              <div className="mt-8 flex items-center justify-center lg:justify-start gap-4">
                {personalInfo.github && (
                  <a href={personalInfo.github} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
                    <Github className="h-5 w-5" />GitHub
                  </a>
                )}
                {personalInfo.linkedin && (
                  <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
                    <Linkedin className="h-5 w-5" />LinkedIn
                  </a>
                )}
                <a href={`mailto:${personalInfo.email}`}
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
                  <Mail className="h-5 w-5" />Email
                </a>
              </div>
            </div>

            <div className="flex flex-col items-center gap-8">
              <div className="rounded-2xl border border-border/60 bg-card/40 backdrop-blur-sm p-6 shadow-2xl">
                <p className="text-center text-xs font-mono text-muted-foreground mb-4 tracking-widest uppercase">
                  {'<'} Ma Stack Technique {'>'}
                </p>
                <TechKeyboard />
                <p className="text-center text-xs font-mono text-muted-foreground mt-4 opacity-50">
                  // Each key = a tool I use daily
                </p>
              </div>

              <div className="grid grid-cols-4 gap-3 w-full">
                {[
                  { label: 'Repos GitHub', value: '69' },
                  { label: 'Commits / an', value: '1K+' },
                  { label: 'Organisations', value: '5' },
                  { label: 'Certifications', value: '6+' },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-xl border border-border/60 bg-card/40 backdrop-blur-sm p-3 text-center">
                    <p className="text-xl font-extrabold text-primary">{stat.value}</p>
                    <p className="text-[10px] text-muted-foreground mt-1 leading-tight">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Skills Section ── */}
      <section className="py-20 sm:py-24 bg-muted/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Compétences</h2>
            <p className="mt-4 text-lg text-muted-foreground">Technologies que je maîtrise et utilise au quotidien</p>
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {personalInfo.skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="text-sm py-2 px-4 hover:bg-primary hover:text-primary-foreground transition-colors cursor-default">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* ── Projects Section ── */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Projets Récents</h2>
            <p className="mt-4 text-lg text-muted-foreground">Découvrez quelques-uns de mes projets les plus récents</p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {allProjects.map((project: Project) => (
              <Card key={project.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Gradient overlay replacing the flat dark overlay — better readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <Badge variant={project.status === 'completed' ? 'default' : 'secondary'} className="text-xs">
                      {project.status === 'completed' ? 'Terminé' : 'En cours'}
                    </Badge>
                    <div className="flex gap-2">
                      {project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                          className="text-white/80 hover:text-white transition-colors">
                          <Github className="h-4 w-4" />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                          className="text-white/80 hover:text-white transition-colors">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="line-clamp-2 text-base">{project.title}</CardTitle>
                  <CardDescription className="line-clamp-2 text-xs">{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.technologies.slice(0, 3).map((tech: string) => (
                      <Badge key={tech} variant="outline" className="text-xs">{tech}</Badge>
                    ))}
                    {project.technologies.length > 3 && (
                      <Badge variant="outline" className="text-xs">+{project.technologies.length - 3}</Badge>
                    )}
                  </div>
                  <Button asChild variant="ghost" className="w-full h-8 text-xs">
                    <Link href={`/projects/${project.id}`}>
                      Voir le projet <ArrowRight className="ml-2 h-3 w-3" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button asChild variant="outline" size="lg" className="rounded-full">
              <Link href="/project">Voir tous les projets <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── Certifications Section ── */}
      <section className="py-20 sm:py-24 bg-muted/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Certifications</h2>
            <p className="mt-4 text-lg text-muted-foreground">Mes certifications et formations récentes</p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {allCerts.map((certificate: Certificate) => (
              <Card key={certificate.id} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <CardTitle className="line-clamp-2 text-base">{certificate.title}</CardTitle>
                      <CardDescription className="mt-1 font-medium text-primary/80">{certificate.issuer}</CardDescription>
                      <div className="flex items-center text-xs text-muted-foreground mt-2">
                        <Calendar className="h-3.5 w-3.5 mr-1.5 shrink-0" />
                        {new Date(certificate.date).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
                      </div>
                    </div>
                    {certificate.image && (
                      <div className="relative h-14 w-14 rounded-lg overflow-hidden shrink-0 bg-white border border-border/50">
                        <Image src={certificate.image} alt={certificate.title} fill className="object-contain p-1" />
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{certificate.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {certificate.skills.map((skill: string) => (
                      <Badge key={skill} variant="outline" className="text-xs">{skill}</Badge>
                    ))}
                  </div>
                  {certificate.credentialUrl && (
                    <Button asChild variant="ghost" size="sm" className="h-7 text-xs px-2">
                      <a href={certificate.credentialUrl} target="_blank" rel="noopener noreferrer">
                        Voir la certification <ExternalLink className="ml-1.5 h-3 w-3" />
                      </a>
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button asChild variant="outline" size="lg" className="rounded-full">
              <Link href="/certificates">Voir toutes les certifications <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="py-20 sm:py-24 bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Travaillons ensemble</h2>
            <p className="mt-6 text-lg leading-8 opacity-90">
              Vous avez un projet en tête ? N'hésitez pas à me contacter pour discuter de vos besoins.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg" variant="secondary" className="rounded-full">
                <Link href="/contact"><Mail className="mr-2 h-4 w-4" />Me contacter</Link>
              </Button>
              <Button asChild variant="ghost" size="lg" className="rounded-full text-primary-foreground hover:text-primary-foreground hover:bg-primary-foreground/10">
                <Link href="/about">En savoir plus <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
