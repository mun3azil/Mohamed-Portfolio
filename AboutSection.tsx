"use client";

import Image from 'next/image';

const AboutSection = () => {
  return (
    <section
      id="about"
      className="py-16 bg-gray-50 dark:bg-gray-800"
      aria-labelledby="about-heading"
    >
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
        
        {/* صورة شخصية */}
        <div className="flex-shrink-0">
          <Image
            src="/profile.jpg"
            alt="صورة محمد الشخصية"
            width={300}
            height={300}
            className="rounded-full object-cover shadow-lg"
          />
        </div>

        {/* النص التعريفي */}
        <div>
          <h2
            id="about-heading"
            className="text-3xl font-bold text-gray-900 dark:text-white mb-6"
          >
            من أنا؟
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            أنا محمد، مطور ويب شغوف ببناء تجارب رقمية مذهلة. لدي خبرة في إنشاء مواقع عالية الجودة تتميز بالأداء العالي وسهولة الاستخدام.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            أسعى دائمًا لتعلم التقنيات الحديثة، وتحقيق أفضل المعايير في كتابة الكود، مع التركيز على تصميم واجهات مستخدم أنيقة ومتجاوبة.
          </p>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;
