// components/NewOrder/InviteWritersModal.jsx
import React from "react";
import { X, Users, Star, Search } from "lucide-react";
import { favoriteWriters, allWriters } from "../../pages/client/orders/NewOrder/dummyData";

export default function InviteWritersModal({
  selectedWriters,
  setSelectedWriters,
  setInviteModalOpen,
  handleInviteConfirm,
  formData,
}) {
  const [searchTerm, setSearchTerm] = React.useState("");

  // Ensure selected writers persist when modal opens/closes
  React.useEffect(() => {
    if (formData?.invitedWriters?.length > 0) {
      const prevIds = formData.invitedWriters.map((w) => w.id);
      setSelectedWriters(prevIds);
    }
  }, [formData, setSelectedWriters]);

  const handleWriterSelect = (writerId) => {
    setSelectedWriters((prev) =>
      prev.includes(writerId)
        ? prev.filter((id) => id !== writerId)
        : [...prev, writerId]
    );
  };

  const filteredAllWriters = allWriters.filter((writer) =>
    writer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredFavoriteWriters = favoriteWriters.filter((writer) =>
    writer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl max-w-2xl w-full mx-4 p-6 relative transform transition-all duration-300 scale-95 hover:scale-100">
        <button
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          onClick={() => {
            if (selectedWriters.length === 0) {
              // Optionally set writer preference to 'any' if none selected
              // setWriterPreference && setWriterPreference('any');
            }
            setInviteModalOpen(false);
          }}
          aria-label="Close"
        >
          <X className="h-5 w-5 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300" />
        </button>

        <div className="flex items-center mb-6">
          <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/50 mr-3">
            <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Invite Writers
          </h2>
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search writers..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[60vh] overflow-y-auto">
          {/* Favorite Writers */}
          <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl">
            <h3 className="font-semibold mb-3 text-gray-800 dark:text-gray-100 flex items-center">
              <Star className="h-4 w-4 mr-2 text-yellow-500 fill-yellow-400" />
              Favorite Writers
              <span className="ml-auto text-xs text-gray-500 dark:text-gray-400">
                {filteredFavoriteWriters.length} available
              </span>
            </h3>
            <ul className="space-y-3">
              {filteredFavoriteWriters.length === 0 ? (
                <li className="text-gray-500 dark:text-gray-400 text-sm py-2 text-center">
                  No favorite writers found
                </li>
              ) : (
                filteredFavoriteWriters.map((writer) => (
                  <li key={writer.id} className="group">
                    <div className="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors">
                      <input
                        type="checkbox"
                        id={`fav-writer-${writer.id}`}
                        checked={selectedWriters.includes(writer.id)}
                        onChange={() => handleWriterSelect(writer.id)}
                        className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                      />
                      <label
                        htmlFor={`fav-writer-${writer.id}`}
                        className="flex-1 cursor-pointer ml-3"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {writer.name}
                          </span>
                          <span className="flex items-center text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded-full">
                            <Star className="h-3 w-3 mr-1 fill-yellow-500" />
                            {writer.rating}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400 block mt-1">
                          {writer.specialties && writer.specialties.length > 0
                            ? writer.specialties.join(", ")
                            : "No specialties listed"}
                        </span>
                      </label>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>

          {/* All Writers */}
          <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl">
            <h3 className="font-semibold mb-3 text-gray-800 dark:text-gray-100 flex items-center">
              All Writers
              <span className="ml-auto text-xs text-gray-500 dark:text-gray-400 ml-2">
                {filteredAllWriters.length} available
              </span>
            </h3>
            <ul className="space-y-3">
              {filteredAllWriters.map((writer) => (
                <li key={writer.id} className="group">
                  <div className="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors">
                    <input
                      type="checkbox"
                      id={`all-writer-${writer.id}`}
                      checked={selectedWriters.includes(writer.id)}
                      onChange={() => handleWriterSelect(writer.id)}
                      className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                    />
                    <label
                      htmlFor={`all-writer-${writer.id}`}
                      className="flex-1 cursor-pointer ml-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {writer.name}
                        </span>
                        <span className="flex items-center text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded-full">
                          <Star className="h-3 w-3 mr-1 fill-yellow-500" />
                          {writer.rating}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400 block mt-1">
                        {writer.specialties && writer.specialties.length > 0
                          ? writer.specialties.join(", ")
                          : "No specialties listed"}
                      </span>
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex justify-end mt-6 gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            className="px-5 py-2.5 rounded-lg border border-gray-300 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            onClick={() => setInviteModalOpen(false)}
          >
            Cancel
          </button>
          <button
            className={`px-5 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-colors flex items-center ${
              selectedWriters.length === 0
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            onClick={handleInviteConfirm}
            disabled={selectedWriters.length === 0}
          >
            <Users className="h-4 w-4 mr-2" />
            Invite ({selectedWriters.length} writer
            {selectedWriters.length === 1 ? "" : "s"} selected)
          </button>
        </div>
      </div>
    </div>
  );
}
