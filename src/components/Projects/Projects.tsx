import React, { useState, useEffect, useRef } from 'react';
import { X, ExternalLink, Github, Calendar, Tag } from 'lucide-react';
import './Projects.css';

interface Technology {
  name: string;
  icon: string;
  color: string;
}

interface ProjectMetric {
  label: string;
  value: string;
  icon: string;
}

interface ProjectTimeline {
  start: string;
  end: string;
  duration: string;
}

interface Project {
  id: number;
  image: string;
  category: string;
  title: string;
  link: string;
  github: string | null;
  date: string;
  tags: string[];
  description: string;
  features: string[];
  screenshots: string[];
  scrollable?: boolean;
  techStack?: Technology[];
  metrics?: ProjectMetric[];
  timeline?: ProjectTimeline;
  impact?: string;
}

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const projects: Project[] = [
  {
    id: 1,
    image: "/images/osishotel.jpg",
    category: "Web Application",
    title: "Hotel Management System with QR Code Integration",
    link: "#",
    github: "#",
    date: "2025",
    tags: ["HTML", "CSS", "JavaScript", "QR Code", "PHP"],
    description: "A modern web-based hotel management platform that revolutionizes guest experiences through innovative QR code technology. This comprehensive system digitizes the entire hotel operation workflow - from initial booking to final checkout - enabling contactless interactions, streamlined staff operations, and enhanced guest satisfaction. Built with a focus on efficiency and user experience, it provides hotel administrators with powerful tools to manage reservations, monitor room status in real-time, and deliver exceptional service while reducing operational overhead.",
    features: [
      "QR code-powered contactless check-in/check-out for enhanced safety and convenience",
      "Intelligent reservation system with real-time room availability tracking and instant booking confirmation",
      "Comprehensive guest management dashboard with booking history, preferences, and personalized service options",
      "Automated billing engine with multiple payment methods, invoice generation, and financial reporting",
      "Dynamic room status management (available, occupied, cleaning, maintenance) with visual dashboard",
      "Digital room service ordering system accessible via QR codes in guest rooms",
      "Staff coordination panel for housekeeping schedules, maintenance requests, and task assignment",
      "Guest authentication and secure access control using unique QR codes",
      "Analytics and reporting module for occupancy rates, revenue tracking, and performance insights"
    ],
    screenshots: [
      "/images/hotel.png",
      "/images/hotel-dashboard.png",
      "/images/hotel-booking.png",
      "/images/hotel-qr.png"
    ],
    scrollable: true
  },
  {
    id: 2,
    image: "/images/school.png",
    category: "Full-Stack Web Application",
    title: "EduVerse – School Management System for Technical High Schools",
    link: "#",
    github: "#",
    date: "2025",
    tags: ["React.js", "Laravel", "MySQL", "REST API", "Role-Based Access"],
    description: "EduVerse is a comprehensive web application designed to optimize school management for technical high schools, particularly those offering specialized programs like mechanical engineering studies. Built with Laravel, React.js, and MySQL, this platform streamlines daily administrative and academic tasks through an intuitive interface and a secure role-based access system (administrators, teachers, students, parents). The goal is to foster smooth collaboration between educational staff, students, and families while modernizing school processes for an efficient, contemporary learning environment adapted to technical training needs.",
    features: [
      "Role-based authentication system with secure access control for administrators, teachers, students, and parents",
      "Advanced attendance management with automated tracking, real-time notifications, and absence reports",
      "Comprehensive grade tracking system with report card generation, academic progress monitoring, and performance analytics",
      "Dynamic timetable and schedule management optimized for technical program requirements and specialized workshops",
      "Assignment submission portal with deadline tracking, grading interface, and feedback system for teachers",
      "Internal communication system enabling seamless interaction between all educational stakeholders",
      "Student enrollment and comprehensive profile management with specialized program tracking",
      "Parent dashboard with real-time access to their child's academic progress, attendance records, and school announcements",
      "Responsive interface designed to meet the specific needs of technical educational institutions",
      "Administrative tools for resource management, classroom allocation, and facility scheduling for technical workshops"
    ],
    screenshots: [
      "/images/login.png",
      "/images/loginteach.png",
      "/images/dashadmin.png",
      "/images/attadmin.png",
      "/images/dashstudent.png"
    ]
  },
  {
    id: 3,
    image: "/images/estmmax.jpg",
    category: "3D Visualization & Virtual Tour",
    title: "Interactive 3D Tour of EST Meknès with Camera Navigation",
    link: "#",
    github: "#",
    date: "2024",
    tags: ["3ds Max", "3D Modeling", "Virtual Reality"],
    description: "An immersive 3D virtual tour of EST Meknès campus featuring realistic environment mapping, interactive hotspots, and smooth camera navigation. Users can explore different buildings, classrooms, and facilities from their browser, providing prospective students and visitors with an engaging way to discover the campus without physically being there.",
    features: [
      "Fully interactive 3D campus environment with realistic textures and lighting",
      "Smooth camera controls and navigation system for seamless exploration",
      "Interactive information hotspots providing details about facilities and departments",
      "360° panoramic views of key locations including classrooms, labs, and common areas",
      "Optimized for web performance with efficient asset loading and rendering",
      "Mobile-responsive controls for exploration on smartphones and tablets"
    ],
    screenshots: [
      "/images/fullmax.png",
      "/images/spacemax.png"
    ]
  },
  {
    id: 4,
    image: "/images/themedivi1.png",
    category: "Frontend Web Project / WordPress with Divi Theme",
    title: "Cultural Immersion Experience in a Berber Village - Atlas Mountains",
    link: "https://morocclytravel.com/cultural-immersion-a-day-in-the-life-of-a-berber-village/",
    github: null,
    date: "2024",
    tags: ["WordPress", "Divi", "Custom Modules", "SEO"],
    description: "A beautifully designed landing page showcasing authentic Berber cultural experiences in the Atlas Mountains. The site features stunning photography, engaging storytelling, and smooth animations to transport visitors to Morocco. This project demonstrates expertise in WordPress development and the Divi theme builder, creating an immersive digital experience that captures the essence of traditional Berber village life.",
    features: [
      "Custom Divi modules and layouts tailored for cultural storytelling",
      "Responsive image galleries showcasing authentic village experiences",
      "Smooth scroll animations that enhance the narrative flow",
      "SEO optimization for improved search engine visibility and organic traffic",
      "Fast loading performance with optimized images and efficient code",
      "Integrated booking system for seamless travel experience reservations"
    ],
    screenshots: [
      "/images/fulldivi2.png"
    ],
    scrollable: true
  },
  {
    id: 5,
    image: "/images/gamekids.png",
    category: "Educational Mobile Application",
    title: "Code & Adventure: Learn HTML & CSS Through Play",
    link: "#",
    github: "#",
    date: "2024",
    tags: ["Ionic", "React", "Tailwind CSS", "JavaScript", "Education"],
    description: "Code & Adventure is an innovative web-based educational game designed for children aged 6-12 to learn HTML and CSS fundamentals while developing problem-solving skills. Built with Ionic, React, and Tailwind CSS, the game features interactive levels, a creative sandbox mode, and playful challenges that teach programming logic in a fun, accessible, and age-appropriate way. The platform gamifies coding education, making it engaging for young learners to build their first websites.",
    features: [
      "Level-based progression system with gradually increasing difficulty and complexity",
      "Problem-solving gameplay that teaches HTML structure and CSS styling concepts",
      "Interactive coding challenges with real-time visual feedback on code changes",
      "Creative mode allowing kids to build their own web pages and experiment freely",
      "Built with modern technologies: Ionic framework and React for cross-platform compatibility",
      "Kid-friendly interface with colorful design, intuitive controls, and helpful hints",
      "Achievement system with badges and rewards to motivate continued learning and progress"
    ],
    screenshots: [
      "/images/codeapp.png",
      "/images/appnv1.png",
      "/images/kidshtml.png"
    ]
  },
  {
    id: 6,
    image: "/images/themedivi.png",
    category: "Frontend Web Project / WordPress with Divi Theme",
    title: "Morocco's Festivals and Traditions: A Deep Dive into Cultural Celebrations",
    link: "https://inmoroccotrips.com/moroccos-festivals-and-traditions-a-deep-dive-into-cultural-celebrations/",
    github: null,
    date: "2024",
    tags: ["WordPress", "Divi", "Editorial Design", "Media Integration"],
    description: "An immersive editorial experience exploring Morocco's rich cultural heritage through its vibrant festivals and traditions. This project features interactive elements, rich media content including videos and photo galleries, and engaging storytelling that brings Moroccan celebrations to life. The responsive design ensures an optimal viewing experience across all devices while maintaining cultural authenticity.",
    features: [
      "Custom WordPress theme development with Divi builder customization",
      "Interactive timeline layouts showcasing festival calendars and historical context",
      "Video integration with embedded content from various celebrations and cultural events",
      "Mobile-first design approach ensuring accessibility on all devices and screen sizes",
      "Performance optimization for fast loading despite rich media content",
      "Social media integration for easy sharing and increased engagement with cultural content"
    ],
    screenshots: [
      "/images/fulldivi.png"
    ],
    scrollable: true
  }
];

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [currentScreenshot, setCurrentScreenshot] = useState<number>(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const screenshotContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  useEffect(() => {
    if (project.screenshots.length > 1 && !project.scrollable) {
      const interval = setInterval(() => {
        setCurrentScreenshot((prev) => (prev + 1) % project.screenshots.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [project.screenshots.length, project.scrollable]);

  const demonstrateScroll = () => {
    if (screenshotContainerRef.current && project.scrollable && !isScrolling) {
      setIsScrolling(true);
      const container = screenshotContainerRef.current;
      const scrollHeight = container.scrollHeight - container.clientHeight;
      
      // Smooth scroll to bottom
      container.scrollTo({
        top: scrollHeight,
        behavior: 'smooth'
      });

      // Scroll back to top after a delay
      setTimeout(() => {
        container.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        setTimeout(() => setIsScrolling(false), 1000);
      }, 2000);
    }
  };

  return (
    <div className={`modal-overlay ${isVisible ? 'visible' : ''}`} onClick={handleClose}>
      <div 
        ref={modalRef}
        className={`modal-content ${isVisible ? 'visible' : ''}`} 
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={handleClose} aria-label="Close modal">
          <X size={28} strokeWidth={2} />
        </button>

        <div className="modal-grid">
          {/* Left side - Laptop mockup with screenshots */}
          <div className="modal-laptop-section">
            <div className="laptop-mockup">
              <div className="laptop-screen">
                <div 
                  className="screenshot-container"
                  ref={screenshotContainerRef}
                  onClick={project.scrollable ? demonstrateScroll : undefined}
                  style={{ cursor: project.scrollable ? 'pointer' : 'default' }}
                  title={project.scrollable ? "Click to see scroll demonstration" : ""}
                >
                  {project.scrollable ? (
                    <div className="screenshot-content">
                      <img 
                        src={project.screenshots[currentScreenshot]} 
                        alt={`${project.title} screenshot ${currentScreenshot + 1}`}
                        className="screenshot-scrollable"
                      />
                    </div>
                  ) : (
                    <img 
                      src={project.screenshots[currentScreenshot]} 
                      alt={`${project.title} screenshot ${currentScreenshot + 1}`}
                      className="screenshot-image"
                    />
                  )}
                </div>
                {project.screenshots.length > 1 && (
                  <div className="screenshot-dots">
                    {project.screenshots.map((_, idx) => (
                      <button
                        key={idx}
                        className={`dot ${idx === currentScreenshot ? 'active' : ''}`}
                        onClick={() => setCurrentScreenshot(idx)}
                        aria-label={`View screenshot ${idx + 1}`}
                      />
                    ))}
                  </div>
                )}
                {project.scrollable && (
                  <div className="scroll-hint">
                    Click on the screen to see scroll demonstration
                  </div>
                )}
              </div>
              <div className="laptop-base"></div>
              <div className="laptop-notch"></div>
            </div>
          </div>

          {/* Right side - Project details */}
          <div className="modal-details-section">
            <div className="modal-details-scroll">
              <span className="modal-category">{project.category}</span>
              <h2 className="modal-title">{project.title}</h2>
              
              <div className="modal-meta">
                <div className="meta-item">
                  <Calendar size={16} />
                  <span>{project.date}</span>
                </div>
              </div>

              <div className="modal-tags">
                {project.tags.map((tag, idx) => (
                  <span key={idx} className="tag">
                    <Tag size={14} />
                    {tag}
                  </span>
                ))}
              </div>

              <div className="modal-description">
                <h3>About the Project</h3>
                <p>{project.description}</p>
              </div>

              {project.techStack && (
                <div className="modal-tech-stack">
                  <h3>Technologies Used</h3>
                  <div className="tech-grid">
                    {project.techStack.map((tech, idx) => (
                      <div 
                        key={idx} 
                        className="tech-item"
                        style={{ '--tech-color': tech.color } as React.CSSProperties}
                      >
                        <img src={tech.icon} alt={tech.name} className="tech-icon" />
                        <span className="tech-name">{tech.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {project.metrics && (
                <div className="modal-metrics">
                  <h3>Project Impact</h3>
                  <div className="metrics-grid">
                    {project.metrics.map((metric, idx) => (
                      <div key={idx} className="metric-card">
                        <span className="metric-icon">{metric.icon}</span>
                        <span className="metric-value">{metric.value}</span>
                        <span className="metric-label">{metric.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="modal-features">
                <h3>Key Features</h3>
                <ul>
                  {project.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>

              {project.timeline && (
                <div className="modal-timeline">
                  <h3>Project Timeline</h3>
                  <div className="timeline-info">
                    <div className="timeline-dates">
                      <span>{project.timeline.start}</span>
                      <span className="timeline-arrow">→</span>
                      <span>{project.timeline.end}</span>
                    </div>
                    <div className="timeline-duration">
                      Duration: {project.timeline.duration}
                    </div>
                  </div>
                </div>
              )}

              {project.impact && (
                <div className="modal-impact">
                  <h3>Project Impact</h3>
                  <p>{project.impact}</p>
                </div>
              )}

              <div className="modal-actions">
                {project.link && project.link !== "#" && (
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="action-button primary"
                  >
                    <ExternalLink size={18} />
                    Visit Live Site
                  </a>
                )}
                {project.github && project.github !== "#" && (
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="action-button secondary"
                  >
                    <Github size={18} />
                    View Code
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [visibleProjects, setVisibleProjects] = useState<number[]>([]);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = projectRefs.current.indexOf(entry.target as HTMLDivElement);
            if (index !== -1 && !visibleProjects.includes(index)) {
              setVisibleProjects((prev) => [...prev, index]);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    projectRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [visibleProjects]);

  return (
    <>
      <section className="projects-section" id="projects">
        <div className="projects-container">
          <div className="projects-header">
            <div className="projects-line"></div>
            <h2>PROJECTS</h2>
          </div>

          <div className="projects-list-grid">
            {projects.map((project, index) => (
              <div 
                key={project.id}
                ref={(el: HTMLDivElement | null) => {
                  if (projectRefs.current) {
                    projectRefs.current[index] = el;
                  }
                }}
                className={`project-grid-card ${visibleProjects.includes(index) ? 'visible' : ''}`}
                style={{ transitionDelay: `${(index % 2) * 0.1}s` }}
              >
                <div 
                  className="project-image-wrapper"
                  onClick={() => setSelectedProject(project)}
                  role="button"
                  tabIndex={0}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setSelectedProject(project);
                    }
                  }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="project-image"
                  />
                  <div className="project-overlay">
                    <span className="view-details">View Details</span>
                  </div>
                </div>

                <div className="project-info">
                  <span className="project-category">{project.category}</span>
                  <h3 className="project-title">{project.title}</h3>
                  <div className="project-tags-preview">
                    {project.tags.slice(0, 3).map((tag, idx) => (
                      <span key={idx} className="tag-preview">{tag}</span>
                    ))}
                  </div>
                  {project.link !== "#" ? (
                    <a 
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                      onClick={(e) => e.stopPropagation()}
                    >
                      View Project ↗
                    </a>
                  ) : (
                    <span className="project-link-disabled">
                      Coming Soon
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </>
  );
};

export default Projects;