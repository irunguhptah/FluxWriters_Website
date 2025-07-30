import { MessageSquare, Clock, CheckCircle } from "lucide-react";

export default function WriterChatPreview({ writers, onSelectWriter }) {
  // In a real app, you would fetch actual messages from your API
  const mockMessages = [
    {
      writerId: 1,
      content: "Hi, I have a question about your order requirements...",
      time: "2h ago",
      unread: true,
    },
    {
      writerId: 2,
      content: "I can complete this order within 3 days",
      time: "1d ago",
      unread: false,
    },
    {
      writerId: 3,
      content: "Please see my attached bid proposal",
      time: "2d ago",
      unread: false,
    },
  ];

  // Merge writer data with messages
  const chats = writers.slice(0, 3).map((writer) => {
    const message = mockMessages.find((m) => m.writerId === writer.id) || {
      content: "No messages yet",
      time: "",
      unread: false,
    };

    return {
      writer,
      ...message,
    };
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-sm font-medium text-gray-900">Recent Messages</h3>
      </div>

      {chats.length > 0 ? (
        <ul className="divide-y divide-gray-200">
          {chats.map((chat, index) => (
            <li key={index}>
              <button
                onClick={() => onSelectWriter(chat.writer.id)}
                className="w-full text-left p-4 hover:bg-gray-50 flex items-start"
              >
                <div className="flex-shrink-0 mr-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-green-300 to-blue-300 flex items-center justify-center text-white font-bold">
                    {chat.writer.name.charAt(0)}
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex justify-between">
                    <h4 className="text-sm font-medium text-gray-900 truncate">
                      {chat.writer.name}
                    </h4>
                    <span className="text-xs text-gray-500 flex items-center">
                      {chat.time && <Clock className="h-3 w-3 mr-1" />}
                      {chat.time}
                    </span>
                  </div>
                  <p
                    className={`text-sm ${
                      chat.unread
                        ? "text-blue-600 font-medium"
                        : "text-gray-500"
                    } truncate`}
                  >
                    {chat.content}
                  </p>
                </div>
                {chat.unread && (
                  <div className="ml-2 flex-shrink-0">
                    <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                  </div>
                )}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="p-4 text-center text-sm text-gray-500">
          No recent messages
        </div>
      )}

      {writers.length > 3 && (
        <div className="p-4 border-t border-gray-200 text-center">
          <button className="text-sm text-blue-600 hover:text-blue-800">
            View all messages
          </button>
        </div>
      )}
    </div>
  );
}
