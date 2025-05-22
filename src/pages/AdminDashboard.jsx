// src/pages/AdminDashboard.jsx
import React from 'react';
import { Users, FileText, Building, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const users = [
    { name: 'Mattia', email: 'mattia@sllb.gov.sl', role: 'Admin' },
    { name: 'Fatmata K.', email: 'fatmata@hq.sllb.sl', role: 'Chief Librarian' },
    { name: 'Andrew B.', email: 'andrew@bo.sllb.sl', role: 'Regional Librarian' },
    { name: 'Susan L.', email: 'susan@kenema.sllb.sl', role: 'Branch Librarian' },
    { name: 'Kabbs D.', email: 'kabbs@dept.sllb.sl', role: 'Assistant Librarian' },
    { name: 'Mariatu J.', email: 'mariatu@hq.sllb.sl', role: 'Branch Librarian' },
    { name: 'Mohamed S.', email: 'mohamed@north.sllb.sl', role: 'Regional Librarian' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold">Welcome,</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Chief Librarian 👋</p>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-100 text-blue-800 p-4 rounded-md shadow">
          <div className="flex justify-between">
            <p className="font-medium">Total Users</p>
            <Users size={20} />
          </div>
          <h3 className="text-xl font-bold mt-2">{users.length}</h3>
        </div>

        <div className="bg-green-100 text-green-800 p-4 rounded-md shadow">
          <div className="flex justify-between">
            <p className="font-medium">Total Documents</p>
            <FileText size={20} />
          </div>
          <h3 className="text-xl font-bold mt-2">134</h3>
        </div>

        <div className="bg-yellow-100 text-yellow-800 p-4 rounded-md shadow">
          <div className="flex justify-between">
            <p className="font-medium">Branches/Depts</p>
            <Building size={20} />
          </div>
          <h3 className="text-xl font-bold mt-2">7</h3>
        </div>
      </div>

      {/* Manage Users */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-md shadow">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Manage Users</h3>
          <button
            onClick={() => navigate('/create-user')}
            className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700"
          >
            <Plus size={16} /> Create User
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Email</th>
                <th className="py-2 px-4">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, i) => (
                <tr key={i} className="border-b dark:border-gray-700">
                  <td className="py-2 px-4">{user.name}</td>
                  <td className="py-2 px-4">{user.email}</td>
                  <td className="py-2 px-4">{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
