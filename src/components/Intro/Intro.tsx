import React from 'react';
import './Intro.css';

const Intro: React.FC = () => {
  return (
    <section id="intro" className="intro-section">
      <div className="intro-content">
        <div className="intro-welcome">Welcome to my digital workspace.</div>
        <h1 className="intro-title">
          {/* I'm a FULL-STACK - on the same line, LEFT */}
          <span className="intro-line intro-left">
            <span className="intro-prefix">I'm a </span>
            <span className="title-accent-left">FULL-STACK</span>
          </span>
          
          {/* DEVELOPER & - now on the RIGHT */}
          <span className="intro-line intro-right">
               <span className="connector">&</span>
            <span className="title-accent-right">MOBILE</span>
         
          </span>
          
          {/* SOFTWARE - stays LEFT */}
          <span className="intro-line intro-left">
            <span className="title-accent-left">DEVELOPER</span>
          </span>
        </h1>
      </div>
      
      <div className="particles-container">
        {[...Array(50)].map((_, i) => (
          <div 
            key={i} 
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>
      
      <div className="code-rain">
        {[...Array(15)].map((_, i) => (
          <div 
            key={i}
            className="code-column"
            style={{
              left: `${i * 7}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${8 + Math.random() * 4}s`
            }}
          >
            {['function', 'const', 'import', 'export', 'class', 'async'][Math.floor(Math.random() * 6)]}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Intro;