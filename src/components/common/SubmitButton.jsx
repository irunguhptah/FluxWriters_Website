import React from "react";

export default function SubmitButton({ onClick, title, ariaLabel, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-6 py-3 bg-blue-600 rounded-lg shadow-md text-white hover:bg-blue-500 transition"
      title={title}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}