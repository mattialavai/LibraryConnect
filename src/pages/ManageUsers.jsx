import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Pencil, Trash2 } from 'lucide-react';

const ManageUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');

  // Load from localStorage on first mount
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(data);
  }, []);

  // Save to localStorage and update state
  const updateUsers = (updated) => {
    localStorage.setItem('users', JSON.stringify(updated));
    setUsers(updated);
  };

  // Toggle active/inactive
  const handleToggleStatus = (email) => {
    const updated = users.map((user) =>
      user.email === email
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
        : user
    );
    updateUsers(updated);
  };

  // Delete user
  const handleDelete = (email) => {
    const confirm = window.confirm('Are you sure you want to delete this user?');
    if (!confirm) return;
    const updated = users.filter((user) => user.email !== email);
    updateUsers(updated);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-md shadow">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">User Management</h2>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Search */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          {/* Create User */}
          <button
            onClick={() => navigate('/create-user')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Create User
          </button>
        </div>
      </div>

      {/* User Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Role/Position</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, i) => (
                <tr key={i} className="border-b dark:border-gray-700">
                  <td className="py-2 px-4">{user.name}</td>
                  <td className="py-2 px-4">{user.email}</td>
                  <td className="py-2 px-4 capitalize">{user.role}</td>
                  <td className="py-2 px-4">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        user.status === 'active'
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-400 text-white'
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="py-2 px-4 flex items-center gap-2 text-sm">
                    <button
                      onClick={() => handleToggleStatus(user.email)}
                      className="text-yellow-600 hover:underline"
                    >
                      {user.status === 'active' ? 'Deactivate' : 'Activate'}
                    </button>
                    <span className="text-gray-400">|</span>
                    <button
                      className="text-blue-600 hover:underline flex items-center gap-1"
                      onClick={() => navigate(`/edit-user/${user.email}`)}
                    >
                      <Pencil size={14} /> Edit
                    </button>
                    <button
                      className="text-red-600 hover:text-red-700"
                      onClick={() => handleDelete(user.email)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
