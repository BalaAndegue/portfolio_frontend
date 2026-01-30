'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function AdminSettingsPage() {
    const handleUpdatePassword = (e: React.FormEvent) => {
        e.preventDefault();
        toast.info('Fonctionnalité de changement de mot de passe à implémenter');
    };

    return (
        <div className="p-8 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Paramètres</h1>
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Sécurité</CardTitle>
                        <CardDescription>Mettez à jour vos identifiants d'accès</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleUpdatePassword} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="old-password">Ancien mot de passe</Label>
                                <Input id="old-password" type="password" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="new-password">Nouveau mot de passe</Label>
                                <Input id="new-password" type="password" />
                            </div>
                            <Button type="submit">Changer le mot de passe</Button>
                        </form>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Base de données</CardTitle>
                        <CardDescription>Configuration de la persistance</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">
                            Statut: <span className="text-green-600 font-semibold">Connecté</span> (Prisma + PostgreSQL)
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
