import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";

interface Provider {
  _id: string;
  name: string;
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

const fallbackImage =
  "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=1000";

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [availability, setAvailability] = useState("All");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await api.get("/services");

        setServices(res.data.services || []);
      } catch (error) {
        console.error("Services error:", error);
        setError("Unable to load services. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(services.map((service) => service.category))
    );

    return uniqueCategories;
  }, [services]);

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        service.title.toLowerCase().includes(searchText) ||
        service.location.toLowerCase().includes(searchText) ||
        service.category.toLowerCase().includes(searchText) ||
        service.provider?.name?.toLowerCase().includes(searchText);

      const matchesCategory =
        category === "All Categories" ||
        service.category === category;

      const matchesAvailability =
        availability === "All" ||
        (availability === "Available" && service.isAvailable) ||
        (availability === "Unavailable" && !service.isAvailable);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesAvailability
      );
    });
  }, [services, search, category, availability]);

  const clearFilters = () => {
    setSearch("");
    setCategory("All Categories");
    setAvailability("All");
  };

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <main className="min-h-screen bg-[#020713]">

        {/* Hero Skeleton */}
        <section className="bg-[#020713] py-20 text-white">
          <div className="mx-auto max-w-7xl px-6">

            <div className="h-5 w-32 animate-pulse rounded bg-white/10" />

            <div className="mt-5 h-12 w-96 max-w-full animate-pulse rounded-lg bg-white/10" />

            <div className="mt-4 h-5 w-[500px] max-w-full animate-pulse rounded bg-white/10" />

            <div className="mt-10 h-20 w-full animate-pulse rounded-2xl bg-white/10" />

          </div>
        </section>

        {/* Cards Skeleton */}
        <section className="mx-auto max-w-7xl px-6 py-16">

          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-3xl border border-white/10 bg-[#0b0f19]"
              >
                <div className="h-52 animate-pulse bg-[#11141d]" />

                <div className="space-y-4 p-6">

                  <div className="h-5 w-24 animate-pulse rounded bg-white/10" />

                  <div className="h-7 w-40 animate-pulse rounded bg-white/10" />

                  <div className="h-4 w-32 animate-pulse rounded bg-white/10" />

                  <div className="h-10 w-full animate-pulse rounded bg-white/10" />

                </div>
              </div>
            ))}

          </div>

        </section>
      </main>
    );
  }

  /* ================= ERROR ================= */

  if (error) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#020713] px-6">

        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#0b0f19] p-10 text-center shadow-2xl">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-red-500/10 text-4xl">
            ⚠️
          </div>

          <h1 className="mt-6 text-2xl font-bold text-white">
            Services Unavailable
          </h1>

          <p className="mt-3 text-gray-400">
            {error}
          </p>

          <button
            onClick={() => window.location.reload()}
            className="mt-7 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-blue-500/20"
          >
            Try Again
          </button>

        </div>

      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#020713] text-white">

      {/* ================= HERO ================= */}

      <section className="relative overflow-hidden bg-[#020713] py-20 lg:py-24">

        {/* Glow */}
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />

        <div className="absolute -bottom-32 left-10 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6">

          <div className="max-w-3xl">

            <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-400">
              Service Buddy
            </p>

            <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Find the right service
              <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                for your needs
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-400">
              Discover trusted professionals, compare services
              and book the help you need in just a few clicks.
            </p>

          </div>

          {/* Search Box */}

          <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur-md">

            <div className="grid gap-3 md:grid-cols-[1fr_auto_auto]">

              {/* Search */}

              <div className="relative">

                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                  🔍
                </span>

                <input
                  type="text"
                  placeholder="Search service, location or provider..."
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  className="w-full rounded-xl border border-white/10 bg-[#11141d] py-4 pl-12 pr-4 text-white outline-none placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />

              </div>

              {/* Category */}

              <select
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
                className="rounded-xl border border-white/10 bg-[#11141d] px-5 py-4 text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              >

                <option
                  value="All Categories"
                  className="bg-[#11141d]"
                >
                  All Categories
                </option>

                {categories.map((item) => (
                  <option
                    key={item}
                    value={item}
                    className="bg-[#11141d]"
                  >
                    {item}
                  </option>
                ))}

              </select>

              {/* Availability */}

              <select
                value={availability}
                onChange={(e) =>
                  setAvailability(e.target.value)
                }
                className="rounded-xl border border-white/10 bg-[#11141d] px-5 py-4 text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              >

                <option
                  value="All"
                  className="bg-[#11141d]"
                >
                  All Services
                </option>

                <option
                  value="Available"
                  className="bg-[#11141d]"
                >
                  Available
                </option>

                <option
                  value="Unavailable"
                  className="bg-[#11141d]"
                >
                  Unavailable
                </option>

              </select>

            </div>

          </div>

        </div>
      </section>

      {/* ================= SERVICES ================= */}

      <section className="mx-auto max-w-7xl px-6 py-16">

        {/* Results Header */}

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <p className="text-sm font-semibold text-blue-400">
              {filteredServices.length} services found
            </p>

            <h2 className="mt-1 text-3xl font-extrabold text-white">
              Available Services
            </h2>

          </div>

          {(search ||
            category !== "All Categories" ||
            availability !== "All") && (
            <button
              onClick={clearFilters}
              className="self-start rounded-xl border border-white/10 bg-[#0b0f19] px-5 py-2.5 text-sm font-semibold text-gray-300 transition hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-blue-400"
            >
              Clear Filters
            </button>
          )}

        </div>

        {/* Empty State */}

        {filteredServices.length === 0 ? (

          <div className="rounded-3xl border border-white/10 bg-[#0b0f19] px-6 py-20 text-center shadow-xl">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-500/10 text-5xl">
              🔎
            </div>

            <h3 className="mt-6 text-2xl font-bold text-white">
              No services found
            </h3>

            <p className="mx-auto mt-3 max-w-md text-gray-400">
              Try changing your search or category filters
              to find more services.
            </p>

            <button
              onClick={clearFilters}
              className="mt-7 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-blue-500/20"
            >
              Reset Filters
            </button>

          </div>

        ) : (

          /* ================= SERVICE GRID ================= */

          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {filteredServices.map((service) => (

              <article
                key={service._id}
                className="group overflow-hidden rounded-3xl border border-white/10 bg-[#0b0f19] shadow-xl transition duration-300 hover:-translate-y-2 hover:border-blue-500/40 hover:shadow-2xl hover:shadow-blue-500/10"
              >

                {/* Image */}

                <div className="relative overflow-hidden">

                  <img
                    src={service.image || fallbackImage}
                    alt={service.title}
                    className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  {/* Image Overlay */}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                  {/* Category */}

                  <div className="absolute left-4 top-4">

                    <span className="rounded-full border border-white/20 bg-[#020713]/80 px-3 py-1.5 text-xs font-bold text-blue-300 shadow-lg backdrop-blur-md">
                      {service.category}
                    </span>

                  </div>

                  {/* Availability */}

                  <div className="absolute right-4 top-4">

                    <span
                      className={`rounded-full px-3 py-1.5 text-xs font-bold shadow-lg ${
                        service.isAvailable
                          ? "bg-emerald-500 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {service.isAvailable
                        ? "Available"
                        : "Unavailable"}
                    </span>

                  </div>

                </div>

                {/* Content */}

                <div className="p-6">

                  {/* Title */}

                  <h3 className="line-clamp-1 text-xl font-bold text-white">
                    {service.title}
                  </h3>

                  {/* Description */}

                  {service.description && (
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
                      {service.description}
                    </p>
                  )}

                  {/* Location */}

                  <p className="mt-3 flex items-center gap-2 text-sm text-gray-400">

                    <span className="text-blue-400">
                      📍
                    </span>

                    <span className="line-clamp-1">
                      {service.location}
                    </span>

                  </p>

                  {/* Provider */}

                  <div className="mt-4 flex items-center gap-3">

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-sm font-bold text-white">
                      {service.provider?.name
                        ?.charAt(0)
                        .toUpperCase() || "S"}
                    </div>

                    <div className="min-w-0">

                      <p className="text-xs text-gray-500">
                        Provider
                      </p>

                      <p className="truncate text-sm font-semibold text-gray-300">
                        {service.provider?.name ||
                          "Service Buddy"}
                      </p>

                    </div>

                  </div>

                  {/* Price + Rating */}

                  <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-5">

                    <div>

                      <p className="text-xs text-gray-500">
                        Starting from
                      </p>

                      <p className="mt-1 text-xl font-extrabold text-blue-400">
                        ₹{service.price}
                      </p>

                    </div>

                    <div className="rounded-xl border border-yellow-500/10 bg-yellow-500/10 px-3 py-2 text-sm font-bold text-yellow-400">
                      ⭐ 4.8
                    </div>

                  </div>

                  {/* Actions */}

                  <div className="mt-5 grid grid-cols-2 gap-3">

                    <Link
                      to={`/services/${service._id}`}
                      className="rounded-xl border border-white/10 bg-[#11141d] py-3 text-center text-sm font-semibold text-gray-300 transition hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-blue-400"
                    >
                      Details
                    </Link>

                    {service.isAvailable ? (

                      <Link
                        to={`/services/${service._id}`}
                        className="rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 py-3 text-center text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/20"
                      >
                        Book Now
                      </Link>

                    ) : (

                      <button
                        disabled
                        className="cursor-not-allowed rounded-xl bg-white/5 py-3 text-sm font-semibold text-gray-600"
                      >
                        Unavailable
                      </button>

                    )}

                  </div>

                </div>

              </article>

            ))}

          </div>

        )}

      </section>

      {/* ================= BOTTOM CTA ================= */}

      <section className="relative overflow-hidden border-t border-white/5 bg-[#070b15] py-20">

        <div className="absolute -left-32 top-0 h-72 w-72 rounded-full bg-blue-600/10 blur-3xl" />

        <div className="absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-4xl px-6 text-center">

          <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-400">
            Need Help?
          </p>

          <h2 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl">
            Can't find the service you need?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-gray-400">
            Contact our team and we'll help you find the right
            professional for your requirement.
          </p>

          <Link
            to="/contact"
            className="mt-8 inline-flex rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-4 font-bold text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-1 hover:shadow-xl"
          >
            Contact Us →
          </Link>

        </div>

      </section>

    </main>
  );
};

export default Services;