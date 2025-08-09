'use client';

import { useState, useRef, useTransition, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Image from 'next/image';
import { UploadCloud, Camera, FileCheck2, Loader2, ClipboardCopy, Wand2, RefreshCw } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { usePrescriptions } from '@/hooks/use-prescriptions';
import { generateHash } from '@/lib/utils';
import { extractDataAction } from '@/app/actions';
import type { Prescription } from '@/types';
import { Label } from './ui/label';

type Status = 'idle' | 'processing' | 'verifying' | 'completed';

const formSchema = z.object({
  medicineName: z.string().min(1, 'Medicine name is required.'),
  dosage: z.string().min(1, 'Dosage is required.'),
  doctorName: z.string().min(1, 'Doctor name is required.'),
  doctorDetails: z.string(),
  patientName: z.string().min(1, 'Patient name is required.'),
  otherDetails: z.string().optional(),
});

export function UploadForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [isPending, startTransition] = useTransition();
  const [prescriptionHash, setPrescriptionHash] = useState<string>('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { addPrescription } = usePrescriptions();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      medicineName: '',
      dosage: '',
      doctorName: '',
      doctorDetails: '',
      patientName: '',
      otherDetails: '',
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
        processFile(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const processFile = (imageDataUri: string) => {
    setStatus('processing');
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 90 ? 90 : prev + 10));
    }, 500);

    startTransition(async () => {
      const result = await extractDataAction(imageDataUri);
      clearInterval(interval);
      setProgress(100);

      if ('error' in result) {
        toast({
          variant: 'destructive',
          title: 'Extraction Failed',
          description: result.error,
        });
        resetState();
      } else {
        form.reset(result);
        setStatus('verifying');
      }
    });
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const newPrescription: Omit<Prescription, 'id' | 'createdAt'> = {
        ...values,
    };
    
    const hash = generateHash(newPrescription);
    const finalPrescription: Prescription = {
        ...newPrescription,
        id: hash,
        createdAt: new Date().toISOString(),
    };

    addPrescription(finalPrescription);
    setPrescriptionHash(hash);
    setStatus('completed');
    toast({
        title: 'Prescription Verified',
        description: `A unique hash has been generated for this prescription.`,
    });
  };

  const resetState = () => {
    setStatus('idle');
    setPreviewUrl(null);
    setProgress(0);
    form.reset();
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(prescriptionHash);
    toast({ title: 'Copied!', description: 'Hash copied to clipboard.' });
  }

  const renderContent = () => {
    switch (status) {
      case 'idle':
        return (
          <Card className="text-center bg-background/50 backdrop-blur-sm border-white/10 shadow-lg animate-fade-in">
             <CardContent className="p-6">
              <div
                className="flex flex-col items-center justify-center space-y-4 rounded-lg border-2 border-dashed border-muted-foreground/30 p-12 transition-colors hover:border-primary/50 hover:bg-white/5"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const file = e.dataTransfer.files?.[0];
                  if (file) {
                     const reader = new FileReader();
                      reader.onloadend = () => {
                        setPreviewUrl(reader.result as string);
                        processFile(reader.result as string);
                      };
                      reader.readAsDataURL(file);
                  }
                }}
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <UploadCloud className="h-8 w-8" />
                </div>
                <p className="text-muted-foreground">Drag & drop a prescription image, or</p>
                <div className="flex gap-4">
                  <Button onClick={() => fileInputRef.current?.click()}>
                    <UploadCloud className="mr-2" /> Choose File
                  </Button>
                  <Button variant="secondary" onClick={() => fileInputRef.current?.click()}>
                    <Camera className="mr-2" /> Use Camera
                  </Button>
                </div>
                <Input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
            </CardContent>
          </Card>
        );
      case 'processing':
        return (
          <Card className="bg-background/50 backdrop-blur-sm border-white/10 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Loader2 className="animate-spin" /> Processing Prescription</CardTitle>
              <CardDescription>Our AI is extracting the details. Please wait.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
                {previewUrl && 
                  <div className="w-full max-w-sm rounded-lg overflow-hidden border border-white/10">
                    <Image src={previewUrl} alt="Prescription preview" width={400} height={400} className="object-contain" />
                  </div>
                }
              <Progress value={progress} className="w-full" />
              <p className="text-sm text-muted-foreground animate-pulse">Analyzing image...</p>
            </CardContent>
          </Card>
        );
      case 'verifying':
        return (
          <Card className="bg-background/50 backdrop-blur-sm border-white/10 shadow-lg animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Wand2 /> Verify Extracted Data</CardTitle>
              <CardDescription>Please review and confirm the extracted information below.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {previewUrl && (
                  <div className="w-full rounded-lg overflow-hidden border p-2 border-white/10">
                    <Image src={previewUrl} alt="Prescription preview" width={500} height={500} className="object-contain w-full h-auto rounded-md" />
                  </div>
                )}
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField control={form.control} name="patientName" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Patient Name</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="medicineName" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Medicine Name</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="dosage" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Dosage</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="doctorName" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Doctor Name</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="doctorDetails" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Doctor Details</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="otherDetails" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Other Details</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <div className="flex justify-end gap-2 pt-4">
                        <Button type="button" variant="secondary" onClick={resetState}>Cancel</Button>
                        <Button type="submit">
                          <FileCheck2 className="mr-2"/>
                          Confirm & Generate Hash
                        </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </CardContent>
          </Card>
        );
        case 'completed':
            return (
              <Card className="bg-background/50 backdrop-blur-sm border-white/10 shadow-lg animate-fade-in">
                <CardHeader className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 text-green-400">
                    <FileCheck2 className="h-8 w-8" />
                  </div>
                  <CardTitle className="mt-4">Verification Complete</CardTitle>
                  <CardDescription>
                    The prescription has been securely recorded on-chain.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="hash">Unique Prescription Hash</Label>
                    <div className="flex items-center gap-2">
                       <Input id="hash" readOnly value={prescriptionHash} className="font-mono bg-white/5"/>
                       <Button variant="outline" size="icon" onClick={copyToClipboard}>
                           <ClipboardCopy className="h-4 w-4" />
                       </Button>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">This hash can be used to verify the authenticity of the prescription at any time.</p>
                </CardContent>
                <CardFooter>
                    <Button onClick={resetState} className="w-full">
                        <RefreshCw className="mr-2" />
                        Verify Another Prescription
                    </Button>
                </CardFooter>
              </Card>
            );
      default:
        return null;
    }
  };

  return <div className="w-full">{renderContent()}</div>;
}
