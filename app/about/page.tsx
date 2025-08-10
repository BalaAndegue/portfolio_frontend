
'use client';

import { motion } from 'framer-motion';
import { Globe, Code, Database, Cpu, Palette } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function AboutPage() {
  const competences = [
    { icon: <Code className="w-6 h-6" />, title: "Développement Full Stack", description: "Création d'applications web performantes avec React, Next.js et Node.js" },
    { icon: <Database className="w-6 h-6" />, title: "Architecture Logicielle", description: "Conception de systèmes scalables et maintenables" },
    { icon: <Cpu className="w-6 h-6" />, title: "Machine Learning", description: "Implémentation de modèles prédictifs et systèmes intelligents" },
    { icon: <Globe className="w-6 h-6" />, title: "Solutions Cloud", description: "Déploiement et optimisation sur AWS, GCP et Azure" },
    { icon: <Palette className="w-6 h-6" />, title: "UI/UX Design", description: "Interfaces intuitives centrées sur l'expérience utilisateur" }
  ];

  const experiences = [
    { year: "2023-Présent", role: "Développeur Full Stack", company: "Freelance", description: "Conception et réalisation de solutions web sur mesure pour clients internationaux" },
    { year: "2021-2023", role: "Ingénieur Logiciel", company: "TechInnov", description: "Développement d'une plateforme SaaS utilisée par plus de 50 entreprises" },
    { year: "2019-2021", role: "Développeur Backend", company: "WebSolutions", description: "Optimisation des performances et mise en place de microservices" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2"
            >
              <h1 className="text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                Passionné par l'innovation technologique
              </h1>
              <p className="mt-6 text-xl text-gray-600">
                Je transforme des idées ambitieuses en solutions logicielles élégantes et performantes. 
                Mon approche allie excellence technique et design minutieux.
              </p>
              <div className="mt-8 flex gap-4">
                <Button variant="default" size="lg">
                  Voir mes projets
                </Button>
                <Button variant="outline" size="lg">
                  Télécharger mon CV
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2 relative"
            >
              <div className="relative w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src= 'https://i.pinimg.com/736x/2c/3a/a5/2c3aa5d147d231fee6ba7be26c3e53c7.jpg'
                  alt="Bala Andegue Francois"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Compétences Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">Mes Domaines d'Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {competences.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
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
              </motion.div>
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
                {experiences.map((exp, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="flex flex-col md:flex-row gap-6"
                  >
                    <div className="md:w-1/4">
                      <div className="bg-blue-50 text-blue-600 px-4 py-2 rounded-full w-fit">
                        {exp.year}
                      </div>
                    </div>
                    <div className="md:w-3/4">
                      <h3 className="text-xl font-bold">{exp.role}</h3>
                      <p className="text-blue-600 mb-2">{exp.company}</p>
                      <p className="text-gray-600">{exp.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="education">
              {/* Ajoutez votre parcours éducatif ici */}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Philosophie Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-8">Ma Philosophie</h2>
            <p className="max-w-3xl mx-auto text-xl leading-relaxed">
              "Je crois en une approche centrée sur l'humain où la technologie sert à résoudre des problèmes réels.
              Chaque ligne de code doit avoir un but, chaque interface doit inspirer confiance, et chaque système doit
              évoluer avec élégance."
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}