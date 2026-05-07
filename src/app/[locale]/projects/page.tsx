import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { projects } from '@/data/projects';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { TrackedLink } from '@/components/ui/TrackedLink';
import { locales } from '@/lib/i18n';

type ProjectsPageProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: ProjectsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'projects' });

  return {
    title: t('title'),
    description: t('subtitle'),
    alternates: {
      canonical: `/${locale}/projects`,
    },
  };
}

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'projects' });

  return (
    <Section>
      <Container>
        <header className="mb-[var(--space-10)] text-center">
          <p className="text-[length:var(--text-sm)] font-medium text-[var(--color-primary)]">{t('eyebrow')}</p>
          <h1 className="mt-[var(--space-2)] text-[length:var(--text-4xl)] font-semibold tracking-tight">{t('title')}</h1>
          <p className="mt-[var(--space-4)] text-[var(--color-text-muted)]">{t('subtitle')}</p>
        </header>

        <div className="grid gap-[var(--space-6)] md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card key={project.slug} className="flex h-full flex-col gap-[var(--space-4)]">
              <div>
                <h2 className="text-[length:var(--text-lg)] font-semibold">{project.title}</h2>
                <p className="mt-[var(--space-2)] text-[length:var(--text-sm)] text-[var(--color-text-muted)]">{project.summary}</p>
              </div>

              <TrackedLink
                href={`/projects/${project.slug}`}
                eventName="project_case_study_click"
                eventPayload={{ slug: project.slug, location: 'projects_page' }}
                className="mt-auto inline-flex items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-primary)] px-[var(--space-6)] py-[var(--space-3)] text-[length:var(--text-sm)] font-medium text-white transition-colors hover:bg-[var(--color-primary-strong)]"
              >
                {t('viewProject')}
              </TrackedLink>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}