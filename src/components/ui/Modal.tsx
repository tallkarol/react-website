import { useEffect, useRef } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, title, size = 'md', children }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  
  // Close on escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scrolling when modal is open
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      // Restore scrolling when modal closes
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);
  
  // Close when clicking outside the modal
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };
  
  // Size classes mapping - updated to make modals larger based on feedback
  const sizeClasses = {
    sm: 'w-full max-w-lg',
    md: 'w-full max-w-3xl',
    lg: 'w-full max-w-5xl',
    xl: 'w-full max-w-7xl',
    full: 'w-[98%] md:w-[95%] lg:w-[85%]',
  };

  if (!isOpen) return null;
  
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 transition-opacity duration-300 bg-slate-900/95 backdrop-blur-md"
      onClick={handleBackdropClick}
    >
      <div 
        ref={modalRef}
        className={`bg-slate-800 border border-slate-700 rounded-2xl ${sizeClasses[size]} h-[98vh] md:h-[90vh] overflow-hidden shadow-2xl transform transition-all relative`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button - Always visible in top right */}
        <button 
          className="absolute top-3 right-3 z-50 bg-slate-700 hover:bg-slate-600 text-white rounded-full p-2 transition-colors shadow-lg"
          onClick={onClose}
          aria-label="Close modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        {title && (
          <div className="flex justify-between items-center border-b border-slate-700 p-6 pr-14">
            <h3 className="text-2xl font-bold text-white">{title}</h3>
          </div>
        )}
        
        <div className="overflow-y-auto h-full custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;