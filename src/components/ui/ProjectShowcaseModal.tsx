import { useState } from 'react';
import { motion } from 'framer-motion';
import Modal from './Modal';

// Project data interface
export interface ProjectDetails {
  id: number;
  title: string;
  category: string;
  client?: string;
  duration?: string;
  description: string;
  challenge?: string;
  solution?: string;
  results?: string;
  technologies: string[];
  features: string[];
  image: string;
  gallery?: string[];
  testimonial?: {
    quote: string;
    author: string;
    position: string;
  };
}

interface ProjectShowcaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: ProjectDetails;
}

const ProjectShowcaseModal = ({ isOpen, onClose, project }: ProjectShowcaseModalProps) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'challenge' | 'solution' | 'results'>('overview');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Get the current gallery image or use the main image if no gallery
  const currentImage = project.gallery && project.gallery.length > 0 
    ? project.gallery[currentImageIndex] 
    : project.image;

  const nextImage = () => {
    if (project.gallery && project.gallery.length > 0) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % (project.gallery?.length || 1));
    }
  };

  const prevImage = () => {
    if (project.gallery && project.gallery.length > 0) {
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + (project.gallery?.length || 1)) % (project.gallery?.length || 1));
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <div className="flex flex-col lg:flex-row h-full">
        {/* Left side - Image/Gallery */}
        <div className="lg:w-2/5 h-64 md:h-96 lg:h-full relative bg-slate-900">
          <div 
            className={`w-full h-full bg-cover bg-center ${currentImage}`}
            style={{ backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
            {/* Gradient overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
            
            {/* Project title overlay on mobile */}
            <div className="absolute bottom-0 left-0 right-0 p-6 lg:hidden">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-600/90 text-white mb-2">
                {project.category}
              </span>
              <h2 className="text-2xl font-bold text-white">{project.title}</h2>
            </div>
          </div>
          
          {/* Gallery navigation */}
          {project.gallery && project.gallery.length > 1 && (
            <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center space-x-3">
              <button 
                onClick={prevImage}
                className="bg-slate-800/80 backdrop-blur-sm text-white p-2 rounded-full hover:bg-indigo-600 transition-colors duration-300"
                aria-label="Previous image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                </svg>
              </button>
              
              <div className="flex items-center space-x-2">
                {project.gallery.map((_, index) => (
                  <button 
                    key={index}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      index === currentImageIndex ? 'bg-white w-4' : 'bg-white/50 hover:bg-white/80'
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
              
              <button 
                onClick={nextImage}
                className="bg-slate-800/80 backdrop-blur-sm text-white p-2 rounded-full hover:bg-indigo-600 transition-colors duration-300"
                aria-label="Next image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          )}
        </div>
        
        {/* Right side - Content */}
        <div className="lg:w-3/5 p-6 md:p-8 overflow-y-auto custom-scrollbar">
          {/* Project Header - Hidden on mobile (shown over image) */}
          <div className="hidden lg:block mb-6">
            <div className="flex items-center space-x-3 mb-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-600/90 text-white">
                {project.category}
              </span>
              {project.client && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-700/90 text-gray-300">
                  Client: {project.client}
                </span>
              )}
              {project.duration && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-700/90 text-gray-300">
                  Duration: {project.duration}
                </span>
              )}
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">{project.title}</h2>
          </div>
          
          {/* Tabs */}
          <div className="mb-6 border-b border-slate-700/70">
            <div className="flex space-x-6">
              <button
                className={`py-3 px-1 relative ${
                  activeTab === 'overview'
                    ? 'text-indigo-400 font-medium' 
                    : 'text-gray-400 hover:text-gray-300'
                } transition-colors`}
                onClick={() => setActiveTab('overview')}
              >
                Overview
                {activeTab === 'overview' && (
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500"
                    layoutId="activeProjectTab"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
              
              {project.challenge && (
                <button
                  className={`py-3 px-1 relative ${
                    activeTab === 'challenge'
                      ? 'text-indigo-400 font-medium' 
                      : 'text-gray-400 hover:text-gray-300'
                  } transition-colors`}
                  onClick={() => setActiveTab('challenge')}
                >
                  Challenge
                  {activeTab === 'challenge' && (
                    <motion.div 
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500"
                      layoutId="activeProjectTab"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </button>
              )}
              
              {project.solution && (
                <button
                  className={`py-3 px-1 relative ${
                    activeTab === 'solution'
                      ? 'text-indigo-400 font-medium' 
                      : 'text-gray-400 hover:text-gray-300'
                  } transition-colors`}
                  onClick={() => setActiveTab('solution')}
                >
                  Solution
                  {activeTab === 'solution' && (
                    <motion.div 
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500"
                      layoutId="activeProjectTab"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </button>
              )}
              
              {project.results && (
                <button
                  className={`py-3 px-1 relative ${
                    activeTab === 'results'
                      ? 'text-indigo-400 font-medium' 
                      : 'text-gray-400 hover:text-gray-300'
                  } transition-colors`}
                  onClick={() => setActiveTab('results')}
                >
                  Results
                  {activeTab === 'results' && (
                    <motion.div 
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500"
                      layoutId="activeProjectTab"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </button>
              )}
            </div>
          </div>
          
          {/* Tab content */}
          <div className="text-gray-300 mb-8 leading-relaxed">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'overview' && <p className="text-lg">{project.description}</p>}
              {activeTab === 'challenge' && project.challenge && <p className="text-lg">{project.challenge}</p>}
              {activeTab === 'solution' && project.solution && <p className="text-lg">{project.solution}</p>}
              {activeTab === 'results' && project.results && <p className="text-lg">{project.results}</p>}
            </motion.div>
          </div>
          
          {/* Key Features */}
          <div className="mb-10">
            <h3 className="text-xl font-medium text-white mb-4 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2 text-indigo-400">
                <path d="M10 1a6 6 0 00-6 6v1.351A4 4 0 004 12h1V8a5 5 0 0110 0v4h1a4 4 0 000-8h-1V7a6 6 0 00-6-6zM6 7v4a1 1 0 001 1h6a1 1 0 001-1V7a4 4 0 10-8 0z" />
              </svg>
              Key Features
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.features.map((feature, index) => (
                <div key={index} className="flex items-start p-3 rounded-lg bg-slate-800/50 border border-slate-700/50">
                  <div className="flex-shrink-0 bg-indigo-900/50 rounded-full p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-indigo-400">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="ml-3 text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Technologies */}
          <div className="mb-8">
            <h3 className="text-xl font-medium text-white mb-4 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2 text-indigo-400">
                <path fillRule="evenodd" d="M8 7a5 5 0 113.61 4.804l-1.903 1.903A1 1 0 019 14H8v1a1 1 0 01-1 1H6v1a1 1 0 01-1 1H3a1 1 0 01-1-1v-2a1 1 0 01.293-.707L8.196 8.39A5.002 5.002 0 018 7zm5-3a.75.75 0 000 1.5A1.5 1.5 0 0114.5 7 .75.75 0 0016 7a3 3 0 00-3-3z" clipRule="evenodd" />
              </svg>
              Technologies Used
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 bg-indigo-900/30 text-indigo-300 rounded-lg border border-indigo-800/50 text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          
          {/* Testimonial if available */}
          {project.testimonial && (
            <div className="mt-10 bg-gradient-to-r from-indigo-900/30 to-purple-900/20 rounded-xl p-6 border-l-4 border-indigo-500">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-10 h-10 text-indigo-400/40 mb-4">
                <path d="M10.5 3.75h2.25a.75.75 0 01.75.75v4.5a.75.75 0 01-.75.75h-2.25V14c0 .55.45 1 1 1h3.75a.75.75 0 010 1.5H8.25a.75.75 0 010-1.5h.75v-4.5H6.75a.75.75 0 01-.75-.75v-4.5a.75.75 0 01.75-.75h2.25V4C9 3.45 8.55 3 8 3H5.25a.75.75 0 010-1.5h4.5a.75.75 0 01.75.75v1.5zm8.03-1.5a.75.75 0 01-.53.22h-3.75a.75.75 0 010-1.5h3.75a.75.75 0 01.53 1.28zM13.5 9v1.5h-1.5V9h1.5zM12 12.75h1.5V12H12v.75zm1.5-6.75v1.5H12V6h1.5zm-9 6.75H6V12H4.5v.75zm1.5-6.75v1.5H4.5V6H6z" />
              </svg>
              <p className="text-indigo-100 italic mb-5 text-lg">{project.testimonial.quote}</p>
              <div className="flex items-center">
                <div className="bg-indigo-600 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold">
                  {project.testimonial.author.charAt(0)}
                </div>
                <div className="ml-3">
                  <p className="text-white font-medium">{project.testimonial.author}</p>
                  <p className="text-indigo-300 text-sm">{project.testimonial.position}</p>
                </div>
              </div>
            </div>
          )}
          
          {/* Call to Action */}
          <div className="mt-8 flex flex-wrap gap-4">
            <a 
              href="#contact" 
              onClick={onClose}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors duration-300 inline-flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2">
                <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
                <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
              </svg>
              Contact About This Project
            </a>
            <button
              onClick={onClose}
              className="px-6 py-3 border border-gray-600 text-gray-300 hover:text-white hover:border-gray-500 rounded-lg transition-colors duration-300 inline-flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2">
                <path fillRule="evenodd" d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z" clipRule="evenodd" />
                <path fillRule="evenodd" d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z" clipRule="evenodd" />
              </svg>
              Explore Other Projects
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ProjectShowcaseModal;