import { useState } from 'react';
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
        <div className="lg:w-1/2 relative h-64 md:h-96 lg:h-full">
          <div 
            className="w-full h-full bg-cover bg-center" 
            style={{ backgroundImage: `url(${currentImage})` }}
          >
            {/* Placeholder for when we don't have real images yet */}
            <div className={`w-full h-full ${project.image} flex items-center justify-center`}>
              <span className="text-white text-opacity-50 text-lg">Project Image</span>
            </div>
          </div>
          
          {/* Gallery navigation */}
          {project.gallery && project.gallery.length > 1 && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
              <button 
                onClick={prevImage}
                className="bg-slate-900/60 backdrop-blur-sm p-2 rounded-full text-white hover:bg-indigo-600 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <div className="flex items-center space-x-1">
                {project.gallery.map((_, index) => (
                  <button 
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white/30'
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
              </div>
              
              <button 
                onClick={nextImage}
                className="bg-slate-900/60 backdrop-blur-sm p-2 rounded-full text-white hover:bg-indigo-600 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>
        
        {/* Right side - Content */}
        <div className="lg:w-1/2 p-6 md:p-8 bg-slate-800 overflow-y-auto custom-scrollbar">
          <div className="mb-2">
            <span className="bg-slate-700 text-gray-300 text-xs font-medium px-2.5 py-1 rounded">
              {project.category}
            </span>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{project.title}</h2>
          
          {/* Client & Duration info */}
          {(project.client || project.duration) && (
            <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-300">
              {project.client && (
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 mr-1 text-indigo-400">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  Client: {project.client}
                </div>
              )}
              
              {project.duration && (
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 mr-1 text-indigo-400">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Duration: {project.duration}
                </div>
              )}
            </div>
          )}
          
          {/* Tabs */}
          <div className="border-b border-slate-700 mb-6 overflow-x-auto whitespace-nowrap pb-1">
            <div className="flex space-x-4">
              <button
                className={`py-2 px-1 border-b-2 ${
                  activeTab === 'overview'
                    ? 'border-indigo-500 text-white'
                    : 'border-transparent text-gray-400 hover:text-gray-300'
                } transition-colors`}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
              
              {project.challenge && (
                <button
                  className={`py-2 px-1 border-b-2 ${
                    activeTab === 'challenge'
                      ? 'border-indigo-500 text-white'
                      : 'border-transparent text-gray-400 hover:text-gray-300'
                  } transition-colors`}
                  onClick={() => setActiveTab('challenge')}
                >
                  Challenge
                </button>
              )}
              
              {project.solution && (
                <button
                  className={`py-2 px-1 border-b-2 ${
                    activeTab === 'solution'
                      ? 'border-indigo-500 text-white'
                      : 'border-transparent text-gray-400 hover:text-gray-300'
                  } transition-colors`}
                  onClick={() => setActiveTab('solution')}
                >
                  Solution
                </button>
              )}
              
              {project.results && (
                <button
                  className={`py-2 px-1 border-b-2 ${
                    activeTab === 'results'
                      ? 'border-indigo-500 text-white'
                      : 'border-transparent text-gray-400 hover:text-gray-300'
                  } transition-colors`}
                  onClick={() => setActiveTab('results')}
                >
                  Results
                </button>
              )}
            </div>
          </div>
          
          {/* Tab content */}
          <div className="text-gray-300 mb-6 leading-relaxed">
            {activeTab === 'overview' && <p>{project.description}</p>}
            {activeTab === 'challenge' && project.challenge && <p>{project.challenge}</p>}
            {activeTab === 'solution' && project.solution && <p>{project.solution}</p>}
            {activeTab === 'results' && project.results && <p>{project.results}</p>}
          </div>
          
          {/* Features */}
          <div className="mb-6">
            <h3 className="text-white font-medium mb-3 text-lg">Key Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {project.features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2 text-green-400 shrink-0 mt-0.5">
                    <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Technologies */}
          <div className="mb-6">
            <h3 className="text-white font-medium mb-3 text-lg">Technologies Used</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="bg-slate-700 text-gray-300 px-3 py-1 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          
          {/* Testimonial if available */}
          {project.testimonial && (
            <div className="mt-8 bg-slate-700/50 rounded-lg p-4 border-l-4 border-indigo-500">
              <p className="text-gray-300 italic mb-3">"{project.testimonial.quote}"</p>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold mr-2">
                  {project.testimonial.author.charAt(0)}
                </div>
                <div>
                  <p className="text-white text-sm font-medium">{project.testimonial.author}</p>
                  <p className="text-gray-400 text-xs">{project.testimonial.position}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ProjectShowcaseModal;