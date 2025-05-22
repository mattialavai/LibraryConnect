// src/pages/FolderView.jsx
import React, { useEffect, useState } from 'react';
import { FileText, FolderPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FolderView = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('userInfo'));
  const [folders, setFolders] = useState({});
  const [search, setSearch] = useState('');

  useEffect(() => {
    const documents = JSON.parse(localStorage.getItem('uploadedDocuments')) || [];

    const visibleDocs = user.role === 'admin'
      ? documents
      : documents.filter((doc) =>
          doc.recipient?.toLowerCase().includes(user.role?.toLowerCase()) ||
          doc.recipient?.toLowerCase().includes(user.email?.split('@')[0]?.toLowerCase())
        );

    const grouped = {};
    visibleDocs.forEach((doc) => {
      const key = doc.type || 'Uncategorized';
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(doc);
    });

    setFolders(grouped);
  }, [user]);

  const handleCreateFolder = () => {
    alert('🛠️ Folder creation for admin will be added in backend functionality.');
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-md shadow max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Folders</h2>

        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search folders or recipients..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-2 rounded-md border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />

          {user.role === 'admin' && (
            <button
              onClick={handleCreateFolder}
              className="flex items-center gap-1 bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700"
            >
              <FolderPlus size={16} /> Add Folder
            </button>
          )}
        </div>
      </div>

      {Object.keys(folders).length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">No folders or documents available.</p>
      ) : (
        Object.entries(folders)
          .filter(([folderName]) =>
            folderName.toLowerCase().includes(search.toLowerCase())
          )
          .map(([folderName, docs], i) => (
            <div key={i} className="mb-6">
              <h3 className="text-lg font-semibold text-blue-600 mb-2">
                📁 {folderName} ({docs.length})
              </h3>
              <ul className="space-y-2 text-sm">
                {docs
                  .filter((doc) =>
                    (doc.recipient || '').toLowerCase().includes(search.toLowerCase()) ||
                    (doc.title || doc.file || '').toLowerCase().includes(search.toLowerCase())
                  )
                  .map((doc) => (
                    <li
                      key={doc.id}
                      className="flex justify-between items-center p-3 bg-gray-100 dark:bg-gray-700 rounded-md"
                    >
                      <div>
                        <p className="font-medium text-gray-800 dark:text-white">
                          {doc.title || doc.file}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Sent to: {doc.recipient} • {doc.date}
                        </p>
                      </div>
                      <button
                        onClick={() => navigate(`/view-document/${doc.id}`)}
                        className="text-blue-600 hover:underline flex items-center gap-1"
                      >
                        <FileText size={16} /> View
                      </button>
                    </li>
                  ))}
              </ul>
            </div>
          ))
      )}
    </div>
  );
};

export default FolderView;
