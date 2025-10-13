import { useState } from "react";
import {
  User,
  Lock,
  CreditCard,
  Bell,
  Shield,
  LogOut,
  Edit,
  Check,
  X,
  Eye,
  EyeOff,
  Upload,
  Clock,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  // Sample user data
  const [userData, setUserData] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "+1 (555) 123-4567",
    avatar: "/default-avatar.png",
    joinedDate: "January 15, 2022",
  });

  const [securityForm, setSecurityForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSecurityChange = (e) => {
    const { name, value } = e.target;
    setSecurityForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };

  const handlePasswordUpdate = () => {
    if (!securityForm.currentPassword) {
      toast.error("Please enter your current password.");
      return;
    }
    if (securityForm.newPassword !== securityForm.confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }
    toast.success("Password updated successfully!");
    setSecurityForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const handleLogout = () => {
    toast("Signed out!", { icon: "👋" });
  };

  return (
    <div className="max-w-full overflow-x-hidden bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
      <Toaster position="top-center" />

      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-800 px-4 py-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          My Account
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Manage your profile and settings
        </p>
      </div>

      {/* Mobile-friendly Tabs Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-800 px-2">
        <nav className="flex space-x-1 overflow-x-auto pb-0.5 scrollbar-hide">
          {[
            { id: "profile", icon: User, label: "Profile" },
            { id: "security", icon: Lock, label: "Security" },
            { id: "billing", icon: CreditCard, label: "Billing" },
            { id: "notifications", icon: Bell, label: "Notifications" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                // Remove tab switch toast - active tab is visually clear
              }}
              className={`px-3 py-3 text-xs font-medium whitespace-nowrap rounded-t-lg ${
                activeTab === tab.id
                  ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 bg-blue-50/50 dark:bg-gray-800"
                  : "text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white"
              }`}
            >
              <div className="flex flex-col items-center gap-1">
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </div>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-4">
        {/* PROFILE TAB */}
        {activeTab === "profile" && (
          <div className="space-y-4">
            <div className="flex flex-col items-center gap-4">
              {/* Avatar Upload */}
              <div className="relative group">
                <img
                  src={userData.avatar}
                  alt="Profile"
                  className="h-20 w-20 rounded-full object-cover border-2 border-white dark:border-gray-800 shadow-md"
                />
                {isEditing && (
                  <label className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <Upload className="h-5 w-5 text-white" />
                    <input type="file" className="hidden" />
                  </label>
                )}
              </div>

              {/* Profile Info */}
              <div className="w-full space-y-3">
                {isEditing ? (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={userData.name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={userData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:text-white"
                      />
                    </div>
                  </>
                ) : (
                  <div className="text-center sm:text-left">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                      {userData.name}
                    </h2>
                    <div className="mt-2 space-y-2 text-sm text-gray-600 dark:text-gray-300">
                      <p className="flex items-center justify-center sm:justify-start gap-2">
                        <User className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                        {userData.email}
                      </p>
                      <p className="flex items-center justify-center sm:justify-start gap-2">
                        <CreditCard className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                        {userData.phone}
                      </p>
                      <p className="flex items-center justify-center sm:justify-start gap-2">
                        <Clock className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                        Member since {userData.joinedDate}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-center sm:justify-end gap-2">
              {isEditing ? (
                <>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <X className="h-4 w-4 inline mr-1" /> Cancel
                  </button>
                  <button
                    onClick={handleSaveProfile}
                    className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <Check className="h-4 w-4 inline mr-1" /> Save
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Edit className="h-4 w-4 inline mr-1" /> Edit Profile
                </button>
              )}
            </div>
          </div>
        )}

        {/* SECURITY TAB */}
        {activeTab === "security" && (
          <div className="space-y-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-900 rounded-lg border border-blue-100 dark:border-blue-800">
              <div className="flex items-start gap-2">
                <Shield className="h-5 w-5 text-blue-500 dark:text-blue-300 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">
                    Security Tips
                  </h3>
                  <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                    Use a strong password and enable two-factor authentication.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    name="currentPassword"
                    value={securityForm.currentPassword}
                    onChange={handleSecurityChange}
                    className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-lg pr-10 dark:bg-gray-900 dark:text-white"
                  />
                  <button
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showCurrentPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    name="newPassword"
                    value={securityForm.newPassword}
                    onChange={handleSecurityChange}
                    className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-lg pr-10 dark:bg-gray-900 dark:text-white"
                  />
                  <button
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showNewPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={securityForm.confirmPassword}
                  onChange={handleSecurityChange}
                  className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-900 dark:text-white"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handlePasswordUpdate}
                disabled={
                  !securityForm.newPassword ||
                  securityForm.newPassword !== securityForm.confirmPassword
                }
                className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Update Password
              </button>
            </div>
          </div>
        )}

        {/* BILLING TAB */}
        {activeTab === "billing" && (
          <div className="space-y-4">
            <div className="p-3 bg-green-50 dark:bg-green-900 rounded-lg border border-green-100 dark:border-green-800">
              <div className="flex items-start gap-2">
                <CreditCard className="h-5 w-5 text-green-500 dark:text-green-300 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-medium text-green-800 dark:text-green-200">
                    Billing
                  </h3>
                  <p className="text-xs text-green-700 dark:text-green-300 mt-1">
                    View your payment history and manage billing.
                  </p>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <div className="min-w-[300px] border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                  <thead className="bg-gray-50 dark:bg-gray-900">
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300">
                        Date
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300">
                        Order
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                    <tr>
                      <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500 dark:text-gray-300">
                        2023-07-15
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-xs font-medium text-blue-600 dark:text-blue-400">
                        #78946
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500 dark:text-gray-300">
                        $95.00
                      </td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500 dark:text-gray-300">
                        2023-06-30
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-xs font-medium text-blue-600 dark:text-blue-400">
                        #78947
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500 dark:text-gray-300">
                        $120.00
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* NOTIFICATIONS TAB */}
        {activeTab === "notifications" && (
          <div className="space-y-4">
            <div className="p-3 bg-purple-50 dark:bg-purple-900 rounded-lg border border-purple-100 dark:border-purple-800">
              <div className="flex items-start gap-2">
                <Bell className="h-5 w-5 text-purple-500 dark:text-purple-300 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-medium text-purple-800 dark:text-purple-200">
                    Notifications
                  </h3>
                  <p className="text-xs text-purple-700 dark:text-purple-300 mt-1">
                    Manage how you receive updates.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {[
                {
                  label: "Order Updates",
                  description: "Status changes",
                  checked: true,
                },
                {
                  label: "Promotions",
                  description: "Discounts and offers",
                  checked: true,
                },
                {
                  label: "Writer Messages",
                  description: "Direct communications",
                  checked: true,
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between p-2 border border-gray-200 dark:border-gray-800 rounded-lg"
                >
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                      {item.label}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-300">
                      {item.description}
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      defaultChecked={item.checked}
                    />
                    <div className="w-9 h-5 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white dark:after:bg-gray-900 after:border-gray-300 dark:after:border-gray-700 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600 dark:peer-checked:bg-blue-500"></div>
                  </label>
                </div>
              ))}
            </div>

            <div className="flex justify-end">
              <button
                className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                onClick={() => toast.success("Preferences saved!")}
              >
                Save
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Logout Button */}
      <div className="border-t border-gray-200 dark:border-gray-800 px-4 py-3 text-center">
        <button
          className="flex items-center justify-center gap-2 text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 mx-auto"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </div>
  );
}
