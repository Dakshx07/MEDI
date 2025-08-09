
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { UploadCloud, ShieldCheck } from 'lucide-react';
import { FeaturesScroll } from '@/components/features-scroll';
import { FeatureGrid } from '@/components/feature-grid';

export default function Home() {
  return (
    <div className="relative min-h-[calc(100vh-80px)] w-full overflow-hidden bg-background text-foreground dark">
      <div className="absolute inset-0 z-0">
         <div className="absolute inset-0 bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div
          className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(128,90,213,0.15),rgba(255,255,255,0))]"></div>
        <div
          className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(128,90,213,0.15),rgba(255,255,255,0))]"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] p-4 md:p-8 space-y-8 animate-fade-in">
        <div className="text-center space-y-6 max-w-4xl mx-auto pt-16">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            The Future of Prescription Verification is <span className="text-primary">Here</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            MediChain brings trust and security to healthcare. Instantly extract, verify, and secure medical prescriptions using our AI-powered platform.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4 animate-fade-in animation-delay-200">
          <Link href="/upload">
            <Button size="lg">
              Upload & Verify <UploadCloud className="ml-2" />
            </Button>
          </Link>
          <Link href="/verify">
             <Button size="lg" variant="outline">
              Verify a Hash <ShieldCheck className="ml-2" />
            </Button>
          </Link>
        </div>
        
        <div className="w-full max-w-6xl pt-12 animate-fade-in animation-delay-400">
            <FeaturesScroll />
        </div>

        <div className="w-full max-w-5xl py-12 animate-fade-in animation-delay-400">
          <FeatureGrid />
        </div>
      </div>
    </div>
  );
}
