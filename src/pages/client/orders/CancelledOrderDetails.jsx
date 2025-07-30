import React, { useState } from "react";
import {
  XCircle,
  FileText,
  RotateCcw,
  DollarSign,
  MessageSquare,
  ChevronLeft,
  File,
  User,
  Calendar,
  Info,
  Paperclip,
  AlertTriangle,
  Clock,
  CheckCircle,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";

function CancelledOrderDetails() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("details");

  // Mock data for cancelled orders
  const orders = [
    {
      id: "ORD-78949",
      title: "Political Science Essay",
      writer: "Prof. Noam Chomsky",
      cancelledDate: "2023-06-10",
      price: "$75",
      refundStatus: "Processed",
      refundAmount: "$75",
      refundDate: "2023-06-12",
      cancellationReason: "Changed my research topic",
      lastUpdated: "2 weeks ago",
    },
    {
      id: "ORD-78950",
      title: "Environmental Science Report",
      writer: "Dr. Jane Goodall",
      cancelledDate: "2023-07-05",
      price: "$110",
      refundStatus: "Pending",
      refundAmount: "$110",
      refundDate: "Processing",
      cancellationReason: "Writer was unresponsive",
      lastUpdated: "3 days ago",
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

  const handleReorder = () => {
    toast.success(
      "Reorder started! You can now place a new order with the same details."
    );
  };

  const handleDownload = () => {
    toast("No files available for download - order was cancelled", {
      icon: "⚠️",
    });
  };

  const attachments =
    order.refundStatus === "Processed"
      ? []
      : [
          {
            name: "Partial_Draft.docx",
            size: "1.2 MB",
            date: order.cancelledDate,
          },
        ];

  const messages = [
    {
      id: 1,
      sender: order.writer,
      content:
        "I've started researching your topic. Could you clarify the required length?",
      timestamp: `${order.cancelledDate} 09:30`,
      isCustomer: false,
    },
    {
      id: 2,
      sender: "You",
      content:
        "Actually, I need to cancel this order as my research topic has changed.",
      timestamp: `${order.cancelledDate} 11:45`,
      isCustomer: true,
    },
    {
      id: 3,
      sender: "Support Team",
      content: `Your cancellation request has been processed. Refund ${order.refundStatus.toLowerCase()}.`,
      timestamp: `${order.refundDate} 14:20`,
      isCustomer: false,
    },
  ];

  return (
    <div className="max-w-5xl w-full mx-auto p-6 bg-white dark:bg-gray-900 rounded-xl shadow border border-gray-200 dark:border-gray-800 mt-8">
      <Toaster position="top-right" />

      {/* Header with back button */}
      <div className="border-b border-gray-200 dark:border-gray-800 px-6 py-4 bg-gradient-to-r from-red-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
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
                <Calendar className="h-4 w-4" /> Cancelled:{" "}
                {order.cancelledDate}
              </span>
              <span className="flex items-center gap-1 line-through">
                <DollarSign className="h-4 w-4" /> {order.price}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500 dark:text-gray-400">Status:</span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300">
              Cancelled
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500 dark:text-gray-400">Refund:</span>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                order.refundStatus === "Processed"
                  ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300"
                  : "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300"
              }`}
            >
              {order.refundStatus}
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
          {attachments.length > 0 && (
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
          )}
        </nav>
      </div>

      {/* Tab content */}
      <div className="p-6">
        {activeTab === "details" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Cancellation Details
              </h3>
              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-red-500 dark:text-red-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                      Reason for Cancellation
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      {order.cancellationReason}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Refund Information
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">
                      Amount:
                    </span>
                    <span className="font-medium">{order.refundAmount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">
                      Status:
                    </span>
                    <span
                      className={`font-medium ${
                        order.refundStatus === "Processed"
                          ? "text-green-600 dark:text-green-400"
                          : "text-yellow-600 dark:text-yellow-400"
                      }`}
                    >
                      {order.refundStatus}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">
                      Date:
                    </span>
                    <span className="font-medium">
                      {order.refundDate === "Processing"
                        ? "In progress"
                        : order.refundDate}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Order Timeline
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-1">
                      <span>Order placed</span>
                      <span>2023-06-05</span>
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
                      <span>Cancellation requested</span>
                      <span>{order.cancelledDate}</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
                      <div
                        className="h-full rounded-full bg-red-500"
                        style={{ width: "100%" }}
                      ></div>
                    </div>
                  </div>
                  {order.refundStatus === "Processed" && (
                    <div>
                      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-1">
                        <span>Refund processed</span>
                        <span>{order.refundDate}</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
                        <div
                          className="h-full rounded-full bg-green-500"
                          style={{ width: "100%" }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
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
                    : message.sender === "Support Team"
                    ? "bg-purple-50 dark:bg-purple-900/20"
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

        {activeTab === "files" && attachments.length > 0 && (
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
                  {/* No Download icon here, as it's not imported */}
                  Download
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
            {attachments.length > 0 && (
              <button
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={handleDownload}
              >
                {/* No Download icon here, as it's not imported */}
                Download Files
              </button>
            )}
          </div>
          <button
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            onClick={handleReorder}
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reorder This Assignment
          </button>
        </div>
      </div>
    </div>
  );
}

export default CancelledOrderDetails;
