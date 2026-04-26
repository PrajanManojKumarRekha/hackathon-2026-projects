export type Role = "patient" | "doctor";

export interface User {
  id: string;
  name: string;
  role: Role;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  lat: number;
  lng: number;
  rating: number;
  reviewCount: number;
  reviewSource: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  patientName: string;
  doctorName: string;
  time: string;
  status: "upcoming" | "completed";
}

export interface IntakePayload {
  symptoms: string;
  allergies: string;
  medications: string;
  medicalHistory: string;
}

export interface SoapNote {
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
  approved: boolean;
}

const specialtyByKeyword: Record<string, string> = {
  chest: "Cardiology",
  heart: "Cardiology",
  rash: "Dermatology",
  skin: "Dermatology",
  headache: "Neurology",
  migraine: "Neurology",
};

const doctorsData: Doctor[] = [
  {
    id: "1",
    name: "Dr. Smith",
    specialty: "Cardiology",
    lat: 30.2672,
    lng: -97.7431,
    rating: 4.8,
    reviewCount: 178,
    reviewSource: "HealthGrades",
  },
  {
    id: "2",
    name: "Dr. Lee",
    specialty: "Dermatology",
    lat: 30.27,
    lng: -97.74,
    rating: 4.6,
    reviewCount: 121,
    reviewSource: "Google Reviews",
  },
];

const appointmentsData: Appointment[] = [
  {
    id: "1",
    patientId: "1",
    doctorId: "1",
    patientName: "John Patient",
    doctorName: "Dr. Smith",
    time: "10:00 AM",
    status: "upcoming",
  },
  {
    id: "2",
    patientId: "1",
    doctorId: "2",
    patientName: "John Patient",
    doctorName: "Dr. Lee",
    time: "2:00 PM",
    status: "completed",
  },
];

export const mockApi = {
  login: async (role: Role): Promise<{ token: string; user: User }> => ({
    token: JSON.stringify({ role }),
    user: { id: "1", name: role === "patient" ? "John Patient" : "Dr. Smith", role },
  }),
  register: async (
    role: Role,
    payload: { name: string; email: string },
  ): Promise<{ token: string; user: User }> => {
    void payload.email;
    return { token: JSON.stringify({ role }), user: { id: "1", name: payload.name, role } };
  },
  getDoctorsSync: (): Doctor[] => doctorsData,
  getDoctors: async (): Promise<Doctor[]> => doctorsData,
  getDoctorById: async (doctorId: string): Promise<Doctor | null> => {
    const doctors = await mockApi.getDoctors();
    return doctors.find((doctor) => doctor.id === doctorId) ?? null;
  },
  getAppointmentsSync: (): Appointment[] => appointmentsData,
  getAppointments: async (): Promise<Appointment[]> => appointmentsData,
  suggestSpecialty: async (symptoms: string): Promise<string> => {
    const normalized = symptoms.toLowerCase();
    const match = Object.entries(specialtyByKeyword).find(([keyword]) =>
      normalized.includes(keyword),
    );
    return match?.[1] ?? "General Medicine";
  },
  getAvailableSlots: async (doctorId: string): Promise<string[]> => {
    void doctorId;
    return ["9:00 AM", "10:00 AM", "2:00 PM", "4:00 PM"];
  },
  submitIntake: async (
    appointmentId: string,
    payload: IntakePayload,
  ): Promise<{ appointmentId: string; success: boolean }> => {
    void payload;
    return { appointmentId, success: true };
  },
  getIntakeByAppointment: async (
    appointmentId: string,
  ): Promise<IntakePayload & { appointmentId: string }> => ({
    appointmentId,
    symptoms: "Chest tightness and shortness of breath during exercise",
    allergies: "Penicillin",
    medications: "Lisinopril 10mg daily",
    medicalHistory: "Hypertension, diagnosed 2021",
  }),
  generateSoap: async (appointmentId: string): Promise<SoapNote> => {
    void appointmentId;
    return {
      subjective: "Patient reports intermittent chest pressure for 3 days.",
      objective: "No acute distress. Vitals stable.",
      assessment: "Likely stable angina; rule out ACS.",
      plan: "Order ECG, troponin, and cardiology follow-up.",
      approved: false,
    };
  },
  approveSoap: async (
    appointmentId: string,
    soap: Omit<SoapNote, "approved">,
  ): Promise<{ appointmentId: string; approved: boolean; fhirStatus: string }> => {
    void soap;
    return { appointmentId, approved: true, fhirStatus: "FHIR conversion complete" };
  },
};
