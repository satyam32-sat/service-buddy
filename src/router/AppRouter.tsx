import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ClientLayout from "../layouts/ClientLayout";
import ProviderLayout from "../layouts/ProviderLayout";
import AdminLayout from "../layouts/AdminLayout";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import Home from "../pages/Home";
import Services from "../pages/Services";
import ServiceDetails from "../pages/ServiceDetails";
import Booking from "../pages/Booking";
import BookingSuccess from "../pages/BookingSuccess";
import Profile from "../pages/Profile";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import BookingDetails from "../pages/BookingDetails";
import ClientDashboard from "../pages/client/Dashboard";
import ProviderDashboard from "../pages/provider/Dashboard";
import ProviderBookingDetails from "../pages/provider/BookingDetails";
import Dashboard from "../pages/admin/Dashboard";
import Users from "../pages/admin/Users";
import Providers from "../pages/admin/Providers";
import AdminServices from "../pages/admin/Services";
import Bookings from "../pages/admin/Bookings";
import Analytics from "../pages/admin/Analytics";
import AdminLogin from "../pages/admin/AdminLogin";

const AppRouter = () => {
  return (
    <Routes>

      {/* ================= PUBLIC WEBSITE ================= */}

      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />

        <Route
          path="/services"
          element={<Services />}
        />

        <Route
          path="/services/:id"
          element={<ServiceDetails />}
        />

        {/* New Booking Form */}
        <Route
          path="/booking/:id"
          element={<Booking />}
        />

        <Route
          path="/booking-success"
          element={<BookingSuccess />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

        {/* Authentication */}
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />
      </Route>


      {/* ================= CLIENT PANEL ================= */}

      <Route
        path="/client"
        element={
          <ProtectedRoute role="client">
            <ClientLayout />
          </ProtectedRoute>
        }
      >
        {/* Client Dashboard */}
        <Route
          path="dashboard"
          element={<ClientDashboard />}
        />

        {/* Existing Booking Details */}
        <Route
          path="booking/:id"
          element={<BookingDetails />}
        />
      </Route>


      {/* ================= PROVIDER PANEL ================= */}

      <Route
        path="/provider"
        element={
          <ProtectedRoute role="provider">
            <ProviderLayout />
          </ProtectedRoute>
        }
      >
        {/* Provider Dashboard */}
        <Route
          path="dashboard"
          element={<ProviderDashboard />}
        />

        {/* Provider Booking Management */}
        <Route
          path="bookings/:id"
          element={<ProviderBookingDetails />}
        />
      </Route>


      {/* ================= ADMIN PANEL ================= */}

      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route
          path="dashboard"
          element={<Dashboard />}
        />

        <Route
          path="users"
          element={<Users />}
        />

        <Route
          path="providers"
          element={<Providers />}
        />

        <Route
          path="services"
          element={<AdminServices />}
        />

        <Route
          path="bookings"
          element={<Bookings />}
        />

        <Route
          path="analytics"
          element={<Analytics />}
        />
      </Route>


      {/* ================= 404 ================= */}

      <Route
        path="*"
        element={<NotFound />}
      />

    </Routes>
  );
};

export default AppRouter;