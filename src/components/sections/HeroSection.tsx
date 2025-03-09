import { useEffect, useRef } from 'react'

const HeroSection = () => {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const createGridAnimation = () => {
      if (!gridRef.current) return

      const grid = gridRef.current
      const dotSize = 1
      const gap = 30
      const rows = Math.ceil(grid.offsetHeight / gap)
      const cols = Math.ceil(grid.offsetWidth / gap)
      
      let html = ''
      
      for (let i = 0; i < rows * cols; i++) {
        const row = Math.floor(i / cols)
        const col = i % cols
        html += `<div class="absolute bg-indigo-500/20 rounded-full opacity-0" 
          style="width: ${dotSize}px; height: ${dotSize}px; top: ${row * gap}px; left: ${col * gap}px; 
          animation: fadeIn 0.5s ${Math.random() * 2}s forwards"></div>`
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
    <section className="relative min-h-screen pt-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-bg"></div>
      
      {/* Grid animation */}
      <div 
        ref={gridRef}
        className="absolute inset-0 opacity-50"
      ></div>
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 hero-text-shadow fade-in">
              <span className="block">Custom Web Apps</span>
              <span className="block text-sky-300">& AI Solutions</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-200 mb-8 max-w-lg slide-in-delay-1">
              We build high-performance technologies that help businesses streamline operations and drive efficiency in the digital age.
            </p>
            
            <div className="flex flex-wrap gap-4 slide-in-delay-2">
              <button className="bg-white text-indigo-600 hover:bg-gray-100 font-semibold px-6 py-3 rounded-full transition-all duration-300 flex items-center btn-hover-effect">
                <span>Get Started</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 ml-2">
                  <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
                </svg>
              </button>
              
              <button className="border border-white text-white hover:bg-white hover:text-indigo-600 font-semibold px-6 py-3 rounded-full transition-all duration-300 btn-hover-effect">
                Our Projects
              </button>
            </div>
          </div>
          
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Main graphic */}
              <div className="bg-slate-800/50 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-slate-700/50 floating">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="text-gray-400 text-sm">Smart Dashboard</div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-700/50 rounded-lg p-4">
                    <div className="h-2 w-12 bg-indigo-400 rounded mb-2"></div>
                    <div className="h-2 w-16 bg-slate-500 rounded mb-4"></div>
                    <div className="text-center py-6">
                      <div className="inline-block h-16 w-16 rounded-full bg-indigo-500/20 flex items-center justify-center">
                        <div className="h-8 w-8 rounded-full bg-indigo-500/40"></div>
                      </div>
                      <div className="h-2 w-12 bg-slate-500 rounded mt-4 mx-auto"></div>
                    </div>
                  </div>
                  
                  <div className="bg-slate-700/50 rounded-lg p-4">
                    <div className="h-2 w-12 bg-sky-400 rounded mb-2"></div>
                    <div className="h-2 w-16 bg-slate-500 rounded mb-4"></div>
                    <div className="text-center py-6">
                      <div className="inline-block h-16 w-16 rounded-full bg-sky-500/20 flex items-center justify-center">
                        <div className="h-8 w-8 rounded-full bg-sky-500/40"></div>
                      </div>
                      <div className="h-2 w-12 bg-slate-500 rounded mt-4 mx-auto"></div>
                    </div>
                  </div>
                  
                  <div className="col-span-2 bg-slate-700/50 rounded-lg p-4">
                    <div className="flex justify-between mb-4">
                      <div className="h-2 w-12 bg-orange-400 rounded"></div>
                      <div className="h-2 w-8 bg-slate-500 rounded"></div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="h-4 w-4 rounded-full bg-orange-500/40"></div>
                      <div className="h-2 w-16 bg-slate-500 rounded"></div>
                    </div>
                    <div className="flex items-center space-x-2 mt-2">
                      <div className="h-4 w-4 rounded-full bg-indigo-500/40"></div>
                      <div className="h-2 w-24 bg-slate-500 rounded"></div>
                    </div>
                    <div className="flex items-center space-x-2 mt-2">
                      <div className="h-4 w-4 rounded-full bg-sky-500/40"></div>
                      <div className="h-2 w-20 bg-slate-500 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-orange-500/20 rounded-2xl floating" style={{ animationDelay: '1s' }}></div>
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-sky-500/20 rounded-full floating" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute top-1/2 -right-12 transform -translate-y-1/2 w-16 h-16 bg-indigo-500/30 rounded-lg floating" style={{ animationDelay: '1.5s' }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection