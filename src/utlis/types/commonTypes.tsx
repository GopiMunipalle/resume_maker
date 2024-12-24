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
  cgpa?: number;
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
  email: string;
  number?: string;
  linkedIn?: string;
  gitbuLink?: string;
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
