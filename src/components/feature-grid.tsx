
'use client';

import { FileCheck2, ScanText, ShieldCheck, UploadCloud, Users, WifiOff } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
    {
      name: 'AI Data Extraction',
      description: 'Leverage our powerful AI to instantly and accurately extract text from any prescription image.',
      icon: ScanText,
    },
    {
      name: 'Secure Hash Verification',
      description: 'Generate a unique, tamper-proof hash for every prescription, ensuring its authenticity and integrity.',
      icon: ShieldCheck,
    },
    {
      name: 'Digital Prescription Management',
      description: 'Create and manage digital prescriptions with ease, reducing paperwork and improving efficiency.',
      icon: FileCheck2,
    },
    {
      name: 'Trusted Doctor Directory',
      description: 'Access a directory of verified medical professionals to validate prescription origins.',
      icon: Users,
    },
    {
      name: 'Seamless Upload & Camera Integration',
      description: 'Upload prescription images directly from your device or use your camera for instant capture.',
      icon: UploadCloud,
    },
    {
      name: 'Reliable Offline Functionality',
      description: 'Verify and manage prescriptions even without an active internet connection, ensuring constant access.',
      icon: WifiOff,
    },
  ];

export function FeatureGrid() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
      },
    },
  };
    
  return (
    <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
    >
        {features.map((feature) => (
            <motion.div key={feature.name} className="flex flex-col items-start gap-4" variants={itemVariants}>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">{feature.name}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
        ))}
    </motion.div>
  );
}
