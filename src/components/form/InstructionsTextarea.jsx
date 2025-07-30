import React from "react";

export default function InstructionsTextarea({ value, onChange, onFocus }) {
  return (
    <div>
      <label
        htmlFor="instructions"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        Detailed Instructions <span className="text-red-500">*</span>
      </label>
      <textarea
        id="instructions"
        name="instructions"
        rows={6}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        placeholder="Provide detailed instructions for your paper. Be specific about requirements, formatting style (APA, MLA, etc.), key points to address, and any specific sources to use."
        title="Enter detailed instructions"
        aria-label="Detailed Instructions"
      />
      <p className="mt-1 text-sm text-gray-500">
        Thorough instructions help us deliver exactly what you need.
      </p>
    </div>
  );
}