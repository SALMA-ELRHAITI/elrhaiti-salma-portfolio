// Contact.tsx
import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface Status {
  type: 'success' | 'error' | '';
  message: string;
}

const Contact: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [status, setStatus] = useState<Status>({ type: '', message: '' });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // ============================================
  // CONFIGURATION EMAILJS (depuis .env avec Vite)
  // ============================================
  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';

  // ============================================
  // VALIDATION DU FORMULAIRE
  // ============================================
  const validateForm = (): boolean => {
    // Validation du nom
    if (!formData.name.trim() || formData.name.length < 2) {
      setStatus({ 
        type: 'error', 
        message: '❌ Le nom doit contenir au moins 2 caractères' 
      });
      return false;
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      setStatus({ 
        type: 'error', 
        message: '❌ Veuillez entrer un email valide' 
      });
      return false;
    }

    // Validation du message
    if (!formData.message.trim() || formData.message.length < 10) {
      setStatus({ 
        type: 'error', 
        message: '❌ Le message doit contenir au moins 10 caractères' 
      });
      return false;
    }

    // Protection anti-spam
    if (formData.message.length > 5000) {
      setStatus({ 
        type: 'error', 
        message: '❌ Le message est trop long (max 5000 caractères)' 
      });
      return false;
    }

    return true;
  };

  // ============================================
  // SANITIZATION DES DONNÉES
  // ============================================
  const sanitizeInput = (input: string): string => {
    return input
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<[^>]+>/g, '')
      .trim();
  };

  // ============================================
  // GESTION DE L'ENVOI
  // ============================================
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validation
    if (!validateForm()) return;
    
    setIsLoading(true);
    setStatus({ type: '', message: '' });

    try {
      // Préparer les données sanitizées
      const templateParams = {
        from_name: sanitizeInput(formData.name),
        from_email: sanitizeInput(formData.email),
        subject: sanitizeInput(formData.subject || 'Nouveau message de contact'),
        message: sanitizeInput(formData.message),
        to_name: 'Salma El Rhaiti',
        reply_to: formData.email,
      };

      // Envoi avec EmailJS
      const response = await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        templateParams,
        PUBLIC_KEY
      );

      console.log('✅ Email envoyé avec succès!', response.status, response.text);
      
      setStatus({ 
        type: 'success', 
        message: '✅ Message envoyé avec succès! Je vous répondrai bientôt.' 
      });
      
      // Réinitialiser le formulaire après 3 secondes
      setTimeout(() => {
        setFormData({ name: '', email: '', subject: '', message: '' });
        setStatus({ type: '', message: '' });
      }, 3000);
      
    } catch (error) {
      console.error('❌ Erreur lors de l\'envoi:', error);
      setStatus({ 
        type: 'error', 
        message: '❌ Erreur lors de l\'envoi. Veuillez réessayer ou me contacter directement.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  // ============================================
  // GESTION DES CHANGEMENTS
  // ============================================
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Effacer les erreurs lors de la saisie
    if (status.type === 'error') {
      setStatus({ type: '', message: '' });
    }
  };

  // ============================================
  // RENDU DU COMPOSANT
  // ============================================
  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        
        {/* En-tête */}
        <div className="contact-header">
          <h2 className="contact-title">Contactez-moi</h2>
          <p className="contact-subtitle">
            Une question ? Un projet ? N'hésitez pas à me contacter
          </p>
        </div>

        {/* Formulaire */}
        <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
          
          {/* Nom */}
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              <span className="label-icon">👤</span>
              Nom complet *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Votre nom"
              maxLength={100}
              className="form-input"
              required
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              <span className="label-icon">✉️</span>
              Adresse email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="votre@email.com"
              maxLength={100}
              className="form-input"
              required
            />
          </div>

          {/* Sujet */}
          <div className="form-group">
            <label htmlFor="subject" className="form-label">
              <span className="label-icon">📋</span>
              Sujet
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Sujet de votre message"
              maxLength={200}
              className="form-input"
            />
          </div>

          {/* Message */}
          <div className="form-group">
            <label htmlFor="message" className="form-label">
              <span className="label-icon">💬</span>
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Écrivez votre message ici..."
              rows={6}
              maxLength={5000}
              className="form-textarea"
              required
            />
            <span className="char-count">
              {formData.message.length} / 5000 caractères
            </span>
          </div>

          {/* Message de statut */}
          {status.message && (
            <div className={`status-message ${status.type}`}>
              {status.message}
            </div>
          )}

          {/* Bouton d'envoi */}
          <button 
            type="submit"
            disabled={isLoading}
            className={`submit-button ${isLoading ? 'loading' : ''}`}
          >
            {isLoading ? (
              <>
                <span className="spinner"></span>
                Envoi en cours...
              </>
            ) : (
              <>
                <span className="button-icon">📤</span>
                Envoyer le message
              </>
            )}
          </button>

        </form>

        {/* Informations de contact supplémentaires */}
        <div className="contact-info">
          <p className="info-text">
            Vous pouvez aussi me contacter directement par email à{' '}
            <a href="mailto:salmaelrhaiti7@gmail.com" className="email-link">
              salmaelrhaiti7@gmail.com
            </a>
          </p>
        </div>

      </div>
    </section>
  );
};

export default Contact;