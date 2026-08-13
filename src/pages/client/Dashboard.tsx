import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/api";
import { useAuth } from "../../context/AuthContext";

interface Booking {
  _id: string;
  bookingDate: string;
  address: string;
  totalAmount: number;
  status: string;
  service?: {
    _id: string;
    title: string;
    category?: string;
  };
  provider?: {
    _id: string;
    name: string;
  };
}

const Dashboard = () => {
  const { user } = useAuth();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user?._id) return;

      try {
        setLoading(true);
        setError("");

        const response = await api.get(
          `/bookings/client/${user._id}`
        );

        setBookings(response.data.bookings || []);
      } catch (error: any) {
        console.error("Dashboard bookings error:", error);

        setError(
          error?.response?.data?.message ||
            "Unable to load your bookings."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user?._id]);

  const stats = useMemo(() => {
    const pending = bookings.filter(
      (booking) =>
        booking.status?.toLowerCase() === "pending"
    ).length;

    const completed = bookings.filter(
      (booking) =>
        booking.status?.toLowerCase() === "completed"
    ).length;

    const cancelled = bookings.filter(
      (booking) =>
        booking.status?.toLowerCase() === "cancelled"
    ).length;

    return {
      total: bookings.length,
      pending,
      completed,
      cancelled,
    };
  }, [bookings]);

  const formatDate = (date: string) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusStyle = (status: string) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-700";

      case "cancelled":
        return "bg-red-100 text-red-700";

      case "accepted":
        return "bg-blue-100 text-blue-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Hero */}
      <section className="bg-gradient-to-r from-gray-950 via-gray-900 to-blue-950 py-14 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 md:flex-row md:items-center md:justify-between">

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
              Client Dashboard
            </p>

            <h1 className="mt-2 text-4xl font-extrabold sm:text-5xl">
              Welcome back, {user?.name || "Client"} 👋
            </h1>

            <p className="mt-4 max-w-2xl text-gray-300">
              Manage your bookings, track services and discover
              trusted professionals.
            </p>
          </div>

          <Link
            to="/services"
            className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-7 py-3.5 font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-blue-700"
          >
            + Book a Service
          </Link>
        </div>
      </section>

      {/* Dashboard Content */}
      <section className="mx-auto max-w-7xl px-6 py-10">

        {/* Stats */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <p className="text-sm font-medium text-gray-500">
              Total Bookings
            </p>

            <h2 className="mt-3 text-4xl font-extrabold text-gray-900">
              {stats.total}
            </h2>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <p className="text-sm font-medium text-gray-500">
              Pending
            </p>

            <h2 className="mt-3 text-4xl font-extrabold text-yellow-500">
              {stats.pending}
            </h2>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <p className="text-sm font-medium text-gray-500">
              Completed
            </p>

            <h2 className="mt-3 text-4xl font-extrabold text-green-600">
              {stats.completed}
            </h2>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <p className="text-sm font-medium text-gray-500">
              Cancelled
            </p>

            <h2 className="mt-3 text-4xl font-extrabold text-red-500">
              {stats.cancelled}
            </h2>
          </div>

        </div>

        {/* Quick Actions */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-gray-900">
            Quick Actions
          </h2>

          <div className="mt-5 grid gap-5 md:grid-cols-3">

            <Link
              to="/services"
              className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-xl">
                🔧
              </div>

              <h3 className="mt-4 text-lg font-bold">
                Browse Services
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Find trusted professionals for your needs.
              </p>

              <span className="mt-4 inline-block font-semibold text-blue-600">
                Explore →
              </span>
            </Link>

            <Link
              to="/profile"
              className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-xl">
                👤
              </div>

              <h3 className="mt-4 text-lg font-bold">
                My Profile
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                View and manage your account information.
              </p>

              <span className="mt-4 inline-block font-semibold text-blue-600">
                View Profile →
              </span>
            </Link>

            <Link
              to="/services"
              className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-xl">
                📅
              </div>

              <h3 className="mt-4 text-lg font-bold">
                Book Again
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Quickly book another service.
              </p>

              <span className="mt-4 inline-block font-semibold text-blue-600">
                Book Now →
              </span>
            </Link>

          </div>
        </div>

        {/* Recent Bookings */}
        <div className="mt-10 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

          <div className="flex flex-col gap-3 border-b px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Recent Bookings
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Your latest service bookings
              </p>
            </div>

            <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
              {bookings.length} Total
            </span>
          </div>

          {loading ? (
            <div className="p-10 text-center">
              <div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />

              <p className="mt-4 text-gray-500">
                Loading your bookings...
              </p>
            </div>
          ) : error ? (
            <div className="p-10 text-center">
              <p className="font-semibold text-red-600">
                {error}
              </p>
            </div>
          ) : bookings.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-5xl">📭</div>

              <h3 className="mt-4 text-xl font-bold text-gray-900">
                No bookings yet
              </h3>

              <p className="mt-2 text-gray-500">
                Book your first service and it will appear here.
              </p>

              <Link
                to="/services"
                className="mt-6 inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Browse Services
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[750px]">

                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-500">
                      Service
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-500">
                      Provider
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-500">
                      Date
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-500">
                      Amount
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-500">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {bookings.slice(0, 10).map((booking) => (
                    <tr
                      key={booking._id}
                      className="border-t transition hover:bg-gray-50"
                    >
                      <td className="px-6 py-5">
                        <p className="font-semibold text-gray-900">
                          {booking.service?.title || "Service"}
                        </p>

                        {booking.service?.category && (
                          <p className="mt-1 text-xs text-gray-500">
                            {booking.service.category}
                          </p>
                        )}
                      </td>

                      <td className="px-6 py-5 text-gray-700">
                        {booking.provider?.name || "Provider"}
                      </td>

                      <td className="px-6 py-5 text-gray-700">
                        {formatDate(booking.bookingDate)}
                      </td>

                      <td className="px-6 py-5 font-semibold text-gray-900">
                        ₹{booking.totalAmount}
                      </td>

                      <td className="px-6 py-5">
                        <span
                          className={`rounded-full px-3 py-1.5 text-xs font-bold ${getStatusStyle(
                            booking.status
                          )}`}
                        >
                          {booking.status || "Pending"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          )}
        </div>

      </section>
    </main>
  );
};

export default Dashboard;