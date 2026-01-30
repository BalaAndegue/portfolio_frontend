'use client';

import { useEffect, useState } from 'react';
import { getMessages } from '@/lib/actions';
import { ContactMessage } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mail, User, Clock } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminMessagesPage() {
    const [messages, setMessages] = useState<ContactMessage[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getMessages().then(res => {
            setMessages(res.data as any[]);
            setLoading(false);
        }).catch(() => {
            toast.error('Erreur de chargement des messages');
            setLoading(false);
        });
    }, []);

    if (loading) return <div className="p-8">Chargement...</div>;

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-8">Messages Reçus</h1>
            <div className="space-y-4">
                {messages.map((msg) => (
                    <Card key={msg.id}>
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <User className="h-5 w-5 text-gray-500" />
                                    <CardTitle className="text-lg">{msg.name}</CardTitle>
                                </div>
                                <Badge variant={msg.status === 'new' ? 'destructive' : 'secondary'}>
                                    {msg.status}
                                </Badge>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                <Mail className="h-4 w-4" />
                                <span>{msg.email}</span>
                                <Clock className="h-4 w-4 ml-2" />
                                <span>{new Date(msg.createdAt).toLocaleDateString()}</span>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="font-semibold mb-2">{msg.subject}</p>
                            <p className="text-gray-600 whitespace-pre-wrap">{msg.message}</p>
                        </CardContent>
                    </Card>
                ))}
                {messages.length === 0 && <p className="text-center text-muted-foreground py-12">Aucun message reçu.</p>}
            </div>
        </div>
    );
}
