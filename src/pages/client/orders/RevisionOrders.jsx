import {
  RefreshCw,
  FileText,
  AlertTriangle,
  CheckCircle,
  Check,
  X,
  MessageSquare,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom"; // <-- Add this import

export default function RevisionOrders() {
  const navigate = useNavigate(); // <-- Add this line

  const orders = [
    {
      id: "ORD-78950",
      title: "Sociology Research Paper",
      writer: "Dr. Emile Durkheim",
      submittedDate: "2023-07-05",
      revisionRequest: "Add more case studies",
      status: "Pending",
      lastUpdated: "3 days ago",
    },
  ];

  // Action handlers with toasts
  const handleChat = (order) => {
    toast("Opening chat with writer...", { icon: "💬" });
  };

  const handleApprove = (order) => {
    toast.success("Revision approved. Thank you for your feedback!");
    navigate(`/dashboard/orders/revision/${order.id}`);
  };

  const handleReject = (order) => {
    toast("Revision rejected. Please specify your concerns.", { icon: "❌" });
  };

  const handleDispute = (order) => {
    toast("Marked as dispute. Our support team will review this.", {
      icon: "⚠️",
    });
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
      <Toaster position="top-right" />
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-800 px-6 py-4 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-gray-900 dark:to-gray-800">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <RefreshCw className="text-yellow-500 h-5 w-5" />
            Revision Requests
          </h2>
          <span
            className="px-3 py-1 rounded-full bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300 text-sm font-medium"
            title="Number of pending revisions"
          >
            {orders.length} Pending
          </span>
        </div>
        <p className="mt-2 text-sm text-yellow-700 dark:text-yellow-300 flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-yellow-400 dark:text-yellow-300" />
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
                    className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-300 flex-shrink-0"
                    title="Revision requested"
                  >
                    <AlertTriangle className="h-5 w-5" />
                  </div>

                  <div className="flex-1">
                    <h3
                      className="text-lg font-medium text-gray-900 dark:text-white group-hover:text-yellow-600 dark:group-hover:text-yellow-300 transition-colors"
                      title="Order title"
                    >
                      {order.title}
                    </h3>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-gray-600 dark:text-gray-300">
                      <span title="Order ID">#{order.id}</span>
                      <span title="Writer assigned">
                        Writer: {order.writer}
                      </span>
                      <span title="Date submitted">
                        Submitted: {order.submittedDate}
                      </span>
                    </div>

                    {/* Revision Details */}
                    <div className="mt-3 p-3 bg-amber-50 dark:bg-amber-900 rounded-lg border border-amber-100 dark:border-amber-800">
                      <p
                        className="text-sm font-medium text-amber-800 dark:text-amber-200"
                        title="Revision request"
                      >
                        Revision Request:
                      </p>
                      <p
                        className="text-sm text-amber-700 dark:text-amber-300 mt-1"
                        title="Revision details"
                      >
                        {order.revisionRequest}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col items-end gap-3">
                  <span
                    className="text-xs text-gray-500 dark:text-gray-400"
                    title="Revision status"
                  >
                    Status: {order.status}
                  </span>
                  <div className="flex gap-2">
                    <button
                      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                      title="Chat with writer"
                      aria-label="Chat with writer"
                      onClick={() => handleChat(order)}
                    >
                      <MessageSquare className="h-5 w-5" />
                    </button>
                    <button
                      className="px-3 py-1 rounded-lg bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-800 transition-colors text-sm flex items-center"
                      title="Approve revision"
                      aria-label="Approve revision"
                      onClick={() => handleApprove(order)}
                    >
                      <Check className="h-4 w-4 mr-1" />
                      Approve
                    </button>
                    <button
                      className="px-3 py-1 rounded-lg bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800 transition-colors text-sm flex items-center"
                      title="Reject revision"
                      aria-label="Reject revision"
                      onClick={() => handleReject(order)}
                    >
                      <X className="h-4 w-4 mr-1" />
                      Reject
                    </button>
                    <button
                      className="px-3 py-1 rounded-lg bg-red-500 dark:bg-red-700 text-white hover:bg-red-600 dark:hover:bg-red-800 transition-colors text-sm flex items-center"
                      title="Mark as dispute"
                      aria-label="Mark as dispute"
                      onClick={() => handleDispute(order)}
                    >
                      <AlertTriangle className="h-4 w-4 mr-1" />
                      Mark as Dispute
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center">
            <FileText className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600" />
            <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">
              No revision requests
            </h3>
            <p className="mt-1 text-gray-500 dark:text-gray-300">
              All your papers meet requirements
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
