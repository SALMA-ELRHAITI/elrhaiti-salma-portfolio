import React from "react";
import "./About.css";

const About: React.FC = () => {
	return (
		<section id="about" className="about-section">
			<div className="about-container">
				<div className="about-content">
					<div className="about-header">
						<span className="about-line"></span>
						<h2>ABOUT</h2>
					</div>
					<p className="about-text">
						Hello, I'm <span className="highlight">EL RHAITI SALMA</span>, a Full-Stack Developer 
						from Khouribga, Morocco. I hold a DUT (Bac+2) in Web and Multimedia Development from 
						École Supérieure de Technologie de Meknès, Université Moulay Ismail. I specialize in 
						building modern, responsive web applications using React, Node.js, PHP, and Laravel, 
						with additional experience in mobile development. I'm passionate about solving technical 
						challenges through clean, efficient code and creating intuitive, multilingual user interfaces. 
						Whether working independently or with teams, I strive to deliver impactful digital solutions.<br/>
						<span className="highlight-gold"> Let's connect and build something exceptional together!</span>
					</p>
				</div>
				
				<div className="about-image">
					<div className="image-frame">
						<div className="frame-corner top-left"></div>
						<div className="frame-corner top-right"></div>
						<div className="frame-corner bottom-left"></div>
						<div className="frame-corner bottom-right"></div>
						<img 
							src="PIC.jpg" 
							alt="Salma El Rhaiti" 
							className="profile-photo"
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

export default About;