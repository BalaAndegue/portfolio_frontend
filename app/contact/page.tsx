'use client';
import Image from 'next/image';
import { ApiService } from '@/lib/api';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Mail, MapPin, Phone, User } from 'lucide-react';
import dynamic from 'next/dynamic';
//import { useToast } from '@/components/ui/use-toast';
import { useToast } from '@/hooks/use-toast';


// Chargement dynamique pour éviter les problèmes SSR avec Leaflet
const MapWithNoSSR = dynamic(
  () => import('@/components/map').then((mod) => mod.Map),
  { ssr: false }
);

const ContactPage = () => {
  const [profile, setProfile] = useState<any>(null);
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Récupération du profil
    ApiService.getPersonalInfo().then(setProfile);
    
    // Géolocalisation du visiteur
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition([pos.coords.latitude, pos.coords.longitude]);
        },
        (err) => {
          console.error("Erreur de géolocalisation:", err);
          // Position par défaut (Yaoundé)
          setPosition([3.848, 11.5021]);
        }
      );
    } else {
      setPosition([3.848, 11.5021]); // Yaoundé par défaut
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await ApiService.sendContactMessage({
        ...formData,
        ...(position && { position: { lat: position[0], lng: position[1] } })
      });
      
      toast({
        title: "Message envoyé",
        description: "Je vous répondrai dès que possible",
      });
      
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi du message",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!profile) return <div>Chargement...</div>;

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
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-gray-500" />
              <p className="text-gray-600">{profile.location}</p>
            </div>
            
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-gray-500" />
              <p className="text-gray-600">{profile.email}</p>
            </div>
            
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-gray-500" />
              <p className="text-gray-600">{profile.phone}</p>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Disponibilité</h2>
            <p className="text-sm text-gray-600">
              Je suis disponible du Lundi au Vendredi, de 9h à 17h.
              Réponse garantie sous 24h.
            </p>
          </div>
        </div>

        {/* Contenu principal - Contact */}
        <div className="md:w-2/3 lg:w-3/4">
          <section className="py-12">
            <div className="mx-auto px-6 lg:px-8">
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  Contactez-moi
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Envoyez-moi un message et je vous répondrai rapidement
                </p>
              </div>

              <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Formulaire de contact */}
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle>Envoyez un message</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-1">
                          Nom complet
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            id="name"
                            type="text"
                            placeholder="Votre nom"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="pl-10"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1">
                          Email
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="votre@email.com"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="pl-10"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium mb-1">
                          Sujet
                        </label>
                        <Input
                          id="subject"
                          type="text"
                          placeholder="Objet du message"
                          required
                          value={formData.subject}
                          onChange={(e) => setFormData({...formData, subject: e.target.value})}
                        />
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium mb-1">
                          Message
                        </label>
                        <Textarea
                          id="message"
                          placeholder="Votre message..."
                          rows={5}
                          required
                          value={formData.message}
                          onChange={(e) => setFormData({...formData, message: e.target.value})}
                        />
                      </div>

                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "Envoi en cours..." : "Envoyer le message"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                {/* Carte de localisation */}
                <Card className="hover:shadow-lg transition-shadow h-full">
                  <CardHeader>
                    <CardTitle>Ma localisation</CardTitle>
                  </CardHeader>
                  <CardContent className="h-full min-h-[400px] p-0">
                    {position && (
                      <MapWithNoSSR 
                        center={position} 
                        zoom={13} 
                        className="rounded-b-lg h-full w-full"
                      />
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;