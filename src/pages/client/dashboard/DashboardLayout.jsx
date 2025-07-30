import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import {
  Home,
  FileText,
  Clock,
  CheckCircle,
  MessageSquare,
  Bell,
  HelpCircle,
  User,
  PlusCircle,
  X as XIcon,
  Edit3 as EditIcon,
  Users,
  Star,
} from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import toast from "react-hot-toast";
import DashboardLayoutContainer from "../../../components/layout/DashboardLayoutContainer";


const orderSubNotifications = {
  inprogress: 2,
  completed: 5,
  cancelled: 1,
  revision: 1,
  disputed: 0,
  draft: 0,
};
const orderBadgeColors = {
  inprogress: "bg-blue-100 text-yellow-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-200 text-gray-700",
  revision: "bg-yellow-100 text-blue-800",
  disputed: "bg-purple-100 text-red-800",
  draft: "bg-gray-100 text-gray-800",
};

const navLinks = [
  { name: "Dashboard", to: "/dashboard", icon: Home },
  {
    name: "Notifications",
    to: "/dashboard/notifications",
    icon: Bell,
    badgeKey: "notifications",
  },
  { name: "New Order", to: "/dashboard/new-order", icon: PlusCircle },
  {
    name: "My Orders",
    to: "/dashboard/orders",
    icon: FileText,
    badgeKey: "myOrders",
    hasSubmenu: true,
    submenuKey: "orders",
    subLinks: [
      {
        name: "Draft",
        to: "/dashboard/orders/drafts",
        icon: FileText,
        badgeSubKey: "draft",
      },
      {
        name: "In Progress",
        to: "/dashboard/orders/in-progress",
        icon: Clock,
        badgeSubKey: "inprogress",
      },
      {
        name: "Completed",
        to: "/dashboard/orders/completed",
        icon: CheckCircle,
        badgeSubKey: "completed",
      },
      {
        name: "Revision",
        to: "/dashboard/orders/revision",
        icon: EditIcon, // <-- Use EditIcon instead of Edit3
        badgeSubKey: "revision",
      },
      {
        name: "Disputed",
        to: "/dashboard/orders/disputed",
        icon: HelpCircle,
        badgeSubKey: "disputed",
      },
      {
        name: "Cancelled",
        to: "/dashboard/orders/cancelled",
        icon: XIcon,
        badgeSubKey: "cancelled",
      },
    ],
  },
  {
    name: "Writers",
    to: "/dashboard/writers",
    icon: Users,
    hasSubmenu: true,
    submenuKey: "writers",
    subLinks: [
      { name: "All Writers", to: "/dashboard/writers/all", icon: Users },
      {
        name: "Favorite Writers",
        to: "/dashboard/writers/favorites",
        icon: Star,
      },
    ],
  },
];

const additionalPages = [
  { name: "Messages", path: "/dashboard/messages" },
  { name: "Help Center", path: "/dashboard/help-center" },
  { name: "My Account", path: "/dashboard/account" },
];

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [sidebarCollapsed, setSidebarCollapsed] = useState(
    window.innerWidth < 768
  );
  const [unreadNotifications, setUnreadNotifications] = useState(3);
  const [activeChats, setActiveChats] = useState(2);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [openSubmenus, setOpenSubmenus] = useState({
    orders: true,
    writers: false,
  });
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(() => {
    if (typeof window === "undefined") return false;
    return (
      localStorage.getItem("theme") === "dark" ||
      (!localStorage.getItem("theme") &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  });
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setSidebarCollapsed(mobile);
    };
    const handleScroll = () => setScrolled(window.scrollY > 10);

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const myOrdersBadge = Object.values(orderSubNotifications).reduce(
    (a, b) => a + b,
    0
  );

  const isActive = useCallback(
    (path) => location.pathname.startsWith(path),
    [location.pathname]
  );

  const getCurrentPageTitle = () => {
    for (const link of navLinks) {
      if (link.hasSubmenu && link.subLinks) {
        const activeSublink = link.subLinks.find((sub) => isActive(sub.to));
        if (activeSublink) return activeSublink.name;
        if (isActive(link.to) && location.pathname === link.to)
          return link.name;
      } else if (isActive(link.to) && location.pathname === link.to) {
        return link.name;
      }
    }
    const additionalPage = additionalPages.find((page) =>
      location.pathname.startsWith(page.path)
    );
    if (additionalPage) return additionalPage.name;
    return "Dashboard";
  };

  const toggleSidebar = () => {
    setSidebarCollapsed((prev) => {
      const newState = !prev;
      toast(newState ? "Sidebar collapsed." : "Sidebar expanded.", {
        icon: newState ? "⬅️" : "➡️",
        duration: 1200,
      });
      return newState;
    });
  };

  const toggleSubmenu = (key) => {
    setOpenSubmenus((prev) => {
      const newState = { ...prev, [key]: !prev[key] };
      if (key === "orders" && newState[key])
        toast("Browse all your orders by status.", { icon: "📦" });
      else if (key === "writers" && newState[key])
        toast("Find and favorite writers.", { icon: "🧑‍💻" });
      return newState;
    });
  };

  const handleNavClick = (item) => {
    switch (item.name) {
      case "New Order":
        toast("Start a new order here!", { icon: "📝" });
        break;
      case "Notifications":
        toast("View your latest notifications.", { icon: "🔔" });
        break;
      case "Messages":
        toast("Open your messages panel.", { icon: "💬" });
        break;
      case "My Orders":
        toast("Browse all your orders by status.", { icon: "📦" });
        break;
      case "Writers":
        toast("Find and favorite writers.", { icon: "🧑‍💻" });
        break;
      default:
        break;
    }
  };

  const handleSubNavClick = (sub) => {
    toast(`Viewing ${sub.name}.`, { icon: "📄" });
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
    toast("Signed out successfully.", { icon: "👋" });
  };

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen((prev) => !prev);
    if (!mobileSidebarOpen) {
      toast("Menu opened", { icon: "📱", duration: 1000 });
    }
  };

  const handleMobileNavClick = (item) => {
    handleNavClick(item);
    if (isMobile) {
      setMobileSidebarOpen(false);
    }
  };

  const handleMobileSubNavClick = (sub) => {
    handleSubNavClick(sub);
    if (isMobile) {
      setMobileSidebarOpen(false);
    }
  };

  return (
    <DashboardLayoutContainer
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
      mobileSidebarOpen={mobileSidebarOpen}
      setMobileSidebarOpen={setMobileSidebarOpen}
      handleMobileNavClick={handleMobileNavClick}
      handleMobileSubNavClick={handleMobileSubNavClick}
      dark={dark}
      setDark={setDark}
      isMobile={isMobile}
      getCurrentPageTitle={getCurrentPageTitle}
      setIsNotificationsOpen={setIsNotificationsOpen}
      isNotificationsOpen={isNotificationsOpen}
      isChatOpen={isChatOpen}
      setIsChatOpenState={setIsChatOpen}
    >
      <Outlet />
    </DashboardLayoutContainer>
  );
}
