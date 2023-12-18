import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

interface BlogPostFrontmatter {
  title: string;
  abstract: string;
  publishedOn: string;
}

interface BlogPost {
  data: BlogPostFrontmatter & { [key: string]: any };
  content: string;
}

export async function getBlogPostList() {
  const fileNames = await readDirectory('/content');

  const blogPosts = [];

  for (let fileName of fileNames) {
    const rawContent = await readFile(`/content/${fileName}`);

    // @ts-ignore gray-matter provides no way to pass known frontmatter properties to the generic
    const { data: frontmatter }: BlogPost = matter(rawContent);

    blogPosts.push({
      slug: fileName.replace('.mdx', ''),
      ...frontmatter,
    });
  }

  return blogPosts.sort((p1, p2) => (p1.publishedOn < p2.publishedOn ? 1 : -1));
}

export async function loadBlogPost(slug: string) {
  const rawContent = await readFile(`/content/${slug}.mdx`);

  const { data: frontmatter, content } = matter(rawContent);

  return { frontmatter, content };
}

function readFile(localPath: string) {
  return fs.readFile(path.join(process.cwd(), localPath), 'utf8');
}

function readDirectory(localPath: string) {
  return fs.readdir(path.join(process.cwd(), localPath));
}
