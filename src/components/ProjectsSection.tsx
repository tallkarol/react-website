import { useState, useRef } from 'react'

const projects = [
  {
    id: 1,
    title: "AI-Powered Customer Dashboard",
    category: "Artificial Intelligence",
    description: "A custom dashboard that uses machine learning to analyze customer behavior and provide actionable insights.",
    image: "bg-gradient-to-br from-indigo-500/20 to-purple-500/20",
    technologies: ["React", "TensorFlow.js", "Node.js", "GraphQL"],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75ZM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 0 1-1.875-1.875V8.625ZM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 0 1 3 19.875v-6.75Z" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Enterprise Resource Planning System",
    category: "Business Automation",
    description: "A comprehensive ERP solution that streamlines operations across departments and improves efficiency.",
    image: "bg-gradient-to-br from-blue-500/20 to-teal-500/20",
    technologies: ["Angular", "PostgreSQL", "Express", "Docker"],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path fillRule="evenodd" d="M3 6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Zm4.5 7.5a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0v-2.25a.75.75 0 0 1 .75-.75Zm3.75-1.5a.75.75 0 0 0-1.5 0v4.5a.75.75 0 0 0 1.5 0V12Zm2.25-3a.75.75 0 0 1 .75.75v6.75a.75.75 0 0 1-1.5 0V9.75A.75.75 0 0 1 13.5 9Zm3.75-1.5a.75.75 0 0 0-1.5 0v9a.75.75 0 0 0 1.5 0v-9Z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "E-commerce Mobile Application",
    category: "Mobile Development",
    description: "A feature-rich mobile shopping experience with AR product visualization and AI-driven recommendations.",
    image: "bg-gradient-to-br from-orange-500/20 to-pink-500/20",
    technologies: ["React Native", "Firebase", "Redux", "AR Kit"],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M10.5 18.75a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z" />
        <path fillRule="evenodd" d="M8.625.75A3.375 3.375 0 0 0 5.25 4.125v15.75a3.375 3.375 0 0 0 3.375 3.375h6.75a3.375 3.375 0 0 0 3.375-3.375V4.125A3.375 3.375 0 0 0 15.375.75h-6.75ZM7.5 4.125C7.5 3.504 8.004 3 8.625 3H9.75v.375c0 .621.504 1.125 1.125 1.125h2.25c.621 0 1.125-.504 1.125-1.125V3h1.125c.621 0 1.125.504 1.125 1.125v15.75c0 .621-.504 1.125-1.125 1.125h-6.75A1.125 1.125 0 0 1 7.5 19.875V4.125Z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    id: 4,
    title: "Predictive Maintenance Platform",
    category: "IoT & Cloud",
    description: "A cloud-based system that monitors equipment health and predicts maintenance needs to prevent downtime.",
    image: "bg-gradient-to-br from-green-500/20 to-cyan-500/20",
    technologies: ["Python", "AWS IoT", "Machine Learning", "Grafana"],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path fillRule="evenodd" d="M1.5 5.625c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v12.75c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 0 1 1.5 18.375V5.625ZM21 9.375A.375.375 0 0 0 20.625 9h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 0 0 .375-.375v-1.5Zm0 3.75a.375.375 0 0 0-.375-.375h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 0 0 .375-.375v-1.5Zm0 3.75a.375.375 0 0 0-.375-.375h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 0 0 .375-.375v-1.5ZM10.875 18.75a.375.375 0 0 0 .375-.375v-1.5a.375.375 0 0 0-.375-.375h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375h7.5ZM3.375 15h7.5a.375.375 0 0 0 .375-.375v-1.5a.375.375 0 0 0-.375-.375h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375Zm0-3.75h7.5a.375.375 0 0 0 .375-.375v-1.5A.375.375 0 0 0 10.875 9h-7.5A.375.375 0 0 0 3 9.375v1.5c0 .207.168.375.375.375Z" clipRule="evenodd" />
      </svg>
    ),
  },
]

const categories = ["All", "Artificial Intelligence", "Business Automation", "Mobile Development", "IoT & Cloud"]

const ProjectsSection = () => {
  const [activeCategory, setActiveCategory] = useState("All")
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  
  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === activeCategory)
  
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' })
    }
  }
  
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' })
    }
  }
  
  return (
    <section id="projects" className="py-20 bg-slate-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Projects</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Innovative solutions that deliver real-world results
          </p>
        </div>
        
        {/* Categories */}
        <div className="relative mb-12">
          <div 
            className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide"
            ref={scrollContainerRef}
          >
            {categories.map((category) => (
              <button
                key={category}
                className={`px-6 py-2 rounded-full whitespace-nowrap transition-all duration-300 ${
                  activeCategory === category 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
          
          {/* Scroll buttons */}
          <button 
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-slate-900/70 backdrop-blur-sm p-2 rounded-full text-white shadow-lg z-10 hidden md:block"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button 
            onClick={scrollRight}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-slate-900/70 backdrop-blur-sm p-2 rounded-full text-white shadow-lg z-10 hidden md:block"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
        
        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div 
              key={project.id}
              className="bg-slate-900/50 backdrop-blur-sm rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10 border border-slate-700/50 group"
            >
              <div className={`p-8 ${project.image} backdrop-blur-sm`}>
                <div className="flex justify-between items-start">
                  <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg text-white">
                    {project.icon}
                  </div>
                  <span className="bg-slate-900/50 backdrop-blur-sm px-4 py-1 rounded-full text-xs font-medium text-gray-300">
                    {project.category}
                  </span>
                </div>
              </div>
              
              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-3">{project.title}</h3>
                <p className="text-gray-300 mb-6">{project.description}</p>
                
                <div className="mb-6">
                  <h4 className="text-gray-400 text-sm mb-2">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span 
                        key={index} 
                        className="bg-slate-800 text-gray-300 px-3 py-1 rounded-full text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <a 
                  href="#" 
                  className="inline-flex items-center text-indigo-400 group-hover:text-indigo-300 transition-colors duration-300"
                >
                  <span>View Case Study</span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300">
                    <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
        
        {/* CTA */}
        <div className="mt-16 text-center">
          <a 
            href="#contact" 
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full inline-flex items-center transition-all duration-300 btn-hover-effect"
          >
            <span>Start Your Project</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 ml-2">
              <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

export default ProjectsSection