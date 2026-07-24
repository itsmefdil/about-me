import { getAllPosts } from '../utils/blogLoader';
import { getAllTalks } from '../utils/speakersLoader';
import { getAllProjects } from '../utils/projectsLoader';
import { getAllCommunityPosts } from '../utils/communityLoader';

export async function GET() {
  const siteUrl = 'https://fadilahriczky.web.id';

  const blogPosts = getAllPosts();
  const talks = getAllTalks();
  const projects = getAllProjects();
  const communities = getAllCommunityPosts();

  const staticPages = ['', 'blog', 'speakers', 'projects', 'community', 'contact'];

  const urls = [
    ...staticPages.map((page) => `${siteUrl}/${page ? `${page}` : ''}`),
    ...blogPosts.map((post) => `${siteUrl}/blog/${post.slug}`),
    ...talks.map((talk) => `${siteUrl}/speakers/${talk.slug}`),
    ...projects.map((project) => `${siteUrl}/projects/${project.slug}`),
    ...communities.map((comm) => `${siteUrl}/community/${comm.slug}`),
  ];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${url}</loc>
    <changefreq>weekly</changefreq>
    <priority>${url === `${siteUrl}/` || url === siteUrl ? '1.0' : '0.8'}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(sitemapXml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
