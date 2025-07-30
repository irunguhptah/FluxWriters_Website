import { useState, useEffect, useRef } from "react";

import {
  ArrowLeft,
  Paperclip,
  Send,
  Check,
  X,
  Image,
  Smile,
} from "lucide-react";

import toast, { Toaster } from "react-hot-toast";

export default function ChatPanel({ onClose }) {
  const [activeChat, setActiveChat] = useState(null);
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const [chats, setChats] = useState([
    {
      id: "chat-1",
      writer: "Dr. Alan Turing",
      avatar: "AT",
      avatarColor: "bg-indigo-600",
      order: "Machine Learning Research Paper",
      unread: 3,
      lastMessage: "I've completed the methodology section",
      lastTime: "30 min ago",
      messages: [
        {
          sender: "writer",
          text: "Hi! I've started working on your paper.",
          time: "10:30 AM",
        },
        {
          sender: "you",
          text: "Great! Can you focus on neural networks?",
          time: "10:32 AM",
        },
        {
          sender: "writer",
          text: "Sure, I'll add more details.",
          time: "11:45 AM",
        },
      ],
      online: true,
    },
    {
      id: "chat-2",
      writer: "Support Team",
      avatar: "ST",
      avatarColor: "bg-emerald-600",
      order: "General Inquiry",
      unread: 0,
      lastMessage: "Your refund is being processed",
      lastTime: "2 days ago",
      messages: [
        { sender: "support", text: "How can we help?", time: "Jul 5" },
        {
          sender: "you",
          text: "I need a revision on my order.",
          time: "Jul 5",
        },
        {
          sender: "support",
          text: "We'll assign a writer shortly.",
          time: "Jul 6",
        },
      ],
      online: true,
    },
  ]);

  // Scroll to bottom of messages when activeChat or chats update
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [activeChat, chats]);

  // Dynamically adjust textarea height on message change
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [message]);

  const sendMessage = () => {
    if (!message.trim() || !activeChat) {
      toast.error("Type a message before sending.");
      return;
    }

    const updatedChats = chats.map((chat) => {
      if (chat.id === activeChat.id) {
        return {
          ...chat,
          messages: [
            ...chat.messages,
            { sender: "you", text: message, time: "Just now" },
          ],
          lastMessage: message,
          lastTime: "Just now",
          unread: 0,
        };
      }
      return chat;
    });

    setChats(updatedChats);
    setMessage("");
    toast.success("Message sent!");
  };

  const handleAttach = (type) => {
    toast("Attachment feature coming soon!", { icon: "📎" });
  };

  const handleEmoji = () => {
    toast("Emoji picker coming soon!", { icon: "😊" });
  };

  return (
    <div
      className="flex flex-col bg-gray-50 dark:bg-gray-900 overflow-hidden border border-indigo-200 dark:border-indigo-700 rounded-2xl"
      style={{
        height: window.innerWidth < 768 ? "auto" : "500px", // Match DashboardLayout chat panel height
        minHeight: 0,
        width: "100%",
        position: "relative",
        marginBottom: window.innerWidth >= 1024 ? "0.5rem" : undefined, // Reduce bottom margin on large screens
      }}
    >
      <Toaster position="top-right" />

      {/* Chat Header */}
      <div className="border-b border-indigo-100 dark:border-indigo-800 p-4 flex items-center justify-between bg-white dark:bg-gray-900 shadow-sm flex-shrink-0">
        {activeChat ? (
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setActiveChat(null);
                toast("Back to all conversations.", {
                  icon: "📋",
                  duration: 1200,
                });
              }}
              className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title="Back to chat list"
              aria-label="Back to chat list"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </button>

            <div
              className={`relative h-9 w-9 rounded-full ${activeChat.avatarColor} flex items-center justify-center text-white font-medium shadow-sm`}
              title="Chat avatar"
            >
              {activeChat.avatar}
              {activeChat.online && (
                <span
                  className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white dark:border-gray-900"
                  title="Online"
                ></span>
              )}
            </div>

            <div>
              <h3
                className="font-medium text-gray-900 dark:text-white"
                title="Chat participant"
              >
                {activeChat.writer}
              </h3>
              <p
                className="text-xs text-gray-500 dark:text-gray-300"
                title="Order or topic"
              >
                {activeChat.order}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <h3 className="font-medium text-gray-900 dark:text-white">
              Messages
            </h3>
            <span
              className="px-2 py-0.5 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 rounded-full"
              title="Unread messages"
            >
              {chats.reduce((count, chat) => count + chat.unread, 0)} unread
            </span>
          </div>
        )}

        <button
          onClick={() => {
            onClose();
            toast("Chat panel closed.", { icon: "❌", duration: 1200 });
          }}
          className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          title="Close chat panel"
          aria-label="Close chat panel"
        >
          <X className="h-5 w-5 text-gray-600 dark:text-gray-300" />
        </button>
      </div>

      {/* Chat List or Messages */}
      <div className="flex-1 overflow-y-auto min-h-0">
        {!activeChat ? (
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {chats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => {
                  setActiveChat(chat);
                  toast(`Chat with ${chat.writer} opened.`, {
                    icon: "💬",
                    duration: 1200,
                  });
                }}
                className="p-4 hover:bg-white dark:hover:bg-gray-800 cursor-pointer transition-colors duration-150"
                title={`Open chat with ${chat.writer}`}
                aria-label={`Open chat with ${chat.writer}`}
              >
                <div className="flex items-center gap-3">
                  <div className="relative flex-shrink-0">
                    <div
                      className={`h-12 w-12 rounded-full ${chat.avatarColor} flex items-center justify-center text-white font-medium shadow-sm`}
                      title="Chat avatar"
                    >
                      {chat.avatar}
                    </div>
                    {chat.online && (
                      <span
                        className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white dark:border-gray-900"
                        title="Online"
                      ></span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {chat.writer}
                      </h4>
                      <div className="flex items-center">
                        <span
                          className="text-xs text-gray-500 dark:text-gray-300"
                          title="Last message time"
                        >
                          {chat.lastTime}
                        </span>
                        {chat.unread > 0 && (
                          <span
                            className="ml-2 flex items-center justify-center h-5 w-5 rounded-full bg-blue-600 text-white text-xs font-medium"
                            title="Unread messages"
                          >
                            {chat.unread}
                          </span>
                        )}
                      </div>
                    </div>
                    <p
                      className="text-sm text-gray-600 dark:text-gray-300 truncate"
                      title="Last message"
                    >
                      {chat.lastMessage}
                    </p>
                    <p
                      className="text-xs text-gray-400 dark:text-gray-500 mt-0.5 truncate"
                      title="Order or topic"
                    >
                      {chat.order}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 space-y-6">
            {activeChat.messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === "you" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.sender !== "you" && (
                  <div
                    className={`h-8 w-8 rounded-full ${activeChat.avatarColor} flex items-center justify-center text-white font-medium mr-2 flex-shrink-0 self-end mb-1`}
                    title="Sender avatar"
                  >
                    {activeChat.avatar}
                  </div>
                )}

                <div
                  className={`max-w-xs p-3 rounded-2xl ${
                    msg.sender === "you"
                      ? "bg-blue-600 text-white rounded-tr-none shadow-sm"
                      : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-tl-none shadow-sm"
                  }`}
                  title={
                    msg.sender === "you"
                      ? "Your message"
                      : "Writer/support message"
                  }
                >
                  <p className="text-sm">{msg.text}</p>
                  <div
                    className={`flex items-center justify-end mt-1 text-xs ${
                      msg.sender === "you"
                        ? "text-blue-100"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    <span title="Message time">{msg.time}</span>
                    {msg.sender === "you" && (
                      <Check
                        className="h-3 w-3 ml-1 opacity-80"
                        title="Delivered"
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Message Input */}
      {activeChat && (
        <div className="border-t border-indigo-100 dark:border-indigo-800 p-3 bg-white dark:bg-gray-900 flex-shrink-0 rounded-b-2xl">
          <div className="flex items-center gap-1 pr-1">
            <div className="flex-shrink-0 flex space-x-1">
              <button
                className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                title="Attach a file"
                aria-label="Attach a file"
                onClick={() => handleAttach("file")}
              >
                <Paperclip className="h-4 w-4 text-gray-500 dark:text-gray-300" />
              </button>
              <button
                className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                title="Attach an image"
                aria-label="Attach an image"
                onClick={() => handleAttach("image")}
              >
                <Image className="h-4 w-4 text-gray-500 dark:text-gray-300" />
              </button>
              <button
                className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                title="Add emoji"
                aria-label="Add emoji"
                onClick={handleEmoji}
              >
                <Smile className="h-4 w-4 text-gray-500 dark:text-gray-300" />
              </button>
            </div>

            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-grow px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 dark:bg-gray-800 dark:text-white text-sm resize-none overflow-y-hidden"
              rows={1}
              style={{ minHeight: "36px", maxHeight: "160px" }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              aria-label="Type your message"
              title="Type your message"
            />

            <button
              onClick={sendMessage}
              disabled={!message.trim()}
              className={`flex-shrink-0 p-2 ml-1 rounded-full ${
                message.trim()
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-300 dark:bg-gray-700"
              } text-white shadow-sm transition-colors`}
              title="Send message"
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
