{/*import { Project, Certificate, PersonalInfo, ContactMessage, PaginatedResponse, ApiResponse } from '@/types';

// Mock data - replace with actual API calls
const mockPersonalInfo: PersonalInfo = {
  id: '1',
  name: 'Bala Andegue',
  title: 'Développeur Full Stack & Architecte Solutions',
  bio: 'Passionné par les technologies web modernes avec plus de 5 ans d\'expérience dans le développement d\'applications performantes et scalables. Je combine expertise technique et vision produit pour créer des solutions innovantes.',
  avatar: 'https://lh3.googleusercontent.com/a/ACg8ocLPBpiO162KoSOj0kwSHsJzbq2AE0cWeCXXndUR67WruxE8I6U=s288-c-no',
  email: 'balaandeguefrancoislionnel@gmail.com',
  phone: '+237 656 616 751',
  location: 'CAMEROUN, Yaounde',
  linkedin: 'https://www.linkedin.com/in/fran%C3%A7ois-lionnel-bala-andegue-0118612b2',
  github: 'https://github.com/BalaAndegue',
  website: 'https://johndoe.dev',
  skills: [
    'JavaScript', 'TypeScript', 'React', 'Next.js',  'Python', 
    'Java', 'Spring Boot', 'PostgreSQL',  'Docker', 
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
      description: 'Développement d\'une plateforme SaaS de gestion de projets.',
      skills: ['Vue.js', 'Express.js', 'PostgreSQL', 'Docker']
    }
  ]
};

const mockProjects: Project[] = [
  {
    id: '1',
    title: 'E-commerce Platform',
    description: 'Plateforme e-commerce moderne avec React et Stripe',
    longDescription: 'Développement complet d\'une plateforme e-commerce avec gestion des commandes, paiements sécurisés, et interface d\'administration. Utilisation de React pour le frontend, Node.js pour l\'API, et intégration Stripe pour les paiements.',
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
    createdAt: '2023-01-15',
    updatedAt: '2023-06-30'
  },
  {
    id: '2',
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
    createdAt: '2023-08-01',
    updatedAt: '2023-12-15'
  },
  {
    id: '3',
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
    createdAt: '2022-09-01',
    updatedAt: '2023-02-28'
  }
];

const mockCertificates: Certificate[] = [
  {
    id: '1',
    title: 'AWS Solutions Architect Professional',
    issuer: 'Amazon Web Services',
    date: '2023-09',
    description: 'Certification avancée en architecture de solutions cloud AWS',
    image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=400',
    credentialUrl: 'https://aws.amazon.com/certification/',
    skills: ['AWS', 'Cloud Architecture', 'DevOps', 'Security'],
    featured: true,
    order: 1,
    createdAt: '2023-09-15',
    updatedAt: '2023-09-15'
  },
  {
    id: '2',
    title: 'React Advanced Certification',
    issuer: 'Meta',
    date: '2023-05',
    description: 'Certification avancée en développement React et écosystème',
    image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400',
    credentialUrl: 'https://www.coursera.org/professional-certificates/meta-react-native',
    skills: ['React', 'JavaScript', 'Frontend Development'],
    featured: true,
    order: 2,
    createdAt: '2023-05-20',
    updatedAt: '2023-05-20'
  }
];

export class ApiService {
  private static BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

  // Personal Info
  static async getPersonalInfo(): Promise<PersonalInfo> {
    // Mock implementation - replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockPersonalInfo;
  }

  static async updatePersonalInfo(info: Partial<PersonalInfo>): Promise<PersonalInfo> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { ...mockPersonalInfo, ...info };
  }

  // Projects
  static async getProjects(params?: {
    page?: number;
    limit?: number;
    category?: string;
    status?: string;
    search?: string;
  }): Promise<PaginatedResponse<Project>> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let filtered = [...mockProjects];
    
    if (params?.category) {
      filtered = filtered.filter(p => p.category === params.category);
    }
    
    if (params?.status) {
      filtered = filtered.filter(p => p.status === params.status);
    }
    
    if (params?.search) {
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(params.search!.toLowerCase()) ||
        p.description.toLowerCase().includes(params.search!.toLowerCase())
      );
    }
    
    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const start = (page - 1) * limit;
    const data = filtered.slice(start, start + limit);
    
    return {
      data,
      total: filtered.length,
      page,
      limit,
      totalPages: Math.ceil(filtered.length / limit)
    };
  }

  static async getProject(id: string): Promise<Project | null> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockProjects.find(p => p.id === id) || null;
  }

  static async createProject(project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const newProject: Project = {
      ...project,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    mockProjects.push(newProject);
    return newProject;
  }

  static async updateProject(id: string, updates: Partial<Project>): Promise<Project> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const index = mockProjects.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Project not found');
    
    mockProjects[index] = {
      ...mockProjects[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    return mockProjects[index];
  }

  static async deleteProject(id: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = mockProjects.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Project not found');
    mockProjects.splice(index, 1);
  }

  // Certificates
  static async getCertificates(params?: {
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<PaginatedResponse<Certificate>> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let filtered = [...mockCertificates];
    
    if (params?.search) {
      filtered = filtered.filter(c => 
        c.title.toLowerCase().includes(params.search!.toLowerCase()) ||
        c.issuer.toLowerCase().includes(params.search!.toLowerCase())
      );
    }
    
    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const start = (page - 1) * limit;
    const data = filtered.slice(start, start + limit);
    
    return {
      data,
      total: filtered.length,
      page,
      limit,
      totalPages: Math.ceil(filtered.length / limit)
    };
  }

  static async createCertificate(certificate: Omit<Certificate, 'id' | 'createdAt' | 'updatedAt'>): Promise<Certificate> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const newCertificate: Certificate = {
      ...certificate,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    mockCertificates.push(newCertificate);
    return newCertificate;
  }

  static async updateCertificate(id: string, updates: Partial<Certificate>): Promise<Certificate> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const index = mockCertificates.findIndex(c => c.id === id);
    if (index === -1) throw new Error('Certificate not found');
    
    mockCertificates[index] = {
      ...mockCertificates[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    return mockCertificates[index];
  }

  static async deleteCertificate(id: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = mockCertificates.findIndex(c => c.id === id);
    if (index === -1) throw new Error('Certificate not found');
    mockCertificates.splice(index, 1);
  }

  // Contact
  static async sendContactMessage(message: Omit<ContactMessage, 'id' | 'status' | 'createdAt'>): Promise<ContactMessage> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      ...message,
      id: Date.now().toString(),
      status: 'new',
      createdAt: new Date().toISOString()
    };
  }
}
  
*/}

import { Project, Certificate, PersonalInfo, ContactMessage, PaginatedResponse, ApiResponse } from '@/types';

export class ApiService {
  private static BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

  private static async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.BASE_URL}${endpoint}`;
    
    // Récupérer le token depuis localStorage si disponible
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Une erreur est survenue' }));
        throw new Error(errorData.message || `HTTP ${response.status}`);
      }

      //return await response.json();
      const data = await response.json();
    
    // Modification clé: Gestion des deux formats de réponse
    return data.data !== undefined ? data.data : data;
    } catch (error) {
      console.error(`Erreur API pour ${endpoint}:`, error);
      throw error;
    }
  }

  // Personal Info / Profile
  static async getPersonalInfo(): Promise<PersonalInfo> {
    const response = await this.request<{ data: any }>('/profile');
    const profile = response.data || response;
    
    return {
      id: profile.id.toString(),
      name: `${profile.firstName} ${profile.lastName}`,
      title: profile.title,
      bio: profile.bio,
      about:profile.about,
      avatar: profile.avatar_url || 'https://lh3.googleusercontent.com/a/ACg8ocLPBpiO162KoSOj0kwSHsJzbq2AE0cWeCXXndUR67WruxE8I6U=s288-c-no',
      email: profile.email,
      phone: profile.phone,
      location: profile.location,
      linkedin: profile.linkedin_url,
      github: profile.github_url,
      website: profile.website_url,
      skills: profile.skills || [],
      languages: (profile.languages || []).map((lang: any) => ({
        name: lang.name,
        level: lang.level as 'Débutant' | 'Intermédiaire' | 'Avancé' | 'Natif'
      })),
      experience: (profile.experience || []).map((exp: any) => ({
        id: exp.id?.toString() || Math.random().toString(),
        title: exp.title,
        company: exp.company,
        location: exp.location,
        startDate: exp.startDate || exp.start_date,
        endDate: exp.endDate || exp.end_date,
        description: exp.description,
        skills: exp.skills || []
      }))
    };
  }

  static async updatePersonalInfo(info: Partial<PersonalInfo>): Promise<PersonalInfo> {
    const updateData = {
      first_name: info.name?.split(' ')[0],
      last_name: info.name?.split(' ').slice(1).join(' '),
      title: info.title,
      bio: info.bio,
      email: info.email,
      phone: info.phone,
      location: info.location,
      linkedin_url: info.linkedin,
      github_url: info.github,
      website_url: info.website,
      skills: info.skills,
      languages: info.languages,
      experience: info.experience
    };

    const response = await this.request<{ data: any }>('/profile', {
      method: 'POST',
      body: JSON.stringify(updateData),
    });

    return this.transformProfileData(response.data);
  }

  private static transformProfileData(profile: any): PersonalInfo {
    return {
      id: profile.id.toString(),
      name: `${profile.first_name} ${profile.last_name}`,
      title: profile.title,
      bio: profile.bio,
      avatar: profile.avatar_url || 'https://lh3.googleusercontent.com/a/ACg8ocLPBpiO162KoSOj0kwSHsJzbq2AE0cWeCXXndUR67WruxE8I6U=s288-c-no',
      email: profile.email,
      phone: profile.phone,
      location: profile.location,
      linkedin: profile.linkedin_url,
      github: profile.github_url,
      website: profile.website_url,
      skills: profile.skills || [],
      languages: (profile.languages || []).map((lang: any) => ({
        name: lang.name,
        level: lang.level as 'Débutant' | 'Intermédiaire' | 'Avancé' | 'Natif'
      })),
      experience: (profile.experience || []).map((exp: any) => ({
        id: exp.id?.toString() || Math.random().toString(),
        title: exp.title,
        company: exp.company,
        location: exp.location,
        startDate: exp.startDate || exp.start_date,
        endDate: exp.endDate || exp.end_date,
        description: exp.description,
        skills: exp.skills || []
      }))
    };
  }

  // Projects
  /*static async getProjects(params?: {
    page?: number;
    limit?: number;
    category?: string;
    status?: string;
    search?: string;
  }): Promise<PaginatedResponse<Project>> {
    const searchParams = new URLSearchParams();
    
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    if (params?.category) searchParams.append('category', params.category);
    if (params?.status) searchParams.append('status', params.status);
    if (params?.search) searchParams.append('search', params.search);

    const endpoint = params?.search 
      ? `/projects/search?${searchParams.toString()}`
      : `/projects?${searchParams.toString()}`;

    const response = await this.request<{
      data: any[];
      pagination?: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
      };
    }>(endpoint);

    return {
      data: response.data.map(this.transformProjectData),
      total: response.pagination?.total || response.data.length,
      page: response.pagination?.page || 1,
      limit: response.pagination?.limit || 10,
      totalPages: response.pagination?.totalPages || 1
    };
  }*/


  static async getProjects(params?: {
  page?: number;
  limit?: number;
  category?: string;
  status?: string;
  search?: string;
}): Promise<PaginatedResponse<Project>> {
  const searchParams = new URLSearchParams();
  
  if (params?.page) searchParams.append('page', params.page.toString());
  if (params?.limit) searchParams.append('limit', params.limit.toString());
  if (params?.category) searchParams.append('category', params.category);
  if (params?.status) searchParams.append('status', params.status);
  if (params?.search) searchParams.append('search', params.search);

  try {
    const endpoint = params?.search 
      ? `/projects/search?${searchParams.toString()}`
      : `/projects?${searchParams.toString()}`;

    const response = await this.request<any>(endpoint);

    // Gestion des deux formats de réponse
    const isPaginated = response && 'data' in response;
    const rawData = isPaginated ? response.data : response;
    const pagination = isPaginated ? response.pagination : undefined;

    // Transformation garantie en tableau
    const data = Array.isArray(rawData) 
      ? rawData.map(this.transformProjectData)
      : [];

    return {
      data,
      total: pagination?.total ?? data.length,
      page: pagination?.page ?? params?.page ?? 1,
      limit: pagination?.limit ?? params?.limit ?? 10,
      totalPages: pagination?.totalPages ?? 1
    };
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    return {
      data: [],
      total: 0,
      page: params?.page ?? 1,
      limit: params?.limit ?? 10,
      totalPages: 0
    };
  }
}

  static async getFeaturedProjects(): Promise<Project[]> {
    const response = await this.request<{ data: any[] }>('/projects/featured');
    return response.data.map(this.transformProjectData);
  }

  static async getProject(id: string): Promise<Project | null> {
    try {
      const response = await this.request<{ data: any }>(`/projects/${id}`);
      return this.transformProjectData(response.data);
    } catch (error) {
      return null;
    }
  }

  static async createProject(project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project> {
    const projectData = {
      title: project.title,
      description: project.description,
      short_description: project.description,
      long_description: project.longDescription,
      github_url: project.githubUrl,
      live_url: project.liveUrl,
      image_url: project.image,
      images: project.images,
      technologies: project.technologies,
      category: project.category,
      status: project.status?.toUpperCase(),
      start_date: project.startDate,
      end_date: project.endDate,
      is_featured: project.featured,
      sort_order: project.order
    };

    const response = await this.request<{ data: any }>('/projects', {
      method: 'POST',
      body: JSON.stringify(projectData),
    });

    return this.transformProjectData(response.data);
  }

  static async updateProject(id: string, updates: Partial<Project>): Promise<Project> {
    const updateData = {
      title: updates.title,
      description: updates.description,
      short_description: updates.description,
      long_description: updates.longDescription,
      github_url: updates.githubUrl,
      live_url: updates.liveUrl,
      image_url: updates.image,
      images: updates.images,
      technologies: updates.technologies,
      category: updates.category,
      status: updates.status?.toUpperCase(),
      start_date: updates.startDate,
      end_date: updates.endDate,
      is_featured: updates.featured,
      sort_order: updates.order
    };

    const response = await this.request<{ data: any }>(`/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updateData),
    });

    return this.transformProjectData(response.data);
  }

  static async deleteProject(id: string): Promise<void> {
    await this.request(`/projects/${id}`, {
      method: 'DELETE',
    });
  }

  private static transformProjectData(project: any): Project {
    return {
      id: project.id.toString(),
      title: project.title,
      description: project.shortDescription || project.description,
      longDescription: project.description || project.description,
      image: project.imageUrl || project.image,
      images: project.images || [project.imageUrl || project.image],
      technologies: project.technologies || [],
      category: project.category || 'web',
      status: project.status?.toLowerCase() || 'completed',
      githubUrl: project.githubUrl,
      liveUrl: project.liveUrl,
      startDate: project.startDate,
      endDate: project.endDate,
      featured: project.isFeatured || false,
      order: project.sortOrder || 0,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt
    };
  }

  // Certificates
  /*
  static async getCertificates(params?: {
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<PaginatedResponse<Certificate>> {
    const searchParams = new URLSearchParams();
    
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    if (params?.search) searchParams.append('search', params.search);

    const response = await this.request<{
      data: any[];
      pagination?: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
      };
    }>(`/certificates?${searchParams.toString()}`);

    return {
      data: response.data.map(this.transformCertificateData),
      total: response.pagination?.total || response.data.length,
      page: response.pagination?.page || 1,
      limit: response.pagination?.limit || 10,
      totalPages: response.pagination?.totalPages || 1
    };
  } */
  
  
  static async getCertificates(params?: {
  page?: number;
  limit?: number;
  search?: string;
}): Promise<PaginatedResponse<Certificate>> {
  const searchParams = new URLSearchParams();
  
  if (params?.page) searchParams.append('page', params.page.toString());
  if (params?.limit) searchParams.append('limit', params.limit.toString());
  if (params?.search) searchParams.append('search', params.search);

  const response = await this.request<any>(`/certificates?${searchParams.toString()}`);

  // Gestion des deux formats de réponse
  const isPaginated = response && 'data' in response;
  const rawData = isPaginated ? response.data : response;
  const pagination = isPaginated ? response.pagination : undefined;

  // Transformation garantie en tableau
  const data = Array.isArray(rawData) 
    ? rawData.map(this.transformCertificateData)
    : [];

  return {
    data,
    total: pagination?.total ?? data.length,
    page: pagination?.page ?? params?.page ?? 1,
    limit: pagination?.limit ?? params?.limit ?? 10,
    totalPages: pagination?.totalPages ?? 1
  };
}
  
  static async getFeaturedCertificates(): Promise<Certificate[]> {
    const response = await this.request<{ data: any[] }>('/certificates/featured');
    return response.data.map(this.transformCertificateData);
  }

  static async createCertificate(certificate: Omit<Certificate, 'id' | 'createdAt' | 'updatedAt'>): Promise<Certificate> {
    const certificateData = {
      title: certificate.title,
      issuer: certificate.issuer,
      description: certificate.description,
      issue_date: certificate.date,
      credential_url: certificate.credentialUrl,
      image_url: certificate.image,
      skills: certificate.skills,
      is_featured: certificate.featured,
      sort_order: certificate.order
    };

    const response = await this.request<{ data: any }>('/certificates', {
      method: 'POST',
      body: JSON.stringify(certificateData),
    });

    return this.transformCertificateData(response.data);
  }

  static async updateCertificate(id: string, updates: Partial<Certificate>): Promise<Certificate> {
    const updateData = {
      title: updates.title,
      issuer: updates.issuer,
      description: updates.description,
      issue_date: updates.date,
      credential_url: updates.credentialUrl,
      image_url: updates.image,
      skills: updates.skills,
      is_featured: updates.featured,
      sort_order: updates.order
    };

    const response = await this.request<{ data: any }>(`/certificates/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updateData),
    });

    return this.transformCertificateData(response.data);
  }

  static async deleteCertificate(id: string): Promise<void> {
    await this.request(`/certificates/${id}`, {
      method: 'DELETE',
    });
  }

  private static transformCertificateData(certificate: any): Certificate {
    return {
      id: certificate.id.toString(),
      title: certificate.title,
      issuer: certificate.issuer,
      date: certificate.issueDate,
      description: certificate.description,
      image: certificate.imageUrl,
      credentialUrl: certificate.credentialUrl,
      skills: certificate.skills || [],
      featured: certificate.isFeatured || false,
      order: certificate.sortOrder || 0,
      createdAt: certificate.createdAt,
      updatedAt: certificate.updatedAt
    };
  }

  // Contact
  static async sendContactMessage(message: Omit<ContactMessage, 'id' | 'status' | 'createdAt'>): Promise<ContactMessage> {
    const response = await this.request<{ data: any }>('/contact', {
      method: 'POST',
      body: JSON.stringify(message),
    });

    return this.transformContactMessageData(response.data);
  }

  static async getContactMessages(params?: {
    page?: number;
    limit?: number;
    status?: string;
  }): Promise<PaginatedResponse<ContactMessage>> {
    const searchParams = new URLSearchParams();
    
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    if (params?.status) searchParams.append('status', params.status);

    const response = await this.request<{
      data: any[];
      pagination?: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
      };
    }>(`/contact/messages?${searchParams.toString()}`);

    return {
      data: response.data.map(this.transformContactMessageData),
      total: response.pagination?.total || response.data.length,
      page: response.pagination?.page || 1,
      limit: response.pagination?.limit || 10,
      totalPages: response.pagination?.totalPages || 1
    };
  }

  private static transformContactMessageData(message: any): ContactMessage {
    return {
      id: message.id.toString(),
      name: message.name,
      email: message.email,
      subject: message.subject,
      message: message.message,
      status: message.status || 'new',
      createdAt: message.created_at
    };
  }

  // Upload
  static async uploadFile(file: File): Promise<{ url: string; filename: string }> {
    const formData = new FormData();
    formData.append('file', file);

    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;

    const response = await fetch(`${this.BASE_URL}/uploads`, {
      method: 'POST',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Erreur lors du téléchargement du fichier');
    }

    return await response.json();
  }

  static getFileUrl(filename: string): string {
    return `${this.BASE_URL}/uploads/${filename}`;
  }
}