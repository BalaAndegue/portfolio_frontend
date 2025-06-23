'use client';
{/*}
import { User } from '@/types';

const STORAGE_KEY = 'portfolio_auth';

export class AuthService {
  static getCurrentUser(): User | null {
    if (typeof window === 'undefined') return null;
    
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }

  static setCurrentUser(user: User): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  }

  static logout(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEY);
  }

  static isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'admin';
  }

  static isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }
}

// Mock login function - replace with actual API call
export async function login(email: string, password: string): Promise<User> {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  if (email === 'balaandeguefrancoislionnel@gmail.com' && password === 'admin123') {
    const user: User = {
      id: '1',
      email: 'balaandeguefrancoislionnel@gmail.com',
      role: 'admin',
      name: 'Admin User',
      avatar: 'https://lh3.googleusercontent.com/a/ACg8ocLPBpiO162KoSOj0kwSHsJzbq2AE0cWeCXXndUR67WruxE8I6U=s288-c-no'
    };
    AuthService.setCurrentUser(user);
    return user;
  } else {
    throw new Error('Identifiants invalides');
  }
}
*/}



import { User } from '@/types';

const STORAGE_KEY = 'portfolio_auth';
const TOKEN_KEY = 'auth_token';

export class AuthService {
  private static BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

  static getCurrentUser(): User | null {
    if (typeof window === 'undefined') return null;
    
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }

  static setCurrentUser(user: User): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  }

  static getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(TOKEN_KEY);
  }

  static setToken(token: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(TOKEN_KEY, token);
  }

  static logout(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(TOKEN_KEY);
  }

  static isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'admin';
  }

  static isAuthenticated(): boolean {
    return this.getCurrentUser() !== null && this.getToken() !== null;
  }

  private static async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.BASE_URL}${endpoint}`;
    
    const token = this.getToken();
    
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

      return await response.json();
    } catch (error) {
      console.error(`Erreur API pour ${endpoint}:`, error);
      throw error;
    }
  }

  static async me(): Promise<User> {
    const response = await this.request<{ data: any }>('/auth/me');
    const userData = response.data;
    
    const user: User = {
      id: userData.id.toString(),
      email: userData.email,
      role: userData.role.toLowerCase() as 'admin' | 'visitor',
      name: userData.username || userData.name,
      avatar: userData.avatar_url
    };

    this.setCurrentUser(user);
    return user;
  }

  static async logoutApi(): Promise<void> {
    try {
      await this.request('/auth/logout', {
        method: 'POST',
      });
    } catch (error) {
      console.error('Erreur lors de la déconnexion API:', error);
    } finally {
      this.logout();
    }
  }
}

// Fonction de connexion avec appel API réel
export async function login(username: string, password: string): Promise<User> {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';
  
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Identifiants invalides' }));
      throw new Error(errorData.message || 'Identifiants invalides');
    }

    const data = await response.json();
    
    // Supposer que l'API retourne { token, user } ou { data: { token, user } }
    const token = data.token || data.data?.token;
    const userData = data.user || data.data?.user || data.data;

    if (!token) {
      throw new Error('Token manquant dans la réponse');
    }

    const user: User = {
      id: userData.id.toString(),
      email: userData.email,
      role: userData.role.toLowerCase() as 'admin' | 'visitor',
      name: userData.username || userData.name || 'Utilisateur',
      avatar: userData.avatar_url
    };

    // Sauvegarder le token et l'utilisateur
    AuthService.setToken(token);
    AuthService.setCurrentUser(user);

    return user;
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    throw error;
  }
}

// Hook pour vérifier l'authentification au démarrage de l'app
export async function initializeAuth(): Promise<User | null> {
  const token = AuthService.getToken();
  
  if (!token) {
    return null;
  }

  try {
    // Vérifier que le token est toujours valide
    return await AuthService.me();
  } catch (error) {
    console.error('Token invalide, déconnexion:', error);
    AuthService.logout();
    return null;
  }
}