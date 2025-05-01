"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "./CallToAction.module.css";

interface CallToActionProps {
  headingText?: string;
  paragraphText?: string;
  buttonText?: string;
  buttonLink?: string;
  bgColor?: string;
  textColor?: string;
  buttonBgColor?: string;
  buttonTextColor?: string;
  textShadow?: string;
  boxShadow?: string;
  toastMessage?: string;
}

const CallToAction = ({
  headingText = "هل أنت مستعد للانطلاق؟",
  paragraphText = "نحن هنا لمساعدتك على تحقيق أهدافك. لا تتردد في التواصل معنا لبدء مشروعك.",
  buttonText = "تواصل معنا الآن",
  buttonLink = "/contact",
  bgColor = "bg-primary",
  textColor = "text-white",
  buttonBgColor = "bg-white",
  buttonTextColor = "text-primary",
  textShadow,
  boxShadow,
  toastMessage = "شكرًا لتفاعلك!",
}: CallToActionProps) => {
  // Animation refs
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  // Loading state for button
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (headingRef.current) {
      headingRef.current.classList.add("animate-fade-in-up");
    }
    if (paragraphRef.current) {
      paragraphRef.current.classList.add("animate-fade-in-up", "delay-150");
    }
  }, []);

  const handleClick = () => {
    setLoading(true);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      setLoading(false);
    }, 1800);
    // يمكن إضافة منطق إضافي هنا إذا لزم الأمر
  };

  return (
    <section
      className={`${bgColor} ${textColor} py-12 sm:py-16 md:py-20 lg:py-24`}
      role="region"
      aria-label="دعوة للعمل"
    >
      <div className="container mx-auto px-2 sm:px-4 text-center max-w-2xl">
        <h2
          ref={headingRef}
          className={`text-4xl md:text-5xl font-bold mb-4 text-primary opacity-0 ${styles["text-shadow"]} ${textShadow ? styles["custom-text-shadow"] : ""}`}
          aria-labelledby="cta-heading"
        >
          {headingText}
        </h2>
        <p
          ref={paragraphRef}
          className="text-lg text-gray-800 dark:text-gray-100 mb-6 sm:mb-8 opacity-0"
          aria-describedby="cta-paragraph"
        >
          {paragraphText}
        </p>
        <Link
          href={loading ? "#" : buttonLink}
          onClick={handleClick}
          className={`py-2.5 sm:py-3 px-6 sm:px-8 rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent text-base sm:text-lg md:text-xl inline-block min-w-[160px] ${buttonBgColor} ${buttonTextColor} ${boxShadow ? styles["custom-box-shadow"] : ""}`}
          aria-label={buttonText}
          role="button"
          tabIndex={loading ? -1 : 0}
          style={{ pointerEvents: loading ? "none" : "auto", opacity: loading ? 0.7 : 1 }}
        >
          {loading ? "جارٍ التحميل..." : buttonText}
        </Link>
        {showToast && (
          <div className={styles.toast}>
            {toastMessage}
          </div>
        )}
      </div>
    </section>
  );
};

export default CallToAction;