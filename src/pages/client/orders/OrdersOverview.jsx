import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FileText,
  Clock,
  CheckCircle,
  Edit3 as EditIcon,
  HelpCircle,
  X as XIcon,
} from "lucide-react";

const STATUS_LINKS = [
  {
    name: "Draft",
    to: "/dashboard/orders/drafts",
    icon: FileText,
    key: "draft",
  },
  {
    name: "In Progress",
    to: "/dashboard/orders/in-progress",
    icon: Clock,
    key: "inprogress",
  },
  {
    name: "Completed",
    to: "/dashboard/orders/completed",
    icon: CheckCircle,
    key: "completed",
  },
  {
    name: "Revision",
    to: "/dashboard/orders/revision",
    icon: EditIcon,
    key: "revision",
  },
  {
    name: "Disputed",
    to: "/dashboard/orders/disputed",
    icon: HelpCircle,
    key: "disputed",
  },
  {
    name: "Cancelled",
    to: "/dashboard/orders/cancelled",
    icon: XIcon,
    key: "cancelled",
  },
];

const NOTIFICATION_COUNTS = {
  draft: 0,
  inprogress: 2,
  completed: 5,
  revision: 1,
  disputed: 0,
  cancelled: 1,
};

const BADGE_STYLES = {
  draft: "bg-gray-100 text-gray-800",
  inprogress: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
  revision: "bg-amber-100 text-amber-800",
  disputed: "bg-purple-100 text-purple-800",
  cancelled: "bg-red-100 text-red-800",
};

const NavButton = ({ item, isActive, count }) => (
  <Link
    to={item.to}
    className={`flex flex-col items-center justify-center p-3 rounded-lg transition-all
      ${
        isActive
          ? "bg-indigo-50/80 border-2 border-indigo-200"
          : "bg-white dark:bg-gray-800"
      }
      hover:shadow-md hover:-translate-y-1 flex-1 min-w-0`}
    style={{ minWidth: 0, minHeight: 70 }}
  >
    <item.icon
      className={`h-6 w-6 mb-1 ${
        isActive ? "text-indigo-600" : "text-gray-500"
      }`}
    />
    <span
      className={`text-xs truncate ${
        isActive ? "text-indigo-700 font-semibold" : "text-gray-700"
      }`}
    >
      {item.name}
    </span>
    {count > 0 && (
      <span
        className={`mt-1 px-2 py-0.5 text-[10px] rounded-full ${
          BADGE_STYLES[item.key]
        }`}
      >
        {count}
      </span>
    )}
  </Link>
);

export default function OrdersOverview() {
  const { pathname } = useLocation();

  return (
    <div className="space-y-6 mt-4">
      {/* Status Navigation Blocks */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
        {STATUS_LINKS.map((item) => (
          <NavButton
            key={item.key}
            item={item}
            isActive={pathname === item.to}
            count={NOTIFICATION_COUNTS[item.key]}
          />
        ))}
      </div>
    </div>
  );
}
