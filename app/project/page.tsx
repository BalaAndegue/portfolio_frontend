import { ApiService } from '@/lib/api';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink, ArrowRight } from 'lucide-react';

const ProjectsPage = async () => {
  // Récupération des données
  const profile = await ApiService.getPersonalInfo();
  const projectsResponse = await ApiService.getProjects();
  const featuredProjects = projectsResponse.data;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        {/* Sidebar - Profil */}
        <div className="md:w-1/3 lg:w-1/4 bg-white p-6 rounded-lg shadow-md">
          <div className="text-center mb-6">
            {profile.avatar && (
              <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                <Image
                  src={profile.avatar}
                  alt={profile.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <h1 className="text-2xl font-bold">{profile.name}</h1>
            <p className="text-gray-600">{profile.title}</p>
          </div>

          <div className="space-y-4">
            <div>
              <h2 className="font-semibold">EMAIL</h2>
              <p className="text-gray-600">{profile.email}</p>
            </div>

            <div>
              <h2 className="font-semibold">TÉLÉPHONE</h2>
              <p className="text-gray-600">{profile.phone}</p>
            </div>

            <div>
              <h2 className="font-semibold">LOCALISATION</h2>
              <p className="text-gray-600">{profile.location}</p>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Compétences</h2>
            <div className="flex flex-wrap gap-2">
              {profile.skills.slice(0, 10).map((skill, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Contenu principal - Projets */}
        <div className="md:w-2/3 lg:w-3/4">
          <div className="mx-auto max-w-2xl text-center mb-8">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Projets Récents
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Découvrez quelques-uns de mes projets les plus récents
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {featuredProjects.map((project) => (
              <Card key={project.id} className="group hover:shadow-lg transition-shadow">
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  {project.image && (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
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
                    {project.technologies.slice(0, 3).map((tech) => (
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
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;