import React from "react";

export default function PriceEstimatorCard({ price }) {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-5 text-white mt-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold mb-1">Estimated Price</h3>
          <p className="text-sm opacity-90">
            Based on your current selections
          </p>
        </div>
        <div className="text-2xl font-bold">${price}</div>
      </div>
      <p className="text-xs mt-3 opacity-80">
        Final price may vary based on additional requirements.
      </p>
    </div>
  );
}