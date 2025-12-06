export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  date?: string; // Add optional date property
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



export interface FrontMatter {
  title: string;
  date: string;
  author: string;
  image: string;
  categories: string[];
  slug: string;
}

export interface BlogPostData {
  attributes: FrontMatter;
  body: string;
}

export interface ParsedPost extends FrontMatter {
  content: string;
}


export interface ArticleMetadata {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  tags: string[];
  coverImage?: string;
  readTime?: string;
}

export interface Article {
  metadata: ArticleMetadata;
  content: string;
}

export interface ParsedMarkdown {
  metadata: Record<string, any>;
  content: string;
}