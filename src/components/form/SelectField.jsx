import React from "react";
import { ChevronRight } from "lucide-react";

export default function SelectField({ id, label, value, onChange, onFocus, required, children, ...props }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <select
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          className="block w-full appearance-none px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white pr-10 transition"
          {...props}
        >
          {children}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <ChevronRight className="h-4 w-4 rotate-90" />
        </div>
      </div>
    </div>
  );
}