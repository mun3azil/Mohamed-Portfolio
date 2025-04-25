import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Mohammed - من أنا | مطور ويب محترف',
  description: 'تعرف على Mohammed، مطور ويب محترف متخصص في تصميم وتطوير المواقع الإلكترونية باستخدام أحدث التقنيات.',
};

export default function AboutPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">من أنا</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              تعرف على قصتي المهنية وخبراتي في مجال تطوير الويب
            </p>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <div className="relative w-72 h-72 md:w-96 md:h-96 mx-auto rounded-full overflow-hidden border-4 border-primary shadow-xl">
                {/* Placeholder for profile image */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent opacity-20"></div>
                <div className="absolute inset-0 flex items-center justify-center text-6xl font-bold text-primary">
                  Mohammed
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6 text-primary">نبذة عني</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                مرحبًا! أنا Mohammed، مطور ويب متخصص مع خبرة تزيد عن 5 سنوات في تصميم وتطوير المواقع الإلكترونية المميزة. أتقن العمل مع مجموعة متنوعة من التقنيات الحديثة مثل React وNext.js وNode.js.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                شغفي هو تحويل أفكارك إلى مواقع رقمية جذابة وسريعة وسهلة الاستخدام. أؤمن بأن التصميم الجيد والوظائف العملية يجب أن يسيران جنبًا إلى جنب لخلق تجربة مستخدم استثنائية.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                أتطلع دائمًا للتعاون في مشاريع جديدة ومثيرة، وتقديم حلول تقنية مبتكرة تساعد في تحقيق أهداف عملائي.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Education & Experience Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">التعليم والخبرات</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Education */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-primary">التعليم</h3>
              
              <div className="space-y-8">
                <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
                  <h4 className="text-xl font-semibold mb-2">بكالوريوس علوم الحاسب</h4>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">جامعة القاهرة</p>
                  <p className="text-gray-500 dark:text-gray-400">2015 - 2019</p>
                </div>
                
                <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
                  <h4 className="text-xl font-semibold mb-2">دبلومة تطوير الويب المتقدمة</h4>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">أكاديمية البرمجة العربية</p>
                  <p className="text-gray-500 dark:text-gray-400">2020</p>
                </div>
                
                <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
                  <h4 className="text-xl font-semibold mb-2">شهادة إدارة المشاريع الاحترافية</h4>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">معهد إدارة المشاريع</p>
                  <p className="text-gray-500 dark:text-gray-400">2021</p>
                </div>
              </div>
            </div>
            
            {/* Experience */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-primary">الخبرات المهنية</h3>
              
              <div className="space-y-8">
                <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
                  <h4 className="text-xl font-semibold mb-2">مطور ويب أول</h4>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">شركة تقنية المستقبل</p>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">2021 - الآن</p>
                  <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                    <li>تطوير وصيانة تطبيقات الويب باستخدام React و Next.js</li>
                    <li>قيادة فريق من 5 مطورين في مشاريع متعددة</li>
                    <li>تحسين أداء المواقع وتجربة المستخدم</li>
                  </ul>
                </div>
                
                <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
                  <h4 className="text-xl font-semibold mb-2">مطور واجهات أمامية</h4>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">شركة الابتكار الرقمي</p>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">2019 - 2021</p>
                  <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                    <li>تصميم وتطوير واجهات المستخدم باستخدام HTML, CSS, JavaScript</li>
                    <li>تحويل التصاميم من Figma و Adobe XD إلى صفحات ويب تفاعلية</li>
                    <li>العمل على تحسين سرعة تحميل المواقع وتوافقها مع مختلف المتصفحات</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline Section */}
          <section className="timeline mt-12">
            <div className="timeline-item">
              <h3>2015 - 2019</h3>
              <p>Bachelor&apos;s in Computer Science, Cairo University</p>
            </div>
            <div className="timeline-item">
              <h3>2020</h3>
              <p>Advanced Web Development Diploma, Arab Programming Academy</p>
            </div>
            <div className="timeline-item">
              <h3>2021 - Present</h3>
              <p>Senior Web Developer, Future Tech Company</p>
            </div>
          </section>
        </div>
      </section>

      {/* Personal Skills Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">المهارات الشخصية</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { name: 'التواصل الفعال', icon: '🗣️' },
              { name: 'حل المشكلات', icon: '🧩' },
              { name: 'العمل ضمن فريق', icon: '👥' },
              { name: 'إدارة المشاريع', icon: '📊' },
              { name: 'التفكير الإبداعي', icon: '💡' },
              { name: 'التعلم المستمر', icon: '📚' },
              { name: 'إدارة الوقت', icon: '⏱️' },
              { name: 'الاهتمام بالتفاصيل', icon: '🔍' },
            ].map((skill, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg text-center transition duration-300 hover:transform hover:scale-105 hover:shadow-lg">
                <div className="text-4xl mb-4">{skill.icon}</div>
                <h3 className="text-lg font-semibold">{skill.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">هل أنت مستعد للعمل معًا؟</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            دعنا نتعاون لتحويل فكرتك إلى حقيقة رقمية مميزة. أنا هنا لمساعدتك في كل خطوة.
          </p>
          <Link
            href="/contact"
            className="px-8 py-4 bg-white text-primary rounded-md hover:bg-gray-100 transition duration-300 text-lg font-medium inline-block"
          >
            تواصل معي الآن
          </Link>
        </div>
      </section>
    </div>
  );
}