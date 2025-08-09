'use server';

/**
 * @fileOverview This file defines a Genkit flow for extracting data from prescription images.
 *
 * - extractPrescriptionData - A function that handles the prescription data extraction process.
 * - ExtractPrescriptionDataInput - The input type for the extractPrescriptionData function.
 * - ExtractPrescriptionDataOutput - The return type for the extractPrescriptionData function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExtractPrescriptionDataInputSchema = z.object({
  prescriptionImage: z
    .string()
    .describe(
      'A photo of a prescription, as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' // as a data URI
    ),
});
export type ExtractPrescriptionDataInput = z.infer<typeof ExtractPrescriptionDataInputSchema>;

const ExtractPrescriptionDataOutputSchema = z.object({
  medicineName: z.string().describe('The name of the prescribed medicine.'),
  dosage: z.string().describe('The dosage of the medicine.'),
  doctorName: z.string().describe('The name of the prescribing doctor.'),
  doctorDetails: z.string().describe('Additional details about the doctor, such as clinic or contact information.'),
  patientName: z.string().describe('The name of the patient.'),
  otherDetails: z.string().optional().describe('Other relevant details from the prescription.'),
});
export type ExtractPrescriptionDataOutput = z.infer<typeof ExtractPrescriptionDataOutputSchema>;

export async function extractPrescriptionData(input: ExtractPrescriptionDataInput): Promise<ExtractPrescriptionDataOutput> {
  return extractPrescriptionDataFlow(input);
}

const prompt = ai.definePrompt({
  name: 'extractPrescriptionDataPrompt',
  input: {schema: ExtractPrescriptionDataInputSchema},
  output: {schema: ExtractPrescriptionDataOutputSchema},
  prompt: `You are an AI assistant that extracts information from prescription images.  You must extract the following fields:

Medicine Name: The name of the medicine prescribed.
Dosage: The dosage of the medicine.
Doctor Name: The name of the doctor who prescribed the medicine.
Doctor Details: Additional details about the doctor, such as clinic or contact information.
Patient Name: The name of the patient.
Other Details: any other details that are relevant to the prescription.

Here is the prescription image:

{{media url=prescriptionImage}}

Please extract the information and return it in JSON format. If a field cannot be extracted, return an empty string for that field.`, // added more instructions
});

const extractPrescriptionDataFlow = ai.defineFlow(
  {
    name: 'extractPrescriptionDataFlow',
    inputSchema: ExtractPrescriptionDataInputSchema,
    outputSchema: ExtractPrescriptionDataOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
