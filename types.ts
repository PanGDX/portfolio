export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
  content: string; // Markdown content
}

export interface WorkExperience {
  id: number;
  year: string;
  title: string;
  company: string;
  active: boolean;
}

export interface BlogPost {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  content: string; // Markdown content
}

export enum SectionId {
  HERO = 'hero',
  ABOUT = 'about',
  PROJECTS = 'projects',
  SKILLS = 'skills',
  WORK = 'work',
  EDUCATION = 'education',
  BLOG = 'blog',
  CONTACT = 'contact',
}