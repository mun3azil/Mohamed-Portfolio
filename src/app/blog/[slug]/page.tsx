import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Markdown from 'react-markdown';
import { blogPosts } from '@/data/blog';
import { isBlogSlug, getBlogPostContent } from '@/lib/blog';
import { buildBlogPostMetadata } from '@/lib/seo';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { BlogConversionCta } from '@/features/blog/BlogConversionCta';
import { BlogEngagementTracker } from '@/features/blog/BlogEngagementTracker';

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  return buildBlogPostMetadata(slug);
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  if (!isBlogSlug(slug)) {
    notFound();
  }

  const meta = blogPosts.find((post) => post.slug === slug);

  if (!meta) {
    notFound();
  }

  const markdownContent = await getBlogPostContent(slug);

  return (
    <Section>
      <Container className="max-w-3xl">
        <BlogEngagementTracker slug={slug} />

        <header className="mb-[var(--space-10)]">
          <p className="text-[length:var(--text-sm)] text-[var(--color-text-muted)]">{meta.date}</p>
          <h1 className="mt-[var(--space-2)] text-balance text-[length:var(--text-4xl)] font-semibold tracking-tight">
            {meta.title}
          </h1>
          <p className="mt-[var(--space-4)] text-[length:var(--text-lg)] text-[var(--color-text-muted)]">{meta.description}</p>
        </header>

        <article className="prose prose-slate max-w-none dark:prose-invert">
          <Markdown>{markdownContent}</Markdown>
        </article>

        <BlogConversionCta slug={slug} placement="mid" />
        <BlogConversionCta slug={slug} placement="end" />
      </Container>
    </Section>
  );
}
