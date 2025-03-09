import { useState, useEffect, useRef } from 'react'

const testimonials = [
  {
    id: 1,
    content: "TechSynergy transformed our business with their custom web application. The solution streamlined our operations and increased productivity by over 40%. Their team was professional and responsive throughout the entire process.",
    author: "Sarah Johnson",
    position: "COO, Innovate Retail",
    avatar: "bg-indigo-500"
  },
  {
    id: 2,
    content: "The AI-powered analytics dashboard TechSynergy built for us has been a game-changer. We now have real-time insights that help us make data-driven decisions. The ROI on this project exceeded our expectations.",
    author: "Michael Chen",
    position: "CTO, DataDrive Solutions",
    avatar: "bg-sky-500"
  },
  {
    id: 3,
    content: "Working with TechSynergy was a seamless experience. They took the time to understand our unique challenges and delivered a solution that perfectly addressed our needs. Their attention to detail and technical expertise are unmatched.",
    author: "Emily Rodriguez",
    position: "VP of Operations, TechForward",
    avatar: "bg-purple-500"
  },
  {
    id: 4,
    content: "The mobile application TechSynergy developed for us has received outstanding feedback from our customers. The interface is intuitive, and the performance is exceptional. We've seen a 200% increase in user engagement since launch.",
    author: "David Kim",
    position: "Product Director, MobileFirst",
    avatar: "bg-orange-500"
  },
]

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const testimonialsRef = useRef<HTMLDivElement>(null)
  const autoplayRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  
  const goToTestimonial = (index: number) => {
    setActiveIndex(index)
    if (testimonialsRef.current) {
      testimonialsRef.current.scrollTo({
        left: index * testimonialsRef.current.offsetWidth,
        behavior: 'smooth'
      })
    }
  }
  
  const nextTestimonial = () => {
    const newIndex = (activeIndex + 1) % testimonials.length
    goToTestimonial(newIndex)
  }
  
  const prevTestimonial = () => {
    const newIndex = (activeIndex - 1 + testimonials.length) % testimonials.length
    goToTestimonial(newIndex)
  }
  
  // Auto-scroll testimonials
  useEffect(() => {
    autoplayRef.current = setInterval(() => {
      nextTestimonial()
    }, 6000)
    
    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current)
      }
    }
  }, [activeIndex])
  
  // Handle manual scroll
  const handleScroll = () => {
    if (testimonialsRef.current) {
      const scrollPosition = testimonialsRef.current.scrollLeft
      const slideWidth = testimonialsRef.current.offsetWidth
      const newIndex = Math.round(scrollPosition / slideWidth)
      
      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex)
      }
    }
  }
  
  return (
    <section className="py-20 bg-slate-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-50">
        <div className="absolute w-96 h-96 rounded-full bg-indigo-600/10 -top-20 -left-20"></div>
        <div className="absolute w-96 h-96 rounded-full bg-sky-600/10 -bottom-20 -right-20"></div>
        <div className="absolute w-64 h-64 rounded-full bg-purple-600/10 top-1/2 left-1/3"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What Our Clients Say</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Hear from the businesses we've helped transform
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {/* Testimonials Slider */}
          <div className="relative">
            <div
              ref={testimonialsRef}
              className="flex overflow-x-hidden snap-x snap-mandatory"
              onScroll={handleScroll}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="min-w-full snap-center px-4"
                >
                  <div className="bg-slate-800/50 backdrop-blur-sm p-8 md:p-10 rounded-2xl border border-slate-700/50">
                    <svg className="text-indigo-400 w-10 h-10 mb-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"></path>
                    </svg>
                    <p className="text-gray-300 text-lg md:text-xl mb-8">{testimonial.content}</p>
                    <div className="flex items-center">
                      <div className={`${testimonial.avatar} w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg`}>
                        {testimonial.author.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <h4 className="text-white font-medium">{testimonial.author}</h4>
                        <p className="text-gray-400">{testimonial.position}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Navigation Arrows */}
            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-slate-900/70 backdrop-blur-sm p-3 rounded-full text-white shadow-lg z-10 hidden md:block hover:bg-indigo-600 transition-colors duration-300"
              aria-label="Previous testimonial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-slate-900/70 backdrop-blur-sm p-3 rounded-full text-white shadow-lg z-10 hidden md:block hover:bg-indigo-600 transition-colors duration-300"
              aria-label="Next testimonial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
          
          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeIndex === index ? 'bg-indigo-600 w-6' : 'bg-slate-700 hover:bg-slate-600'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection