
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ShieldPlus } from 'lucide-react';
import { useEffect, useState } from 'react';

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
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <div className="sticky top-0 z-50 w-full p-4">
      <header className={cn(
          "container flex h-16 items-center justify-between rounded-full transition-all duration-300",
          isScrolled 
            ? 'bg-background/95 shadow-lg ring-1 ring-black/5' 
            : 'bg-transparent'
        )}>
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <ShieldPlus className="h-7 w-7 text-primary" />
            <span className="text-lg font-semibold text-foreground">MediChain Verify</span>
          </Link>
          <nav className="hidden md:flex items-center gap-2">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'rounded-full px-4 py-2 text-sm font-medium transition-colors hover:bg-muted/50',
                  pathname === item.href ? 'text-primary bg-muted/50' : 'text-muted-foreground'
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
            <Link href="/auth">
                <Button variant="ghost" className="rounded-full">Login</Button>
            </Link>
             <Link href="/auth?form=signup">
                <Button className="rounded-full">Sign Up</Button>
            </Link>
        </div>
      </header>
    </div>
  );
}
