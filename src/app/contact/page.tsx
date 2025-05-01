"use client";

import React, { useState, useRef, FormEvent, ChangeEvent } from 'react';
import emailjs from '@emailjs/browser';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  service: string;
}

interface SubmitStatus {
  success: boolean;
  error: boolean;
  message: string;
}

export default function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    service: ''
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>({
    success: false,
    error: false,
    message: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ success: false, error: false, message: '' });

    // استبدل هذه القيم بقيمك الخاصة من لوحة تحكم EmailJS
    const serviceId = 'service_id'; // مُعرف الخدمة الخاص بك
    const templateId = 'template_id'; // مُعرف القالب الخاص بك
    const publicKey = 'public_key'; // المفتاح العام الخاص بك

    emailjs.sendForm(serviceId, templateId, formRef.current!, publicKey)
      .then((result) => {
        console.log('Email sent successfully:', result.text);
        setSubmitStatus({
          success: true,
          error: false,
          message: 'تم إرسال رسالتك بنجاح! سأتواصل معك قريباً.'
        });
        // إعادة تعيين النموذج
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          service: ''
        });
      }, (error) => {
        console.error('Error sending email:', error.text);
        setSubmitStatus({
          success: false,
          error: true,
          message: 'حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.'
        });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">اتصل بي</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              سعيد بالتواصل معك لمناقشة مشروعك أو الإجابة عن استفساراتك
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Contact Form */}
            <div className="lg:w-2/3">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-primary">أرسل رسالة</h2>
                
                {submitStatus.success && (
                  <div className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 p-4 rounded-md mb-6">
                    {submitStatus.message}
                  </div>
                )}
                
                {submitStatus.error && (
                  <div className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 p-4 rounded-md mb-6">
                    {submitStatus.message}
                  </div>
                )}
                
                <form ref={formRef} onSubmit={handleSubmit} id="contact-form">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                        الاسم
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                        placeholder="أدخل اسمك"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                        البريد الإلكتروني
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                        placeholder="أدخل بريدك الإلكتروني"
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-6">
                    <label htmlFor="subject" className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                      الموضوع
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                      placeholder="موضوع رسالتك"
                      required
                    />
                  </div>
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                      الرسالة
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                      placeholder="اكتب رسالتك هنا..."
                      required
                    ></textarea>
                  </div>
                  <div className="mb-6">
                    <label htmlFor="service" className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                      الخدمة المطلوبة
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white appearance-none"
                    >
                      <option value="">اختر الخدمة</option>
                      <option value="web-development">تصميم وتطوير المواقع</option>
                      <option value="ui-design">تصميم واجهات المستخدم</option>
                      <option value="seo">تحسين محركات البحث</option>
                      <option value="hosting">استضافة المواقع</option>
                      <option value="support">الدعم الفني</option>
                      <option value="other">أخرى</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-primary hover:bg-secondary text-white font-medium py-3 px-6 rounded-md transition duration-300 flex justify-center items-center"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="20" height="20">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        جارٍ الإرسال...
                      </>
                    ) : 'إرسال الرسالة'}
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Info */}
            <div className="lg:w-1/3">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg h-full">
                <h2 className="text-2xl font-bold mb-6 text-primary">معلومات الاتصال</h2>
                
                <div className="space-y-8">
                  <div className="flex items-start">
                    <div className="text-primary text-xl mt-1 ml-4">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6" width="24" height="24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-1">البريد الإلكتروني</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        <a href="mailto:info@Mohammed.com" className="hover:text-primary transition">
                          info@Mohammed.com
                        </a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="text-primary text-xl mt-1 ml-4">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6" width="24" height="24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-1">الهاتف</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        <a href="tel:+123456789" className="hover:text-primary transition">
                          +123 456 7890
                        </a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="text-primary text-xl mt-1 ml-4">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6" width="24" height="24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-1">الموقع</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        القاهرة، مصر
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-12">
                  <h3 className="text-lg font-medium mb-4">تابعني على</h3>
                  <div className="flex space-x-4">
                    <a
                      href="https://github.com/Mohammed"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 p-3 rounded-full hover:bg-primary hover:text-white transition duration-300"
                      aria-label="GitHub"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    </a>
                    <a
                      href="https://linkedin.com/in/Mohammed"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 p-3 rounded-full hover:bg-primary hover:text-white transition duration-300"
                      aria-label="LinkedIn"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                    <a
                      href="https://twitter.com/Mohammed"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 p-3 rounded-full hover:bg-primary hover:text-white transition duration-300"
                      aria-label="Twitter"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">الأسئلة الشائعة</h2>
          
          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3">ما هي مدة تنفيذ مشروع موقع إلكتروني؟</h3>
              <p className="text-gray-600 dark:text-gray-300">
                تختلف مدة تنفيذ المشروع حسب حجمه وتعقيده. بشكل عام، يمكن أن يستغرق موقع بسيط من 2-4 أسابيع، بينما قد تستغرق المشاريع المعقدة من 8-12 أسبوع.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3">ما هي تكلفة تطوير موقع إلكتروني؟</h3>
              <p className="text-gray-600 dark:text-gray-300">
                تعتمد التكلفة على متطلبات المشروع وتعقيده. أقدم عروض أسعار مخصصة بعد فهم احتياجاتك بالتفصيل. يمكنك التواصل معي للحصول على تقدير مبدئي للتكلفة.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3">هل تقدم خدمات الصيانة بعد إطلاق الموقع؟</h3>
              <p className="text-gray-600 dark:text-gray-300">
                نعم، أقدم خدمات صيانة ودعم فني مستمرة بعد إطلاق الموقع. يمكنك الاختيار من بين عدة خطط للصيانة الشهرية أو السنوية حسب احتياجاتك.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3">هل يمكنني تعديل محتوى الموقع بنفسي؟</h3>
              <p className="text-gray-600 dark:text-gray-300">
                بالتأكيد! أقوم بتطوير المواقع مع توفير نظام إدارة محتوى سهل الاستخدام يمكنك من خلاله تحديث المحتوى بنفسك دون الحاجة إلى معرفة تقنية.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3">ما هي التقنيات التي تستخدمها في التطوير؟</h3>
              <p className="text-gray-600 dark:text-gray-300">
                أستخدم أحدث التقنيات مثل React، Next.js، Node.js، وTailwind CSS. أختار التقنية المناسبة لكل مشروع بناءً على متطلباته الخاصة لضمان أفضل أداء وتجربة مستخدم.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3">كيف يمكنني متابعة تقدم المشروع؟</h3>
              <p className="text-gray-600 dark:text-gray-300">
                أوفر تقارير منتظمة عن تقدم المشروع، وأستخدم منصات إدارة المشاريع التي تتيح لك مشاهدة التقدم المحرز في الوقت الفعلي. كما أقوم بجدولة اجتماعات دورية لمناقشة التقدم والتحديات.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              هل لديك أسئلة أخرى؟ لا تتردد في التواصل معي.
            </p>
            <a 
              href="#contact-form"
              className="px-6 py-3 bg-primary text-white rounded-md hover:bg-secondary transition duration-300 inline-block"
              aria-label="انتقل إلى نموذج الاتصال"
            >
              تواصل الآن
            </a>
          </div>
        </div>
      </section>
    </div>
  );
} 