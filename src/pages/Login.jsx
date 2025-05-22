import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sun, Moon, Eye, EyeOff } from 'lucide-react';
import logo from '../assets/logo.png';

const Login = () => {
  const [theme, setTheme] = useState('light');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleLogin = (e) => {
    e.preventDefault();

    localStorage.setItem(
      'userInfo',
      JSON.stringify({
        email: 'lavaimattia50@gmail.com', // You can replace with dynamic form value later
        role: role, // dynamic role from selection
      })
    );

    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white dark:bg-gray-900 px-4 py-6">
      <div className="flex flex-col items-center">
        {/* Logo + Name + Theme Toggle */}
        <div className="flex justify-between w-full max-w-sm items-center mb-4">
          <div className="flex items-center gap-2">
            <img src={logo} alt="SLLB Logo" className="w-8 h-8" />
            <h1 className="text-lg font-bold text-blue-600 dark:text-blue-400">SLLB</h1>
          </div>
          <button onClick={toggleTheme} className="text-gray-700 dark:text-gray-200">
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>

        {/* Welcome Title */}
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Welcome to LibraryConnect</h2>

        {/* Login Heading */}
        <div className="w-full max-w-sm text-left mt-6 mb-2">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white">Login</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Login to your account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4 bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-md">
          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              required
              className="w-full mt-1 px-3 py-2 border rounded-md placeholder-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                required
                className="w-full mt-1 px-3 py-2 border rounded-md pr-10 placeholder-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500 dark:text-gray-300"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Role Select */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              className="w-full mt-1 px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="user">Regular User</option>
            </select>
          </div>

          {/* Remember Me */}
          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
            <label className="flex items-center gap-2 font-semibold">
              <input type="checkbox" className="accent-blue-600" />
              Remember Me
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Log In
          </button>

          {/* Admin Contact Text */}
          <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-2">
            Need an account? Contact your HQ Administrator.
          </p>
        </form>
      </div>

      {/* Footer */}
      <p className="text-center text-sm text-gray-400 dark:text-gray-500 mt-8">
        LibraryConnect – Sierra Leone Library Board @2025
      </p>
    </div>
  );
};

export default Login;
