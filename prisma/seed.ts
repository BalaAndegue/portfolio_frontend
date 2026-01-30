
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('Start seeding ...');

    // Create Admin User
    const password = await bcrypt.hash('admin123', 10);
    const admin = await prisma.user.upsert({
        where: { email: 'admin@example.com' },
        update: {},
        create: {
            email: 'admin@example.com',
            name: 'Admin User',
            password,
            role: 'admin',
        },
    });
    console.log({ admin });

    // Personal Info
    const personalInfo = await prisma.personalInfo.create({
        data: {
            name: 'Bala Andegue',
            title: 'Développeur Full Stack & Architecte Solutions',
            bio: "Passionné par les technologies web modernes avec plus de 5 ans d'expérience dans le développement d'applications performantes et scalables. Je combine expertise technique et vision produit pour créer des solutions innovantes.",
            email: 'balaandeguefrancoislionnel@gmail.com',
            phone: '+237 656 616 751',
            location: 'CAMEROUN, Yaounde',
            linkedin: 'https://www.linkedin.com/in/fran%C3%A7ois-lionnel-bala-andegue-0118612b2',
            github: 'https://github.com/BalaAndegue',
            website: 'https://johndoe.dev',
            avatar: 'https://lh3.googleusercontent.com/a/ACg8ocLPBpiO162KoSOj0kwSHsJzbq2AE0cWeCXXndUR67WruxE8I6U=s288-c-no',
            skills: [
                'JavaScript', 'TypeScript', 'React', 'Next.js', 'Python',
                'Java', 'Spring Boot', 'PostgreSQL', 'Docker',
                'Kubernetes', 'GraphQL', 'REST API'
            ],
            languages: [
                { name: 'Français', level: 'Natif' },
                { name: 'Anglais', level: 'Avancé' },
            ],
            experience: [
                {
                    id: '1',
                    title: 'Full Stack Developer',
                    company: 'Tech Corp',
                    location: 'CAMEROUN , Yaounde',
                    startDate: '2022-01',
                    description: 'Lead developer sur des projets web complexes utilisant React, Node.js et AWS.',
                    skills: ['React', 'Node.js', 'AWS', 'TypeScript']
                },
                {
                    id: '2',
                    title: 'Full Stack Developer',
                    company: 'Startup Inc',
                    location: 'Lyon, France',
                    startDate: '2020-06',
                    endDate: '2021-12',
                    description: "Développement d'une plateforme SaaS de gestion de projets.",
                    skills: ['Vue.js', 'Express.js', 'PostgreSQL', 'Docker']
                }
            ],
        },
    });
    console.log({ personalInfo });

    // Projects
    const project1 = await prisma.project.create({
        data: {
            title: 'E-commerce Platform',
            description: 'Plateforme e-commerce moderne avec React et Stripe',
            longDescription: "Développement complet d'une plateforme e-commerce avec gestion des commandes, paiements sécurisés, et interface d'administration. Utilisation de React pour le frontend, Node.js pour l'API, et intégration Stripe pour les paiements.",
            image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
            images: [
                'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
                'https://images.pexels.com/photos/209224/pexels-photo-209224.jpeg?auto=compress&cs=tinysrgb&w=800'
            ],
            technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Tailwind CSS'],
            category: 'web',
            status: 'completed',
            githubUrl: 'https://github.com/johndoe/ecommerce',
            liveUrl: 'https://ecommerce.johndoe.dev',
            startDate: '2023-01',
            endDate: '2023-06',
            featured: true,
            order: 1,
        }
    });

    const project2 = await prisma.project.create({
        data: {
            title: 'Task Management App',
            description: 'Application de gestion de tâches collaborative',
            longDescription: 'Application web collaborative pour la gestion de tâches et projets en équipe. Interface intuitive avec drag & drop, notifications en temps réel, et synchronisation multi-appareils.',
            image: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800',
            images: [
                'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800'
            ],
            technologies: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Socket.io'],
            category: 'web',
            status: 'in-progress',
            githubUrl: 'https://github.com/johndoe/taskmanager',
            startDate: '2023-08',
            featured: true,
            order: 2,
        }
    });

    const project3 = await prisma.project.create({
        data: {
            title: 'Mobile Banking App',
            description: 'Application bancaire mobile avec React Native',
            longDescription: 'Application mobile complète de banque digitale avec authentification biométrique, virements, gestion de comptes, et notifications push sécurisées.',
            image: 'https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=800',
            images: [
                'https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=800'
            ],
            technologies: ['React Native', 'Node.js', 'MongoDB', 'JWT', 'Push Notifications'],
            category: 'mobile',
            status: 'completed',
            startDate: '2022-09',
            endDate: '2023-02',
            featured: false,
            order: 3,
        }
    });

    console.log({ project1, project2, project3 });

    // Certificates
    const cert1 = await prisma.certificate.create({
        data: {
            title: 'AWS Solutions Architect Professional',
            issuer: 'Amazon Web Services',
            date: '2023-09',
            description: 'Certification avancée en architecture de solutions cloud AWS',
            image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=400',
            credentialUrl: 'https://aws.amazon.com/certification/',
            skills: ['AWS', 'Cloud Architecture', 'DevOps', 'Security'],
            featured: true,
            order: 1,
        }
    });

    const cert2 = await prisma.certificate.create({
        data: {
            title: 'React Advanced Certification',
            issuer: 'Meta',
            date: '2023-05',
            description: 'Certification avancée en développement React et écosystème',
            image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400',
            credentialUrl: 'https://www.coursera.org/professional-certificates/meta-react-native',
            skills: ['React', 'JavaScript', 'Frontend Development'],
            featured: true,
            order: 2,
        }
    });

    console.log({ cert1, cert2 });
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
