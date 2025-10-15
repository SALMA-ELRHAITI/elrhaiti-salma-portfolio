import React, { useState, useEffect } from 'react';
import './Experience.css';

const experiences = [
  {
    role: 'Apprenante – Piscine 1337',
    company: '1337 Coding School',
    location: 'Khouribga, Morocco',
    period: '07/2025',
    description:
      'Intensive training in C, Shell, and Linux. Completed projects in C programming, Shell scripts, and algorithmic problem-solving. Developed autonomy, resilience, and debugging skills.',
    logo: 'school42.png',
    hasPhoto: true,
    photoUrl: '/mein1337.jpg' 
  },
  {
    role: 'Full Stack Development Intern',
    company: 'Logicat',
    location: 'Meknès, Morocco',
    period: '03/2025 - 05/2025',
    description:
      'Developed and optimized the EduVerse application using React.js and TypeScript. Designed and integrated a RESTful API with Laravel/MySQL for user, class, and exam management.',
    logo: 'logicat.png'
  },
  {
    role: 'Web Development Intern',
    company: 'Agence WebDono',
    location: 'Meknès, Morocco',
    period: '04/2025',
    description:
      'Designed and customized WordPress sites (Divi) and blogs for various clients. Optimized UX/UI and translated websites for multilingual audiences.',
    logo: '/webdono.png'
  },
  {
    role: 'IT Service Intern',
    company: 'OCP Group',
    location: 'Khouribga, Morocco',
    period: '07/2024',
    description:
      'Developed a recruitment and communication website for OCP using HTML, CSS, PHP, and JavaScript. Integrated a "Careers" section and an interactive contact form.',
    logo: 'ocp.png'
  }
];

const education = [
  {
    degree: 'Information Technology Training',
    school: 'École Supérieure de Technologie (EST)',
    location: 'Meknès, Morocco',
    period: '2023 – 2025',
    description:
      'Specialized training in web development, information technologies, and multimedia. Mastery of modern frameworks and agile methodologies.',
    icon: '🎓'
  },
  {
    degree: 'Baccalaureate in Physical Sciences',
    school: 'Lycée Imam Malek',
    location: 'Khouribga, Morocco',
    period: '2022 - 2023',
    description:
      'Secondary school diploma with a specialization in physical sciences and mathematics.',
    icon: '📚'
  }
];

const ExperienceEducation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState('');

  const openPhotoModal = (photoUrl: string) => {
    setSelectedPhoto(photoUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPhoto('');
  };

  // ✅ ESC key closes modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    if (isModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen]);

  return (
    <section id="experience" className="exp-edu-section">
      <div className="exp-edu-container">
        <div className="exp-edu-header">
          <span className="exp-edu-line"></span>
          <h2>EXPERIENCE & EDUCATION</h2>
          <span className="exp-edu-line"></span>
        </div>

        <div className="exp-edu-columns">
          {/* Experience */}
          <div className="exp-edu-half">
            <h3 className="exp-edu-subtitle">Experience</h3>
            {experiences.map((exp, idx) => (
              <div key={idx} className="exp-edu-item">
                <div className="exp-edu-item-content">
                  <div className="exp-edu-logo-company">
                    <div className="exp-edu-logo-wrapper">
                      <div className="exp-edu-logo-container">
                        <img src={exp.logo} alt={exp.company} className="exp-edu-logo" />
                      </div>
                    </div>
                    <div className="company-info">
                      <span className="exp-edu-company">{exp.company}</span>
                      <div className="exp-edu-role">{exp.role}</div>
                      <div className="exp-edu-meta">
                        <span className="exp-edu-location">{exp.location}</span>
                        <span>•</span>
                        <span className="exp-edu-period">{exp.period}</span>
                      </div>
                    </div>
                  </div>
                  <div className="exp-edu-description">{exp.description}</div>
                  {exp.hasPhoto && (
                    <button className="view-photo-btn" onClick={() => openPhotoModal(exp.photoUrl)}>
                      <svg fill="currentColor" viewBox="0 0 20 20" width="16" height="16">
                        <path
                          fillRule="evenodd"
                          d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      View Photo
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Education */}
          <div className="exp-edu-half">
            <h3 className="exp-edu-subtitle">Education</h3>
            {education.map((edu, idx) => (
              <div key={idx} className="exp-edu-item">
                <div className="exp-edu-item-content">
                  <div className="exp-edu-logo-company">
                    <div className="exp-edu-icon">{edu.icon}</div>
                    <div className="company-info">
                      <span className="exp-edu-school">{edu.school}</span>
                      <div className="exp-edu-degree">{edu.degree}</div>
                      <div className="exp-edu-meta">
                        <span className="exp-edu-location">{edu.location}</span>
                        <span>•</span>
                        <span className="exp-edu-period">{edu.period}</span>
                      </div>
                    </div>
                  </div>
                  <div className="exp-edu-description">{edu.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="photo-modal-overlay" onClick={closeModal}>
          <div className="photo-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="photo-modal-close" onClick={closeModal}>
              <svg fill="currentColor" viewBox="0 0 20 20" width="24" height="24">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <img src={selectedPhoto} alt="Experience Photo" className="photo-modal-image" />
          </div>
        </div>
      )}
    </section>
  );
};

export default ExperienceEducation;
