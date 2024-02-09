import fs from 'fs/promises';
import path from 'path';
import matter, { GrayMatterFile } from 'gray-matter';

interface BlogPostFrontmatter {
  title: string;
  abstract: string;
  tags: string[];
  publishedOn?: string;
  isPublished?: boolean;
}

interface BlogPostData<I extends matter.Input> extends GrayMatterFile<I> {
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

  for (const fileName of fileNames.filter((f) => f !== '.DS_Store' && f !== 'images')) {
    const rawContent = await readFile(`${directory}/${fileName}`);

    const { data: frontmatter, content } = matter(
      rawContent
    ) as BlogPostData<string>;

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
