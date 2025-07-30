import React from "react";
import { Upload, FileText, X } from "lucide-react";

export default function FileUpload({ files, onFileChange, removeFile }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Upload Files (Optional)
      </label>
      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-blue-400 transition-colors bg-gray-50">
        <div className="space-y-2 text-center">
          <Upload className="mx-auto h-10 w-10 text-gray-400" />
          <div className="flex text-sm text-gray-600 justify-center">
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none px-3 py-2 border border-gray-300 shadow-sm transition"
              title="Upload files"
              aria-label="Upload files"
            >
              <span>Upload files</span>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                multiple
                onChange={onFileChange}
                className="sr-only"
              />
            </label>
            <p className="pl-1 flex items-center">or drag and drop</p>
          </div>
          <p className="text-xs text-gray-500">
            PDF, DOC, DOCX, PPT, PPTX, XLS, XLSX up to 20MB each
          </p>
        </div>
      </div>
      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          <h3 className="text-sm font-medium text-gray-700 flex items-center">
            <FileText className="h-4 w-4 mr-1 text-blue-500" />
            Uploaded Files ({files.length})
          </h3>
          <ul className="border border-gray-200 rounded-lg divide-y divide-gray-200 overflow-hidden bg-gray-50">
            {files.map((file, index) => (
              <li
                key={index}
                className="pl-4 pr-4 py-3 flex items-center justify-between text-sm hover:bg-gray-100 transition-colors"
              >
                <div className="w-0 flex-1 flex items-center">
                  <FileText className="flex-shrink-0 h-5 w-5 text-gray-400" />
                  <span className="ml-2 flex-1 w-0 truncate">
                    {file.name}
                  </span>
                  <span className="ml-2 text-xs text-gray-500">
                    ({(file.size / 1024).toFixed(1)} KB)
                  </span>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="font-medium text-red-600 hover:text-red-500 flex items-center"
                  >
                    <X className="h-4 w-4 mr-1" />
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}