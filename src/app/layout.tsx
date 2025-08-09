
'use client';

import type {Metadata} from 'next';
import './globals.css';
import {Toaster} from '@/components/ui/toaster';
import { AppHeader } from '@/components/app-header';
import { useEffect, useState } from 'react';

// This is a temporary workaround until we can get metadata to work in this file.
// export const metadata: Metadata = {
//   title: 'MediChain Verify',
//   description: 'Securely verify and manage medical prescriptions.',
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <html lang="en" className={isMounted ? 'dark' : ''}>
      <head>
        <title>MediChain Verify</title>
        <meta name="description" content="Securely verify and manage medical prescriptions." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        ></link>
      </head>
      <body className="font-body antialiased bg-background">
        <AppHeader />
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
