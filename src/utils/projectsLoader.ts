import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';
import { marked } from 'marked';

export interface ProjectItem {
  slug: string;
  title: string;
  description: string;
  period?: string;
  tech: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  contentHtml: string;
}

export function getAllProjects(): ProjectItem[] {
  let dir = path.resolve(process.cwd(), 'content', 'projects');
  if (!fs.existsSync(dir)) {
    dir = path.resolve(process.cwd(), 'projects');
  }

  if (!fs.existsSync(dir)) {
    return [];
  }

  const files = fs.readdirSync(dir).filter((file) => file.endsWith('.md'));

  return files.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const filePath = path.join(dir, fileName);
    const fileContent = fs.readFileSync(filePath, 'utf8');

    let frontmatter: any = {};
    let markdownBody = fileContent;

    if (fileContent.startsWith('---')) {
      const parts = fileContent.split('---');
      if (parts.length >= 3) {
        frontmatter = yaml.load(parts[1]) || {};
        markdownBody = parts.slice(2).join('---').trim();
      }
    }

    const contentHtml = marked.parse(markdownBody) as string;

    return {
      slug,
      title: frontmatter.title || slug,
      description: frontmatter.description || '',
      period: frontmatter.period || '',
      tech: frontmatter.tech || [],
      githubUrl: frontmatter.githubUrl || '',
      liveUrl: frontmatter.liveUrl || '',
      featured: frontmatter.featured || false,
      contentHtml,
    };
  });
}

export function getProjectBySlug(slug: string): ProjectItem | undefined {
  const projects = getAllProjects();
  return projects.find((p) => p.slug === slug);
}
