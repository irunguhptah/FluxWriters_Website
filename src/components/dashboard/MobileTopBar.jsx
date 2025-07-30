import { Menu as MenuIcon, Bell, Sun, Moon } from "lucide-react";

export default function MobileTopBar({
  toggleMobileSidebar,
  getCurrentPageTitle,
  setIsNotificationsOpen,
  unreadNotifications,
  dark,
  setDark,
}) {
  return (
    <div className="fixed top-0 left-0 right-0 h-16 z-20 flex items-center justify-between bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 md:hidden">
      <div className="flex items-center">
        <button
          onClick={toggleMobileSidebar}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <MenuIcon className="h-6 w-6 text-gray-700 dark:text-gray-200" />
        </button>
        <h1 className="text-lg font-semibold text-gray-800 dark:text-white ml-3">
          {getCurrentPageTitle()}
        </h1>
      </div>
      <div className="flex items-center space-x-3">
        <button
          onClick={() => setIsNotificationsOpen(true)}
          className="p-2 relative"
        >
          <Bell className="h-6 w-6 text-gray-700 dark:text-gray-200" />
          {unreadNotifications > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs rounded-full bg-red-500 text-white">
              {unreadNotifications}
            </span>
          )}
        </button>
        <button
          onClick={() => setDark((d) => !d)}
          className="p-2 rounded-full"
        >
          {dark ? (
            <Sun className="h-6 w-6 text-gray-700 dark:text-gray-200" />
          ) : (
            <Moon className="h-6 w-6 text-gray-700 dark:text-gray-200" />
          )}
        </button>
      </div>
    </div>
  );
}