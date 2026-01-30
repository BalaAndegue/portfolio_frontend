'use server';

import { prisma } from '@/lib/prisma';
import { Project, Certificate, ContactMessage, PersonalInfo } from '@/types';
import { revalidatePath } from 'next/cache';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

// Utils
async function isAdmin() {
    const session = await getServerSession(authOptions);
    return session?.user?.role === 'admin';
}

// --- Projects ---

export async function getProjects(params: {
    page?: number;
    limit?: number;
    category?: string;
    status?: string;
    search?: string;
} = {}) {
    const { page = 1, limit = 10, category, status, search } = params;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (category) where.category = category;
    if (status) where.status = status;
    if (search) {
        where.OR = [
            { title: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } },
        ];
    }

    const [data, total] = await Promise.all([
        prisma.project.findMany({
            where,
            skip,
            take: limit,
            orderBy: { order: 'asc' },
        }),
        prisma.project.count({ where }),
    ]);

    return {
        data: data.map((p: any) => ({
            ...p,
            status: p.status as 'completed' | 'in-progress' | 'planned',
            category: p.category as 'web' | 'mobile' | 'desktop' | 'ai' | 'other',
            createdAt: p.createdAt.toISOString(),
            updatedAt: p.updatedAt.toISOString(),
        })),
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
    };
}

export async function getProject(id: string) {
    const project = await prisma.project.findUnique({ where: { id } });
    if (!project) return null;
    return {
        ...project,
        status: project.status as 'completed' | 'in-progress' | 'planned',
        category: project.category as 'web' | 'mobile' | 'desktop' | 'ai' | 'other',
        createdAt: project.createdAt.toISOString(),
        updatedAt: project.updatedAt.toISOString(),
    };
}

export async function createProject(data: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) {
    if (!(await isAdmin())) throw new Error('Unauthorized');

    const project = await prisma.project.create({
        data: {
            ...data,
            featured: data.featured || false,
            order: data.order || 0,
        },
    });

    revalidatePath('/projects');
    revalidatePath('/');
    return project;
}

export async function updateProject(id: string, data: Partial<Project>) {
    if (!(await isAdmin())) throw new Error('Unauthorized');

    const project = await prisma.project.update({
        where: { id },
        data: {
            ...data,
            updatedAt: new Date(),
        },
    });

    revalidatePath('/projects');
    revalidatePath('/');
    revalidatePath(`/projects/${id}`);
    return project;
}

export async function deleteProject(id: string) {
    if (!(await isAdmin())) throw new Error('Unauthorized');

    await prisma.project.delete({ where: { id } });
    revalidatePath('/projects');
    revalidatePath('/');
}

// --- Certificates ---

export async function getCertificates(params: {
    page?: number;
    limit?: number;
    search?: string;
} = {}) {
    const { page = 1, limit = 10, search } = params;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (search) {
        where.OR = [
            { title: { contains: search, mode: 'insensitive' } },
            { issuer: { contains: search, mode: 'insensitive' } },
        ];
    }

    const [data, total] = await Promise.all([
        prisma.certificate.findMany({
            where,
            skip,
            take: limit,
            orderBy: { order: 'asc' },
        }),
        prisma.certificate.count({ where }),
    ]);

    return {
        data: data.map((c: any) => ({
            ...c,
            createdAt: c.createdAt.toISOString(),
            updatedAt: c.updatedAt.toISOString(),
        })),
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
    };
}

export async function createCertificate(data: Omit<Certificate, 'id' | 'createdAt' | 'updatedAt'>) {
    if (!(await isAdmin())) throw new Error('Unauthorized');

    const certificate = await prisma.certificate.create({
        data: {
            ...data,
            featured: data.featured || false,
            order: data.order || 0,
        },
    });

    revalidatePath('/certificates');
    revalidatePath('/');
    return certificate;
}

export async function updateCertificate(id: string, data: Partial<Certificate>) {
    if (!(await isAdmin())) throw new Error('Unauthorized');

    const certificate = await prisma.certificate.update({
        where: { id },
        data: {
            ...data,
            updatedAt: new Date(),
        },
    });

    revalidatePath('/certificates');
    revalidatePath('/');
    return certificate;
}

export async function deleteCertificate(id: string) {
    if (!(await isAdmin())) throw new Error('Unauthorized');
    await prisma.certificate.delete({ where: { id } });
    revalidatePath('/certificates');
    revalidatePath('/');
}

// --- Personal Info ---

export async function getPersonalInfo() {
    const info = await prisma.personalInfo.findFirst();
    if (!info) return null;

    // Transform Json fields back to types
    // Assuming strict structure, but adding safety
    const languages = (info.languages as any) || [];
    const experience = (info.experience as any) || [];

    return {
        ...info,
        languages,
        experience,
        createdAt: info.createdAt.toISOString(), // Ensure serializable
        updatedAt: info.updatedAt.toISOString()
    } as PersonalInfo;
}

export async function updatePersonalInfo(data: Partial<PersonalInfo>) {
    if (!(await isAdmin())) throw new Error('Unauthorized');

    const current = await prisma.personalInfo.findFirst();

    let info;
    if (current) {
        info = await prisma.personalInfo.update({
            where: { id: current.id },
            data: {
                ...data,
                languages: data.languages as any,
                experience: data.experience as any,
                updatedAt: new Date(),
            },
        });
    } else {
        // Determine required fields or use defaults if creating for first time? 
        // Assuming 'data' has required fields if creating. 
        // Typescript partial makes this tricky. We should cast or ensure content.
        // For now, assume it's an update to existing seed.
        throw new Error("No profile found to update. Please seed the database.");
    }

    revalidatePath('/');
    revalidatePath('/about');
    return {
        ...info,
        languages: info.languages as any,
        experience: info.experience as any,
        createdAt: info.createdAt.toISOString(), // Ensure serializable
        updatedAt: info.updatedAt.toISOString()
    };
}

// --- Contact ---

export async function sendMessage(data: Omit<ContactMessage, 'id' | 'status' | 'createdAt' | 'repliedAt'>) {
    const message = await prisma.contactMessage.create({
        data: {
            ...data,
            status: 'new',
        },
    });
    // Notify admin?
    return {
        ...message,
        createdAt: message.createdAt.toISOString(),
        repliedAt: message.repliedAt?.toISOString()
    };
}

export async function getMessages(params: {
    page?: number;
    limit?: number;
    status?: string;
} = {}) {
    if (!(await isAdmin())) throw new Error('Unauthorized');

    const { page = 1, limit = 10, status } = params;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (status) where.status = status;

    const [data, total] = await Promise.all([
        prisma.contactMessage.findMany({
            where,
            skip,
            take: limit,
            orderBy: { createdAt: 'desc' },
        }),
        prisma.contactMessage.count({ where }),
    ]);

    return {
        data: data.map((m: any) => ({
            ...m,
            status: m.status as 'new' | 'read' | 'replied',
            createdAt: m.createdAt.toISOString(),
            repliedAt: m.repliedAt?.toISOString()
        })),
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
    };
}
