import { CheckCircle, User, MessageSquare } from 'lucide-react';

export default function NotificationListItem({ notification, onClick }) {
  return (
    <div
      className={`px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
        !notification.read ? 'bg-indigo-50 dark:bg-indigo-900' : ''
      }`}
      onClick={() => onClick(notification)}
      title={notification.title}
      style={{ cursor: 'pointer' }}
    >
      <div className="flex items-start space-x-3">
        <div className={`p-2 rounded-xl flex-shrink-0 ${
          notification.type === 'completion' ? 'bg-green-50 dark:bg-green-900 text-green-600 dark:text-green-300' :
          notification.type === 'assignment' ? 'bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300' :
          'bg-purple-50 dark:bg-purple-900 text-purple-600 dark:text-purple-300'
        }`}>
          {notification.type === 'completion' && <CheckCircle className="h-5 w-5" />}
          {notification.type === 'assignment' && <User className="h-5 w-5" />}
          {notification.type === 'message' && <MessageSquare className="h-5 w-5" />}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
            {notification.title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
            {notification.message}
          </p>
          <div className="flex items-center justify-between mt-2">
            <p className="text-xs text-gray-400 dark:text-gray-500">
              {notification.time}
            </p>
            {!notification.read && (
              <span className="text-xs text-indigo-600 dark:text-indigo-300 font-medium">
                New
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}