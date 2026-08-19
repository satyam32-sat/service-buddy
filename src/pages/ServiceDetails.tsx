import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";

interface Provider {
  _id: string;
  name: string;
  email?: string;
  phone?: string;
}

interface Service {
  _id: string;
  title: string;
  description?: string;
  category: string;
  location: string;
  price: number;
  image?: string;
  isAvailable: boolean;
  provider?: Provider;
}

const ServiceDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(`/services/${id}`);

        setService(response.data.service);
      } catch (error: any) {
        console.error("Service details error:", error);

        setError(
          error?.response?.data?.message ||
            "Unable to load service."
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchService();
    }
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 px-6 py-16">
        <div className="mx-auto max-w-7xl animate-pulse">
          <div className="h-8 w-48 rounded bg-gray-200" />

          <div className="mt-8 grid gap-10 lg:grid-cols-2">
            <div className="h-[450px] rounded-3xl bg-gray-200" />

            <div className="space-y-5">
              <div className="h-10 w-3/4 rounded bg-gray-200" />
              <div className="h-6 w-1/3 rounded bg-gray-200" />
              <div className="h-32 rounded bg-gray-200" />
              <div className="h-14 rounded bg-gray-200" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error || !service) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-gray-50 px-6">
        <div className="max-w-md rounded-3xl bg-white p-10 text-center shadow-lg">
          <div className="text-5xl">🔎</div>

          <h1 className="mt-5 text-2xl font-bold text-gray-900">
            Service Not Found
          </h1>

          <p className="mt-3 text-gray-500">
            {error || "This service is no longer available."}
          </p>

          <Link
            to="/services"
            className="mt-6 inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Browse Services
          </Link>
        </div>
      </main>
    );
  }


    service.isAvailable && user?.role === "client";

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Header */}
      <section className="bg-gradient-to-br from-gray-950 via-blue-950 to-gray-900 py-12 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <Link
            to="/services"
            className="text-sm font-medium text-blue-300 transition hover:text-white"
          >
            ← Back to Services
          </Link>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-blue-500/20 px-4 py-1.5 text-sm font-semibold text-blue-300">
              {service.category}
            </span>

            <span
              className={`rounded-full px-4 py-1.5 text-sm font-semibold ${
                service.isAvailable
                  ? "bg-green-500/20 text-green-300"
                  : "bg-red-500/20 text-red-300"
              }`}
            >
              {service.isAvailable
                ? "Available"
                : "Currently Unavailable"}
            </span>
          </div>

          <h1 className="mt-5 text-4xl font-extrabold sm:text-5xl">
            {service.title}
          </h1>
        </div>
      </section>

      {/* Main */}
      <section className="mx-auto max-w-7xl px-6 py-12">

        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">

          {/* Image */}
          <div className="overflow-hidden rounded-3xl bg-white shadow-lg">
            <img
              src={
                service.image ||
                "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=1200"
              }
              alt={service.title}
              className="h-[450px] w-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="rounded-3xl bg-white p-7 shadow-lg sm:p-9">

            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="text-sm font-medium text-gray-400">
                  Starting from
                </p>

                <p className="mt-1 text-4xl font-extrabold text-blue-600">
                  ₹{service.price}
                </p>
              </div>

              <div className="rounded-xl bg-yellow-50 px-4 py-3 text-center">
                <div className="text-lg font-bold text-yellow-600">
                  ⭐ 4.8
                </div>

                <p className="text-xs text-gray-500">
                  Rating
                </p>
              </div>
            </div>

            {/* Provider */}
            <div className="mt-8 rounded-2xl border border-gray-100 bg-gray-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Service Provider
              </p>

              <div className="mt-4 flex items-center gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
                  {service.provider?.name
                    ?.charAt(0)
                    .toUpperCase() || "P"}
                </div>

                <div>
                  <h3 className="font-bold text-gray-900">
                    {service.provider?.name ||
                      "Service Buddy Provider"}
                  </h3>

                  {service.provider?.email && (
                    <p className="text-sm text-gray-500">
                      {service.provider.email}
                    </p>
                  )}
                </div>

              </div>
            </div>

            {/* Location */}
            <div className="mt-5 flex items-center gap-3 rounded-2xl border border-gray-100 p-4">
              <span className="text-xl">📍</span>

              <div>
                <p className="text-xs text-gray-400">
                  Service Location
                </p>

                <p className="font-semibold text-gray-800">
                  {service.location}
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="mt-7">
              <h2 className="text-xl font-bold text-gray-900">
                About this service
              </h2>

              <p className="mt-3 leading-7 text-gray-600">
                {service.description ||
                  "Professional service provided by a trusted Service Buddy provider."}
              </p>
            </div>

            {/* Booking */}
            <div className="mt-8">

              {!user ? (
                <Link
                  to="/login"
                  className="block w-full rounded-xl bg-blue-600 py-4 text-center font-bold text-white shadow-lg transition hover:bg-blue-700"
                >
                  Login to Book
                </Link>
              ) : user.role !== "client" ? (
                <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-4 text-center">
                  <p className="font-semibold text-yellow-800">
                    Only clients can book services.
                  </p>
                </div>
              ) : !service.isAvailable ? (
                <button
                  disabled
                  className="w-full cursor-not-allowed rounded-xl bg-gray-200 py-4 font-bold text-gray-400"
                >
                  Service Currently Unavailable
                </button>
              ) : (
                <Link
                  to={`/booking/${service._id}`}
                  className="block w-full rounded-xl bg-blue-600 py-4 text-center font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl"
                >
                  Book This Service →
                </Link>
              )}

            </div>

            <p className="mt-4 text-center text-xs text-gray-400">
              Secure booking • Verified professionals • Trusted service
            </p>

          </div>
        </div>

        {/* Service Information */}
        <div className="mt-12">

          <h2 className="text-2xl font-bold text-gray-900">
            Service Information
          </h2>

          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <p className="text-sm text-gray-400">
                Category
              </p>

              <p className="mt-2 font-bold text-gray-900">
                {service.category}
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <p className="text-sm text-gray-400">
                Location
              </p>

              <p className="mt-2 font-bold text-gray-900">
                {service.location}
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <p className="text-sm text-gray-400">
                Price
              </p>

              <p className="mt-2 font-bold text-blue-600">
                ₹{service.price}
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <p className="text-sm text-gray-400">
                Availability
              </p>

              <p
                className={`mt-2 font-bold ${
                  service.isAvailable
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {service.isAvailable
                  ? "Available"
                  : "Unavailable"}
              </p>
            </div>

          </div>
        </div>

      </section>
    </main>
  );
};

export default ServiceDetails;