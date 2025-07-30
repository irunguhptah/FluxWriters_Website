import { MessageSquare } from 'lucide-react';

export default function ChatListItem({ chat, onClick }) {
  return (
    <div
      className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
      onClick={() => onClick(chat)}
      title={`Open chat with ${chat.writer}`}
      style={{ cursor: 'pointer' }}
    >
      <div className="flex items-start space-x-3">
        <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-900 text-purple-600 dark:text-purple-300 flex-shrink-0">
          <MessageSquare className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
              {chat.writer}
            </h3>
            {chat.unread && (
              <span className="h-2 w-2 rounded-full bg-purple-500 dark:bg-purple-300 flex-shrink-0" title="Unread message"></span>
            )}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-300 mt-1 truncate" title="Order">
            {chat.order}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-300 mt-2" title="Last message">
            {chat.lastMessage}
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2" title="Time of last message">
            {chat.time}
          </p>
        </div>
      </div>
    </div>
  );
}