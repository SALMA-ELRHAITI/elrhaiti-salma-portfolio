import React, { useEffect, useRef, useState } from "react";
import "./About.css";

const About: React.FC = () => {
	const [isVisible, setIsVisible] = useState(false);
	const [imageLoaded, setImageLoaded] = useState(false);
	const sectionRef = useRef<HTMLElement>(null);
	const textRef = useRef<HTMLParagraphElement>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true);
				}
			},
			{ threshold: 0.2 }
		);

		if (sectionRef.current) {
			observer.observe(sectionRef.current);
		}

		return () => {
			if (sectionRef.current) {
				observer.unobserve(sectionRef.current);
			}
		};
	}, []);

	useEffect(() => {
		if (isVisible && textRef.current) {
			const text = textRef.current;
			const content = text.innerHTML;
			
			// Split by spaces but preserve HTML tags
			const parts = content.split(/(<[^>]+>)/g);
			let wordIndex = 0;
			
			const wrappedContent = parts.map(part => {
				// If it's an HTML tag, keep it as is
				if (part.startsWith('<')) {
					return part;
				}
				// If it's text, split into words and wrap each
				return part.split(' ').map(word => {
					if (word.trim()) {
						return `<span class="word" style="animation-delay: ${wordIndex++ * 0.03}s">${word}</span>`;
					}
					return word;
				}).join(' ');
			}).join('');
			
			text.innerHTML = wrappedContent;
		}
	}, [isVisible]);

	return (
		<section id="about" className="about-section" ref={sectionRef}>
			<div className={`about-container ${isVisible ? 'visible' : ''}`}>
				<div className="about-content">
					<div className={`about-header ${isVisible ? 'slide-in' : ''}`}>
						<span className="about-line"></span>
						<h2>ABOUT</h2>
					</div>
					<p className="about-text" ref={textRef}>
						Hello, I'm <span className="highlight">EL RHAITI SALMA</span>, a Full-Stack Developer from Khouribga, Morocco, currently pursuing a Licence d'Excellence in Security & IoT. I hold a DUT in Web and Multimedia Development from EST Meknès.

I build modern web and mobile applications using React, Node.js, PHP, Laravel, and Java, and I'm passionate about IoT, security, and creating smart, user-friendly solutions.<br/>
						<span className="highlight-gold"> Let's connect and build something exceptional together!</span>
					</p>
				</div>
				
				<div className={`about-image ${isVisible ? 'fade-in' : ''}`}>
					<div className="image-frame">
						<div className="frame-corner top-left"></div>
						<div className="frame-corner top-right"></div>
						<div className="frame-corner bottom-left"></div>
						<div className="frame-corner bottom-right"></div>
						<img 
							src="moi.jpg" 
							alt="Salma El Rhaiti" 
							className={`profile-photo ${imageLoaded ? 'loaded' : ''}`}
							onLoad={() => setImageLoaded(true)}
						/>
						<div className="image-overlay"></div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default About;