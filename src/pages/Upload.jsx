import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const Upload = () => {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('userInfo')) || { role: '' };

  const [form, setForm] = useState({
    title: '',
    type: '',
    folder: '',
    recipient: '',
    docStatus: 'Pending',
    message: '',
    file: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setForm((prev) => ({
      ...prev,
      file: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.file) {
      alert('❌ Please select a file to upload.');
      return;
    }

    const fileUrl = URL.createObjectURL(form.file);

    const newDoc = {
      id: uuidv4(),
      file: form.title || form.file.name,
      fileUrl,
      type: form.type,
      folder: form.folder,
      recipient: form.recipient,
      docStatus: form.docStatus,
      message: form.message,
      by: currentUser.role,
      date: new Date().toLocaleDateString(),
      status: 'active', // for future trash/archive
    };

    const uploadedDocuments = JSON.parse(localStorage.getItem('uploadedDocuments')) || [];
    uploadedDocuments.push(newDoc);
    localStorage.setItem('uploadedDocuments', JSON.stringify(uploadedDocuments));

    alert('✅ Document uploaded successfully!');
    navigate('/inbox');

    // Create new notification
    const newNotification = {
  title: `New document uploaded: ${newDoc.file}`,
  sender: currentUser.role,
  timestamp: new Date().toISOString(),
  unread: true,
};

// Add to existing notifications
const notifications = JSON.parse(localStorage.getItem('notifications')) || [];
notifications.unshift(newNotification); // Add to top
localStorage.setItem('notifications', JSON.stringify(notifications));


  };

  const handleCancel = () => {
    setForm({
      title: '',
      type: '',
      folder: '',
      recipient: '',
      docStatus: 'Pending',
      message: '',
      file: null,
    });
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-md shadow">
      <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-white">Send a New Document</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Document Title</label>
          <input
            type="text"
            name="title"
            placeholder="Enter document title"
            value={form.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Type</label>
          <input
            type="text"
            name="type"
            value={form.type}
            onChange={handleChange}
            placeholder="e.g. Report, Memo"
            className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Folder / Category</label>
          <input
            type="text"
            name="folder"
            value={form.folder}
            onChange={handleChange}
            placeholder="e.g. Finance, Reports"
            className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Recipient</label>
          <select
            name="recipient"
            value={form.recipient}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
          >
            <option value="">Choose recipient</option>
            <option value="Admin">Admin</option>
            <option value="HQ Librarian">HQ Librarian</option>
            <option value="Regional Librarian">Regional Librarian</option>
            <option value="Branch Librarian">Branch Librarian</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Document Status</label>
          <select
            name="docStatus"
            value={form.docStatus}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
          >
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Upload File</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white bg-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Message</label>
          <textarea
            name="message"
            placeholder="Optional message..."
            value={form.message}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div className="flex justify-between mt-6">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Send Document
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Upload;
