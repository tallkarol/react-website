import { useEffect, useState } from 'react'

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [clicked, setClicked] = useState(false)
  const [linkHovered, setLinkHovered] = useState(false)
  const [hidden, setHidden] = useState(false)
  
  useEffect(() => {
    const addEventListeners = () => {
      document.addEventListener('mousemove', onMouseMove)
      document.addEventListener('mouseenter', onMouseEnter)
      document.addEventListener('mouseleave', onMouseLeave)
      document.addEventListener('mousedown', onMouseDown)
      document.addEventListener('mouseup', onMouseUp)
    }
    
    const removeEventListeners = () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseenter', onMouseEnter)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('mouseup', onMouseUp)
    }
    
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }
    
    const onMouseDown = () => {
      setClicked(true)
    }
    
    const onMouseUp = () => {
      setClicked(false)
    }
    
    const onMouseLeave = () => {
      setHidden(true)
    }
    
    const onMouseEnter = () => {
      setHidden(false)
    }
    
    const handleLinkHoverEvents = () => {
      document.querySelectorAll('a, button, input, textarea, [role="button"]').forEach(el => {
        el.addEventListener('mouseover', () => setLinkHovered(true))
        el.addEventListener('mouseout', () => setLinkHovered(false))
      })
    }
    
    addEventListeners()
    handleLinkHoverEvents()
    
    return () => {
      removeEventListeners()
    }
  }, [])
  
  const cursorClasses = `
    fixed pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 rounded-full
    mix-blend-difference transition-transform duration-150 ease-out
    ${hidden ? 'opacity-0' : 'opacity-100'}
    ${clicked ? 'scale-75' : ''}
    ${linkHovered ? 'scale-150' : ''}
  `
  
  return (
    <>
      {/* Main cursor */}
      <div 
        className={`${cursorClasses} bg-white w-5 h-5`}
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px` 
        }}
      />
      
      {/* Cursor outline with trailing animation */}
      <div 
        className={`${cursorClasses} border border-white w-8 h-8 hidden md:block`}
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px`,
          transitionDuration: '250ms' 
        }}
      />
    </>
  )
}

export default CustomCursor