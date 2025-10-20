export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  period: string;
  description: string;
  details: string[];
  technologies: string[];
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  location: string;
  period: string;
  description?: string;
}

export interface CVData {
  personalInfo: {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    linkedin?: string;
    github?: string;
    website?: string;
  };
  summary: string;
  experiences: Experience[];
  education: Education[];
  skills: {
    category: string;
    items: string[];
  }[];
}
