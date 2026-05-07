
import nextDynamic from 'next/dynamic';
import { HeroSection } from '@/features/hero/HeroSection';

export const dynamic = 'force-static';

export function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'ar' },
  ];
}

const ProjectsSection = nextDynamic(() => import('@/features/projects/ProjectsSection').then((mod) => mod.ProjectsSection));
const SkillsSection = nextDynamic(() => import('@/features/skills/SkillsSection').then((mod) => mod.SkillsSection));
const AboutSection = nextDynamic(() => import('@/features/about/AboutSection').then((mod) => mod.AboutSection));
const ContactSection = nextDynamic(() => import('@/features/contact/ContactSection').then((mod) => mod.ContactSection));

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <ProjectsSection />
      <SkillsSection />
      <AboutSection />
      <ContactSection />
    </main>
  );
}
