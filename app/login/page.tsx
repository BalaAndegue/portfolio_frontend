'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { signIn } from 'next-auth/react';
import { Terminal, Lock } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError('Email ou mot de passe incorrect.');
      setLoading(false);
    } else {
      // full-page navigation — force la session à être lue côté serveur
      window.location.href = '/admin';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4"
            style={{ backgroundColor: 'rgba(79,172,254,0.1)', border: '1px solid rgba(79,172,254,0.3)' }}>
            <Terminal className="h-6 w-6 text-[#4facfe]" />
          </div>
          <h1 className="text-xl font-bold text-gray-900">Administration</h1>
          <p className="text-sm text-gray-500 mt-1">Accès réservé</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <form onSubmit={handleSubmit} className="space-y-4">

            {error && (
              <Alert variant="destructive" className="py-2">
                <AlertDescription className="text-xs">{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs font-medium text-gray-700">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@example.com"
                required
                className="h-9 text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-xs font-medium text-gray-700">
                Mot de passe
              </Label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="h-9 text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 h-9 rounded-lg text-sm font-semibold text-white transition-all disabled:opacity-60"
              style={{ backgroundColor: '#4facfe' }}
            >
              {loading ? (
                <span className="font-sys-mono text-xs animate-pulse">Connexion...</span>
              ) : (
                <>
                  <Lock className="h-3.5 w-3.5" />
                  Se connecter
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center mt-6">
          <Link href="/" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
            ← Retour au portfolio
          </Link>
        </p>
      </div>
    </div>
  );
}
