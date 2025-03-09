import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Feature } from '@/types/types';
import { dataManager } from '@/utils/dataManager';

// Tab panel component with animations
const FeatureTabPanel = ({ 
  id, 
  active, 
  children 
}: { 
  id: string; 
  active: boolean;
  children: React.ReactNode;
}) => {
  return (
    <AnimatePresence mode="wait">
      {active && (
        <motion.div
          key={id}
          id={`panel-${id}`}
          role="tabpanel"
          aria-labelledby={`tab-${id}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="focus:outline-none"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const FeaturesSection = () => {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [activeTab, setActiveTab] = useState<string>("");
  const tabsRef = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  // Load features from dataManager
  useEffect(() => {
    const loadedFeatures = dataManager.getAll<Feature>('features');
    setFeatures(loadedFeatures);
    
    // Set the first feature as active if we have features
    if (loadedFeatures.length > 0 && !activeTab) {
      setActiveTab(loadedFeatures[0].id);
    }
  }, [activeTab]);

  // Function to handle keyboard navigation for tabs
  const handleKeyDown = useCallback((event: React.KeyboardEvent, currentTabIndex: number) => {
    if (features.length === 0) return;
    
    const tabIds = features.map(feature => feature.id);
    
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      const nextIndex = (currentTabIndex + 1) % features.length;
      setActiveTab(tabIds[nextIndex]);
      tabsRef.current[tabIds[nextIndex]]?.focus();
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      const prevIndex = (currentTabIndex - 1 + features.length) % features.length;
      setActiveTab(tabIds[prevIndex]);
      tabsRef.current[tabIds[prevIndex]]?.focus();
    }
  }, [features]);

  // Return the icons for the features based on type
  const getFeatureIcon = (featureType: string) => {
    switch (featureType) {
      case 'performance':
        return (
          <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 14.5L12 9.5L17 14.5M6 20H18C19.1046 20 20 19.1046 20 18V6C20 4.89543 19.1046 4 18 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20Z" 
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'scalability':
        return (
          <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.325 4.317C10.751 2.561 13.249 2.561 13.675 4.317C13.7389 4.5808 13.8642 4.82578 14.0407 5.032C14.2172 5.23822 14.4399 5.39985 14.6907 5.50375C14.9414 5.60764 15.2132 5.65085 15.4838 5.62987C15.7544 5.60889 16.0162 5.5243 16.248 5.383C17.791 4.443 19.558 6.209 18.618 7.753C18.4769 7.98466 18.3924 8.24634 18.3715 8.51677C18.3506 8.78721 18.3938 9.05877 18.4975 9.30938C18.6013 9.55999 18.7627 9.78258 18.9687 9.95905C19.1747 10.1355 19.4194 10.2609 19.683 10.325C21.439 10.751 21.439 13.249 19.683 13.675C19.4192 13.7389 19.1742 13.8642 18.968 14.0407C18.7618 14.2172 18.6001 14.4399 18.4963 14.6907C18.3924 14.9414 18.3491 15.2132 18.3701 15.4838C18.3911 15.7544 18.4757 16.0162 18.617 16.248C19.557 17.791 17.791 19.558 16.247 18.618C16.0153 18.4769 15.7537 18.3924 15.4832 18.3715C15.2128 18.3506 14.9412 18.3938 14.6906 18.4975C14.44 18.6013 14.2174 18.7627 14.0409 18.9687C13.8645 19.1747 13.7391 19.4194 13.675 19.683C13.249 21.439 10.751 21.439 10.325 19.683C10.2611 19.4192 10.1358 19.1742 9.95929 18.968C9.7828 18.7618 9.56011 18.6001 9.30935 18.4963C9.05859 18.3924 8.78683 18.3491 8.51621 18.3701C8.24559 18.3911 7.98375 18.4757 7.752 18.617C6.209 19.557 4.442 17.791 5.382 16.247C5.5231 16.0153 5.60755 15.7537 5.62848 15.4832C5.6494 15.2128 5.60624 14.9412 5.5025 14.6906C5.39876 14.44 5.23726 14.2174 5.03127 14.0409C4.82529 13.8645 4.58056 13.7391 4.317 13.675C2.561 13.249 2.561 10.751 4.317 10.325C4.5808 10.2611 4.82578 10.1358 5.032 9.95929C5.23822 9.7828 5.39985 9.56011 5.50375 9.30935C5.60764 9.05859 5.65085 8.78683 5.62987 8.51621C5.60889 8.24559 5.5243 7.98375 5.383 7.752C4.443 6.209 6.209 4.442 7.753 5.382C8.753 5.99 10.049 5.452 10.325 4.317Z" 
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" 
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'security':
        return (
          <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 12L11 14L15 10M20.618 5.984C17.4537 5.30814 14.4979 3.93218 12 2C9.50207 3.93218 6.54629 5.30814 3.382 5.984C3.12754 6.02793 2.89898 6.16066 2.73758 6.35869C2.57618 6.55672 2.49142 6.80905 2.5 7.066V13C2.5 15.684 3.66 18.073 5.5 19.825C7.435 21.661 9.695 22.785 11.955 22.985C11.9848 22.9891 12.0152 22.9891 12.045 22.985C14.305 22.785 16.565 21.661 18.5 19.825C20.34 18.074 21.5 15.684 21.5 13V7.066C21.5086 6.80905 21.4238 6.55672 21.2624 6.35869C21.101 6.16066 20.8725 6.02793 20.618 5.984Z" 
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      default:
        return (
          <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" 
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
    }
  };

  // Extract benefits from feature based on type
  const getFeatureBenefits = (feature: Feature): string[] => {
    if (feature.metrics) {
      return feature.metrics.map(m => `${m.name}: ${m.value}`);
    } else if (feature.statistics) {
      return [
        `Servers: ${feature.statistics.servers}`,
        `Load Balancing: ${feature.statistics.loadBalancing ? 'Enabled' : 'Disabled'}`,
        `Microservices: ${feature.statistics.microservices}`
      ];
    } else if (feature.protections) {
      return feature.protections.map(p => `${p.name}: ${p.active ? 'Active' : 'Inactive'}`);
    }
    
    // Default
    return ['Feature benefit 1', 'Feature benefit 2', 'Feature benefit 3', 'Feature benefit 4'];
  };

  return (
    <section id="features" className="py-24" style={{ background: 'var(--bg-gradient, linear-gradient(to bottom, var(--bg-dark, #0f172a), var(--bg-darker, #1e293b), var(--bg-dark, #0f172a)))' }}>
      <div className="container mx-auto px-4">
        {/* Section header with animated underline */}
        <div className="text-center mb-16 relative">
          <h2 className="text-4xl md:text-5xl font-bold mb-4" 
              style={{ color: 'var(--text-primary, white)' }}>
            Powerful Features
            <motion.div 
              style={{ 
                background: 'var(--gradient-primary, linear-gradient(to right, var(--color-primary, #6366f1), var(--color-secondary, #a855f7)))',
                height: '4px',
                position: 'absolute',
                bottom: '-8px',
                left: '50%',
                borderRadius: '9999px'
              }}
              initial={{ width: "0%", x: "-50%" }}
              whileInView={{ width: "80px", x: "-50%" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
            />
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mt-6"
             style={{ color: 'var(--text-secondary, #cbd5e1)' }}>
            Our platform offers a comprehensive suite of tools designed to enhance your business efficiency and drive sustainable growth.
          </p>
        </div>

        {features.length > 0 && (
          <div className="max-w-6xl mx-auto">
            {/* Enhanced Tabs Navigation with CSS Variables */}
            <div className="mb-16">
              <div className="flex overflow-x-auto hide-scrollbar pb-2 justify-center">
                <div className="inline-flex p-1.5 rounded-xl shadow-xl"
                     style={{ 
                       background: 'var(--bg-component, rgba(30, 41, 59, 0.5))', 
                       backdropFilter: 'blur(8px)'
                     }}>
                  {features.map((feature, index) => (
                    <button
                      key={feature.id}
                      ref={(el) => {tabsRef.current[feature.id] = el}}
                      role="tab"
                      id={`tab-${feature.id}`}
                      aria-controls={`panel-${feature.id}`}
                      aria-selected={activeTab === feature.id}
                      className="relative flex items-center gap-2 py-2.5 px-5 rounded-lg text-sm md:text-base font-medium transition-all duration-300 focus:outline-none"
                      style={{ 
                        color: activeTab === feature.id 
                          ? 'var(--text-primary, white)' 
                          : 'var(--text-secondary, #cbd5e1)',
                        background: activeTab === feature.id 
                          ? 'transparent' 
                          : 'transparent',
                        boxShadow: activeTab === feature.id ? 'var(--shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1))' : 'none'
                      }}
                      onClick={() => setActiveTab(feature.id)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                    >
                      <span className="w-5 h-5">{getFeatureIcon(feature.type)}</span>
                      {feature.title}
                      {activeTab === feature.id && (
                        <motion.span 
                          className="absolute bottom-0 left-0 right-0 h-full rounded-lg -z-10"
                          style={{ 
                            background: 'var(--gradient-primary, linear-gradient(to right, var(--color-primary, #6366f1), var(--color-primary-dark, #4f46e5)))'
                          }}
                          layoutId="activeTab"
                          transition={{ type: "spring", duration: 0.5 }}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Feature Content with Animations */}
            <div className="relative min-h-[400px]">
              {features.map((feature) => (
                <FeatureTabPanel
                  key={feature.id}
                  id={feature.id}
                  active={activeTab === feature.id}
                >
                  <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="order-2 md:order-1">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                      >
                        <h3 className="text-3xl font-bold mb-6"
                            style={{ 
                              background: 'var(--gradient-text, linear-gradient(to right, var(--color-primary-light, #818cf8), var(--color-secondary-light, #c084fc)))',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                              backgroundClip: 'text'
                            }}>
                          {feature.title}
                        </h3>
                        <p className="mb-8 text-lg leading-relaxed"
                           style={{ color: 'var(--text-secondary, #cbd5e1)' }}>
                          {feature.description}
                        </p>
                        
                        <div className="space-y-4 mb-8">
                          <h4 className="text-lg font-semibold" style={{ color: 'var(--color-primary-light, #818cf8)' }}>
                            Key Benefits
                          </h4>
                          <ul className="grid grid-cols-2 gap-y-2 gap-x-4">
                            {getFeatureBenefits(feature).map((benefit, idx) => (
                              <li key={idx} className="flex items-start" style={{ color: 'var(--text-secondary, #cbd5e1)' }}>
                                <span className="mr-2 mt-1 shrink-0" style={{ color: 'var(--color-primary, #6366f1)' }}>
                                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8 0C3.6 0 0 3.6 0 8C0 12.4 3.6 16 8 16C12.4 16 16 12.4 16 8C16 3.6 12.4 0 8 0ZM7 11.4L3.6 8L5 6.6L7 8.6L11 4.6L12.4 6L7 11.4Z" fill="currentColor"/>
                                  </svg>
                                </span>
                                {benefit}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <button className="px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2"
                                  style={{
                                    background: 'var(--gradient-primary, linear-gradient(to right, var(--color-primary, #6366f1), var(--color-primary-dark, #4f46e5)))',
                                    color: 'var(--text-on-primary, white)',
                                    boxShadow: 'var(--shadow-primary, 0 10px 15px -3px rgba(99, 102, 241, 0.2))'
                                  }}>
                            Learn More
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M4.16667 10H15.8333M15.8333 10L10 4.16667M15.8333 10L10 15.8333" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </button>
                        </motion.div>
                      </motion.div>
                    </div>
                    
                    <motion.div 
                      className="order-1 md:order-2"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <div className="relative p-1 rounded-2xl shadow-2xl rotate-1 hover:rotate-0 transition-all duration-500"
                           style={{ 
                             background: 'var(--gradient-primary, linear-gradient(to bottom right, var(--color-primary, #6366f1), var(--color-secondary, #a855f7)))'
                           }}>
                        <div className={`rounded-xl p-8 ${feature.image}`}
                             style={{ 
                               background: 'var(--bg-card, #1e293b)', 
                               backdropFilter: 'blur(8px)'
                             }}>
                          <div className="aspect-square w-full max-w-sm mx-auto flex items-center justify-center p-6 relative">
                            <div className="absolute inset-0 rounded-xl"
                                 style={{ background: 'var(--color-primary-subtle, rgba(99, 102, 241, 0.1))' }}></div>
                            <div className="w-full h-full max-w-[180px] max-h-[180px] mx-auto"
                                 style={{ color: 'var(--color-primary, #6366f1)' }}>
                              {getFeatureIcon(feature.type)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </FeatureTabPanel>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturesSection;