import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Mohammed - المدونة | مطور ويب محترف',
  description: 'مقالات ونصائح حول تطوير الويب، تصميم المواقع، تحسين محركات البحث، وأحدث التقنيات.',
};

interface BlogPostProps {
  title: string;
  excerpt: string;
  image: string | null;
  date: string;
  slug: string;
  category: string;
  minutesToRead: number;
}

const BlogCard = ({ title, excerpt, image, date, slug, category, minutesToRead }: BlogPostProps) => {
  return (
    <article className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:-translate-y-2">
      <div className="relative h-48 bg-gray-300 dark:bg-gray-700">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-accent to-secondary opacity-70">
            <span className="text-white text-xl font-bold">{category}</span>
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
          <span className="ml-2">{date}</span>
          <span className="mx-2">•</span>
          <span className="bg-accent-alt bg-opacity-20 text-accent-alt px-2 py-1 rounded-full">
            {category}
          </span>
          <span className="mx-2">•</span>
          <span>{minutesToRead} دقيقة للقراءة</span>
        </div>
        <h3 className="text-xl font-bold mb-3 hover:text-primary transition">
          <Link href={`/blog/${slug}`}>{title}</Link>
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {excerpt}
        </p>
        <Link
          href={`/blog/${slug}`}
          className="text-primary hover:text-secondary font-medium inline-flex items-center group"
        >
          قراءة المزيد
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-4 h-4 mr-2 transition-transform duration-300 transform group-hover:translate-x-2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </article>
  );
};

const FeaturedPost = ({ title, excerpt, image, date, slug, category, minutesToRead }: BlogPostProps) => {
  return (
    <article className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden md:grid md:grid-cols-5 transform transition duration-300 hover:-translate-y-2 mb-12">
      <div className="relative h-60 md:h-full md:col-span-2 bg-gray-300 dark:bg-gray-700">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-accent to-secondary opacity-70">
            <span className="text-white text-2xl font-bold">{category}</span>
          </div>
        )}
      </div>
      <div className="p-6 md:col-span-3 md:p-8">
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
          <span className="ml-2">{date}</span>
          <span className="mx-2">•</span>
          <span className="bg-accent-alt bg-opacity-20 text-accent-alt px-2 py-1 rounded-full">
            {category}
          </span>
          <span className="mx-2">•</span>
          <span>{minutesToRead} دقيقة للقراءة</span>
        </div>
        <h3 className="text-2xl font-bold mb-4 hover:text-primary transition">
          <Link href={`/blog/${slug}`}>{title}</Link>
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-4">
          {excerpt}
        </p>
        <Link
          href={`/blog/${slug}`}
          className="text-primary hover:text-secondary font-medium inline-flex items-center group"
        >
          قراءة المزيد
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-4 h-4 mr-2 transition-transform duration-300 transform group-hover:translate-x-2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </article>
  );
};

export default function BlogPage() {
  const featuredPost = {
    title: 'استراتيجيات متقدمة لتحسين سرعة مواقع الويب في عام 2024',
    excerpt: 'سرعة الموقع هي أحد أهم العوامل التي تؤثر على تجربة المستخدم وتحسين محركات البحث. في هذا المقال، نستكشف أحدث التقنيات والممارسات لتحسين سرعة موقعك الإلكتروني وتحقيق نتائج أفضل في اختبارات الأداء مثل Google PageSpeed وWebpagetest.',
    image: null, // Replace with actual image path when available
    date: '25 مارس 2024',
    slug: 'advanced-website-speed-optimization-strategies-2024',
    category: 'أداء الويب',
    minutesToRead: 9,
  };

  const posts = [
    {
      title: 'أفضل ممارسات تحسين محركات البحث لعام 2023',
      excerpt: 'تعرف على أحدث التقنيات والممارسات لتحسين ترتيب موقعك في نتائج محركات البحث وزيادة الحركة العضوية. يتضمن هذا المقال استراتيجيات متقدمة في السيو الفني وتحسين المحتوى وبناء الروابط الخلفية.',
      image: null, // Replace with actual image path when available
      date: '15 يناير 2023',
      slug: 'seo-best-practices-2023',
      category: 'تحسين محركات البحث',
      minutesToRead: 7,
    },
    {
      title: 'مقدمة في إطار العمل Next.js للمبتدئين',
      excerpt: 'دليل شامل للمبتدئين للبدء في استخدام إطار عمل Next.js لبناء تطبيقات ويب سريعة وقوية ومتجاوبة. سنتعرف على المفاهيم الأساسية مثل التوجيه، العرض الجانبي والعميل، وتوليد المحتوى الثابتي.',
      image: null, // Replace with actual image path when available
      date: '28 فبراير 2023',
      slug: 'nextjs-for-beginners',
      category: 'تطوير الويب',
      minutesToRead: 8,
    },
    {
      title: 'كيفية تصميم واجهات مستخدم جذابة وسهلة الاستخدام',
      excerpt: 'نصائح وإرشادات لتصميم واجهات مستخدم تجمع بين الجمال والوظائف العملية لتحسين تجربة المستخدم وزيادة معدلات التحويل. سنتناول مبادئ التصميم الأساسية واتجاهات التصميم الحديثة وأفضل الأدوات.',
      image: null, // Replace with actual image path when available
      date: '10 مارس 2023',
      slug: 'designing-attractive-user-interfaces',
      category: 'تصميم',
      minutesToRead: 6,
    },
    {
      title: 'دليل شامل لاختبار تطبيقات الويب الحديثة',
      excerpt: 'تعرف على أنواع اختبارات البرمجيات المختلفة وكيفية تطبيقها في مشاريع الويب لضمان جودة وأداء التطبيقات. سنغطي اختبارات الوحدة والتكامل والواجهة وأتمتة الاختبار.',
      image: null, // Replace with actual image path when available
      date: '5 أبريل 2023',
      slug: 'comprehensive-guide-testing-modern-web-applications',
      category: 'اختبار البرمجيات',
      minutesToRead: 10,
    },
    {
      title: 'استخدام TypeScript مع React: الفوائد والممارسات المثلى',
      excerpt: 'اكتشف كيف يمكن أن يحسن TypeScript جودة وصيانة تطبيقات React من خلال توفير أنظمة الأنواع القوية والتكامل المتقدم. سنتعلم كيفية إعداد المشروع والأنماط الشائعة وتجنب الأخطاء الشائعة.',
      image: null, // Replace with actual image path when available
      date: '18 مايو 2023',
      slug: 'using-typescript-with-react',
      category: 'تطوير الويب',
      minutesToRead: 8,
    },
    {
      title: 'تحسين أداء قواعد البيانات في تطبيقات الويب عالية التحميل',
      excerpt: 'استراتيجيات وتقنيات متقدمة لتحسين أداء قواعد البيانات وتحقيق استجابة سريعة حتى تحت ضغط المستخدمين العالي. سنتناول تحسين الاستعلامات، الفهرسة، التخزين المؤقت، وتقسيم البيانات.',
      image: null, // Replace with actual image path when available
      date: '22 يونيو 2023',
      slug: 'optimizing-database-performance-high-load-web-applications',
      category: 'قواعد البيانات',
      minutesToRead: 9,
    },
    {
      title: 'تقنيات الواقع المعزز في تطبيقات الويب: الحاضر والمستقبل',
      excerpt: 'استكشاف كيفية استخدام تقنيات الواقع المعزز (AR) في تطبيقات الويب وتأثيرها على تجربة المستخدم والتسويق والتجارة الإلكترونية. سنلقي نظرة على أحدث التقنيات والمكتبات المتاحة.',
      image: null, // Replace with actual image path when available
      date: '7 يوليو 2023',
      slug: 'augmented-reality-web-applications',
      category: 'تقنيات الويب الناشئة',
      minutesToRead: 7,
    },
    {
      title: 'العمل عن بعد كمطور ويب: التحديات والفرص والنصائح',
      excerpt: 'دليل شامل للعمل عن بعد في مجال تطوير الويب، بما في ذلك كيفية العثور على فرص العمل، إدارة الوقت، التواصل الفعال، والحفاظ على التوازن بين العمل والحياة.',
      image: null, // Replace with actual image path when available
      date: '15 أغسطس 2023',
      slug: 'remote-work-web-developer',
      category: 'تطوير المهنة',
      minutesToRead: 6,
    },
  ];

  // استخراج جميع الفئات الفريدة
  const categories = [...new Set([featuredPost.category, ...posts.map((post) => post.category)])];

  return (
    <div>
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">المدونة</h1>
            <p className="text-xl text-gray-800 dark:text-gray-100 max-w-3xl mx-auto">
              مقالات ونصائح حول تطوير الويب، تصميم المواقع، تحسين محركات البحث، وأحدث التقنيات
            </p>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          {/* Categories Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button className="px-4 py-2 bg-primary text-white rounded-full transition-all duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent" aria-label="عرض كل التصنيفات">
              الكل
            </button>
            {categories.map((category) => (
              <button
                key={category}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition-all duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent"
                aria-label={`تصفية حسب تصنيف ${category}`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Featured Post */}
          <FeaturedPost
            {...featuredPost}
          />

          {/* All Posts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {posts.map((post, index) => (
              <BlogCard
                key={index}
                {...post}
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-16 flex justify-center">
            <nav className="flex space-x-2" aria-label="التنقل بين الصفحات">
              <button className="px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-md transition-all duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent" aria-label="الصفحة السابقة">
                السابق
              </button>
              <button className="px-4 py-2 bg-primary text-white rounded-md transition-all duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent" aria-label="الصفحة 1">
                1
              </button>
              <button className="px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-md transition-all duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent" aria-label="الصفحة 2">
                2
              </button>
              <button className="px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-md transition-all duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent" aria-label="الصفحة 3">
                3
              </button>
              <button className="px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-md transition-all duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent" aria-label="الصفحة التالية">
                التالي
              </button>
            </nav>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-primary">اشترك في النشرة البريدية</h2>
          <p className="text-xl text-gray-800 dark:text-gray-100 mb-8 max-w-2xl mx-auto">
            احصل على أحدث المقالات والنصائح في مجال تطوير الويب مباشرة إلى بريدك الإلكتروني
          </p>
          <form className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="بريدك الإلكتروني"
              className="flex-grow px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
              required
              aria-label="البريد الإلكتروني"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-primary text-white rounded-md shadow transition-all duration-300 ease-in-out hover:scale-105 hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-accent"
              aria-label="الاشتراك في النشرة البريدية"
            >
              اشتراك
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}