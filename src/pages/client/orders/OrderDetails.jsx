import React, { useState } from "react";
import {
  Clock,
  AlertCircle,
  CheckCircle,
  FileText,
  MessageSquare,
  Download,
  Zap,
  ChevronLeft,
  File,
  User,
  Calendar,
  DollarSign,
  Info,
  Paperclip,
  Star,
  Check,
  X,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";

export default function OrderDetails() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  // State hooks must be here, before any return or if
  const [activeTab, setActiveTab] = useState("details");
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);

  // Mock data (replace with real fetch in production)
  const orders = [
    {
      id: "ORD-78945",
      title: "Machine Learning Research Paper",
      writer: "Dr. Alan Turing",
      dueDate: "2023-07-20",
      progress: 45,
      price: "$150",
      lastUpdated: "2 hours ago",
      isUrgent: false,
    },
    {
      id: "ORD-78948",
      title: "Blockchain in Finance",
      writer: "Dr. Satoshi Nakamoto",
      dueDate: "2023-07-25",
      progress: 30,
      price: "$180",
      lastUpdated: "5 hours ago",
      isUrgent: true,
    },
  ];

  const order = orders.find((o) => o.id === orderId);

  if (!order) {
    return <div>Order not found</div>;
  }

  const handleBack = () => {
    navigate(-1);
  };

  const handleDownload = () => {
    toast.success(`Downloading files for order ${order.id}`);
  };

  const handleCompleteOrder = () => {
    setIsCompleteModalOpen(true);
  };

  const submitFeedback = () => {
    toast.success("Thank you for your feedback! Order marked as complete.");
    setIsCompleteModalOpen(false);
    // In a real app, you would send this data to your backend
  };

  const attachments = [
    { name: "Research_Outline.docx", size: "2.4 MB", date: "2023-07-10" },
    { name: "Initial_Draft.pdf", size: "1.8 MB", date: "2023-07-15" },
  ];

  const messages = [
    {
      id: 1,
      sender: "Dr. Alan Turing",
      content:
        "I have some questions about the research methodology section. Could you provide more details?",
      timestamp: "2023-07-12 14:30",
      isCustomer: false,
    },
    {
      id: 2,
      sender: "You",
      content: "Sure, I'll send over the methodology details by tomorrow.",
      timestamp: "2023-07-12 15:45",
      isCustomer: true,
    },
  ];

  return (
    <div className="max-w-5xl w-full mx-auto p-6 bg-white dark:bg-gray-900 rounded-xl shadow border border-gray-200 dark:border-gray-800 mt-8">
      <Toaster position="top-right" />
      {/* Header with back button */}
      <div className="border-b border-gray-200 dark:border-gray-800 px-6 py-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <div className="flex items-center gap-4">
          <button
            onClick={handleBack}
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
                <Calendar className="h-4 w-4" /> Due: {order.dueDate}
              </span>
              <span className="flex items-center gap-1">
                <DollarSign className="h-4 w-4" /> {order.price}
              </span>
              {order.isUrgent && (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300">
                  Urgent
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Progress and status */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="w-full max-w-md">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-1">
              <span>Progress</span>
              <span>{order.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
              <div
                className={`h-full rounded-full ${
                  order.progress < 50
                    ? "bg-yellow-400 dark:bg-yellow-500"
                    : order.progress < 80
                    ? "bg-blue-400 dark:bg-blue-500"
                    : "bg-green-500 dark:bg-green-600"
                }`}
                style={{ width: `${order.progress}%` }}
              ></div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500 dark:text-gray-400">Status:</span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300">
              In Progress
            </span>
          </div>
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
                This is a comprehensive research paper on machine learning
                algorithms and their applications in modern technology. The
                paper should cover supervised and unsupervised learning
                techniques with case studies.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Requirements
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Minimum 10 pages (excluding references)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>APA formatting style</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>At least 15 academic references</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Plagiarism-free with report</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Timeline
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-1">
                      <span>Order placed</span>
                      <span>2023-07-05</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
                      <div
                        className="h-full rounded-full bg-green-500"
                        style={{ width: "100%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-1">
                      <span>First draft</span>
                      <span>2023-07-15</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
                      <div
                        className="h-full rounded-full bg-green-500"
                        style={{ width: "100%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-1">
                      <span>Final delivery</span>
                      <span>2023-07-20</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
                      <div
                        className="h-full rounded-full bg-blue-500"
                        style={{ width: `${order.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "messages" && (
          <div className="space-y-6">
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

            <div className="border-t border-gray-200 dark:border-gray-800 pt-4">
              <form className="space-y-4">
                <div>
                  <label htmlFor="message" className="sr-only">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder="Type your message here..."
                    defaultValue={""}
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {activeTab === "files" && (
          <div className="space-y-6">
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

            <div className="border-t border-gray-200 dark:border-gray-800 pt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Upload Files
                </h3>
                <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Upload
                </button>
              </div>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Upload any additional files or materials for the writer.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="border-t border-gray-200 dark:border-gray-800 px-6 py-4 bg-gray-50 dark:bg-gray-800/50">
        <div className="flex flex-wrap gap-3 justify-between">
          <div className="flex gap-3">
            <button
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={() => toast("Opening chat with writer...")}
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Message Writer
            </button>
            <button
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={handleDownload}
            >
              <Download className="h-4 w-4 mr-2" />
              Download All Files
            </button>
          </div>
          <button
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            onClick={handleCompleteOrder}
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Complete Order
          </button>
        </div>
      </div>

      {/* Complete Order Modal */}
      {isCompleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Complete Order #{order.id}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Please rate your experience and provide feedback about the
              writer's work.
            </p>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Rating
              </label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className={`p-2 rounded-full ${
                      rating >= star
                        ? "text-yellow-400"
                        : "text-gray-300 dark:text-gray-500"
                    }`}
                  >
                    <Star className="h-5 w-5 fill-current" />
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label
                htmlFor="feedback"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Feedback
              </label>
              <textarea
                id="feedback"
                rows={4}
                className="block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                placeholder="How was your experience with this order?"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsCompleteModalOpen(false)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </button>
              <button
                onClick={submitFeedback}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Submit & Complete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Updated InProgressOrders component to handle the view order click
export function InProgressOrders() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const orders = [
    {
      id: "ORD-78945",
      title: "Machine Learning Research Paper",
      writer: "Dr. Alan Turing",
      dueDate: "2023-07-20",
      progress: 45,
      price: "$150",
      lastUpdated: "2 hours ago",
      isUrgent: false,
    },
    {
      id: "ORD-78948",
      title: "Blockchain in Finance",
      writer: "Dr. Satoshi Nakamoto",
      dueDate: "2023-07-25",
      progress: 30,
      price: "$180",
      lastUpdated: "5 hours ago",
      isUrgent: true,
    },
  ];

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
  };

  if (selectedOrder) {
    return (
      <OrderDetails
        order={selectedOrder}
        onBack={() => setSelectedOrder(null)}
      />
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
      <Toaster position="top-right" />
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-800 px-6 py-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Clock className="text-blue-500 h-5 w-5" />
            In Progress Orders
          </h2>
          <span
            className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 text-sm font-medium"
            title="Number of active orders"
          >
            {orders.length} Active
          </span>
        </div>
        <p className="mt-2 text-sm text-blue-700 dark:text-blue-300 flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-blue-400 dark:text-blue-300" />
          All your draft orders are listed here. Click to continue, edit, or
          delete.
        </p>
      </div>

      {/* Orders List */}
      <div className="divide-y divide-gray-200 dark:divide-gray-800">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div
              key={order.id}
              className="p-6 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Order Info */}
                <div className="flex items-start gap-4">
                  <div
                    className={`p-3 rounded-full flex-shrink-0 ${
                      order.isUrgent
                        ? "bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 animate-pulse"
                        : "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300"
                    }`}
                    title={
                      order.isUrgent ? "Urgent order" : "In progress order"
                    }
                  >
                    {order.isUrgent ? (
                      <Zap className="h-5 w-5" />
                    ) : (
                      <Clock className="h-5 w-5" />
                    )}
                  </div>

                  <div>
                    <h3
                      className="text-lg font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors"
                      title="Order title"
                    >
                      {order.title}
                    </h3>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-gray-600 dark:text-gray-300">
                      <span title="Order ID">#{order.id}</span>
                      <span title="Writer assigned">
                        Writer: {order.writer}
                      </span>
                      <span title="Due date">Due: {order.dueDate}</span>
                      {order.isUrgent && (
                        <span
                          className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300"
                          title="Urgent order"
                        >
                          Urgent
                        </span>
                      )}
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-3 w-full max-w-xs">
                      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-1">
                        <span title="Order progress">Progress</span>
                        <span title="Order progress">{order.progress}%</span>
                      </div>
                      <div
                        className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2"
                        title="Order progress bar"
                      >
                        <div
                          className={`h-full rounded-full ${
                            order.progress < 50
                              ? "bg-yellow-400 dark:bg-yellow-500"
                              : order.progress < 80
                              ? "bg-blue-400 dark:bg-blue-500"
                              : "bg-green-500 dark:bg-green-600"
                          }`}
                          style={{ width: `${order.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col items-end gap-2">
                  <span
                    className="text-lg font-bold text-gray-900 dark:text-white"
                    title="Order price"
                  >
                    {order.price}
                  </span>
                  <div className="flex gap-2">
                    <button
                      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                      title="Chat with writer"
                      onClick={() => toast("Opening chat...")}
                    >
                      <MessageSquare className="h-5 w-5" />
                    </button>
                    <button
                      className="px-3 py-1 rounded-lg bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors text-sm font-medium"
                      title="View order details"
                      onClick={() => handleViewOrder(order)}
                    >
                      View Order
                    </button>
                    <button
                      className="px-3 py-1 rounded-lg bg-green-600 dark:bg-green-700 text-white hover:bg-green-700 dark:hover:bg-green-800 transition-colors text-sm font-medium"
                      title="Mark order as complete"
                      onClick={() => toast.success("Order marked as complete!")}
                    >
                      Complete Order
                    </button>
                  </div>
                  <span
                    className="text-xs text-gray-500 dark:text-gray-400"
                    title="Last updated"
                  >
                    Updated {order.lastUpdated}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center">
            <FileText className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600" />
            <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">
              No active orders
            </h3>
            <p className="mt-1 text-gray-500 dark:text-gray-300">
              All your orders are completed or pending
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
