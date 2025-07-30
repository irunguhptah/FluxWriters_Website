import {
  AlertOctagon,
  FileText,
  CheckCircle,
  MessageSquare,
  Shield,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function DisputedOrders() {
  const navigate = useNavigate(); // <-- Add this line
  const orders = [
    {
      id: "ORD-78951",
      title: "Economics Thesis",
      writer: "Prof. John Keynes",
      disputedDate: "2023-06-28",
      issue: "Plagiarism detected",
      status: "Under Review",
      lastUpdated: "5 days ago",
    },
  ];

  // Action handlers with toasts
  const handleViewOrder = (order) => {
    toast("Viewing order details...", { icon: "📄" });
    navigate(`/dashboard/orders/disputed/${order.id}`);
  };

  const handleContactSupport = (order) => {
    toast("Contacting support about this dispute...", { icon: "💬" });
  };

  const handleTrackProgress = (order) => {
    toast("Tracking dispute progress...", { icon: "🛡️" });
  };

  const handleCancelDispute = (order) => {
    toast("Dispute cancellation requested.", { icon: "⚠️" });
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
      <Toaster position="top-right" />
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-800 px-6 py-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <AlertOctagon className="text-purple-500 h-5 w-5" />
            Disputed Orders
          </h2>
          <span
            className="px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-300 text-sm font-medium"
            title="Number of active disputes"
          >
            {orders.length} Active
          </span>
        </div>
        <p className="mt-2 text-sm text-purple-700 dark:text-purple-300 flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-purple-400 dark:text-purple-300" />
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
                    className="p-3 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 flex-shrink-0"
                    title="Disputed order"
                  >
                    <Shield className="h-5 w-5" />
                  </div>

                  <div className="flex-1">
                    <h3
                      className="text-lg font-medium text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors"
                      title="Order title"
                    >
                      {order.title}
                    </h3>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-gray-600 dark:text-gray-300">
                      <span title="Order ID">#{order.id}</span>
                      <span title="Writer assigned">
                        Writer: {order.writer}
                      </span>
                      <span title="Date disputed">
                        Disputed: {order.disputedDate}
                      </span>
                    </div>

                    {/* Issue Details */}
                    <div className="mt-3 p-3 bg-purple-50 dark:bg-purple-950 rounded-lg border border-purple-100 dark:border-purple-800">
                      <p
                        className="text-sm font-medium text-purple-800 dark:text-purple-200"
                        title="Reported issue"
                      >
                        Reported Issue:
                      </p>
                      <p
                        className="text-sm text-purple-700 dark:text-purple-300 mt-1"
                        title="Issue details"
                      >
                        {order.issue}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col items-end gap-3">
                  <span
                    className="text-xs text-gray-500 dark:text-gray-400"
                    title="Dispute status"
                  >
                    Status: {order.status}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <button
                      className="px-3 py-1 rounded-lg bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors text-sm font-medium"
                      title="View order details"
                      onClick={() => handleViewOrder(order)}
                    >
                      View Order
                    </button>
                    <button
                      className="px-3 py-1 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors text-sm flex items-center"
                      title="Contact support"
                      onClick={() => handleContactSupport(order)}
                    >
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Contact Support
                    </button>
                    <button
                      className="px-3 py-1 rounded-lg bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors text-sm flex items-center"
                      title="Track dispute progress"
                      onClick={() => handleTrackProgress(order)}
                    >
                      <Shield className="h-4 w-4 mr-1" />
                      Track Progress
                    </button>
                    <button
                      className="px-3 py-1 rounded-lg bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800 transition-colors text-sm flex items-center"
                      title="Cancel this dispute"
                      onClick={() => handleCancelDispute(order)}
                    >
                      <AlertOctagon className="h-4 w-4 mr-1" />
                      Cancel Dispute
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
              No disputes found
            </h3>
            <p className="mt-1 text-gray-500 dark:text-gray-300">
              All your orders are in good standing
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
