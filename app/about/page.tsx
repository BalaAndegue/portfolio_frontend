import { getPersonalInfo } from '@/lib/actions';
import { PersonalInfo } from '@/types';
import { Globe, Code, Database, Cpu, Palette } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default async function AboutPage() {
  const profile = (await getPersonalInfo()) as PersonalInfo;

  if (!profile) return <div>Chargement...</div>;

  const competences = [
    { icon: <Code className="w-6 h-6" />, title: "Développement Full Stack", description: "Création d'applications web performantes avec React, Next.js et Node.js" },
    { icon: <Database className="w-6 h-6" />, title: "Architecture Logicielle", description: "Conception de systèmes scalables et maintenables" },
    { icon: <Cpu className="w-6 h-6" />, title: "Machine Learning", description: "Implémentation de modèles prédictifs et systèmes intelligents" },
    { icon: <Globe className="w-6 h-6" />, title: "Solutions Cloud", description: "Déploiement et optimisation sur AWS, GCP et Azure" },
    { icon: <Palette className="w-6 h-6" />, title: "UI/UX Design", description: "Interfaces intuitives centrées sur l'expérience utilisateur" }
  ];

  const experiences = profile.experience || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <h1 className="text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                {profile.title}
              </h1>
              <p className="mt-6 text-xl text-gray-600">
                {profile.bio}
              </p>
              <div className="mt-8 flex gap-4">
                <Button variant="default" size="lg" asChild>
                  <Link href="/project">Voir mes projets</Link>
                </Button>
                <Button variant="outline" size="lg">
                  Télécharger mon CV
                </Button>
              </div>
            </div>

            <div className="lg:w-1/2 relative">
              <div className="relative w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={profile.avatar}
                  alt={profile.name}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compétences Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">Mes Domaines d'Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {competences.map((item, index) => (
              <div key={index}>
                <Card className="h-full hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-full bg-blue-50 text-blue-600">
                        {item.icon}
                      </div>
                      <CardTitle>{item.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{item.description}</CardDescription>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Parcours Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <Tabs defaultValue="experience" className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-12">
              <TabsTrigger value="experience">Expérience</TabsTrigger>
              <TabsTrigger value="education">Formation</TabsTrigger>
            </TabsList>

            <TabsContent value="experience">
              <div className="space-y-8">
                {experiences.map((exp: any, index: number) => (
                  <div key={index} className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/4">
                      <div className="bg-blue-50 text-blue-600 px-4 py-2 rounded-full w-fit">
                        {exp.startDate} - {exp.endDate || 'Présent'}
                      </div>
                    </div>
                    <div className="md:w-3/4">
                      <h3 className="text-xl font-bold">{exp.title}</h3>
                      <p className="text-blue-600 mb-2">{exp.company}</p>
                      <p className="text-gray-600">{exp.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="education">
              <div className="text-center text-gray-600 p-8">
                Informations de formation bientôt disponibles.
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Philosophie Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <div>
            <h2 className="text-4xl font-bold mb-8">Ma Philosophie</h2>
            <p className="max-w-3xl mx-auto text-xl leading-relaxed">
              "Je crois en une approche centrée sur l'humain où la technologie sert à résoudre des problèmes réels.
              Chaque ligne de code doit avoir un but, chaque interface doit inspirer confiance, et chaque système doit
              évoluer avec élégance."
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}