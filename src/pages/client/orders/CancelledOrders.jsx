import {
  XCircle,
  FileText,
  RotateCcw,
  DollarSign,
  MessageSquare,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom"; // <-- Add this import

export default function CancelledOrders() {
  const navigate = useNavigate(); // <-- Add this line

  const orders = [
    {
      id: "ORD-78949",
      title: "Political Science Essay",
      writer: "Prof. Noam Chomsky",
      cancelledDate: "2023-06-10",
      price: "$75",
      refundStatus: "Processed",
      lastUpdated: "2 weeks ago",
    },
  ];

  // Action handlers with toasts
  const handleChat = (order) => {
    toast("Opening chat with writer...", { icon: "💬" });
  };

  const handleReorder = (order) => {
    toast.success(
      "Reorder started! You can now place a new order with the same details."
    );
  };

  const handleViewOrder = (order) => {
    toast("Viewing order details...", { icon: "📄" });
    navigate(`/dashboard/orders/cancelled/${order.id}`);
  };

  const handleReview = (order) => {
    toast("Redirecting to review form...", { icon: "⭐" });
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
      <Toaster position="top-right" />
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-800 px-6 py-4 bg-gradient-to-r from-red-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <XCircle className="text-red-500 h-5 w-5" />
            Cancelled Orders
          </h2>
          <span
            className="px-3 py-1 rounded-full bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300 text-sm font-medium"
            title="Number of cancelled orders"
          >
            {orders.length} Cancelled
          </span>
        </div>
        <p className="mt-2 text-sm text-red-700 dark:text-red-300 flex items-center gap-2">
          <XCircle className="h-4 w-4 text-red-400 dark:text-red-300" />
          Orders listed here were cancelled and refunded. You can chat with the
          writer, reorder, or leave a review.
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
                    className="p-3 rounded-full bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 flex-shrink-0"
                    title="Cancelled order"
                  >
                    <XCircle className="h-5 w-5" />
                  </div>

                  <div>
                    <h3
                      className="text-lg font-medium text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-300 transition-colors"
                      title="Order title"
                    >
                      {order.title}
                    </h3>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-gray-600 dark:text-gray-300">
                      <span title="Order ID">#{order.id}</span>
                      <span title="Writer assigned">
                        Writer: {order.writer}
                      </span>
                      <span title="Date order was cancelled">
                        Cancelled: {order.cancelledDate}
                      </span>
                    </div>

                    {/* Refund Status */}
                    <div
                      className="mt-2 flex items-center"
                      title="Refund status"
                    >
                      <DollarSign className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-1" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        Refund:{" "}
                        <span className="font-medium">
                          {order.refundStatus}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col items-end gap-2">
                  <span
                    className="text-lg font-bold text-gray-900 dark:text-white line-through"
                    title="Order price"
                  >
                    {order.price}
                  </span>
                  <div className="flex gap-2">
                    <button
                      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                      title="Chat with writer"
                      onClick={() => handleChat(order)}
                    >
                      <MessageSquare className="h-5 w-5" />
                    </button>
                    <button
                      className="px-3 py-1 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors text-sm flex items-center"
                      title="Reorder this assignment"
                      onClick={() => handleReorder(order)}
                    >
                      <RotateCcw className="h-4 w-4 mr-1" />
                      Reorder
                    </button>
                    <button
                      className="px-3 py-1 rounded-lg bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors text-sm font-medium"
                      title="View order details"
                      onClick={() => handleViewOrder(order)}
                    >
                      View Order
                    </button>
                    <button
                      className="px-3 py-1 rounded-lg bg-yellow-500 dark:bg-yellow-600 text-white hover:bg-yellow-600 dark:hover:bg-yellow-700 transition-colors text-sm font-medium"
                      title="Leave a review for this order"
                      onClick={() => handleReview(order)}
                    >
                      Review
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
              No cancelled orders
            </h3>
            <p className="mt-1 text-gray-500 dark:text-gray-300">
              Your active and completed orders are safe
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
