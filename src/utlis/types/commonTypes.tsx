export interface Experience {
  title: string;
  description: string;
  startDate: string | null;
  endDate: string | null;
  currentlyWorking: boolean;
}

export interface Education {
  school: string;
  degree: string;
  startDate: string | null;
  endDate: string | null;
  currentlyWorking: boolean;
  cgpa?: number;
}

export interface Project {
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
