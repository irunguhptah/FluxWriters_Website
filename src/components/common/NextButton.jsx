import React from "react";

export default function NextButton({ onClick, disabled, children, ...props }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-6 py-3 bg-blue-600 rounded-lg shadow-md text-white hover:bg-blue-500 transition ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}