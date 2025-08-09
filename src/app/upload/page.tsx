import { UploadForm } from '@/components/upload-form';

export default function UploadPage() {
  return (
    <div className="relative min-h-[calc(100vh-80px)] w-full overflow-hidden bg-background">
       <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] p-4 md:p-8 space-y-8 animate-fade-in">
        <div className="text-center space-y-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Upload & Verify Prescription
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
