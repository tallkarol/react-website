// src/utils/environment.ts

/**
 * Check if the application is running in development mode.
 * This relies on the Vite environment variables.
 */
export const isDevelopment = (): boolean => {
    return import.meta.env.DEV === true;
  };
  
  /**
   * Check if the application is running in production mode.
   * This relies on the Vite environment variables.
   */
  export const isProduction = (): boolean => {
    return import.meta.env.PROD === true;
  };
  
  /**
   * Check if the current request is allowed to access admin routes.
   * In development mode, we always allow access.
   * In production, this could be extended with authentication checks.
   */
  export const isAdminAccessAllowed = (): boolean => {
    // Only allow in development environment
    if (isDevelopment()) {
      return true;
    }
    
    // In production, admin access is not allowed via this method
    return false;
  };