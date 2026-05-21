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

export interface Skill {
  name: string;
  category: "frontend" | "backend" | "design" | "tool" | "etc";
}

export interface NavLink {
  label: string;
  href: string;
}
