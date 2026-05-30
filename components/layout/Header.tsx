'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, User, LogOut, Settings, Terminal } from 'lucide-react';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useSession, signOut } from 'next-auth/react';

const NAV = [
  { name: 'Accueil',        href: '/' },
  { name: 'À propos',       href: '/about' },
  { name: 'Projets',        href: '/project' },
  { name: 'Certifications', href: '/certificates' },
  { name: 'Contact',        href: '/contact' },
];

export function Header() {
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { data: session }     = useSession();
  const pathname              = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <>
      <header
        className="sticky top-0 z-[1002] w-full transition-all duration-300"
        style={{
          backgroundColor: 'rgba(255,255,255,0.96)',
          backdropFilter: 'blur(12px)',
          borderBottom: scrolled ? '1px solid #e5e7eb' : '1px solid transparent',
          boxShadow: scrolled ? '0 1px 12px rgba(0,0,0,0.06)' : 'none',
        }}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div
              className="w-7 h-7 rounded flex items-center justify-center transition-all"
              style={{
                border: '1px solid rgba(79,172,254,0.4)',
                backgroundColor: 'rgba(79,172,254,0.07)',
              }}
            >
              <Terminal className="h-3.5 w-3.5 text-[#4facfe]" />
            </div>
            <span className="text-base font-bold font-sys-mono tracking-tight text-gray-900">
              bala<span className="text-[#4facfe]">.</span>dev
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex lg:items-center lg:gap-0.5">
            {NAV.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="relative px-4 py-2 text-sm font-medium rounded-lg transition-colors"
                style={{
                  color: isActive(item.href) ? '#1a1a2e' : '#6b7280',
                  backgroundColor: isActive(item.href) ? 'rgba(79,172,254,0.08)' : 'transparent',
                }}
              >
                {isActive(item.href) && (
                  <span className="absolute bottom-1 left-4 right-4 h-0.5 rounded-full bg-[#4facfe]" />
                )}
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop right */}
          <div className="hidden lg:flex lg:items-center lg:gap-3">
            {session?.user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full p-0">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={session.user.image || undefined} />
                      <AvatarFallback className="text-xs bg-blue-50 text-blue-600">
                        {(session.user.name || 'U').charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <div className="px-3 py-2 border-b">
                    <p className="text-xs font-medium text-gray-900">{session.user.name}</p>
                    <p className="text-[10px] truncate text-gray-500">{session.user.email}</p>
                  </div>
                  {(session.user as any).role === 'admin' && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link href="/admin" className="gap-2 cursor-pointer">
                          <Settings className="h-3.5 w-3.5 text-gray-500" />
                          Administration
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  )}
                  <DropdownMenuItem onClick={() => signOut({ callbackUrl: '/' })} className="gap-2 cursor-pointer text-red-500">
                    <LogOut className="h-3.5 w-3.5" />
                    Déconnexion
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <Button variant="outline" size="sm" className="gap-2 text-xs font-sys-mono">
                  <User className="h-3.5 w-3.5" />
                  login
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile burger */}
          <button
            className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
            onClick={() => setOpen(true)}
            aria-label="Ouvrir le menu"
          >
            <Menu className="h-4 w-4" />
          </button>
        </nav>
      </header>

      {/* ── Mobile overlay ── */}
      <div
        className={`fixed inset-0 z-[1003] transition-opacity duration-300 lg:hidden ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        style={{ backgroundColor: 'rgba(0,0,0,0.25)', backdropFilter: 'blur(2px)' }}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* ── Mobile drawer ── */}
      <aside
        className={`fixed top-0 right-0 z-[1004] h-full w-72 flex flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${open ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ borderLeft: '1px solid #e5e7eb' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <span className="font-sys-mono text-sm font-bold text-gray-900">
            bala<span className="text-[#4facfe]">.</span>dev
          </span>
          <button
            onClick={() => setOpen(false)}
            className="w-7 h-7 flex items-center justify-center rounded text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="Fermer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-4 py-5 space-y-1 overflow-y-auto">
          {NAV.map((item, i) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
              style={{
                backgroundColor: isActive(item.href) ? 'rgba(79,172,254,0.08)' : 'transparent',
                color: isActive(item.href) ? '#1a1a2e' : '#6b7280',
                borderLeft: isActive(item.href) ? '2px solid #4facfe' : '2px solid transparent',
              }}
            >
              <span className="font-sys-mono text-[10px] text-gray-300">
                {String(i + 1).padStart(2, '0')}
              </span>
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Bottom */}
        <div className="px-4 py-5 border-t border-gray-100">
          {session?.user ? (
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="w-full flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm text-red-500 bg-red-50 hover:bg-red-100 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Déconnexion
            </button>
          ) : (
            <Link href="/login">
              <Button variant="outline" className="w-full gap-2 font-sys-mono text-sm">
                <User className="h-4 w-4" />
                Se connecter
              </Button>
            </Link>
          )}
        </div>
      </aside>
    </>
  );
}
