import React from "react";
import "./Projects.css";

const projects = [
  {
    image: "project1.jpg",
    category: "Web Application",
    title: "Hotel Management System with QR Code Integration",
    link: "#"
  },
  {
    image: "project2.jpg",
    category: "Full-Stack Web Application",
    title: "EduVerse – School Management System with API Integration",
    link: "#"
  },
  {
    image: "project3.jpg",
    category: "3D Visualization & Virtual Tour",
    title: "Interactive 3D Tour of EST Meknès with Camera Navigation",
    link: "#"
  },
  {
    image: "themedivi.png",
    category: "Frontend Web Project / WordPress with Divi Theme",
    title: "Cultural Immersion Experience in a Berber Village - Atlas Mountains",
    link: "https://morocclytravel.com/cultural-immersion-a-day-in-the-life-of-a-berber-village/"
  },
  {
    image: "project5.jpg",
    category: "3D Animation & VFX",
    title: "Merendina",
    link: "#"
  },
  {
    image: "themedivi2.png",
    category: "Frontend Web Project / WordPress with Divi Theme",
    title: "Morocco's Festivals and Traditions: A Deep Dive into Cultural Celebrations",
    link: "https://inmoroccotrips.com/moroccos-festivals-and-traditions-a-deep-dive-into-cultural-celebrations/"
  },
];

const Projects: React.FC = () => {
  return (
    <section className="projects-section" id="projects">
      <div className="projects-container">
        <div className="projects-header">
          <div className="projects-line"></div>
          <h2>PROJECTS</h2>
        </div>

        <div className="projects-list-grid">
          {projects.map((project, idx) => (
            <div key={idx} className="project-grid-card">
              <div className="project-image-wrapper">
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-image"
                />
              </div>

              <div className="project-info">
                <span className="project-category">{project.category}</span>
                <h3 className="project-title">{project.title}</h3>
                <a
                  href={project.link}
                  className="project-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${project.title}`}
                >
                  ↗
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;