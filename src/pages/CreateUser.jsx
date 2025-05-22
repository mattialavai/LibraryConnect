import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateUser = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    branch: '',
    password: '',
    confirmPassword: '',
    status: 'active',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert('❌ Passwords do not match!');
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

    // ✅ Optional: Prevent duplicate email
    const emailExists = existingUsers.some((u) => u.email === form.email);
    if (emailExists) {
      alert('❌ A user with this email already exists!');
      return;
    }

    const newUser = {
      id: Date.now(),
      name: form.name,
      email: form.email,
      phone: form.phone,
      role: form.role,
      branch: form.branch,
      status: form.status,
      password: form.password, // for mock/demo only
    };

    const updatedUsers = [...existingUsers, newUser];
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    alert(`✅ User "${form.name}" created successfully!`);
    navigate('/manage-users'); // ✅ Redirect to user list
  };

  const handleClear = () => {
    setForm({
      name: '',
      email: '',
      phone: '',
      role: '',
      branch: '',
      password: '',
      confirmPassword: '',
      status: 'active',
    });
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-md shadow">
      <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-white">Create New User</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Full Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Enter full name"
            className="w-full mt-1 px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Email Address</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="Enter email"
            className="w-full mt-1 px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            placeholder="Enter phone number"
            className="w-full mt-1 px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        {/* Role */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">User Role / Position</label>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            required
            className="w-full mt-1 px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="">Select a role</option>
            <option value="admin">Admin</option>
            <option value="chief">Chief Librarian</option>
            <option value="regional">Regional Librarian</option>
            <option value="regional">Departmental Head</option>
            <option value="branch">Branch Librarian</option>
          </select>
        </div>

        {/* Branch */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Branch / Department</label>
          <select
            name="branch"
            value={form.branch}
            onChange={handleChange}
            required
            className="w-full mt-1 px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="">Select Branch or Department</option>
            <option value="HQ">HQ</option>
            <option value="HQ">Cataloguing Department HQ</option>
            <option value="HQ">Reference Department HQ</option>
            <option value="HQ">Adult Lending Department HQ</option>
            <option value="HQ">Children Department HQ</option>
            <option value="Bo Regional">Regional Library South </option>
            <option value="Bo City">City Library Bo</option>
            <option value="Kenema Regional">Regional Library East</option>
            <option value="Kenema city">City Library Kenema</option>
            <option value="Makeni Regional">Regional Library North</option>
            <option value="Makeni city">City Library Makeni</option>
            <option value="Eastern Region">Kailahun District Library</option>
            <option value="Eastern Region">Koidu District Library</option>
            <option value="Eastern Region">Segbuma Branch Library</option>
            <option value="Western Area">Western Area</option>
            <option value="Makeni Division">Makeni Division</option>
          </select>
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            placeholder="Enter password"
            className="w-full mt-1 px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            placeholder="Re-enter password"
            className="w-full mt-1 px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        {/* Account Status */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Account Status</label>
          <div className="flex gap-4 items-center">
            <label className="flex items-center gap-1 text-sm text-gray-700 dark:text-gray-300">
              <input
                type="radio"
                name="status"
                value="active"
                checked={form.status === 'active'}
                onChange={handleChange}
              />
              Active
            </label>
            <label className="flex items-center gap-1 text-sm text-gray-700 dark:text-gray-300">
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

        {/* Action Buttons */}
        <div className="flex gap-4 mt-6">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Create User
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="w-full bg-gray-300 text-gray-800 py-2 rounded-md hover:bg-gray-400 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
          >
            Clear Form
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUser;
