import { getPersonalInfo, getCertificates } from '@/lib/actions';
import { PersonalInfo, Certificate } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, ArrowRight, Calendar } from 'lucide-react';

const CertificatesPage = async () => {
  // Récupération des données
  const profile = (await getPersonalInfo()) as PersonalInfo;
  const certificatesResponse = await getCertificates();
  const featuredCertificates = certificatesResponse.data as Certificate[];

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

        {/* Contenu principal - Certificats */}
        <div className="md:w-2/3 lg:w-3/4">
          <section className="py-12">
            <div className="mx-auto px-6 lg:px-8">
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  Certifications
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Mes certifications et formations récentes
                </p>
              </div>
              <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
                {featuredCertificates.map((certificate) => (
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
                        {certificate.skills.map((skill) => (
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
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CertificatesPage;