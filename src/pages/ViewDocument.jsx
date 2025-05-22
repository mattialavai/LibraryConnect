import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  FileText,
  FileArchive,
  FileCode2,
  FileImage,
  File as FileIcon,
  Printer,
  Download,
} from 'lucide-react';

const ViewDocument = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doc, setDoc] = useState(null);
  const [loading, setLoading] = useState(true);

  const currentUser = JSON.parse(localStorage.getItem('userInfo')) || { role: '' };

  useEffect(() => {
    const documents = JSON.parse(localStorage.getItem('uploadedDocuments')) || [];
    const foundDoc = documents.find((d) => d.id === id);

    if (!foundDoc) {
      alert('❌ Document not found!');
      return navigate('/inbox');
    }

    const canAccess =
      currentUser.role === 'admin' ||
      foundDoc.recipient?.toLowerCase() === currentUser.role?.toLowerCase() ||
      foundDoc.by?.toLowerCase() === currentUser.role?.toLowerCase();

    if (!canAccess) {
      alert('🚫 You do not have permission to view this document.');
      return navigate('/inbox');
    }

    setDoc(foundDoc);
    setLoading(false);
  }, [id, navigate, currentUser.role]);

  const getIcon = () => {
    const ext = doc?.file?.split('.').pop()?.toLowerCase();
    if (ext === 'pdf') return <FileText className="text-red-500" size={20} />;
    if (['doc', 'docx'].includes(ext)) return <FileText className="text-blue-500" size={20} />;
    if (['png', 'jpg', 'jpeg'].includes(ext)) return <FileImage className="text-purple-500" size={20} />;
    if (['zip', 'rar'].includes(ext)) return <FileArchive className="text-yellow-500" size={20} />;
    if (['js', 'txt', 'json'].includes(ext)) return <FileCode2 className="text-gray-500" size={20} />;
    return <FileIcon className="text-gray-500" size={20} />;
  };

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = doc.fileUrl;
    a.download = doc.file;
    a.click();
  };

  const handlePrint = () => {
    const printWindow = window.open(doc.fileUrl, '_blank');
    if (printWindow) {
      printWindow.focus();
      printWindow.print();
    }
  };

  if (loading) return <p className="text-center mt-6 text-gray-500">Loading document...</p>;

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-md shadow max-w-3xl mx-auto">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
        {getIcon()} Document Preview
      </h2>

      <div className="space-y-2 text-sm text-gray-700 dark:text-gray-200">
        <p><strong>Title:</strong> {doc.title}</p>
        <p><strong>Type:</strong> {doc.type}</p>
        <p><strong>Recipient:</strong> {doc.recipient}</p>
        <p><strong>Sender:</strong> {doc.by}</p>
        <p><strong>Message:</strong> {doc.message || 'N/A'}</p>
        <p><strong>Date:</strong> {doc.date}</p>
      </div>

      <div className="mt-6">
        <h4 className="font-semibold mb-2">File Preview</h4>
        <div className="w-full h-[400px] border rounded bg-gray-100 flex items-center justify-center">
          {doc.fileUrl ? (
            <iframe
              src={doc.fileUrl}
              title="Document Preview"
              className="w-full h-full"
              frameBorder="0"
            />
          ) : (
            <p className="text-gray-500">No file uploaded.</p>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={handleDownload}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
        >
          <Download size={16} /> Download
        </button>
        <button
          onClick={handlePrint}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 flex items-center gap-2"
        >
          <Printer size={16} /> Print
        </button>
      </div>
    </div>
  );
};

export default ViewDocument;
