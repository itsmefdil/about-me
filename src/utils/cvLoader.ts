import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

export interface Personal {
  name: string;
  title: string;
  location: string;
  email: string;
  phone?: string;
  socials: {
    github: string;
    linkedin: string;
  };
}

export interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  period: string;
  type: string;
  description?: string;
  responsibilities: string[];
}

export interface Skills {
  languages: string[];
  cloud: string[];
  containerization: string[];
  programming: string[];
  infrastructure_as_code: string[];
  ci_cd: string[];
  observability: string[];
  security: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  period: string;
  gpa: string;
}

export interface CommunityItem {
  community: string;
  role: string;
  website: string;
  period: string;
  location?: string;
  responsibilities: string[];
}

export interface CvData {
  personal: Personal;
  summary: string;
  experience: ExperienceItem[];
  skills: Skills;
  education: EducationItem[];
  community: CommunityItem[];
}

export function getCvData(): CvData {
  let dataDir = path.resolve(process.cwd(), 'content', 'data');
  if (!fs.existsSync(dataDir)) {
    dataDir = path.resolve(process.cwd(), 'data');
  }

  if (fs.existsSync(dataDir)) {
    const personal = yaml.load(fs.readFileSync(path.join(dataDir, 'personal.yaml'), 'utf8')) as Personal;
    const summaryData = yaml.load(fs.readFileSync(path.join(dataDir, 'summary.yaml'), 'utf8')) as { summary: string } | string;
    const summary = typeof summaryData === 'string' ? summaryData : summaryData.summary;
    const experience = yaml.load(fs.readFileSync(path.join(dataDir, 'experience.yaml'), 'utf8')) as ExperienceItem[];
    const skills = yaml.load(fs.readFileSync(path.join(dataDir, 'skills.yaml'), 'utf8')) as Skills;
    const education = yaml.load(fs.readFileSync(path.join(dataDir, 'education.yaml'), 'utf8')) as EducationItem[];
    const communityPath = path.join(dataDir, 'community.yaml');
    const community = fs.existsSync(communityPath)
      ? (yaml.load(fs.readFileSync(communityPath, 'utf8')) as CommunityItem[])
      : [];

    return {
      personal,
      summary,
      experience,
      skills,
      education,
      community,
    };
  }

  // Fallback to single cv.yaml if data directory doesn't exist
  const yamlPath = path.resolve(process.cwd(), 'cv.yaml');
  const fileContents = fs.readFileSync(yamlPath, 'utf8');
  const loaded = yaml.load(fileContents) as any;
  return {
    ...loaded,
    community: loaded.community || [],
  };
}
