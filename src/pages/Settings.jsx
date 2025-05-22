import React, { useEffect, useState } from 'react';

const Settings = () => {
  const [theme, setTheme] = useState('light');
  const [user, setUser] = useState({ role: '', email: '' });

  // Load user info & theme
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('userInfo'));
    if (storedUser) setUser(storedUser);

    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const initial = savedTheme || (prefersDark ? 'dark' : 'light');
    setTheme(initial);
    applyTheme(initial);
  }, []);

  // Apply dark/light class
  const applyTheme = (selected) => {
    document.documentElement.classList.toggle('dark', selected === 'dark');
    localStorage.setItem('theme', selected);
  };

  const toggleTheme = (selectedTheme) => {
    setTheme(selectedTheme);
    applyTheme(selectedTheme);
  };

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    window.location.href = '/';
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-md shadow max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">⚙️ Settings</h2>

      {/* Appearance Section */}
      <div className="mb-6">
        <h3 className="text-md font-semibold mb-2 text-gray-700 dark:text-gray-300">Appearance</h3>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-700 dark:text-gray-300">Choose theme</span>
          <button
            onClick={() => toggleTheme('light')}
            className={`px-3 py-1 rounded border ${
              theme === 'light'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 dark:bg-gray-600 dark:text-white'
            }`}
          >
            Light
          </button>
          <button
            onClick={() => toggleTheme('dark')}
            className={`px-3 py-1 rounded border ${
              theme === 'dark'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 dark:bg-gray-600 dark:text-white'
            }`}
          >
            Dark
          </button>
        </div>
      </div>

      {/* Logged-in Info */}
      <div className="mb-6">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Logged in as: <strong>{user.role || 'Unknown'} - {user.name || user.email || 'User'}</strong>
        </p>
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 mt-4"
      >
        Logout
      </button>
    </div>
  );
};

export default Settings;
