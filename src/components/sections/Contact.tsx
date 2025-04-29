"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import emailjs from "emailjs-com";
import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useTheme } from "@/context/ThemeContext";

interface IFormInputs {
  name: string;
  email: string;
  message: string;
}

const SERVICE_ID = "service_xxxxxx";   // استبدلها بالكود الخاص بيك من EmailJS
const TEMPLATE_ID = "template_xxxxxx"; // استبدلها بالكود الخاص بيك من EmailJS
const USER_ID = "user_xxxxxx";         // استبدلها بالكود الخاص بيك من EmailJS
const RECAPTCHA_SITE_KEY = "your_recaptcha_site_key"; // استبدلها بمفتاح reCAPTCHA بتاعك

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IFormInputs>();

  const [captchaVerified, setCaptchaVerified] = useState(false);
  const { theme } = useTheme();
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    if (!captchaVerified) {
      alert("من فضلك تحقق من أنك لست روبوت 🤖");
      return;
    }

    try {
      const templateParams = {
        from_name: data.name,
        from_email: data.email,
        message: data.message,
      };
      
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, USER_ID);
      alert("تم إرسال الرسالة بنجاح 🚀");
      reset();
      setCaptchaVerified(false);
    } catch (error) {
      console.error(error);
      alert("حدث خطأ أثناء الإرسال. حاول لاحقًا 😢");
    }
  };

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 max-w-2xl">
        <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">تواصل معي</h2>

        <form
          ref={formRef}
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg space-y-6"
        >
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium dark:text-white">
              الاسم الكامل
            </label>
            <input
              type="text"
              id="name"
              {...register("name", { required: "هذا الحقل مطلوب" })}
              className="w-full p-3 border border-gray-300 rounded-lg dark:border-gray-700 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message as string}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium dark:text-white">
              البريد الإلكتروني
            </label>
            <input
              type="email"
              id="email"
              {...register("email", { 
                required: "هذا الحقل مطلوب", 
                pattern: { 
                  value: /^\S+@\S+$/i, 
                  message: "بريد إلكتروني غير صالح" 
                } 
              })}
              className="w-full p-3 border border-gray-300 rounded-lg dark:border-gray-700 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message as string}</p>}
          </div>

          <div>
            <label htmlFor="message" className="block mb-2 text-sm font-medium dark:text-white">
              الرسالة
            </label>
            <textarea
              id="message"
              rows={5}
              {...register("message", { required: "هذا الحقل مطلوب" })}
              className="w-full p-3 border border-gray-300 rounded-lg dark:border-gray-700 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
            ></textarea>
            {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message as string}</p>}
          </div>

          <div className="flex justify-center">
            <ReCAPTCHA
              sitekey={RECAPTCHA_SITE_KEY}
              theme={theme === 'dark' ? 'dark' : 'light'}
              onChange={() => setCaptchaVerified(true)}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-6 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "جاري الإرسال..." : "إرسال"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
