import type { Metadata } from 'next';
import { blogPosts } from '@/data/blog';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';
import { Card } from '@/components/ui/Card';
import { buildBlogIndexMetadata } from '@/lib/seo';
import { TrackedLink } from '@/components/ui/TrackedLink';
import { TrackedButton } from '@/components/ui/TrackedButton';

export const metadata: Metadata = buildBlogIndexMetadata();

export default function BlogIndexPage() {
  return (
    <Section>
      <Container>
        <Heading
          title="Blog"
          subtitle="Architecture, performance, and UX notes from real frontend implementation work."
          className="mb-[var(--space-10)]"
        />

        <div className="grid gap-[var(--space-5)] md:grid-cols-2">
          {blogPosts.map((post) => (
            <Card key={post.slug} className="h-full">
              <p className="text-[length:var(--text-sm)] text-[var(--color-text-muted)]">{post.date}</p>
              <h2 className="mt-[var(--space-2)] text-[length:var(--text-xl)] font-semibold tracking-tight">{post.title}</h2>
              <p className="mt-[var(--space-3)] text-[var(--color-text-muted)]">{post.description}</p>

              <div className="mt-[var(--space-4)] flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-[var(--space-3)] py-[var(--space-1)] text-[length:var(--text-xs)] text-[var(--color-text-muted)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <TrackedLink
                href={`/blog/${post.slug}`}
                eventName="blog_article_click"
                eventPayload={{ slug: post.slug, location: 'blog_index' }}
                className="mt-[var(--space-6)] inline-flex text-[length:var(--text-sm)] font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-strong)]"
              >
                Read article →
              </TrackedLink>
            </Card>
          ))}
        </div>

        <div className="mt-[var(--space-10)] flex justify-center">
          <TrackedButton
            href="/#contact"
            eventName="blog_index_primary_cta_click"
            eventPayload={{ cta: 'Start a Project' }}
          >
            Start a Project
          </TrackedButton>
        </div>
      </Container>
    </Section>
  );
}
