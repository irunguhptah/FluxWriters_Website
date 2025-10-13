import React, { useState } from "react";
import {
  FileText,
  Star,
  Download,
  MessageSquare,
  ChevronLeft,
  File,
  User,
  Calendar,
  DollarSign,
  Info,
  Paperclip,
  Check,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";

export default function CompletedOrderDetails() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("details");

  // Mock data for completed orders
  const orders = [
    {
      id: "ORD-78947",
      title: "Psychology Literature Review",
      writer: "Dr. Carl Jung",
      completedDate: "2023-06-30",
      price: "$120",
      rating: 5,
      lastUpdated: "1 week ago",
      feedback:
        "Exceptional work! The writer perfectly understood my requirements and delivered ahead of schedule. The analysis was thorough and well-structured.",
    },
    {
      id: "ORD-78946",
      title: "Business Ethics Case Study",
      writer: "Prof. Adam Smith",
      completedDate: "2023-07-15",
      price: "$95",
      rating: 4.5,
      lastUpdated: "1 day ago",
      feedback:
        "Very good quality overall. Needed minor formatting adjustments which the writer quickly addressed. Would recommend.",
    },
  ];

  const order = orders.find((o) => o.id === orderId);

  if (!order) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-8 text-center">
        <FileText className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600" />
        <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">
          Order not found
        </h3>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  const handleDownload = () => {
    toast.success(`Downloading files for order ${order.id}`);
  };

  const handleRequestRevision = () => {
    toast("Requesting revision...", { icon: "✏️" });
  };

  const attachments = [
    { name: "Final_Paper.docx", size: "2.8 MB", date: order.completedDate },
    { name: "Bibliography.pdf", size: "1.2 MB", date: order.completedDate },
    {
      name: "Research_Materials.zip",
      size: "4.5 MB",
      date: order.completedDate,
    },
  ];

  const messages = [
    {
      id: 1,
      sender: order.writer,
      content:
        "I've completed the first draft of your paper. Please review and let me know if you need any changes.",
      timestamp: `${order.completedDate} 10:30`,
      isCustomer: false,
    },
    {
      id: 2,
      sender: "You",
      content:
        "Thanks! I've reviewed it and left some comments in the document.",
      timestamp: `${order.completedDate} 14:15`,
      isCustomer: true,
    },
    {
      id: 3,
      sender: order.writer,
      content:
        "I've incorporated all your feedback. The final version is now ready for download.",
      timestamp: `${order.completedDate} 16:45`,
      isCustomer: false,
    },
  ];

  return (
    <div className="max-w-5xl w-full mx-auto p-6 bg-white dark:bg-gray-900 rounded-xl shadow border border-gray-200 dark:border-gray-800 mt-8">
      <Toaster position="top-right" />

      {/* Header with back button */}
      <div className="border-b border-gray-200 dark:border-gray-800 px-6 py-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {order.title}
            </h2>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-gray-600 dark:text-gray-300">
              <span className="flex items-center gap-1">
                <File className="h-4 w-4" /> #{order.id}
              </span>
              <span className="flex items-center gap-1">
                <User className="h-4 w-4" /> {order.writer}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" /> Completed:{" "}
                {order.completedDate}
              </span>
              <span className="flex items-center gap-1">
                <DollarSign className="h-4 w-4" /> {order.price}
              </span>
              <span className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(order.rating)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300 dark:text-gray-500"
                    }`}
                  />
                ))}
                <span className="ml-1">{order.rating.toFixed(1)}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-500 dark:text-gray-400">Status:</span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300">
            Completed
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-800">
        <nav className="flex -mb-px">
          <button
            onClick={() => setActiveTab("details")}
            className={`px-4 py-3 text-sm font-medium flex items-center gap-2 ${
              activeTab === "details"
                ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            <Info className="h-4 w-4" />
            Order Details
          </button>
          <button
            onClick={() => setActiveTab("messages")}
            className={`px-4 py-3 text-sm font-medium flex items-center gap-2 ${
              activeTab === "messages"
                ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            <MessageSquare className="h-4 w-4" />
            Messages
          </button>
          <button
            onClick={() => setActiveTab("files")}
            className={`px-4 py-3 text-sm font-medium flex items-center gap-2 ${
              activeTab === "files"
                ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            <Paperclip className="h-4 w-4" />
            Files
          </button>
        </nav>
      </div>

      {/* Tab content */}
      <div className="p-6">
        {activeTab === "details" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Order Description
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {order.id === "ORD-78947"
                  ? "A comprehensive literature review on contemporary psychological theories, covering cognitive, behavioral, and humanistic approaches with modern applications."
                  : "An in-depth case study analyzing ethical dilemmas in modern business practices, with real-world examples and recommended solutions."}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Your Feedback
              </h3>
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(order.rating)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300 dark:text-gray-500"
                      }`}
                    />
                  ))}
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {order.rating.toFixed(1)} Rating
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  {order.feedback}
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "messages" && (
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`p-4 rounded-lg ${
                  message.isCustomer
                    ? "bg-blue-50 dark:bg-blue-900/30"
                    : "bg-gray-50 dark:bg-gray-800"
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="font-medium text-gray-900 dark:text-white">
                    {message.sender}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {message.timestamp}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  {message.content}
                </p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "files" && (
          <div className="space-y-4">
            {attachments.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-gray-100 dark:bg-gray-800">
                    <File className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {file.name}
                    </h4>
                    <div className="flex gap-4 text-sm text-gray-500 dark:text-gray-400 mt-1">
                      <span>{file.size}</span>
                      <span>Uploaded: {file.date}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleDownload}
                  className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  title="Download file"
                >
                  <Download className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="border-t border-gray-200 dark:border-gray-800 px-6 py-4 bg-gray-50 dark:bg-gray-800/50">
        <div className="flex flex-wrap gap-3 justify-between">
          <div className="flex gap-3">
            <button
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={() =>
                toast("Opening chat with writer...", { icon: "💬" })
              }
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Message Writer
            </button>
            <button
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={handleDownload}
            >
              <Download className="h-4 w-4 mr-2" />
              Download All Files
            </button>
          </div>
          <div className="flex gap-3">
            <button
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
              onClick={() =>
                toast("Redirecting to review form...", { icon: "⭐" })
              }
            >
              <Star className="h-4 w-4 mr-2" />
              Update Review
            </button>
            <button
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              onClick={handleRequestRevision}
            >
              <Check className="h-4 w-4 mr-2" />
              Request Revision
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
