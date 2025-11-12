import React, { createContext, useContext, useState } from 'react';
import emailjs from '@emailjs/browser';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormStatus {
  type: 'success' | 'error' | '';
  message: string;
}

interface FormContextType {
  formData: FormData;
  status: FormStatus;
  isLoading: boolean;
  focusedField: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  setFocusedField: (field: string) => void;
  resetForm: () => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const useForm = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useForm must be used within a FormProvider');
  }
  return context;
};

export const FormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState<FormStatus>({ type: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState('');

  // Email service configuration
  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';

  const validateForm = (): boolean => {
    if (!formData.name.trim() || formData.name.length < 2) {
      setStatus({ 
        type: 'error', 
        message: 'Name must contain at least 2 characters' 
      });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      setStatus({ 
        type: 'error', 
        message: 'Please enter a valid email address' 
      });
      return false;
    }

    if (!formData.message.trim() || formData.message.length < 10) {
      setStatus({ 
        type: 'error', 
        message: 'Message must contain at least 10 characters' 
      });
      return false;
    }

    if (formData.message.length > 5000) {
      setStatus({ 
        type: 'error', 
        message: 'Message is too long (max 5000 characters)' 
      });
      return false;
    }

    return true;
  };

  const sanitizeInput = (input: string): string => {
    return input
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<[^>]+>/g, '')
      .trim();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (status.type === 'error') {
      setStatus({ type: '', message: '' });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const templateParams = {
        from_name: sanitizeInput(formData.name),
        from_email: sanitizeInput(formData.email),
        subject: sanitizeInput(formData.subject || 'New contact message'),
        message: sanitizeInput(formData.message),
        to_name: 'Salma El Rhaiti',
        reply_to: formData.email,
      };

      const response = await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        templateParams,
        PUBLIC_KEY
      );

      console.log('✅ Email sent successfully!', response.status, response.text);
      
      setStatus({ 
        type: 'success', 
        message: '✨ Message sent successfully! I\'ll get back to you soon.' 
      });
      
      setTimeout(() => {
        resetForm();
      }, 3000);
      
    } catch (error) {
      console.error('❌ Error sending email:', error);
      setStatus({ 
        type: 'error', 
        message: 'Error sending message. Please try again or contact me directly.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', subject: '', message: '' });
    setStatus({ type: '', message: '' });
    setFocusedField('');
  };

  const value = {
    formData,
    status,
    isLoading,
    focusedField,
    handleChange,
    handleSubmit,
    setFocusedField,
    resetForm
  };

  return (
    <FormContext.Provider value={value}>
      {children}
    </FormContext.Provider>
  );
};