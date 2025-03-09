import { useState, useRef, useEffect } from 'react'

const FeatureTabPanel = ({ active, id, children }: { active: boolean, id: string, children: React.ReactNode }) => {
  return (
    <div
      role="tabpanel"
      id={`panel-${id}`}
      aria-labelledby={`tab-${id}`}
      className={`transition-all duration-500 ${active ? 'opacity-100' : 'opacity-0 absolute top-0 left-0'}`}
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
        <div className="relative p-6 bg-gradient-to-br from-indigo-900/40 to-sky-900/40 rounded-2xl border border-slate-700/50 shadow-lg">
          <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm rounded-2xl"></div>
          <div className="relative">
            <div className="flex justify-between items-center mb-4">
              <div className="p-2 bg-indigo-500/20 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-indigo-400">
                  <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75ZM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 0 1-1.875-1.875V8.625ZM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 0 1 3 19.875v-6.75Z" />
                </svg>
              </div>
              <div className="text-indigo-300 text-sm">Performance Metrics</div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-slate-800/50 rounded-lg p-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-300 text-sm">Load Time</span>
                  <span className="text-green-400 text-sm">0.8s</span>
                </div>
                <div className="w-full bg-slate-700/50 rounded-full h-2">
                  <div className="bg-green-400 h-2 rounded-full" style={{ width: '90%' }}></div>
                </div>
              </div>
              
              <div className="bg-slate-800/50 rounded-lg p-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-300 text-sm">First Contentful Paint</span>
                  <span className="text-green-400 text-sm">1.2s</span>
                </div>
                <div className="w-full bg-slate-700/50 rounded-full h-2">
                  <div className="bg-green-400 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              
              <div className="bg-slate-800/50 rounded-lg p-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-300 text-sm">Time to Interactive</span>
                  <span className="text-green-400 text-sm">2.1s</span>
                </div>
                <div className="w-full bg-slate-700/50 rounded-full h-2">
                  <div className="bg-green-400 h-2 rounded-full" style={{ width: '75%' }}></div>
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
        <div className="relative p-6 bg-gradient-to-br from-sky-900/40 to-teal-900/40 rounded-2xl border border-slate-700/50 shadow-lg">
          <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm rounded-2xl"></div>
          <div className="relative">
            <div className="flex justify-between items-center mb-4">
              <div className="p-2 bg-sky-500/20 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-sky-400">
                  <path fillRule="evenodd" d="M1.5 5.625c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v12.75c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 0 1 1.5 18.375V5.625Zm1.5 0v1.5h18v-1.5c0-.207-.168-.375-.375-.375H3.375a.375.375 0 0 0-.375.375Zm13.5 3v2.25a.75.75 0 0 1-1.5 0v-2.25a.75.75 0 0 1 1.5 0Zm-7.5 0v2.25a.75.75 0 0 1-1.5 0v-2.25a.75.75 0 0 1 1.5 0Z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="text-sky-300 text-sm">System Architecture</div>
            </div>
            
            <div className="bg-slate-800/50 rounded-lg p-4">
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="bg-sky-500/20 rounded p-2 flex items-center justify-center">
                  <div className="w-6 h-6 bg-sky-500/40 rounded"></div>
                </div>
                <div className="bg-sky-500/20 rounded p-2 flex items-center justify-center">
                  <div className="w-6 h-6 bg-sky-500/40 rounded"></div>
                </div>
                <div className="bg-sky-500/20 rounded p-2 flex items-center justify-center">
                  <div className="w-6 h-6 bg-sky-500/40 rounded"></div>
                </div>
              </div>
              
              <div className="h-6 flex items-center justify-center">
                <div className="w-1 h-6 bg-slate-600"></div>
              </div>
              
              <div className="bg-slate-700/50 rounded p-3 mb-4">
                <div className="flex justify-between mb-2">
                  <div className="h-2 w-16 bg-slate-600 rounded"></div>
                  <div className="h-2 w-8 bg-sky-500/40 rounded"></div>
                </div>
                <div className="h-2 w-full bg-slate-600 rounded"></div>
              </div>
              
              <div className="h-6 flex items-center justify-center">
                <div className="w-1 h-6 bg-slate-600"></div>
              </div>
              
              <div className="grid grid-cols-5 gap-2">
                <div className="bg-teal-500/20 rounded p-1 flex items-center justify-center">
                  <div className="w-4 h-4 bg-teal-500/40 rounded-sm"></div>
                </div>
                <div className="bg-teal-500/20 rounded p-1 flex items-center justify-center">
                  <div className="w-4 h-4 bg-teal-500/40 rounded-sm"></div>
                </div>
                <div className="bg-teal-500/20 rounded p-1 flex items-center justify-center">
                  <div className="w-4 h-4 bg-teal-500/40 rounded-sm"></div>
                </div>
                <div className="bg-teal-500/20 rounded p-1 flex items-center justify-center">
                  <div className="w-4 h-4 bg-teal-500/40 rounded-sm"></div>
                </div>
                <div className="bg-teal-500/20 rounded p-1 flex items-center justify-center">
                  <div className="w-4 h-4 bg-teal-500/40 rounded-sm"></div>
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
        <div className="relative p-6 bg-gradient-to-br from-purple-900/40 to-indigo-900/40 rounded-2xl border border-slate-700/50 shadow-lg">
          <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm rounded-2xl"></div>
          <div className="relative">
            <div className="flex justify-between items-center mb-4">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-purple-400">
                  <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="text-purple-300 text-sm">Security Console</div>
            </div>
            
            <div className="bg-slate-800/50 rounded-lg p-4 mb-4">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-green-400">
                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <div className="text-white text-sm">SSL/TLS Encryption</div>
                  <div className="text-gray-400 text-xs">Active protection</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-green-400">
                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <div className="text-white text-sm">DDOS Protection</div>
                  <div className="text-gray-400 text-xs">Active protection</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-green-400">
                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <div className="text-white text-sm">Data Encryption</div>
                  <div className="text-gray-400 text-xs">Active protection</div>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-800/50 rounded-lg p-3">
              <div className="text-center text-gray-300 text-xs mb-2">Security Scan</div>
              <div className="h-2 w-full bg-slate-700 rounded-full mb-1">
                <div className="h-2 rounded-full bg-green-400" style={{ width: '92%' }}></div>
              </div>
              <div className="text-right text-green-400 text-xs">92% Protected</div>
            </div>
          </div>
        </div>
      )
    }
  ]

  return (
    <section id="technology" className="py-20 bg-slate-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Key Features</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Our technology stack ensures your applications are built to last
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Tabs */}
          <div className="relative mb-12">
            <div className="flex justify-center md:justify-start border-b border-slate-700">
              {features.map((feature) => (
                <button
                  key={feature.id}
                  ref={(el) => {tabsRef.current[feature.id] = el}}
                  role="tab"
                  id={`tab-${feature.id}`}
                  aria-controls={`panel-${feature.id}`}
                  aria-selected={activeTab === feature.id}
                  className={`py-4 px-6 text-lg font-medium transition-colors duration-300 relative ${
                    activeTab === feature.id ? 'text-white' : 'text-gray-400 hover:text-gray-200'
                  }`}
                  onClick={() => setActiveTab(feature.id)}
                >
                  {feature.title}
                </button>
              ))}
            </div>
            <div 
              ref={tabLineRef}
              className="absolute bottom-0 h-1 bg-indigo-500 transition-all duration-300"
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
                    <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                    <p className="text-gray-300 mb-6">{feature.description}</p>
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg transition-all duration-300 btn-hover-effect">
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