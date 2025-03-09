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
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <div className="p-6 md:p-8 custom-scrollbar">
        {/* Service Header */}
        <div className="flex flex-col md:flex-row md:items-start gap-4 mb-10">
          <div className="bg-indigo-500/20 p-4 rounded-lg text-indigo-400 shrink-0">
            {service.icon}
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">{service.title}</h2>
            <p className="text-gray-300 leading-relaxed">{service.longDescription || service.description}</p>
          </div>
        </div>
        
        {/* Two-column layout for larger screens */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left column */}
          <div>
            {/* Key Features */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <span className="bg-indigo-500/20 p-1 rounded mr-2 text-indigo-400">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 0 1 3.5 2h9A1.5 1.5 0 0 1 14 3.5v11.75A2.75 2.75 0 0 0 16.75 18h-12A2.75 2.75 0 0 1 2 15.25V3.5Zm3.75 7a.75.75 0 0 0 0 1.5h4.5a.75.75 0 0 0 0-1.5h-4.5Zm0-3a.75.75 0 0 0 0 1.5h4.5a.75.75 0 0 0 0-1.5h-4.5ZM9 6.25a.75.75 0 0 0-.75-.75h-3.5a.75.75 0 0 0 0 1.5h3.5A.75.75 0 0 0 9 6.25Z" clipRule="evenodd" />
                  </svg>
                </span>
                Key Features
              </h3>
              <div className="space-y-3 bg-slate-700/30 p-4 rounded-lg">
                {service.features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2 text-green-400 shrink-0 mt-0.5">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Benefits */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <span className="bg-indigo-500/20 p-1 rounded mr-2 text-indigo-400">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" />
                  </svg>
                </span>
                Benefits
              </h3>
              <div className="space-y-4">
                {service.benefits.map((benefit, index) => (
                  <div key={index} className="bg-slate-700/30 rounded-lg p-4 border-l-2 border-indigo-500">
                    <div className="flex items-center mb-2">
                      {benefit.icon || (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2 text-indigo-400">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                        </svg>
                      )}
                      <h4 className="text-white font-medium">{benefit.title}</h4>
                    </div>
                    <p className="text-gray-300 text-sm">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Technologies if available */}
            {service.technologies && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <span className="bg-indigo-500/20 p-1 rounded mr-2 text-indigo-400">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                      <path fillRule="evenodd" d="M17.988 12.246A1 1 0 0 0 17 11.337l-3.468-1.09a7.017 7.017 0 0 1-2.033 2.034l1.09 3.468a1 1 0 0 0 1.857 0l1.642-4.176 1.9 1.9a1 1 0 0 0 1.414-1.414l-1.9-1.9 4.176-1.642a1 1 0 0 0 .909.989ZM7.042 16.34a1 1 0 0 0 1.857 0l1.09-3.468a7.017 7.017 0 0 1-2.033-2.034l-3.468 1.09a1 1 0 0 0 0 1.857l4.176 1.641-1.9 1.9a1 1 0 1 0 1.414 1.415l1.9-1.9 1.641 4.176ZM8.66 2.046a1 1 0 0 0-1.857 0L5.713 5.514a7.017 7.017 0 0 1 2.033 2.034l3.468-1.09a1 1 0 0 0 0-1.857l-4.176-1.642 1.9-1.9a1 1 0 0 0-1.414-1.414l-1.9 1.9L3.983 1.37a1 1 0 0 0-.989-.909Zm8.664 6.266a1 1 0 0 0 0-1.857l-3.468-1.09a7.017 7.017 0 0 1-2.034 2.033l1.09 3.468a1 1 0 0 0 1.857 0l1.642-4.176 1.9 1.9a1 1 0 0 0 1.414-1.414l-1.9-1.9 4.176-1.642a1 1 0 0 0 .909.989Z" clipRule="evenodd" />
                    </svg>
                  </span>
                  Technologies We Use
                </h3>
                <div className="bg-slate-700/30 p-4 rounded-lg">
                  <div className="flex flex-wrap gap-2">
                    {service.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="bg-slate-700 text-gray-300 px-3 py-1 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Right column */}
          <div>
            {/* Our Process */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <span className="bg-indigo-500/20 p-1 rounded mr-2 text-indigo-400">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M2 4.25A2.25 2.25 0 0 1 4.25 2h11.5A2.25 2.25 0 0 1 18 4.25v8.5A2.25 2.25 0 0 1 15.75 15h-3.105a3.501 3.501 0 0 0 1.1 1.677A.75.75 0 0 1 13.26 18H6.74a.75.75 0 0 1-.484-1.323A3.501 3.501 0 0 0 7.355 15H4.25A2.25 2.25 0 0 1 2 12.75v-8.5Zm1.5 0a.75.75 0 0 1 .75-.75h11.5a.75.75 0 0 1 .75.75v7.5a.75.75 0 0 1-.75.75H4.25a.75.75 0 0 1-.75-.75v-7.5Z" clipRule="evenodd" />
                  </svg>
                </span>
                Our Process
              </h3>
              <div className="space-y-6 relative">
                {/* Vertical timeline line */}
                <div className="absolute left-3.5 top-0 bottom-0 w-0.5 bg-slate-700 z-0"></div>
                
                {service.process.map((step, index) => (
                  <div key={index} className="flex relative z-10">
                    <div className="bg-indigo-500 rounded-full w-7 h-7 flex items-center justify-center text-white text-sm font-medium">
                      {index + 1}
                    </div>
                    <div className="ml-4 bg-slate-700/30 rounded-lg p-4 flex-1">
                      <h4 className="text-white font-medium mb-1">{step.title}</h4>
                      <p className="text-gray-300 text-sm">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Case Studies if available */}
            {service.caseStudies && service.caseStudies.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <span className="bg-indigo-500/20 p-1 rounded mr-2 text-indigo-400">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                      <path d="M10 9a3 3 0 100-6 3 3 0 000 6zM6 8a2 2 0 11-4 0 2 2 0 014 0zM1.49 15.326a.78.78 0 01-.358-.442 3 3 0 014.308-3.516 6.484 6.484 0 00-1.905 3.959c-.023.222-.014.442.025.654a4.97 4.97 0 01-2.07-.655zM16.44 15.98a4.97 4.97 0 002.07-.654.78.78 0 00.357-.442 3 3 0 00-4.308-3.517 6.484 6.484 0 011.907 3.96 2.32 2.32 0 01-.026.654zM18 8a2 2 0 11-4 0 2 2 0 014 0zM5.304 16.19a.844.844 0 01-.277-.71 5 5 0 019.947 0 .843.843 0 01-.277.71A6.975 6.975 0 0110 18a6.974 6.974 0 01-4.696-1.81z" />
                    </svg>
                  </span>
                  Case Studies
                </h3>
                <div className="space-y-4">
                  {service.caseStudies.map((study, index) => (
                    <div key={index} className="bg-slate-700/30 rounded-lg p-4 shadow-inner">
                      <h4 className="text-white font-medium mb-2">{study.title}</h4>
                      <p className="text-gray-300 text-sm mb-3">{study.description}</p>
                      {study.link && (
                        <a 
                          href={study.link} 
                          className="text-indigo-400 text-sm inline-flex items-center hover:text-indigo-300 transition-colors"
                        >
                          Read Case Study
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 ml-1">
                            <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                          </svg>
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* FAQ if available */}
            {service.faq && service.faq.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <span className="bg-indigo-500/20 p-1 rounded mr-2 text-indigo-400">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                      <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0ZM8.94 6.94a.75.75 0 1 1-1.06-1.06 3 3 0 0 1 4.24 0 .75.75 0 0 1-1.06 1.06 1.5 1.5 0 0 0-2.12 0ZM12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
                    </svg>
                  </span>
                  Frequently Asked Questions
                </h3>
                <div className="space-y-4">
                  {service.faq.map((item, index) => (
                    <div key={index} className="bg-slate-700/30 rounded-lg p-4 border-l-2 border-indigo-500/50">
                      <h4 className="text-white font-medium mb-2">{item.question}</h4>
                      <p className="text-gray-300 text-sm">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="mt-10 text-center">
          <a 
            href="#contact" 
            onClick={onClose}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-3 rounded-lg inline-flex items-center transition-colors duration-300"
          >
            <span>Get Started with {service.title}</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 ml-2">
              <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </Modal>
  );
};

export default ServiceDetailsModal;