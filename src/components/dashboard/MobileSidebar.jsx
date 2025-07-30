import { Link } from "react-router-dom";
import { X as XIcon, MessageSquare, HelpCircle, User, Sun, Moon, LogOut, ChevronUp, ChevronDown } from "lucide-react";

export default function MobileSidebar({
  mobileSidebarOpen,
  setMobileSidebarOpen,
  navLinks,
  openSubmenus,
  toggleSubmenu,
  isActive,
  myOrdersBadge,
  orderSubNotifications,
  orderBadgeColors,
  handleMobileNavClick,
  handleMobileSubNavClick,
  setIsChatOpen,
  activeChats,
  dark,
  setDark,
  handleLogout,
  user,
}) {
  return (
    <aside
      className={`
        fixed top-0 left-0 z-40 h-screen w-72
        transition-transform duration-300 ease-in-out 
        ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col shadow-lg
        md:hidden
      `}
    >
      <div className="h-16 flex-shrink-0 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-800">
        <h1 className="text-lg font-bold text-blue-600 dark:text-blue-400">
          FluxWriters
        </h1>
        <button
          onClick={() => setMobileSidebarOpen(false)}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          aria-label="Close menu"
        >
          <XIcon className="h-5 w-5 text-gray-500" />
        </button>
      </div>
      <nav className="flex-1 min-h-0 overflow-y-auto py-3 px-3">
        {navLinks.map((item) => (
          <div key={item.name}>
            {item.hasSubmenu ? (
              <>
                <button
                  onClick={() => toggleSubmenu(item.submenuKey)}
                  className={`
                    w-full flex items-center px-4 py-3 rounded-lg mb-1.5
                    transition-colors duration-150
                    ${isActive(item.to)
                      ? "bg-indigo-50 text-indigo-700 font-medium"
                      : "text-gray-600 hover:bg-gray-50"}
                  `}
                >
                  <div className="relative">
                    <item.icon
                      className={`h-6 w-6 ${
                        isActive(item.to)
                          ? "text-indigo-600"
                          : "text-gray-600"
                      }`}
                    />
                    {item.badgeKey &&
                      item.badgeKey === "myOrders" &&
                      myOrdersBadge > 0 && (
                        <span className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-xs rounded-full bg-red-500 text-white">
                          {myOrdersBadge}
                        </span>
                      )}
                  </div>
                  <span className="ml-3 flex-1 text-left font-medium">
                    {item.name}
                  </span>
                  {openSubmenus[item.submenuKey] ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </button>
                {openSubmenus[item.submenuKey] && (
                  <div className="ml-6 space-y-1 mb-2">
                    {item.subLinks.map((sub) => {
                      const subBadgeCount = sub.badgeSubKey
                        ? orderSubNotifications[sub.badgeSubKey]
                        : 0;
                      return (
                        <Link
                          key={sub.name}
                          to={sub.to}
                          className={`
                            flex items-center px-4 py-3 rounded-lg text-sm
                            transition-colors duration-150
                            ${isActive(sub.to)
                              ? "bg-indigo-50 text-indigo-700 font-medium"
                              : "text-gray-600 hover:bg-gray-50"}
                          `}
                          onClick={() => handleMobileSubNavClick(sub)}
                        >
                          <sub.icon className="h-5 w-5" />
                          <span className="ml-3 flex-1">{sub.name}</span>
                          {subBadgeCount > 0 && (
                            <span
                              className={`px-2.5 py-0.5 text-xs rounded-full ${
                                orderBadgeColors[sub.badgeSubKey] ||
                                "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {subBadgeCount}
                            </span>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </>
            ) : (
              <Link
                to={item.to}
                className={`
                  flex items-center px-4 py-3 rounded-lg mb-1.5
                  transition-colors duration-150
                  ${item.name === "New Order"
                    ? "bg-gradient-to-r from-emerald-200 to-teal-200 text-emerald-700 font-medium shadow-sm"
                    : isActive(item.to)
                    ? "bg-indigo-50 text-indigo-700 font-medium"
                    : "text-gray-600 hover:bg-gray-50"}
                `}
                onClick={() => handleMobileNavClick(item)}
              >
                <item.icon
                  className={`h-6 w-6 ${
                    item.name === "New Order"
                      ? "text-emerald-600"
                      : isActive(item.to)
                      ? "text-indigo-600"
                      : "text-gray-600"
                  }`}
                />
                <span className="ml-3 font-medium">{item.name}</span>
              </Link>
            )}
          </div>
        ))}
        {/* Additional links for mobile */}
        <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-800">
          <button
            onClick={() => {
              setIsChatOpen(true);
              setMobileSidebarOpen(false);
            }}
            className="w-full flex items-center px-4 py-3 rounded-lg mb-1.5 text-gray-600 hover:bg-gray-50"
          >
            <MessageSquare className="h-6 w-6 text-gray-600" />
            <span className="ml-3 font-medium">Messages</span>
            {activeChats > 0 && (
              <span className="ml-auto px-2.5 py-0.5 text-xs rounded-full bg-red-100 text-red-800">
                {activeChats}
              </span>
            )}
          </button>
          <Link
            to="/dashboard/help-center"
            className="flex items-center px-4 py-3 rounded-lg mb-1.5 text-gray-600 hover:bg-gray-50"
            onClick={() => setMobileSidebarOpen(false)}
          >
            <HelpCircle className="h-6 w-6 text-gray-600" />
            <span className="ml-3 font-medium">Help Center</span>
          </Link>
          <Link
            to="/dashboard/account"
            className="flex items-center px-4 py-3 rounded-lg mb-1.5 text-gray-600 hover:bg-gray-50"
            onClick={() => setMobileSidebarOpen(false)}
          >
            <User className="h-6 w-6 text-gray-600" />
            <span className="ml-3 font-medium">My Account</span>
          </Link>
          <button
            onClick={() => setDark((d) => !d)}
            className="w-full flex items-center px-4 py-3 rounded-lg mb-1.5 text-gray-600 hover:bg-gray-50"
          >
            {dark ? (
              <Sun className="h-6 w-6 text-gray-600" />
            ) : (
              <Moon className="h-6 w-6 text-gray-600" />
            )}
            <span className="ml-3 font-medium">
              {dark ? "Light Mode" : "Dark Mode"}
            </span>
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-3 rounded-lg mb-1.5 text-gray-600 hover:bg-gray-50"
          >
            <LogOut className="h-6 w-6 text-gray-600" />
            <span className="ml-3 font-medium">Sign Out</span>
          </button>
        </div>
      </nav>
      <div className="flex-shrink-0 p-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-sm">
            {user?.name?.charAt(0) || "C"}
          </div>
          <div className="ml-3">
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              {user?.name || "Client"}
            </p>
            <p className="text-xs font-medium text-gray-600 dark:text-gray-300">
              Premium User
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}