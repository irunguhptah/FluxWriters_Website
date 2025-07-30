import React from "react";
import { Check, Star } from "lucide-react";

export default function WriterPreferenceSelector({
  writerPreference,
  invitedWriters,
  handleWriterPreference,
}) {
  return (
    <div>
      <label
        htmlFor="writerPreference"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        Writer Preference
      </label>
      <p className="text-xs text-gray-500 mb-2">
        You can let all writers bid for your order, or invite specific writers
        from your favorites or the writers list.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div
          className={`border rounded-lg p-4 cursor-pointer transition ${
            writerPreference === "any"
              ? "border-blue-500 bg-blue-50 ring-2 ring-blue-200"
              : "border-gray-200 hover:border-gray-300"
          }`}
          onClick={() => handleWriterPreference("any")}
          title="Let all qualified writers bid"
          aria-label="Let all writers bid"
        >
          <div className="flex items-start">
            <div
              className={`h-5 w-5 rounded-full border flex items-center justify-center mr-3 ${
                writerPreference === "any"
                  ? "border-blue-500 bg-blue-500"
                  : "border-gray-300"
              }`}
            >
              {writerPreference === "any" && (
                <Check className="h-3 w-3 text-white" />
              )}
            </div>
            <div>
              <h3 className="font-medium">Let All Writers Bid</h3>
              <p className="text-sm text-gray-500 mt-1">
                Your order will be visible to all qualified writers.
              </p>
            </div>
          </div>
        </div>

        <div
          className={`border rounded-lg p-4 cursor-pointer transition ${
            writerPreference === "preferred"
              ? "border-blue-500 bg-blue-50 ring-2 ring-blue-200"
              : "border-gray-200 hover:border-gray-300"
          }`}
          onClick={() => handleWriterPreference("preferred")}
          title="Invite writers from your list"
          aria-label="Invite writers"
        >
          <div className="flex items-start">
            <div
              className={`h-5 w-5 rounded-full border flex items-center justify-center mr-3 ${
                writerPreference === "preferred"
                  ? "border-blue-500 bg-blue-500"
                  : "border-gray-300"
              }`}
            >
              {writerPreference === "preferred" && (
                <Check className="h-3 w-3 text-white" />
              )}
            </div>
            <div>
              <h3 className="font-medium">Invite Writers</h3>
              <p className="text-sm text-gray-500 mt-1">
                Select writers from your favorites or the writers list to
                invite.
              </p>
              {invitedWriters.length > 0 && (
                <div className="mt-2 space-y-1">
                  <span className="inline-block text-xs text-blue-600">
                    {invitedWriters.length} writer(s) invited
                  </span>
                  <ul className="mt-1 space-y-1">
                    {invitedWriters.map((writer, idx) => (
                      <li
                        key={writer.id || idx}
                        className="flex items-center text-xs bg-gray-100 rounded px-2 py-1"
                      >
                        <span className="font-medium text-gray-800 mr-2">
                          {writer.name || writer}
                        </span>
                        {writer.rating !== undefined && (
                          <span className="flex items-center text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full ml-1">
                            <Star className="h-3 w-3 mr-1 fill-yellow-500" />
                            {writer.rating}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}