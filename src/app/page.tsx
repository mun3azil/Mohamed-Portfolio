import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import BlogPreview from '@/components/sections/BlogPreview';
import Contact from '@/components/sections/Contact';
import Testimonials from '@/components/Testimonials/Testimonials';

export const metadata: Metadata = {
  title: 'الصفحة الرئيسية | محمد',
  description: 'مرحباً بكم في موقع محمد الشخصي. مطور ويب محترف متخصص في تطوير المواقع الإلكترونية وتصميم واجهات المستخدم.',
};

export default async function HomePage() {
  const t = await getTranslations('common');

  return (
    <main>
      <Hero 
        title={t('heroTitle')}
        description={t('heroDescription')}
      />
      <div data-aos="fade-up">
        <Services />
      </div>
      <div data-aos="fade-up">
        <Skills />
      </div>
      <div data-aos="fade-up">
        <Projects />
      </div>
      <div data-aos="fade-up">
        <Testimonials />
      </div>
      <div data-aos="fade-up">
        <BlogPreview />
      </div>
      <div data-aos="fade-up">
        <Contact />
      </div>
    </main>
  );
}
