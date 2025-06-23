import Link from 'next/link';
import { Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:gap-8">
          <div className="mb-8 md:mb-0">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Portfolio
            </Link>
            <p className="mt-2 text-sm text-muted-foreground max-w-md">
              Développeur Full Stack passionné par les technologies modernes et l'innovation.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div>
              <h3 className="text-sm font-semibold leading-6 text-foreground">Navigation</h3>
              <ul className="mt-6 space-y-4">
                <li>
                  <Link href="/" className="text-sm leading-6 text-muted-foreground hover:text-foreground transition-colors">
                    Accueil
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-sm leading-6 text-muted-foreground hover:text-foreground transition-colors">
                    À propos
                  </Link>
                </li>
                <li>
                  <Link href="/projects" className="text-sm leading-6 text-muted-foreground hover:text-foreground transition-colors">
                    Projets
                  </Link>
                </li>
                <li>
                  <Link href="/certificates" className="text-sm leading-6 text-muted-foreground hover:text-foreground transition-colors">
                    Certifications
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold leading-6 text-foreground">Contact</h3>
              <ul className="mt-6 space-y-4">
                <li className="flex items-center text-sm text-muted-foreground">
                  <Mail className="h-4 w-4 mr-2" />
                  balaandeguefrancoislionnel@gmail.com
                </li>
                <li className="flex items-center text-sm text-muted-foreground">
                  <Phone className="h-4 w-4 mr-2" />
                  +237 656 616 751
                </li>
                <li className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2" />
                  CAMEROUN , Yaounde
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold leading-6 text-foreground">Réseaux</h3>
              <div className="mt-6 flex space-x-4">
                <a
                  href="https://github.com/BalaAndegue"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/fran%C3%A7ois-lionnel-bala-andegue-0118612b2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="balaandeguefrancoislionnel@gmail.com"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-4 lg:px-8">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Portfolio. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}