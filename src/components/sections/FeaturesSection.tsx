import { useState, useRef, useEffect } from 'react'

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
  const [activeTab, setActiveTab] = useState('performance')
  const tabLineRef = useRef<HTMLDivElement>(null)
  const tabsRef = useRef<{ [key: string]: HTMLButtonElement | null }>({})

  const updateTabLine = () => {
    if (!tabLineRef.current || !tabsRef.current[activeTab]) return
    
    const activeTabElement = tabsRef.current[activeTab]
    tabLineRef.current.style.width = `${activeTabElement?.offsetWidth}px`
    tabLineRef.current.style.left = `${activeTabElement?.offsetLeft}px`
  }

  useEffect(() => {
    updateTabLine()
    
    const handleResize = () => {
      updateTabLine()
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [activeTab])

  const features = [
    {
      id: 'performance',
      title: 'High Performance',
      description: 'Our applications are built for speed and efficiency, ensuring optimal user experience across all devices.',
      image: (
        <div className="relative p-6 rounded-2xl border shadow-lg" style={{
          background: 'linear-gradient(135deg, rgba(58, 12, 163, 0.3), rgba(67, 97, 238, 0.2))',
          borderColor: 'var(--dark-border)',
          boxShadow: 'var(--shadow-lg)'
        }}>
          <div 
            className="absolute inset-0 rounded-2xl"
            style={{
              backgroundColor: 'rgba(18, 18, 18, 0.4)',
              backdropFilter: 'blur(8px)',
              borderRadius: 'var(--radius-lg)'
            }}
          ></div>
          <div className="relative">
            <div className="flex justify-between items-center mb-4">
              <div 
                className="p-2 rounded-lg"
                style={{
                  backgroundColor: 'rgba(67, 97, 238, 0.2)',
                  borderRadius: 'var(--radius-md)'
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" style={{ color: 'var(--primary)' }}>
                  <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75ZM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 0 1-1.875-1.875V8.625ZM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 0 1 3 19.875v-6.75Z" />
                </svg>
              </div>
              <div style={{ color: 'var(--text-secondary)' }} className="text-sm">Performance Metrics</div>
            </div>
            
            <div className="space-y-4">
              <div 
                className="rounded-lg p-4"
                style={{ backgroundColor: 'rgba(18, 18, 18, 0.5)' }}
              >
                <div className="flex justify-between mb-2">
                  <span style={{ color: 'var(--text-secondary)' }} className="text-sm">Load Time</span>
                  <span style={{ color: 'var(--success)' }} className="text-sm">0.8s</span>
                </div>
                <div 
                  className="w-full h-2 rounded-full"
                  style={{ backgroundColor: 'rgba(58, 12, 163, 0.3)' }}
                >
                  <div 
                    className="h-2 rounded-full" 
                    style={{ 
                      backgroundColor: 'var(--success)',
                      width: '90%' 
                    }}
                  ></div>
                </div>
              </div>
              
              <div 
                className="rounded-lg p-4"
                style={{ backgroundColor: 'rgba(18, 18, 18, 0.5)' }}
              >
                <div className="flex justify-between mb-2">
                  <span style={{ color: 'var(--text-secondary)' }} className="text-sm">First Contentful Paint</span>
                  <span style={{ color: 'var(--success)' }} className="text-sm">1.2s</span>
                </div>
                <div 
                  className="w-full h-2 rounded-full"
                  style={{ backgroundColor: 'rgba(58, 12, 163, 0.3)' }}
                >
                  <div 
                    className="h-2 rounded-full" 
                    style={{ 
                      backgroundColor: 'var(--success)',
                      width: '85%' 
                    }}
                  ></div>
                </div>
              </div>
              
              <div 
                className="rounded-lg p-4"
                style={{ backgroundColor: 'rgba(18, 18, 18, 0.5)' }}
              >
                <div className="flex justify-between mb-2">
                  <span style={{ color: 'var(--text-secondary)' }} className="text-sm">Time to Interactive</span>
                  <span style={{ color: 'var(--success)' }} className="text-sm">2.1s</span>
                </div>
                <div 
                  className="w-full h-2 rounded-full"
                  style={{ backgroundColor: 'rgba(58, 12, 163, 0.3)' }}
                >
                  <div 
                    className="h-2 rounded-full" 
                    style={{ 
                      backgroundColor: 'var(--success)',
                      width: '75%' 
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'scalability',
      title: 'Scalable Architecture',
      description: 'Our solutions grow with your business, handling increased loads while maintaining performance and reliability.',
      image: (
        <div className="relative p-6 rounded-2xl border shadow-lg" style={{
          background: 'linear-gradient(135deg, rgba(67, 97, 238, 0.2), rgba(247, 37, 133, 0.15))',
          borderColor: 'var(--dark-border)',
          boxShadow: 'var(--shadow-lg)'
        }}>
          <div 
            className="absolute inset-0 rounded-2xl"
            style={{
              backgroundColor: 'rgba(18, 18, 18, 0.4)',
              backdropFilter: 'blur(8px)',
              borderRadius: 'var(--radius-lg)'
            }}
          ></div>
          <div className="relative">
            <div className="flex justify-between items-center mb-4">
              <div 
                className="p-2 rounded-lg"
                style={{
                  backgroundColor: 'rgba(67, 97, 238, 0.2)',
                  borderRadius: 'var(--radius-md)'
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" style={{ color: 'var(--primary)' }}>
                  <path fillRule="evenodd" d="M1.5 5.625c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v12.75c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 0 1 1.5 18.375V5.625Zm1.5 0v1.5h18v-1.5c0-.207-.168-.375-.375-.375H3.375a.375.375 0 0 0-.375.375Zm13.5 3v2.25a.75.75 0 0 1-1.5 0v-2.25a.75.75 0 0 1 1.5 0Zm-7.5 0v2.25a.75.75 0 0 1-1.5 0v-2.25a.75.75 0 0 1 1.5 0Z" clipRule="evenodd" />
                </svg>
              </div>
              <div style={{ color: 'var(--text-secondary)' }} className="text-sm">System Architecture</div>
            </div>
            
            <div 
              className="rounded-lg p-4"
              style={{ backgroundColor: 'rgba(18, 18, 18, 0.5)' }}
            >
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div 
                  className="rounded p-2 flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(67, 97, 238, 0.2)' }}
                >
                  <div 
                    className="w-6 h-6 rounded"
                    style={{ backgroundColor: 'rgba(67, 97, 238, 0.4)' }}
                  ></div>
                </div>
                <div 
                  className="rounded p-2 flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(67, 97, 238, 0.2)' }}
                >
                  <div 
                    className="w-6 h-6 rounded"
                    style={{ backgroundColor: 'rgba(67, 97, 238, 0.4)' }}
                  ></div>
                </div>
                <div 
                  className="rounded p-2 flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(67, 97, 238, 0.2)' }}
                >
                  <div 
                    className="w-6 h-6 rounded"
                    style={{ backgroundColor: 'rgba(67, 97, 238, 0.4)' }}
                  ></div>
                </div>
              </div>
              
              <div className="h-6 flex items-center justify-center">
                <div 
                  className="w-1 h-6"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                ></div>
              </div>
              
              <div 
                className="rounded p-3 mb-4"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
              >
                <div className="flex justify-between mb-2">
                  <div 
                    className="h-2 w-16 rounded"
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                  ></div>
                  <div 
                    className="h-2 w-8 rounded"
                    style={{ backgroundColor: 'rgba(67, 97, 238, 0.4)' }}
                  ></div>
                </div>
                <div 
                  className="h-2 w-full rounded"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                ></div>
              </div>
              
              <div className="h-6 flex items-center justify-center">
                <div 
                  className="w-1 h-6"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                ></div>
              </div>
              
              <div className="grid grid-cols-5 gap-2">
                <div 
                  className="rounded p-1 flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(76, 201, 176, 0.2)' }}
                >
                  <div 
                    className="w-4 h-4 rounded-sm"
                    style={{ backgroundColor: 'rgba(76, 201, 176, 0.4)' }}
                  ></div>
                </div>
                <div 
                  className="rounded p-1 flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(76, 201, 176, 0.2)' }}
                >
                  <div 
                    className="w-4 h-4 rounded-sm"
                    style={{ backgroundColor: 'rgba(76, 201, 176, 0.4)' }}
                  ></div>
                </div>
                <div 
                  className="rounded p-1 flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(76, 201, 176, 0.2)' }}
                >
                  <div 
                    className="w-4 h-4 rounded-sm"
                    style={{ backgroundColor: 'rgba(76, 201, 176, 0.4)' }}
                  ></div>
                </div>
                <div 
                  className="rounded p-1 flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(76, 201, 176, 0.2)' }}
                >
                  <div 
                    className="w-4 h-4 rounded-sm"
                    style={{ backgroundColor: 'rgba(76, 201, 176, 0.4)' }}
                  ></div>
                </div>
                <div 
                  className="rounded p-1 flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(76, 201, 176, 0.2)' }}
                >
                  <div 
                    className="w-4 h-4 rounded-sm"
                    style={{ backgroundColor: 'rgba(76, 201, 176, 0.4)' }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'security',
      title: 'Enhanced Security',
      description: 'We implement advanced security measures to protect your data and ensure compliance with industry standards.',
      image: (
        <div className="relative p-6 rounded-2xl border shadow-lg" style={{
          background: 'linear-gradient(135deg, rgba(58, 12, 163, 0.3), rgba(247, 37, 133, 0.2))',
          borderColor: 'var(--dark-border)',
          boxShadow: 'var(--shadow-lg)'
        }}>
          <div 
            className="absolute inset-0 rounded-2xl"
            style={{
              backgroundColor: 'rgba(18, 18, 18, 0.4)',
              backdropFilter: 'blur(8px)',
              borderRadius: 'var(--radius-lg)'
            }}
          ></div>
          <div className="relative">
            <div className="flex justify-between items-center mb-4">
              <div 
                className="p-2 rounded-lg"
                style={{
                  backgroundColor: 'rgba(247, 37, 133, 0.2)',
                  borderRadius: 'var(--radius-md)'
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" style={{ color: 'var(--accent)' }}>
                  <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z" clipRule="evenodd" />
                </svg>
              </div>
              <div style={{ color: 'var(--text-secondary)' }} className="text-sm">Security Console</div>
            </div>
            
            <div 
              className="rounded-lg p-4 mb-4"
              style={{ backgroundColor: 'rgba(18, 18, 18, 0.5)' }}
            >
              <div className="flex items-center space-x-3 mb-4">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(76, 201, 176, 0.2)' }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" style={{ color: 'var(--success)' }}>
                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <div style={{ color: 'var(--text-primary)' }} className="text-sm">SSL/TLS Encryption</div>
                  <div style={{ color: 'var(--text-muted)' }} className="text-xs">Active protection</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 mb-4">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(76, 201, 176, 0.2)' }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" style={{ color: 'var(--success)' }}>
                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <div style={{ color: 'var(--text-primary)' }} className="text-sm">DDOS Protection</div>
                  <div style={{ color: 'var(--text-muted)' }} className="text-xs">Active protection</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(76, 201, 176, 0.2)' }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" style={{ color: 'var(--success)' }}>
                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <div style={{ color: 'var(--text-primary)' }} className="text-sm">Data Encryption</div>
                  <div style={{ color: 'var(--text-muted)' }} className="text-xs">Active protection</div>
                </div>
              </div>
            </div>
            
            <div 
              className="rounded-lg p-3"
              style={{ backgroundColor: 'rgba(18, 18, 18, 0.5)' }}
            >
              <div style={{ color: 'var(--text-secondary)' }} className="text-center text-xs mb-2">Security Scan</div>
              <div 
                className="h-2 w-full rounded-full mb-1"
                style={{ backgroundColor: 'rgba(58, 12, 163, 0.3)' }}
              >
                <div 
                  className="h-2 rounded-full"
                  style={{ 
                    backgroundColor: 'var(--success)',
                    width: '92%' 
                  }}
                ></div>
              </div>
              <div style={{ color: 'var(--success)' }} className="text-right text-xs">92% Protected</div>
            </div>
          </div>
        </div>
      )
    }
  ]

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