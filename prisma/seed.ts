
import { prisma } from '../lib/prisma';
import bcrypt from 'bcryptjs';

async function main() {
    console.log('Start seeding (SQLite version) ...');

    // Reset Database to ensure fresh start (crucial for SQLite migration)
    await prisma.certificate.deleteMany();
    await prisma.project.deleteMany();
    await prisma.personalInfo.deleteMany();
    // Keep users to avoid logout if same password
    // await prisma.user.deleteMany();

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
    console.log('Admin checked/created');

    // Personal Info
    const personalInfo = await prisma.personalInfo.create({
        data: {
            name: 'Bala Andegue',
            title: 'Développeur Full Stack & Architecte Solutions',
            bio: "Passionné par les technologies web modernes avec plus de 5 ans d'expérience dans le développement d'applications performantes et scalables.",
            email: 'balaandeguefrancoislionnel@gmail.com',
            phone: '+237 656 616 751',
            location: 'CAMEROUN, Yaounde',
            linkedin: 'https://www.linkedin.com/in/fran%C3%A7ois-lionnel-bala-andegue-0118612b2',
            github: 'https://github.com/BalaAndegue',
            website: 'https://johndoe.dev',
            avatar: 'https://lh3.googleusercontent.com/a/ACg8ocLPBpiO162KoSOj0kwSHsJzbq2AE0cWeCXXndUR67WruxE8I6U=s288-c-no',
            skills: JSON.stringify([
                'JavaScript', 'TypeScript', 'React', 'Next.js', 'Python',
                'Java', 'Spring Boot', 'PostgreSQL', 'Docker',
                'Kubernetes', 'GraphQL', 'REST API'
            ]) as any,
            languages: JSON.stringify([
                { name: 'Français', level: 'Natif' },
                { name: 'Anglais', level: 'Avancé' },
            ]) as any,
            experience: JSON.stringify([
                {
                    id: 'exp1',
                    title: 'Full Stack Developer',
                    company: 'Tech Corp',
                    location: 'Yaoundé, Cameroun',
                    startDate: '2022-01',
                    description: 'Développement d\'architectures microservices et interfaces React réactives.',
                    skills: ['React', 'Node.js', 'PostgreSQL']
                }
            ]) as any,
        },
    });
    console.log('Personal Info seeded');

    // Projects
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
    console.log('Projects seeded');

    // Certificates
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
