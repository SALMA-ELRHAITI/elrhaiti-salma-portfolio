import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Calendar, Briefcase, GraduationCap, Award } from 'lucide-react';
import './Experience.css';

interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  period: string;
  description: string;
  logo: string;
  isCurrent?: boolean;
  skills?: string[];
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
    logo: 'mein1337.jpg',
    skills: ['C Programming', 'Shell Scripting', 'Linux', 'Algorithms', 'Git']
  },
  {
    role: 'Full Stack Development Intern',
    company: 'Logicat',
    location: 'Meknès, Morocco',
    period: '03/2025 - 05/2025',
    description: 'Led the development of EduVerse educational platform using modern web technologies. Implemented responsive UI components with React.js and TypeScript, designed RESTful APIs with Laravel.',
    logo: 'logicat.png',
    skills: ['React.js', 'TypeScript', 'Laravel', 'MySQL', 'REST API']
  },
  {
    role: 'Web Development Intern',
    company: 'Agence WebDono',
    location: 'Meknès, Morocco',
    period: '04/2025',
    description: 'Designed and developed custom WordPress websites for diverse client portfolios using Divi builder. Implemented multilingual support, optimized website performance, and improved SEO rankings.',
    logo: '/webdonoo.png',
    skills: ['WordPress', 'Divi Builder','SEO']
  },
  {
    role: 'IT Service Intern',
    company: 'OCP Group',
    location: 'Khouribga, Morocco',
    period: '07/2024',
    description: 'Developed a comprehensive recruitment and corporate communication platform for OCP Group. Built dynamic web interfaces with HTML5, CSS3, and JavaScript, implemented backend functionality with PHP.',
    logo: 'ocp.png',
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
    logo: 'fs.png',
    skills: ['IoT Security', 'Cybersecurity', 'Embedded Systems', 'Network Security']
  },
  {
    degree: 'Information Technology Training',
    school: 'École Supérieure de Technologie (EST)',
    location: 'Meknès, Morocco',
    period: '2023 – 2025',
    description: 'Comprehensive technical education in web development, software engineering, and multimedia technologies. Mastered modern development frameworks, database management systems, and agile project methodologies.',
    logo: 'est.png',
    skills: ['Full Stack Development','Web Technologies','Database Management','Agile Methodology','Multimedia Integration']
  },
  {
    degree: 'Baccalaureate in Physical Sciences',
    school: 'Lycée Imam Malek',
    location: 'Khouribga, Morocco',
    period: '2022 - 2023',
    description: 'Secondary education with specialization in physical sciences and mathematics. Developed strong analytical and problem-solving skills through rigorous curriculum.',
    icon: <Award size={20} className="education-symbol" />,
    skills: ['Mathematics', 'Physics', 'Chemistry', 'Problem Solving']
  }
];

const ExperienceEducation: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'professional' | 'academic'>('professional');
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
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

  return (
    <section id="experience" className="exp-edu-section">
      <div className="exp-edu-container">
        <div className="exp-edu-header">
          <span className="exp-edu-line"></span>
          <h2>EXPERIENCE & EDUCATION</h2>
          <span className="exp-edu-line"></span>
        </div>

        <div className="exp-edu-toggle">
          <div className={`toggle-bg ${activeTab === 'academic' ? 'academic' : ''}`}></div>
          <button 
            className={`toggle-btn ${activeTab === 'professional' ? 'active' : ''}`}
            onClick={() => handleTabChange('professional')}
          >
            <Briefcase size={13} />
            Professional
          </button>
          <button 
            className={`toggle-btn ${activeTab === 'academic' ? 'active' : ''}`}
            onClick={() => handleTabChange('academic')}
          >
            <GraduationCap size={13} />
            Academic
          </button>
        </div>

        <div className="exp-edu-content">
          <div className={`exp-edu-column ${activeTab === 'professional' ? 'active' : ''}`}>
            {experiences.map((exp, idx) => (
              <div 
                key={idx}
                ref={(el) => { itemRefs.current[idx] = el; }}
                className={`exp-edu-item ${visibleItems.includes(idx) ? 'visible' : ''}`}
              >
                <div className="exp-edu-item-content">
                  <div className="exp-edu-logo-company">
                    <div className="exp-edu-logo-container">
                      <img 
                        src={exp.logo} 
                        alt={exp.company} 
                        className="exp-edu-logo"
                        loading="lazy"
                      />
                    </div>
                    <div className="company-info">
                      <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                        <span className="exp-edu-company">{exp.company}</span>
                        {exp.isCurrent && (
                          <span className="current-position-badge">Current</span>
                        )}
                      </div>
                      <div className="exp-edu-role">{exp.role}</div>
                      <div className="exp-edu-meta">
                        <span className="exp-edu-location">
                          <MapPin size={12} />
                          {exp.location}
                        </span>
                        <span className="exp-edu-period">
                          <Calendar size={12} />
                          {exp.period}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="exp-edu-description">{exp.description}</div>
                  
                  {exp.skills && (
                    <div className="skills-tags">
                      {exp.skills.map((skill, skillIdx) => (
                        <span key={skillIdx} className="skill-tag">
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className={`exp-edu-column ${activeTab === 'academic' ? 'active' : ''}`}>
            {education.map((edu, idx) => (
              <div 
                key={idx}
                ref={(el) => { itemRefs.current[experiences.length + idx] = el; }}
                className={`exp-edu-item ${visibleItems.includes(experiences.length + idx) ? 'visible' : ''}`}
              >
                <div className="exp-edu-item-content">
                  <div className="exp-edu-logo-company">
                    {edu.logo ? (
                      <div className="exp-edu-logo-container">
                        <img 
                          src={edu.logo} 
                          alt={edu.school} 
                          className="exp-edu-logo"
                          loading="lazy"
                        />
                      </div>
                    ) : (
                      <div className="exp-edu-symbol-container">
                        {edu.icon}
                      </div>
                    )}
                    <div className="company-info">
                      <span className="exp-edu-school">{edu.school}</span>
                      <div className="exp-edu-degree">{edu.degree}</div>
                      <div className="exp-edu-meta">
                        <span className="exp-edu-location">
                          <MapPin size={12} />
                          {edu.location}
                        </span>
                        <span className="exp-edu-period">
                          <Calendar size={12} />
                          {edu.period}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="exp-edu-description">{edu.description}</div>
                  
                  {edu.skills && (
                    <div className="skills-tags">
                      {edu.skills.map((skill, skillIdx) => (
                        <span key={skillIdx} className="skill-tag">
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
  );
};

export default ExperienceEducation;