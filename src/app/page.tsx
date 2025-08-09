import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="relative min-h-[calc(100vh-80px)] w-full overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div
          className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
        <div
          className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] p-4 md:p-8 space-y-8 animate-fade-in">
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900">
            Build teams of <span className="text-primary">AI agents</span> that deliver human-quality work
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Instantly extract, verify, and secure medical prescriptions using our AI-powered platform.
            Upload an image to begin.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4 animate-fade-in animation-delay-200">
          <Link href="/upload">
            <Button size="lg">
              Try for free <ArrowRight className="ml-2" />
            </Button>
          </Link>
          <Link href="/verify">
             <Button size="lg" variant="outline">
              Request a demo
            </Button>
          </Link>
        </div>
        <div className="w-full max-w-5xl pt-12 animate-fade-in animation-delay-400">
          <div className="relative rounded-xl border bg-card text-card-foreground shadow-xl">
             <Image src="https://placehold.co/1024x640.png" width={1024} height={640} alt="App Screenshot" data-ai-hint="dashboard analytics" className="rounded-xl" />
             <div className="absolute inset-0 bg-black/5 rounded-xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
