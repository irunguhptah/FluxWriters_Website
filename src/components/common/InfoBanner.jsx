import React from "react";
import { Info } from "lucide-react";

export default function InfoBanner({ children }) {
  return (
    <div className="bg-blue-50 p-4 rounded-lg mb-6 flex items-start">
      <Info className="h-5 w-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
      <p className="text-sm text-blue-700">{children}</p>
    </div>
  );
}