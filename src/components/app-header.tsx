'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ShieldPlus } from 'lucide-react';

const menuItems = [
  {
    href: '/upload',
    label: 'Upload & Verify',
  },
  {
    href: '/generate',
    label: 'Generate Prescription',
  },
  {
    href: '/verify',
    label: 'Verify Hash',
  },
  {
    href: '/doctors',
    label: 'Doctor Directory',
  },
];

export function AppHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <ShieldPlus className="h-7 w-7 text-primary" />
            <span className="text-xl font-bold text-foreground">MediChain Verify</span>
          </Link>
          <nav className="hidden md:flex items-center gap-4">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary',
                  pathname === item.href ? 'text-primary' : 'text-muted-foreground'
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
            <Button variant="ghost">Login</Button>
            <Button>Sign Up</Button>
        </div>
      </div>
    </header>
  );
}
