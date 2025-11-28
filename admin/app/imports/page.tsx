"use client";

import { useState } from 'react';
import { UploadCloud, FileText, AlertCircle, Check, Loader2 } from 'lucide-react';

export default function ImportPage() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'preview' | 'importing' | 'success'>('idle');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setStatus('idle');
    }
  };

  const handleUpload = () => {
    if (!file) return;
    setStatus('uploading');
    // Simulate upload and processing
    setTimeout(() => setStatus('preview'), 1500);
  };

  const handleImport = () => {
    setStatus('importing');
    // Simulate import job
    setTimeout(() => setStatus('success'), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Bulk Import</h1>
        <p className="text-gray-500">Upload CSV/JSON files to populate the database.</p>
      </header>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2 space-y-6">
          {/* Upload Area */}
          <div className="border-2 border-dashed border-gray-300 rounded-2xl p-10 flex flex-col items-center justify-center bg-white hover:bg-gray-50 transition-colors">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
              <UploadCloud size={32} />
            </div>
            <input 
              type="file" 
              accept=".csv,.json" 
              onChange={handleFileChange}
              className="hidden" 
              id="file-upload"
            />
            <label htmlFor="file-upload" className="cursor-pointer text-center">
              <p className="text-lg font-medium text-gray-700">
                {file ? file.name : "Click to upload or drag and drop"}
              </p>
              <p className="text-sm text-gray-500 mt-2">CSV, JSON (Max 10MB)</p>
            </label>
          </div>

          {/* Preview Area */}
          {status !== 'idle' && status !== 'uploading' && (
            <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
              <div className="bg-gray-50 px-6 py-3 border-b flex justify-between items-center">
                <h3 className="font-semibold text-gray-700">Preview: {file?.name}</h3>
                <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">Draft</span>
              </div>
              <div className="p-4">
                {status === 'success' ? (
                  <div className="text-center py-8 text-green-600">
                    <Check size={48} className="mx-auto mb-4" />
                    <h3 className="text-xl font-bold">Import Successful!</h3>
                    <p className="text-gray-600">50 rows have been added to the database.</p>
                  </div>
                ) : (
                  <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-500">
                      <tr>
                        <th className="px-4 py-2">Row</th>
                        <th className="px-4 py-2">Question</th>
                        <th className="px-4 py-2">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      <tr>
                        <td className="px-4 py-2">1</td>
                        <td className="px-4 py-2">Which nerve supplies...</td>
                        <td className="px-4 py-2 text-green-600 flex items-center"><Check size={14} className="mr-1"/> Valid</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2">2</td>
                        <td className="px-4 py-2">The axillary artery...</td>
                        <td className="px-4 py-2 text-red-600 flex items-center"><AlertCircle size={14} className="mr-1"/> Missing Opt A</td>
                      </tr>
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Actions Sidebar */}
        <div className="col-span-1 space-y-4">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-bold text-[#003049] mb-4">Actions</h3>
            
            {status === 'idle' && (
              <button 
                onClick={handleUpload}
                disabled={!file}
                className="w-full bg-[#003049] text-white py-2 rounded-lg font-medium hover:bg-[#00466A] disabled:opacity-50"
              >
                Upload & Preview
              </button>
            )}

            {status === 'uploading' && (
              <button disabled className="w-full bg-gray-100 text-gray-500 py-2 rounded-lg font-medium flex items-center justify-center">
                <Loader2 className="animate-spin mr-2" size={18} /> Processing...
              </button>
            )}

            {status === 'preview' && (
              <button 
                onClick={handleImport}
                className="w-full bg-[#27E6D4] text-[#003049] py-2 rounded-lg font-bold hover:bg-[#20d5c3]"
              >
                Start Import
              </button>
            )}
            
            {status === 'success' && (
              <button 
                onClick={() => { setFile(null); setStatus('idle'); }}
                className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-50"
              >
                Import Another
              </button>
            )}
          </div>

          <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
            <h3 className="font-bold text-[#003049] mb-2 flex items-center">
              <FileText size={18} className="mr-2"/> Instructions
            </h3>
            <p className="text-sm text-gray-600 mb-4">Ensure your CSV follows the strict schema defined in the documentation.</p>
            <button className="text-blue-600 text-sm font-medium hover:underline">Download Template</button>
          </div>
        </div>
      </div>
    </div>
  );
}
