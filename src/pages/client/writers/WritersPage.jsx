import { useState } from "react";
import {
  Search,
  Filter,
  Star,
  Award,
  BookOpen,
  MessageSquare,
  Clock,
  CheckCircle,
  Info,
  Heart,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function WritersPage({ isChatOpen = false }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  // Sample writers data
  const writers = [
    {
      id: "WR-001",
      name: "Dr. Emily Carter",
      specialization: "Computer Science",
      rating: 4.9,
      ordersCompleted: 128,
      responseTime: "2 hours",
      bio: "PhD in AI with 10+ years of academic writing experience.",
      isAvailable: true,
      isTopWriter: true,
    },
    {
      id: "WR-002",
      name: "Prof. James Wilson",
      specialization: "Business & Economics",
      rating: 4.7,
      ordersCompleted: 95,
      responseTime: "4 hours",
      bio: "MBA graduate specializing in case studies and market analysis.",
      isAvailable: true,
      isTopWriter: false,
    },
    {
      id: "WR-003",
      name: "Dr. Sarah Lin",
      specialization: "Psychology",
      rating: 5.0,
      ordersCompleted: 210,
      responseTime: "1 hour",
      bio: "Clinical psychologist with expertise in research papers and thesis writing.",
      isAvailable: false,
      isTopWriter: true,
    },
    {
      id: "WR-004",
      name: "Dr. Michael Stone",
      specialization: "Engineering",
      rating: 4.8,
      ordersCompleted: 76,
      responseTime: "3 hours",
      bio: "Mechanical engineer with a passion for technical writing.",
      isAvailable: true,
      isTopWriter: false,
    },
  ];

  const toggleFavorite = (writerId) => {
    if (favorites.includes(writerId)) {
      setFavorites(favorites.filter((id) => id !== writerId));
      toast.success("Writer removed from favorites");
    } else {
      setFavorites([...favorites, writerId]);
      toast.success("Writer added to favorites");
    }
  };

  const handleHire = (writer) => {
    toast.success(`${writer.name} has been selected for your order`, {
      duration: 4000,
      icon: "✅",
    });
  };

  const handleMessage = (writer) => {
    toast.success(`Opening chat with ${writer.name}`, {
      icon: "💬",
    });
  };

  const filteredWriters = writers.filter((writer) => {
    const matchesSearch =
      writer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      writer.specialization.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeFilter === "all") return matchesSearch;
    if (activeFilter === "available")
      return writer.isAvailable && matchesSearch;
    if (activeFilter === "top") return writer.isTopWriter && matchesSearch;
    return true;
  });

  return (
    <div
      className={`bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden transition-all duration-300 ${
        isChatOpen ? "md:mr-80" : ""
      }`}
    >
      <Toaster position="top-right" />

      {/* Info banner */}
      <div className="bg-blue-50 dark:bg-blue-950 border-b border-blue-100 dark:border-blue-800 p-4 flex items-start gap-3">
        <Info className="h-5 w-5 text-blue-500 dark:text-blue-300 flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="font-medium text-blue-700 dark:text-blue-300">
            How to choose writers
          </h3>
          <p className="text-sm text-blue-600 dark:text-blue-200">
            Browse our expert writers, filter by availability or rating, and
            choose the best match for your project. Add writers to your
            favorites for quick access to them later.
          </p>
        </div>
      </div>

      {/* Header with search & filters */}
      <div className="border-b border-gray-200 dark:border-gray-800 px-6 py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Our Expert Writers
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-300">
            Connect with highly qualified professionals for your academic needs.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          {/* Search Bar */}
          <div
            className="relative flex-grow"
            title="Search for writers by name or area of expertise"
          >
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400 dark:text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search by name or specialization..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search writers"
            />
          </div>

          {/* Filter Dropdown with label */}
          <div
            className="relative"
            title="Filter writers by availability or rating"
          >
            <label htmlFor="writer-filter" className="sr-only">
              Filter writers
            </label>
            <select
              id="writer-filter"
              className="appearance-none block w-full pl-3 pr-10 py-2 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:text-white"
              value={activeFilter}
              onChange={(e) => {
                setActiveFilter(e.target.value);
                toast.info(
                  `Filtered to show ${
                    e.target.options[e.target.selectedIndex].text
                  }`
                );
              }}
            >
              <option value="all">All Writers</option>
              <option value="available">Available Now</option>
              <option value="top">Top Rated</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <Filter className="h-5 w-5 text-gray-400 dark:text-gray-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {writers.length}+
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Total Writers
            </p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              {writers.filter((w) => w.isTopWriter).length}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Top Rated
            </p>
          </div>
          <div>
            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {writers.filter((w) => w.isAvailable).length}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Available Now
            </p>
          </div>
          <div>
            <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
              4.8
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Avg. Rating
            </p>
          </div>
        </div>
      </div>

      {/* Writers Grid - Updated for responsiveness */}
      <div
        className={`p-6 w-full transition-all duration-300 ${
          isChatOpen ? "md:pr-0" : ""
        }`}
      >
        <div
          className={`grid gap-6 ${
            isChatOpen
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3"
              : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {filteredWriters.length > 0 ? (
            filteredWriters.map((writer) => (
              <div
                key={writer.id}
                className={`border rounded-xl shadow-sm overflow-hidden transition-all hover:shadow-md ${
                  writer.isAvailable
                    ? "border-gray-200 dark:border-gray-700"
                    : "border-gray-100 dark:border-gray-800 opacity-80"
                }`}
              >
                {/* Writer Header */}
                <div
                  className={`p-4 flex items-center gap-4 ${
                    writer.isTopWriter
                      ? "bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950"
                      : "bg-white dark:bg-gray-900"
                  }`}
                >
                  <div
                    className="relative cursor-pointer"
                    onClick={() =>
                      navigate(`/dashboard/writers/all/${writer.id}`)
                    }
                    title={`View details for ${writer.name}`}
                    style={{ minWidth: 56 }}
                  >
                    <div className="h-14 w-14 rounded-full bg-gradient-to-r from-green-300 to-blue-300 dark:from-green-900 dark:to-blue-900 flex items-center justify-center text-white font-bold text-xl">
                      {writer.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    {writer.isTopWriter && (
                      <div
                        className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-1"
                        title="Top Rated Writer"
                      >
                        <Award className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <h3
                      className="font-bold text-gray-900 dark:text-white flex items-center gap-1 cursor-pointer hover:underline"
                      onClick={() =>
                        navigate(`/dashboard/writers/all/${writer.id}`)
                      }
                      title={`View details for ${writer.name}`}
                    >
                      {writer.name}
                      {!writer.isAvailable && (
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          (Unavailable)
                        </span>
                      )}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {writer.specialization}
                    </p>
                  </div>

                  <button
                    onClick={() => toggleFavorite(writer.id)}
                    className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                    title={
                      favorites.includes(writer.id)
                        ? "Remove from favorites"
                        : "Add to favorites"
                    }
                  >
                    <Heart
                      className={`h-5 w-5 ${
                        favorites.includes(writer.id)
                          ? "fill-red-500 text-red-500"
                          : "text-gray-400 dark:text-gray-500"
                      }`}
                    />
                  </button>
                </div>

                {/* Writer Stats with labels */}
                <div className="p-4 border-t border-gray-100 dark:border-gray-800">
                  <div className="flex justify-between text-sm mb-3">
                    <span className="text-gray-500 dark:text-gray-400">
                      Rating
                    </span>
                    <div
                      className="flex items-center"
                      title="Writer's average rating from clients"
                    >
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <span className="ml-1 font-medium">{writer.rating}</span>
                    </div>
                  </div>

                  <div className="flex justify-between text-sm mb-3">
                    <span className="text-gray-500 dark:text-gray-400">
                      Completed Orders
                    </span>
                    <span
                      className="font-medium"
                      title="Number of successfully completed orders"
                    >
                      {writer.ordersCompleted}+
                    </span>
                  </div>

                  <div className="flex justify-between text-sm mb-3">
                    <span className="text-gray-500 dark:text-gray-400">
                      Avg. Response Time
                    </span>
                    <span
                      className="font-medium flex items-center"
                      title="Average time to respond to messages"
                    >
                      <Clock className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-1" />
                      {writer.responseTime}
                    </span>
                  </div>

                  <div className="text-sm text-gray-500 dark:text-gray-300 mb-4">
                    <p className="line-clamp-2">{writer.bio}</p>
                  </div>

                  {/* Action Buttons with tooltips */}
                  <div className="flex gap-2">
                    <button
                      className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium flex items-center justify-center gap-1 ${
                        writer.isAvailable
                          ? "bg-blue-600 text-white hover:bg-blue-700"
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
                      className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium flex items-center justify-center gap-1 ${
                        writer.isAvailable
                          ? "bg-gradient-to-r from-green-400 to-blue-400 text-white hover:from-green-500 hover:to-blue-500"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                      }`}
                      disabled={!writer.isAvailable}
                      onClick={() => handleHire(writer)}
                      title={
                        writer.isAvailable
                          ? "Hire this writer for your project"
                          : "Writer is currently unavailable"
                      }
                    >
                      <CheckCircle className="h-4 w-4" />
                      Hire
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full p-8 text-center">
              <BookOpen className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600" />
              <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">
                No writers found
              </h3>
              <p className="mt-1 text-gray-500 dark:text-gray-300">
                {searchQuery
                  ? "Try a different search term"
                  : "Adjust filters to see more writers"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}