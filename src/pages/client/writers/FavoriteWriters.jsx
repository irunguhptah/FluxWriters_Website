import { Star, Award, MessageSquare } from "lucide-react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom"; // <-- Add this import

export default function FavoriteWriters() {
  const navigate = useNavigate(); // <-- Add this line

  // Sample favorite writers data
  const [favoriteWriters, setFavoriteWriters] = useState([
    {
      id: "WR-001",
      name: "Dr. Emily Carter",
      specialization: "Computer Science",
      rating: 4.9,
      lastHired: "2023-06-15",
      projectsCompleted: 5,
      isAvailable: true,
    },
    {
      id: "WR-003",
      name: "Dr. Sarah Lin",
      specialization: "Psychology",
      rating: 5.0,
      lastHired: "2023-05-22",
      projectsCompleted: 3,
      isAvailable: false,
    },
  ]);

  const removeFromFavorites = (writerId) => {
    setFavoriteWriters(
      favoriteWriters.filter((writer) => writer.id !== writerId)
    );
    toast.success("Writer removed from favorites");
  };

  const handleMessage = (writer) => {
    if (writer.isAvailable) {
      toast.success(`Opening chat with ${writer.name}`, { icon: "💬" });
    } else {
      toast.error(`${writer.name} is currently unavailable for messaging`);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
      <Toaster position="top-right" />
      <div className="border-b border-gray-200 dark:border-gray-800 px-6 py-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Star className="text-yellow-400 fill-yellow-400 h-5 w-5" />
          Favorite Writers
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-300">
          Your most trusted academic partners.
          <span
            className="ml-1 text-blue-600 dark:text-blue-400"
            title="Writers you have starred from the All Writers page."
          >
            What is this?
          </span>
        </p>
      </div>

      {favoriteWriters.length > 0 ? (
        <div className="divide-y divide-gray-200 dark:divide-gray-800">
          {favoriteWriters.map((writer) => (
            <div
              key={writer.id}
              className="p-6 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div
                    className="relative cursor-pointer"
                    onClick={() =>
                      navigate(`/dashboard/writers/all/${writer.id}`)
                    }
                    title={`View details for ${writer.name}`}
                  >
                    <div
                      className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-300 to-blue-300 dark:from-purple-900 dark:to-blue-900 flex items-center justify-center text-white font-bold"
                      title="Writer initials"
                    >
                      {writer.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <Award
                      className="absolute -top-2 -right-2 h-5 w-5 text-yellow-400 fill-yellow-400"
                      title="Top Rated Writer"
                    />
                  </div>

                  <div>
                    <h3
                      className="text-lg font-medium text-gray-900 dark:text-white cursor-pointer hover:underline"
                      onClick={() =>
                        navigate(`/dashboard/writers/all/${writer.id}`)
                      }
                      title={`View details for ${writer.name}`}
                    >
                      {writer.name}
                      {!writer.isAvailable && (
                        <span className="ml-2 text-xs font-normal text-gray-500 dark:text-gray-400">
                          (Currently unavailable)
                        </span>
                      )}
                    </h3>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-gray-600 dark:text-gray-300">
                      <span title="Specialization">
                        {writer.specialization}
                      </span>
                      <span
                        className="flex items-center"
                        title="Average client rating"
                      >
                        <Star className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400 mr-0.5" />
                        {writer.rating}
                      </span>
                      <span title="Projects completed with you">
                        {writer.projectsCompleted} projects with you
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 ${
                      writer.isAvailable
                        ? "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                    }`}
                    disabled={!writer.isAvailable}
                    onClick={() => handleMessage(writer)}
                    title={
                      writer.isAvailable
                        ? "Start a conversation with this writer"
                        : "Writer is currently unavailable"
                    }
                  >
                    <MessageSquare className="h-4 w-4" />
                    Message
                  </button>
                  <button
                    onClick={() => removeFromFavorites(writer.id)}
                    className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center gap-2"
                    title="Remove from favorites"
                  >
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-8 text-center">
          <Star className="mx-auto h-12 w-12 text-gray-300 fill-gray-100 dark:text-gray-700 dark:fill-gray-900" />
          <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">
            No favorite writers yet
          </h3>
          <p className="mt-1 text-gray-500 dark:text-gray-300">
            Star writers from the All Writers page to save them here
          </p>
        </div>
      )}
    </div>
  );
}
