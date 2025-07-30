import {
  Clock,
  AlertCircle,
  CheckCircle,
  FileText,
  MessageSquare,
  Download,
  Zap,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function InProgressOrders() {
  const navigate = useNavigate();
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

  // Action handlers with toasts
  const handleChat = (order) => {
    toast("Opening chat with writer...", { icon: "💬" });
  };

  const handleViewOrder = (order) => {
    navigate(`/dashboard/orders/in-progress/${order.id}`);
  };

  const handleCompleteOrder = (order) => {
    toast.success("Order marked as complete! Thank you for your feedback.");
  };

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
                      className="px-3 py-1 rounded-lg bg-green-600 dark:bg-green-700 text-white hover:bg-green-700 dark:hover:bg-green-800 transition-colors text-sm font-medium"
                      title="Mark order as complete"
                      onClick={() => handleCompleteOrder(order)}
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
