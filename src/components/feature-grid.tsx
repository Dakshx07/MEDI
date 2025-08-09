
'use client';

import { FileCheck2, ScanText, ShieldCheck, UploadCloud, Users, WifiOff } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { cn } from '@/lib/utils';

const features = [
    {
      name: 'AI Data Extraction',
      description: 'Leverage our powerful AI to instantly and accurately extract text from any prescription image.',
      icon: ScanText,
      className: 'lg:col-span-2',
    },
    {
      name: 'Secure Hash Verification',
      description: 'Generate a unique, tamper-proof hash for every prescription, ensuring its authenticity and integrity.',
      icon: ShieldCheck,
      className: 'lg:col-span-1',
    },
    {
      name: 'Digital Prescription Management',
      description: 'Create and manage digital prescriptions with ease, reducing paperwork and improving efficiency.',
      icon: FileCheck2,
      className: 'lg:col-span-1',
    },
    {
      name: 'Trusted Doctor Directory',
      description: 'Access a directory of verified medical professionals to validate prescription origins.',
      icon: Users,
      className: 'lg:col-span-2',
    },
    {
      name: 'Seamless Upload & Camera',
      description: 'Upload prescription images directly from your device or use your camera for instant capture.',
      icon: UploadCloud,
      className: 'lg:col-span-2',
    },
     {
      name: 'Reliable Offline Functionality',
      description: 'Verify and manage prescriptions even without an active internet connection.',
      icon: WifiOff,
      className: 'lg:col-span-1',
    },
  ];

export function FeatureGrid() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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
        damping: 10,
      },
    },
  };
    
  return (
    <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
    >
        {features.map((feature) => (
            <motion.div key={feature.name} className={cn("h-full", feature.className)} variants={itemVariants}>
                <Card className="h-full bg-card/50 hover:bg-card/90 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <CardHeader className="flex flex-row items-center gap-4 pb-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                            <feature.icon className="h-6 w-6" />
                        </div>
                        <CardTitle className="text-xl">{feature.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                </Card>
            </motion.div>
        ))}
    </motion.div>
  );
}
