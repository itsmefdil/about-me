import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';
import { marked } from 'marked';

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  contentHtml: string;
  rawMarkdown: string;
}

export function getAllPosts(): BlogPost[] {
  let blogDir = path.resolve(process.cwd(), 'content', 'blog');
  if (!fs.existsSync(blogDir)) {
    blogDir = path.resolve(process.cwd(), 'blog');
  }

  if (!fs.existsSync(blogDir)) {
    return [];
  }

  const files = fs.readdirSync(blogDir).filter((file) => file.endsWith('.md'));

  const posts: BlogPost[] = files.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const filePath = path.join(blogDir, fileName);
    const fileContent = fs.readFileSync(filePath, 'utf8');

    // Parse frontmatter
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
      date: frontmatter.date || '',
      author: frontmatter.author || 'Fadilah Riczky',
      tags: frontmatter.tags || [],
      contentHtml,
      rawMarkdown: markdownBody,
    };
  });

  // Sort posts by date descending
  return posts.sort((a, b) => (new Date(b.date).getTime() || 0) - (new Date(a.date).getTime() || 0));
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const posts = getAllPosts();
  return posts.find((p) => p.slug === slug);
}
