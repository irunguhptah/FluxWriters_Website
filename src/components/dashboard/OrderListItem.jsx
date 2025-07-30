import { Clock, AlertTriangle, CheckCircle, User, ChevronRight } from 'lucide-react';

export default function OrderListItem({ order, onDetails }) {
  return (
    <div 
      className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex items-start space-x-4 mb-4 md:mb-0">
          <div className={`p-2.5 rounded-xl ${
            order.status === 'In Progress' ? 'bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300' :
            order.status === 'Review' ? 'bg-amber-50 dark:bg-amber-900 text-amber-600 dark:text-amber-300' :
            'bg-green-50 dark:bg-green-900 text-green-600 dark:text-green-300'
          }`} title={`Order status: ${order.status}`}>
            {order.status === 'In Progress' && <Clock className="h-5 w-5" />}
            {order.status === 'Review' && <AlertTriangle className="h-5 w-5" />}
            {order.status === 'Completed' && <CheckCircle className="h-5 w-5" />}
          </div>
          <div>
            <h3 className="text-base font-medium text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors" title="Order title">
              {order.title}
            </h3>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
              <p className="text-sm text-gray-500 dark:text-gray-300 flex items-center" title="Assigned writer">
                <User className="h-3.5 w-3.5 mr-1.5" />
                {order.writer}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-300 flex items-center" title="Due date">
                <Clock className="h-3.5 w-3.5 mr-1.5" />
                Due {order.dueDate}
              </p>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-200" title="Order price">
                {order.price}
              </p>
              {order.urgent && (
                <span className="text-xs bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 px-2 py-0.5 rounded-full" title="Urgent order">
                  Urgent
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between md:justify-end space-x-4">
          {order.status !== 'Completed' && (
            <div className="w-32" title="Order progress">
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${
                    order.progress > 70 ? 'bg-green-400 dark:bg-green-500' :
                    order.progress > 30 ? 'bg-blue-400 dark:bg-blue-500' : 'bg-amber-400 dark:bg-amber-500'
                  }`}
                  style={{ width: `${order.progress}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-right">
                {order.progress}% complete
              </p>
            </div>
          )}
          <button
            className="flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-300 hover:text-indigo-800 dark:hover:text-indigo-400 group"
            onClick={() => onDetails(order)}
            title="View order details"
          >
            Details
            <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}