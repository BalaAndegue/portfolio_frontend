'use client';

import { useEffect, useState } from 'react';
import { getCertificates, deleteCertificate } from '@/lib/actions';
import { Certificate } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Award } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';

export default function AdminCertificatesPage() {
    const [certificates, setCertificates] = useState<Certificate[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadCertificates();
    }, []);

    const loadCertificates = async () => {
        try {
            const res = await getCertificates({ limit: 100 });
            setCertificates(res.data as Certificate[]);
        } catch (error) {
            toast.error('Erreur de chargement');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Supprimer cette certification ?')) return;
        try {
            await deleteCertificate(id);
            setCertificates(prev => prev.filter(c => c.id !== id));
            toast.success('Certification supprimée');
        } catch (error) {
            toast.error('Erreur de suppression');
        }
    };

    if (loading) return <div className="p-8">Chargement...</div>;

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Certifications</h1>
                <Button asChild>
                    <Link href="/admin/certificates/new">
                        <Plus className="mr-2 h-4 w-4" /> Nouvelle Certification
                    </Link>
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certificates.map((cert) => (
                    <Card key={cert.id}>
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <Award className="h-8 w-8 text-blue-600 mb-2" />
                                <div className="flex gap-2">
                                    <Button size="icon" variant="ghost">
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button size="icon" variant="ghost" className="text-destructive" onClick={() => handleDelete(cert.id)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                            <CardTitle className="line-clamp-2">{cert.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-4">{cert.issuer}</p>
                            <div className="flex flex-wrap gap-2">
                                {cert.skills.map(skill => (
                                    <Badge key={skill} variant="secondary" className="text-xs">
                                        {skill}
                                    </Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
