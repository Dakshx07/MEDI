'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { FilePlus2, FileCheck2, ClipboardCopy } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { usePrescriptions } from '@/hooks/use-prescriptions';
import { generateHash } from '@/lib/utils';
import type { Prescription } from '@/types';
import { Label } from '@/components/ui/label';

const formSchema = z.object({
  medicineName: z.string().min(1, 'Medicine name is required.'),
  dosage: z.string().min(1, 'Dosage is required.'),
  doctorName: z.string().min(1, 'Doctor name is required.'),
  doctorDetails: z.string(),
  patientName: z.string().min(1, 'Patient name is required.'),
  otherDetails: z.string().optional(),
});

export default function GeneratePage() {
  const [isCompleted, setIsCompleted] = useState(false);
  const [prescriptionHash, setPrescriptionHash] = useState<string>('');
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

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const newPrescription: Omit<Prescription, 'id' | 'createdAt'> = { ...values };
    const hash = generateHash(newPrescription);
    const finalPrescription: Prescription = {
      ...newPrescription,
      id: hash,
      createdAt: new Date().toISOString(),
    };

    addPrescription(finalPrescription);
    setPrescriptionHash(hash);
    setIsCompleted(true);
    toast({
      title: 'Prescription Generated',
      description: 'A unique hash has been created and stored.',
    });
  };

  const resetForm = () => {
    form.reset();
    setIsCompleted(false);
    setPrescriptionHash('');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(prescriptionHash);
    toast({ title: 'Copied!', description: 'Hash copied to clipboard.' });
  }

  if (isCompleted) {
    return (
        <div className="flex-1 p-4 md:p-8 flex items-center justify-center">
        <Card className="w-full max-w-lg">
          <CardHeader className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/20 text-accent">
              <FileCheck2 className="h-8 w-8" />
            </div>
            <CardTitle className="mt-4">Generation Complete</CardTitle>
            <CardDescription>
              The prescription has been securely recorded.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="hash">Unique Prescription Hash</Label>
              <div className="flex items-center gap-2">
                 <Input id="hash" readOnly value={prescriptionHash} className="font-mono"/>
                 <Button variant="outline" size="icon" onClick={copyToClipboard}>
                     <ClipboardCopy className="h-4 w-4" />
                 </Button>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">This hash can be used to verify the authenticity of the prescription.</p>
          </CardContent>
          <CardFooter>
              <Button onClick={resetForm} className="w-full">
                  Generate Another Prescription
              </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex-1 p-4 md:p-8 space-y-8">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Generate New Prescription</h1>
          <p className="text-muted-foreground">Create a new digital prescription on the platform.</p>
        </div>
      </div>
      <Card>
        <CardHeader>
            <CardTitle>Prescription Details</CardTitle>
            <CardDescription>Fill in the form below to create a new prescription.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="patientName" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Patient Name</FormLabel>
                        <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="medicineName" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Medicine Name</FormLabel>
                        <FormControl><Input placeholder="Amoxicillin" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="dosage" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Dosage</FormLabel>
                        <FormControl><Input placeholder="500mg, twice a day" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="doctorName" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Doctor Name</FormLabel>
                        <FormControl><Input placeholder="Dr. Jane Smith" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="doctorDetails" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Doctor Details</FormLabel>
                        <FormControl><Input placeholder="General Hospital, #12345" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="otherDetails" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Other Details (Optional)</FormLabel>
                        <FormControl><Input placeholder="Take with food" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                </div>
                 <div className="flex justify-end pt-4">
                    <Button type="submit">
                      <FilePlus2 className="mr-2" />
                      Generate & Store Prescription
                    </Button>
                </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
