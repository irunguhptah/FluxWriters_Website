import { useState, useEffect } from 'react';
import { MessageSquare, X } from 'lucide-react';
import ChatPanel from './ChatPanel'; // or the correct path
import toast, { Toaster } from 'react-hot-toast';

export default function ChatButton({ isOpen = false, onClose = () => {} }) {
  const [isPanelOpen, setIsPanelOpen] = useState(isOpen);

  // Update internal state when props change
  useEffect(() => {
    setIsPanelOpen(isOpen);
  }, [isOpen]);

  const handleToggle = () => {
    const newState = !isPanelOpen;
    setIsPanelOpen(newState);
    if (newState) {
      toast('Chat panel opened. Here you can message your writers or support.', { icon: '💬', duration: 2500 });
    } else {
      toast('Chat panel closed.', { icon: '❌', duration: 1500 });
      onClose();
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      {/* Only show the floating button when panel is closed */}
      {!isPanelOpen && (
        <button
          onClick={handleToggle}
          className="fixed bottom-6 right-6 z-50 p-3 bg-gradient-to-r from-blue-500 to-purple-600 dark:from-gray-800 dark:to-gray-900 rounded-full shadow-xl hover:shadow-2xl transition-all"
          title="Open chat panel to message writers or support"
          aria-label="Open chat"
        >
          <MessageSquare className="h-6 w-6 text-white" />
        </button>
      )}

      {/* Chat Panel */}
      <div
        className={`fixed inset-y-0 right-0 z-40 w-full max-w-md bg-white dark:bg-gray-900 shadow-xl transform transition-transform duration-300 ease-in-out ${
          isPanelOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-label="Chat panel"
      >
        {/* Close button for accessibility */}
        {isPanelOpen && (
          <button
            onClick={handleToggle}
            className="absolute top-4 right-4 z-50 p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            title="Close chat panel"
            aria-label="Close chat"
          >
            <X className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </button>
        )}
        <ChatPanel onClose={handleToggle} />
      </div>
    </>
  );
}