import React from 'react';
import { Inbox, Send, Folder, Bell, FileText } from 'lucide-react';

const cards = [
  { title: 'Inbox', icon: <Inbox size={20} />, value: 12, color: 'bg-blue-100 text-blue-800' },
  { title: 'Outbox', icon: <Send size={20} />, value: 9, color: 'bg-green-100 text-green-800' },
  { title: 'Folders', icon: <Folder size={20} />, value: 5, color: 'bg-yellow-100 text-yellow-800' },
  { title: 'Notifications', icon: <Bell size={20} />, value: 3, color: 'bg-red-100 text-red-800' },
];

const folders = [
  { name: 'Finance Docs', count: 4 },
  { name: 'Bo Region', count: 3 },
  { name: 'Audit Reports', count: 2 },
];

const uploads = [
  { file: 'Q1 Report 2025.pdf', date: 'May 15, 2025', by: 'Bo Librarian' },
  { file: 'Inventory.csv', date: 'May 14, 2025', by: 'Finance Team' },
  { file: 'Procurement Memo.docx', date: 'May 13, 2025', by: 'Procurement Officer' },
];

const Dashboard = () => {
  return (
    <>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Welcome,</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Chief Librarian 👋</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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

      {/* Folder Previews */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Quick Folder Preview</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {folders.map((folder) => (
            <div
              key={folder.name}
              className="p-4 bg-white dark:bg-gray-800 rounded-md shadow flex justify-between items-center"
            >
              <div>
                <p className="font-medium text-gray-700 dark:text-gray-200">{folder.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{folder.count} files</p>
              </div>
              <Folder size={20} className="text-blue-600 dark:text-blue-400" />
            </div>
          ))}
        </div>
      </div>

      {/* Recent Uploads */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Recent Uploads</h3>
        <div className="space-y-3">
          {uploads.map((upload, i) => (
            <div
              key={i}
              className="p-3 bg-white dark:bg-gray-800 rounded-md shadow flex justify-between items-center"
            >
              <div>
                <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{upload.file}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Uploaded by {upload.by} • {upload.date}
                </p>
              </div>
              <FileText size={20} className="text-gray-600 dark:text-gray-300" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
