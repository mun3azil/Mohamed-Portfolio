import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export const metadata: Metadata = {
  title: 'من أنا | محمد',
  description: 'تعرف على محمد، مطور ويب محترف مع خبرة في تطوير المواقع الإلكترونية وتصميم واجهات المستخدم.',
};

export default async function AboutPage() {
  const t = await getTranslations('common');

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">{t('aboutTitle')}</h1>
      <div className="prose dark:prose-invert max-w-none">
        <p>{t('aboutDescription')}</p>
      </div>
    </main>
  );
}
