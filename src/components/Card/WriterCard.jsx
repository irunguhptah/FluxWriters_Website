import { useState } from "react";
import { Star, CheckCircle, MessageSquare, Clock } from "lucide-react";

export default function WriterCard({ writer, bid, onAccept }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start">
        {/* Writer Avatar */}
        <div className="flex-shrink-0 mr-4">
          <div className="h-12 w-12 rounded-full bg-gradient-to-r from-green-300 to-blue-300 flex items-center justify-center text-white font-bold">
            {writer.name.charAt(0)}
          </div>
          <div className="mt-1 text-center">
            <span className="text-xs font-medium text-gray-500">
              {writer.rating.toFixed(1)}
            </span>
          </div>
        </div>

        {/* Writer Info */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between">
            <h4 className="text-base font-medium text-gray-900">
              {writer.name}
            </h4>
            <span className="text-sm font-bold text-blue-600">
              ${bid.price.toFixed(2)}
            </span>
          </div>

          <div className="flex items-center mt-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < writer.rating
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="text-xs text-gray-500 ml-1">
              ({writer.completedOrders} orders)
            </span>
          </div>

          <p className="text-sm text-gray-500 mt-2">
            <span className="font-medium">Specialties:</span>{" "}
            {writer.specialties.join(", ")}
          </p>

          {bid.message && isExpanded && (
            <div className="mt-3 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-700">{bid.message}</p>
            </div>
          )}

          <div className="mt-3 flex items-center text-xs text-gray-500 space-x-4">
            <span className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              {bid.deliveryDays} day delivery
            </span>
            <span className="flex items-center">
              <CheckCircle className="h-3 w-3 mr-1" />
              {writer.completionRate}% completion rate
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          {isExpanded ? "Show less" : "Show more"}
        </button>

        <div className="flex space-x-2">
          <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center">
            <MessageSquare className="h-4 w-4 mr-1" />
            Message
          </button>
          <button
            onClick={onAccept}
            className="px-3 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500 flex items-center"
          >
            <CheckCircle className="h-4 w-4 mr-1" />
            Hire Writer
          </button>
        </div>
      </div>
    </div>
  );
}
