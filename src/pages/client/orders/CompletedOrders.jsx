import {
  CheckCircle,
  FileText,
  Star,
  ThumbsUp,
  MessageSquare,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function CompletedOrders() {
  const navigate = useNavigate();
  const orders = [
    {
      id: "ORD-78947",
      title: "Psychology Literature Review",
      writer: "Dr. Carl Jung",
      completedDate: "2023-06-30",
      price: "$120",
      rating: 5,
      lastUpdated: "1 week ago",
    },
    {
      id: "ORD-78946",
      title: "Business Ethics Case Study",
      writer: "Prof. Adam Smith",
      completedDate: "2023-07-15",
      price: "$95",
      rating: 4.5,
      lastUpdated: "1 day ago",
    },
  ];

  // Action handlers with toasts
  const handleChat = (order) => {
    toast("Opening chat with writer...", { icon: "💬" });
  };

  const handleViewOrder = (order) => {
    navigate(`/dashboard/orders/completed/${order.id}`);
  };

  const handleReview = (order) => {
    toast("Redirecting to review form...", { icon: "⭐" });
  };

  const handleRevision = (order) => {
    toast("Requesting a revision...", { icon: "✏️" });
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
      <Toaster position="top-right" />
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-800 px-6 py-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <CheckCircle className="text-green-500 h-5 w-5" />
            Completed Orders
          </h2>
          <span
            className="px-3 py-1 rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 text-sm font-medium"
            title="Number of completed orders"
          >
            {orders.length} Done
          </span>
        </div>
        <p className="mt-2 text-sm text-green-700 dark:text-green-300 flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-green-400 dark:text-green-300" />
          All your finished papers are listed here. You can chat with your
          writer, view details, leave a review, or request a revision.
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
                    className="p-3 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 flex-shrink-0"
                    title="Completed order"
                  >
                    <ThumbsUp className="h-5 w-5" />
                  </div>

                  <div>
                    <h3
                      className="text-lg font-medium text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-300 transition-colors"
                      title="Order title"
                    >
                      {order.title}
                    </h3>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-gray-600 dark:text-gray-300">
                      <span title="Order ID">#{order.id}</span>
                      <span title="Writer assigned">
                        Writer: {order.writer}
                      </span>
                      <span title="Date order was completed">
                        Completed: {order.completedDate}
                      </span>
                    </div>

                    {/* Rating */}
                    <div
                      className="mt-2 flex items-center"
                      title="Your rating for this order"
                    >
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(order.rating)
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300 dark:text-gray-600"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="ml-1 text-sm text-gray-600 dark:text-gray-300">
                        {order.rating.toFixed(1)}
                      </span>
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
                      onClick={() => handleChat(order)}
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
                      className="px-3 py-1 rounded-lg bg-yellow-500 dark:bg-yellow-600 text-white hover:bg-yellow-600 dark:hover:bg-yellow-700 transition-colors text-sm font-medium"
                      title="Leave a review for this order"
                      onClick={() => handleReview(order)}
                    >
                      Review
                    </button>
                    <button
                      className="px-3 py-1 rounded-lg bg-purple-600 dark:bg-purple-700 text-white hover:bg-purple-700 dark:hover:bg-purple-800 transition-colors text-sm font-medium"
                      title="Request a revision"
                      onClick={() => handleRevision(order)}
                    >
                      Revision
                    </button>
                  </div>
                  <span
                    className="text-xs text-gray-500 dark:text-gray-400"
                    title="Last updated"
                  >{`Updated ${order.lastUpdated}`}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center">
            <FileText className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600" />
            <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">
              No completed orders yet
            </h3>
            <p className="mt-1 text-gray-500 dark:text-gray-300">
              Your finished papers will appear here
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
