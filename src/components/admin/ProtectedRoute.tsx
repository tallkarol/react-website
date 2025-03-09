// src/components/admin/ProtectedRoute.tsx
import { ReactNode, useEffect, useState } from 'react';
import { isAdminAccessAllowed } from '@/utils/environment';

interface ProtectedRouteProps {
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * A component that only renders its children if admin access is allowed.
 * This is primarily used to protect admin routes in production.
 */
const ProtectedRoute = ({ children, fallback }: ProtectedRouteProps) => {
  const [isAllowed, setIsAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if access is allowed
    const accessAllowed = isAdminAccessAllowed();
    setIsAllowed(accessAllowed);
  }, []);

  // Show nothing while checking (prevents flash of content)
  if (isAllowed === null) {
    return null;
  }

  // If access is allowed, render children
  if (isAllowed) {
    return <>{children}</>;
  }

  // If access is not allowed, render fallback or null
  return fallback ? <>{fallback}</> : (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white p-4">
      <div className="max-w-md text-center">
        <h1 className="text-3xl font-bold mb-6">Access Denied</h1>
        <p className="mb-6">
          The admin panel is only accessible in development mode. This route is disabled in production for security reasons.
        </p>
        <a 
          href="/" 
          className="px-4 py-2 bg-indigo-600 rounded hover:bg-indigo-700 transition-colors"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default ProtectedRoute;