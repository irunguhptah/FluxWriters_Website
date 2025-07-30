import MobileTopBar from "../dashboard/MobileTopBar";
import DesktopHeader from "../dashboard/DesktopHeader";
import MobileBottomNav from "../dashboard/MobileBottomNav";
import ChatButton from "../chat/ChatButton";
import NotificationsModal from "../modals/notifications/NotificationsModal";
import Sidebar from "../dashboard/Sidebar";
import MobileSidebar from "../dashboard/MobileSidebar";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { MessageSquare } from "lucide-react";

export default function DashboardLayoutContainer({
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
  mobileSidebarOpen,
  setMobileSidebarOpen,
  handleMobileNavClick,
  handleMobileSubNavClick,
  dark,
  setDark,
  isMobile,
  getCurrentPageTitle,
  setIsNotificationsOpen,
  isNotificationsOpen,
  isChatOpen,
  setIsChatOpenState,
  children,
}) {
  return (
    <div
      className={`min-h-screen flex bg-gray-50 dark:bg-gray-950 transition-all duration-300 ease-in-out
        ${isChatOpen ? "md:pr-80" : ""}`}
    >
      <Toaster position="top-right" />
      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden transition-opacity ${
          mobileSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileSidebarOpen(false)}
      />

      {/* Desktop Sidebar */}
      <Sidebar
        sidebarCollapsed={sidebarCollapsed}
        scrolled={scrolled}
        navLinks={navLinks}
        openSubmenus={openSubmenus}
        toggleSidebar={toggleSidebar}
        toggleSubmenu={toggleSubmenu}
        unreadNotifications={unreadNotifications}
        myOrdersBadge={myOrdersBadge}
        orderSubNotifications={orderSubNotifications}
        handleNavClick={handleNavClick}
        handleSubNavClick={handleSubNavClick}
        orderBadgeColors={orderBadgeColors}
        location={location}
        activeChats={activeChats}
        setIsChatOpen={setIsChatOpen}
        user={user}
        handleLogout={handleLogout}
        isActive={isActive}
        navigate={navigate}
      />
      {/* Mobile Sidebar */}
      <MobileSidebar
        mobileSidebarOpen={mobileSidebarOpen}
        setMobileSidebarOpen={setMobileSidebarOpen}
        navLinks={navLinks}
        openSubmenus={openSubmenus}
        toggleSubmenu={toggleSubmenu}
        isActive={isActive}
        myOrdersBadge={myOrdersBadge}
        orderSubNotifications={orderSubNotifications}
        orderBadgeColors={orderBadgeColors}
        handleMobileNavClick={handleMobileNavClick}
        handleMobileSubNavClick={handleMobileSubNavClick}
        setIsChatOpen={setIsChatOpen}
        activeChats={activeChats}
        dark={dark}
        setDark={setDark}
        handleLogout={handleLogout}
        user={user}
      />
      {/* Main Content */}
      <div
        className="flex-1 flex flex-col transition-all duration-200 ease-in-out md:ml-16"
        style={{
          marginLeft: isMobile ? "0" : sidebarCollapsed ? "64px" : "256px",
        }}
      >
        <MobileTopBar
          toggleMobileSidebar={toggleSidebar}
          getCurrentPageTitle={getCurrentPageTitle}
          setIsNotificationsOpen={setIsNotificationsOpen}
          unreadNotifications={unreadNotifications}
          dark={dark}
          setDark={setDark}
        />
        <DesktopHeader
          scrolled={scrolled}
          getCurrentPageTitle={getCurrentPageTitle}
          setIsNotificationsOpen={setIsNotificationsOpen}
          unreadNotifications={unreadNotifications}
          user={user}
          navigate={navigate}
          dark={dark}
          setDark={setDark}
        />
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-950 pt-16 md:pt-20 px-4 md:px-8 py-4 pb-20 md:pb-6">
          {children ? children : <Outlet />}
        </main>
        <MobileBottomNav
          isActive={isActive}
          location={location}
          setIsChatOpen={setIsChatOpen}
          activeChats={activeChats}
        />
        {/* Chat Panel */}
        {isChatOpen && (
          <div
            className={`
              fixed
              ${isMobile ? "right-4 left-auto bottom-16" : "top-20 right-8"}
              ${isMobile ? "w-[90vw] max-w-xs" : "w-80"}
              z-50
              transition-transform duration-300 ease-in-out
              ${isChatOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0 pointer-events-none"}
            `}
            style={{
              position: "fixed",
              height: isMobile ? "auto" : "600px",
              ...(isMobile
                ? {
                    top: "4.5rem",
                    bottom: "4.5rem",
                    right: "1rem",
                    left: "auto",
                    maxHeight: "calc(100vh - 9rem)",
                    minHeight: "300px",
                  }
                : {
                    top: "5rem",
                    right: "2rem",
                    maxHeight: "70vh",
                  }),
            }}
          >
            <ChatButton isOpen={isChatOpen} onClose={() => setIsChatOpenState(false)} />
          </div>
        )}
      </div>
      {/* Floating Chat Button */}
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpenState(true)}
          className="fixed bottom-6 right-6 z-40 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-lg p-4 flex items-center justify-center transition-all duration-200 md:flex hidden"
          title="Open Chat"
        >
          <MessageSquare className="h-6 w-6" />
          {activeChats > 0 && (
            <span className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-xs rounded-full bg-red-500 text-white">
              {activeChats}
            </span>
          )}
        </button>
      )}
      {/* Notifications Modal */}
      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        unreadCount={unreadNotifications}
      />
    </div>
  );
}