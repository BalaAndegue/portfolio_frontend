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

function safeJsonParse(data: any, fallback: any = []) {
    if (!data) return fallback;
    if (Array.isArray(data)) return data;
    if (typeof data !== 'string') return data;
    try {
        const parsed = JSON.parse(data);
        return Array.isArray(parsed) || (parsed && typeof parsed === 'object') ? parsed : fallback;
    } catch (e) {
        return fallback;
    }
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
            { title: { contains: search } },
            { description: { contains: search } },
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
            technologies: safeJsonParse(p.technologies),
            images: safeJsonParse(p.images),
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
        technologies: safeJsonParse(project.technologies),
        images: safeJsonParse(project.images),
        createdAt: project.createdAt.toISOString(),
        updatedAt: project.updatedAt.toISOString(),
    } as Project;
}

export async function createProject(data: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) {
    if (!(await isAdmin())) throw new Error('Unauthorized');

    const project = await prisma.project.create({
        data: {
            ...data,
            featured: data.featured || false,
            order: data.order || 0,
            technologies: JSON.stringify(data.technologies) as any,
            images: JSON.stringify(data.images) as any,
        },
    });

    revalidatePath('/projects');
    revalidatePath('/');
    return project;
}

export async function updateProject(id: string, data: Partial<Project>) {
    if (!(await isAdmin())) throw new Error('Unauthorized');

    const updateData: any = { ...data };
    if (data.technologies) updateData.technologies = JSON.stringify(data.technologies);
    if (data.images) updateData.images = JSON.stringify(data.images);
    updateData.updatedAt = new Date();

    const project = await prisma.project.update({
        where: { id },
        data: updateData,
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
            { title: { contains: search } },
            { issuer: { contains: search } },
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
            skills: safeJsonParse(c.skills),
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
            skills: JSON.stringify(data.skills) as any,
        },
    });

    revalidatePath('/certificates');
    revalidatePath('/');
    return certificate;
}

export async function updateCertificate(id: string, data: Partial<Certificate>) {
    if (!(await isAdmin())) throw new Error('Unauthorized');

    const updateData: any = { ...data };
    if (data.skills) updateData.skills = JSON.stringify(data.skills);
    updateData.updatedAt = new Date();

    const certificate = await prisma.certificate.update({
        where: { id },
        data: updateData,
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

    return {
        ...info,
        skills: safeJsonParse(info.skills),
        languages: safeJsonParse(info.languages),
        experience: safeJsonParse(info.experience),
        createdAt: info.createdAt.toISOString(),
        updatedAt: info.updatedAt.toISOString()
    } as PersonalInfo;
}

export async function updatePersonalInfo(data: Partial<PersonalInfo>) {
    if (!(await isAdmin())) throw new Error('Unauthorized');

    const current = await prisma.personalInfo.findFirst();

    const updateData: any = { ...data };
    if (data.skills) updateData.skills = JSON.stringify(data.skills);
    if (data.languages) updateData.languages = JSON.stringify(data.languages);
    if (data.experience) updateData.experience = JSON.stringify(data.experience);
    updateData.updatedAt = new Date();

    let info;
    if (current) {
        info = await prisma.personalInfo.update({
            where: { id: current.id },
            data: updateData,
        });
    } else {
        throw new Error("No profile found to update. Please seed the database.");
    }

    revalidatePath('/');
    revalidatePath('/about');
    return {
        ...info,
        skills: safeJsonParse(info.skills),
        languages: safeJsonParse(info.languages),
        experience: safeJsonParse(info.experience),
        createdAt: info.createdAt.toISOString(),
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
