'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, User, LogOut, Settings, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useSession, signOut } from 'next-auth/react';

const NAV = [
  { name: 'Accueil',       href: '/' },
  { name: 'À propos',      href: '/about' },
  { name: 'Projets',       href: '/project' },
  { name: 'Certifications',href: '/certificates' },
  { name: 'Contact',       href: '/contact' },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ferme le menu mobile au changement de route
  useEffect(() => { setOpen(false); }, [pathname]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <>
      <header
        className="sticky top-0 z-50 w-full transition-all duration-300"
        style={{
          backgroundColor: scrolled
            ? 'rgba(8,8,18,0.96)'
            : 'rgba(8,8,18,0.80)',
          backdropFilter: 'blur(12px)',
          borderBottom: scrolled
            ? '1px solid rgba(0,255,65,0.12)'
            : '1px solid rgba(255,255,255,0.04)',
          boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.4)' : 'none',
        }}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div
              className="w-7 h-7 rounded flex items-center justify-center transition-all duration-300 group-hover:scale-110"
              style={{
                border: '1px solid rgba(0,255,65,0.5)',
                backgroundColor: 'rgba(0,255,65,0.08)',
                boxShadow: '0 0 10px rgba(0,255,65,0.2)',
              }}
            >
              <Terminal className="h-3.5 w-3.5" style={{ color: '#00ff41' }} />
            </div>
            <span
              className="text-lg font-bold font-sys-mono tracking-tight transition-colors"
              style={{ color: '#F0E6C8' }}
            >
              bala<span style={{ color: '#00ff41' }}>@</span>dev
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex lg:items-center lg:gap-1">
            {NAV.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="relative px-3 py-1.5 text-sm font-medium rounded transition-all duration-200"
                style={{
                  color: isActive(item.href) ? '#F0E6C8' : '#8892a4',
                  backgroundColor: isActive(item.href)
                    ? 'rgba(79,172,254,0.1)'
                    : 'transparent',
                }}
                onMouseEnter={e => {
                  if (!isActive(item.href))
                    (e.currentTarget as HTMLElement).style.color = '#F0E6C8';
                }}
                onMouseLeave={e => {
                  if (!isActive(item.href))
                    (e.currentTarget as HTMLElement).style.color = '#8892a4';
                }}
              >
                {isActive(item.href) && (
                  <span
                    className="absolute bottom-0 left-3 right-3 h-px"
                    style={{ backgroundColor: '#4facfe' }}
                  />
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
                    <Avatar className="h-8 w-8 ring-1 ring-[#4facfe]/40">
                      <AvatarImage src={session.user.image || undefined} />
                      <AvatarFallback className="text-xs" style={{ backgroundColor: '#0e0e1c', color: '#4facfe' }}>
                        {(session.user.name || 'U').charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-48"
                  style={{ backgroundColor: '#0e0e1c', border: '1px solid rgba(79,172,254,0.2)' }}
                >
                  <div className="px-3 py-2 border-b border-[#1e2030]">
                    <p className="text-xs font-medium" style={{ color: '#F0E6C8' }}>{session.user.name}</p>
                    <p className="text-[10px] truncate" style={{ color: '#8892a4' }}>{session.user.email}</p>
                  </div>
                  {(session.user as any).role === 'admin' && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link href="/admin" className="gap-2 cursor-pointer">
                          <Settings className="h-3.5 w-3.5" style={{ color: '#4facfe' }} />
                          <span style={{ color: '#F0E6C8' }}>Administration</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator style={{ backgroundColor: '#1e2030' }} />
                    </>
                  )}
                  <DropdownMenuItem onClick={() => signOut({ callbackUrl: '/' })} className="gap-2 cursor-pointer">
                    <LogOut className="h-3.5 w-3.5" style={{ color: '#f87171' }} />
                    <span style={{ color: '#f87171' }}>Déconnexion</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <button
                  className="flex items-center gap-2 px-3 py-1.5 rounded font-sys-mono text-xs transition-all duration-200"
                  style={{
                    border: '1px solid rgba(79,172,254,0.3)',
                    color: '#4facfe',
                    backgroundColor: 'transparent',
                  }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(79,172,254,0.1)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'}
                >
                  <User className="h-3 w-3" />
                  login
                </button>
              </Link>
            )}
          </div>

          {/* Mobile burger */}
          <button
            className="lg:hidden flex items-center justify-center w-9 h-9 rounded transition-all"
            style={{
              border: '1px solid rgba(0,255,65,0.25)',
              backgroundColor: 'rgba(0,255,65,0.06)',
              color: '#00ff41',
            }}
            onClick={() => setOpen(true)}
            aria-label="Ouvrir le menu"
          >
            <Menu className="h-4 w-4" />
          </button>
        </nav>
      </header>

      {/* ── Mobile overlay + drawer ── */}
      {/* Dark overlay */}
      <div
        className={`fixed inset-0 z-[60] transition-opacity duration-300 lg:hidden ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        style={{ backgroundColor: 'rgba(8,8,18,0.7)', backdropFilter: 'blur(4px)' }}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 z-[70] h-full w-72 flex flex-col transition-transform duration-300 ease-in-out lg:hidden ${open ? 'translate-x-0' : 'translate-x-full'}`}
        style={{
          backgroundColor: '#080812',
          borderLeft: '1px solid rgba(0,255,65,0.15)',
          boxShadow: open ? '-8px 0 32px rgba(0,0,0,0.6)' : 'none',
        }}
      >
        {/* Drawer header */}
        <div
          className="flex items-center justify-between px-5 py-4"
          style={{ borderBottom: '1px solid rgba(0,255,65,0.1)' }}
        >
          <span className="font-sys-mono text-sm font-bold" style={{ color: '#F0E6C8' }}>
            bala<span style={{ color: '#00ff41' }}>@</span>dev
          </span>
          <button
            onClick={() => setOpen(false)}
            className="flex items-center justify-center w-7 h-7 rounded transition-colors"
            style={{ color: '#8892a4' }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#F0E6C8'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#8892a4'}
            aria-label="Fermer le menu"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Drawer nav */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {NAV.map((item, i) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded text-sm font-medium transition-all duration-200"
              style={{
                backgroundColor: isActive(item.href) ? 'rgba(79,172,254,0.1)' : 'transparent',
                color: isActive(item.href) ? '#F0E6C8' : '#8892a4',
                borderLeft: isActive(item.href)
                  ? '2px solid #4facfe'
                  : '2px solid transparent',
                animationDelay: `${i * 50}ms`,
              }}
            >
              <span className="font-sys-mono text-[10px] opacity-40">
                {String(i + 1).padStart(2, '0')}
              </span>
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Drawer bottom */}
        <div className="px-4 py-5" style={{ borderTop: '1px solid rgba(0,255,65,0.1)' }}>
          {session?.user ? (
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="w-full flex items-center gap-2 px-4 py-2.5 rounded text-sm transition-colors"
              style={{ color: '#f87171', backgroundColor: 'rgba(248,113,113,0.06)' }}
            >
              <LogOut className="h-4 w-4" />
              Déconnexion
            </button>
          ) : (
            <Link href="/login" className="block">
              <button
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded font-sys-mono text-sm transition-all"
                style={{
                  border: '1px solid rgba(79,172,254,0.3)',
                  color: '#4facfe',
                }}
              >
                <User className="h-4 w-4" />
                Se connecter
              </button>
            </Link>
          )}
        </div>
      </aside>
    </>
  );
}
