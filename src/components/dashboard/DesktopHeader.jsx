import { motion } from "framer-motion";
import { Bell, Search, Sun, Moon } from "lucide-react";

export default function DesktopHeader({
  scrolled,
  getCurrentPageTitle,
  setIsNotificationsOpen,
  unreadNotifications,
  user,
  navigate,
  dark,
  setDark,
}) {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`h-14 fixed top-0 z-20 right-0 transition-all duration-300 hidden md:flex items-center
        ${
          scrolled
            ? "bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800"
            : "bg-white dark:bg-gray-900"
        }`}
      style={{
        width: "100vw",
        left: 0,
        right: 0,
      }}
    >
      <div className="px-6 h-full flex-1 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
          {getCurrentPageTitle()}
        </h1>
        <div className="flex flex-1 max-w-xl mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search orders, writers, documents..."
              className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800"
            />
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <button
            onClick={() => setIsNotificationsOpen(true)}
            className="p-2 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 relative transition-all"
            title="Notifications"
          >
            <Bell className="h-5 w-5" />
            {unreadNotifications > 0 && (
              <span className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-xs rounded-full bg-red-500 text-white">
                {unreadNotifications}
              </span>
            )}
          </button>
          <div
            onClick={() => navigate("/dashboard/account")}
            className="flex items-center space-x-4 cursor-pointer group hover:opacity-90 transition-opacity"
            title="Go to My Account"
          >
            <div className="flex flex-col text-right">
              <span className="text-sm font-semibold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {user?.name || "Client"}
              </span>
              <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                Premium Member
              </span>
            </div>
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-sm ring-2 ring-transparent group-hover:ring-blue-300 dark:group-hover:ring-blue-700 transition-all">
              {user?.name?.charAt(0) || "C"}
            </div>
          </div>
          <button
            onClick={() => setDark((d) => !d)}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition flex items-center justify-center"
            title={dark ? "Switch to light mode" : "Switch to dark mode"}
            aria-label="Toggle dark mode"
          >
            {dark ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
    </motion.header>
  );
}