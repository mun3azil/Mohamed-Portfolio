// تعريف نوع الرابط للمزيد من الوضوح وقابلية التوسعة
export type NavLink = {
  href: string;
  label: string;
  ariaLabel: string;
  external?: boolean;
};

// روابط التنقل الرئيسية للموقع (تستخدم في Header وFooter)
export const NAV_LINKS: NavLink[] = [
  {
    href: '/',
    label: 'الصفحة الرئيسية',
    ariaLabel: 'الذهاب إلى الصفحة الرئيسية',
  },
  {
    href: '/about',
    label: 'من أنا',
    ariaLabel: 'تعرف على المزيد عني',
  },
  {
    href: '/services',
    label: 'خدماتي',
    ariaLabel: 'استكشاف خدماتي',
  },
  {
    href: '/projects',
    label: 'مشاريعي',
    ariaLabel: 'عرض مشاريعي',
  },
  {
    href: '/blog',
    label: 'المدونة',
    ariaLabel: 'قراءة المدونة',
  },
  {
    href: '/contact',
    label: 'اتصل بي',
    ariaLabel: 'اتصل بي للحصول على المزيد من المعلومات',
  },
  {
    href: '/about-project',
    label: 'عن المشروع',
    ariaLabel: 'معلومات عن المشروع',
  },
  {
    href: '/testimonials',
    label: 'آراء العملاء',
    ariaLabel: 'استعراض آراء العملاء',
  },
  {
    href: '/cv',
    label: 'سيرتي الذاتية',
    ariaLabel: 'اطلع على سيرتي الذاتية',
  },
  {
    href: '/certifications',
    label: 'شهاداتي',
    ariaLabel: 'مراجعة شهاداتي',
  },
  // روابط الشبكات الاجتماعية
  {
    href: 'https://linkedin.com/in/username',
    label: 'LinkedIn',
    ariaLabel: 'زيارة حساب LinkedIn',
    external: true,
  },
  {
    href: 'https://github.com/username',
    label: 'GitHub',
    ariaLabel: 'زيارة حساب GitHub',
    external: true,
  },
];
