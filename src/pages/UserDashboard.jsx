import React from 'react';
import { Inbox, Send, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const cards = [
  { title: 'Inbox', icon: <Inbox size={20} />, value: 12, color: 'bg-blue-100 text-blue-800' },
  { title: 'Outbox', icon: <Send size={20} />, value: 9, color: 'bg-green-100 text-green-800' },
  { title: 'Notifications', icon: <Bell size={20} />, value: 3, color: 'bg-red-100 text-red-800' },
];

const uploads = [
  { file: 'Q1 Report 2025.pdf', date: 'May 15, 2025', by: 'Bo Librarian' },
  { file: 'Inventory.csv', date: 'May 14, 2025', by: 'Finance Team' },
];

const UserDashboard = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h2 className="text-2xl font-bold">Welcome,</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Branch Librarian 👋</p>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-4 mb-6">
        {cards.map((card) => (
          <div
            key={card.title}
            className={`p-4 rounded-lg shadow-sm ${card.color} flex items-center justify-between`}
          >
            <div>
              <p className="text-sm font-medium">{card.title}</p>
              <h4 className="text-xl font-bold">{card.value}</h4>
            </div>
            {card.icon}
          </div>
        ))}
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow">
          <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">Quick Actions</h3>
          <div className="space-y-2">
            <button
              onClick={() => navigate('/upload')}
              className="block w-full text-left px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Upload Document
            </button>
            <button
              onClick={() => navigate('/view-document')}
              className="block w-full text-left px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              View Recent Files
            </button>
            <button
              onClick={() => navigate('/notifications')}
              className="block w-full text-left px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              See Notifications
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow">
          <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">Recent Activity</h3>
          <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
            <li>
              📄 You received <b>monthly report.pdf</b> from Regional Librarian – East.
              <br /><span className="text-xs text-gray-500">Today 12:00 PM</span>
            </li>
            <li>
              📄 New document <b>Annual Budget</b> from Head of Adult Lending.
              <br /><span className="text-xs text-gray-500">Yesterday 2:40 PM</span>
            </li>
            <li>
              📄 You sent <b>Training Schedule.docx</b> to District Librarian.
              <br /><span className="text-xs text-gray-500">Monday 10:20 AM</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Recent Uploads */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Recent Uploads</h3>
        <ul className="space-y-2 text-sm">
          {uploads.map((upload, i) => (
            <li key={i} className="text-gray-700 dark:text-gray-300">
              📄 <b>{upload.file}</b> – {upload.by}, <span className="text-xs text-gray-500">{upload.date}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserDashboard;
