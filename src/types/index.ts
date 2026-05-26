export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string[];
  current: boolean;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  major: string;
  period: string;
  description?: string;
}

export interface Skill {
  name: string;
  category: "finance" | "strategy" | "tool" | "legal" | "etc";
}

export interface NavLink {
  label: string;
  href: string;
}
