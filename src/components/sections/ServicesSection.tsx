import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ServiceDetailsModal from '../ui/ServiceDetailsModal';
import { ServiceDetails } from '@/types/types';
import { dataManager } from '@/utils/dataManager';
import ServiceIcon from '../ui/ServiceIcon';

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
      className="py-24"
      style={{ background: 'var(--gradient-dark)' }}
    >
      <div className="container mx-auto px-4" style={{ maxWidth: 'var(--content-max-width)' }}>
        {/* Section Header with animated underline - matching Projects and Features */}
        <div className="text-center mb-16 relative">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: 'var(--text-primary)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Our Services
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
            Cutting-edge solutions tailored to your business needs
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8" style={{ gap: 'var(--grid-gap)' }}>
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * (index % 3) }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredId(service.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => openServiceModal(service)}
              className="group cursor-pointer"
            >
              <div 
                className="rounded-2xl overflow-hidden transition-all duration-500 h-full"
                style={{
                  backgroundColor: 'var(--card-bg)',
                  borderRadius: 'var(--radius-lg)',
                  border: hoveredId === service.id ? 'var(--card-hover-border)' : 'var(--card-border)',
                  transform: hoveredId === service.id ? 'var(--card-hover-transform)' : 'none',
                  boxShadow: hoveredId === service.id ? 'var(--card-shadow)' : 'none',
                  transition: 'var(--transition-normal)'
                }}
              >
                <div className="p-8 flex flex-col h-full">
                  {/* Service Icon */}
                  <div 
                    className="rounded-full mb-6 flex items-center justify-center"
                    style={{ 
                      backgroundColor: hoveredId === service.id ? 'var(--icon-bg-hover)' : 'var(--icon-bg-default)',
                      color: hoveredId === service.id ? 'var(--icon-color-hover)' : 'var(--icon-color-default)',
                      transition: 'var(--transition-normal)',
                      width: 'var(--icon-bg-size)',
                      height: 'var(--icon-bg-size)'
                    }}
                  >
                    <ServiceIcon iconType={service.iconType} />
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
                  
                  {/* Features list - more minimal with proper spacing */}
                  <div className="space-y-3 mb-auto">
                    {service.features.slice(0, 4).map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2 shrink-0 mt-0.5" style={{ color: 'var(--success)' }}>
                          <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" />
                        </svg>
                        <span style={{ color: 'var(--text-secondary)' }}>{feature}</span>
                      </div>
                    ))}
                    {service.features.length > 4 && (
                      <div 
                        className="text-sm pt-1"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        +{service.features.length - 4} more features
                      </div>
                    )}
                  </div>
                  
                  {/* Learn more button with animation effect - consistent with Projects */}
                  <div className="mt-6">
                    <motion.div
                      className="flex items-center text-sm font-medium"
                      style={{ 
                        color: 'var(--primary)',
                        transition: 'var(--button-transition)'
                      }}
                    >
                      <span>Learn more</span>
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 20 20" 
                        fill="currentColor" 
                        className="w-5 h-5 ml-2 transition-transform duration-300"
                        style={{
                          transform: hoveredId === service.id ? 'translateX(4px)' : 'translateX(0)',
                          transition: 'var(--transition-normal)'
                        }}
                      >
                        <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
                      </svg>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* CTA - Matching the one in Projects section */}
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
            className="btn-primary inline-flex items-center px-8 py-3 shadow-lg"
            style={{
              backgroundColor: 'var(--primary)',
              color: 'var(--text-primary)',
              borderRadius: 'var(--button-radius)',
              padding: 'var(--button-padding)',
              boxShadow: '0 10px 15px -3px rgba(67, 97, 238, 0.3)',
            }}
          >
            <span className="mr-2">Explore Our Services</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
            </svg>
          </motion.a>
        </motion.div>
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