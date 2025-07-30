import React from "react";

export default function ProgressSteps({ step, onStepChange }) {
  const steps = [
    "Paper Details",
    "Instructions & Materials",
    "Review & Submit",
  ];
  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
      {steps.map((label, idx) => (
        <button
          key={label}
          className={`flex-1 text-sm font-medium py-2 rounded transition-all ${
            step === idx + 1
              ? "bg-blue-600 text-white"
              : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
          }`}
          onClick={() => onStepChange(idx + 1)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}