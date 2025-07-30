import { Bell, ChevronRight } from 'lucide-react';
import NotificationListItem from './NotificationListItem';

export default function NotificationsCard({ notifications, onViewAll, onNotificationClick }) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
      <div className="border-b border-gray-100 dark:border-gray-800 px-6 py-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
          <Bell className="h-5 w-5 text-indigo-600 dark:text-indigo-300 mr-2" />
          Recent Notifications
        </h2>
        <span className="text-xs bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-300 px-2 py-1 rounded-full">
          {notifications.filter(n => !n.read).length} New
        </span>
      </div>
      <div className="divide-y divide-gray-100 dark:divide-gray-800">
        {notifications.map(notification => (
          <NotificationListItem key={notification.id} notification={notification} onClick={onNotificationClick} />
        ))}
      </div>
      <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-800 text-center">
        <button
          className="inline-flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-300 hover:text-indigo-800 dark:hover:text-indigo-400 group"
          onClick={onViewAll}
          title="View all notifications"
        >
          View all notifications
          <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}