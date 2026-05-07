
import { CaseStudySection } from '@/features/caseStudy/casestudysection';
import { ecommerceCaseStudy } from '@/data/casestudydata';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

interface CaseStudyPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'caseStudy' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `/${locale}/case-study`,
    },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'caseStudy' });

  return <CaseStudySection data={ecommerceCaseStudy} />;
}
