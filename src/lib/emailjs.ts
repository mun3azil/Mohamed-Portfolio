
// EmailJS configuration and helper functions
import emailjs from '@emailjs/browser';

// Initialize EmailJS with your public key
export function initEmailJS() {
  if (typeof window !== 'undefined') {
    emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!);
  }
}

// Send form data via EmailJS
export async function sendContactForm(formData: FormData) {
  const templateParams = Object.fromEntries(formData.entries()) as Record<string, string>;

  return emailjs.send(
    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
    templateParams
  );
}
