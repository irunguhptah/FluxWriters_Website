import React from "react";

export default function PageStepper({ value, onChange }) {
  return (
    <div>
      <label htmlFor="pages" className="block text-sm font-medium text-gray-700 mb-1">
        Number of Pages <span className="text-red-500">*</span>
      </label>
      <div className="flex items-center">
        <button
          type="button"
          onClick={() => onChange(Math.max(1, value - 1))}
          className="px-4 py-3 border border-gray-300 rounded-l-lg bg-gray-50 text-gray-700 hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          −
        </button>
        <input
          type="number"
          id="pages"
          name="pages"
          min="1"
          value={value}
          onChange={e => onChange(Number(e.target.value))}
          className="block w-20 px-4 py-3 border-t border-b border-gray-300 text-center focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
        <button
          type="button"
          onClick={() => onChange(value + 1)}
          className="px-4 py-3 border border-gray-300 rounded-r-lg bg-gray-50 text-gray-700 hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          +
        </button>
        <span className="ml-3 text-sm text-gray-500">
          (~275 words per page)
        </span>
      </div>
    </div>
  );
}