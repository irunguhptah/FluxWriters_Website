import { useState } from "react";
import {
  Star,
  Award,
  BookOpen,
  MessageSquare,
  Clock,
  CheckCircle,
  Info,
  Heart,
  ChevronLeft,
  FileText,
  Shield,
  Zap,
  TrendingUp,
  Percent,
  Calendar,
  Bookmark,
  ClipboardCheck,
  Languages,
  BadgeCheck,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";

export default function WriterProfile() {
  // eslint-disable-next-line no-unused-vars
  const { writerId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [isFavorite, setIsFavorite] = useState(false);

  // Sample writer data
  const writer = {
    id: "WR-001",
    name: "Dr. Emily Carter",
    title: "Senior Computer Science Writer",
    specialization: "Artificial Intelligence & Machine Learning",
    rating: 4.9,
    reviews: 87,
    ordersCompleted: 128,
    responseRate: "98%",
    responseTime: "2 hours",
    bio: "PhD in Computer Science with specialization in AI from Stanford University. 10+ years of academic writing experience with expertise in machine learning research papers, technical documentation, and thesis writing. Published author in top-tier AI conferences.",
    isAvailable: true,
    isTopWriter: true,
    isVerified: true,
    joinDate: "Jan 2018",
    lastActive: "2 hours ago",
    skills: [
      "Machine Learning",
      "Neural Networks",
      "Python",
      "Research Papers",
      "Technical Writing",
      "Thesis Guidance",
    ],
    education: [
      {
        degree: "PhD in Computer Science",
        institution: "Stanford University",
        year: "2015",
      },
      {
        degree: "MSc in Artificial Intelligence",
        institution: "MIT",
        year: "2011",
      },
    ],
    samples: [
      {
        title: "Transformers in NLP: A Comprehensive Review",
        pages: 12,
        rating: 5.0,
      },
      {
        title: "Ethical Implications of Deep Learning",
        pages: 8,
        rating: 4.8,
      },
    ],
    reviewsList: [
      {
        client: "Michael R.",
        rating: 5,
        date: "2 weeks ago",
        comment:
          "Emily delivered an exceptional research paper that exceeded my expectations. Her depth of knowledge in AI is remarkable.",
      },
      {
        client: "Sarah K.",
        rating: 4.5,
        date: "1 month ago",
        comment:
          "Very thorough work with excellent references. Needed minor formatting adjustments but overall excellent.",
      },
    ],
    stats: {
      onTimeDelivery: "99%",
      revisionRate: "5%",
      repeatClients: "72%",
    },
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast.success(
      !isFavorite ? "Added to your favorite writers" : "Removed from favorites"
    );
  };

  const handleHire = () => {
    toast.success(`Hiring request sent to ${writer.name}`, {
      icon: "📝",
      duration: 4000,
    });
  };

  const handleMessage = () => {
    toast("Opening chat with writer...", { icon: "💬" });
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
      <Toaster position="top-right" />

      {/* Header with back button */}
      <div className="border-b border-gray-200 dark:border-gray-800 px-6 py-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Writer Profile
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              Detailed information about this expert writer
            </p>
          </div>
        </div>
      </div>

      {/* Writer Header Section */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-800">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Writer Avatar */}
          <div className="relative">
            <div className="h-24 w-24 rounded-full bg-gradient-to-r from-green-300 to-blue-300 dark:from-green-900 dark:to-blue-900 flex items-center justify-center text-white font-bold text-3xl">
              {writer.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            {writer.isAvailable ? (
              <div
                className="absolute bottom-0 right-0 bg-green-500 rounded-full p-1.5"
                title="Available Now"
              >
                <div className="h-3 w-3 rounded-full bg-white"></div>
              </div>
            ) : (
              <div
                className="absolute bottom-0 right-0 bg-gray-400 rounded-full p-1.5"
                title="Currently Unavailable"
              >
                <div className="h-3 w-3 rounded-full bg-white"></div>
              </div>
            )}
          </div>

          {/* Writer Info */}
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  {writer.name}
                  {writer.isVerified && (
                    <BadgeCheck
                      className="h-5 w-5 text-blue-500"
                      title="Verified Writer"
                    />
                  )}
                  {writer.isTopWriter && (
                    <Award
                      className="h-5 w-5 text-yellow-500"
                      title="Top Rated Writer"
                    />
                  )}
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  {writer.title}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={toggleFavorite}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  title={
                    isFavorite ? "Remove from favorites" : "Add to favorites"
                  }
                >
                  <Heart
                    className={`h-5 w-5 ${
                      isFavorite
                        ? "fill-red-500 text-red-500"
                        : "text-gray-400 dark:text-gray-500"
                    }`}
                  />
                </button>
                <button
                  onClick={handleMessage}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors text-sm font-medium flex items-center gap-1"
                >
                  <MessageSquare className="h-4 w-4" />
                  Message
                </button>
                <button
                  onClick={handleHire}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-green-400 to-blue-400 text-white hover:from-green-500 hover:to-blue-500 transition-colors text-sm font-medium flex items-center gap-1"
                >
                  <CheckCircle className="h-4 w-4" />
                  Hire Now
                </button>
              </div>
            </div>

            {/* Stats Bar */}
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <span className="font-medium">{writer.rating}</span>
                  <span className="text-gray-500 dark:text-gray-400 text-sm">
                    ({writer.reviews} reviews)
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Average Rating
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                <div className="flex items-center gap-2">
                  <ClipboardCheck className="h-4 w-4 text-green-500" />
                  <span className="font-medium">{writer.ordersCompleted}+</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Orders Completed
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-500" />
                  <span className="font-medium">{writer.responseTime}</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Avg. Response Time
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                <div className="flex items-center gap-2">
                  <Percent className="h-4 w-4 text-purple-500" />
                  <span className="font-medium">{writer.responseRate}</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Response Rate
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-800">
        <nav className="flex -mb-px">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-3 text-sm font-medium flex items-center gap-2 ${
              activeTab === "overview"
                ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            <Info className="h-4 w-4" />
            Overview
          </button>
          <button
            onClick={() => setActiveTab("samples")}
            className={`px-4 py-3 text-sm font-medium flex items-center gap-2 ${
              activeTab === "samples"
                ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            <FileText className="h-4 w-4" />
            Work Samples
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`px-4 py-3 text-sm font-medium flex items-center gap-2 ${
              activeTab === "reviews"
                ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            <Star className="h-4 w-4" />
            Reviews ({writer.reviews})
          </button>
          <button
            onClick={() => setActiveTab("stats")}
            className={`px-4 py-3 text-sm font-medium flex items-center gap-2 ${
              activeTab === "stats"
                ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            <TrendingUp className="h-4 w-4" />
            Performance Stats
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                About {writer.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{writer.bio}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Education
                </h3>
                <div className="space-y-4">
                  {writer.education.map((edu, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">
                        <BookOpen className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {edu.degree}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {edu.institution} ({edu.year})
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Areas of Expertise
                </h3>
                <div className="flex flex-wrap gap-2">
                  {writer.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <h3 className="text-lg font-medium text-gray-900 dark:text-white mt-4 mb-2">
                  Writer Details
                </h3>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    <span>Member since {writer.joinDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    <span>Last active: {writer.lastActive}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Languages className="h-4 w-4" />
                    <span>Fluent in English, Spanish</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "samples" && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Work Samples
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Below are some examples of {writer.name}'s previous work (titles
              only for privacy):
            </p>

            <div className="space-y-4">
              {writer.samples.map((sample, index) => (
                <div
                  key={index}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {sample.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          {sample.rating} rating
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          • {sample.pages} pages
                        </span>
                      </div>
                    </div>
                    <button className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
                      Request Sample
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-blue-500 dark:text-blue-300 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Full samples are available upon request to protect client
                    confidentiality. You can request specific samples related to
                    your project when you hire {writer.name}.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Client Reviews
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  What {writer.name}'s clients say about their work
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                <span className="text-xl font-bold">{writer.rating}</span>
                <span className="text-gray-500 dark:text-gray-400">
                  ({writer.reviews} reviews)
                </span>
              </div>
            </div>

            <div className="space-y-4">
              {writer.reviewsList.map((review, index) => (
                <div
                  key={index}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {review.client}
                      </h4>
                      <div className="flex items-center gap-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(review.rating)
                                ? "text-yellow-500 fill-yellow-500"
                                : "text-gray-300 dark:text-gray-600"
                            }`}
                          />
                        ))}
                        <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                          {review.date}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>

            <button className="w-full py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              Load More Reviews
            </button>
          </div>
        )}

        {activeTab === "stats" && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Performance Statistics
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      On-Time Delivery
                    </h4>
                    <p className="text-2xl font-bold">
                      {writer.stats.onTimeDelivery}
                    </p>
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                  Orders delivered by deadline
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      Revision Rate
                    </h4>
                    <p className="text-2xl font-bold">
                      {writer.stats.revisionRate}
                    </p>
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                  Requests for revisions
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300">
                    <Bookmark className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      Repeat Clients
                    </h4>
                    <p className="text-2xl font-bold">
                      {writer.stats.repeatClients}
                    </p>
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                  Clients who order again
                </p>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                Activity Timeline
              </h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-1.5 rounded-full bg-blue-100 dark:bg-blue-900 mt-1">
                    <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-300" />
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900 dark:text-white">
                      Most Active Days
                    </h5>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Monday, Wednesday, Friday (typically responds within 2
                      hours)
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-1.5 rounded-full bg-green-100 dark:bg-green-900 mt-1">
                    <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-300" />
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900 dark:text-white">
                      Performance Trend
                    </h5>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Ratings have improved from 4.7 to 4.9 over the last 6
                      months
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Call to Action */}
      <div className="border-t border-gray-200 dark:border-gray-800 px-6 py-4 bg-gray-50 dark:bg-gray-800/50">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Ready to work with {writer.name}?
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {writer.isAvailable
                ? "Available now for new projects"
                : "Currently working on other projects - message to check availability"}
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleMessage}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Message Writer
            </button>
            <button
              onClick={handleHire}
              className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Hire Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
