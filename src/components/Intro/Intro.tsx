import React, { useEffect, useRef, useState } from 'react';
import './Intro.css';

interface ParticleProps {
  x: number;
  y: number;
  delay: number;
  duration: number;
  type: number;
}

interface CodeColumn {
  left: number;
  delay: number;
  duration: number;
  text: string;
}

const Intro: React.FC = () => {
  const [particles, setParticles] = useState<ParticleProps[]>([]);
  const [codeColumns, setCodeColumns] = useState<CodeColumn[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [typedTexts, setTypedTexts] = useState(['', '', '']);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Typewriter words for each line
  const lines = ['FULLSTACK','& MULTIMEDIA', 'DEVELOPER'];
  const typingSpeed = 150;
  const deletingSpeed = 100;
  const pauseDuration = 2000;

  // Typewriter effect
  useEffect(() => {
    const currentLine = lines[currentLineIndex];
    const currentTexts = [...typedTexts];
    
    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Typing current line
        if (currentTexts[currentLineIndex].length < currentLine.length) {
          currentTexts[currentLineIndex] = currentLine.substring(0, currentTexts[currentLineIndex].length + 1);
          setTypedTexts(currentTexts);
        } else {
          // Move to next line or start deleting
          if (currentLineIndex < lines.length - 1) {
            setCurrentLineIndex(prev => prev + 1);
          } else {
            setIsDone(true);
            setTimeout(() => setIsDeleting(true), pauseDuration);
          }
        }
      } else {
        // Deleting from last line to first
        if (currentLineIndex > 0 || currentTexts[currentLineIndex].length > 0) {
          if (currentTexts[currentLineIndex].length > 0) {
            currentTexts[currentLineIndex] = currentTexts[currentLineIndex].substring(
              0,
              currentTexts[currentLineIndex].length - 1
            );
            setTypedTexts(currentTexts);
          } else {
            setCurrentLineIndex(prev => prev - 1);
          }
        } else {
          // Reset for next cycle
          setIsDeleting(false);
          setCurrentLineIndex(0);
          setIsDone(false);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timer);
  }, [typedTexts, isDeleting, currentLineIndex, isDone]);

  useEffect(() => {
    // Responsive particle count
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 30 : 60;

    // Generate particles
    const newParticles: ParticleProps[] = Array.from({ length: particleCount }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 5,
      type: Math.floor(Math.random() * 10)
    }));
    setParticles(newParticles);

    // Generate code columns
    const codeSnippets = [
      'function', 'const', 'import', 'export', 'class', 
      'async', 'await', 'return', 'interface', 'type',
      'React', 'TypeScript', 'API', 'Component'
    ];
    const columnCount = isMobile ? 12 : 20;
    const newColumns: CodeColumn[] = Array.from({ length: columnCount }, (_, i) => ({
      left: i * (100 / columnCount),
      delay: Math.random() * 3,
      duration: 8 + Math.random() * 4,
      text: codeSnippets[Math.floor(Math.random() * codeSnippets.length)]
    }));
    setCodeColumns(newColumns);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    projectsSection?.scrollIntoView({ behavior: 'smooth' });
  };


  return (
    <section 
      ref={sectionRef}
      id="intro" 
      className="intro-section"
      style={{
        '--mouse-x': mousePosition.x,
        '--mouse-y': mousePosition.y
      } as React.CSSProperties}
    >
      <div className="intro-content">
        <div className="intro-welcome">
          <span className="welcome-bracket">&lt;</span>
          Welcome to my digital workspace
          <span className="welcome-bracket">/&gt;</span>
        </div>
        
        <h1 className="intro-title">
          <span className="intro-line">
            <span className="intro-prefix">I'm a </span>
            <span className="title-accent typewriter">
              {typedTexts[0]}
              {currentLineIndex === 0 && <span className="cursor">|</span>}
            </span>
          </span>
          
          <span className="intro-line">
            <span className="title-accent typewriter">
              {typedTexts[1]}
              {currentLineIndex === 1 && <span className="cursor">|</span>}
            </span>
          </span>
          
          <span className="intro-line">
            <span className="title-accent typewriter">
              {typedTexts[2]}
              {currentLineIndex === 2 && <span className="cursor">|</span>}
            </span>
          </span>
        </h1>

        {/* ...existing code... */}

        {/* Social Links */}
        <div className="intro-socials">
          <a 
            href="https://github.com/yourusername" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-link"
            aria-label="Visit my GitHub profile"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>

          <a 
            href="https://www.linkedin.com/in/salma-el-rhaiti-732a05303/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-link"
            aria-label="Visit my LinkedIn profile"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>

          <a 
            href="mailto:salmaelrhaiti7@gmail.com"
            className="social-link"
            aria-label="Send me an email"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z"/>
            </svg>
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button 
        className="scroll-indicator"
        onClick={scrollToProjects}
        aria-label="Scroll to projects section"
      >
        <span className="scroll-text">Scroll to explore</span>
        <svg className="scroll-arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M12 5v14M19 12l-7 7-7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      
      {/* Particles */}
      <div className="particles-container" aria-hidden="true">
        {particles.map((particle, i) => (
          <div 
            key={i} 
            className={`particle particle-type-${particle.type}`}
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`
            }}
          />
        ))}
      </div>
      
      {/* Code Rain */}
      <div className="code-rain" aria-hidden="true">
        {codeColumns.map((col, i) => (
          <div 
            key={i}
            className="code-column"
            style={{
              left: `${col.left}%`,
              animationDelay: `${col.delay}s`,
              animationDuration: `${col.duration}s`
            }}
          >
            {col.text}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Intro;