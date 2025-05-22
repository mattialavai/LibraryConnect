// src/pages/EditUser.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditUser = () => {
  const navigate = useNavigate();
  const { email } = useParams();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    branch: '',
    status: 'active',
  });

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (user) {
      setForm({ ...user });
    } else {
      alert('User not found!');
      navigate('/manage-users');
    }
  }, [email, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = users.map((u) =>
      u.email.toLowerCase() === email.toLowerCase() ? { ...form } : u
    );

    localStorage.setItem('users', JSON.stringify(updatedUsers));
    alert(`✅ "${form.name}" updated successfully!`);
    navigate('/manage-users');
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-md shadow">
      <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-white">Edit User</h2>

      <form onSubmit={handleUpdate} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Full Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full mt-1 px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
          />
        </div>

        {/* Email (disabled) */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Email Address</label>
          <input
            type="email"
            value={form.email}
            disabled
            className="w-full mt-1 px-3 py-2 border bg-gray-100 text-gray-500 rounded-md dark:bg-gray-700 dark:text-white"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Phone</label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            className="w-full mt-1 px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
          />
        </div>

        {/* Role */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">User Role</label>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
          >
            <option value="admin">Admin</option>
            <option value="chief">Chief Librarian</option>
            <option value="regional">Regional Librarian</option>
            <option value="branch">Branch Librarian</option>
          </select>
        </div>

        {/* Branch */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Branch/Department</label>
          <select
            name="branch"
            value={form.branch}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
          >
            <option value="HQ">HQ</option>
            <option value="Bo Region">Bo Region</option>
            <option value="Kenema Branch">Kenema Branch</option>
            <option value="Western Area">Western Area</option>
            <option value="Makeni Division">Makeni Division</option>
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Account Status</label>
          <div className="flex gap-4 items-center mt-1">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="status"
                value="active"
                checked={form.status === 'active'}
                onChange={handleChange}
              />
              Active
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="status"
                value="inactive"
                checked={form.status === 'inactive'}
                onChange={handleChange}
              />
              Inactive
            </label>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-6">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Update User
          </button>
          <button
            type="button"
            onClick={() => navigate('/manage-users')}
            className="w-full bg-gray-300 text-gray-800 py-2 rounded-md hover:bg-gray-400 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUser;
