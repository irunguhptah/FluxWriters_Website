export default function WelcomeBanner({ orders, notifications, onTrackOrder }) {
  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-gray-900 dark:to-gray-800 rounded-2xl p-6 text-white shadow-lg transform transition-all hover:shadow-xl hover:-translate-y-1">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Welcome back, Student!</h1>
          <p className="opacity-90 text-sm md:text-base">
            You have {orders.filter(o => o.status !== 'Completed').length} active orders and {notifications.filter(n => !n.read).length} new notifications
          </p>
        </div>
        <button
          className="mt-4 md:mt-0 bg-white text-indigo-600 dark:bg-gray-900 dark:text-white px-6 py-2 rounded-lg font-medium shadow-sm hover:bg-opacity-90 dark:hover:bg-gray-800 transition-all"
          onClick={onTrackOrder}
          title="Track a new order or upload your requirements"
        >
          Track New Order
        </button>
      </div>
    </div>
  );
}