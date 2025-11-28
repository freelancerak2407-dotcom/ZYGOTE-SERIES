import React from 'react';
import { UploadCloud, FileText, AlertCircle, Check } from 'lucide-react';
import { Button } from '../components/Button';

// Mockup for Admin Bulk Import UI
export const AdminImportMock = () => {
  return (
    <div className="p-8 max-w-5xl mx-auto bg-white min-h-screen">
      <header className="mb-8 border-b pb-4">
        <h1 className="text-2xl font-bold text-gray-900">Bulk Import Content</h1>
        <p className="text-gray-500">Upload CSV/JSON files to populate Subjects, Chapters, or MCQs.</p>
      </header>

      <div className="grid grid-cols-3 gap-8">
        {/* Step 1: Upload */}
        <div className="col-span-2 space-y-6">
          <div className="border-2 border-dashed border-gray-300 rounded-2xl p-10 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
              <UploadCloud size={32} />
            </div>
            <p className="text-lg font-medium text-gray-700">Click to upload or drag and drop</p>
            <p className="text-sm text-gray-500 mt-2">CSV, JSON (Max 10MB)</p>
          </div>

          {/* Preview Table */}
          <div className="border rounded-xl overflow-hidden">
            <div className="bg-gray-50 px-6 py-3 border-b flex justify-between items-center">
              <h3 className="font-semibold text-gray-700">Preview: mcqs_batch_01.csv</h3>
              <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">Draft</span>
            </div>
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-500">
                <tr>
                  <th className="px-6 py-3">Row</th>
                  <th className="px-6 py-3">Question</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="px-6 py-3">1</td>
                  <td className="px-6 py-3">Which nerve supplies...</td>
                  <td className="px-6 py-3 text-green-600 flex items-center"><Check size={14} className="mr-1"/> Valid</td>
                </tr>
                <tr>
                  <td className="px-6 py-3">2</td>
                  <td className="px-6 py-3">The axillary artery...</td>
                  <td className="px-6 py-3 text-red-600 flex items-center"><AlertCircle size={14} className="mr-1"/> Missing Option A</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Sidebar: Instructions */}
        <div className="col-span-1">
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
            <h3 className="font-bold text-[#003049] mb-4 flex items-center">
              <FileText size={18} className="mr-2"/> Instructions
            </h3>
            <ul className="space-y-3 text-sm text-gray-700">
              <li>1. Download the template CSV.</li>
              <li>2. Ensure 'Question' and 'Correct Answer' columns are filled.</li>
              <li>3. Images must be URLs (upload to S3 first).</li>
              <li>4. Max 500 rows per batch.</li>
            </ul>
            <div className="mt-6 pt-6 border-t border-blue-200">
              <Button className="w-full">Download Template</Button>
            </div>
          </div>
          
          <div className="mt-6">
            <Button variant="primary" className="w-full" disabled>Import 50 Rows</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
