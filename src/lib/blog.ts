import { blogPosts } from '@/data/blog';
import { promises as fs } from 'node:fs';
import path from 'node:path';

export type BlogSlug = (typeof blogPosts)[number]['slug'];

export function isBlogSlug(value: string): value is BlogSlug {
  return blogPosts.some((post) => post.slug === value);
}

function getBlogPostFilePath(slug: BlogSlug) {
  return path.join(process.cwd(), 'src', 'app', 'blog', 'posts', `${slug}.mdx`);
}

export async function getBlogPostContent(slug: BlogSlug) {
  return fs.readFile(getBlogPostFilePath(slug), 'utf-8');
}

export function getBlogPostMeta(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
