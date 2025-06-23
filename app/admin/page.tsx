'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FolderOpen, Award, MessageSquare, TrendingUp, Users, Calendar } from 'lucide-react';
import { ApiService } from '@/lib/api';
import { Project, Certificate } from '@/types';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProjects: 0,
    completedProjects: 0,
    inProgressProjects: 0,
    totalCertificates: 0,
    totalMessages: 0,
  });
  const [recentProjects, setRecentProjects] = useState<Project[]>([]);
  const [recentCertificates, setRecentCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const [projects, certificates] = await Promise.all([
          ApiService.getProjects({ limit: 50 }),
          ApiService.getCertificates({ limit: 50 })
        ]);

        setStats({
          totalProjects: projects.data.length,
          completedProjects: projects.data.filter(p => p.status === 'completed').length,
          inProgressProjects: projects.data.filter(p => p.status === 'in-progress').length,
          totalCertificates: certificates.data.length,
          totalMessages: 0, // Mock data
        });

        setRecentProjects(projects.data.slice(0, 5));
        setRecentCertificates(certificates.data.slice(0, 3));
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, []);

  const statCards = [
    {
      title: 'Total Projets',
      value: stats.totalProjects,
      description: 'Tous les projets',
      icon: FolderOpen,
      color: 'text-blue-600',
    },
    {
      title: 'Projets Terminés',
      value: stats.completedProjects,
      description: 'Projets finalisés',
      icon: TrendingUp,
      color: 'text-green-600',
    },
    {
      title: 'En Cours',
      value: stats.inProgressProjects,
      description: 'Projets actifs',
      icon: Calendar,
      color: 'text-orange-600',
    },
    {
      title: 'Certifications',
      value: stats.totalCertificates,
      description: 'Certifications obtenues',
      icon: Award,
      color: 'text-purple-600',
    },
  ];

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-muted rounded w-64" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-muted rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Vue d'ensemble de mon portfolio
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Projects */}
        <Card>
          <CardHeader>
            <CardTitle>Projets Récents</CardTitle>
            <CardDescription>
              Vos derniers projets créés
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentProjects.map((project) => (
                <div key={project.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium line-clamp-1">{project.title}</h4>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {project.description}
                    </p>
                  </div>
                  <Badge variant={project.status === 'completed' ? 'default' : 'secondary'}>
                    {project.status === 'completed' ? 'Terminé' : 'En cours'}
                  </Badge>
                </div>
              ))}
              {recentProjects.length === 0 && (
                <p className="text-center text-muted-foreground py-4">
                  Aucun projet trouvé
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Certificates */}
        <Card>
          <CardHeader>
            <CardTitle>Certifications Récentes</CardTitle>
            <CardDescription>
              Vos dernières certifications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentCertificates.map((certificate) => (
                <div key={certificate.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium line-clamp-1">{certificate.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {certificate.issuer}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      {new Date(certificate.date).toLocaleDateString('fr-FR', {
                        month: 'short',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              ))}
              {recentCertificates.length === 0 && (
                <p className="text-center text-muted-foreground py-4">
                  Aucune certification trouvée
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}