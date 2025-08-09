export type Doctor = {
  id: string;
  name: string;
  hospital: string;
};

export type Prescription = {
  id: string; // This will be the hash
  medicineName: string;
  dosage: string;
  doctorName: string;
  doctorDetails: string;
  patientName: string;
  otherDetails?: string;
  createdAt: string; // ISO date string
};
