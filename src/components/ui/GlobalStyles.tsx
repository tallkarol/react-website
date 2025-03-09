import { useEffect } from 'react';

/**
 * GlobalStyles component that applies consistent styling fixes across the application
 * without needing to modify all components individually.
 * 
 * This version is streamlined to work with the new color scheme.
 */
const GlobalStyles = () => {
  useEffect(() => {
    // Apply consistent styling
    const applyGlobalStyles = () => {
      // Fix contrast issues with buttons
      document.querySelectorAll('button').forEach((button) => {
        // Skip buttons that already have certain classes
        if (
          button.classList.contains('btn') || 
          button.classList.contains('close-button') ||
          button.classList.contains('btn-icon')
        ) {
          return;
        }

        // Style primary buttons (usually indigo/blue background)
        if (
          button.classList.contains('bg-indigo-600') || 
          button.classList.contains('bg-indigo-700') ||
          button.classList.contains('bg-blue-600') || 
          button.classList.contains('bg-blue-700')
        ) {
          button.classList.add('btn', 'btn-primary');
          // Use setAttribute for setting styles to avoid TypeScript errors
          button.setAttribute('style', 'background-color: var(--primary); color: var(--text-primary);');
        } 
        // Style outline buttons
        else if (
          button.classList.contains('border') && 
          (button.classList.contains('text-white') || button.classList.contains('text-gray-300'))
        ) {
          button.classList.add('btn', 'btn-outline');
        }
      });

      // Improve links contrast
      document.querySelectorAll('a:not(.btn)').forEach((link) => {
        if (
          link.classList.contains('text-gray-300') || 
          link.classList.contains('text-gray-400') ||
          link.classList.contains('text-white')
        ) {
          if (!link.classList.contains('nav-link')) {
            link.classList.add('nav-link');
          }
        }
      });

      // Apply proper card styling
      document.querySelectorAll('.bg-slate-800, .bg-slate-900, .bg-slate-800\\/50, .bg-slate-900\\/50').forEach((element) => {
        if (!element.classList.contains('card') && element.tagName !== 'SECTION' && element.tagName !== 'HEADER' && element.tagName !== 'FOOTER') {
          element.classList.add('card');
        }
      });

      // Apply custom scrollbar to containers
      document.querySelectorAll('.overflow-y-auto, .overflow-x-auto').forEach((container) => {
        if (!container.classList.contains('custom-scrollbar')) {
          container.classList.add('custom-scrollbar');
        }
      });
    };

    // Run the style fixer on mount and after a delay for any lazy-loaded components
    applyGlobalStyles();
    const timer = setTimeout(applyGlobalStyles, 500);

    // Create a mutation observer to apply styles when DOM changes
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          applyGlobalStyles();
        }
      });
    });

    // Start observing the document with the configured parameters
    observer.observe(document.body, { 
      childList: true, 
      subtree: true 
    });

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return null; // This component doesn't render anything
};

export default GlobalStyles;