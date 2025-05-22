import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Home, Inbox, Upload, Folder, Bell, Settings, LogOut,
  FileText, X, Users, UserPlus, Trash2
} from 'lucide-react';

const Sidebar = ({ isOpen, toggleSidebar, role }) => {
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);
  const user = JSON.parse(localStorage.getItem('userInfo')) || { email: '', role: '' };

  // 🛎 Auto-refresh unread count every 2 seconds
  useEffect(() => {
    const checkUnread = () => {
      const notifs = JSON.parse(localStorage.getItem('notifications')) || [];
      const unread = notifs.filter(n => n.unread).length;
      setUnreadCount(unread);
    };
    checkUnread();
    const interval = setInterval(checkUnread, 2000);
    return () => clearInterval(interval);
  }, []);

  const dashboardLink = [{ label: 'Dashboard', path: '/dashboard', icon: <Home size={18} /> }];
  const uploadLink = { label: 'Upload Document', path: '/upload', icon: <Upload size={18} /> };

  const adminOnly = [
    { label: 'Create User', path: '/create-user', icon: <UserPlus size={18} /> },
    { label: 'Manage Users', path: '/manage-users', icon: <Users size={18} /> },
    { label: 'Trash', path: '/trash', icon: <Trash2 size={18} /> },
  ];

  const sharedLinks = [
    { label: 'Inbox', path: '/inbox', icon: <Inbox size={18} /> },
    { label: 'View Document', path: '/view-document', icon: <FileText size={18} /> },
    { label: 'Folders', path: '/folders', icon: <Folder size={18} /> },
    {
      label: (
        <span className="flex items-center gap-2">
          Notifications
          {unreadCount > 0 && (
            <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
              {unreadCount}
            </span>
          )}
        </span>
      ),
      path: '/notifications',
      icon: <Bell size={18} />,
    },
  ];

  const settingsLink = [{ label: 'Settings', path: '/settings', icon: <Settings size={18} /> }];

  // 🔐 Build final link list by role
  let links = [];
  if (role === 'admin') {
    links = [
      ...dashboardLink,
      ...adminOnly,
      uploadLink,
      ...sharedLinks,
      ...settingsLink,
    ];
  } else {
    links = [
      ...dashboardLink,
      uploadLink,
      ...sharedLinks,
      ...settingsLink,
    ];
  }

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/');
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar container */}
      <div
        className={`fixed top-0 right-0 min-h-screen w-64 bg-blue-700 text-white z-50 transform transition-transform duration-300
        ${isOpen ? 'translate-x-0' : 'translate-x-full'} md:static md:translate-x-0`}
      >
        {/* Header with avatar */}
        <div className="flex items-center justify-between p-4 border-b border-blue-500">
          <h1 className="text-lg font-bold">LibraryConnect</h1>
          <button onClick={toggleSidebar} className="md:hidden text-white">
            <X size={22} />
          </button>
        </div>

        {/* User info */}
        <div className="px-4 pt-4">
          <div className="bg-white/10 p-3 rounded text-sm">
            <p className="font-semibold">{user.email}</p>
            <p className="text-blue-200 text-xs capitalize">{user.role}</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-4">
          {links.map((link) => (
            <NavLink
              to={link.path}
              key={typeof link.label === 'string' ? link.label : link.path}
              onClick={toggleSidebar}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-md hover:bg-blue-600 ${
                  isActive ? 'bg-blue-600' : ''
                }`
              }
            >
              {link.icon}
              {link.label}
            </NavLink>
          ))}

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-red-600 mt-8 text-sm text-white"
          >
            <LogOut size={18} /> Logout
          </button>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
