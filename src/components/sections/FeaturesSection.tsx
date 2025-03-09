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

// Helper component to render feature visualizations based on feature type
const FeatureVisualization = ({ feature }: { feature: typeof features[0] }) => {
  switch (feature.type) {
    case 'performance':
      return (
        <div className={`relative p-6 rounded-2xl border shadow-lg backdrop-blur-sm ${feature.image}`}>
          <div className="flex justify-between items-center mb-4">
            <div className="p-2 rounded-lg bg-indigo-500/20">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-indigo-400">
                <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75ZM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 0 1-1.875-1.875V8.625ZM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 0 1 3 19.875v-6.75Z" />
              </svg>
            </div>
            <div className="text-gray-300 text-sm">Performance Metrics</div>
          </div>
          
          <div className="space-y-4">
            {feature.metrics?.map((metric, index) => (
              <div key={index} className="rounded-lg p-4 bg-slate-800/70">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-300 text-sm">{metric.name}</span>
                  <span className="text-green-400 text-sm">{metric.value}</span>
                </div>
                <div className="w-full h-2 rounded-full bg-indigo-900/30">
                  <div 
                    className="h-2 rounded-full bg-green-500" 
                    style={{ width: `${metric.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
      
    case 'scalability':
      return (
        <div className={`relative p-6 rounded-2xl border shadow-lg backdrop-blur-sm ${feature.image}`}>
          <div className="flex justify-between items-center mb-4">
            <div className="p-2 rounded-lg bg-blue-500/20">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-blue-400">
                <path fillRule="evenodd" d="M1.5 5.625c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v12.75c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 0 1 1.5 18.375V5.625Zm1.5 0v1.5h18v-1.5c0-.207-.168-.375-.375-.375H3.375a.375.375 0 0 0-.375.375Zm13.5 3v2.25a.75.75 0 0 1-1.5 0v-2.25a.75.75 0 0 1 1.5 0Zm-7.5 0v2.25a.75.75 0 0 1-1.5 0v-2.25a.75.75 0 0 1 1.5 0Z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="text-gray-300 text-sm">System Architecture</div>
          </div>
          
          <div className="rounded-lg p-4 bg-slate-800/70">
            <div className="grid grid-cols-3 gap-3 mb-4">
              {Array.from({ length: feature.statistics?.servers || 3 }).map((_, i) => (
                <div key={i} className="rounded p-2 flex items-center justify-center bg-blue-500/20">
                  <div className="w-6 h-6 rounded bg-blue-500/40"></div>
                </div>
              ))}
            </div>
            
            <div className="h-6 flex items-center justify-center">
              <div className="w-1 h-6 bg-white/20"></div>
            </div>
            
            <div className="rounded p-3 mb-4 bg-white/5">
              <div className="flex justify-between mb-2">
                <div className="h-2 w-16 rounded bg-white/20"></div>
                <div className="h-2 w-8 rounded bg-blue-500/40"></div>
              </div>
              <div className="h-2 w-full rounded bg-white/20"></div>
            </div>
            
            <div className="h-6 flex items-center justify-center">
              <div className="w-1 h-6 bg-white/20"></div>
            </div>
            
            <div className="grid grid-cols-5 gap-2">
              {Array.from({ length: feature.statistics?.microservices || 5 }).map((_, i) => (
                <div key={i} className="rounded p-1 flex items-center justify-center bg-teal-500/20">
                  <div className="w-4 h-4 rounded-sm bg-teal-500/40"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
      
    case 'security':
      return (
        <div className={`relative p-6 rounded-2xl border shadow-lg backdrop-blur-sm ${feature.image}`}>
          <div className="flex justify-between items-center mb-4">
            <div className="p-2 rounded-lg bg-pink-500/20">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-pink-400">
                <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="text-gray-300 text-sm">Security Console</div>
          </div>
          
          <div className="rounded-lg p-4 mb-4 bg-slate-800/70">
            {feature.protections?.map((protection, index) => (
              <div key={index} className="flex items-center space-x-3 mb-4 last:mb-0">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-teal-500/20">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-teal-400">
                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <div className="text-white text-sm">{protection.name}</div>
                  <div className="text-gray-400 text-xs">
                    {protection.active ? 'Active protection' : 'Inactive'}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="rounded-lg p-3 bg-slate-800/70">
            <div className="text-center text-xs mb-2 text-gray-300">Security Scan</div>
            <div className="h-2 w-full rounded-full mb-1 bg-purple-900/30">
              <div 
                className="h-2 rounded-full bg-green-500" 
                style={{ width: `${feature.securityScore}%` }}
              ></div>
            </div>
            <div className="text-right text-xs text-green-400">{feature.securityScore}% Protected</div>
          </div>
        </div>
      );
      
    default:
      return (
        <div className={`p-6 rounded-2xl border shadow-lg backdrop-blur-sm ${feature.image}`}>
          <div className="text-center text-white">Feature Visualization</div>
        </div>
      );
  }
};

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
                    <FeatureVisualization feature={feature} />
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

export default FeaturesSection;