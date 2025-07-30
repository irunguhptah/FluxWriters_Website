import React from "react";

export default function FileUploadList({ files, onRemove }) {
  return (
    <div className="space-y-2">
      {files.map((file, idx) => (
        <div key={idx} className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 p-2 rounded">
          <span className="truncate">{file.name}</span>
          <button
            type="button"
            className="ml-2 text-red-500 hover:underline"
            onClick={() => onRemove(idx)}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}