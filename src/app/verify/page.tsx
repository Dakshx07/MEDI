'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ShieldCheck, Search, FileX, FileCheck, CircleUser, Stethoscope, Pill, Text } from 'lucide-react';
import { format } from 'date-fns';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { usePrescriptions } from '@/hooks/use-prescriptions';
import type { Prescription } from '@/types';

const formSchema = z.object({
  hash: z.string().min(1, 'Prescription hash is required.'),
});

export default function VerifyPage() {
  const [foundPrescription, setFoundPrescription] = useState<Prescription | null | undefined>(undefined);
  const { getPrescription, isInitialized } = usePrescriptions();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { hash: '' },
  });

  const onSubmit = (values: z.infer<typeof formSchema>>) => {
    const prescription = getPrescription(values.hash);
    setFoundPrescription(prescription || null);
    if (!prescription) {
      toast({
        variant: 'destructive',
        title: 'Not Found',
        description: 'No prescription found with the provided hash.',
      });
    }
  };
  
  const InfoRow = ({ icon, label, value }: { icon: React.ElementType, label: string, value?: string }) => (
    value ? (
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground">
              {React.createElement(icon, { className: "h-4 w-4" })}
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">{label}</p>
            <p className="text-base font-semibold">{value}</p>
          </div>
        </div>
      ) : null
  )

  return (
    <div className="flex-1 p-4 md:p-8 space-y-8">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Verify Prescription Authenticity</h1>
          <p className="text-muted-foreground">Enter a prescription hash to verify its details against the records.</p>
        </div>
      </div>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
            <CardTitle>Verify Hash</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-start gap-2">
              <FormField
                control={form.control}
                name="hash"
                render={({ field }) => (
                  <FormItem className="flex-grow">
                    <FormControl>
                      <Input placeholder="Enter prescription hash e.g. 0x..." {...field} className="font-mono"/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={!isInitialized}>
                <Search className="mr-2" />
                Verify
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {foundPrescription === null && (
        <Card className="w-full max-w-2xl mx-auto border-destructive">
            <CardHeader className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                    <FileX className="h-8 w-8" />
                </div>
                <CardTitle className="mt-4 text-destructive">Invalid Prescription</CardTitle>
                <CardDescription>
                The hash you entered does not match any prescription in our records. Please check the hash and try again.
                </CardDescription>
            </CardHeader>
        </Card>
      )}

      {foundPrescription && (
        <Card className="w-full max-w-2xl mx-auto border-green-500">
            <CardHeader className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400">
                    <FileCheck className="h-8 w-8" />
                </div>
                <CardTitle className="mt-4 text-green-600 dark:text-green-400">Prescription Verified</CardTitle>
                <CardDescription>
                This prescription is authentic and recorded on {format(new Date(foundPrescription.createdAt), 'PPP')}.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-4">
                <InfoRow icon={CircleUser} label="Patient Name" value={foundPrescription.patientName} />
                <InfoRow icon={Stethoscope} label="Doctor" value={`${foundPrescription.doctorName} (${foundPrescription.doctorDetails})`} />
                <InfoRow icon={Pill} label="Medicine & Dosage" value={`${foundPrescription.medicineName} - ${foundPrescription.dosage}`} />
                <InfoRow icon={Text} label="Other Details" value={foundPrescription.otherDetails} />
            </CardContent>
        </Card>
      )}
    </div>
  );
}
