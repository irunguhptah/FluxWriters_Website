import { useState, useEffect } from "react";
import {
  FileText,
  Clock,
  ChevronRight,
  Plus,
  CheckCircle,
  Edit,
  Trash2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function OrderListPage() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedOrders = JSON.parse(
      localStorage.getItem("orderFormDataList") || "[]"
    );
    setOrders(savedOrders);
  }, []);

  const handleOrderClick = (order) => {
    localStorage.setItem("orderFormData", JSON.stringify(order));
    toast("Opening draft order...", { icon: "📄" });
    setTimeout(() => {
      navigate(`/dashboard/orders/drafts/${order.orderId}`);
    }, 600);
  };

  const handleNewOrder = () => {
    toast("Starting a new order...", { icon: "📝" });
    setTimeout(() => {
      navigate("/dashboard/orders/new");
    }, 600);
  };

  const handleEdit = (order) => {
    toast("Editing draft...", { icon: "✏️" });
    setTimeout(() => {
      localStorage.setItem("orderFormData", JSON.stringify(order));
      navigate(`/dashboard/orders/${order.orderId}/edit`);
    }, 600);
  };

  const handleDelete = (orderId) => {
    toast.success("Draft deleted");
    const updated = orders.filter((o) => o.orderId !== orderId);
    setOrders(updated);
    localStorage.setItem("orderFormDataList", JSON.stringify(updated));
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
      <Toaster position="top-right" />
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-800 px-6 py-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <CheckCircle className="text-blue-500 h-5 w-5" />
            Draft Orders
          </h2>
          <span
            className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 text-sm font-medium"
            title="Number of drafts"
          >
            {orders.length} Draft{orders.length !== 1 && "s"}
          </span>
        </div>
        <p className="mt-2 text-sm text-blue-700 dark:text-blue-300 flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-green-400 dark:text-green-300" />
          All your draft orders are listed here. Click to continue, edit, or
          delete.
        </p>
      </div>

      {/* Orders List */}
      <div className="divide-y divide-gray-200 dark:divide-gray-800">
        {orders.length === 0 ? (
          <div className="p-12 text-center">
            <FileText className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600" />
            <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">
              No draft orders
            </h3>
            <p className="mt-1 text-gray-500 dark:text-gray-300">
              Get started by creating a new order.
            </p>
            <div className="mt-6">
              <button
                onClick={handleNewOrder}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create New Order
              </button>
            </div>
          </div>
        ) : (
          orders.map((order) => {
            const deadline = order.deadline
              ? new Date(
                  Date.now() + Number(order.deadline) * 24 * 60 * 60 * 1000
                )
              : null;
            const timeRemaining = deadline
              ? Math.ceil((deadline - new Date()) / (1000 * 60 * 60 * 24))
              : "N/A";
            const isUrgent = timeRemaining !== "N/A" && timeRemaining <= 3;

            return (
              <div
                key={order.orderId}
                className="p-6 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                {/* Order Info */}
                <div className="flex items-start gap-4">
                  <div
                    className="p-3 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 flex-shrink-0"
                    title="Draft order"
                  >
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <h3
                      className="text-lg font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors"
                      title="Order title"
                    >
                      {order.title}
                    </h3>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-gray-600 dark:text-gray-300">
                      <span title="Order ID">
                        ID:{" "}
                        {order.orderId
                          ? String(order.orderId).slice(0, 8).toUpperCase()
                          : "N/A"}
                      </span>
                      <span>{order.type}</span>
                      <span>{order.pages} pages</span>
                      <span className="flex items-center">
                        <Clock
                          className={`h-4 w-4 mr-1 ${
                            isUrgent ? "text-red-500" : "text-gray-400"
                          }`}
                        />
                        <span
                          className={isUrgent ? "text-red-600 font-medium" : ""}
                        >
                          Due in {timeRemaining} day
                          {timeRemaining !== 1 ? "s" : ""}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
                {/* Actions */}
                <div className="flex flex-col items-end gap-2">
                  <div className="flex gap-2">
                    <button
                      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                      title="Continue order"
                      onClick={() => handleOrderClick(order)}
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                    <button
                      className="p-2 rounded-lg bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 hover:bg-yellow-200 dark:hover:bg-yellow-800 transition-colors"
                      title="Edit draft"
                      onClick={() => handleEdit(order)}
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button
                      className="p-2 rounded-lg bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
                      title="Delete draft"
                      onClick={() => handleDelete(order.orderId)}
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Last updated:{" "}
                    {order.updatedAt
                      ? new Date(order.updatedAt).toLocaleDateString()
                      : "N/A"}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
