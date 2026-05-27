
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

    // Placeholder project — will be replaced in next commit
    await prisma.project.create({
        data: {
            title: 'E-commerce Platform',
            description: 'Plateforme e-commerce moderne avec Next.js et Stripe',
            longDescription: 'Une plateforme complète incluant la gestion du panier, les paiements sécurisés et un dashboard admin.',
            image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
            images: JSON.stringify([
                'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800'
            ]) as any,
            technologies: JSON.stringify(['React', 'Next.js', 'Tailwind CSS', 'Stripe', 'Node.js']) as any,
            category: 'web',
            status: 'completed',
            startDate: '2023-01',
            featured: true,
            order: 1,
        }
    });

    // Placeholder certificate — will be replaced in next commit
    await prisma.certificate.create({
        data: {
            title: 'AWS Certified Solutions Architect',
            issuer: 'Amazon Web Services',
            date: '2023-05-15T00:00:00.000Z',
            description: 'Certification démontrant les capacités de conception d\'architectures sur le Cloud AWS.',
            image: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=400',
            skills: JSON.stringify(['Cloud Architecture', 'AWS', 'Security', 'Scalability']) as any,
            featured: true,
            order: 1,
        }
    });

    console.log('Projects seeded');
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
