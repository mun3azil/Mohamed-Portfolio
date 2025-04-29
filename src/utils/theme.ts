import { useEffect, useMemo, useState } from 'react';

// دالة لتحميل الوضع من localStorage (إذا كان موجودًا)
const loadThemeFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('theme') || 'light'; // القيمة الافتراضية هي 'light'
  }
  return 'light'; // لتجنب المشاكل في الخوادم
};

// دالة لتبديل الوضع بين "النهاري" و "الليلي"
export const useTheme = () => {
  const [theme, setTheme] = useState<string>(loadThemeFromLocalStorage());

  useEffect(() => {
    // حفظ الوضع في localStorage عند التغيير
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme);
    }
    // تطبيق الوضع على الـ body
    document.body.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // استخدام useMemo لتحسين الأداء ومنع الحسابات غير الضرورية
  const themeClass = useMemo(() => (theme === 'light' ? 'light-mode' : 'dark-mode'), [theme]);

  return { theme, toggleTheme, themeClass };
};
