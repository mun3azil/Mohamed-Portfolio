import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { headers } from 'next/headers';

// Import enhanced components
import EnhancedAboutHero from '@/components/about/EnhancedAboutHero';
import EnhancedSkillsSection from '@/components/about/EnhancedSkillsSection';
import EnhancedExperienceSection from '@/components/about/EnhancedExperienceSection';
import EnhancedInterestsSection from '@/components/about/EnhancedInterestsSection';
import FunFactsSection from '@/components/about/FunFactsSection';
import EnhancedCallToAction from '@/components/about/EnhancedCallToAction';
import EnhancedScrollToTopButton from '@/components/about/EnhancedScrollToTopButton';
import CustomCursor from '@/components/about/CustomCursor';

// Generate dynamic metadata based on locale
export async function generateMetadata(): Promise<Metadata> {
  const headersList = headers();
  const pathname = headersList.get('x-pathname') || '';
  const currentLang = pathname.split('/')[1] === 'en' ? 'en' : 'ar';

  if (currentLang === 'en') {
    return {
      title: 'About Me | Mohammed',
      description: 'Learn about Mohammed, a professional web developer with expertise in website development and user interface design.',
      keywords: ['about me', 'web development', 'UI design', 'SEO', 'Mohammed'],
      alternates: {
        canonical: 'https://mohammed-portfolio.com/en/about',
        languages: {
          'ar': 'https://mohammed-portfolio.com/about',
          'en': 'https://mohammed-portfolio.com/en/about',
        },
      },
      openGraph: {
        title: 'About Me | Mohammed - Web Developer',
        description: 'Learn about Mohammed, a professional web developer with expertise in website development and user interface design.',
        url: 'https://mohammed-portfolio.com/en/about',
        siteName: 'Mohammed Portfolio',
        locale: 'en_US',
        type: 'website',
        images: [
          {
            url: 'https://mohammed-portfolio.com/assets/about-og.jpg',
            width: 1200,
            height: 630,
            alt: 'Mohammed - Web Developer',
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: 'About Me | Mohammed - Web Developer',
        description: 'Learn about Mohammed, a professional web developer with expertise in website development and user interface design.',
        images: ['https://mohammed-portfolio.com/assets/about-twitter.jpg'],
      },
    };
  }

  return {
    title: 'من أنا | محمد',
    description: 'تعرف على محمد، مطور ويب محترف مع خبرة في تطوير المواقع الإلكترونية وتصميم واجهات المستخدم.',
    keywords: ['من أنا', 'تطوير مواقع', 'تصميم واجهات', 'تحسين محركات البحث', 'محمد'],
    alternates: {
      canonical: 'https://mohammed-portfolio.com/about',
      languages: {
        'ar': 'https://mohammed-portfolio.com/about',
        'en': 'https://mohammed-portfolio.com/en/about',
      },
    },
    openGraph: {
      title: 'من أنا | محمد - مطور ويب',
      description: 'تعرف على محمد، مطور ويب محترف مع خبرة في تطوير المواقع الإلكترونية وتصميم واجهات المستخدم.',
      url: 'https://mohammed-portfolio.com/about',
      siteName: 'محفظة محمد',
      locale: 'ar_SA',
      type: 'website',
      images: [
        {
          url: 'https://mohammed-portfolio.com/assets/about-og.jpg',
          width: 1200,
          height: 630,
          alt: 'محمد - مطور ويب',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'من أنا | محمد - مطور ويب',
      description: 'تعرف على محمد، مطور ويب محترف مع خبرة في تطوير المواقع الإلكترونية وتصميم واجهات المستخدم.',
      images: ['https://mohammed-portfolio.com/assets/about-twitter.jpg'],
    },
  };
}

// Add structured data for SEO
export const generateStructuredData = (lang: string) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    'mainEntity': {
      '@type': 'Person',
      'name': 'Mohammed',
      'jobTitle': lang === 'en' ? 'Web Developer' : 'مطور ويب',
      'description': lang === 'en'
        ? 'Professional web developer with expertise in React, Next.js, and modern web technologies.'
        : 'مطور ويب محترف متخصص في رياكت، نكست.جي إس، وتقنيات الويب الحديثة.',
      'knowsAbout': ['Web Development', 'React', 'Next.js', 'UI/UX Design', 'SEO'],
      'url': 'https://mohammed-portfolio.com',
      'sameAs': [
        'https://github.com/mun3azil',
        'https://linkedin.com/in/mun3azil'
      ],
      'skills': [
        'React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js',
        'GraphQL', 'MongoDB', 'PostgreSQL', 'Docker', 'Git'
      ],
      'alumniOf': {
        '@type': 'EducationalOrganization',
        'name': 'Cairo University',
        'sameAs': 'https://cu.edu.eg/Home'
      },
      'workLocation': {
        '@type': 'Place',
        'address': {
          '@type': 'PostalAddress',
          'addressCountry': 'Egypt'
        }
      }
    }
  };
};

export default async function AboutPage() {
  const t = await getTranslations('common');
  const headersList = headers();
  const pathname = headersList.get('x-pathname') || '';
  const currentLang = pathname.split('/')[1] === 'en' ? 'en' : 'ar';

  const structuredData = generateStructuredData(currentLang);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="pt-16" id="about-page">
        {/* Custom cursor for the about page */}
        <CustomCursor cursorType="pen" sectionId="about-page" />

        {/* Enhanced components with artistic and interactive elements */}
        <EnhancedAboutHero />
        <EnhancedSkillsSection />
        <EnhancedExperienceSection />
        <EnhancedInterestsSection />
        <FunFactsSection />
        <EnhancedCallToAction />
        <EnhancedScrollToTopButton style="rocket" />
      </main>
    </>
  );
}
