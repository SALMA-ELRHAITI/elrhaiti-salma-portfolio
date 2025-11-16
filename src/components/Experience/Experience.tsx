import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Calendar, Briefcase, GraduationCap, Award, ExternalLink } from 'lucide-react';

interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  period: string;
  description: string;
  logo: string;
  isCurrent?: boolean;
  skills?: string[];
  exerciseImage?: string;
  hasExercises?: boolean;
}

interface EducationItem {
  degree: string;
  school: string;
  location: string;
  period: string;
  description: string;
  logo?: string;
  icon?: React.ReactNode;
  skills?: string[];
}

const experiences: ExperienceItem[] = [
  {
    role: 'Apprenante – Piscine 1337',
    company: '1337 Coding School',
    location: 'Khouribga, Morocco',
    period: '07/2025',
    description: 'Intensive 4-week coding bootcamp focused on C programming, Shell scripting, and Linux systems. Completed multiple projects including C libraries, shell implementations, and algorithmic challenges.',
    logo: '/images/mein1337.png',
    exerciseImage: '/images/exp1337.jpg',
    hasExercises: true,
    skills: ['C Programming', 'Shell Scripting', 'Linux', 'Algorithms', 'Git']
  },
  {
    role: 'Full Stack Development Intern',
    company: 'Logicat',
    location: 'Meknès, Morocco',
    period: '03/2025 - 05/2025',
    description: 'Led the development of EduVerse educational platform using modern web technologies. Implemented responsive UI components with React.js and TypeScript, designed RESTful APIs with Laravel.',
    logo: '/images/logicat.png',
    skills: ['React.js', 'TypeScript', 'Laravel', 'MySQL', 'REST API']
  },
  {
    role: 'Web Development Intern',
    company: 'Agence WebDono',
    location: 'Meknès, Morocco',
    period: '04/2025',
    description: 'Designed and developed custom WordPress websites for diverse client portfolios using Divi builder. Implemented multilingual support, optimized website performance, and improved SEO rankings.',
    logo: '/images/webdonoo.png',
    skills: ['WordPress', 'Divi Builder','SEO']
  },
  {
    role: 'IT Service Intern',
    company: 'OCP Group',
    location: 'Khouribga, Morocco',
    period: '07/2024',
    description: 'Developed a comprehensive recruitment and corporate communication platform for OCP Group. Built dynamic web interfaces with HTML5, CSS3, and JavaScript, implemented backend functionality with PHP.',
    logo: '/images/ocp.png',
    skills: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'Bootstrap']
  }
];

const education: EducationItem[] = [
  {
    degree: 'Parcours d\'Excellence - Licence d\'Excellence en ISOC',
    school: 'Faculté des Sciences Meknès',
    location: 'Meknès, Morocco',
    period: '2025 – 2028',
    description: 'Specialized program in Internet of Things (IoT) Security and Connected Devices Intelligence. Comprehensive curriculum covering cybersecurity principles, network security protocols, and embedded systems programming.',
    logo: '/images/fs.png',
    skills: ['IoT Security', 'Cybersecurity', 'Embedded Systems', 'Network Security']
  },
  {
    degree: 'Information Technology Training',
    school: 'École Supérieure de Technologie (EST)',
    location: 'Meknès, Morocco',
    period: '2023 – 2025',
    description: 'Comprehensive technical education in web development, software engineering, and multimedia technologies. Mastered modern development frameworks, database management systems, and agile project methodologies.',
    logo: '/images/est.png',
    skills: ['Full Stack Development','Web Technologies','Database Management','Agile Methodology','Multimedia Integration']
  },
  {
    degree: 'Baccalaureate in Physical Sciences',
    school: 'Lycée Imam Malek',
    location: 'Khouribga, Morocco',
    period: '2022 - 2023',
    description: 'Secondary education with specialization in physical sciences and mathematics. Developed strong analytical and problem-solving skills through rigorous curriculum.',
    icon: <Award size={20} style={{ color: '#d4af37' }} />,
    skills: ['Mathematics', 'Physics', 'Chemistry', 'Problem Solving']
  }
];

const ExperienceEducation: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'professional' | 'academic'>('professional');
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = itemRefs.current.indexOf(entry.target as HTMLDivElement);
            if (index !== -1 && !visibleItems.includes(index)) {
              setTimeout(() => {
                setVisibleItems((prev) => [...prev, index]);
              }, index * 80);
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: '-30px' }
    );

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [visibleItems, activeTab]);

  const handleTabChange = (tab: 'professional' | 'academic') => {
    setActiveTab(tab);
    setVisibleItems([]);
  };

  const openModal = (imageSrc: string) => {
    setSelectedImage(imageSrc);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedImage('');
  };

  // Add ESC key to close modal
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showModal) {
        closeModal();
      }
    };

    if (showModal) {
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [showModal]);

  return (
    <>
      <section id="experience" style={{
        minHeight: '100vh',
        background: '#000000',
        padding: '5rem 1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '1000px', width: '100%', position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            marginBottom: '3rem'
          }}>
            <span style={{
              height: '1px',
              width: '60px',
              background: '#d4af37'
            }}></span>
            <h2 style={{
              fontSize: '0.9rem',
              letterSpacing: '0.3em',
              color: '#d4af37',
              fontWeight: 400,
              margin: 0,
              textTransform: 'uppercase'
            }}>EXPERIENCE & EDUCATION</h2>
            <span style={{
              height: '1px',
              width: '60px',
              background: '#d4af37'
            }}></span>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '3rem',
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: '8px',
            padding: '0.25rem',
            maxWidth: '280px',
            marginLeft: 'auto',
            marginRight: 'auto',
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              top: '0.25rem',
              left: activeTab === 'academic' ? 'calc(50% + 0.25rem)' : '0.25rem',
              width: 'calc(50% - 0.25rem)',
              height: 'calc(100% - 0.5rem)',
              background: 'rgba(212, 175, 55, 0.15)',
              borderRadius: '6px',
              transition: 'left 0.3s ease',
              zIndex: 1
            }}></div>
            <button 
              onClick={() => handleTabChange('professional')}
              style={{
                flex: 1,
                padding: '0.5rem 0.75rem',
                background: 'transparent',
                border: 'none',
                color: activeTab === 'professional' ? '#d4af37' : '#71717a',
                fontSize: '0.8rem',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'color 0.3s ease',
                position: 'relative',
                zIndex: 2,
                borderRadius: '6px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.35rem'
              }}
            >
              <Briefcase size={13} />
              Professional
            </button>
            <button 
              onClick={() => handleTabChange('academic')}
              style={{
                flex: 1,
                padding: '0.5rem 0.75rem',
                background: 'transparent',
                border: 'none',
                color: activeTab === 'academic' ? '#d4af37' : '#71717a',
                fontSize: '0.8rem',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'color 0.3s ease',
                position: 'relative',
                zIndex: 2,
                borderRadius: '6px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.35rem'
              }}
            >
              <GraduationCap size={13} />
              Academic
            </button>
          </div>

          <div style={{ position: 'relative', minHeight: '500px' }}>
            <div style={{
              position: activeTab === 'professional' ? 'relative' : 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              opacity: activeTab === 'professional' ? 1 : 0,
              transform: activeTab === 'professional' ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              pointerEvents: activeTab === 'professional' ? 'all' : 'none'
            }}>
              {experiences.map((exp, idx) => (
                <div 
                  key={idx}
                  ref={(el) => { itemRefs.current[idx] = el; }}
                  style={{
                    background: 'transparent',
                    borderRadius: 0,
                    padding: '1.5rem 0',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                    transition: 'all 0.3s ease',
                    opacity: visibleItems.includes(idx) ? 1 : 0,
                    transform: visibleItems.includes(idx) ? 'translateY(0)' : 'translateY(20px)',
                    position: 'relative',
                    marginBottom: 0
                  }}
                >
                  <div style={{ position: 'relative' }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '1rem',
                      marginBottom: '0.75rem'
                    }}>
                      <div style={{
                        width: '2.5rem',
                        height: '2.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        borderRadius: '4px',
                        opacity: 0.9
                      }}>
                        <img 
                          src={exp.logo} 
                          alt={exp.company}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            borderRadius: '4px'
                          }}
                        />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                          <span style={{
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            color: '#d4af37',
                            display: 'block',
                            marginBottom: '0.25rem',
                            transition: 'color 0.3s ease'
                          }}>{exp.company}</span>
                          {exp.isCurrent && (
                            <span style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.25rem',
                              padding: '0.2rem 0.4rem',
                              background: 'rgba(212, 175, 55, 0.12)',
                              borderRadius: '3px',
                              fontSize: '0.65rem',
                              fontWeight: 500,
                              color: '#d4af37',
                              marginLeft: '0.5rem'
                            }}>Current</span>
                          )}
                        </div>
                        <div style={{
                          fontSize: '1.1rem',
                          fontWeight: 600,
                          color: '#ffffff',
                          marginBottom: '0.5rem',
                          lineHeight: 1.3,
                          transition: 'color 0.3s ease'
                        }}>{exp.role}</div>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1rem',
                          fontSize: '0.8rem',
                          color: '#a1a1aa',
                          marginBottom: '0.5rem'
                        }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <MapPin size={12} />
                            {exp.location}
                          </span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <Calendar size={12} />
                            {exp.period}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div style={{
                      fontSize: '0.9rem',
                      lineHeight: 1.6,
                      color: '#d4d4d8',
                      marginTop: '0.5rem'
                    }}>{exp.description}</div>
                    
                    {exp.skills && (
                      <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '0.4rem',
                        marginTop: '0.75rem'
                      }}>
                        {exp.skills.map((skill, skillIdx) => (
                          <span key={skillIdx} style={{
                            padding: '0.25rem 0.5rem',
                            background: 'rgba(212, 175, 55, 0.08)',
                            borderRadius: '4px',
                            fontSize: '0.7rem',
                            color: '#d4af37',
                            opacity: 0.8
                          }}>
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}

                    {exp.hasExercises && exp.exerciseImage && (
                      <div style={{ marginTop: '1rem' }}>
                        <button
                          onClick={() => openModal(exp.exerciseImage!)}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.6rem 1rem',
                            background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(212, 175, 55, 0.05) 100%)',
                            border: '1px solid rgba(212, 175, 55, 0.3)',
                            borderRadius: '6px',
                            color: '#d4af37',
                            fontSize: '0.85rem',
                            fontWeight: 500,
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            fontFamily: 'inherit'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(212, 175, 55, 0.08) 100%)';
                            e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.5)';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(212, 175, 55, 0.05) 100%)';
                            e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.3)';
                            e.currentTarget.style.transform = 'translateY(0)';
                          }}
                        >
                          <ExternalLink size={16} />
                          View My 1337 Journey
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              position: activeTab === 'academic' ? 'relative' : 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              opacity: activeTab === 'academic' ? 1 : 0,
              transform: activeTab === 'academic' ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              pointerEvents: activeTab === 'academic' ? 'all' : 'none'
            }}>
              {education.map((edu, idx) => (
                <div 
                  key={idx}
                  ref={(el) => { itemRefs.current[experiences.length + idx] = el; }}
                  style={{
                    background: 'transparent',
                    borderRadius: 0,
                    padding: '1.5rem 0',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                    transition: 'all 0.3s ease',
                    opacity: visibleItems.includes(experiences.length + idx) ? 1 : 0,
                    transform: visibleItems.includes(experiences.length + idx) ? 'translateY(0)' : 'translateY(20px)',
                    position: 'relative',
                    marginBottom: 0
                  }}
                >
                  <div style={{ position: 'relative' }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '1rem',
                      marginBottom: '0.75rem'
                    }}>
                      {edu.logo ? (
                        <div style={{
                          width: '2.5rem',
                          height: '2.5rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          borderRadius: '4px',
                          opacity: 0.9
                        }}>
                          <img 
                            src={edu.logo} 
                            alt={edu.school}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'contain',
                              borderRadius: '4px'
                            }}
                          />
                        </div>
                      ) : (
                        <div style={{
                          width: '2.5rem',
                          height: '2.5rem',
                          borderRadius: '4px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          color: '#d4af37',
                          opacity: 0.7
                        }}>
                          {edu.icon}
                        </div>
                      )}
                      <div style={{ flex: 1 }}>
                        <span style={{
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          color: '#d4af37',
                          display: 'block',
                          marginBottom: '0.25rem',
                          transition: 'color 0.3s ease'
                        }}>{edu.school}</span>
                        <div style={{
                          fontSize: '1.1rem',
                          fontWeight: 600,
                          color: '#ffffff',
                          marginBottom: '0.5rem',
                          lineHeight: 1.3,
                          transition: 'color 0.3s ease'
                        }}>{edu.degree}</div>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1rem',
                          fontSize: '0.8rem',
                          color: '#a1a1aa',
                          marginBottom: '0.5rem'
                        }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <MapPin size={12} />
                            {edu.location}
                          </span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <Calendar size={12} />
                            {edu.period}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div style={{
                      fontSize: '0.9rem',
                      lineHeight: 1.6,
                      color: '#d4d4d8',
                      marginTop: '0.5rem'
                    }}>{edu.description}</div>
                    
                    {edu.skills && (
                      <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '0.4rem',
                        marginTop: '0.75rem'
                      }}>
                        {edu.skills.map((skill, skillIdx) => (
                          <span key={skillIdx} style={{
                            padding: '0.25rem 0.5rem',
                            background: 'rgba(212, 175, 55, 0.08)',
                            borderRadius: '4px',
                            fontSize: '0.7rem',
                            color: '#d4af37',
                            opacity: 0.8
                          }}>
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {showModal && (
        <div
          onClick={closeModal}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.95)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '2rem',
            cursor: 'pointer',
            animation: 'fadeIn 0.3s ease-out'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '70%',
              maxHeight: '70%',
              position: 'relative',
              cursor: 'default',
              animation: 'scaleIn 0.3s ease-out'
            }}
          >
            <button
              onClick={closeModal}
              style={{
                position: 'absolute',
                top: '-3rem',
                right: '0',
                background: 'rgba(212, 175, 55, 0.1)',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                borderRadius: '50%',
                width: '2.5rem',
                height: '2.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#d4af37',
                fontSize: '1.5rem',
                fontWeight: 300,
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(212, 175, 55, 0.2)';
                e.currentTarget.style.transform = 'rotate(90deg)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(212, 175, 55, 0.1)';
                e.currentTarget.style.transform = 'rotate(0deg)';
              }}
            >
              ×
            </button>
            <img
              src={selectedImage}
              alt="1337 Exercises"
              style={{
                maxWidth: '100%',
                maxHeight: '65vh',
                width: 'auto',
                height: 'auto',
                objectFit: 'contain',
                borderRadius: '8px',
                border: '2px solid rgba(212, 175, 55, 0.3)'
              }}
            />
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @media (max-width: 768px) {
          .modal-container {
            max-width: 95% !important;
            max-height: 80% !important;
          }
          
          .modal-image {
            max-height: 60vh !important;
          }
        }
      `}</style>
    </>
  );
};

export default ExperienceEducation;