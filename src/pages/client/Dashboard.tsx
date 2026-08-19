import { useCallback, useEffect, useMemo, useState } from "react";
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
    image?: string;
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
  const [refreshing, setRefreshing] = useState(false);

  const fetchBookings = useCallback(async () => {
    if (!user?._id) {
      setLoading(false);
      return;
    }

    try {
      setError("");

      const response = await api.get(
        `/bookings/client/${user._id}`
      );

      const data = response.data?.bookings || [];

      setBookings(Array.isArray(data) ? data : []);
    } catch (error: any) {
      console.error("Dashboard bookings error:", error);

      setError(
        error?.response?.data?.message ||
          "Unable to load your bookings. Please try again."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [user?._id]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchBookings();
  };

  const stats = useMemo(() => {
    const normalized = bookings.map((booking) =>
      booking.status?.toLowerCase()
    );

    return {
      total: bookings.length,
      pending: normalized.filter(
        (status) => status === "pending"
      ).length,
      accepted: normalized.filter(
        (status) => status === "accepted"
      ).length,
      completed: normalized.filter(
        (status) => status === "completed"
      ).length,
      cancelled: normalized.filter(
        (status) => status === "cancelled"
      ).length,
    };
  }, [bookings]);

  const totalSpent = useMemo(() => {
    return bookings
      .filter(
        (booking) =>
          booking.status?.toLowerCase() === "completed"
      )
      .reduce(
        (total, booking) =>
          total + Number(booking.totalAmount || 0),
        0
      );
  }, [bookings]);

  const recentBookings = useMemo(() => {
    return [...bookings]
      .sort(
        (a, b) =>
          new Date(b.bookingDate).getTime() -
          new Date(a.bookingDate).getTime()
      )
      .slice(0, 6);
  }, [bookings]);

  const formatDate = (date: string) => {
    if (!date) return "—";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "—";
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusStyle = (status: string) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200";

      case "cancelled":
        return "bg-red-50 text-red-700 ring-1 ring-red-200";

      case "accepted":
        return "bg-blue-50 text-blue-700 ring-1 ring-blue-200";

      case "rejected":
        return "bg-red-50 text-red-700 ring-1 ring-red-200";

      default:
        return "bg-amber-50 text-amber-700 ring-1 ring-amber-200";
    }
  };

  const getInitials = (name?: string) => {
    if (!name) return "U";

    return name
      .split(" ")
      .filter(Boolean)
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <main className="min-h-screen bg-slate-50">

      {/* ================= HERO ================= */}

      <section className="relative overflow-hidden bg-slate-950 text-white">

        <div className="absolute -right-32 -top-32 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" />

        <div className="absolute -bottom-40 left-1/3 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8 lg:py-14">

          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">

            <div className="max-w-3xl">

              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-blue-300">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Client Dashboard
              </div>

              <h1 className="text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                Welcome back,{" "}
                <span className="text-blue-400">
                  {user?.name || "Client"}
                </span>
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
                Manage your bookings, track your services and
                connect with trusted professionals from one place.
              </p>

            </div>

            <Link
              to="/services"
              className="inline-flex w-fit items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-950/30 transition hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-xl"
            >
              <span className="text-lg">+</span>
              Book a Service
            </Link>

          </div>

        </div>
      </section>

      {/* ================= CONTENT ================= */}

      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:px-8">

        {/* ================= STATS ================= */}

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">

          {/* Total */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">

            <div className="flex items-center justify-between">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                #
              </div>

              <span className="text-xs font-bold text-slate-400">
                ALL
              </span>

            </div>

            <p className="mt-5 text-sm font-medium text-slate-500">
              Total Bookings
            </p>

            <p className="mt-1 text-3xl font-black text-slate-900">
              {stats.total}
            </p>

          </div>

          {/* Pending */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">

            <div className="flex items-center justify-between">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                ◷
              </div>

              <span className="text-xs font-bold text-amber-500">
                WAITING
              </span>

            </div>

            <p className="mt-5 text-sm font-medium text-slate-500">
              Pending
            </p>

            <p className="mt-1 text-3xl font-black text-slate-900">
              {stats.pending}
            </p>

          </div>

          {/* Accepted */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">

            <div className="flex items-center justify-between">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                ✓
              </div>

              <span className="text-xs font-bold text-blue-500">
                ACTIVE
              </span>

            </div>

            <p className="mt-5 text-sm font-medium text-slate-500">
              Accepted
            </p>

            <p className="mt-1 text-3xl font-black text-slate-900">
              {stats.accepted}
            </p>

          </div>

          {/* Completed */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">

            <div className="flex items-center justify-between">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                ✓
              </div>

              <span className="text-xs font-bold text-emerald-500">
                DONE
              </span>

            </div>

            <p className="mt-5 text-sm font-medium text-slate-500">
              Completed
            </p>

            <p className="mt-1 text-3xl font-black text-slate-900">
              {stats.completed}
            </p>

          </div>

          {/* Spent */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">

            <div className="flex items-center justify-between">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                ₹
              </div>

              <span className="text-xs font-bold text-violet-500">
                SPENT
              </span>

            </div>

            <p className="mt-5 text-sm font-medium text-slate-500">
              Completed Spend
            </p>

            <p className="mt-1 text-3xl font-black text-slate-900">
              ₹{totalSpent.toLocaleString("en-IN")}
            </p>

          </div>

        </div>

        {/* ================= QUICK ACTIONS ================= */}

        <div className="mt-10">

          <div className="flex items-end justify-between gap-4">

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
                Shortcuts
              </p>

              <h2 className="mt-1 text-2xl font-black text-slate-900">
                Quick Actions
              </h2>
            </div>

          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-3">

            <Link
              to="/services"
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
            >

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-xl text-blue-600 transition group-hover:scale-105">
                ⚒
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-900">
                Browse Services
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Find trusted professionals for electrical,
                plumbing, cleaning and more.
              </p>

              <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-blue-600">
                Explore Services
                <span className="transition group-hover:translate-x-1">
                  →
                </span>
              </span>

            </Link>

            <Link
              to="/profile"
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg"
            >

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50 text-xl text-violet-600 transition group-hover:scale-105">
                {getInitials(user?.name)}
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-900">
                My Profile
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                View and manage your account information,
                contact details and preferences.
              </p>

              <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-blue-600">
                View Profile
                <span className="transition group-hover:translate-x-1">
                  →
                </span>
              </span>

            </Link>

            <Link
              to="/services"
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg"
            >

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-xl text-emerald-600 transition group-hover:scale-105">
                ↻
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-900">
                Book Again
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Need another service? Browse available
                providers and create a new booking.
              </p>

              <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-blue-600">
                Book Now
                <span className="transition group-hover:translate-x-1">
                  →
                </span>
              </span>

            </Link>

          </div>
        </div>

        {/* ================= BOOKINGS ================= */}

        <div className="mt-10 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          {/* Header */}

          <div className="flex flex-col gap-4 border-b border-slate-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">

            <div>

              <div className="flex items-center gap-3">

                <h2 className="text-xl font-black text-slate-900">
                  Recent Bookings
                </h2>

                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600">
                  {bookings.length}
                </span>

              </div>

              <p className="mt-1 text-sm text-slate-500">
                Your latest service activity
              </p>

            </div>

            <div className="flex items-center gap-2">

              <button
                type="button"
                onClick={handleRefresh}
                disabled={refreshing || loading}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span
                  className={
                    refreshing ? "animate-spin" : ""
                  }
                >
                  ↻
                </span>

                Refresh
              </button>

              <Link
                to="/client/bookings"
                className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-slate-800"
              >
                View All
              </Link>

            </div>

          </div>

          {/* Loading */}

          {loading ? (
            <div className="p-6">

              <div className="animate-pulse space-y-4">

                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="h-16 rounded-xl bg-slate-100"
                  />
                ))}

              </div>

            </div>
          ) : error ? (

            /* Error */

            <div className="p-10 text-center">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-xl text-red-600">
                !
              </div>

              <h3 className="mt-4 text-lg font-bold text-slate-900">
                Something went wrong
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
                {error}
              </p>

              <button
                type="button"
                onClick={handleRefresh}
                className="mt-5 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700"
              >
                Try Again
              </button>

            </div>
          ) : bookings.length === 0 ? (

            /* Empty State */

            <div className="px-6 py-16 text-center">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-2xl">
                📋
              </div>

              <h3 className="mt-5 text-xl font-black text-slate-900">
                No bookings yet
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                You haven't booked any service yet. Find a
                trusted professional and make your first booking.
              </p>

              <Link
                to="/services"
                className="mt-6 inline-flex rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700"
              >
                Browse Services
              </Link>

            </div>
          ) : (

            <>
              {/* Desktop Table */}

              <div className="hidden overflow-x-auto md:block">

                <table className="w-full">

                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50/70">

                      <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-slate-400">
                        Service
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-slate-400">
                        Provider
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-slate-400">
                        Date
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-slate-400">
                        Amount
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-slate-400">
                        Status
                      </th>

                    </tr>
                  </thead>

                  <tbody>

                    {recentBookings.map((booking) => (

                      <tr
                        key={booking._id}
                        className="border-b border-slate-100 last:border-0 transition hover:bg-slate-50"
                      >

                        <td className="px-6 py-5">

                          <div className="flex items-center gap-3">

                            <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-blue-50 font-bold text-blue-600">

                              {booking.service?.image ? (
                                <img
                                  src={booking.service.image}
                                  alt={booking.service.title}
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                "⚒"
                              )}

                            </div>

                            <div>
                              <p className="font-bold text-slate-900">
                                {booking.service?.title ||
                                  "Service"}
                              </p>

                              {booking.service?.category && (
                                <p className="mt-0.5 text-xs text-slate-500">
                                  {booking.service.category}
                                </p>
                              )}
                            </div>

                          </div>

                        </td>

                        <td className="px-6 py-5">

                          <div className="flex items-center gap-2">

                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-600">
                              {getInitials(
                                booking.provider?.name
                              )}
                            </div>

                            <span className="text-sm font-semibold text-slate-700">
                              {booking.provider?.name ||
                                "Provider"}
                            </span>

                          </div>

                        </td>

                        <td className="px-6 py-5 text-sm font-medium text-slate-600">
                          {formatDate(booking.bookingDate)}
                        </td>

                        <td className="px-6 py-5 text-sm font-black text-slate-900">
                          ₹
                          {Number(
                            booking.totalAmount || 0
                          ).toLocaleString("en-IN")}
                        </td>

                        <td className="px-6 py-5">

                          <span
                            className={`inline-flex rounded-full px-3 py-1.5 text-xs font-bold ${getStatusStyle(
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

              {/* Mobile Cards */}

              <div className="divide-y divide-slate-100 md:hidden">

                {recentBookings.map((booking) => (

                  <div
                    key={booking._id}
                    className="p-5"
                  >

                    <div className="flex items-start justify-between gap-4">

                      <div className="flex min-w-0 items-center gap-3">

                        <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-blue-50 text-blue-600">

                          {booking.service?.image ? (
                            <img
                              src={booking.service.image}
                              alt={booking.service.title}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            "⚒"
                          )}

                        </div>

                        <div className="min-w-0">

                          <p className="truncate font-bold text-slate-900">
                            {booking.service?.title ||
                              "Service"}
                          </p>

                          <p className="mt-1 truncate text-xs text-slate-500">
                            {booking.provider?.name ||
                              "Provider"}
                          </p>

                        </div>

                      </div>

                      <span
                        className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold ${getStatusStyle(
                          booking.status
                        )}`}
                      >
                        {booking.status || "Pending"}
                      </span>

                    </div>

                    <div className="mt-4 flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">

                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Booking Date
                        </p>

                        <p className="mt-1 text-sm font-semibold text-slate-700">
                          {formatDate(booking.bookingDate)}
                        </p>
                      </div>

                      <div className="text-right">

                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Amount
                        </p>

                        <p className="mt-1 text-sm font-black text-slate-900">
                          ₹
                          {Number(
                            booking.totalAmount || 0
                          ).toLocaleString("en-IN")}
                        </p>

                      </div>

                    </div>

                  </div>

                ))}

              </div>
            </>
          )}

        </div>

      </section>
    </main>
  );
};

export default Dashboard;