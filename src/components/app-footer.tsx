
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Twitter, Github, Linkedin } from 'lucide-react';
import { Separator } from './ui/separator';
import { Button } from './ui/button';

const menuItems = [
  { href: '/upload', label: 'Upload & Verify' },
  { href: '/generate', label: 'Generate' },
  { href: '/verify', label: 'Verify' },
  { href: '/doctors', label: 'Doctors' },
];

const socialLinks = [
  { href: '#', icon: Twitter },
  { href: '#', icon: Github },
  { href: '#', icon: Linkedin },
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

export function AppFooter() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <footer className="w-full bg-background border-t mt-24">
      <motion.div
        className="container mx-auto py-12 px-4 md:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div className="space-y-4" variants={itemVariants}>
            <Link href="/" className="flex items-center gap-2">
              <MediChainLogo className="h-8 w-8 text-primary" />
              <span className="text-xl font-semibold text-foreground">MediChain Verify</span>
            </Link>
            <p className="text-muted-foreground">
              The future of prescription verification is here. Secure, fast, and reliable.
            </p>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
             <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
              <div className="flex items-center gap-4">
                {socialLinks.map((social, index) => (
                  <Link href={social.href} key={index} target="_blank" rel="noopener noreferrer">
                     <Button variant="outline" size="icon" className="rounded-full">
                        <social.icon className="h-5 w-5" />
                     </Button>
                  </Link>
                ))}
            </div>
          </motion.div>
        </div>

        <motion.div variants={itemVariants}>
          <Separator className="my-8" />
          <div className="text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} MediChain Verify. All rights reserved.</p>
            <p className="mt-1">A Demonstration for Hackathon Purposes.</p>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}
