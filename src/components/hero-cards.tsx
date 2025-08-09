
'use client';

import { motion } from 'framer-motion';
import { CircleUser, Stethoscope, Beaker, CheckCircle } from 'lucide-react';
import { Card } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { cn } from '@/lib/utils';

const roles = [
  {
    name: 'Patient',
    title: 'Sarah Johnson',
    icon: CircleUser,
    avatar: 'https://placehold.co/100x100.png',
    dataAiHint: 'woman smiling',
    style: {
      transform: 'rotate(-8deg) translateY(-20px) translateX(-40px)',
      zIndex: 1,
    },
  },
  {
    name: 'Doctor',
    title: 'Dr. Anya Sharma',
    icon: Stethoscope,
    avatar: 'https://placehold.co/100x100.png',
    dataAiHint: 'doctor woman',
    style: {
      transform: 'rotate(-2deg) translateY(10px) translateX(-80px)',
      zIndex: 2,
    },
  },
  {
    name: 'Pharmacist',
    title: 'David Chen',
    icon: Beaker,
    avatar: 'https://placehold.co/100x100.png',
    dataAiHint: 'man pharmacist',
    style: {
      transform: 'rotate(2deg) translateY(10px) translateX(80px)',
      zIndex: 2,
    },
  },
  {
    name: 'Verifier',
    title: 'MediChain AI',
    icon: CheckCircle,
    avatar: 'https://placehold.co/100x100.png',
    dataAiHint: 'robot abstract',
    style: {
      transform: 'rotate(8deg) translateY(-20px) translateX(40px)',
      zIndex: 1,
    },
  },
];

export function HeroCards() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = (style: any) => {
    const rotateMatch = style.transform.match(/rotate\(([^)]+)\)/);
    const rotate = rotateMatch ? rotateMatch[1] : '0deg';
    return {
      hidden: { y: 50, opacity: 0, rotate: parseFloat(rotate) },
      visible: {
        y: 0,
        opacity: 1,
        rotate: parseFloat(rotate),
        transition: {
          type: 'spring',
          stiffness: 80,
          damping: 12,
        },
      },
    };
  };

  return (
    <motion.div
      className="relative flex items-center justify-center h-80 w-full"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      {roles.map((role, index) => (
        <motion.div
          key={role.name}
          className="absolute"
          style={{ zIndex: role.style.zIndex }}
          variants={itemVariants(role.style)}
        >
          <Card 
            className="w-48 p-4 flex flex-col items-center justify-center space-y-2 shadow-2xl bg-background/80 backdrop-blur-sm"
            style={{ transform: role.style.transform }}
          >
            <Avatar className="h-16 w-16 border-2 border-primary/50">
              <AvatarImage src={role.avatar} data-ai-hint={role.dataAiHint} />
              <AvatarFallback>{role.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="text-center">
              <p className="font-bold text-sm">{role.name}</p>
              <p className="text-xs text-muted-foreground">{role.title}</p>
            </div>
             <role.icon className="h-5 w-5 text-primary" />
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}
