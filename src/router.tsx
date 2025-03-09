// src/router.tsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import AdminRoute from '@/components/admin/AdminRoute';

// Define routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/admin',
    element: <AdminRoute />,
  },
  // Add any other routes here
]);

// Router component
const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;