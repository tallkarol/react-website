import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string | React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  children: React.ReactNode;
  headerContent?: React.ReactNode;
  footerContent?: React.ReactNode;
  hideCloseButton?: boolean;
  disableBackdropClick?: boolean;
  className?: string;
}

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  size = 'md', 
  children,
  headerContent,
  footerContent,
  hideCloseButton,
  disableBackdropClick,
  className
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const previousActiveElement = useRef<HTMLElement | null>(null);
  
  // Portal setup
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);
  
  // Save previously focused element and restore focus on close
  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      // Focus the modal when it opens (improves accessibility)
      setTimeout(() => modalRef.current?.focus(), 50);
    } else if (previousActiveElement.current) {
      // Restore focus when modal closes
      setTimeout(() => previousActiveElement.current?.focus(), 50);
    }
  }, [isOpen]);
  
  // Handle escape key to close modal
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
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);
  
  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (disableBackdropClick) return;
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  
  // Size classes following Tailwind conventions
  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-[95%] w-full',
  };

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:p-6 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop with blur effect */}
          <motion.div 
            className="fixed inset-0 bg-slate-900/90 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleBackdropClick}
            aria-hidden="true"
          />
          
          {/* Modal container - now with auto height */}
          <motion.div 
            ref={modalRef}
            className={`w-full ${sizeClasses[size]} ${className} relative z-10 rounded-xl overflow-hidden shadow-2xl focus:outline-none my-auto`}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? "modal-title" : undefined}
          >
            {/* Main content wrapper with gradient background */}
            <div className={`bg-gradient-to-b from-slate-800 to-slate-900 border border-indigo-900/30 rounded-xl flex flex-col ${size === 'full' ? 'max-h-[85vh]' : ''}`}>
              {/* Header - Conditionally render if title or headerContent exists */}
              {(title || headerContent) && (
                <div className="px-6 py-4 border-b border-indigo-900/30 bg-gradient-to-r from-indigo-900/30 to-slate-800/80 flex justify-between items-center rounded-t-xl">
                  <div className="flex items-center space-x-3">
                    {typeof title === 'string' ? (
                      <h3 id="modal-title" className="text-xl font-semibold text-white">{title}</h3>
                    ) : title}
                    
                    {/* Optional header content (e.g. tabs, filters) */}
                    {headerContent && <div>{headerContent}</div>}
                  </div>
                  
                  {!hideCloseButton && (
                    <button
                      onClick={onClose}
                      className="bg-slate-700/70 hover:bg-red-600 text-white p-2 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 hover:scale-110"
                      aria-label="Close modal"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              )}
              
              {/* Body - now adapts to content height */}
              <div className={`p-6 ${size === 'full' ? 'overflow-y-auto flex-1' : ''} custom-scrollbar`}>
                {children}
              </div>
              
              {/* Optional footer */}
              {footerContent && (
                <div className="px-6 py-4 border-t border-indigo-900/30 bg-gradient-to-r from-slate-800/80 to-indigo-900/20 rounded-b-xl">
                  {footerContent}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
  
  // Use portal for better rendering in DOM hierarchy
  return mounted ? createPortal(modalContent, document.body) : null;
};

export default Modal;