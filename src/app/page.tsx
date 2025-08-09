import { UploadForm } from '@/components/upload-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  return (
    <div className="flex-1 p-4 md:p-8 space-y-8">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Upload & Verify Prescription</h1>
          <p className="text-muted-foreground">Upload a prescription image to extract and verify its details.</p>
        </div>
      </div>
      <UploadForm />
    </div>
  );
}
