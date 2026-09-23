export interface ProfileData {
  name: string;
  fullName: string;
  role: string;
  titles: string[];
  experienceYears: string;
  projectsCount: string;
  location: string;
  phone: string;
  education: string;
  educationPeriod: string;
  language: string;
  bio: string;
  shortIntro: string;
  email: string;
  github: string;
  linkedin: string;
  upwork?: string;
  cvUrl: string;
}

export interface StatItem {
  value: string;
  label: string;
  description: string;
  iconName: string;
}

export interface JourneyMilestone {
  year: string;
  title: string;
  role: string;
  description: string;
  technologies: string[];
  color: string;
  glowColor: string;
  planetType: 'rocky' | 'gas' | 'ring' | 'crystal';
}

export interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  period: string;
  location: string;
  type: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
  featured?: boolean;
}

export interface SkillItem {
  name: string;
  level: number; // 1-100
  levelLabel: string;
  category: 'core' | 'framework' | 'language' | 'styling' | 'tool' | 'cms';
  orbitRadius: number;
  orbitSpeed: number;
  color: string;
  emblem: string;
  description?: string;
  isMain?: boolean;
}

export interface ProjectItem {
  id: string;
  missionNumber: string;
  title: string;
  tagline: string;
  description: string;
  technologies: string[];
  category: 'Webflow' | 'Next.js & React' | 'Fullstack' | '3D & Creative';
  role: string;
  liveUrl?: string;
  githubUrl?: string;
  stars?: number;
  status: 'ONLINE' | 'ACTIVE' | 'LAUNCHED';
  accentColor: string;
  previewImage?: string;
  duration?: string;
  teamSize?: string;
  displayDomain?: string;
  highlights: string[];
}

export interface AiToolItem {
  id: string;
  name: string;
  tagline: string;
  purpose: string;
  capabilities: string[];
  badgeColor: string;
  glowColor: string;
}
