import { useState } from 'react';
import { Clock, CheckCircle, MessageSquare, FileText } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import WelcomeBanner from '../../../components/dashboard/WelcomeBanner';
import QuickStatCard from '../../../components/dashboard/QuickStatCard';
import OrdersSection from '../../../components/dashboard/OrdersSection';
import NotificationsCard from '../../../components/dashboard/NotificationsCard';
import RecentChatsCard from '../../../components/dashboard/RecentChatsCard';

export default function DashboardHome() {
  const [activeTab, setActiveTab] = useState('progress');
  const [orders, setOrders] = useState([
    {
      id: 'ORD-12345',
      title: 'Computer Science Research Paper',
      status: 'In Progress',
      writer: 'Dr. Smith',
      dueDate: '2023-06-15',
      progress: 65,
      price: '$120',
      urgent: false
    },
    {
      id: 'ORD-12346',
      title: 'Business Case Study Analysis',
      status: 'Review',
      writer: 'Prof. Johnson',
      dueDate: '2023-06-10',
      progress: 100,
      price: '$95',
      urgent: true
    },
    {
      id: 'ORD-12347',
      title: 'Psychology Literature Review',
      status: 'Writing',
      writer: 'Dr. Williams',
      dueDate: '2023-06-20',
      progress: 40,
      price: '$150',
      urgent: false
    }
  ]);

  const notifications = [
    {
      id: 1,
      title: 'Your paper is ready for review',
      message: 'Your "Business Case Study Analysis" is complete. Please review and provide feedback.',
      time: '2 hours ago',
      read: false,
      type: 'completion'
    },
    {
      id: 2,
      title: 'Writer assigned',
      message: 'Dr. Smith has been assigned to your "Computer Science Research Paper"',
      time: '1 day ago',
      read: false,
      type: 'assignment'
    },
    {
      id: 3,
      title: 'New message from writer',
      message: 'Dr. Williams has a question about your requirements',
      time: '2 days ago',
      read: true,
      type: 'message'
    }
  ];

  const recentChats = [
    {
      id: 1,
      writer: 'Dr. Smith',
      order: 'Computer Science Research Paper',
      lastMessage: 'I have completed the methodology section',
      time: '30 min ago',
      unread: true
    },
    {
      id: 2,
      writer: 'Prof. Johnson',
      order: 'Business Case Study Analysis',
      lastMessage: 'Your paper is ready for review',
      time: '2 hours ago',
      unread: false
    }
  ];

  const [isChatOpen, setIsChatOpen] = useState(false); // Add this

  // Toast handlers for demo actions
  const handleTrackOrder = () => toast('Track a new order or upload your requirements.', { icon: '📝' });
  const handleTabSwitch = (tab) => toast(`Showing ${tab === 'progress' ? 'In Progress' : tab === 'completed' ? 'Completed' : 'All'} orders.`, { icon: '📄', duration: 1200 });
  const handleOrderDetails = (order) => toast(`Viewing details for "${order.title}"`, { icon: '🔍' });
  const handleViewAllOrders = () => toast('Showing all your orders.', { icon: '📚' });
  const handleViewAllNotifications = () => toast('Viewing all notifications.', { icon: '🔔' });
  const handleViewAllMessages = () => toast('Viewing all messages.', { icon: '💬' });
  const handleNotificationClick = (notification) => toast(`${notification.title}`, { icon: '🔔' });
  const handleChatClick = (chat) => toast(`Opening chat with ${chat.writer}`, { icon: '💬' });

  // Filter orders based on activeTab
  const filteredOrders = activeTab === 'progress'
    ? orders.filter(o => o.status !== 'Completed')
    : activeTab === 'completed'
    ? orders.filter(o => o.status === 'Completed')
    : orders;

  return (
    <div className="space-y-6 p-4 md:p-6 max-w-7xl mx-auto">
      <Toaster position="top-right" />
      <WelcomeBanner
        orders={orders}
        notifications={notifications}
        onTrackOrder={handleTrackOrder}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <QuickStatCard
          icon={<FileText className="h-6 w-6" />}
          title="Active Orders"
          value={orders.filter(o => o.status !== 'Completed').length}
          subtitle="2 in progress, 1 in review"
          colorClass="bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300"
        />
        <QuickStatCard
          icon={<CheckCircle className="h-6 w-6" />}
          title="Completed"
          value={12}
          subtitle="98% satisfaction rate"
          colorClass="bg-green-50 dark:bg-green-900 text-green-600 dark:text-green-300"
        />
        <QuickStatCard
          icon={<MessageSquare className="h-6 w-6" />}
          title="Unread Messages"
          value={recentChats.filter(c => c.unread).length}
          subtitle="From 2 different writers"
          colorClass="bg-purple-50 dark:bg-purple-900 text-purple-600 dark:text-purple-300"
        />
      </div>
      <OrdersSection
        orders={filteredOrders}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onTabSwitch={handleTabSwitch}
        onOrderDetails={handleOrderDetails}
        onViewAllOrders={handleViewAllOrders}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <NotificationsCard
          notifications={notifications}
          onViewAll={handleViewAllNotifications}
          onNotificationClick={handleNotificationClick}
        />
        <RecentChatsCard
          recentChats={recentChats}
          onViewAll={handleViewAllMessages}
          onChatClick={handleChatClick}
        />
      </div>
    </div>
  );
}