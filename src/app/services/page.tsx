import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Mohammed - خدماتي | مطور ويب محترف',
  description: 'استكشف مجموعة الخدمات الاحترافية التي أقدمها في مجال تطوير المواقع وتصميم الواجهات وتحسين محركات البحث.',
};

interface ServiceSectionProps {
  id: string;
  title: string;
  description: string;
  features: { title: string; description: string }[];
  icon: React.ReactNode;
}

const ServiceSection: React.FC<ServiceSectionProps> = ({ id, title, description, features, icon }) => {
  return (
    <section id={id} className="py-16 border-b border-gray-200 dark:border-gray-700 last:border-0">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-12 items-start">
          <div className="md:w-1/3 text-center md:text-right">
            <div className="text-6xl text-primary mb-6 mx-auto md:mx-0 w-24 h-24 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-full">
              {icon}
            </div>
            <h2 className="text-3xl font-bold mb-4 text-primary">{title}</h2>
          </div>
          <div className="md:w-2/3">
            <p className="text-lg text-gray-800 dark:text-gray-100 mb-8">
              {description}
            </p>
            <h3 className="text-xl font-bold mb-6 text-primary">ما أقدمه في هذه الخدمة:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow transition-all duration-300 ease-in-out hover:scale-105">
                  <div className="text-accent mr-4 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2 text-gray-800 dark:text-gray-100">{feature.title}</h4>
                    <p className="text-gray-500 dark:text-gray-400">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default function ServicesPage() {
  const services = [
    {
      id: 'web-development',
      title: 'تصميم وتطوير المواقع',
      description: 'أقدم خدمات شاملة لتصميم وتطوير المواقع الإلكترونية الاحترافية والمخصصة لتلبية احتياجاتك المحددة. من المواقع البسيطة إلى المنصات المعقدة، أستخدم أحدث التقنيات لبناء مواقع سريعة ومتجاوبة وآمنة.',
      icon: '💻',
      features: [
        {
          title: 'تطوير الواجهات الأمامية',
          description: 'تصميم وتطوير واجهات المستخدم الجذابة والتفاعلية باستخدام React، Next.js وTailwind CSS',
        },
        {
          title: 'تطوير الخلفيات',
          description: 'إنشاء واجهات برمجية قوية وآمنة باستخدام Node.js، Express، وقواعد البيانات المختلفة',
        },
        {
          title: 'مواقع متجاوبة',
          description: 'تصميم مواقع تعمل بكفاءة على جميع الأجهزة بما في ذلك الحواسيب والهواتف والأجهزة اللوحية',
        },
        {
          title: 'متاجر إلكترونية',
          description: 'إنشاء متاجر إلكترونية متكاملة مع سلة تسوق وبوابات دفع آمنة ونظام إدارة المنتجات',
        },
      ],
    },
    {
      id: 'ui-design',
      title: 'تصميم واجهات المستخدم',
      description: 'أصمم واجهات مستخدم عصرية وجذابة تعزز تجربة المستخدم وتساعد في تحقيق أهداف عملك. أركز على خلق توازن مثالي بين الجمال والوظائف العملية مع مراعاة سهولة الاستخدام.',
      icon: '🎨',
      features: [
        {
          title: 'تصميم تجربة المستخدم (UX)',
          description: 'تحليل احتياجات المستخدمين وتصميم تدفقات سلسة وسهلة الاستخدام تحسن من تجربة المستخدم',
        },
        {
          title: 'تصميم واجهة المستخدم (UI)',
          description: 'إنشاء تصاميم جذابة مع اهتمام كبير بالتفاصيل البصرية واختيار الألوان المناسبة والخطوط',
        },
        {
          title: 'النماذج الأولية التفاعلية',
          description: 'إنشاء نماذج أولية تفاعلية قبل التطوير للتأكد من تلبية التصاميم لاحتياجاتك وتوقعاتك',
        },
        {
          title: 'أنظمة التصميم',
          description: 'تطوير أنظمة تصميم متناسقة ومتسقة تضمن تجربة موحدة عبر جميع منصاتك الرقمية',
        },
      ],
    },
    {
      id: 'seo',
      title: 'تحسين محركات البحث (SEO)',
      description: 'أساعد في تحسين ترتيب موقعك في نتائج محركات البحث لزيادة الظهور والوصول إلى جمهور أكبر. أستخدم استراتيجيات متقدمة ومتوافقة مع أحدث خوارزميات محركات البحث.',
      icon: '🔍',
      features: [
        {
          title: 'تحليل الكلمات المفتاحية',
          description: 'تحديد الكلمات المفتاحية الأكثر فعالية والمناسبة لنشاطك التجاري لاستهدافها في موقعك',
        },
        {
          title: 'تحسين هيكل الموقع',
          description: 'تحسين بنية موقعك وروابطه الداخلية لتحسين فهرسة محركات البحث وتسهيل الوصول للمحتوى',
        },
        {
          title: 'محتوى متوافق مع السيو',
          description: 'إنشاء وتحسين المحتوى ليكون متوافقًا مع معايير السيو مع الحفاظ على جودته وإفادته للمستخدمين',
        },
        {
          title: 'تقارير وتحليلات',
          description: 'تقديم تقارير دورية مفصلة عن أداء موقعك في محركات البحث واقتراح التحسينات اللازمة',
        },
      ],
    },
    {
      id: 'hosting',
      title: 'استضافة المواقع',
      description: 'أقدم خدمات استضافة موثوقة وآمنة للمواقع الإلكترونية مع ضمان توفر الخدمة وسرعة التحميل. أعتمد على أفضل مزودي الاستضافة مع تكوين الخوادم للأداء الأمثل.',
      icon: '☁️',
      features: [
        {
          title: 'استضافة سريعة وآمنة',
          description: 'توفير استضافة عالية الأداء مع اهتمام خاص بسرعة التحميل وأمان البيانات',
        },
        {
          title: 'إعداد وتكوين الخوادم',
          description: 'تكوين الخوادم بشكل مثالي حسب احتياجات مشروعك لضمان الأداء الأمثل والاستقرار',
        },
        {
          title: 'النسخ الاحتياطية التلقائية',
          description: 'إعداد نظام للنسخ الاحتياطية التلقائية لحماية بياناتك من أي فقدان محتمل',
        },
        {
          title: 'مراقبة الأداء والصيانة',
          description: 'مراقبة أداء الموقع بشكل مستمر وإجراء الصيانة اللازمة لضمان استمرارية العمل',
        },
      ],
    },
    {
      id: 'support',
      title: 'الدعم الفني',
      description: 'أوفر دعمًا فنيًا متكاملًا لموقعك الإلكتروني، بما في ذلك الصيانة والتحديثات وحل المشكلات الطارئة. يمكنك الاعتماد على استجابة سريعة وحلول فعالة لأي مشكلة تقنية.',
      icon: '🛠️',
      features: [
        {
          title: 'صيانة دورية',
          description: 'إجراء صيانة دورية للموقع لضمان عمله بكفاءة وتحديث البرمجيات والإضافات',
        },
        {
          title: 'حل المشكلات الطارئة',
          description: 'استجابة سريعة للمشكلات الطارئة وتقديم حلول فعالة لتقليل فترات التوقف',
        },
        {
          title: 'تحديثات وتحسينات',
          description: 'إجراء التحديثات اللازمة وإضافة ميزات جديدة حسب احتياجاتك المتغيرة',
        },
        {
          title: 'تدريب ودعم للمستخدمين',
          description: 'تقديم التدريب والدعم للمستخدمين لمساعدتهم على استخدام جميع ميزات الموقع بفعالية',
        },
      ],
    },
    {
      id: 'digital-marketing',
      title: 'التسويق الرقمي',
      description: 'أساعدك في تسويق موقعك ومنتجاتك رقميًا من خلال استراتيجيات فعالة تزيد من المبيعات وتجذب العملاء. أستخدم مجموعة متنوعة من القنوات الرقمية لتحقيق أهدافك التسويقية.',
      icon: '📈',
      features: [
        {
          title: 'إدارة وسائل التواصل الاجتماعي',
          description: 'إدارة حسابات وسائل التواصل الاجتماعي وإنشاء محتوى جذاب وإشراك الجمهور المستهدف',
        },
        {
          title: 'إعلانات مدفوعة',
          description: 'تصميم وإدارة حملات إعلانية مدفوعة على جوجل ووسائل التواصل الاجتماعي لزيادة الوصول',
        },
        {
          title: 'التسويق بالمحتوى',
          description: 'إنشاء محتوى قيم ومفيد يجذب الزوار ويحولهم إلى عملاء محتملين ثم عملاء دائمين',
        },
        {
          title: 'تحليل وتحسين الأداء',
          description: 'مراقبة وتحليل أداء الحملات التسويقية وإجراء التحسينات اللازمة لزيادة العائد على الاستثمار',
        },
      ],
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">خدماتي</h1>
            <p className="text-xl text-gray-800 dark:text-gray-100 max-w-3xl mx-auto">
              مجموعة متكاملة من الخدمات الاحترافية لمساعدتك في بناء وتطوير حضورك الرقمي
            </p>
          </div>

          {/* Services Navigation */}
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            {services.map((service) => (
              <a
                key={service.id}
                href={`#${service.id}`}
                className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-full shadow-md hover:shadow-lg transition-all duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent"
                aria-label={`انتقل إلى قسم ${service.title}`}
              >
                <span className="mr-2">{service.icon}</span>
                {service.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Service Sections */}
      {services.map((service) => (
        <ServiceSection
          key={service.id}
          id={service.id}
          title={service.title}
          description={service.description}
          features={service.features}
          icon={service.icon}
        />
      ))}

      {/* Client Testimonials Section */}
      <section className="testimonials py-16 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-primary">آراء العملاء</h2>
          <div className="testimonial mb-8">
            <p className="text-xl text-gray-800 dark:text-gray-100">&quot;Mohammed transformed our website into a modern, user-friendly platform. Highly recommend!&quot;</p>
            <span className="text-lg text-gray-500 dark:text-gray-400">- Client A</span>
          </div>
          <div className="testimonial">
            <p className="text-xl text-gray-800 dark:text-gray-100">&quot;Professional and efficient. Delivered exactly what we needed.&quot;</p>
            <span className="text-lg text-gray-500 dark:text-gray-400">- Client B</span>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">لنتحدث عن مشروعك</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            هل تحتاج إلى أي من هذه الخدمات؟ أو لديك مشروع خاص يحتاج إلى حلول مخصصة؟ أنا هنا لمساعدتك.
          </p>
            <Link
            href="/contact"
            className="px-8 py-4 bg-secondary text-white rounded-md shadow transition-all duration-300 ease-in-out hover:scale-105 hover:bg-secondary-dark focus:outline-none focus:ring-2 focus:ring-accent text-lg font-medium inline-block"
            aria-label="تواصل معي الآن"
            >
            تواصل معي الآن
            </Link>
        </div>
      </section>
    </div>
  );
}