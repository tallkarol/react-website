import { useState, useEffect } from 'react';
import ServiceDetailsModal from '../ui/ServiceDetailsModal';
import { ServiceDetails } from '@/types/types';
import { dataManager } from '@/utils/dataManager';

const ServicesSection = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceDetails | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [services, setServices] = useState<ServiceDetails[]>([]);
  
  // Load services from dataManager instead of direct import
  useEffect(() => {
    const loadedServices = dataManager.getAll<ServiceDetails>('services');
    setServices(loadedServices);
  }, []);
  
  const openServiceModal = (service: ServiceDetails) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const closeServiceModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section 
      id="services" 
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
            Our Services
          </h2>
          <p 
            className="text-xl max-w-2xl mx-auto"
            style={{ color: 'var(--text-secondary)' }}
          >
            Cutting-edge solutions tailored to your business needs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8" style={{ gap: 'var(--grid-gap)' }}>
          {services.map((service) => (
            <div
              key={service.id}
              className="rounded-2xl transition-all duration-300 transform border"
              style={{
                backgroundColor: 'var(--card-bg)',
                borderColor: hoveredId === service.id ? 'var(--primary)' : 'var(--dark-border)',
                boxShadow: hoveredId === service.id ? 'var(--card-shadow)' : 'none',
                transform: hoveredId === service.id ? 'var(--card-hover-transform)' : 'none',
                transition: 'var(--button-transition)',
                padding: 'var(--card-padding)'
              }}
              onMouseEnter={() => setHoveredId(service.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div 
                className="rounded-full flex items-center justify-center mb-6"
                style={{ 
                  backgroundColor: hoveredId === service.id ? 'var(--icon-bg-hover)' : 'var(--icon-bg-default)',
                  color: hoveredId === service.id ? 'var(--icon-color-hover)' : 'var(--icon-color-default)',
                  transition: 'var(--button-transition)',
                  width: 'var(--icon-bg-size)',
                  height: 'var(--icon-bg-size)'
                }}
              >
                {/* Render icon based on iconType */}
                {service.iconType === 'webApp' && (
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="currentColor" 
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Zm14.25 6a.75.75 0 0 1-.22.53l-2.25 2.25a.75.75 0 1 1-1.06-1.06L15.44 12l-1.72-1.72a.75.75 0 1 1 1.06-1.06l2.25 2.25c.141.14.22.331.22.53Zm-10.28-.53a.75.75 0 0 0 0 1.06l2.25 2.25a.75.75 0 1 0 1.06-1.06L8.56 12l1.72-1.72a.75.75 0 1 0-1.06-1.06l-2.25 2.25Z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                {service.iconType === 'ai' && (
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="currentColor" 
                    className="w-6 h-6"
                  >
                    <path d="M16.5 7.5h-9v9h9v-9Z" />
                    <path
                      fillRule="evenodd"
                      d="M8.25 2.25A.75.75 0 0 1 9 3v.75h2.25V3a.75.75 0 0 1 1.5 0v.75H15V3a.75.75 0 0 1 1.5 0v.75h.75a3 3 0 0 1 3 3v.75H21A.75.75 0 0 1 21 9h-.75v2.25H21a.75.75 0 0 1 0 1.5h-.75V15H21a.75.75 0 0 1 0 1.5h-.75v.75a3 3 0 0 1-3 3h-.75V21a.75.75 0 0 1-1.5 0v-.75h-2.25V21a.75.75 0 0 1-1.5 0v-.75H9V21a.75.75 0 0 1-1.5 0v-.75h-.75a3 3 0 0 1-3-3v-.75H3A.75.75 0 0 1 3 15h.75v-2.25H3a.75.75 0 0 1 0-1.5h.75V9H3a.75.75 0 0 1 0-1.5h.75v-.75a3 3 0 0 1 3-3h.75V3a.75.75 0 0 1 .75-.75ZM6 6.75A.75.75 0 0 1 6.75 6h10.5a.75.75 0 0 1 .75.75v10.5a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V6.75Z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                {service.iconType === 'automation' && (
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="currentColor" 
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 6.75a5.25 5.25 0 0 1 6.775-5.025.75.75 0 0 1 .313 1.248l-3.32 3.319c.063.475.276.934.641 1.299.365.365.824.578 1.3.64l3.318-3.319a.75.75 0 0 1 1.248.313 5.25 5.25 0 0 1-5.472 6.756c-1.018-.086-1.87.1-2.309.634L7.344 21.3A3.298 3.298 0 1 1 2.7 16.657l8.684-7.151c.533-.44.72-1.291.634-2.309A5.342 5.342 0 0 1 12 6.75ZM4.117 19.125a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
              
              <h3 
                className="text-2xl font-bold mb-4"
                style={{ color: 'var(--text-primary)' }}
              >
                {service.title}
              </h3>
              <p 
                className="mb-6"
                style={{ color: 'var(--text-secondary)' }}
              >
                {service.description}
              </p>
              
              <div className="space-y-3 mb-6">
                {service.features.slice(0, 4).map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <span style={{ color: 'var(--success)' }} className="mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span style={{ color: 'var(--text-secondary)' }}>{feature}</span>
                  </div>
                ))}
                {service.features.length > 4 && (
                  <div 
                    className="text-sm italic pt-1"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    +{service.features.length - 4} more features
                  </div>
                )}
              </div>
              
              <button 
                onClick={() => openServiceModal(service)}
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
                <span>Learn more</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 ml-2 transition-transform duration-300 transform">
                  <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
      
      {/* Service Modal */}
      {selectedService && (
        <ServiceDetailsModal
          isOpen={isModalOpen}
          onClose={closeServiceModal}
          service={selectedService}
        />
      )}
    </section>
  );
};

export default ServicesSection;