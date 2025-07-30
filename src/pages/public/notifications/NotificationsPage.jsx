import { useState } from 'react';
import { 
  Bell, Check, X, Mail, FileText, AlertTriangle, 
  Star, MessageSquare, Clock, Zap 
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

export default function NotificationsPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'completed',
      title: 'Your paper is ready!',
      message: 'Your "Machine Learning Research Paper" has been completed by Dr. Alan Turing.',
      time: '2 hours ago',
      read: false,
      meta: { orderId: 'ORD-78945' },
    },
    {
      id: 2,
      type: 'revision',
      title: 'Revision requested',
      message: 'Prof. Adam Smith has requested changes to your "Business Ethics Case Study".',
      time: '1 day ago',
      read: false,
      meta: { orderId: 'ORD-78946' },
    },
    {
      id: 3,
      type: 'message',
      title: 'New message from writer',
      message: 'Dr. Carl Jung sent a question about your "Psychology Literature Review".',
      time: '3 days ago',
      read: true,
      meta: { orderId: 'ORD-78947', writer: 'Dr. Carl Jung' },
    },
    {
      id: 4,
      type: 'urgent',
      title: 'Deadline approaching!',
      message: 'Your "Blockchain in Finance" paper is due in 24 hours.',
      time: '5 hours ago',
      read: false,
      meta: { orderId: 'ORD-78948', deadline: '2023-07-25' },
    },
    {
      id: 5,
      type: 'rating',
      title: 'Rate your completed order',
      message: 'How was your experience with "Business Ethics Case Study"?',
      time: '1 week ago',
      read: true,
      meta: { orderId: 'ORD-78946' },
    },
  ]);

  // Filter notifications
  const filteredNotifications = notifications.filter(notification => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'unread') return !notification.read;
    return notification.type === activeFilter;
  });

  // Mark as read
  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
    toast('Notification marked as read.', { icon: '✅', duration: 1200 });
  };

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    toast('All notifications marked as read.', { icon: '📬', duration: 1200 });
  };

  // Delete notification
  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    toast('Notification deleted.', { icon: '🗑️', duration: 1200 });
  };

  // Get icon by notification type
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'completed': return <FileText className="h-5 w-5 text-green-500" title="Completed order" />;
      case 'revision': return <AlertTriangle className="h-5 w-5 text-yellow-500" title="Revision" />;
      case 'message': return <MessageSquare className="h-5 w-5 text-blue-500" title="Message" />;
      case 'urgent': return <Zap className="h-5 w-5 text-red-500" title="Urgent" />;
      case 'rating': return <Star className="h-5 w-5 text-purple-500" title="Rating request" />;
      default: return <Bell className="h-5 w-5 text-gray-500" title="Notification" />;
    }
  };

  // Handle filter change with toast
  const handleFilterChange = (e) => {
    setActiveFilter(e.target.value);
    toast(`Filter: ${e.target.options[e.target.selectedIndex].text}`, { icon: '🔎', duration: 1000 });
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
      <Toaster position="top-right" />
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-800 px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300" title="Notifications">
            <Bell className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Notifications</h2>
          <span className="px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 text-xs font-medium" title="Unread notifications">
            {notifications.filter(n => !n.read).length} New
          </span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={markAllAsRead}
            className="px-3 py-1 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            title="Mark all as read"
          >
            Mark all as read
          </button>
          <select
            value={activeFilter}
            onChange={handleFilterChange}
            className="block w-full pl-3 pr-10 py-1.5 text-sm border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:text-white"
            title="Filter notifications"
            aria-label="Filter notifications"
          >
            <option value="all">All Notifications</option>
            <option value="unread">Unread Only</option>
            <option value="completed">Completed Orders</option>
            <option value="revision">Revisions</option>
            <option value="message">Messages</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>
      </div>

      {/* Notifications List */}
      <div className="divide-y divide-gray-200 dark:divide-gray-800">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 transition-colors ${!notification.read ? 'bg-blue-50 dark:bg-blue-950' : 'hover:bg-gray-50 dark:hover:bg-gray-800'}`}
              title={notification.title}
              aria-label={notification.title}
            >
              <div className="flex items-start gap-3">
                {/* Notification Icon */}
                <div className="mt-1 flex-shrink-0">
                  {getNotificationIcon(notification.type)}
                </div>

                {/* Notification Content */}
                <div className="flex-1 min-w-0">
                  <h3 className={`text-sm font-medium ${!notification.read ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                    {notification.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2" title="Notification time">
                    {notification.time}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  {!notification.read && (
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="p-1.5 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition-colors"
                      title="Mark as read"
                      aria-label="Mark as read"
                    >
                      <Check className="h-4 w-4" />
                    </button>
                  )}
                  <button
                    onClick={() => deleteNotification(notification.id)}
                    className="p-1.5 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition-colors"
                    title="Delete"
                    aria-label="Delete notification"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center">
            <Bell className="mx-auto h-10 w-10 text-gray-400 dark:text-gray-600" />
            <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">
              {activeFilter === 'unread' ? 'No unread notifications' : 'No notifications found'}
            </h3>
            <p className="mt-1 text-gray-500 dark:text-gray-300">
              {activeFilter === 'unread' 
                ? 'You’re all caught up!' 
                : 'Try changing your filter settings.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}