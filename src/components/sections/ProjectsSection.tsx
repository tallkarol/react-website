import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProjectShowcaseModal from '../ui/ProjectShowcaseModal';
import { projectCategories } from '@/data/projects';
import { ProjectDetails } from '@/types/types';
import { dataManager } from '@/utils/dataManager';

const ProjectsSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<ProjectDetails | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState<ProjectDetails[]>([]);
  const [hoveredProjectId, setHoveredProjectId] = useState<number | null>(null);
  // const categoriesRef = useRef<HTMLDivElement>(null);

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

  // Helper function to get icon based on category
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Artificial Intelligence":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M16.5 7.5h-9v9h9v-9Z" />
            <path
              fillRule="evenodd"
              d="M8.25 2.25A.75.75 0 0 1 9 3v.75h2.25V3a.75.75 0 0 1 1.5 0v.75H15V3a.75.75 0 0 1 1.5 0v.75h.75a3 3 0 0 1 3 3v.75H21A.75.75 0 0 1 21 9h-.75v2.25H21a.75.75 0 0 1 0 1.5h-.75V15H21a.75.75 0 0 1 0 1.5h-.75v.75a3 3 0 0 1-3 3h-.75V21a.75.75 0 0 1-1.5 0v-.75h-2.25V21a.75.75 0 0 1-1.5 0v-.75H9V21a.75.75 0 0 1-1.5 0v-.75h-.75a3 3 0 0 1-3-3v-.75H3A.75.75 0 0 1 3 15h.75v-2.25H3a.75.75 0 0 1 0-1.5h.75V9H3a.75.75 0 0 1 0-1.5h.75v-.75a3 3 0 0 1 3-3h.75V3a.75.75 0 0 1 .75-.75ZM6 6.75A.75.75 0 0 1 6.75 6h10.5a.75.75 0 0 1 .75.75v10.5a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V6.75Z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "Business Automation":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M3 6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Zm4.5 7.5a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0v-2.25a.75.75 0 0 1 .75-.75Zm3.75-1.5a.75.75 0 0 0-1.5 0v4.5a.75.75 0 0 0 1.5 0V12Zm2.25-3a.75.75 0 0 1 .75.75v6.75a.75.75 0 0 1-1.5 0V9.75A.75.75 0 0 1 13.5 9Zm3.75-1.5a.75.75 0 0 0-1.5 0v9a.75.75 0 0 0 1.5 0v-9Z" clipRule="evenodd" />
          </svg>
        );
      case "Mobile Development":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M10.5 18.75a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z" />
            <path fillRule="evenodd" d="M8.625.75A3.375 3.375 0 0 0 5.25 4.125v15.75a3.375 3.375 0 0 0 3.375 3.375h6.75a3.375 3.375 0 0 0 3.375-3.375V4.125A3.375 3.375 0 0 0 15.375.75h-6.75ZM7.5 4.125C7.5 3.504 8.004 3 8.625 3H9.75v.375c0 .621.504 1.125 1.125 1.125h2.25c.621 0 1.125-.504 1.125-1.125V3h1.125c.621 0 1.125.504 1.125 1.125v15.75c0 .621-.504 1.125-1.125 1.125h-6.75A1.125 1.125 0 0 1 7.5 19.875V4.125Z" clipRule="evenodd" />
          </svg>
        );
      case "IoT & Cloud":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M1.5 5.625c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v12.75c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 0 1 1.5 18.375V5.625ZM21 9.375A.375.375 0 0 0 20.625 9h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 0 0 .375-.375v-1.5Zm0 3.75a.375.375 0 0 0-.375-.375h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 0 0 .375-.375v-1.5Zm0 3.75a.375.375 0 0 0-.375-.375h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 0 0 .375-.375v-1.5ZM10.875 18.75a.375.375 0 0 0 .375-.375v-1.5a.375.375 0 0 0-.375-.375h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375h7.5ZM3.375 15h7.5a.375.375 0 0 0 .375-.375v-1.5a.375.375 0 0 0-.375-.375h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375Zm0-3.75h7.5a.375.375 0 0 0 .375-.375v-1.5A.375.375 0 0 0 10.875 9h-7.5A.375.375 0 0 0 3 9.375v1.5c0 .207.168.375.375.375Z" clipRule="evenodd" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5Z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  return (
    <section 
      id="projects" 
      className="py-24" 
      style={{ background: 'var(--gradient-dark)' }}
    >
      <div className="container mx-auto px-4" style={{ maxWidth: 'var(--content-max-width)' }}>
        {/* Section Header with animated underline */}
        <div className="text-center mb-16 relative">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: 'var(--text-primary)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Our Projects
            <motion.div 
              style={{ 
                background: 'var(--gradient-primary, linear-gradient(to right, var(--primary), var(--accent)))',
                height: '4px',
                position: 'absolute',
                bottom: '-8px',
                left: '50%',
                borderRadius: '9999px'
              }}
              initial={{ width: "0%", x: "-50%" }}
              whileInView={{ width: "80px", x: "-50%" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              viewport={{ once: true }}
            />
          </motion.h2>
          <motion.p 
            className="text-xl max-w-3xl mx-auto mt-6"
            style={{ color: 'var(--text-secondary)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Innovative solutions that deliver real-world results
          </motion.p>
        </div>
        
{/* Categories - Styled like Features section tabs */}
<div className="mb-16">
  <div className="flex overflow-x-auto hide-scrollbar pb-2 justify-center">
    <div className="inline-flex p-1.5 rounded-xl shadow-xl"
         style={{ 
           background: 'var(--bg-component, rgba(30, 41, 59, 0.5))', 
           backdropFilter: 'blur(8px)'
         }}>
      {projectCategories.map((category) => (
        <button
          key={category}
          role="tab"
          aria-selected={activeCategory === category}
          className="relative flex items-center gap-2 py-2.5 px-5 rounded-lg text-sm md:text-base font-medium transition-all duration-300 focus:outline-none"
          style={{ 
            color: activeCategory === category 
              ? 'var(--text-primary, white)' 
              : 'var(--text-secondary, #cbd5e1)',
            background: activeCategory === category 
              ? 'transparent' 
              : 'transparent'
          }}
          onClick={() => setActiveCategory(category)}
        >
          {category}
          {activeCategory === category && (
            <motion.span 
              className="absolute bottom-0 left-0 right-0 h-full rounded-lg -z-10"
              style={{ 
                background: 'var(--gradient-primary, linear-gradient(to right, var(--color-primary, #6366f1), var(--color-primary-dark, #4f46e5)))'
              }}
              layoutId="activeProjectTab"
              transition={{ type: "spring", duration: 0.5 }}
            />
          )}
        </button>
      ))}
    </div>
  </div>
</div>
        
        {/* Projects Grid - Enhanced Styling */}
        <div className="grid md:grid-cols-2 gap-8" style={{ gap: 'var(--grid-gap)' }}>
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * (index % 4) }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredProjectId(project.id)}
              onMouseLeave={() => setHoveredProjectId(null)}
              className="group"
            >
              <div 
                className="rounded-2xl overflow-hidden transition-all duration-500"
                style={{
                  backgroundColor: 'var(--card-bg)',
                  borderRadius: 'var(--radius-lg)',
                  border: hoveredProjectId === project.id ? 'var(--card-hover-border)' : 'var(--card-border)',
                  transform: hoveredProjectId === project.id ? 'var(--card-hover-transform)' : 'none',
                  boxShadow: hoveredProjectId === project.id ? 'var(--card-shadow)' : 'none',
                  transition: 'var(--transition-normal)'
                }}
              >
                <div className={`p-8 ${project.image} backdrop-blur-sm relative`}>
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, var(--dark) 100%)'
                    }}
                  ></div>
                  <div className="flex justify-between items-start relative z-10">
                    <div className="bg-dark-surface/80 backdrop-blur-sm p-4 rounded-lg flex items-center justify-center text-white"
                        style={{ 
                          backgroundColor: hoveredProjectId === project.id ? 'var(--primary)' : 'var(--dark-surface)', 
                          color: hoveredProjectId === project.id ? 'var(--text-primary)' : 'var(--text-secondary)',
                          transition: 'var(--transition-normal)'
                        }}>
                      {getCategoryIcon(project.category)}
                    </div>
                    
                    <span className="bg-dark-surface/80 backdrop-blur-sm py-1 px-4 rounded-full text-sm font-medium"
                        style={{ 
                          backgroundColor: hoveredProjectId === project.id ? 'var(--primary)' : 'var(--dark-surface)',
                          color: hoveredProjectId === project.id ? 'var(--text-primary)' : 'var(--text-secondary)',
                          transition: 'var(--transition-normal)'
                        }}>
                      {project.category}
                    </span>
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute bottom-4 right-4 w-24 h-24 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 filter blur-xl group-hover:opacity-80 transition-opacity"></div>
                </div>
                
                <div className="p-8 relative">
                  {/* Client & Duration if available */}
                  {(project.client || project.duration) && (
                    <div className="flex flex-wrap gap-4 mb-4 text-xs" style={{ color: 'var(--text-muted)' }}>
                      {project.client && (
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1" style={{ color: 'var(--primary)' }}>
                            <path fillRule="evenodd" d="M4.25 2A2.25 2.25 0 0 0 2 4.25v11.5A2.25 2.25 0 0 0 4.25 18h11.5A2.25 2.25 0 0 0 18 15.75V4.25A2.25 2.25 0 0 0 15.75 2H4.25ZM15 5.75a.75.75 0 0 0-1.5 0v8.5a.75.75 0 0 0 1.5 0v-8.5Zm-8.5 6a.75.75 0 0 0-1.5 0v2.5a.75.75 0 0 0 1.5 0v-2.5ZM8.584 9a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5a.75.75 0 0 1 .75-.75Zm3.58-1.25a.75.75 0 0 0-1.5 0v6.5a.75.75 0 0 0 1.5 0v-6.5Z" clipRule="evenodd" />
                          </svg>
                          Client: {project.client}
                        </div>
                      )}
                      
                      {project.duration && (
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1" style={{ color: 'var(--primary)' }}>
                            <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-13a.75.75 0 0 0-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 0 0 0-1.5h-3.25V5Z" clipRule="evenodd" />
                          </svg>
                          Duration: {project.duration}
                        </div>
                      )}
                    </div>
                  )}
                  
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
                      className="text-sm mb-3 uppercase tracking-wider"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      Technologies
                    </h4>
                    <div className="flex flex-wrap gap-2" style={{ gap: 'var(--space-2)' }}>
                      {project.technologies.slice(0, 4).map((tech, index) => (
                        <span 
                          key={index} 
                          className="py-1 px-3 rounded-full text-xs font-medium"
                          style={{
                            backgroundColor: 'var(--icon-bg-default)',
                            color: 'var(--primary)',
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span 
                          className="py-1 px-3 rounded-full text-xs font-medium"
                          style={{
                            backgroundColor: 'var(--icon-bg-default)',
                            color: 'var(--primary)',
                          }}
                        >
                          +{project.technologies.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Features */}
                  <div className="mb-8">
                    <h4 
                      className="text-sm mb-3 uppercase tracking-wider"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      Key Features
                    </h4>
                    <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                      {project.features.slice(0, 4).map((feature, index) => (
                        <div key={index} className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2 shrink-0 mt-0.5" style={{ color: 'var(--accent)' }}>
                            <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" />
                          </svg>
                          <span style={{ color: 'var(--text-secondary)' }} className="text-sm">{feature}</span>
                        </div>
                      ))}
                      {project.features.length > 4 && (
                        <div className="flex items-center col-span-2 mt-1">
                          <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                            + {project.features.length - 4} more features
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <motion.button 
                    onClick={() => openProjectModal(project)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center text-sm font-medium"
                    style={{ 
                      color: 'var(--primary)',
                      transition: 'var(--button-transition)'
                    }}
                  >
                    <span>View Project Details</span>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 20 20" 
                      fill="currentColor" 
                      className="w-5 h-5 ml-2 transition-transform duration-300"
                      style={{
                        transform: hoveredProjectId === project.id ? 'translateX(4px)' : 'translateX(0)',
                        transition: 'var(--transition-normal)'
                      }}
                    >
                      <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
                    </svg>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* CTA */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.a 
            href="#contact" 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="btn-accent inline-flex items-center px-8 py-3 shadow-lg"
            style={{
              backgroundColor: 'var(--accent)',
              color: 'var(--text-primary)',
              borderRadius: 'var(--button-radius)',
              padding: 'var(--button-padding)',
              boxShadow: '0 10px 15px -3px rgba(236, 72, 153, 0.3)',
            }}
          >
            <span className="mr-2">Start Your Project</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
            </svg>
          </motion.a>
        </motion.div>
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