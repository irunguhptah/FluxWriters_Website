import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layouts & Providers
import { AuthProvider } from "./context/AuthContext";
import AuthLayout from "./components/auth/AuthLayout";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import DashboardLayout from "./pages/client/dashboard/DashboardLayout.jsx";

// Auth Pages
import Landing from "./pages/landingPage/Landing";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";

// Dashboard Pages
import Dashboard from "./pages/client/dashboard/DashboardHome.jsx";
import Notifications from "./pages/public/notifications/NotificationsPage.jsx";
import HelpCenter from "./pages/public/helpcenter/HelpCenter.jsx";
import UserAccount from "./pages/client/account/AccountPage.jsx";

// Writers
import WritersOverview from "./pages/client/writers/WritersOverview";
import WritersPage from "./pages/client/writers/WritersPage";
import FavoriteWriters from "./pages/client/writers/FavoriteWriters";
import WriterDetails from "./pages/client/writers/WriterDetails";

// Orders
import OrdersOverview from "./pages/client/orders/OrdersOverview";
import NewOrder from "./pages/client/orders/NewOrder/NewOrder";
import InProgressOrders from "./pages/client/orders/InProgressOrders.jsx";
import CompletedOrders from "./pages/client/orders/CompletedOrders";
import CancelledOrders from "./pages/client/orders/CancelledOrders";
import RevisionOrders from "./pages/client/orders/RevisionOrders";
import DisputedOrders from "./pages/client/orders/DisputedOrders";
import OrderConfirmation from "./pages/client/orders/OrderConfirmation.jsx";
import DraftOverview from "./pages/client/orders/DraftOverview.jsx";
import Draft from "./pages/client/orders/Draft.jsx";
import OrderDetails from "./pages/client/orders/OrderDetails";
import CompletedOrderDetails from "./pages/client/orders/CompletedOrderDetails.jsx";
import CancelledOrderDetails from "./pages/client/orders/CancelledOrderDetails.jsx";
import RevisionOrderDetails from "./pages/client/orders/RevisionOrderDetails.jsx";
import DisputedOrderDetails from "./pages/client/orders/DisputedOrderDetails.jsx";
// import Messages from './pages/client/Messages';

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>

          {/* Protected Dashboard Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="new-order" element={<NewOrder />} />
              <Route
                path="order-confirmation"
                element={<OrderConfirmation />}
              />

              {/* Writers */}
              <Route path="writers">
                <Route index element={<WritersOverview />} />
                <Route path="all" element={<WritersPage />} />
                <Route path="favorites" element={<FavoriteWriters />} />
                <Route
                  path="/dashboard/writers/all/:id"
                  element={<WriterDetails />}
                />
              </Route>

              {/* Orders */}
              <Route path="orders">
                <Route index element={<OrdersOverview />} />
                <Route path="in-progress" element={<InProgressOrders />} />
                <Route
                  path="/dashboard/orders/in-progress/:orderId"
                  element={<OrderDetails />}
                />
                <Route path="completed" element={<CompletedOrders />} />
                <Route
                  path="/dashboard/orders/completed/:orderId"
                  element={<CompletedOrderDetails />}
                />
                <Route path="cancelled" element={<CancelledOrders />} />
                <Route
                  path="/dashboard/orders/cancelled/:orderId"
                  element={<CancelledOrderDetails />}
                />
                <Route path="revision" element={<RevisionOrders />} />
                <Route
                  path="/dashboard/orders/revision/:orderId"
                  element={<RevisionOrderDetails />}
                />
                <Route path="disputed" element={<DisputedOrders />} />
                <Route
                  path="/dashboard/orders/disputed/:orderId"
                  element={<DisputedOrderDetails />}
                />
                <Route path="drafts" element={<DraftOverview />} />
                <Route
                  path="/dashboard/orders/drafts/:id"
                  element={<Draft />}
                />
              </Route>

              {/* Other Dashboard Pages */}
              <Route path="notifications" element={<Notifications />} />
              <Route path="account" element={<UserAccount />} />
              <Route path="help-center" element={<HelpCenter />} />
              {/* <Route path="messages" element={<Messages />} /> */}
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}
