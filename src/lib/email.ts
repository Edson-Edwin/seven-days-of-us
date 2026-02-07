import emailjs from '@emailjs/browser';

// EmailJS configuration
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';
const DEFAULT_RECIPIENT_EMAIL = import.meta.env.VITE_DEFAULT_RECIPIENT_EMAIL || '';

export interface EmailParams {
  message: string;
  to_email?: string;
  from_name?: string;
}

export const sendEmail = async (params: EmailParams): Promise<boolean> => {
  try {
    // Check if EmailJS is configured
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      console.warn('EmailJS is not configured. Please set environment variables.');
      return false;
    }

    // Initialize EmailJS
    emailjs.init(EMAILJS_PUBLIC_KEY);

    // Send email
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      message: params.message,
      to_email: params.to_email || DEFAULT_RECIPIENT_EMAIL || '',
      from_name: params.from_name || 'Seven Days of Us',
    });

    return true;
  } catch (error) {
    console.error('Failed to send email:', error);
    return false;
  }
};
