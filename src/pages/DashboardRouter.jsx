// src/pages/DashboardRouter.jsx
import React from 'react';
import AdminDashboard from './AdminDashboard';
import UserDashboard from './UserDashboard';

const DashboardRouter = () => {
  const user = JSON.parse(localStorage.getItem('userInfo'));

  if (!user) return <p className="text-red-500 text-center">No user found</p>;

  return user.role === 'admin' ? <AdminDashboard /> : <UserDashboard />;
};

export default DashboardRouter;
