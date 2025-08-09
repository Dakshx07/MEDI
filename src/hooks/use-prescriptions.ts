'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Prescription } from '@/types';

const STORAGE_KEY = 'medichain_prescriptions';

export function usePrescriptions() {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const storedItems = window.localStorage.getItem(STORAGE_KEY);
        if (storedItems) {
          setPrescriptions(JSON.parse(storedItems));
        }
      } catch (error) {
        console.error('Failed to parse prescriptions from localStorage', error);
      }
      setIsInitialized(true);
    }
  }, []);

  const getPrescription = useCallback((id: string): Prescription | undefined => {
    return prescriptions.find(p => p.id === id);
  }, [prescriptions]);

  const addPrescription = useCallback((prescription: Prescription) => {
    const updatedPrescriptions = [prescription, ...prescriptions];
    setPrescriptions(updatedPrescriptions);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPrescriptions));
    } catch (error) {
      console.error('Failed to save prescriptions to localStorage', error);
    }
  }, [prescriptions]);

  return { prescriptions, getPrescription, addPrescription, isInitialized };
}
