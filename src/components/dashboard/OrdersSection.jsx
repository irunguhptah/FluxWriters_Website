import OrdersTabs from './OrdersTabs';
import OrderListItem from './OrderListItem';
import { ChevronRight } from 'lucide-react';

export default function OrdersSection({
  orders,
  activeTab,
  setActiveTab,
  onTabSwitch,
  onOrderDetails,
  onViewAllOrders
}) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
      <div className="border-b border-gray-100 dark:border-gray-800">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 md:mb-0">Your Orders</h2>
          <OrdersTabs activeTab={activeTab} setActiveTab={setActiveTab} onTabSwitch={onTabSwitch} />
        </div>
      </div>
      <div className="divide-y divide-gray-100 dark:divide-gray-800">
        {orders.map(order => (
          <OrderListItem key={order.id} order={order} onDetails={onOrderDetails} />
        ))}
      </div>
      <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-800 text-center">
        <button
          className="inline-flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-300 hover:text-indigo-800 dark:hover:text-indigo-400 group"
          onClick={onViewAllOrders}
          title="View all your orders"
        >
          View all orders
          <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}