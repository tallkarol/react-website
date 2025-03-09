import { useState } from 'react';
import Modal from './Modal';

// Service data interface
export interface ServiceDetails {
  id: number;
  title: string;
  description: string;
  longDescription?: string;
  icon: React.ReactNode;
  features: string[];
  benefits: {
    title: string;
    description: string;
    icon?: React.ReactNode;
  }[];
  process: {
    title: string;
    description: string;
    icon?: React.ReactNode;
  }[];
  technologies?: string[];
  caseStudies?: {
    title: string;
    description: string;
    link?: string;
  }[];
  faq?: {
    question: string;
    answer: string;
  }[];
}

interface ServiceDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: ServiceDetails;
}

const ServiceDetailsModal = ({ isOpen, onClose, service }: ServiceDetailsModalProps) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'benefits' | 'process' | 'tech' | 'cases' | 'faq'>('overview');
  
  // Show tabs only if we have content for them
  const showBenefitsTab = service.benefits && service.benefits.length > 0;
  const showProcessTab = service.process && service.process.length > 0;
  const showTechTab = service.technologies && service.technologies.length > 0;
  const showCasesTab = service.caseStudies && service.caseStudies.length > 0;
  const showFaqTab = service.faq && service.faq.length > 0;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <div className="flex flex-col h-full">
        {/* Service Header */}
        <div className="bg-brand-gradient p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg text-white shrink-0">
              {service.icon}
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{service.title}</h2>
              <p className="text-text-muted leading-relaxed">{service.description}</p>
            </div>
          </div>
        </div>
        
        {/* Tabbed Navigation */}
        <div className="bg-background-dark border-b border-border-light">
          <div className="container mx-auto px-4">
            <div className="flex overflow-x-auto space-x-2 py-2 custom-scrollbar">
              <button
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'overview' 
                    ? 'bg-primary text-white' 
                    : 'hover:bg-primary-light/50 text-text-muted'
                }`}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
              
              {showBenefitsTab && (
                <button
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'benefits' 
                      ? 'bg-primary text-white' 
                      : 'hover:bg-primary-light/50 text-text-muted'
                  }`}
                  onClick={() => setActiveTab('benefits')}
                >
                  Benefits
                </button>
              )}
              
              {showProcessTab && (
                <button
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'process' 
                      ? 'bg-primary text-white' 
                      : 'hover:bg-primary-light/50 text-text-muted'
                  }`}
                  onClick={() => setActiveTab('process')}
                >
                  Our Process
                </button>
              )}
              
              {showTechTab && (
                <button
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'tech' 
                      ? 'bg-primary text-white' 
                      : 'hover:bg-primary-light/50 text-text-muted'
                  }`}
                  onClick={() => setActiveTab('tech')}
                >
                  Technologies
                </button>
              )}
              
              {showCasesTab && (
                <button
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'cases' 
                      ? 'bg-primary text-white' 
                      : 'hover:bg-primary-light/50 text-text-muted'
                  }`}
                  onClick={() => setActiveTab('cases')}
                >
                  Case Studies
                </button>
              )}
              
              {showFaqTab && (
                <button
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'faq' 
                      ? 'bg-primary text-white' 
                      : 'hover:bg-primary-light/50 text-text-muted'
                  }`}
                  onClick={() => setActiveTab('faq')}
                >
                  FAQ
                </button>
              )}
            </div>
          </div>
        </div>
        
        {/* Tab Content */}
        <div className="flex-grow overflow-y-auto p-6 md:p-8 custom-scrollbar">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-text-on-dark mb-4">About this Service</h3>
                  <p className="text-text-muted mb-6">{service.longDescription || service.description}</p>
                  
                  <h3 className="text-xl font-semibold text-text-on-dark mb-4">Key Features</h3>
                  <div className="bg-primary-light/10 p-5 rounded-lg border border-primary-light/20">
                    <div className="grid md:grid-cols-2 gap-3">
                      {service.features.map((feature, index) => (
                        <div key={index} className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2 text-success shrink-0 mt-0.5">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                          </svg>
                          <span className="text-text-muted">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col">
                  {/* Highlight Cards */}
                  <div className="bg-accent-gradient p-6 rounded-lg text-text-on-dark mb-4">
                    <h3 className="text-xl font-bold mb-2">Why Choose Our {service.title}?</h3>
                    <p className="text-text-on-dark/80">Our approach combines industry expertise with cutting-edge technology to deliver solutions that drive real business results.</p>
                  </div>
                  
                  {service.benefits && service.benefits.length > 0 && (
                    <div className="p-6 rounded-lg bg-background-dark border border-border-light">
                      <h3 className="text-lg font-semibold text-text-on-dark mb-3">Top Benefits</h3>
                      <div className="space-y-3">
                        {service.benefits.slice(0, 3).map((benefit, index) => (
                          <div key={index} className="flex items-start">
                            <span className="bg-primary-light rounded-full w-6 h-6 flex items-center justify-center text-primary shrink-0 mr-2">
                              {index + 1}
                            </span>
                            <div>
                              <span className="text-text-on-dark font-medium">{benefit.title}</span>
                              {index === 0 && (
                                <p className="text-text-muted text-sm mt-1">{benefit.description}</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                      {service.benefits.length > 3 && (
                        <button 
                          className="text-primary text-sm mt-3 flex items-center"
                          onClick={() => setActiveTab('benefits')}
                        >
                          View All Benefits
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 ml-1">
                            <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                          </svg>
                        </button>
                      )}
                    </div>
                  )}
                  
                  {/* CTA Card */}
                  <div className="mt-auto">
                    <div className="bg-primary-light/10 p-6 rounded-lg border border-primary-light/20 mt-4">
                      <h4 className="text-lg font-medium text-text-on-dark mb-2">Ready to get started?</h4>
                      <p className="text-text-muted mb-4">Contact us today for a consultation about your project needs.</p>
                      <a 
                        href="#contact" 
                        onClick={onClose}
                        className="btn btn-primary w-full flex items-center justify-center"
                      >
                        Request a Quote
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 ml-2">
                          <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Benefits Tab */}
          {activeTab === 'benefits' && (
            <div className="max-w-5xl mx-auto">
              <h3 className="text-2xl font-semibold text-text-on-dark mb-6">Key Benefits</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {service.benefits.map((benefit, index) => (
                  <div key={index} className="bg-background-dark card hover:border-primary-light/30">
                    <div className="p-6">
                      <div className="bg-primary-light rounded-lg w-12 h-12 flex items-center justify-center text-primary mb-4">
                        {benefit.icon || (
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <h4 className="text-text-on-dark text-xl font-medium mb-3">{benefit.title}</h4>
                      <p className="text-text-muted">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-10">
                <a 
                  href="#contact" 
                  onClick={onClose}
                  className="btn btn-primary inline-flex items-center"
                >
                  Discuss Your Project
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 ml-2">
                    <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          )}
          
          {/* Process Tab */}
          {activeTab === 'process' && (
            <div className="max-w-5xl mx-auto">
              <h3 className="text-2xl font-semibold text-text-on-dark mb-6">Our Process</h3>
              <div className="relative">
                {/* Vertical timeline line (desktop) */}
                <div className="absolute left-[42px] top-0 bottom-0 w-1 bg-primary-light/30 z-0 hidden md:block"></div>
                
                {/* Horizontal timeline line (mobile) */}
                <div className="absolute left-0 top-[42px] right-0 h-1 bg-primary-light/30 z-0 md:hidden"></div>
                
                <div className="flex flex-col md:flex-row gap-6 relative z-10">
                  {service.process.map((step, index) => (
                    <div 
                      key={index} 
                      className="flex md:flex-col items-start md:items-center relative flex-1"
                    >
                      <div className="bg-primary rounded-full w-16 h-16 flex items-center justify-center text-text-on-dark text-xl font-bold shrink-0 z-10">
                        {index + 1}
                      </div>
                      
                      <div className="ml-4 md:ml-0 md:mt-4 md:text-center">
                        <h4 className="text-text-on-dark font-medium text-lg mb-2">{step.title}</h4>
                        <p className="text-text-muted">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-12 p-6 rounded-lg bg-accent-gradient text-text-on-dark text-center">
                <h4 className="text-xl font-medium mb-3">Ready to get started?</h4>
                <p className="mb-4">Let's work together to bring your vision to life.</p>
                <a 
                  href="#contact" 
                  onClick={onClose}
                  className="btn inline-flex items-center bg-white text-primary hover:bg-white/90"
                >
                  Start Your Project
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 ml-2">
                    <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          )}
          
          {/* Technologies Tab */}
          {activeTab === 'tech' && service.technologies && (
            <div className="max-w-5xl mx-auto">
              <h3 className="text-2xl font-semibold text-text-on-dark mb-6">Technologies We Use</h3>
              
              <div className="bg-background-dark rounded-lg p-8 border border-border-light mb-8">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {service.technologies.map((tech, index) => (
                    <div 
                      key={index} 
                      className="bg-primary-light/10 hover:bg-primary-light/20 border border-primary-light/20 rounded-lg p-4 text-center transition-colors"
                    >
                      <div className="text-primary text-3xl mb-2 opacity-80">
                        {/* This would ideally be replaced with actual tech icons */}
                        <span>{tech.charAt(0)}</span>
                      </div>
                      <span className="text-text-on-dark">{tech}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-primary-light/10 rounded-lg p-6 border border-primary-light/20">
                <h4 className="text-xl text-text-on-dark font-medium mb-3">Why Our Technology Stack Matters</h4>
                <p className="text-text-muted mb-4">
                  We carefully select technologies that offer the best balance of performance, scalability, and maintainability. 
                  Our stack is continuously evaluated to ensure we're using the most effective tools for your specific needs.
                </p>
                <div className="flex justify-end">
                  <a 
                    href="#contact" 
                    onClick={onClose}
                    className="btn btn-primary inline-flex items-center"
                  >
                    Discuss Tech Requirements
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 ml-2">
                      <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          )}
          
          {/* Case Studies Tab */}
          {activeTab === 'cases' && service.caseStudies && (
            <div className="max-w-5xl mx-auto">
              <h3 className="text-2xl font-semibold text-text-on-dark mb-6">Success Stories</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                {service.caseStudies.map((study, index) => (
                  <div key={index} className="card hover:border-primary">
                    <div className="h-40 bg-accent-gradient rounded-t-lg flex items-center justify-center text-text-on-dark">
                      <span className="text-2xl font-bold opacity-60">Case Study {index + 1}</span>
                    </div>
                    <div className="p-6">
                      <h4 className="text-xl text-text-on-dark font-medium mb-3">{study.title}</h4>
                      <p className="text-text-muted mb-4">{study.description}</p>
                      {study.link && (
                        <a 
                          href={study.link} 
                          className="text-primary inline-flex items-center hover:text-primary-hover transition-colors"
                        >
                          Read Full Case Study
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 ml-1">
                            <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-10">
                <a 
                  href="#contact" 
                  onClick={onClose}
                  className="btn btn-primary inline-flex items-center"
                >
                  Become Our Next Success Story
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 ml-2">
                    <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          )}
          
          {/* FAQ Tab */}
          {activeTab === 'faq' && service.faq && (
            <div className="max-w-5xl mx-auto">
              <h3 className="text-2xl font-semibold text-text-on-dark mb-6">Frequently Asked Questions</h3>
              
              <div className="space-y-4 mb-10">
                {service.faq.map((item, index) => (
                  <div 
                    key={index} 
                    className="bg-background-dark p-6 rounded-lg border border-border-light hover:border-primary-light/30 transition-colors"
                  >
                    <h4 className="text-lg text-text-on-dark font-medium mb-3 flex items-start">
                      <span className="text-primary mr-2">Q:</span>
                      {item.question}
                    </h4>
                    <p className="text-text-muted pl-6">{item.answer}</p>
                  </div>
                ))}
              </div>
              
              <div className="bg-primary-light/10 rounded-lg p-6 border border-primary-light/20 text-center">
                <h4 className="text-xl text-text-on-dark font-medium mb-2">Have More Questions?</h4>
                <p className="text-text-muted mb-4">We're happy to discuss your specific requirements and answer any questions you might have.</p>
                <a 
                  href="#contact" 
                  onClick={onClose}
                  className="btn btn-primary inline-flex items-center"
                >
                  Contact Us
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 ml-2">
                    <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ServiceDetailsModal;