// src/components/admin/AdminRoute.tsx
import ProtectedRoute from './ProtectedRoute';
import AdminPanel from './AdminPanel';

/**
 * This component wraps the AdminPanel with the ProtectedRoute
 * to ensure it's only accessible in development mode.
 */
const AdminRoute = () => {
  return (
    <ProtectedRoute>
      <AdminPanel />
    </ProtectedRoute>
  );
};

export default AdminRoute;