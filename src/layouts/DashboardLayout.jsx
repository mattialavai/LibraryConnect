import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

const DashboardLayout = ({ children, role }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(false)} role={role} />

      <div className="flex-1 flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
        <Topbar toggleSidebar={() => setSidebarOpen(true)} />
        <main className="p-6 flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
