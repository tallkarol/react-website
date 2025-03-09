import { useEffect } from 'react'
import Header from '@components/layout/Header'
import Footer from '@components/layout/Footer'
import HeroSection from '@components/sections/HeroSection'
import ServicesSection from '@components/sections/ServicesSection'
import FeaturesSection from '@components/sections/FeaturesSection'
import ProjectsSection from '@components/sections/ProjectsSection'
import TestimonialsSection from '@components/sections/TestimonialsSection'
import ContactSection from '@components/sections/ContactSection'
import CustomCursor from '@components/ui/CustomCursor'
import GlobalStyles from '@components/ui/GlobalStyles'

// Loader component for page transitions
const Loader = () => {
  return (
    <div className="fixed inset-0 bg-slate-900 z-50 flex items-center justify-center">
      <div className="relative">
        <div className="h-16 w-16 rounded-full border-t-4 border-b-4 border-indigo-600 animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="currentColor" 
            className="w-8 h-8 text-indigo-600"
          >
            <path 
              fillRule="evenodd" 
              d="M14.615 1.595a.75.75 0 0 1 .359.852L12.982 9.75h7.268a.75.75 0 0 1 .548 1.262l-10.5 11.25a.75.75 0 0 1-1.272-.71l1.992-7.302H3.75a.75.75 0 0 1-.548-1.262l10.5-11.25a.75.75 0 0 1 .913-.143Z" 
              clipRule="evenodd" 
            />
          </svg>
        </div>
      </div>
    </div>
  )
}

function App() {
  // Simulate loading state
  useEffect(() => {
    const loader = document.getElementById('page-loader')
    
    // Add fade-out class to loader after page loads
    if (loader) {
      setTimeout(() => {
        loader.classList.add('opacity-0')
        setTimeout(() => {
          loader.style.display = 'none'
        }, 500)
      }, 800)
    }
    
    // Add scroll reveal animation to sections
    const revealSections = document.querySelectorAll('section')
    
    const revealOnScroll = () => {
      for (let i = 0; i < revealSections.length; i++) {
        const section = revealSections[i]
        const revealPoint = 150
        
        if (section.getBoundingClientRect().top < window.innerHeight - revealPoint) {
          section.classList.add('fade-in')
        }
      }
    }
    
    window.addEventListener('scroll', revealOnScroll)
    
    // Apply styles to buttons using CSS variables
    const applyButtonStyles = () => {
      // Add custom classes to buttons
      const buttons = document.querySelectorAll('button:not(.btn):not(.btn-primary):not(.btn-outline):not(.btn-accent):not(.close-button):not(.btn-icon)')
      buttons.forEach(button => {
        if (button.className.includes('bg-indigo-600') || button.className.includes('bg-indigo-700')) {
          button.classList.add('btn', 'btn-primary')
        } else if (button.className.includes('border') && button.className.includes('text-white')) {
          button.classList.add('btn', 'btn-outline')
        }
      })

      // Apply hover styles to nav links
      const navLinks = document.querySelectorAll('nav a')
      navLinks.forEach(link => {
        link.classList.add('nav-link')
      })
    }

    // Run once on load and after a slight delay to ensure all components are mounted
    applyButtonStyles()
    setTimeout(applyButtonStyles, 500)
    
    // Initial check
    revealOnScroll()
    
    return () => {
      window.removeEventListener('scroll', revealOnScroll)
    }
  }, [])
  
  return (
    <>
      {/* Global Styles for consistency */}
      <GlobalStyles />
      
      {/* Custom Cursor */}
      <CustomCursor />
      
      {/* Page Loader */}
      <div 
        id="page-loader" 
        className="fixed inset-0 bg-slate-900 z-50 flex items-center justify-center transition-opacity duration-500"
      >
        <Loader />
      </div>
    
      <div className="min-h-screen bg-slate-900 text-white">
        <Header />
        <main>
          <HeroSection />
          <ServicesSection />
          <FeaturesSection />
          <ProjectsSection />
          <TestimonialsSection />
          <ContactSection />
        </main>
        <Footer />
        
        {/* Back to top button */}
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed right-8 bottom-8 bg-primary text-text-on-dark btn-icon shadow-lg transition-all duration-300 z-20 opacity-0 invisible"
          id="back-to-top"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
          </svg>
        </button>
        
        {/* Initialize back to top button visibility */}
        <script dangerouslySetInnerHTML={{
          __html: `
            window.addEventListener('scroll', function() {
              const backToTop = document.getElementById('back-to-top');
              if (window.scrollY > 500) {
                backToTop.classList.add('opacity-100');
                backToTop.classList.add('visible');
                backToTop.classList.remove('opacity-0');
                backToTop.classList.remove('invisible');
              } else {
                backToTop.classList.add('opacity-0');
                backToTop.classList.add('invisible');
                backToTop.classList.remove('opacity-100');
                backToTop.classList.remove('visible');
              }
            });
          `
        }} />
      </div>
    </>
  )
}

export default App