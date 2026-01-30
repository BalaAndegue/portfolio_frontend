
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Download, Github, Linkedin, Mail, ExternalLink, Calendar, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getPersonalInfo, getProjects, getCertificates } from '@/lib/actions';
import { Project, Certificate } from '@/types';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [personalInfo, projectsRes, certificatesRes] = await Promise.all([
    getPersonalInfo(),
    getProjects({ limit: 3 }),
    getCertificates({ limit: 2 })
  ]);

  if (!personalInfo) {
    return <div>Erreur lors du chargement des données. Veuillez initialiser la base de données.</div>;
  }

  const featuredProjects = projectsRes.data.filter((p: Project) => p.featured);
  const featuredCertificates = certificatesRes.data.filter((c: Certificate) => c.featured);






  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20 py-24 sm:py-32">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.2)_50%,transparent_75%,transparent)] bg-[length:20px_20px]" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-8">
              <div className="relative mx-auto h-32 w-32 rounded-full overflow-hidden ring-4 ring-primary/20">
                <Image
                  src={personalInfo.avatar}
                  alt={personalInfo.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
              {personalInfo.name}
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              {personalInfo.title}
            </p>
            <p className="mt-4 text-base leading-7 text-muted-foreground max-w-2xl">
              {personalInfo.bio}
            </p>
            <div className="mt-8 flex items-center justify-center gap-6">
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mr-2" />
                {personalInfo.location}
              </div>
            </div>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button asChild size="lg">
                <Link href="/contact">
                  <Mail className="mr-2 h-4 w-4" />
                  Me contacter
                </Link>
              </Button>
              <Button variant="outline" size="lg">
                <Download className="mr-2 h-4 w-4" />
                Télécharger CV
              </Button>
            </div>
            <div className="mt-8 flex items-center justify-center gap-6">
              {personalInfo.github && (
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Github className="h-6 w-6" />
                </a>
              )}
              {personalInfo.linkedin && (
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Linkedin className="h-6 w-6" />
                </a>
              )}
              <a
                href={`mailto:${personalInfo.email}`}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Compétences
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Technologies que je maîtrise et utilise au quotidien
            </p>
          </div>
          <div className="mt-16 flex flex-wrap justify-center gap-3">
            {personalInfo.skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="text-sm py-2 px-4">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-24 sm:py-32 bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Projets Récents
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Découvrez quelques-uns de mes projets les plus récents
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {featuredProjects.map((project: Project) => (
              <Card key={project.id} className="group hover:shadow-lg transition-shadow">
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant={project.status === 'completed' ? 'default' : 'secondary'}>
                      {project.status === 'completed' ? 'Terminé' : 'En cours'}
                    </Badge>
                    <div className="flex gap-2">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Github className="h-4 w-4" />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>
                  <CardTitle className="line-clamp-2">{project.title}</CardTitle>
                  <CardDescription className="line-clamp-3">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech: string) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{project.technologies.length - 3}
                      </Badge>
                    )}
                  </div>
                  <Button asChild variant="ghost" className="w-full">
                    <Link href={`/projects/${project.id}`}>
                      Voir le projet
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button asChild variant="outline" size="lg">
              <Link href="/project">
                Voir tous les projets
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Certificates Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Certifications
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Mes certifications et formations récentes
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
            {featuredCertificates.map((certificate: Certificate) => (
              <Card key={certificate.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="line-clamp-2">{certificate.title}</CardTitle>
                      <CardDescription className="mt-2">
                        {certificate.issuer}
                      </CardDescription>
                    </div>
                    {certificate.image && (
                      <div className="relative h-16 w-16 rounded-lg overflow-hidden ml-4">
                        <Image
                          src={certificate.image}
                          alt={certificate.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground mt-2">
                    <Calendar className="h-4 w-4 mr-2" />
                    {new Date(certificate.date).toLocaleDateString('fr-FR', {
                      month: 'long',
                      year: 'numeric'
                    })}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {certificate.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {certificate.skills.map((skill: string) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  {certificate.credentialUrl && (
                    <Button asChild variant="ghost" size="sm">
                      <a href={certificate.credentialUrl} target="_blank" rel="noopener noreferrer">
                        Voir la certification
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button asChild variant="outline" size="lg">
              <Link href="/certificates">
                Voir toutes les certifications
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 sm:py-32 bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Travaillons ensemble
            </h2>
            <p className="mt-6 text-lg leading-8 opacity-90">
              Vous avez un projet en tête ? N'hésitez pas à me contacter pour discuter de vos besoins.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button asChild size="lg" variant="secondary">
                <Link href="/contact">
                  <Mail className="mr-2 h-4 w-4" />
                  Me contacter
                </Link>
              </Button>
              <Button asChild variant="ghost" size="lg" className="text-primary-foreground hover:text-primary-foreground hover:bg-primary-foreground/10">
                <Link href="/about">
                  En savoir plus
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}