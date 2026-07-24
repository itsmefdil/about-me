import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';
import { marked } from 'marked';

export interface SpeakerTalk {
  slug: string;
  title: string;
  event: string;
  date: string;
  location: string;
  poster?: string;
  slidesUrl?: string;
  videoUrl?: string;
  description: string;
  contentHtml: string;
}

export function getAllTalks(): SpeakerTalk[] {
  let speakersDir = path.resolve(process.cwd(), 'content', 'speakers');
  if (!fs.existsSync(speakersDir)) {
    speakersDir = path.resolve(process.cwd(), 'speakers');
  }

  if (!fs.existsSync(speakersDir)) {
    return [];
  }

  const files = fs.readdirSync(speakersDir).filter((file) => file.endsWith('.md'));

  const talks: SpeakerTalk[] = files.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const filePath = path.join(speakersDir, fileName);
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
      event: frontmatter.event || '',
      date: frontmatter.date || '',
      location: frontmatter.location || '',
      poster: frontmatter.poster || '',
      slidesUrl: frontmatter.slidesUrl || '',
      videoUrl: frontmatter.videoUrl || '',
      description: frontmatter.description || '',
      contentHtml,
    };
  });

  return talks.sort((a, b) => (new Date(b.date).getTime() || 0) - (new Date(a.date).getTime() || 0));
}

export function getTalkBySlug(slug: string): SpeakerTalk | undefined {
  const talks = getAllTalks();
  return talks.find((t) => t.slug === slug);
}
