import { UploadForm } from '@/components/upload-form';

export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-grid-pattern"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-transparent to-background"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 md:p-8 space-y-8 animate-fade-in">
        <div className="text-center space-y-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-br from-gray-200 to-gray-500 bg-clip-text text-transparent">
            The Future of Prescription Verification
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Instantly extract, verify, and secure medical prescriptions using our AI-powered platform.
            Upload an image to begin.
          </p>
        </div>
        <div className="w-full max-w-4xl animate-fade-in animation-delay-200">
          <UploadForm />
        </div>
      </div>
    </div>
  );
}
