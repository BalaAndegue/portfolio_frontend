export interface User {
  id: string;
  email: string;
  role: 'admin' | 'visitor';
  name: string;
  avatar?: string;
}

export interface PersonalInfo {
  id: string;
  name: string;
  title: string;
  bio: string;
  avatar: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  github?: string;
  website?: string;
  skills: string[];
  languages: Language[];
  experience: Experience[];
  about?:string;
}

export interface Language {
  name: string;
  level: 'Débutant' | 'Intermédiaire' | 'Avancé' | 'Natif';
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate?: string;
  description: string;
  skills: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  images: string[];
  technologies: string[];
  category: 'web' | 'mobile' | 'desktop' | 'ai' | 'other';
  status: 'completed' | 'in-progress' | 'planned';
  githubUrl?: string;
  liveUrl?: string;
  startDate: string;
  endDate?: string;
  featured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  image?: string;
  credentialUrl?: string;
  skills: string[];
  featured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  createdAt: string;
  repliedAt?: string;
  position?: {
    lat: number;
    lng: number;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}