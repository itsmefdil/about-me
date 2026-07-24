import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';
import { marked } from 'marked';

export interface CommunityPost {
  slug: string;
  community: string;
  role: string;
  website?: string;
  period?: string;
  location?: string;
  logo?: string;
  responsibilities?: string[];
  contentHtml: string;
}

export function getAllCommunityPosts(): CommunityPost[] {
  let dir = path.resolve(process.cwd(), 'content', 'community');
  if (!fs.existsSync(dir)) {
    dir = path.resolve(process.cwd(), 'community');
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
      community: frontmatter.community || slug,
      role: frontmatter.role || '',
      website: frontmatter.website || '',
      period: frontmatter.period || '',
      location: frontmatter.location || '',
      logo: frontmatter.logo || '',
      responsibilities: frontmatter.responsibilities || [],
      contentHtml,
    };
  });
}

export function getCommunityPostBySlug(slug: string): CommunityPost | undefined {
  const posts = getAllCommunityPosts();
  return posts.find((p) => p.slug === slug);
}
