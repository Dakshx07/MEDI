'use server';

import { extractPrescriptionData } from '@/ai/flows/extract-prescription-data';
import type { ExtractPrescriptionDataOutput } from '@/ai/flows/extract-prescription-data';

export async function extractDataAction(
  imageDataUri: string
): Promise<ExtractPrescriptionDataOutput | { error: string }> {
  try {
    const result = await extractPrescriptionData({ prescriptionImage: imageDataUri });
    return result;
  } catch (e) {
    console.error(e);
    // This is a simplified error message. In a real app, you might want to log this
    // and provide a more user-friendly error.
    return { error: 'Failed to extract data from the prescription. The image might be unclear or not a valid prescription.' };
  }
}
