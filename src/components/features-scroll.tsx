
'use client';

import {
  FileCheck2,
  ScanText,
  ShieldCheck,
  UploadCloud,
  Users,
  WifiOff,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const features = [
  {
    name: 'AI Data Extraction',
    icon: ScanText,
  },
  {
    name: 'Secure Verification',
    icon: ShieldCheck,
  },
  {
    name: 'Digital Prescriptions',
    icon: FileCheck2,
  },
  {
    name: 'Doctor Directory',
    icon: Users,
  },
  {
    name: 'Offline Functionality',
    icon: WifiOff,
  },
  {
    name: 'Instant Upload',
    icon: UploadCloud,
  },
];

export function FeaturesScroll() {
  return (
    <div className="relative w-full overflow-hidden py-8">
      <div
        className="flex w-max animate-scroll"
        style={{ animationDuration: '30s' }}
      >
        {[...features, ...features].map((feature, index) => (
          <div key={index} className="mx-6 flex items-center justify-center">
            <feature.icon className="h-6 w-6 text-muted-foreground" />
            <span className="ml-3 text-lg font-medium text-muted-foreground">
              {feature.name}
            </span>
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-background to-transparent"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-background to-transparent"></div>
    </div>
  );
}
