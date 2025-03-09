import { useEffect, useRef } from 'react'

const HeroSection = () => {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const createGridAnimation = () => {
      if (!gridRef.current) return

      const grid = gridRef.current
      const dotSize = 1
      const gap = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--pattern-grid-size')) || 30
      const rows = Math.ceil(grid.offsetHeight / gap)
      const cols = Math.ceil(grid.offsetWidth / gap)
      
      let html = ''
      
      for (let i = 0; i < rows * cols; i++) {
        const row = Math.floor(i / cols)
        const col = i % cols
        html += `<div class="absolute rounded-full opacity-0" 
          style="width: ${dotSize}px; height: ${dotSize}px; top: ${row * gap}px; left: ${col * gap}px; 
          background-color: var(--icon-bg-default);
          animation: var(--animation-fade-in) ${Math.random() * 2}s"></div>`
      }
      
      grid.innerHTML = html
    }

    createGridAnimation()
    window.addEventListener('resize', createGridAnimation)
    
    return () => {
      window.removeEventListener('resize', createGridAnimation)
    }
  }, [])

  return (
    <section 
      className="relative min-h-screen pt-20 overflow-hidden" 
      style={{ 
        background: 'var(--gradient-dark)',
        paddingTop: 'var(--section-spacing-y)',
        paddingBottom: 'var(--section-spacing-y)'
      }}
    >
      {/* Background Patterns */}
      <div 
        className="absolute inset-0" 
        style={{ 
          background: 'var(--overlay-accent), var(--overlay-primary)'
        }}
      ></div>
      
      {/* Animated accent circle */}
      <div 
        className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full opacity-20" 
        style={{ 
          backgroundColor: 'var(--accent)',
          filter: 'blur(80px)',
          animation: 'var(--animation-pulse)'
        }}
      ></div>
      
      {/* Grid animation */}
      <div 
        ref={gridRef}
        className="absolute inset-0 opacity-40"
      ></div>
      
      <div className="container mx-auto px-4 py-16 relative z-10" style={{ maxWidth: 'var(--content-max-width)' }}>
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
              style={{ 
                color: 'var(--text-primary)',
                animation: 'var(--animation-fade-in)'
              }}
            >
              <span className="block">Custom Web Apps</span>
              <span className="block" style={{ color: 'var(--accent)' }}>& AI Solutions</span>
            </h1>
            
            <p 
              className="text-lg sm:text-xl mb-8 max-w-lg"
              style={{ 
                color: 'var(--text-secondary)',
                animation: 'var(--animation-slide-in)',
                animationDelay: '0.1s'
              }}
            >
              We build high-performance technologies that help businesses streamline operations and drive efficiency in the digital age.
            </p>
            
            <div 
              className="flex flex-wrap gap-4"
              style={{ 
                animation: 'var(--animation-slide-in)',
                animationDelay: '0.2s'
              }}
            >
              <button 
                style={{
                  background: 'var(--primary)',
                  color: 'var(--text-primary)',
                  padding: 'var(--button-padding)',
                  borderRadius: 'var(--button-radius)',
                  transition: 'var(--button-transition)'
                }}
                className="flex items-center justify-center"
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'var(--button-hover-transform)';
                  e.currentTarget.style.background = 'var(--primary-hover)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.background = 'var(--primary)';
                }}
              >
                <span>Get Started</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 ml-2">
                  <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
                </svg>
              </button>
              
              <button 
                style={{
                  background: 'transparent',
                  color: 'var(--text-primary)',
                  padding: 'var(--button-padding)',
                  borderRadius: 'var(--button-radius)',
                  transition: 'var(--button-transition)',
                  border: 'var(--card-border)'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'var(--button-hover-transform)';
                  e.currentTarget.style.borderColor = 'var(--primary)';
                  e.currentTarget.style.background = 'rgba(67, 97, 238, 0.1)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.borderColor = 'var(--dark-border)';
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                Our Projects
              </button>
            </div>
          </div>
          
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Main dashboard graphic */}
              <div 
                className="rounded-2xl shadow-xl p-6 border backdrop-blur-md"
                style={{ 
                  backgroundColor: 'var(--card-bg)',
                  borderColor: 'var(--dark-border)',
                  boxShadow: 'var(--card-shadow)',
                  animation: 'var(--animation-float)'
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--error)' }}></div>
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--warning)' }}></div>
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--success)' }}></div>
                  </div>
                  <div style={{ color: 'var(--text-secondary)' }} className="text-sm">Smart Dashboard</div>
                </div>
                
                <div className="grid grid-cols-2 gap-4" style={{ gap: 'var(--grid-gap-sm)' }}>
                  <div 
                    className="rounded-lg p-4"
                    style={{ backgroundColor: 'var(--icon-bg-default)' }}
                  >
                    <div className="h-2 w-12 rounded mb-2" style={{ backgroundColor: 'var(--primary)' }}></div>
                    <div className="h-2 w-16 rounded mb-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}></div>
                    <div className="text-center py-6">
                      <div 
                        className="inline-block h-16 w-16 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: 'var(--icon-bg-default)' }}
                      >
                        <div 
                          className="h-8 w-8 rounded-full"
                          style={{ backgroundColor: 'var(--primary)' }}
                        ></div>
                      </div>
                      <div 
                        className="h-2 w-12 rounded mt-4 mx-auto"
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                      ></div>
                    </div>
                  </div>
                  
                  <div 
                    className="rounded-lg p-4"
                    style={{ backgroundColor: 'rgba(247, 37, 133, 0.1)' }}
                  >
                    <div className="h-2 w-12 rounded mb-2" style={{ backgroundColor: 'var(--accent)' }}></div>
                    <div className="h-2 w-16 rounded mb-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}></div>
                    <div className="text-center py-6">
                      <div 
                        className="inline-block h-16 w-16 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: 'rgba(247, 37, 133, 0.1)' }}
                      >
                        <div 
                          className="h-8 w-8 rounded-full"
                          style={{ backgroundColor: 'var(--accent)' }}
                        ></div>
                      </div>
                      <div 
                        className="h-2 w-12 rounded mt-4 mx-auto"
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                      ></div>
                    </div>
                  </div>
                  
                  <div 
                    className="col-span-2 rounded-lg p-4"
                    style={{ backgroundColor: 'rgba(58, 12, 163, 0.1)' }}
                  >
                    <div className="flex justify-between mb-4">
                      <div className="h-2 w-12 rounded" style={{ backgroundColor: 'var(--secondary)' }}></div>
                      <div className="h-2 w-8 rounded" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}></div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div 
                        className="h-4 w-4 rounded-full"
                        style={{ backgroundColor: 'var(--secondary)' }}
                      ></div>
                      <div 
                        className="h-2 w-16 rounded"
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                      ></div>
                    </div>
                    <div className="flex items-center space-x-2 mt-2">
                      <div 
                        className="h-4 w-4 rounded-full"
                        style={{ backgroundColor: 'var(--primary)' }}
                      ></div>
                      <div 
                        className="h-2 w-24 rounded"
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                      ></div>
                    </div>
                    <div className="flex items-center space-x-2 mt-2">
                      <div 
                        className="h-4 w-4 rounded-full"
                        style={{ backgroundColor: 'var(--accent)' }}
                      ></div>
                      <div 
                        className="h-2 w-20 rounded"
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div 
                className="absolute -bottom-4 -left-4 w-24 h-24 rounded-2xl" 
                style={{ 
                  backgroundColor: 'rgba(247, 37, 133, 0.2)',
                  animation: 'var(--animation-float)',
                  animationDelay: '1s' 
                }}
              ></div>
              <div 
                className="absolute -top-4 -right-4 w-20 h-20 rounded-full" 
                style={{ 
                  backgroundColor: 'rgba(67, 97, 238, 0.2)',
                  animation: 'var(--animation-float)',
                  animationDelay: '0.5s' 
                }}
              ></div>
              <div 
                className="absolute top-1/2 -right-12 transform -translate-y-1/2 w-16 h-16 rounded-lg" 
                style={{ 
                  backgroundColor: 'rgba(58, 12, 163, 0.3)',
                  animation: 'var(--animation-float)',
                  animationDelay: '1.5s' 
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection