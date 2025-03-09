export interface Experience {
  id?: number;
  title: string;
  description: string;
  startDate: string | null;
  endDate: string | null;
  currentlyWorking: boolean;
}

export interface Education {
  id?: number;
  school: string;
  degree: string;
  startDate: string | null;
  endDate: string | null;
  currentlyWorking: boolean;
  cgpa?: number | null;
}

export interface Project {
  id?: number;
  title: string;
  description: string;
  startDate: string | null;
  endDate: string | null;
  currentlyWorking: boolean;
  link: string;
  technologies: string;
}

export interface ResumeData {
  name: string;
  number?: string;
  linkedinUrl?: string;
  githubUrl?: string;
}

export interface AwardsData {
  title: string;
  description: string;
}

export interface CeritificatesData {
  title: string;
  description: string;
}

export interface Resume {
  id: number;
  skills: string[];
  awards: AwardsData[];
  certifications: CeritificatesData[];
  education: Education[];
  experience: Experience[];
  projects: Project[];
  createdAt: string;
  updatedAt: string;
}

export interface User {
  createdAt: string;
  email: string;
  id: number;
  isActive: boolean;
  linkedinUrl?: string;
  githubUrl?: string;
  number?: string;
  name: string;
  role: string;
  updatedAt: string;
}
