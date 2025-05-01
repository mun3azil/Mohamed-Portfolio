"use client";

import { useTranslation } from 'next-intl';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';

const CallToAction = () => {
  const { t } = useTranslation('common');
  const pathname = usePathname();
  const currentLang = pathname?.split('/')[1] === 'en' ? 'en' : 'ar';
  const isRTL = currentLang === 'ar';
  
  const ArrowIcon = isRTL ? FaArrowLeft : FaArrowRight;

  return (
    <section className="py-20 bg-gradient-to-r from-primary to-primary-dark text-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t('contactMe')}
          </h2>
          <p className="text-xl text-white/90 mb-10">
            {currentLang === 'en' 
              ? "Interested in working together? Let's discuss your project and see how I can help bring your ideas to life."
              : "هل أنت مهتم بالعمل معًا؟ دعنا نناقش مشروعك ونرى كيف يمكنني المساعدة في تحويل أفكارك إلى واقع."
            }
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href={`/${currentLang}/contact`}
              className="inline-flex items-center px-8 py-4 bg-white text-primary font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary"
              aria-label={t('contactMeAria')}
            >
              <span className="mr-2">{t('contactMe')}</span>
              <ArrowIcon />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
