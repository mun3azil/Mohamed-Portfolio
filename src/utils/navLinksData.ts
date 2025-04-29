export const NAV_LINKS = [
  { href: '/', label: 'الرئيسية', labelKey: 'navHome', aria: 'الذهاب إلى الصفحة الرئيسية', icon: 'home' },
  { href: '/about', label: 'من أنا', labelKey: 'navAbout', aria: 'تعرف على المزيد عني', icon: 'user' },
  {
    href: '/services',
    label: 'خدماتي',
    labelKey: 'navServices',
    aria: 'استكشاف خدماتي',
    icon: 'settings',
    subLinks: [
      { href: '/services/web', label: 'تطوير الويب', labelKey: 'navWebDev', aria: 'خدمات تطوير الويب', icon: 'globe' },
      { href: '/services/mobile', label: 'تطوير تطبيقات الجوال', labelKey: 'navMobileDev', aria: 'خدمات تطوير تطبيقات الجوال', icon: 'window' },
    ],
  },
  { href: '/projects', label: 'مشاريعي', labelKey: 'navProjects', aria: 'عرض مشاريعي', icon: 'folder' },
  { href: '/blog', label: 'المدونة', labelKey: 'navBlog', aria: 'قراءة المدونة', icon: 'file' },
  { href: '/contact', label: 'اتصل بي', labelKey: 'navContact', aria: 'اتصل بي', icon: 'mail' },
];
