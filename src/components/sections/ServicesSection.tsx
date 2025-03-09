import { useState } from 'react';
import ServiceDetailsModal from '../ui/ServiceDetailsModal';
import { services } from '@/data/services';
import { ServiceDetails } from '@/types/types';

const ServicesSection = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceDetails | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
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
                {service.icon}
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