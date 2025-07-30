import React from "react";

export default function OrderFormContainer({ children }) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md border border-gray-200 dark:border-gray-800 overflow-hidden max-w-4xl mx-auto">
      {children}
    </div>
  );
}