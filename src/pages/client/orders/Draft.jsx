import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  FileText,
  Users,
  Clock,
  Mail,
  Search,
  Star,
  ChevronDown,
  Plus,
  AlertCircle,
  CheckCircle,
  XCircle,
  Download,
  Edit,
  Trash2,
  MessageSquare,
  BarChart2,
  Award,
  DollarSign,
  Calendar,
  ArrowLeft,
} from "lucide-react";
import WriterCard from "../../../components/Card/WriterCard";
import InviteWriterModal from "../../../components/modals/InviteWriterModal";
import ProgressTracker from "../../../components/Loader/ProgressTracker";
import WriterChatPreview from "../../../components/Card/WriterChatPreview";
import OrderFormContainer from "../../../components/layout/OrderFormContainer"; // Adjust path if needed

export default function OrderDraftPage() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [activeTab, setActiveTab] = useState("bids");
  const [bids, setBids] = useState([]);
  const [invitedWriters, setInvitedWriters] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("rating");
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    avgBid: 0,
    minBid: 0,
    maxBid: 0,
    responseRate: 0,
  });
  const [activeChat, setActiveChat] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);

  // Load order from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("orderFormData");
    if (saved) {
      try {
        setOrder(JSON.parse(saved));
      } catch {
        console.error("Failed to parse order data");
      }
    }
  }, [id]);

  // Calculate time remaining
  const deadline = order ? new Date(order.deadline) : new Date();
  const timeRemaining = Math.ceil(
    (deadline - new Date()) / (1000 * 60 * 60 * 24)
  );

  // Fetch bids, invited writers, and statistics
  useEffect(() => {
    if (!order) return;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [bidsRes, invitedRes, statsRes] = await Promise.all([
          fetch(`/api/orders/${order.id}/bids`),
          fetch(`/api/orders/${order.id}/invited-writers`),
          fetch(`/api/orders/${order.id}/stats`),
        ]);

        const bidsData = await bidsRes.json();
        setBids(bidsData);

        const invitedData = await invitedRes.json();
        setInvitedWriters(invitedData);

        const statsData = await statsRes.json();
        setStats(statsData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    // Set up refresh interval for real-time updates
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [order?.id, order]);

  // Filter and sort bids
  const filteredBids = bids
    .filter(
      (bid) =>
        bid.writer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bid.writer.specialties.some((s) =>
          s.toLowerCase().includes(searchQuery.toLowerCase())
        )
    )
    .sort((a, b) => {
      if (sortOption === "rating") return b.writer.rating - a.writer.rating;
      if (sortOption === "price") return a.price - b.price;
      if (sortOption === "completion")
        return b.writer.completedOrders - a.writer.completedOrders;
      if (sortOption === "response")
        return b.writer.responseTime - a.writer.responseTime;
      return 0;
    });

  const handleAcceptBid = async (bidId) => {
    try {
      const response = await fetch(`/api/orders/${order.id}/accept-bid`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bidId }),
      });

      if (response.ok) {
        // Update local storage and redirect
        localStorage.removeItem("orderFormData");
        window.location.href = `/dashboard/orders/${order.id}`;
      }
    } catch (error) {
      console.error("Failed to accept bid:", error);
    }
  };

  const handleInviteWriters = async (writerIds) => {
    try {
      const response = await fetch(`/api/orders/${order.id}/invite-writers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ writerIds }),
      });

      if (response.ok) {
        const newInvites = await response.json();
        setInvitedWriters([...invitedWriters, ...newInvites]);
        setIsInviteModalOpen(false);
      }
    } catch (error) {
      console.error("Failed to invite writers:", error);
    }
  };

  const handleEditOrder = () => {
    // Save current state to localStorage before editing
    localStorage.setItem("orderFormData", JSON.stringify(order));
    window.location.href = `/dashboard/orders/${order.id}/edit`;
  };

  const handleCancelOrder = async () => {
    setShowCancelModal(true);
  };

  const confirmCancelOrder = async () => {
    try {
      const response = await fetch(`/api/orders/${order.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        localStorage.removeItem("orderFormData");
        window.location.href = "/dashboard/orders";
      }
    } catch (error) {
      console.error("Failed to cancel order:", error);
    } finally {
      setShowCancelModal(false);
    }
  };

  const handleRemoveInvite = (writerId) => {
    try {
      // Update invitedWriters state by filtering out the removed writer
      const updatedInvitedWriters = order.invitedWriters.filter(
        (writer, index) => (writer.id || index) !== writerId
      );

      // Update the order object with the new invitedWriters array
      const updatedOrder = {
        ...order,
        invitedWriters: updatedInvitedWriters,
      };

      // Update state
      setOrder(updatedOrder);
      setInvitedWriters(updatedInvitedWriters);

      // Save to localStorage
      localStorage.setItem("orderFormData", JSON.stringify(updatedOrder));

      // If you have an API endpoint, you would call it here
      // const response = await fetch(`/api/orders/${order.id}/invited-writers/${writerId}`, {
      //   method: "DELETE",
      // });
    } catch (error) {
      console.error("Failed to remove invited writer:", error);
    }
  };

  // Update invited writers when order changes
  useEffect(() => {
    if (!order) return;
    setIsLoading(false);
    setInvitedWriters(order.invitedWriters || []);
    // Optionally setBids([]) and setStats({ ... }) if you want to clear them
  }, [order]);

  const handleHireWriter = async (writer) => {
    try {
      // If using API:
      // const response = await fetch(`/api/orders/${order.id}/hire-writer`, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ writerId: writer.id }),
      // });

      // For now just show an alert:
      alert(
        `Hiring ${
          writer.name || "Writer"
        }. In a real app, this would create a contract.`
      );

      // If you want to simulate success and redirect:
      // window.location.href = `/dashboard/orders/${order.id}`;
    } catch (error) {
      console.error("Failed to hire writer:", error);
    }
  };

  if (!order) {
    return (
      <OrderFormContainer>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden p-8 text-center">
          <h2 className="text-xl font-medium text-gray-900">Order not found</h2>
          <p className="mt-2 text-gray-500">
            The order you're looking for doesn't exist or has been deleted.
          </p>
        </div>
      </OrderFormContainer>
    );
  }

  return (
    <OrderFormContainer>
      {/* Back button and title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 gap-2 sm:gap-0">
        <button
          onClick={() => window.history.back()}
          className="flex items-center text-blue-600 hover:text-blue-800 mr-0 sm:mr-4"
        >
          <ArrowLeft className="h-5 w-5 mr-1" />
          Back
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Order Details</h1>
      </div>

      {/* Order Summary Card with Progress Tracker */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
        <div className="p-4 sm:p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {order.title}
                </h1>
                <div className="flex space-x-2">
                  <button
                    onClick={handleEditOrder}
                    className="p-2 text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-md"
                    title="Edit order"
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                  <button
                    onClick={handleCancelOrder}
                    className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-md"
                    title="Cancel order"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center text-sm text-gray-500 gap-y-2 gap-x-4">
                <span className="flex items-center">
                  <FileText className="h-4 w-4 mr-1" />
                  {order.type}
                </span>
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  Due in {timeRemaining} days
                </span>
                <span>{order.pages} pages</span>
                <span className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-1" />
                  Budget: ${order.budget?.toFixed(2) || "Not specified"}
                </span>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                Draft - Awaiting Writer
              </span>
            </div>
          </div>

          {/* Progress tracker */}
          <div className="mt-4 sm:mt-6">
            <ProgressTracker currentStep={1} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column - Writer Selection */}
        <div className="w-full lg:w-2/3">
          {/* Tabs with statistics */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab("bids")}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "bids"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <span className="flex items-center">
                  <Users className="mr-2 h-4 w-4" />
                  Writer Bids ({bids.length})
                </span>
              </button>
              <button
                onClick={() => setActiveTab("invited")}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "invited"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <span className="flex items-center">
                  <Mail className="mr-2 h-4 w-4" />
                  Invited Writers ({invitedWriters.length})
                </span>
              </button>
              <button
                onClick={() => setActiveTab("messages")}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "messages"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <span className="flex items-center">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Messages
                </span>
              </button>
            </nav>
          </div>

          {/* Bid Statistics */}
          {activeTab === "bids" && bids.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-xs">
                <div className="flex items-center">
                  <BarChart2 className="h-5 w-5 text-blue-500 mr-2" />
                  <span className="text-sm font-medium text-gray-500">
                    Avg. Bid
                  </span>
                </div>
                <p className="mt-1 text-xl font-semibold text-gray-900">
                  ${stats.avgBid?.toFixed(2) || "0.00"}
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-xs">
                <div className="flex items-center">
                  <Award className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-sm font-medium text-gray-500">
                    Lowest Bid
                  </span>
                </div>
                <p className="mt-1 text-xl font-semibold text-gray-900">
                  ${stats.minBid?.toFixed(2) || "0.00"}
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-xs">
                <div className="flex items-center">
                  <Award className="h-5 w-5 text-red-500 mr-2" />
                  <span className="text-sm font-medium text-gray-500">
                    Highest Bid
                  </span>
                </div>
                <p className="mt-1 text-xl font-semibold text-gray-900">
                  ${stats.maxBid?.toFixed(2) || "0.00"}
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-xs">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-purple-500 mr-2" />
                  <span className="text-sm font-medium text-gray-500">
                    Response Rate
                  </span>
                </div>
                <p className="mt-1 text-xl font-semibold text-gray-900">
                  {stats.responseRate}%
                </p>
              </div>
            </div>
          )}

          {/* Search and Sort */}
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative rounded-md shadow-sm w-full sm:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 border"
                placeholder={
                  activeTab === "messages"
                    ? "Search messages..."
                    : "Search writers..."
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {activeTab !== "messages" && (
              <div className="flex items-center">
                <label htmlFor="sort" className="mr-2 text-sm text-gray-600">
                  Sort by:
                </label>
                <div className="relative">
                  <select
                    id="sort"
                    className="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-8 py-1 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                  >
                    <option value="rating">Highest Rating</option>
                    <option value="price">Lowest Price</option>
                    <option value="completion">Most Completed</option>
                    <option value="response">Fastest Response</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Content based on active tab */}
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : activeTab === "bids" ? (
            filteredBids.length > 0 ? (
              <div className="space-y-4">
                {filteredBids.map((bid) => (
                  <WriterCard
                    key={bid.id}
                    writer={bid.writer}
                    bid={bid}
                    onAccept={() => handleAcceptBid(bid.id)}
                    onMessage={() => setActiveChat(bid.writer.id)}
                    onHire={() => handleHireWriter(bid.writer)} // Add hire handler
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                icon={<Users className="mx-auto h-12 w-12 text-gray-400" />}
                title="No bids yet"
                description="Invite writers or wait for bids to come in."
                action={() => setIsInviteModalOpen(true)}
                actionText="Invite Writers"
              />
            )
          ) : activeTab === "invited" ? (
            order.invitedWriters && order.invitedWriters.length > 0 ? (
              <div className="space-y-4">
                {order.invitedWriters.map((writer, idx) => (
                  <div
                    key={writer.id || idx}
                    className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start">
                      <div className="flex-shrink-0 mr-4 mb-4 sm:mb-0">
                        <div className="relative">
                          <div className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold text-xl">
                            {writer.name ? writer.name.charAt(0) : "?"}
                          </div>
                          {writer.isOnline && (
                            <span className="absolute bottom-0 right-0 block h-4 w-4 rounded-full ring-2 ring-white bg-green-400" />
                          )}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                          <div>
                            <h4 className="text-lg font-medium text-gray-900 flex items-center">
                              {writer.name || "Unknown Writer"}
                              {writer.verified && (
                                <CheckCircle
                                  className="h-4 w-4 text-blue-500 ml-1"
                                  title="Verified Writer"
                                />
                              )}
                            </h4>
                            <div className="mt-1 flex items-center">
                              <div className="flex items-center">
                                <Star className="h-4 w-4 text-yellow-400" />
                                <span className="ml-1 text-sm font-medium text-gray-700">
                                  {writer.rating || "4.8"} (
                                  {writer.reviews || "24"} reviews)
                                </span>
                              </div>
                              <span className="mx-2 text-gray-300">•</span>
                              <span className="text-sm text-gray-500">
                                {writer.completedOrders || "56"} orders
                                completed
                              </span>
                            </div>
                          </div>
                          <div className="mt-3 sm:mt-0 flex items-center gap-2">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              Invited
                            </span>
                            <button
                              onClick={() =>
                                handleRemoveInvite(writer.id || idx)
                              }
                              className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                              title="Remove invitation"
                            >
                              <XCircle className="h-5 w-5" />
                            </button>
                          </div>
                        </div>

                        {writer.specialties && (
                          <div className="mt-3">
                            <h5 className="text-sm font-medium text-gray-700">
                              Expertise:
                            </h5>
                            <div className="mt-1 flex flex-wrap gap-1">
                              {writer.specialties.map((specialty, index) => (
                                <span
                                  key={index}
                                  className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-800"
                                >
                                  {specialty}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {writer.bio && (
                          <p className="mt-3 text-sm text-gray-600 line-clamp-2">
                            {writer.bio}
                          </p>
                        )}

                        <div className="mt-4 flex flex-wrap gap-2">
                          <button
                            onClick={() => handleHireWriter(writer)}
                            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                          >
                            <Users className="h-3.5 w-3.5 mr-1.5" />
                            Hire Now
                          </button>
                          <button
                            onClick={() => setActiveChat(writer.id)}
                            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            <MessageSquare className="h-3.5 w-3.5 mr-1.5" />
                            Message
                          </button>
                          <button
                            onClick={() =>
                              window.open(
                                `/dashboard/writers/${writer.id}`,
                                "_blank"
                              )
                            }
                            className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            <FileText className="h-3.5 w-3.5 mr-1.5" />
                            View Profile
                          </button>
                          <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            <Clock className="h-3.5 w-3.5 mr-1.5" />
                            {writer.responseTime || "< 2 hrs"} response time
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                icon={<Mail className="mx-auto h-12 w-12 text-gray-400" />}
                title="No invited writers"
                description="Invite qualified writers to bid on your order."
                action={() => setIsInviteModalOpen(true)}
                actionText="Invite Writers"
              />
            )
          ) : activeTab === "messages" ? (
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              {activeChat ? (
                <div className="p-4">
                  <div className="flex justify-between items-center border-b pb-3 mb-3">
                    <h3 className="font-medium">Chat with Writer</h3>
                    <button
                      onClick={() => setActiveChat(null)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      Back to all messages
                    </button>
                  </div>
                  {/* Chat interface would go here */}
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    Chat interface would be implemented here
                  </div>
                </div>
              ) : (
                <div className="p-6 text-center">
                  <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">
                    No active conversations
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Select a writer to start chatting
                  </p>
                </div>
              )}
            </div>
          ) : null}
        </div>

        {/* Right Column - Order Details */}
        <div className="w-full lg:w-1/3 space-y-6">
          {/* Order Details Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">
                Order Details
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-1">
                    Instructions
                  </h3>
                  <p className="text-sm text-gray-700 whitespace-pre-line bg-gray-50 p-3 rounded">
                    {order.instructions ||
                      "No additional instructions provided."}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-1">
                    Deadline
                  </h3>
                  <div className="flex items-center text-sm text-gray-700">
                    <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                    {new Date(order.deadline).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                </div>

                {order.files && order.files.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">
                      Attached Files ({order.files.length})
                    </h3>
                    <ul className="border border-gray-200 rounded-lg divide-y divide-gray-200">
                      {order.files.map((file, index) => (
                        <li
                          key={index}
                          className="pl-3 pr-4 py-3 flex items-center justify-between text-sm"
                        >
                          <div className="w-0 flex-1 flex items-center">
                            <FileText className="flex-shrink-0 h-5 w-5 text-gray-400" />
                            <span className="ml-2 flex-1 w-0 truncate">
                              {file.name}
                            </span>
                          </div>
                          <div className="ml-4 flex-shrink-0">
                            <a
                              href={file.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-medium text-blue-600 hover:text-blue-500"
                            >
                              <Download className="h-5 w-5" />
                            </a>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
              <button
                onClick={() => setIsInviteModalOpen(true)}
                className="w-full flex justify-center items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500 focus:outline-none"
              >
                <Mail className="-ml-1 mr-2 h-5 w-5" />
                Invite Writers to Bid
              </button>
            </div>
          </div>

          {/* Quick Actions Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">
                Quick Actions
              </h2>
            </div>
            <div className="p-4">
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => setIsInviteModalOpen(true)}
                    className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                  >
                    <Plus className="h-5 w-5 text-gray-400 mr-2" />
                    Invite More Writers
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleEditOrder}
                    className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                  >
                    <Edit className="h-5 w-5 text-gray-400 mr-2" />
                    Edit Order Details
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleCancelOrder}
                    className="w-full flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md"
                  >
                    <Trash2 className="h-5 w-5 text-red-400 mr-2" />
                    Cancel Order
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Writer Chat Preview */}
          {activeTab !== "messages" && (
            <WriterChatPreview
              writers={[
                ...bids.map((b) => b.writer),
                ...invitedWriters, // invitedWriters are writer objects from local storage
              ]}
              onSelectWriter={setActiveChat}
            />
          )}
        </div>
      </div>

      {/* Invite Writer Modal */}
      <InviteWriterModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        onInvite={handleInviteWriters}
        order={order}
        alreadyInvited={invitedWriters.map((i) => i.orderId || i.id)}
      />

      {/* Cancel Confirmation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
            <div className="flex items-center mb-4">
              <AlertCircle className="h-6 w-6 text-red-500 mr-2" />
              <span className="font-semibold text-lg text-gray-900">
                Cancel Order
              </span>
            </div>
            <p className="text-gray-700 mb-6">
              Are you sure you want to cancel this order? This action cannot be
              undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowCancelModal(false)}
                className="px-4 py-2 rounded bg-gray-100 text-gray-700 hover:bg-gray-200"
              >
                No, Keep Order
              </button>
              <button
                onClick={confirmCancelOrder}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </OrderFormContainer>
  );
}

// Helper component for empty states
function EmptyState({ icon, title, description, action, actionText }) {
  return (
    <div className="text-center py-12">
      {icon}
      <h3 className="mt-2 text-sm font-medium text-gray-900">{title}</h3>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
      {action && (
        <div className="mt-6">
          <button
            onClick={action}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500 focus:outline-none"
          >
            <Mail className="-ml-1 mr-2 h-5 w-5" />
            {actionText}
          </button>
        </div>
      )}
    </div>
  );
}
