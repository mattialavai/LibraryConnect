// src/pages/Trash.jsx
import React, { useEffect, useState } from 'react';
import { Trash2, RotateCw, XCircle } from 'lucide-react';

const Trash = () => {
  const [trash, setTrash] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    const trashedDocs = JSON.parse(localStorage.getItem('trashedDocuments')) || [];

    // Auto-purge documents older than 7 days
    const now = new Date();
    const filtered = trashedDocs.filter(doc => {
      const deletedDate = new Date(doc.trashedAt);
      const diffDays = (now - deletedDate) / (1000 * 60 * 60 * 24);
      return diffDays <= 7;
    });

    setTrash(filtered);
    localStorage.setItem('trashedDocuments', JSON.stringify(filtered));
  }, []);

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const restoreDocument = (doc) => {
    const updatedTrash = trash.filter((item) => item.id !== doc.id);
    const inbox = JSON.parse(localStorage.getItem('uploadedDocuments')) || [];

    inbox.push(doc);
    localStorage.setItem('uploadedDocuments', JSON.stringify(inbox));
    localStorage.setItem('trashedDocuments', JSON.stringify(updatedTrash));
    setTrash(updatedTrash);
    setSelected((prev) => prev.filter((id) => id !== doc.id));
    alert('✅ Document restored!');
  };

  const permanentlyDelete = (doc) => {
    const updatedTrash = trash.filter((item) => item.id !== doc.id);
    localStorage.setItem('trashedDocuments', JSON.stringify(updatedTrash));
    setTrash(updatedTrash);
    setSelected((prev) => prev.filter((id) => id !== doc.id));
    alert('🗑️ Permanently deleted.');
  };

  const restoreSelected = () => {
    const inbox = JSON.parse(localStorage.getItem('uploadedDocuments')) || [];
    const toRestore = trash.filter((doc) => selected.includes(doc.id));
    const updatedTrash = trash.filter((doc) => !selected.includes(doc.id));

    localStorage.setItem('uploadedDocuments', JSON.stringify([...inbox, ...toRestore]));
    localStorage.setItem('trashedDocuments', JSON.stringify(updatedTrash));

    setTrash(updatedTrash);
    setSelected([]);
    alert(`✅ Restored ${toRestore.length} documents`);
  };

  const deleteSelected = () => {
    const updatedTrash = trash.filter((doc) => !selected.includes(doc.id));
    localStorage.setItem('trashedDocuments', JSON.stringify(updatedTrash));
    setTrash(updatedTrash);
    setSelected([]);
    alert(`🗑️ Deleted ${selected.length} documents`);
  };

  const emptyTrash = () => {
    if (window.confirm('Are you sure you want to empty the trash? This cannot be undone.')) {
      localStorage.removeItem('trashedDocuments');
      setTrash([]);
      setSelected([]);
      alert('🗑️ Trash emptied!');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-md shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
          <Trash2 /> Trash
        </h2>

        {trash.length > 0 && (
          <button
            onClick={emptyTrash}
            className="text-red-600 hover:underline text-sm"
          >
            Empty Trash
          </button>
        )}
      </div>

      {trash.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No documents in trash.</p>
      ) : (
        <>
          {selected.length > 0 && (
            <div className="mb-3 space-x-4">
              <button
                onClick={restoreSelected}
                className="bg-green-600 text-white px-3 py-1.5 rounded hover:bg-green-700 text-sm"
              >
                Restore Selected
              </button>
              <button
                onClick={deleteSelected}
                className="bg-red-600 text-white px-3 py-1.5 rounded hover:bg-red-700 text-sm"
              >
                Delete Selected
              </button>
            </div>
          )}

          <table className="min-w-full text-sm text-left">
            <thead className="bg-red-600 text-white">
              <tr>
                <th className="py-2 px-4"><input type="checkbox" onChange={(e) => {
                  if (e.target.checked) {
                    setSelected(trash.map(doc => doc.id));
                  } else {
                    setSelected([]);
                  }
                }} checked={selected.length === trash.length} /></th>
                <th className="py-2 px-4">Title</th>
                <th className="py-2 px-4">Recipient</th>
                <th className="py-2 px-4">Date</th>
                <th className="py-2 px-4">Deleted At</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {trash.map((doc) => (
                <tr key={doc.id} className="border-b dark:border-gray-700">
                  <td className="py-2 px-4">
                    <input
                      type="checkbox"
                      checked={selected.includes(doc.id)}
                      onChange={() => toggleSelect(doc.id)}
                    />
                  </td>
                  <td className="py-2 px-4">{doc.file}</td>
                  <td className="py-2 px-4">{doc.recipient}</td>
                  <td className="py-2 px-4">{doc.date}</td>
                  <td className="py-2 px-4 text-xs text-gray-500">{doc.trashedAt || 'N/A'}</td>
                  <td className="py-2 px-4 space-x-2">
                    <button
                      onClick={() => restoreDocument(doc)}
                      className="text-green-600 hover:underline flex items-center gap-1"
                    >
                      <RotateCw size={14} /> Restore
                    </button>
                    <button
                      onClick={() => permanentlyDelete(doc)}
                      className="text-red-600 hover:underline flex items-center gap-1"
                    >
                      <XCircle size={14} /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default Trash;
