import React, { useState } from 'react';
import { Bell, User } from 'lucide-react';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';

const Topbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, message: 'New document from HQ' },
    { id: 2, message: 'Finance report uploaded' },
    { id: 3, message: 'Bo Region submitted memo' },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 px-4 py-3 shadow-sm flex justify-between items-center sticky top-0 z-50">
      {/* Logo + Name */}
      <div className="flex items-center gap-2">
        <img src={logo} alt="SLLB Logo" className="w-6 h-6 md:w-8 md:h-8" />
        <span className="font-bold text-blue-600 dark:text-blue-300 text-base md:text-lg">SLLB</span>
      </div>

      {/* Right */}
      <div className="relative flex items-center gap-6 pr-2">
        {/* 🔔 Notification dropdown (desktop only) */}
        <div className="relative hidden md:block">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative text-gray-600 dark:text-gray-300 hover:text-blue-600"
          >
            <Bell size={20} />
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
              {notifications.length}
            </span>
          </button>
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-60 bg-white dark:bg-gray-700 rounded-md shadow-lg z-50 p-2 text-sm">
              {notifications.map((note) => (
                <div key={note.id} className="py-1 px-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded">
                  {note.message}
                </div>
              ))}
              <div className="mt-2 text-center text-xs text-gray-400">View All</div>
            </div>
          )}
        </div>

        {/* 👤 Profile icon (desktop) */}
        <button
          onClick={() => navigate('/settings')}
          className="hidden md:inline-block text-gray-600 dark:text-gray-300 hover:text-blue-600"
        >
          <User size={20} />
        </button>

        {/* ☰ Mobile toggle */}
        <button
          onClick={toggleSidebar}
          className="inline-block md:hidden text-gray-700 dark:text-gray-300"
        >
          ☰
        </button>
      </div>
    </div>
  );
};

export default Topbar;
