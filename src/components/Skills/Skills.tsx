import React, { useRef, useState } from "react";
import "./Skills.css";
import { 
  SiTypescript, 
  SiPhp, 
  SiReact, 
  SiHtml5, 
  SiCss3, 
  SiNodedotjs, 
  SiLaravel, 
  SiMysql, 
  SiTailwindcss, 
  SiAndroid,
  SiC,
  SiGit,
  SiGithub,
  SiLinux,
  SiWordpress,
  SiAdobephotoshop,
  SiAutodesk
} from "react-icons/si";
import { FaChevronLeft, FaChevronRight, FaProjectDiagram } from "react-icons/fa";

const Skills: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollContentRef = useRef<HTMLDivElement>(null);
  const [isAutoScroll, setIsAutoScroll] = useState(true);

  const technologies = [
    // Languages
    { name: "TypeScript", icon: <SiTypescript />, color: "#3178C6", category: "Language" },
    { name: "PHP", icon: <SiPhp />, color: "#777BB4", category: "Language" },
    { name: "C", icon: <SiC />, color: "#A8B9CC", category: "Language" },

    // Frontend
    { name: "React", icon: <SiReact />, color: "#61DAFB", category: "Frontend" },
    { name: "HTML5", icon: <SiHtml5 />, color: "#E34F26", category: "Frontend" },
    { name: "CSS3", icon: <SiCss3 />, color: "#1572B6", category: "Frontend" },
    { name: "Tailwind", icon: <SiTailwindcss />, color: "#06B6D4", category: "Frontend" },

    // Backend
    { name: "Laravel", icon: <SiLaravel />, color: "#FF2D20", category: "Backend" },

    // Database
    { name: "MySQL", icon: <SiMysql />, color: "#4479A1", category: "Database" },

    // Mobile
    { name: "Android SDK (Java)", icon: <SiAndroid />, color: "#3DDC84", category: "Mobile" },

    // Tools
    { name: "Git", icon: <SiGit />, color: "#F05032", category: "Tool" },
    { name: "GitHub", icon: <SiGithub />, color: "#181717", category: "Tool" },
    { name: "Linux CLI", icon: <SiLinux />, color: "#FCC624", category: "Tool" },

    // CMS
    { name: "WordPress", icon: <SiWordpress />, color: "#21759B", category: "CMS" },

    // Methodology
    { name: "UML", icon: <FaProjectDiagram />, color: "#d4af37", category: "Methodology" },
    { name: "Merise", icon: <FaProjectDiagram />, color: "#d4af37", category: "Methodology" },

    // Design
    { name: "Photoshop", icon: <SiAdobephotoshop />, color: "#31A8FF", category: "Design" },
    { name: "3ds Max", icon: <SiAutodesk />, color: "#0696D7", category: "Design" }
  ];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      setIsAutoScroll(false);
      const scrollAmount = 400;
      const currentScroll = scrollRef.current.scrollLeft;
      const targetScroll = direction === 'left' 
        ? Math.max(0, currentScroll - scrollAmount)
        : currentScroll + scrollAmount;
      
      scrollRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });

      // Re-enable auto-scroll after manual interaction timeout
      setTimeout(() => setIsAutoScroll(true), 5000);
    }
  };

  return (
    <section id="skills" className="skills-section">
      <div className="skills-container">
        <div className="skills-top">
          <div className="skills-header">
            <span className="skills-line"></span>
            <h2>SKILLS & TECHNOLOGIES</h2>
          </div>
          
          <div className="scroll-buttons">
            <button 
              className="scroll-btn" 
              onClick={() => scroll('left')}
              aria-label="Scroll left"
            >
              <FaChevronLeft />
            </button>
            <button 
              className="scroll-btn" 
              onClick={() => scroll('right')}
              aria-label="Scroll right"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
        
        <p className="skills-description">
          I specialize in <span className="highlight">full-stack development</span> delivering scalable web and mobile solutions from responsive frontends to robust backends and native Android apps. My workflow blends modern frameworks, clean architecture, and proven methodologies to build intuitive, multilingual user experiences.
        </p>
        
        <div className="skills-scroll-wrapper" ref={scrollRef}>
          <div 
            ref={scrollContentRef}
            className={`skills-scroll ${isAutoScroll ? 'auto-scroll' : ''}`}
          >
            {technologies.map((tech, index) => (
              <div key={index} className="skill-card">
                <span className="skill-badge">{tech.category}</span>
                <div className="skill-icon" style={{ color: tech.color }}>
                  {tech.icon}
                </div>
                <div className="skill-name">{tech.name}</div>
              </div>
            ))}
            {/* Duplicate for infinite scroll effect */}
            {technologies.map((tech, index) => (
              <div key={`duplicate-${index}`} className="skill-card">
                <span className="skill-badge">{tech.category}</span>
                <div className="skill-icon" style={{ color: tech.color }}>
                  {tech.icon}
                </div>
                <div className="skill-name">{tech.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;