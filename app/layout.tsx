import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Portfolio - Développeur Full Stack',
  description: 'Portfolio professionnel de John Doe, développeur Full Stack spécialisé dans les technologies web modernes.',
  keywords: ['développeur', 'full stack', 'react', 'nextjs', 'javascript', 'typescript'],
  authors: [{ name: 'Bala Andegue FRancois Lionnel' }],
  openGraph: {
    title: 'Portfolio - Développeur Full Stack',
    description: 'Découvrez mes projets et compétences en développement web',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}