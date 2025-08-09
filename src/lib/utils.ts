import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// A simple hash function for demonstration.
// In a real application, use a robust cryptographic hash function like SHA-256.
export const generateHash = (data: object): string => {
  const str = JSON.stringify(data);
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  // Convert to a more "hash-like" hex string
  return '0x' + Math.abs(hash).toString(16).padStart(8, '0') + Math.abs(Math.floor(Math.random() * 0xffffffff)).toString(16).padStart(8, '0');
};
