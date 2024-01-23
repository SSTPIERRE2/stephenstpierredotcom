import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

interface BlogPostFrontmatter {
  title: string;
  abstract: string;
  tags: string[];
  publishedOn?: string;
  isPublished?: boolean;
}

interface BlogPostData {
  data: BlogPostFrontmatter;
  content: string;
}

export interface BlogPost extends BlogPostFrontmatter {
  slug: string;
  content: string;
}

export async function getBlogPosts(path?: string): Promise<BlogPost[]> {
  const directory = path || './content';
  const fileNames = await readDirectory(directory);
  console.log(`got some fileNames`, fileNames);

  const blogPosts = [];

  for (let fileName of fileNames.filter((f) => f !== '.DS_Store')) {
    const rawContent = await readFile(`${directory}/${fileName}`);

    // @ts-ignore gray-matter provides no way to pass known frontmatter properties to the generic
    const { data: frontmatter, content }: BlogPostData = matter(rawContent);

    blogPosts.push({
      slug: fileName.replace('.mdx', ''),
      content,
      ...frontmatter,
    });
  }

  return blogPosts;
}

export async function loadBlogPost(slug: string) {
  const rawContent = await fs.readFile(`./content/${slug}.mdx`, 'utf8');

  const { data: frontmatter, content } = matter(rawContent);

  return { frontmatter, content };
}

export const slugify = (str = '') =>
  str
    .toLowerCase()
    .replace(/\s/g, '-')
    .replace(/[^a-zA-Z0-9-]/g, '');

function readFile(localPath: string) {
  return fs.readFile(path.join(process.cwd(), localPath), 'utf8');
}

function readDirectory(localPath: string) {
  return fs.readdir(path.join(process.cwd(), localPath));
}
