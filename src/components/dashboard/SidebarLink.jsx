import { Link } from "react-router-dom";
import { ChevronUp, ChevronDown } from "lucide-react";

export default function SidebarLink({
  item,
  isActive,
  sidebarCollapsed,
  openSubmenus,
  toggleSubmenu,
  unreadNotifications,
  myOrdersBadge,
  orderSubNotifications,
  handleNavClick,
  handleSubNavClick,
  orderBadgeColors,
}) {
  const badgeCount = (() => {
    if (item.badgeKey === "notifications") return unreadNotifications;
    if (item.badgeKey === "myOrders") return myOrdersBadge;
    return item.badge || 0;
  })();

  const isSubmenuOpen = openSubmenus[item.submenuKey];

  return (
    <div key={item.name}>
      {item.hasSubmenu ? (
        <>
          <button
            onClick={() => toggleSubmenu(item.submenuKey)}
            className={`
              w-full flex items-center px-3 py-3 rounded-lg mb-1
              transition-colors duration-150
              ${isActive(item.to)
                ? "bg-indigo-50 text-indigo-700 font-medium"
                : "text-gray-600 hover:bg-gray-50"}
              ${sidebarCollapsed ? "justify-center" : ""}
            `}
            title={item.name}
          >
            <div className="relative">
              <item.icon
                className={`h-5 w-5 ${
                  isActive(item.to) ? "text-indigo-600" : "text-gray-600"
                }`}
              />
              {badgeCount > 0 && (
                <span className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-xs rounded-full bg-red-500 text-white">
                  {badgeCount}
                </span>
              )}
            </div>
            {!sidebarCollapsed && (
              <>
                <span className="ml-3 flex-1 text-left">{item.name}</span>
                {isSubmenuOpen ? (
                  <ChevronUp className="h-4 w-4 text-gray-500" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                )}
              </>
            )}
          </button>
          {isSubmenuOpen && (
            <div
              className={`${
                sidebarCollapsed ? "flex flex-col items-center" : "ml-8"
              } space-y-1`}
            >
              {item.subLinks.map((sub) => {
                const subBadgeCount = sub.badgeSubKey
                  ? orderSubNotifications[sub.badgeSubKey]
                  : 0;
                return (
                  <Link
                    key={sub.name}
                    to={sub.to}
                    className={`
                      flex items-center px-3 py-2 rounded-lg text-sm
                      transition-colors duration-150
                      ${isActive(sub.to)
                        ? "bg-indigo-50 text-indigo-700 font-medium"
                        : "text-gray-600 hover:bg-gray-50"}
                      ${sidebarCollapsed ? "justify-center" : ""}
                    `}
                    title={sub.name}
                    onClick={() => handleSubNavClick(sub)}
                  >
                    <div className="relative">
                      <sub.icon className="h-4 w-4" />
                      {sidebarCollapsed && subBadgeCount > 0 && (
                        <span className="absolute -top-2 -right-2 h-4 w-4 flex items-center justify-center text-xs rounded-full bg-red-500 text-white">
                          {subBadgeCount}
                        </span>
                      )}
                    </div>
                    {!sidebarCollapsed && (
                      <>
                        <span className="ml-3">{sub.name}</span>
                        {subBadgeCount > 0 && (
                          <span
                            className={`ml-auto px-2 py-0.5 text-xs rounded-full ${
                              orderBadgeColors[sub.badgeSubKey] ||
                              "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {subBadgeCount}
                          </span>
                        )}
                      </>
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
            flex items-center px-3 py-3 rounded-lg mb-1
            transition-colors duration-150
            ${item.name === "New Order"
              ? "bg-gradient-to-r from-emerald-200 to-teal-200 text-emerald-700 font-medium shadow-sm"
              : isActive(item.to)
              ? "bg-indigo-50 text-indigo-700 font-medium"
              : "text-gray-600 hover:bg-gray-50"}
            ${sidebarCollapsed ? "justify-center" : ""}
          `}
          title={item.name === "New Order" ? "Start a new order" : item.name}
          onClick={() => handleNavClick(item)}
        >
          <div className="relative">
            <item.icon
              className={`h-5 w-5 ${
                item.name === "New Order"
                  ? "text-emerald-600"
                  : isActive(item.to)
                  ? "text-indigo-600"
                  : "text-gray-600"
              }`}
            />
            {badgeCount > 0 && (
              <span className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-xs rounded-full bg-red-500 text-white">
                {badgeCount}
              </span>
            )}
          </div>
          {!sidebarCollapsed && (
            <>
              <span className="ml-3">{item.name}</span>
              {badgeCount > 0 && item.name !== "Dashboard" && (
                <span className="ml-auto px-2 py-0.5 text-xs rounded-full bg-red-100 text-red-800">
                  {badgeCount}
                </span>
              )}
            </>
          )}
        </Link>
      )}
    </div>
  );
}