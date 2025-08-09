
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
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

const MediChainLogo = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2L12 10" />
      <path d="M12 14L12 22" />
      <path d="M17 9A2 2 0 0 0 15 7" />
      <path d="M7 9A2 2 0 0 1 9 7" />
      <path d="M17 15A2 2 0 0 1 15 17" />
      <path d="M7 15A2 2 0 0 0 9 17" />
      <path d="M9 7h6" />
      <path d="M9 17h6" />
      <rect x="7" y="10" width="10" height="4" rx="2" />
    </svg>
  );

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
            <MediChainLogo className="h-7 w-7 text-primary" />
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
