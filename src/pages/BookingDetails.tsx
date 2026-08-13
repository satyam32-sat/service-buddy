import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../api/api";

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
    description?: string;
    image?: string;
  };

  provider?: {
    _id: string;
    name: string;
    email?: string;
    phone?: string;
  };
}

const BookingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBooking = async () => {
      if (!id) return;

      try {
        setLoading(true);
        setError("");

        const response = await api.get(`/bookings/${id}`);

        setBooking(response.data.booking);
      } catch (error: any) {
        console.error("Booking details error:", error);

        setError(
          error?.response?.data?.message ||
            "Unable to load booking details."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [id]);

  const cancelBooking = async () => {
    if (!id) return;

    const confirmed = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmed) return;

    try {
      setCancelLoading(true);

      const response = await api.put(
        `/bookings/${id}/cancel`
      );

      setBooking((previous) =>
        previous
          ? {
              ...previous,
              status: "Cancelled",
            }
          : null
      );

      alert(
        response.data.message ||
          "Booking cancelled successfully."
      );
    } catch (error: any) {
      console.error("Cancel booking error:", error);

      alert(
        error?.response?.data?.message ||
          "Unable to cancel booking."
      );
    } finally {
      setCancelLoading(false);
    }
  };

  const formatDate = (date: string) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-IN", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const getStatusStyle = (status: string) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-700";

      case "accepted":
        return "bg-blue-100 text-blue-700";

      case "cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 px-6 py-16">
        <div className="mx-auto max-w-6xl animate-pulse">
          <div className="h-8 w-40 rounded bg-gray-200" />

          <div className="mt-8 grid gap-8 lg:grid-cols-3">
            <div className="h-96 rounded-3xl bg-gray-200 lg:col-span-2" />
            <div className="h-96 rounded-3xl bg-gray-200" />
          </div>
        </div>
      </main>
    );
  }

  if (error || !booking) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-gray-50 px-6">
        <div className="max-w-md rounded-3xl bg-white p-10 text-center shadow-lg">

          <div className="text-5xl">⚠️</div>

          <h1 className="mt-5 text-2xl font-bold text-gray-900">
            Booking Not Found
          </h1>

          <p className="mt-3 text-gray-500">
            {error || "This booking could not be found."}
          </p>

          <Link
            to="/client/dashboard"
            className="mt-6 inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Back to Dashboard
          </Link>

        </div>
      </main>
    );
  }

  const status = booking.status?.toLowerCase();

  const canCancel =
    status === "pending" || status === "accepted";

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Header */}
      <section className="bg-gradient-to-br from-gray-950 via-blue-950 to-gray-900 py-12 text-white">

        <div className="mx-auto max-w-6xl px-6">

          <button
            onClick={() => navigate(-1)}
            className="text-sm font-medium text-blue-300 transition hover:text-white"
          >
            ← Back
          </button>

          <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
                My Booking
              </p>

              <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">
                {booking.service?.title || "Service Booking"}
              </h1>

              <p className="mt-2 text-sm text-gray-400">
                Booking ID: {booking._id}
              </p>
            </div>

            <span
              className={`self-start rounded-full px-4 py-2 text-sm font-bold ${getStatusStyle(
                booking.status
              )}`}
            >
              {booking.status || "Pending"}
            </span>

          </div>

        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-6xl px-6 py-10">

        <div className="grid gap-8 lg:grid-cols-3">

          {/* Main */}
          <div className="space-y-7 lg:col-span-2">

            {/* Service Card */}
            <div className="overflow-hidden rounded-3xl bg-white shadow-sm">

              {booking.service?.image && (
                <img
                  src={booking.service.image}
                  alt={booking.service.title}
                  className="h-64 w-full object-cover"
                />
              )}

              <div className="p-7">

                <div className="flex flex-wrap items-center gap-3">

                  {booking.service?.category && (
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                      {booking.service.category}
                    </span>
                  )}

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                      booking.status
                    )}`}
                  >
                    {booking.status}
                  </span>

                </div>

                <h2 className="mt-4 text-2xl font-bold text-gray-900">
                  {booking.service?.title ||
                    "Service"}
                </h2>

                {booking.service?.description && (
                  <p className="mt-3 leading-7 text-gray-600">
                    {booking.service.description}
                  </p>
                )}

              </div>
            </div>

            {/* Provider */}
            <div className="rounded-3xl bg-white p-7 shadow-sm">

              <h2 className="text-xl font-bold text-gray-900">
                Your Service Provider
              </h2>

              <div className="mt-6 flex items-center gap-4">

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-xl font-bold text-blue-700">
                  {booking.provider?.name
                    ?.charAt(0)
                    .toUpperCase() || "P"}
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {booking.provider?.name ||
                      "Service Provider"}
                  </h3>

                  {booking.provider?.email && (
                    <p className="mt-1 text-sm text-gray-500">
                      {booking.provider.email}
                    </p>
                  )}

                  {booking.provider?.phone && (
                    <p className="mt-1 text-sm font-medium text-gray-600">
                      📞 {booking.provider.phone}
                    </p>
                  )}
                </div>

              </div>

            </div>

            {/* Booking Information */}
            <div className="rounded-3xl bg-white p-7 shadow-sm">

              <h2 className="text-xl font-bold text-gray-900">
                Booking Information
              </h2>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">

                <div className="rounded-2xl bg-gray-50 p-5">
                  <p className="text-sm text-gray-400">
                    Service Date
                  </p>

                  <p className="mt-2 font-bold text-gray-900">
                    📅 {formatDate(booking.bookingDate)}
                  </p>
                </div>

                <div className="rounded-2xl bg-gray-50 p-5">
                  <p className="text-sm text-gray-400">
                    Total Amount
                  </p>

                  <p className="mt-2 text-xl font-bold text-blue-600">
                    ₹{booking.totalAmount}
                  </p>
                </div>

                <div className="rounded-2xl bg-gray-50 p-5 sm:col-span-2">
                  <p className="text-sm text-gray-400">
                    Service Address
                  </p>

                  <p className="mt-2 font-semibold text-gray-900">
                    📍 {booking.address}
                  </p>
                </div>

              </div>

            </div>

          </div>

          {/* Sidebar */}
          <aside>

            <div className="sticky top-6 rounded-3xl bg-white p-7 shadow-sm">

              <h2 className="text-xl font-bold text-gray-900">
                Booking Status
              </h2>

              <div className="mt-6">

                <div className="flex items-center gap-3">
                  <span className="h-3 w-3 rounded-full bg-blue-500" />

                  <span className="font-semibold capitalize text-gray-800">
                    {booking.status}
                  </span>
                </div>

                <div className="mt-5 rounded-2xl bg-gray-50 p-5">

                  {status === "pending" && (
                    <p className="text-sm leading-6 text-gray-600">
                      Your booking request has been sent.
                      The provider will review your request.
                    </p>
                  )}

                  {status === "accepted" && (
                    <p className="text-sm leading-6 text-blue-700">
                      Your booking has been accepted by
                      the provider.
                    </p>
                  )}

                  {status === "completed" && (
                    <p className="text-sm leading-6 text-green-700">
                      This service has been completed
                      successfully.
                    </p>
                  )}

                  {status === "cancelled" && (
                    <p className="text-sm leading-6 text-red-700">
                      This booking has been cancelled.
                    </p>
                  )}

                </div>

              </div>

              {/* Cancel */}
              {canCancel && (
                <button
                  onClick={cancelBooking}
                  disabled={cancelLoading}
                  className="mt-6 w-full rounded-xl border border-red-200 px-5 py-3.5 font-bold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {cancelLoading
                    ? "Cancelling..."
                    : "Cancel Booking"}
                </button>
              )}

              <Link
                to="/client/dashboard"
                className="mt-4 block rounded-xl border border-gray-200 py-3 text-center font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                Back to Dashboard
              </Link>

              <Link
                to="/services"
                className="mt-3 block rounded-xl bg-blue-600 py-3 text-center font-semibold text-white transition hover:bg-blue-700"
              >
                Browse More Services
              </Link>

            </div>

          </aside>

        </div>

      </section>
    </main>
  );
};

export default BookingDetails;