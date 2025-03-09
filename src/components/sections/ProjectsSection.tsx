import { useState, useRef, useEffect } from 'react';
import ProjectShowcaseModal from '../ui/ProjectShowcaseModal';
import { projectCategories } from '@/data/projects';
import { ProjectDetails } from '@/types/types';
import { dataManager } from '@/utils/dataManager';

const ProjectsSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<ProjectDetails | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState<ProjectDetails[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Load projects from dataManager instead of direct import
  useEffect(() => {
    const loadedProjects = dataManager.getAll<ProjectDetails>('projects');
    setProjects(loadedProjects);
  }, []);
  
  // Get filtered projects based on the active category
  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === activeCategory);
  
  const openProjectModal = (project: ProjectDetails) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeProjectModal = () => {
    setIsModalOpen(false);
  };
  
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };
  
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };
  
  return (
    <section 
      id="projects" 
      style={{
        background: 'var(--gradient-dark)',
        paddingTop: 'var(--section-spacing-y)',
        paddingBottom: 'var(--section-spacing-y)'
      }}
    >
      <div className="container mx-auto px-4" style={{ maxWidth: 'var(--content-max-width)' }}>
        <div className="text-center mb-16">
          <h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            Our Projects
          </h2>
          <p 
            className="text-xl max-w-2xl mx-auto"
            style={{ color: 'var(--text-secondary)' }}
          >
            Innovative solutions that deliver real-world results
          </p>
        </div>
        
        {/* Categories */}
        <div className="relative mb-12">
          <div 
            className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide"
            ref={scrollContainerRef}
            style={{ gap: 'var(--grid-gap-sm)' }}
          >
            {projectCategories.map((category) => (
              <button
                key={category}
                style={{
                  backgroundColor: activeCategory === category ? 'var(--primary)' : 'rgba(255, 255, 255, 0.1)',
                  color: 'var(--text-primary)',
                  borderRadius: 'var(--button-radius)',
                  padding: 'var(--button-padding)',
                  transition: 'var(--button-transition)',
                  whiteSpace: 'nowrap'
                }}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
          
          {/* Scroll buttons */}
          <button 
            onClick={scrollLeft}
            style={{
              position: 'absolute',
              left: '0',
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(30, 30, 30, 0.7)',
              color: 'var(--text-primary)',
              borderRadius: '9999px',
              padding: '0.5rem',
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(4px)',
              zIndex: 'var(--z-index-base)'
            }}
            className="md:flex"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button 
            onClick={scrollRight}
            style={{
              position: 'absolute',
              right: '0',
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(30, 30, 30, 0.7)',
              color: 'var(--text-primary)',
              borderRadius: '9999px',
              padding: '0.5rem',
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(4px)',
              zIndex: 'var(--z-index-base)'
            }}
            className="md:flex"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
        
        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8" style={{ gap: 'var(--grid-gap)' }}>
          {filteredProjects.map((project) => (
            <div 
              key={project.id}
              className="overflow-hidden transition-all duration-300 hover:shadow-lg group"
              style={{
                backgroundColor: 'var(--card-bg)',
                borderRadius: 'var(--radius-lg)',
                border: 'var(--card-border)',
                transition: 'var(--button-transition)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'var(--card-hover-transform)';
                e.currentTarget.style.boxShadow = 'var(--card-shadow)';
                e.currentTarget.style.borderColor = 'var(--primary)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'var(--dark-border)';
              }}
            >
              <div className={`p-8 ${project.image} backdrop-blur-sm`}>
                <div className="flex justify-between items-start">
                  <div style={{
                    backgroundColor: 'var(--dark-surface)',
                    backdropFilter: 'blur(8px)',
                    padding: '0.75rem',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--text-primary)'
                  }}>
                    {/* Icon based on category */}
                    {project.category === "Artificial Intelligence" && (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75ZM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 0 1 3 19.875v-6.75Z" />
                      </svg>
                    )}
                    {project.category === "Business Automation" && (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M3 6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Zm4.5 7.5a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0v-2.25a.75.75 0 0 1 .75-.75Zm3.75-1.5a.75.75 0 0 0-1.5 0v4.5a.75.75 0 0 0 1.5 0V12Zm2.25-3a.75.75 0 0 1 .75.75v6.75a.75.75 0 0 1-1.5 0V9.75A.75.75 0 0 1 13.5 9Zm3.75-1.5a.75.75 0 0 0-1.5 0v9a.75.75 0 0 0 1.5 0v-9Z" clipRule="evenodd" />
                      </svg>
                    )}
                    {project.category === "Mobile Development" && (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path d="M10.5 18.75a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z" />
                        <path fillRule="evenodd" d="M8.625.75A3.375 3.375 0 0 0 5.25 4.125v15.75a3.375 3.375 0 0 0 3.375 3.375h6.75a3.375 3.375 0 0 0 3.375-3.375V4.125A3.375 3.375 0 0 0 15.375.75h-6.75ZM7.5 4.125C7.5 3.504 8.004 3 8.625 3H9.75v.375c0 .621.504 1.125 1.125 1.125h2.25c.621 0 1.125-.504 1.125-1.125V3h1.125c.621 0 1.125.504 1.125 1.125v15.75c0 .621-.504 1.125-1.125 1.125h-6.75A1.125 1.125 0 0 1 7.5 19.875V4.125Z" clipRule="evenodd" />
                      </svg>
                    )}
                    {project.category === "IoT & Cloud" && (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M1.5 5.625c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v12.75c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 0 1 1.5 18.375V5.625ZM21 9.375A.375.375 0 0 0 20.625 9h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 0 0 .375-.375v-1.5Zm0 3.75a.375.375 0 0 0-.375-.375h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 0 0 .375-.375v-1.5Zm0 3.75a.375.375 0 0 0-.375-.375h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 0 0 .375-.375v-1.5ZM10.875 18.75a.375.375 0 0 0 .375-.375v-1.5a.375.375 0 0 0-.375-.375h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375h7.5ZM3.375 15h7.5a.375.375 0 0 0 .375-.375v-1.5a.375.375 0 0 0-.375-.375h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375Zm0-3.75h7.5a.375.375 0 0 0 .375-.375v-1.5A.375.375 0 0 0 10.875 9h-7.5A.375.375 0 0 0 3 9.375v1.5c0 .207.168.375.375.375Z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <span style={{
                    backgroundColor: 'var(--dark-surface)',
                    backdropFilter: 'blur(8px)',
                    padding: '0.25rem 1rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.75rem',
                    fontWeight: '500',
                    color: 'var(--text-secondary)'
                  }}>
                    {project.category}
                  </span>
                </div>
              </div>
              
              <div className="p-8">
                <h3 
                  className="text-2xl font-bold mb-3"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {project.title}
                </h3>
                <p 
                  className="mb-6"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {project.description}
                </p>
                
                <div className="mb-6">
                  <h4 
                    className="text-sm mb-2"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2" style={{ gap: 'var(--space-2)' }}>
                    {project.technologies.slice(0, 4).map((tech, index) => (
                      <span 
                        key={index} 
                        style={{
                          backgroundColor: 'var(--icon-bg-default)',
                          color: 'var(--primary)',
                          padding: '0.25rem 0.75rem',
                          borderRadius: 'var(--radius-full)',
                          fontSize: '0.75rem'
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span 
                        style={{
                          backgroundColor: 'var(--icon-bg-default)',
                          color: 'var(--primary)',
                          padding: '0.25rem 0.75rem',
                          borderRadius: 'var(--radius-full)',
                          fontSize: '0.75rem'
                        }}
                      >
                        +{project.technologies.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
                
                <button 
                  onClick={() => openProjectModal(project)}
                  className="inline-flex items-center"
                  style={{ 
                    color: 'var(--primary)',
                    transition: 'var(--button-transition)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--accent)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--primary)';
                  }}
                >
                  <span>View Case Study</span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 20 20" 
                    fill="currentColor" 
                    className="w-5 h-5 ml-2 transition-transform duration-300"
                    style={{
                      transform: 'translateX(0)',
                      transition: 'var(--transition-normal)'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'translateX(4px)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                  >
                    <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* CTA */}
        <div className="mt-16 text-center">
          <a 
            href="#contact" 
            style={{
              backgroundColor: 'var(--accent)',
              color: 'var(--text-primary)',
              borderRadius: 'var(--button-radius)',
              padding: 'var(--button-padding)',
              display: 'inline-flex',
              alignItems: 'center',
              transition: 'var(--button-transition)'
            }}
            className="inline-flex items-center px-8 py-3"
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'var(--button-hover-transform)';
              e.currentTarget.style.backgroundColor = 'var(--accent-hover)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.backgroundColor = 'var(--accent)';
            }}
          >
            <span>Start Your Project</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 ml-2">
              <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
      
      {/* Project Modal */}
      {selectedProject && (
        <ProjectShowcaseModal
          isOpen={isModalOpen}
          onClose={closeProjectModal}
          project={selectedProject}
        />
      )}
    </section>
  );
};

export default ProjectsSection;