import { LogOut } from "lucide-react";

export default function SidebarUserSection({ user, sidebarCollapsed, handleLogout, navigate }) {
  return (
    <div className="flex-shrink-0 mt-auto p-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
      <div className="flex items-center justify-between">
        <div
          className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => navigate("/dashboard/account")}
          title="My Account"
        >
          <div className="h-8 w-8 min-w-[2rem] rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-sm">
            {user?.name?.charAt(0) || "C"}
          </div>
          {!sidebarCollapsed && (
            <div className="ml-2">
              <p className="text-sm font-semibold text-gray-900 dark:text-white truncate max-w-[100px]">
                {user?.name || "Client"}
              </p>
              <p className="text-xs font-medium text-gray-600 dark:text-gray-300">
                Premium User
              </p>
            </div>
          )}
        </div>
        <button
          onClick={handleLogout}
          className="p-1.5 rounded-full min-w-[1.75rem] min-h-[1.75rem] flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
          title="Sign Out"
        >
          <LogOut className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}