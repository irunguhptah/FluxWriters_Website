import { Link } from "react-router-dom";
import { Home, FileText, PlusCircle, MessageSquare, User } from "lucide-react";

export default function MobileBottomNav({
  isActive,
  location,
  setIsChatOpen,
  activeChats,
}) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-20 md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 flex justify-around items-center py-2 px-2">
      <Link
        to="/dashboard"
        className={`flex flex-col items-center justify-center py-1 px-2 rounded-lg ${
          isActive("/dashboard") && location.pathname === "/dashboard"
            ? "text-indigo-600 bg-indigo-50"
            : "text-gray-600 dark:text-gray-300"
        }`}
      >
        <Home className="h-6 w-6" />
        <span className="text-xs mt-1">Home</span>
      </Link>
      <Link
        to="/dashboard/orders"
        className={`flex flex-col items-center justify-center py-1 px-2 rounded-lg ${
          isActive("/dashboard/orders")
            ? "text-indigo-600 bg-indigo-50"
            : "text-gray-600 dark:text-gray-300"
        }`}
      >
        <FileText className="h-6 w-6" />
        <span className="text-xs mt-1">My Orders</span>
      </Link>
      <Link
        to="/dashboard/new-order"
        className="flex flex-col items-center justify-center py-1 px-3 rounded-lg bg-gradient-to-r from-emerald-200 to-teal-200 text-emerald-700"
      >
        <PlusCircle className="h-6 w-6" />
        <span className="text-xs mt-1 font-medium">New</span>
      </Link>
      <button
        onClick={() => setIsChatOpen(true)}
        className="flex flex-col items-center justify-center py-1 px-2 rounded-lg text-gray-600 dark:text-gray-300"
      >
        <div className="relative">
          <MessageSquare className="h-6 w-6" />
          {activeChats > 0 && (
            <span className="absolute -top-2 -right-2 h-4 w-4 flex items-center justify-center text-xs rounded-full bg-red-500 text-white">
              {activeChats}
            </span>
          )}
        </div>
        <span className="text-xs mt-1">Chat</span>
      </button>
      <Link
        to="/dashboard/account"
        className={`flex flex-col items-center justify-center py-1 px-2 rounded-lg ${
          isActive("/dashboard/account")
            ? "text-indigo-600 bg-indigo-50"
            : "text-gray-600 dark:text-gray-300"
        }`}
      >
        <User className="h-6 w-6" />
        <span className="text-xs mt-1">Account</span>
      </Link>
    </nav>
  );
}