// src/layouts/RoleBasedLayout.jsx
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import UserLayout from './UserLayout';
import AdminDashboard from '../pages/AdminDashboard';
import UserDashboard from '../pages/UserDashboard';

const RoleBasedLayout = () => {
  const user = JSON.parse(localStorage.getItem('userInfo'));
  const location = useLocation();

  if (!user) return <Navigate to="/" />;

  const Layout = user.role === 'admin' ? AdminLayout : UserLayout;
  const Dashboard = user.role === 'admin' ? <AdminDashboard /> : <UserDashboard />;

  return (
    <Layout>
      {/* If route is /dashboard, show the right dashboard */}
      {location.pathname === '/dashboard' ? Dashboard : <Outlet />}
    </Layout>
  );
};

export default RoleBasedLayout;
