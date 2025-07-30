import React from "react";
import { FileText, Star, Users } from "lucide-react";

export default function InstructionsMaterialsReviewCard({
  formData,
  editing,
  toggleEditing,
  handleChange,
  removeFile,
  setInviteModalOpen,
  setSelectedWriterIds,
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:border-blue-300 transition-colors">
      <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center pb-3 border-b border-gray-100">
        <FileText className="h-5 w-5 text-blue-500 mr-2" />
        Instructions & Materials
      </h3>
      <div className="space-y-4">
        {/* Detailed Instructions */}
        <div className="pb-3 border-b border-gray-100">
          <div className="flex justify-between">
            <h4 className="text-sm font-medium text-gray-500">
              Detailed Instructions
            </h4>
            <button
              onClick={() => toggleEditing("instructions")}
              className="text-xs text-blue-600 hover:text-blue-500"
            >
              {editing.instructions ? "Done" : "Edit"}
            </button>
          </div>
          {editing.instructions ? (
            <textarea
              name="instructions"
              rows={4}
              value={formData.instructions}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Provide detailed instructions for your paper"
            />
          ) : (
            <p className="text-gray-900 mt-1 whitespace-pre-line">
              {formData.instructions || "Not specified"}
            </p>
          )}
        </div>
        {/* Writer Preference */}
        <div className="pb-3 border-b border-gray-100">
          <div className="flex justify-between">
            <h4 className="text-sm font-medium text-gray-500">
              Writer Preference
            </h4>
            <button
              onClick={() => toggleEditing("writerPreference")}
              className="text-xs text-blue-600 hover:text-blue-500"
            >
              {editing.writerPreference ? "Done" : "Edit"}
            </button>
          </div>
          {editing.writerPreference ? (
            <div className="mt-2 space-y-3">
              {/* All Writers Option */}
              <div className="border border-gray-200 rounded-md p-3 hover:border-blue-200">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="writer-all"
                    name="writerPreference"
                    value="any"
                    checked={formData.writerPreference === "any"}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <label
                    htmlFor="writer-all"
                    className="ml-2 block text-sm font-medium text-gray-900"
                  >
                    Let All Writers Bid
                  </label>
                </div>
                <p className="text-xs text-gray-500 ml-6 mt-1">
                  Your order will be visible to all qualified writers.
                </p>
              </div>
              {/* Invite Writers Option */}
              <div className="border border-gray-200 rounded-md p-3 hover:border-blue-200">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="writer-invited"
                    name="writerPreference"
                    value="preferred"
                    checked={formData.writerPreference === "preferred"}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <label
                    htmlFor="writer-invited"
                    className="ml-2 block text-sm font-medium text-gray-900"
                  >
                    Invite Writers
                  </label>
                </div>
                <p className="text-xs text-gray-500 ml-6 mt-1">
                  Select writers from your favorites or the writers list to invite.
                </p>
              </div>
              {formData.writerPreference === "preferred" && (
                <div className="mt-3 pl-6">
                  <p className="text-sm text-gray-700 mb-2">
                    Manage invited writers:
                  </p>
                  {formData.invitedWriters && formData.invitedWriters.length > 0 ? (
                    <ul className="space-y-1">
                      {formData.invitedWriters.map((writer, idx) => (
                        <li
                          key={writer.id || idx}
                          className="group flex items-center justify-between text-sm bg-gray-50 p-2 rounded"
                        >
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                {writer.name}
                              </span>
                              <span className="flex items-center text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded-full">
                                <Star className="h-3 w-3 mr-1 fill-yellow-500" />
                                {writer.rating}
                              </span>
                            </div>
                            {writer.specialties && writer.specialties.length > 0 && (
                              <span className="text-xs text-gray-500 dark:text-gray-400 block mt-1">
                                {writer.specialties.join(", ")}
                              </span>
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              const updatedWriters = [...formData.invitedWriters];
                              updatedWriters.splice(idx, 1);
                              setSelectedWriterIds((prev) =>
                                prev.filter((id) => id !== writer.id)
                              );
                              handleChange({
                                target: {
                                  name: "invitedWriters",
                                  value: updatedWriters,
                                },
                              });
                            }}
                            className="text-xs text-red-600 hover:text-red-500 ml-2"
                          >
                            Remove
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500">
                      No writers invited yet
                    </p>
                  )}
                  <button
                    type="button"
                    onClick={() => setInviteModalOpen(true)}
                    className="mt-3 px-3 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-colors flex items-center"
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Add or Invite Writers
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="mt-1">
              {formData.writerPreference === "any" && (
                <p className="text-gray-900">All Writers</p>
              )}
              {formData.writerPreference === "preferred" && (
                <div>
                  <p className="text-gray-900 font-medium">Invited Writers</p>
                  {formData.invitedWriters && formData.invitedWriters.length > 0 ? (
                    <ul className="mt-2 space-y-1">
                      {formData.invitedWriters.map((writer, idx) => (
                        <li
                          key={idx}
                          className="text-sm text-gray-700 flex items-center"
                        >
                          <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                          <span>{writer.name || writer}</span>
                          {writer.rating !== undefined && (
                            <span className="flex items-center text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full ml-2">
                              <Star className="h-3 w-3 mr-1 fill-yellow-500" />
                              {writer.rating}
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500 mt-1">
                      No writers invited yet
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
        {/* Files Section */}
        {formData.files.length > 0 && (
          <div className="pt-1">
            <div className="flex justify-between">
              <h4 className="text-sm font-medium text-gray-500">
                Uploaded Files ({formData.files.length})
              </h4>
              <button
                onClick={() => toggleEditing("files")}
                className="text-xs text-blue-600 hover:text-blue-500"
              >
                {editing.files ? "Done" : "Edit"}
              </button>
            </div>
            <ul className="mt-2 space-y-2 bg-gray-50 rounded-md p-2">
              {formData.files.map((file, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between text-sm p-2 hover:bg-gray-100 rounded"
                >
                  <div className="flex-1 flex items-center">
                    <FileText className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-gray-900 truncate">{file.name}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xs text-gray-500 mr-3">
                      {(file.size / 1024).toFixed(1)} KB
                    </span>
                    {editing.files && (
                      <button
                        onClick={() => removeFile(index)}
                        className="text-xs text-red-600 hover:text-red-500"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            {editing.files && (
              <div className="mt-3">
                <label
                  htmlFor="review-file-upload"
                  className="inline-block px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
                >
                  <span>Upload additional files</span>
                  <input
                    id="review-file-upload"
                    name="review-file-upload"
                    type="file"
                    multiple
                    onChange={handleChange}
                    className="sr-only"
                  />
                </label>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}