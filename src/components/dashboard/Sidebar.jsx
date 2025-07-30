import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, MessageSquare, HelpCircle, User } from "lucide-react";
import SidebarLink from "./SidebarLink";
import SidebarUserSection from "./SidebarUserSection";
import { Link } from "react-router-dom";

export default function Sidebar({
  sidebarCollapsed,
  scrolled,
  navLinks,
  openSubmenus,
  toggleSidebar,
  toggleSubmenu,
  unreadNotifications,
  myOrdersBadge,
  orderSubNotifications,
  handleNavClick,
  handleSubNavClick,
  orderBadgeColors,
  location,
  activeChats,
  setIsChatOpen,
  user,
  handleLogout,
  isActive,
  navigate,
}) {
  return (
    <aside
      className={`
        fixed top-0 left-0 z-30 h-screen
        transition-all duration-200 ease-in-out
        ${sidebarCollapsed ? "w-16" : "w-64"}
        bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col shadow-sm
        hidden md:flex
      `}
    >
      {/* Logo & Sidebar toggle */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`h-14 flex-shrink-0 flex items-center justify-between px-3 transition-all duration-300 ${
          scrolled
            ? "bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800"
            : "bg-white dark:bg-gray-900"
        }`}
      >
        <h1 className={`text-lg font-bold text-blue-600 dark:text-blue-400 truncate`}>
          {sidebarCollapsed ? "FW" : "FluxWriters"}
        </h1>
        <button
          onClick={toggleSidebar}
          aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="flex items-center justify-center h-7 w-7 min-w-[1.75rem] rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
        >
          {sidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </motion.div>

      {/* Desktop Navigation */}
      <nav className="flex-1 min-h-0 overflow-y-auto py-2 px-2">
        {navLinks.map((item) => (
          <SidebarLink
            key={item.name}
            item={item}
            isActive={isActive}
            sidebarCollapsed={sidebarCollapsed}
            openSubmenus={openSubmenus}
            toggleSubmenu={toggleSubmenu}
            unreadNotifications={unreadNotifications}
            myOrdersBadge={myOrdersBadge}
            orderSubNotifications={orderSubNotifications}
            handleNavClick={handleNavClick}
            handleSubNavClick={handleSubNavClick}
            orderBadgeColors={orderBadgeColors}
          />
        ))}
        {/* Messages, Help Center, My Account links */}
        <button
          onClick={() => setIsChatOpen(true)}
          className={`
            flex items-center px-3 py-3 rounded-lg mb-1 w-full
            transition-colors duration-150
            ${location.pathname === "/dashboard/messages"
              ? "bg-indigo-50 text-indigo-700 font-medium"
              : "text-gray-600 hover:bg-gray-50"}
            ${sidebarCollapsed ? "justify-center" : ""}
          `}
          title="Open chat panel"
        >
          <div className="relative">
            <MessageSquare
              className={`h-5 w-5 ${
                location.pathname === "/dashboard/messages"
                  ? "text-indigo-600"
                  : "text-gray-600"
              }`}
            />
            {sidebarCollapsed && activeChats > 0 && (
              <span className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-xs rounded-full bg-red-500 text-white">
                {activeChats}
              </span>
            )}
          </div>
          {!sidebarCollapsed && (
            <>
              <span className="ml-3">Messages</span>
              {activeChats > 0 && (
                <span className="ml-auto px-2 py-0.5 text-xs rounded-full bg-red-100 text-red-800">
                  {activeChats}
                </span>
              )}
            </>
          )}
        </button>
        <Link
          to="/dashboard/help-center"
          className={`
            flex items-center px-3 py-3 rounded-lg mb-1
            transition-colors duration-150
            ${location.pathname === "/dashboard/help-center"
              ? "bg-indigo-50 text-indigo-700 font-medium"
              : "text-gray-600 hover:bg-gray-50"}
            ${sidebarCollapsed ? "justify-center" : ""}
          `}
          title="Help Center"
        >
          <HelpCircle className="h-5 w-5" />
          {!sidebarCollapsed && <span className="ml-3">Help Center</span>}
        </Link>
        <Link
          to="/dashboard/account"
          className={`
            flex items-center px-3 py-3 rounded-lg mb-1
            transition-colors duration-150
            ${location.pathname === "/dashboard/account"
              ? "bg-indigo-50 text-indigo-700 font-medium"
              : "text-gray-600 hover:bg-gray-50"}
            ${sidebarCollapsed ? "justify-center" : ""}
          `}
          title="My Account"
        >
          <User className="h-5 w-5" />
          {!sidebarCollapsed && <span className="ml-3">My Account</span>}
        </Link>
      </nav>
      <SidebarUserSection
        user={user}
        sidebarCollapsed={sidebarCollapsed}
        handleLogout={handleLogout}
        navigate={navigate}
      />
    </aside>
  );
}