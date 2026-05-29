import './globals.css';
import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/sonner';
import { Providers } from '@/components/Providers';

export const metadata: Metadata = {
  title: 'Portfolio – Bala Andegue | Développeur Full Stack & IA',
  description: 'Portfolio de Bala Andegue François Lionnel, développeur Full Stack & IA, étudiant Génie Informatique 4A, Yaoundé Cameroun.',
  keywords: ['développeur', 'full stack', 'react', 'nextjs', 'javascript', 'typescript', 'machine learning'],
  authors: [{ name: 'Bala Andegue François Lionnel' }],
  openGraph: {
    title: 'Portfolio – Bala Andegue | Développeur Full Stack & IA',
    description: 'Découvrez mes projets et compétences en développement web et IA',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
