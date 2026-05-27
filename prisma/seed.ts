
import { prisma } from '../lib/prisma';
import bcrypt from 'bcryptjs';

async function main() {
    console.log('Start seeding (SQLite version) ...');

    await prisma.certificate.deleteMany();
    await prisma.project.deleteMany();
    await prisma.personalInfo.deleteMany();

    const password = await bcrypt.hash('admin123', 10);
    await prisma.user.upsert({
        where: { email: 'admin@example.com' },
        update: {},
        create: {
            email: 'admin@example.com',
            name: 'Admin User',
            password,
            role: 'admin',
        },
    });
    console.log('Admin checked/created');

    await prisma.personalInfo.create({
        data: {
            name: 'Bala Andegue François Lionnel',
            title: 'Étudiant en Génie Informatique 4ème année | Développeur Full Stack & IA',
            bio: "Passionné par les systèmes, le développement web fullstack et l'intelligence artificielle. Spécialisé en React/Next.js, Spring Boot, Python et Machine Learning.",
            about: "Étudiant en 4ème année de Génie Informatique, je construis des applications web performantes et des systèmes intelligents. Mon expérience couvre le frontend (React, Next.js), le backend (Node.js, Spring Boot, Python), les bases de données (PostgreSQL, SQLite) et le Machine Learning. Je travaille sur des projets réels comme des ERP, des plateformes e-commerce et des outils collaboratifs.",
            email: 'balaandeguefrancoislionnel@gmail.com',
            phone: '+237 656 616 751',
            location: 'Yaoundé, Cameroun',
            linkedin: 'https://www.linkedin.com/in/fran%C3%A7ois-lionnel-bala-andegue-0118612b2',
            github: 'https://github.com/BalaAndegue',
            website: 'https://balaandegue.dev',
            avatar: 'https://lh3.googleusercontent.com/a/ACg8ocLPBpiO162KoSOj0kwSHsJzbq2AE0cWeCXXndUR67WruxE8I6U=s288-c-no',
            skills: JSON.stringify([
                'JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js',
                'Python', 'Java', 'Spring Boot', 'PostgreSQL', 'SQLite',
                'Prisma', 'Docker', 'Git', 'REST API', 'GraphQL',
                'Machine Learning', 'Tailwind CSS', 'Linux'
            ]) as any,
            languages: JSON.stringify([
                { name: 'Français', level: 'Natif' },
                { name: 'Anglais', level: 'Avancé' },
            ]) as any,
            experience: JSON.stringify([
                {
                    id: 'exp1',
                    title: 'Développeur Full Stack',
                    company: 'YOWYOB',
                    location: 'Yaoundé, Cameroun',
                    startDate: '2024-01',
                    description: "Développement du module Gestion des Tiers pour l'ERP YOWYOB. Architecture microservices, API REST Spring Boot, frontend React.",
                    skills: ['React', 'Spring Boot', 'PostgreSQL', 'Docker']
                },
                {
                    id: 'exp2',
                    title: 'Développeur Web',
                    company: 'Data Afrique Hub',
                    location: 'Yaoundé, Cameroun',
                    startDate: '2023-06',
                    endDate: '2023-12',
                    description: 'Formation intensive en Data Science et Machine Learning. Analyse de données, modèles ML, visualisation.',
                    skills: ['Python', 'Machine Learning', 'Data Analysis']
                }
            ]) as any,
        },
    });
    console.log('Personal Info seeded');

    await prisma.project.create({
        data: {
            title: 'XXCM – Application de Composition de Cours',
            description: 'Plateforme web fullstack pour la composition du contenu de cours et le suivi des participants. Gestion des modules, chapitres, évaluations et progression en temps réel.',
            longDescription: 'XXCM est une application web complète permettant aux formateurs de composer le contenu pédagogique (modules, chapitres, exercices) et aux administrateurs de suivre la progression de chaque participant. Tableau de bord en temps réel, exports PDF, notifications push, rôles et permissions.',
            image: 'https://images.pexels.com/photos/5905709/pexels-photo-5905709.jpeg?auto=compress&cs=tinysrgb&w=800',
            images: JSON.stringify([
                'https://images.pexels.com/photos/5905709/pexels-photo-5905709.jpeg?auto=compress&cs=tinysrgb&w=800',
                'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=800',
            ]) as any,
            technologies: JSON.stringify(['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Tailwind CSS', 'NextAuth', 'Recharts']) as any,
            category: 'web',
            status: 'in-progress',
            githubUrl: 'https://github.com/BalaAndegue',
            startDate: '2024-03',
            featured: true,
            order: 1,
        }
    });

    await prisma.project.create({
        data: {
            title: 'Custom World – Plateforme E-commerce',
            description: "Site web e-commerce complet avec catalogue produits personnalisé, panier, paiement sécurisé et dashboard vendeur. Expérience d'achat 100% custom.",
            longDescription: "Custom World est une plateforme e-commerce sur mesure offrant un catalogue produits avec filtres avancés, un système de panier persistant, l'intégration de paiement (mobile money + carte), un espace vendeur avec analytics des ventes, et un système d'avis clients.",
            image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
            images: JSON.stringify([
                'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
                'https://images.pexels.com/photos/5632399/pexels-photo-5632399.jpeg?auto=compress&cs=tinysrgb&w=800',
            ]) as any,
            technologies: JSON.stringify(['React', 'Next.js', 'Node.js', 'PostgreSQL', 'Stripe', 'Tailwind CSS', 'Prisma']) as any,
            category: 'web',
            status: 'completed',
            githubUrl: 'https://github.com/BalaAndegue',
            startDate: '2023-09',
            endDate: '2024-01',
            featured: true,
            order: 2,
        }
    });

    await prisma.project.create({
        data: {
            title: 'CollabSpace – Outil de Travail Collaboratif',
            description: "Plateforme web pour le travail collaboratif en équipe : gestion de projets, partage de documents, messagerie en temps réel et tableau Kanban.",
            longDescription: "CollabSpace est un espace de travail collaboratif permettant à des équipes de gérer des projets avec des tableaux Kanban, partager des fichiers, communiquer via une messagerie instantanée (WebSocket), et suivre les deadlines avec un calendrier partagé.",
            image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800',
            images: JSON.stringify([
                'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800',
            ]) as any,
            technologies: JSON.stringify(['React', 'Node.js', 'Socket.io', 'PostgreSQL', 'Express', 'Tailwind CSS']) as any,
            category: 'web',
            status: 'in-progress',
            githubUrl: 'https://github.com/BalaAndegue',
            startDate: '2024-06',
            featured: true,
            order: 3,
        }
    });

    await prisma.project.create({
        data: {
            title: 'YOWYOB ERP – Module Gestion des Tiers',
            description: "Module de gestion des tiers (clients, fournisseurs, partenaires) pour l'ERP YOWYOB. Architecture microservices avec Spring Boot et interface React.",
            longDescription: "Ce module est un composant clé de l'ERP YOWYOB permettant la gestion complète des tiers: création/modification de fiches clients, fournisseurs et partenaires, historique des transactions, gestion des contrats, intégration avec les autres modules de l'ERP via API REST.",
            image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800',
            images: JSON.stringify([
                'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800',
            ]) as any,
            technologies: JSON.stringify(['Java', 'Spring Boot', 'React', 'PostgreSQL', 'Docker', 'REST API', 'Microservices']) as any,
            category: 'web',
            status: 'completed',
            githubUrl: 'https://github.com/BalaAndegue',
            startDate: '2024-01',
            endDate: '2024-05',
            featured: false,
            order: 4,
        }
    });

    await prisma.project.create({
        data: {
            title: 'Portfolio Full Stack',
            description: "Portfolio professionnel 100% fullstack Next.js avec Prisma/SQLite, authentification NextAuth, panel admin et animations style développeur senior.",
            longDescription: "Ce portfolio est lui-même un projet fullstack complet : Next.js App Router, Prisma ORM avec SQLite, NextAuth pour l'authentification admin, server actions, composants Radix UI + Tailwind CSS, animations Framer Motion, déployable sur Vercel.",
            image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=800',
            images: JSON.stringify([
                'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=800',
            ]) as any,
            technologies: JSON.stringify(['Next.js', 'TypeScript', 'Prisma', 'SQLite', 'NextAuth', 'Tailwind CSS', 'Framer Motion']) as any,
            category: 'web',
            status: 'completed',
            githubUrl: 'https://github.com/BalaAndegue',
            startDate: '2024-10',
            endDate: '2024-12',
            featured: false,
            order: 5,
        }
    });

    console.log('Projects seeded');

    // === CERTIFICATIONS RÉELLES ===

    await prisma.certificate.create({
        data: {
            title: 'Advanced Learning Algorithms',
            issuer: 'Stanford Online (DeepLearning.AI)',
            date: '2025-08-01T00:00:00.000Z',
            description: 'Cours avancé sur les algorithmes d\'apprentissage automatique couvrant les réseaux de neurones, le backpropagation, les arbres de décision et le boosting.',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Stanford_Cardinal_logo.svg/200px-Stanford_Cardinal_logo.svg.png',
            credentialUrl: 'https://www.coursera.org/account/accomplishments',
            skills: JSON.stringify(['Machine Learning', 'Neural Networks', 'TensorFlow', 'Python', 'Deep Learning']) as any,
            featured: true,
            order: 1,
        }
    });

    await prisma.certificate.create({
        data: {
            title: 'Certificat de fin de formation DAH',
            issuer: 'Data Afrique Hub',
            date: '2025-12-01T00:00:00.000Z',
            description: 'Formation intensive en Data Science et Intelligence Artificielle. Compétences en analyse des données, apprentissage automatique, visualisation et Big Data.',
            image: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=400',
            skills: JSON.stringify(['Analyse des données', 'Apprentissage automatique', 'Python', 'Visualisation']) as any,
            featured: true,
            order: 2,
        }
    });

    await prisma.certificate.create({
        data: {
            title: 'Foundations of Data Science',
            issuer: 'Google',
            date: '2024-09-01T00:00:00.000Z',
            description: 'Fondamentaux de la Data Science : exploration de données, statistiques descriptives, Python pour l\'analyse de données et communication des résultats.',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/272px-Google_2015_logo.svg.png',
            credentialUrl: 'https://www.coursera.org/account/accomplishments',
            skills: JSON.stringify(['Data Science', 'Python', 'Statistics', 'Data Analysis']) as any,
            featured: false,
            order: 3,
        }
    });

    await prisma.certificate.create({
        data: {
            title: 'Foundations: Data, Data, Everywhere',
            issuer: 'Google',
            date: '2024-07-01T00:00:00.000Z',
            description: 'Introduction à l\'analyse de données avec Google : collecte, transformation, visualisation et prise de décision basée sur les données.',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/272px-Google_2015_logo.svg.png',
            credentialUrl: 'https://www.coursera.org/account/accomplishments',
            skills: JSON.stringify(['Data Analysis', 'Spreadsheets', 'SQL', 'Tableau', 'R']) as any,
            featured: false,
            order: 4,
        }
    });

    await prisma.certificate.create({
        data: {
            title: 'HTML, CSS, and JavaScript for Web Developers',
            issuer: 'The Johns Hopkins University',
            date: '2023-11-01T00:00:00.000Z',
            description: 'Maîtrise des fondamentaux du développement web : HTML5 sémantique, CSS3 responsive, JavaScript ES6+ et intégration d\'APIs REST.',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Johns_Hopkins_University_logo.svg/240px-Johns_Hopkins_University_logo.svg.png',
            credentialUrl: 'https://www.coursera.org/account/accomplishments',
            skills: JSON.stringify(['HTML5', 'CSS3', 'JavaScript', 'Responsive Design', 'REST API']) as any,
            featured: false,
            order: 5,
        }
    });

    await prisma.certificate.create({
        data: {
            title: 'Introduction to Large Language Models',
            issuer: 'Google Cloud Skills Boost',
            date: '2024-03-01T00:00:00.000Z',
            description: 'Introduction aux grands modèles de langage (LLM) : architecture Transformer, fine-tuning, prompt engineering et déploiement sur Google Cloud.',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/272px-Google_2015_logo.svg.png',
            credentialUrl: 'https://www.cloudskillsboost.google',
            skills: JSON.stringify(['LLM', 'Prompt Engineering', 'Google Cloud', 'Generative AI', 'Transformer']) as any,
            featured: false,
            order: 6,
        }
    });

    console.log('Certificates seeded');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
