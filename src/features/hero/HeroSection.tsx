'use client';

import Image from 'next/image';
import { heroContent } from '@/data/hero';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { TrackedButton } from '@/components/ui/TrackedButton';
import { useTranslations } from 'next-intl';

export function HeroSection() {
  const t = useTranslations();

  return (
    <Section id="home" className="section-divider">
      <Container>
        <div className="grid items-center gap-[var(--space-10)] md:grid-cols-2">
          <div>
            <p className="mb-[var(--space-4)] text-[length:var(--text-sm)] font-medium uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
              {t('hero.eyebrow')}
            </p>
            <h1 className="text-balance text-[length:var(--text-3xl)] font-semibold leading-tight md:text-[length:var(--text-4xl)] lg:text-[length:var(--text-5xl)]">{t('hero.title')}</h1>
            <p className="mt-[var(--space-6)] max-w-xl text-[length:var(--text-lg)] text-[var(--color-text-muted)]">{t('hero.subtitle')}</p>
            <p className="mt-[var(--space-4)] text-[length:var(--text-sm)] font-medium text-[var(--color-primary)]">{t('hero.trustSignal')}</p>
            
            {/* Stats Row */}
            <div className="mt-[var(--space-8)] flex gap-[var(--space-8)] text-[length:var(--text-sm)] text-[var(--color-text-muted)]">
              <span><strong className="text-[var(--color-text)]">20+</strong> {t('hero.stats.projects')}</span>
              <span><strong className="text-[var(--color-text)]">15+</strong> {t('hero.stats.clients')}</span>
              <span><strong className="text-[var(--color-text)]">5+</strong> {t('hero.stats.years')}</span>
            </div>

            <div className="mt-[var(--space-8)]">
              <TrackedButton
                href={heroContent.primaryCta.href}
                eventName="hero_primary_cta_click"
                eventPayload={{ cta: t('actions.startProject'), location: 'hero' }}
              >
                {t('actions.startProject')}
              </TrackedButton>
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <div className="h-[var(--size-avatar-mobile)] w-[var(--size-avatar-mobile)] md:h-[var(--size-avatar-desktop)] md:w-[var(--size-avatar-desktop)]">
              <Image
                src={heroContent.avatar.src}
                alt={heroContent.avatar.alt}
                width={512}
                height={512}
                priority
                sizes="(max-width: 768px) 100vw, 400px"
                className="rounded-full ring-2 ring-[var(--color-primary)]/20 shadow-[var(--shadow-md)] object-cover"
                style={{ width: '100%', height: '100%' }}
              />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
