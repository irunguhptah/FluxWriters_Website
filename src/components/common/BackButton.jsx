import React from "react";

export default function BackButton({ onClick, title, ariaLabel }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-6 py-3 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-700 hover:bg-gray-50 transition"
      title={title}
      aria-label={ariaLabel}
    >
      Back
    </button>
  );
}