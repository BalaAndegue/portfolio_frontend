'use client';

import { useEffect, useState } from 'react';
import { getPersonalInfo, updatePersonalInfo } from '@/lib/actions';
import { PersonalInfo } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function AdminProfilePage() {
    const [profile, setProfile] = useState<PersonalInfo | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        getPersonalInfo().then((data) => {
            setProfile(data);
            setLoading(false);
        });
    }, []);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!profile) return;
        setSaving(true);
        try {
            await updatePersonalInfo(profile);
            toast.success('Profil mis à jour avec succès');
        } catch (error) {
            toast.error('Erreur lors de la mise à jour');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-8">Chargement...</div>;

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Informations Personnelles</h1>
            <form onSubmit={handleSave} className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Profil Général</CardTitle>
                        <CardDescription>Gérez vos informations de base</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Nom Complet</Label>
                                <Input
                                    id="name"
                                    value={profile?.name || ''}
                                    onChange={e => setProfile({ ...profile!, name: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="title">Titre Professionnel</Label>
                                <Input
                                    id="title"
                                    value={profile?.title || ''}
                                    onChange={e => setProfile({ ...profile!, title: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="bio">Bio Courte</Label>
                            <Textarea
                                id="bio"
                                value={profile?.bio || ''}
                                onChange={e => setProfile({ ...profile!, bio: e.target.value })}
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    value={profile?.email || ''}
                                    onChange={e => setProfile({ ...profile!, email: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Téléphone</Label>
                                <Input
                                    id="phone"
                                    value={profile?.phone || ''}
                                    onChange={e => setProfile({ ...profile!, phone: e.target.value })}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end">
                    <Button type="submit" disabled={saving}>
                        {saving ? 'Enregistrement...' : 'Enregistrer les modifications'}
                    </Button>
                </div>
            </form>
        </div>
    );
}
