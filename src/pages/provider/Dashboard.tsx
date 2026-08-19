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
    image?: string;
  };

  client?: {
    _id: string;
    name: string;
    email?: string;
    phone?: string;
  };
}

/* =========================================================
   ICONS
========================================================= */

type IconProps = {
  size?: number;
  strokeWidth?: number;
  className?: string;
};

const Icon = ({
  name,
  size = 20,
  strokeWidth = 1.8,
  className = "",
}: IconProps & { name: string }) => {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
    "aria-hidden": true,
  };

  switch (name) {
    case "calendar":
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="17" rx="3" />
          <path d="M16 2v4M8 2v4M3 10h18" />
          <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
        </svg>
      );

    case "clock":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      );

    case "check":
      return (
        <svg {...common}>
          <path d="m5 12 4 4L19 6" />
        </svg>
      );

    case "checkCircle":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="m8 12 2.5 2.5L16 9" />
        </svg>
      );

    case "x":
      return (
        <svg {...common}>
          <path d="M6 6l12 12M18 6 6 18" />
        </svg>
      );

    case "xCircle":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="m9 9 6 6M15 9l-6 6" />
        </svg>
      );

    case "briefcase":
      return (
        <svg {...common}>
          <rect x="3" y="7" width="18" height="13" rx="2" />
          <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18" />
          <path d="M10 12v2h4v-2" />
        </svg>
      );

    case "user":
      return (
        <svg {...common}>
          <circle cx="12" cy="8" r="3.5" />
          <path d="M5 20a7 7 0 0 1 14 0" />
        </svg>
      );

    case "users":
      return (
        <svg {...common}>
          <path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
          <circle cx="9.5" cy="7" r="3.5" />
          <path d="M17 11a3.5 3.5 0 0 0 0-7M21 21v-2a4 4 0 0 0-3-3.87" />
        </svg>
      );

    case "tool":
      return (
        <svg {...common}>
          <path d="m14.7 6.3 3 3M4 20l7.5-7.5M15 4a4 4 0 0 0 5 5l-5.5 5.5-5-5L15 4Z" />
          <path d="m4 20 2-2" />
        </svg>
      );

    case "eye":
      return (
        <svg {...common}>
          <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" />
          <circle cx="12" cy="12" r="2.5" />
        </svg>
      );

    case "plus":
      return (
        <svg {...common}>
          <path d="M12 5v14M5 12h14" />
        </svg>
      );

    case "arrowRight":
      return (
        <svg {...common}>
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      );

    case "refresh":
      return (
        <svg {...common}>
          <path d="M20 11a8 8 0 0 0-14.7-4L3 10" />
          <path d="M3 5v5h5" />
          <path d="M4 13a8 8 0 0 0 14.7 4L21 14" />
          <path d="M21 19v-5h-5" />
        </svg>
      );

    case "wallet":
      return (
        <svg {...common}>
          <path d="M4 7V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2" />
          <rect x="3" y="7" width="18" height="14" rx="2" />
          <path d="M16 13h5v4h-5a2 2 0 0 1 0-4Z" />
          <path d="M17 15h.01" />
        </svg>
      );

    case "trending":
      return (
        <svg {...common}>
          <path d="m3 17 6-6 4 4 8-8" />
          <path d="M15 7h6v6" />
        </svg>
      );

    case "mapPin":
      return (
        <svg {...common}>
          <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
      );

    case "phone":
      return (
        <svg {...common}>
          <path d="M6.5 3h2L10 7 8 9c1 2 2.5 3.5 4.5 4.5l2-2L18.5 13v2c0 1.1-.9 2-2 2C9.6 17 7 14.4 7 11.5S8.6 6 8.6 6" />
        </svg>
      );

    case "mail":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </svg>
      );

    case "more":
      return (
        <svg {...common}>
          <circle cx="5" cy="12" r="1" fill="currentColor" />
          <circle cx="12" cy="12" r="1" fill="currentColor" />
          <circle cx="19" cy="12" r="1" fill="currentColor" />
        </svg>
      );

    case "chevron":
      return (
        <svg {...common}>
          <path d="m9 18 6-6-6-6" />
        </svg>
      );

    case "alert":
      return (
        <svg {...common}>
          <path d="M10.3 3.4 2.2 18a2 2 0 0 0 1.8 3h16a2 2 0 0 0 1.8-3L13.7 3.4a2 2 0 0 0-3.4 0Z" />
          <path d="M12 9v4M12 17h.01" />
        </svg>
      );

    case "inbox":
      return (
        <svg {...common}>
          <path d="M4 4h16l2 10v5a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-5L4 4Z" />
          <path d="M2 14h5l2 3h6l2-3h5" />
        </svg>
      );

    default:
      return null;
  }
};

/* =========================================================
   DASHBOARD
========================================================= */

const Dashboard = () => {
  const { user } = useAuth();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  /* =======================================================
     FETCH BOOKINGS
  ======================================================= */

  const fetchBookings = async (showLoader = true) => {
    if (!user?._id) return;

    try {
      if (showLoader) {
        setLoading(true);
      } else {
        setRefreshing(true);
      }

      setError("");

      const response = await api.get(
        `/bookings/provider/${user._id}`
      );

      if (response.data?.success) {
        setBookings(response.data.bookings || []);
      } else {
        setBookings([]);
        setError(
          response.data?.message ||
            "Unable to load booking requests."
        );
      }
    } catch (error: any) {
      console.error("Provider bookings error:", error);

      setError(
        error?.response?.data?.message ||
          "Unable to load booking requests."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [user?._id]);

  /* =======================================================
     UPDATE BOOKING STATUS
  ======================================================= */

  const updateBookingStatus = async (
    bookingId: string,
    status: string
  ) => {
    try {
      setUpdatingId(bookingId);
      setError("");

      const response = await api.put(
        `/bookings/${bookingId}/status`,
        {
          status,
        }
      );

      if (!response.data?.success) {
        throw new Error(
          response.data?.message ||
            "Unable to update booking."
        );
      }

      await fetchBookings(false);
    } catch (error: any) {
      console.error(
        "Booking status update error:",
        error
      );

      setError(
        error?.response?.data?.message ||
          error?.message ||
          "Unable to update booking status."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  /* =======================================================
     STATS
  ======================================================= */

  const stats = useMemo(() => {
    const pending = bookings.filter(
      (booking) =>
        booking.status?.toLowerCase() === "pending"
    ).length;

    const accepted = bookings.filter(
      (booking) =>
        booking.status?.toLowerCase() === "accepted"
    ).length;

    const completedBookings = bookings.filter(
      (booking) =>
        booking.status?.toLowerCase() === "completed"
    );

    const cancelled = bookings.filter(
      (booking) =>
        booking.status?.toLowerCase() === "cancelled"
    ).length;

    const earnings = completedBookings.reduce(
      (total, booking) =>
        total + Number(booking.totalAmount || 0),
      0
    );

    return {
      totalBookings: bookings.length,
      pending,
      accepted,
      completed: completedBookings.length,
      cancelled,
      earnings,
    };
  }, [bookings]);

  /* =======================================================
     DATE FORMATTERS
  ======================================================= */

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

  const formatTime = (date: string) => {
    if (!date) return "—";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "—";
    }

    return parsedDate.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  /* =======================================================
     STATUS
  ======================================================= */

  const getStatusConfig = (status: string) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return {
          label: "Completed",
          bg: "bg-emerald-50",
          text: "text-emerald-700",
          dot: "bg-emerald-500",
          border: "border-emerald-100",
          icon: "checkCircle",
        };

      case "cancelled":
        return {
          label: "Cancelled",
          bg: "bg-red-50",
          text: "text-red-700",
          dot: "bg-red-500",
          border: "border-red-100",
          icon: "xCircle",
        };

      case "rejected":
        return {
          label: "Rejected",
          bg: "bg-red-50",
          text: "text-red-700",
          dot: "bg-red-500",
          border: "border-red-100",
          icon: "xCircle",
        };

      case "accepted":
        return {
          label: "Accepted",
          bg: "bg-blue-50",
          text: "text-blue-700",
          dot: "bg-blue-500",
          border: "border-blue-100",
          icon: "checkCircle",
        };

      default:
        return {
          label: "Pending",
          bg: "bg-amber-50",
          text: "text-amber-700",
          dot: "bg-amber-500",
          border: "border-amber-100",
          icon: "clock",
        };
    }
  };

  const canAccept = (status: string) =>
    status?.toLowerCase() === "pending";

  const canReject = (status: string) =>
    status?.toLowerCase() === "pending";

  const canComplete = (status: string) =>
    status?.toLowerCase() === "accepted";

  /* =======================================================
     STAT CARD
  ======================================================= */

  const StatCard = ({
    title,
    value,
    subtitle,
    icon,
    iconBg,
    iconColor,
  }: {
    title: string;
    value: string | number;
    subtitle: string;
    icon: string;
    iconBg: string;
    iconColor: string;
  }) => (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl">
      <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-slate-50 transition-transform duration-500 group-hover:scale-150" />

      <div className="relative">
        <div className="flex items-start justify-between">
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconBg} ${iconColor}`}
          >
            <Icon name={icon} size={21} />
          </div>

          <div className="rounded-full bg-slate-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Live
          </div>
        </div>

        <p className="mt-5 text-sm font-medium text-slate-500">
          {title}
        </p>

        <div className="mt-1 flex items-end justify-between gap-3">
          <h3 className="text-3xl font-extrabold tracking-tight text-slate-900">
            {loading ? (
              <span className="inline-block h-8 w-20 animate-pulse rounded-lg bg-slate-100" />
            ) : (
              value
            )}
          </h3>
        </div>

        <p className="mt-2 text-xs text-slate-400">
          {subtitle}
        </p>
      </div>
    </div>
  );

  /* =======================================================
     RETURN
  ======================================================= */

  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-900">
      {/* ===================================================
          HERO
      =================================================== */}

      <section className="relative overflow-hidden bg-slate-950">
        {/* Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.22),_transparent_35%),radial-gradient(circle_at_bottom_left,_rgba(99,102,241,0.18),_transparent_35%)]" />

        <div className="absolute -right-20 top-10 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8 lg:py-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-blue-300 backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
                Provider Dashboard
              </div>

              <h1 className="mt-5 text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
                Welcome back,{" "}
                <span className="text-blue-400">
                  {user?.name || "Provider"}
                </span>
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
                Manage your bookings, customers, services and
                business performance from one powerful dashboard.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-2 text-slate-400">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/5 text-blue-400">
                    <Icon name="briefcase" size={15} />
                  </span>
                  {stats.totalBookings} total bookings
                </div>

                <div className="hidden h-4 w-px bg-white/10 sm:block" />

                <div className="flex items-center gap-2 text-slate-400">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/5 text-emerald-400">
                    <Icon name="trending" size={15} />
                  </span>
                  {stats.completed} completed
                </div>
              </div>
            </div>

            <Link
              to="/provider/services"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-blue-600/30 sm:w-auto"
            >
              <Icon name="plus" size={18} />
              Add New Service
              <Icon
                name="arrowRight"
                size={17}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* ===================================================
          MAIN
      =================================================== */}

      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:px-8 lg:py-10">
        {/* =================================================
            ERROR
        ================================================= */}

        {error && (
          <div className="mb-7 flex flex-col gap-4 rounded-2xl border border-red-200 bg-red-50 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600">
                <Icon name="alert" size={18} />
              </div>

              <div>
                <p className="font-bold text-red-800">
                  Something went wrong
                </p>

                <p className="mt-0.5 text-sm text-red-600">
                  {error}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => fetchBookings(false)}
              disabled={refreshing}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Icon
                name="refresh"
                size={16}
                className={
                  refreshing ? "animate-spin" : ""
                }
              />
              {refreshing ? "Retrying..." : "Try Again"}
            </button>
          </div>
        )}

        {/* =================================================
            STATS
        ================================================= */}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <StatCard
            title="Total Bookings"
            value={stats.totalBookings}
            subtitle="All booking requests"
            icon="calendar"
            iconBg="bg-blue-50"
            iconColor="text-blue-600"
          />

          <StatCard
            title="Pending"
            value={stats.pending}
            subtitle="Needs your attention"
            icon="clock"
            iconBg="bg-amber-50"
            iconColor="text-amber-600"
          />

          <StatCard
            title="Accepted"
            value={stats.accepted}
            subtitle="Active jobs"
            icon="checkCircle"
            iconBg="bg-indigo-50"
            iconColor="text-indigo-600"
          />

          <StatCard
            title="Completed"
            value={stats.completed}
            subtitle="Successfully delivered"
            icon="check"
            iconBg="bg-emerald-50"
            iconColor="text-emerald-600"
          />

          <StatCard
            title="Earnings"
            value={
              loading
                ? "—"
                : `₹${stats.earnings.toLocaleString("en-IN")}`
            }
            subtitle="From completed jobs"
            icon="wallet"
            iconBg="bg-violet-50"
            iconColor="text-violet-600"
          />
        </div>

        {/* =================================================
            QUICK ACTIONS
        ================================================= */}

        <div className="mt-10">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
                Workspace
              </p>

              <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900">
                Quick Actions
              </h2>
            </div>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <Link
              to="/provider/services"
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
            >
              <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-blue-50 transition-transform duration-500 group-hover:scale-[2]" />

              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Icon name="tool" size={23} />
                </div>

                <h3 className="mt-5 text-lg font-bold text-slate-900">
                  Manage Services
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Add, update and manage the services you
                  provide to customers.
                </p>

                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-blue-600">
                  Manage Services
                  <Icon
                    name="arrowRight"
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </span>
              </div>
            </Link>

            <Link
              to="/profile"
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl"
            >
              <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-violet-50 transition-transform duration-500 group-hover:scale-[2]" />

              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                  <Icon name="user" size={23} />
                </div>

                <h3 className="mt-5 text-lg font-bold text-slate-900">
                  My Profile
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Keep your provider information and account
                  details up to date.
                </p>

                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-violet-600">
                  View Profile
                  <Icon
                    name="arrowRight"
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </span>
              </div>
            </Link>

            <Link
              to="/services"
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl"
            >
              <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-emerald-50 transition-transform duration-500 group-hover:scale-[2]" />

              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <Icon name="eye" size={23} />
                </div>

                <h3 className="mt-5 text-lg font-bold text-slate-900">
                  Browse Marketplace
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Preview how your services are displayed to
                  customers.
                </p>

                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-emerald-600">
                  View Marketplace
                  <Icon
                    name="arrowRight"
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </span>
              </div>
            </Link>
          </div>
        </div>

        {/* =================================================
            BOOKING REQUESTS
        ================================================= */}

        <div className="mt-10 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {/* Header */}
          <div className="border-b border-slate-100 px-5 py-5 sm:px-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-extrabold tracking-tight text-slate-900">
                    Booking Requests
                  </h2>

                  <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-600">
                    {bookings.length}
                  </span>
                </div>

                <p className="mt-1 text-sm text-slate-500">
                  Review and manage your customer bookings.
                </p>
              </div>

              <button
                type="button"
                onClick={() => fetchBookings(false)}
                disabled={refreshing}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Icon
                  name="refresh"
                  size={16}
                  className={
                    refreshing ? "animate-spin" : ""
                  }
                />
                {refreshing ? "Refreshing..." : "Refresh"}
              </button>
            </div>
          </div>

          {/* Loading */}
          {loading ? (
            <div className="space-y-4 p-5 sm:p-6">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="animate-pulse rounded-2xl border border-slate-100 p-5"
                >
                  <div className="flex gap-4">
                    <div className="h-12 w-12 rounded-xl bg-slate-100" />

                    <div className="flex-1">
                      <div className="h-4 w-40 rounded bg-slate-100" />
                      <div className="mt-3 h-3 w-28 rounded bg-slate-100" />
                    </div>

                    <div className="hidden h-8 w-24 rounded-full bg-slate-100 sm:block" />
                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    <div className="h-12 rounded-xl bg-slate-50" />
                    <div className="h-12 rounded-xl bg-slate-50" />
                    <div className="h-12 rounded-xl bg-slate-50" />
                  </div>
                </div>
              ))}
            </div>
          ) : bookings.length === 0 ? (
            /* Empty state */
            <div className="px-6 py-16 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                <Icon name="inbox" size={30} />
              </div>

              <h3 className="mt-5 text-lg font-extrabold text-slate-900">
                No booking requests yet
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                New customer booking requests will appear
                here automatically when someone books one of
                your services.
              </p>

              <button
                type="button"
                onClick={() => fetchBookings(false)}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
              >
                <Icon name="refresh" size={16} />
                Refresh Bookings
              </button>
            </div>
          ) : (
            <>
              {/* Desktop */}
              <div className="hidden overflow-x-auto lg:block">
                <table className="w-full min-w-[1100px]">
                  <thead className="border-b border-slate-100 bg-slate-50/70">
                    <tr>
                      <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Service
                      </th>

                      <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Customer
                      </th>

                      <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Schedule
                      </th>

                      <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Location
                      </th>

                      <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Amount
                      </th>

                      <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Status
                      </th>

                      <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {bookings.map((booking) => {

                        booking.status?.toLowerCase();

                      const isUpdating =
                        updatingId === booking._id;

                      const statusConfig =
                        getStatusConfig(booking.status);

                      return (
                        <tr
                          key={booking._id}
                          className="group transition-colors hover:bg-slate-50/70"
                        >
                          {/* Service */}
                          <td className="px-6 py-5">
                            <div className="flex min-w-[220px] items-center gap-3">
                              {booking.service?.image ? (
                                <img
                                  src={booking.service.image}
                                  alt={
                                    booking.service.title ||
                                    "Service"
                                  }
                                  className="h-12 w-12 rounded-xl object-cover ring-1 ring-slate-200"
                                />
                              ) : (
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                  <Icon
                                    name="tool"
                                    size={21}
                                  />
                                </div>
                              )}

                              <div className="min-w-0">
                                <p className="truncate font-bold text-slate-900">
                                  {booking.service?.title ||
                                    "Service"}
                                </p>

                                {booking.service
                                  ?.category && (
                                  <p className="mt-1 truncate text-xs font-medium text-slate-400">
                                    {
                                      booking.service
                                        .category
                                    }
                                  </p>
                                )}
                              </div>
                            </div>
                          </td>

                          {/* Customer */}
                          <td className="px-6 py-5">
                            <div className="min-w-[180px]">
                              <div className="flex items-center gap-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                                  <Icon
                                    name="user"
                                    size={15}
                                  />
                                </div>

                                <p className="font-bold text-slate-800">
                                  {booking.client?.name ||
                                    "Customer"}
                                </p>
                              </div>

                              {booking.client?.phone && (
                                <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-400">
                                  <Icon
                                    name="phone"
                                    size={12}
                                  />
                                  {booking.client.phone}
                                </div>
                              )}
                            </div>
                          </td>

                          {/* Schedule */}
                          <td className="px-6 py-5">
                            <div className="min-w-[130px]">
                              <div className="flex items-center gap-2 font-semibold text-slate-700">
                                <Icon
                                  name="calendar"
                                  size={15}
                                  className="text-blue-500"
                                />

                                {formatDate(
                                  booking.bookingDate
                                )}
                              </div>

                              <div className="mt-1.5 flex items-center gap-2 text-xs text-slate-400">
                                <Icon
                                  name="clock"
                                  size={13}
                                />

                                {formatTime(
                                  booking.bookingDate
                                )}
                              </div>
                            </div>
                          </td>

                          {/* Address */}
                          <td className="px-6 py-5">
                            <div className="flex max-w-[220px] items-start gap-2">
                              <Icon
                                name="mapPin"
                                size={16}
                                className="mt-0.5 shrink-0 text-slate-400"
                              />

                              <p
                                className="truncate text-sm font-medium text-slate-600"
                                title={booking.address}
                              >
                                {booking.address ||
                                  "Address unavailable"}
                              </p>
                            </div>
                          </td>

                          {/* Amount */}
                          <td className="px-6 py-5">
                            <p className="font-extrabold text-slate-900">
                              ₹
                              {Number(
                                booking.totalAmount || 0
                              ).toLocaleString("en-IN")}
                            </p>
                          </td>

                          {/* Status */}
                          <td className="px-6 py-5">
                            <span
                              className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-bold ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}
                            >
                              <span
                                className={`h-1.5 w-1.5 rounded-full ${statusConfig.dot}`}
                              />

                              {statusConfig.label}
                            </span>
                          </td>

                          {/* Actions */}
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-2">
                              <Link
                                to={`/provider/bookings/${booking._id}`}
                                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                              >
                                View
                                <Icon
                                  name="chevron"
                                  size={14}
                                />
                              </Link>

                              {canAccept(
                                booking.status
                              ) && (
                                <button
                                  type="button"
                                  disabled={isUpdating}
                                  onClick={() =>
                                    updateBookingStatus(
                                      booking._id,
                                      "Accepted"
                                    )
                                  }
                                  className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-bold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                  <Icon
                                    name="check"
                                    size={14}
                                  />
                                  {isUpdating
                                    ? "..."
                                    : "Accept"}
                                </button>
                              )}

                              {canReject(
                                booking.status
                              ) && (
                                <button
                                  type="button"
                                  disabled={isUpdating}
                                  onClick={() =>
                                    updateBookingStatus(
                                      booking._id,
                                      "Rejected"
                                    )
                                  }
                                  className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-bold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                  <Icon
                                    name="x"
                                    size={14}
                                  />
                                  {isUpdating
                                    ? "..."
                                    : "Reject"}
                                </button>
                              )}

                              {canComplete(
                                booking.status
                              ) && (
                                <button
                                  type="button"
                                  disabled={isUpdating}
                                  onClick={() =>
                                    updateBookingStatus(
                                      booking._id,
                                      "Completed"
                                    )
                                  }
                                  className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-2 text-xs font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                  <Icon
                                    name="checkCircle"
                                    size={14}
                                  />
                                  {isUpdating
                                    ? "..."
                                    : "Complete"}
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile / Tablet */}
              <div className="divide-y divide-slate-100 lg:hidden">
                {bookings.map((booking) => {
                  const isUpdating =
                    updatingId === booking._id;

                  const statusConfig =
                    getStatusConfig(booking.status);

                  return (
                    <div
                      key={booking._id}
                      className="p-5 transition hover:bg-slate-50/60 sm:p-6"
                    >
                      {/* Top */}
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex min-w-0 items-center gap-3">
                          {booking.service?.image ? (
                            <img
                              src={booking.service.image}
                              alt={
                                booking.service.title ||
                                "Service"
                              }
                              className="h-12 w-12 shrink-0 rounded-xl object-cover ring-1 ring-slate-200"
                            />
                          ) : (
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                              <Icon
                                name="tool"
                                size={21}
                              />
                            </div>
                          )}

                          <div className="min-w-0">
                            <p className="truncate font-bold text-slate-900">
                              {booking.service?.title ||
                                "Service"}
                            </p>

                            <p className="mt-1 text-xs text-slate-400">
                              {booking.service?.category ||
                                "Service Booking"}
                            </p>
                          </div>
                        </div>

                        <span
                          className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-[11px] font-bold ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${statusConfig.dot}`}
                          />
                          {statusConfig.label}
                        </span>
                      </div>

                      {/* Details */}
                      <div className="mt-5 grid gap-3 sm:grid-cols-2">
                        <div className="rounded-xl bg-slate-50 p-3.5">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            Customer
                          </p>

                          <p className="mt-1.5 font-bold text-slate-800">
                            {booking.client?.name ||
                              "Customer"}
                          </p>

                          {booking.client?.phone && (
                            <p className="mt-1 text-xs text-slate-400">
                              {booking.client.phone}
                            </p>
                          )}
                        </div>

                        <div className="rounded-xl bg-slate-50 p-3.5">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            Schedule
                          </p>

                          <p className="mt-1.5 font-bold text-slate-800">
                            {formatDate(
                              booking.bookingDate
                            )}
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            {formatTime(
                              booking.bookingDate
                            )}
                          </p>
                        </div>

                        <div className="rounded-xl bg-slate-50 p-3.5">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            Location
                          </p>

                          <p
                            className="mt-1.5 truncate text-sm font-semibold text-slate-700"
                            title={booking.address}
                          >
                            {booking.address ||
                              "Address unavailable"}
                          </p>
                        </div>

                        <div className="rounded-xl bg-slate-50 p-3.5">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            Amount
                          </p>

                          <p className="mt-1.5 text-lg font-extrabold text-slate-900">
                            ₹
                            {Number(
                              booking.totalAmount || 0
                            ).toLocaleString("en-IN")}
                          </p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="mt-5 flex flex-wrap gap-2">
                        <Link
                          to={`/provider/bookings/${booking._id}`}
                          className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 sm:flex-none"
                        >
                          View Details
                          <Icon
                            name="arrowRight"
                            size={15}
                          />
                        </Link>

                        {canAccept(booking.status) && (
                          <button
                            type="button"
                            disabled={isUpdating}
                            onClick={() =>
                              updateBookingStatus(
                                booking._id,
                                "Accepted"
                              )
                            }
                            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-700 disabled:opacity-50 sm:flex-none"
                          >
                            <Icon name="check" size={16} />
                            Accept
                          </button>
                        )}

                        {canReject(booking.status) && (
                          <button
                            type="button"
                            disabled={isUpdating}
                            onClick={() =>
                              updateBookingStatus(
                                booking._id,
                                "Rejected"
                              )
                            }
                            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-bold text-red-600 transition hover:bg-red-100 disabled:opacity-50 sm:flex-none"
                          >
                            <Icon name="x" size={16} />
                            Reject
                          </button>
                        )}

                        {canComplete(booking.status) && (
                          <button
                            type="button"
                            disabled={isUpdating}
                            onClick={() =>
                              updateBookingStatus(
                                booking._id,
                                "Completed"
                              )
                            }
                            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700 disabled:opacity-50 sm:flex-none"
                          >
                            <Icon
                              name="checkCircle"
                              size={16}
                            />
                            Complete
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* =================================================
            BOTTOM BUSINESS OVERVIEW
        ================================================= */}

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {/* Provider Overview */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-600">
                  Performance
                </p>

                <h2 className="mt-1 text-xl font-extrabold tracking-tight text-slate-900">
                  Provider Overview
                </h2>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Icon name="trending" size={20} />
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/70 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                    <Icon name="clock" size={17} />
                  </div>

                  <span className="text-sm font-semibold text-slate-600">
                    Pending Requests
                  </span>
                </div>

                <span className="font-extrabold text-amber-600">
                  {stats.pending}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/70 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <Icon
                      name="checkCircle"
                      size={17}
                    />
                  </div>

                  <span className="text-sm font-semibold text-slate-600">
                    Accepted Jobs
                  </span>
                </div>

                <span className="font-extrabold text-blue-600">
                  {stats.accepted}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/70 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                    <Icon name="check" size={17} />
                  </div>

                  <span className="text-sm font-semibold text-slate-600">
                    Completed Jobs
                  </span>
                </div>

                <span className="font-extrabold text-emerald-600">
                  {stats.completed}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/70 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-600">
                    <Icon name="xCircle" size={17} />
                  </div>

                  <span className="text-sm font-semibold text-slate-600">
                    Cancelled
                  </span>
                </div>

                <span className="font-extrabold text-red-600">
                  {stats.cancelled}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-blue-100 bg-blue-50/50 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                    <Icon name="wallet" size={17} />
                  </div>

                  <span className="text-sm font-semibold text-slate-600">
                    Completed Earnings
                  </span>
                </div>

                <span className="font-extrabold text-blue-700">
                  ₹
                  {stats.earnings.toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          </div>

          {/* Account Status */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-600">
                  Account
                </p>

                <h2 className="mt-1 text-xl font-extrabold tracking-tight text-slate-900">
                  Provider Status
                </h2>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <Icon name="checkCircle" size={20} />
              </div>
            </div>

            <div className="mt-6 overflow-hidden rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-6">
              <div className="flex items-center gap-3">
                <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
                  <span className="absolute h-3 w-3 animate-pulse rounded-full bg-emerald-500" />
                </div>

                <div>
                  <p className="font-extrabold text-emerald-800">
                    Account Active
                  </p>

                  <p className="mt-0.5 text-xs font-medium text-emerald-600">
                    Your provider profile is visible
                  </p>
                </div>
              </div>

              <p className="mt-5 text-sm leading-6 text-slate-600">
                Your provider account is active and your
                services can currently be discovered by
                customers.
              </p>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-emerald-100">
                  <p className="text-xs font-medium text-slate-400">
                    Total Services
                  </p>

                  <p className="mt-1 text-xl font-extrabold text-slate-900">
                    Active
                  </p>
                </div>

                <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-emerald-100">
                  <p className="text-xs font-medium text-slate-400">
                    Visibility
                  </p>

                  <p className="mt-1 text-xl font-extrabold text-emerald-600">
                    Public
                  </p>
                </div>
              </div>
            </div>

            <Link
              to="/profile"
              className="mt-5 flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
            >
              <Icon name="user" size={16} />
              Manage Profile
              <Icon name="arrowRight" size={15} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;