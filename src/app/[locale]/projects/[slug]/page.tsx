import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { getProjectBySlug, projects } from '@/data/projects';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { TrackedButton } from '@/components/ui/TrackedButton';
import { locales } from '@/lib/i18n';

type ProjectCaseStudyPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  return locales.flatMap((locale) => projects.map((project) => ({ locale, slug: project.slug })));
}

export async function generateMetadata({ params }: ProjectCaseStudyPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: 'projects' });
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: t('notFoundTitle'),
    };
  }

  return {
    title: `${project.title} ${t('caseStudySuffix')}`,
    description: project.summary,
    alternates: {
      canonical: `/${locale}/projects/${project.slug}`,
    },
  };
}

export default async function ProjectCaseStudyPage({ params }: ProjectCaseStudyPageProps) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: 'projects' });
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <Section>
      <Container className="max-w-4xl">
        <header className="mb-[var(--space-10)]">
          <p className="text-[length:var(--text-sm)] font-medium text-[var(--color-primary)]">{t('caseStudyEyebrow')}</p>
          <h1 className="mt-[var(--space-2)] text-balance text-[length:var(--text-4xl)] font-semibold tracking-tight">{project.title}</h1>
          <p className="mt-[var(--space-4)] text-[length:var(--text-lg)] text-[var(--color-text-muted)]">{project.summary}</p>
        </header>

        <div className="grid gap-[var(--space-6)]">
          <Card>
            <h2 className="text-[length:var(--text-2xl)] font-semibold">{project.caseStudy.problem.title}</h2>
            <p className="mt-[var(--space-3)] text-[var(--color-text-muted)]">{project.caseStudy.problem.body}</p>
          </Card>

          <Card>
            <h2 className="text-[length:var(--text-2xl)] font-semibold">{project.caseStudy.solution.title}</h2>
            <p className="mt-[var(--space-3)] text-[var(--color-text-muted)]">{project.caseStudy.solution.body}</p>
          </Card>

          <Card>
            <h2 className="text-[length:var(--text-2xl)] font-semibold">{t('techDecisions')}</h2>
            <ul className="mt-[var(--space-4)] list-disc space-y-[var(--space-2)] pl-[var(--space-6)] text-[var(--color-text-muted)]">
              {project.caseStudy.techDecisions.map((decision) => (
                <li key={decision}>{decision}</li>
              ))}
            </ul>
          </Card>

          <Card>
            <h2 className="text-[length:var(--text-2xl)] font-semibold">{t('measurableOutcome')}</h2>
            <ul className="mt-[var(--space-4)] list-disc space-y-[var(--space-2)] pl-[var(--space-6)] text-[var(--color-text-muted)]">
              {project.caseStudy.measurableOutcome.map((outcome) => (
                <li key={outcome}>{outcome}</li>
              ))}
            </ul>
          </Card>
        </div>

        <div className="mt-[var(--space-10)] flex flex-col gap-[var(--space-3)] sm:flex-row">
          <TrackedButton
            href="#contact"
            eventName="case_study_primary_cta_click"
            eventPayload={{ slug: project.slug, cta: t('startProject') }}
          >
            {t('startProject')}
          </TrackedButton>
          <TrackedButton
            href={project.links.live}
            variant="secondary"
            eventName="case_study_live_click"
            eventPayload={{ slug: project.slug }}
          >
            {t('viewLiveProject')}
          </TrackedButton>
        </div>
      </Container>
    </Section>
  );
}