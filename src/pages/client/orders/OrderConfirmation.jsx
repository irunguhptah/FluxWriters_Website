// OrderConfirmation.jsx
import { CheckCircle, Clock, FileText, CreditCard } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function OrderConfirmation() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const order = state?.order;

  if (!order) {
    // Optionally, redirect or show a fallback UI
    return (
      <div className="text-center mt-20">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          No order data found.
        </h2>
        <button
          onClick={() => navigate("/dashboard/new-order")}
          className="px-6 py-3 border border-gray-300 rounded-lg shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          Place a New Order
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 max-w-3xl mx-auto transition-colors duration-300">
      <div className="text-center mb-8">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900">
          <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
        </div>
        <h2 className="mt-3 text-xl font-bold text-gray-900 dark:text-gray-100">
          Order Submitted Successfully!
        </h2>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">
          Your order
          <span className="mx-2 px-3 py-1 rounded bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 font-bold text-base tracking-wider shadow-sm border border-blue-300 dark:border-blue-700">
            #{order.orderId}
          </span>
          has been received and is being processed.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Order Summary */}
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4 flex items-center">
            <FileText className="mr-2 h-5 w-5 text-blue-500 dark:text-blue-400" />
            Order Details
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-300">Title:</span>
              <span className="font-medium dark:text-gray-100">
                {order.title}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-300">Type:</span>
              <span className="font-medium dark:text-gray-100">
                {order.type}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-300">Pages:</span>
              <span className="font-medium dark:text-gray-100">
                {order.pages}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-300">
                Deadline:
              </span>
              <span className="font-medium dark:text-gray-100">
                {order.deadline}
              </span>
            </div>
          </div>
        </div>

        {/* Payment Summary */}
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4 flex items-center">
            <CreditCard className="mr-2 h-5 w-5 text-purple-500 dark:text-purple-400" />
            Payment Summary
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-300">
                Base Price:
              </span>
              <span className="font-medium dark:text-gray-100">
                ${order.calculatePrice}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-300">
                Urgency Fee:
              </span>
              <span className="font-medium dark:text-gray-100">
                +${order.urgencyFee}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-300">
                Writer Level:
              </span>
              <span className="font-medium dark:text-gray-100">
                +${order.writerFee}
              </span>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
            <div className="flex justify-between text-lg font-bold">
              <span className="dark:text-gray-100">Total:</span>
              <span className="text-blue-600 dark:text-blue-400">
                ${order.totalPrice}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-4 mb-8">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3 flex items-center">
          <Clock className="mr-2 h-5 w-5 text-blue-500 dark:text-blue-400" />
          What Happens Next?
        </h3>
        <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700 dark:text-gray-200">
          <li>Our team will review your order requirements within 1 hour</li>
          <li>You'll receive writer proposals to choose from</li>
          <li>Once writer is selected, work will begin immediately</li>
          <li>You can track progress and communicate via your dashboard</li>
        </ol>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <button
          onClick={() => navigate("/dashboard/orders")}
          className="px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500"
        >
          Track Your Order
        </button>
        <button
          onClick={() => navigate("/dashboard/new-order")}
          className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-base font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          Place Another Order
        </button>
      </div>
    </div>
  );
}
