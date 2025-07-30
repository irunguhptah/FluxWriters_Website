import { Mail, ChevronRight } from 'lucide-react';
import ChatListItem from './ChatListItem';

export default function RecentChatsCard({ recentChats, onViewAll, onChatClick }) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
      <div className="border-b border-gray-100 dark:border-gray-800 px-6 py-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
          <Mail className="h-5 w-5 text-purple-600 dark:text-purple-300 mr-2" />
          Recent Messages
        </h2>
        <span className="text-xs bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-300 px-2 py-1 rounded-full">
          {recentChats.filter(c => c.unread).length} Unread
        </span>
      </div>
      <div className="divide-y divide-gray-100 dark:divide-gray-800">
        {recentChats.map(chat => (
          <ChatListItem key={chat.id} chat={chat} onClick={onChatClick} />
        ))}
      </div>
      <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-800 text-center">
        <button
          className="inline-flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-300 hover:text-indigo-800 dark:hover:text-indigo-400 group"
          onClick={onViewAll}
          title="View all messages"
        >
          View all messages
          <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}