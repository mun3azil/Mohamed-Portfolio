'use client';

import Image from 'next/image';
import { projects } from '@/data/projects';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Heading } from '@/components/ui/Heading';
import { Card } from '@/components/ui/Card';
import { TrackedButton } from '@/components/ui/TrackedButton';
import { TrackedLink } from '@/components/ui/TrackedLink';
import { useTranslations } from 'next-intl';

export function ProjectsSection() {
  const t = useTranslations();
  const featuredFirst = [...projects].sort((a, b) => Number(b.featured) - Number(a.featured));

  return (
    <Section id="projects" className="section-divider">
      <Container>
        <Heading
          title={t('projects.title')}
          subtitle={t('projects.subtitle')}
          align="center"
          className="mb-[var(--space-10)]"
        />

        <div className="grid gap-[var(--space-6)] md:grid-cols-2 lg:grid-cols-3">
          {featuredFirst.map((project) => (
            <Card key={project.slug} className="flex h-full flex-col gap-[var(--space-4)] transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
              <div className="relative h-[var(--size-project-thumb)] overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-strong)]">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>

              <div>
                <h3 className="text-[length:var(--text-lg)] font-semibold">{project.title}</h3>
                <p className="mt-[var(--space-2)] text-[length:var(--text-sm)] text-[var(--color-text-muted)]">{project.summary}</p>
              </div>

              <ul className="flex flex-wrap gap-[var(--space-2)]">
                {project.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface-strong)] px-[var(--space-3)] py-[var(--space-1)] text-[length:var(--text-xs)] text-[var(--color-text)]"
                  >
                    {tag}
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex flex-col gap-[var(--space-2)]">
                <TrackedLink
                  href={`/projects/${project.slug}`}
                  eventName="project_case_study_click"
                  eventPayload={{ slug: project.slug, location: 'projects_grid' }}
                  className="inline-flex items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-primary)] px-[var(--space-6)] py-[var(--space-3)] text-[length:var(--text-sm)] font-medium text-white transition-colors hover:bg-[var(--color-primary-strong)]"
                >
                  {t('actions.viewCaseStudy')}
                </TrackedLink>

                <TrackedButton
                  href={project.links.live}
                  variant="secondary"
                  className="w-full text-center"
                  eventName="project_live_click"
                  eventPayload={{ slug: project.slug }}
                >
                  {t('actions.live')}
                </TrackedButton>
                <TrackedButton
                  href={project.links.source}
                  variant="secondary"
                  className="w-full text-center"
                  eventName="project_source_click"
                  eventPayload={{ slug: project.slug }}
                >
                  {t('actions.code')}
                </TrackedButton>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
