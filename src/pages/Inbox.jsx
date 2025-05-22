import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Inbox = () => {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('userInfo')) || { role: '', email: '' };
  const [documents, setDocuments] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const storedDocs = JSON.parse(localStorage.getItem('uploadedDocuments')) || [];
    setDocuments(storedDocs);
  }, []);

  const inbox = documents.filter(
    (doc) => (doc.recipient || '').toLowerCase().includes(currentUser.role.toLowerCase())
  );

  const outbox = documents.filter(
    (doc) => (doc.by || '').toLowerCase() === currentUser.role.toLowerCase()
  );

  const filteredInbox = inbox.filter(
    (doc) =>
      (doc.file || '').toLowerCase().includes(search.toLowerCase()) ||
      (doc.by || '').toLowerCase().includes(search.toLowerCase())
  );

  const filteredOutbox = outbox.filter(
    (doc) =>
      (doc.file || '').toLowerCase().includes(search.toLowerCase()) ||
      (doc.recipient || '').toLowerCase().includes(search.toLowerCase())
  );

  const downloadFile = (doc) => {
    const a = document.createElement('a');
    a.href = doc.fileUrl;
    a.download = doc.file;
    a.click();
  };

  const viewFile = (id) => {
    if (!id) return alert('Document ID is missing!');
    navigate(`/view-document/${id}`);
  };

  const moveToTrash = (doc) => {
  const updatedDocs = documents.filter((d) => d.id !== doc.id);
  localStorage.setItem('uploadedDocuments', JSON.stringify(updatedDocs));

  const trashedDocs = JSON.parse(localStorage.getItem('trashedDocuments')) || [];

  const trashedDoc = {
    ...doc,
    trashedAt: new Date().toLocaleString(), // ✅ Add timestamp
  };

  trashedDocs.push(trashedDoc);
  localStorage.setItem('trashedDocuments', JSON.stringify(trashedDocs));

  setDocuments(updatedDocs);
  alert('🗑️ Document moved to Trash!');
};

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-md shadow">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">📥 Inbox</h2>

      <div className="flex justify-between items-center mb-4">
        <span className="text-sm text-gray-500">Switch to Outbox ↓</span>
        <div className="relative w-64">
          <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search documents..."
            className="w-full pl-9 pr-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Inbox Table */}
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-2 px-4">Title</th>
              <th className="py-2 px-4">Sender</th>
              <th className="py-2 px-4">Date</th>
              <th className="py-2 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredInbox.map((doc) => (
              <tr key={doc.id} className="border-b dark:border-gray-700">
                <td className="py-2 px-4">{doc.file}</td>
                <td className="py-2 px-4">{doc.by}</td>
                <td className="py-2 px-4">{doc.date}</td>
                <td className="py-2 px-4 text-blue-600 space-x-3">
                  <button onClick={() => downloadFile(doc)}>Download</button>
                  <button onClick={() => viewFile(doc.id)}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredInbox.length === 0 && (
          <p className="text-sm text-gray-400 mt-2">No documents found in your inbox.</p>
        )}
      </div>

      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">📤 Outbox</h2>
      <span className="text-sm text-gray-500 mb-2 block">Switch to Inbox ↑</span>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-2 px-4">Title</th>
              <th className="py-2 px-4">Recipient</th>
              <th className="py-2 px-4">Date</th>
              <th className="py-2 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredOutbox.map((doc) => (
              <tr key={doc.id} className="border-b dark:border-gray-700">
                <td className="py-2 px-4">{doc.file}</td>
                <td className="py-2 px-4">{doc.recipient}</td>
                <td className="py-2 px-4">{doc.date}</td>
                <td className="py-2 px-4 text-blue-600 space-x-3">
                  <button onClick={() => downloadFile(doc)}>Download</button>
                  <button onClick={() => viewFile(doc.id)}>View</button>
                  <button onClick={() => moveToTrash(doc)} className="text-red-600">Trash</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredOutbox.length === 0 && (
          <p className="text-sm text-gray-400 mt-2">You have not sent any documents yet.</p>
        )}
      </div>
    </div>
  );
};

export default Inbox;
