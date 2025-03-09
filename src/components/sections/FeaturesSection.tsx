import { useState, useRef, useEffect } from 'react';
import { features } from '@/data/features';

const FeatureTabPanel = ({ active, id, children }: { active: boolean, id: string, children: React.ReactNode }) => {
  return (
    <div
      role="tabpanel"
      id={`panel-${id}`}
      aria-labelledby={`tab-${id}`}
      className="transition-all duration-500"
      style={{
        opacity: active ? 1 : 0,
        position: active ? 'relative' : 'absolute',
        top: active ? 'auto' : 0,
        left: active ? 'auto' : 0,
        transition: 'var(--transition-normal)'
      }}
    >
      {children}
    </div>
  )
}

const FeaturesSection = () => {
  const [activeTab, setActiveTab] = useState('performance');
  const tabLineRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  const updateTabLine = () => {
    if (!tabLineRef.current || !tabsRef.current[activeTab]) return;
    
    const activeTabElement = tabsRef.current[activeTab];
    tabLineRef.current.style.width = `${activeTabElement?.offsetWidth}px`;
    tabLineRef.current.style.left = `${activeTabElement?.offsetLeft}px`;
  }

  useEffect(() => {
    updateTabLine();
    
    const handleResize = () => {
      updateTabLine();
    }

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, [activeTab]);

  return (
    <section 
      id="technology" 
      style={{
        backgroundColor: 'var(--dark-surface)',
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
            Key Features
          </h2>
          <p 
            className="text-xl max-w-2xl mx-auto"
            style={{ color: 'var(--text-secondary)' }}
          >
            Our technology stack ensures your applications are built to last
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Tabs */}
          <div className="relative mb-12">
            <div 
              className="flex justify-center md:justify-start"
              style={{ borderBottom: '1px solid var(--dark-border)' }}
            >
              {features.map((feature) => (
                <button
                  key={feature.id}
                  ref={(el) => {tabsRef.current[feature.id] = el}}
                  role="tab"
                  id={`tab-${feature.id}`}
                  aria-controls={`panel-${feature.id}`}
                  aria-selected={activeTab === feature.id}
                  className="py-4 px-6 text-lg font-medium transition-colors duration-300 relative"
                  style={{ 
                    color: activeTab === feature.id ? 'var(--text-primary)' : 'var(--text-muted)',
                    transition: 'var(--button-transition)'
                  }}
                  onClick={() => setActiveTab(feature.id)}
                >
                  {feature.title}
                </button>
              ))}
            </div>
            <div 
              ref={tabLineRef}
              className="absolute bottom-0 h-1 transition-all duration-300"
              style={{
                backgroundColor: 'var(--primary)',
                transition: 'var(--button-transition)'
              }}
            />
          </div>
          
          {/* Tab content */}
          <div className="relative">
            {features.map((feature) => (
              <FeatureTabPanel
                key={feature.id}
                id={feature.id}
                active={activeTab === feature.id}
              >
                <div className="grid md:grid-cols-2 gap-10 items-center">
                  <div className="order-2 md:order-1">
                    <h3 
                      className="text-2xl font-bold mb-4"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {feature.title}
                    </h3>
                    <p 
                      className="mb-6"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {feature.description}
                    </p>
                    <button
                      style={{
                        backgroundColor: 'var(--primary)',
                        color: 'var(--text-primary)',
                        borderRadius: 'var(--button-radius)',
                        padding: 'var(--button-padding)',
                        transition: 'var(--button-transition)'
                      }}
                      className="px-6 py-3 rounded-lg transition-all duration-300"
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = 'var(--button-hover-transform)';
                        e.currentTarget.style.backgroundColor = 'var(--primary-hover)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'none';
                        e.currentTarget.style.backgroundColor = 'var(--primary)';
                      }}
                    >
                      Learn More
                    </button>
                  </div>
                  <div className="order-1 md:order-2">
                    {feature.image}
                  </div>
                </div>
              </FeatureTabPanel>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection