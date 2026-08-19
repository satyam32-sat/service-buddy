import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronDown,
  Clock3,
  IndianRupee,
  Mail,
  MapPin,
  ShieldCheck,
  Star,
  Users,
  Wrench,
  Zap,
} from "lucide-react";

import api from "../api/api";
import logo from "../assets/logo.png";

interface Service {
  _id: string;
  title: string;
  price: number;
  image?: string;
  provider?: string;
  description?: string;
}

const testimonials = [
  {
    name: "Rahul Sharma",
    city: "Delhi",
    review:
      "Excellent service! The electrician arrived on time and solved my issue quickly.",
    avatar: "RS",
  },
  {
    name: "Priya Singh",
    city: "Lucknow",
    review:
      "Very professional home cleaning service. Highly recommended!",
    avatar: "PS",
  },
  {
    name: "Aman Verma",
    city: "Noida",
    review:
      "Booking was super easy and the plumber was very experienced.",
    avatar: "AV",
  },
];

const faqs = [
  {
    question: "How do I book a service?",
    answer:
      "Choose your preferred service, select a professional, pick a date, and confirm your booking securely through our platform.",
  },
  {
    question: "Are all professionals verified?",
    answer:
      "Absolutely. Every professional is reviewed and verified before joining the Service Buddy platform.",
  },
  {
    question: "Can I cancel my booking?",
    answer:
      "Yes. You can manage your booking and cancel it according to the cancellation policy of the service.",
  },
];

const features = [
  {
    icon: ShieldCheck,
    title: "Verified Professionals",
    desc: "Trusted professionals for your everyday home service needs.",
  },
  {
    icon: Clock3,
    title: "Fast Booking",
    desc: "Find and book the service you need in just a few clicks.",
  },
  {
    icon: IndianRupee,
    title: "Clear Pricing",
    desc: "Transparent service pricing without unnecessary surprises.",
  },
  {
    icon: Users,
    title: "Customer Support",
    desc: "We're here to help whenever you need assistance.",
  },
];

const stats = [
  {
    stat: "1K+",
    label: "Happy Customers",
    icon: Users,
  },
  {
    stat: "50+",
    label: "Verified Pros",
    icon: ShieldCheck,
  },
  {
    stat: "2K+",
    label: "Tasks Done",
    icon: CheckCircle2,
  },
  {
    stat: "4.4★",
    label: "Average Rating",
    icon: Star,
  },
];

const Home = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const [serviceError, setServiceError] = useState("");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoadingServices(true);
        setServiceError("");

        const response = await api.get("/services");

        if (response.data?.success) {
          setServices(response.data.services || []);
        } else {
          setServices([]);
          setServiceError("Unable to load services.");
        }
      } catch (error) {
        console.error("Home Services Error:", error);
        setServiceError("Unable to load services.");
      } finally {
        setLoadingServices(false);
      }
    };

    fetchServices();
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((current) =>
      current === index ? null : index
    );
  };

  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 text-white">

      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative overflow-hidden border-b border-white/10 bg-[#020617]">

        {/* Background Glow */}
        <div className="pointer-events-none absolute -left-48 top-0 h-[500px] w-[500px] rounded-full bg-fuchsia-500/20 blur-[120px]" />

        <div className="pointer-events-none absolute -right-48 top-0 h-[500px] w-[500px] rounded-full bg-indigo-500/20 blur-[120px]" />

        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/10 blur-[120px]" />

        {/* Grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
            backgroundSize: "55px 55px",
          }}
        />

        <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-14 px-5 py-16 sm:px-6 lg:flex-row lg:gap-16 lg:px-8 lg:py-24">

          {/* Hero Content */}
          <div className="w-full max-w-2xl text-center lg:w-1/2 lg:text-left">

            {/* Brand */}
            <div className="mb-7 flex justify-center lg:justify-start">
              <div className="group flex items-center gap-3">
                <div className="relative">
                  <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-fuchsia-500 to-indigo-500 opacity-20 blur-lg transition-opacity group-hover:opacity-40" />

                  <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-1.5 shadow-xl backdrop-blur">
                   
                  </div>
                </div>

                <div className="text-left">
                  <p className="text-lg font-black tracking-tight text-white">
                    
                    <span className="text-indigo-400"></span>
                  </p>

                  <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Trusted Services
                  </p>
                </div>
              </div>
            </div>

            {/* Badge */}
            <span className="inline-flex items-center gap-2 rounded-full border border-fuchsia-400/20 bg-fuchsia-500/10 px-4 py-2 text-sm font-semibold text-fuchsia-300 shadow-lg shadow-fuchsia-500/5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-fuchsia-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-fuchsia-400" />
              </span>

              Trusted Home Services
            </span>

            {/* Heading */}
            <h1 className="mt-7 text-4xl font-black leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
              Book Trusted
              <span className="block">Home Services</span>

              <span className="mt-3 block bg-gradient-to-r from-fuchsia-400 via-violet-400 to-indigo-400 bg-clip-text text-transparent">
                Anytime, Anywhere
              </span>
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-xl text-base leading-7 text-slate-400 sm:text-lg lg:text-xl">
              Find verified electricians, plumbers, carpenters,
              cleaners, painters, AC technicians, and more — all
              in one powerful platform.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">

              <Link
                to="/services"
                className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-fuchsia-500 via-violet-500 to-indigo-500 px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-violet-500/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-fuchsia-500/20 sm:px-7"
              >
                Explore Services

                <ArrowRight
                  size={17}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>

              <Link
                to="/register"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-6 py-3.5 text-sm font-bold text-slate-200 backdrop-blur transition-all duration-300 hover:border-fuchsia-400/30 hover:bg-white/[0.08] sm:px-7"
              >
                Get Started
              </Link>
            </div>

            {/* Trust Points */}
            <div className="mt-7 flex flex-wrap justify-center gap-x-5 gap-y-3 text-xs font-medium text-slate-500 lg:justify-start">

              <span className="flex items-center gap-1.5">
                <CheckCircle2
                  size={14}
                  className="text-emerald-400"
                />
                Verified Professionals
              </span>

              <span className="flex items-center gap-1.5">
                <CheckCircle2
                  size={14}
                  className="text-emerald-400"
                />
                Transparent Pricing
              </span>

              <span className="flex items-center gap-1.5">
                <CheckCircle2
                  size={14}
                  className="text-emerald-400"
                />
                Easy Booking
              </span>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative w-full max-w-xl lg:w-1/2">

            <div className="absolute -inset-5 rounded-[2.5rem] bg-gradient-to-r from-fuchsia-500/30 via-violet-500/20 to-indigo-500/30 blur-3xl" />

            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-2 shadow-2xl backdrop-blur-xl">

              <img
src="https://i.pinimg.com/736x/51/fd/4e/51fd4eeb60bed66298bebca559619221.jpg"
                alt="Professional home service"
                className="h-[360px] w-full rounded-[1.6rem] object-cover object-center transition duration-700 hover:scale-[1.03] sm:h-[440px]"
                loading="eager"
              />

              {/* Overlay */}
              <div className="absolute inset-2 rounded-[1.6rem] bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

              {/* Floating Rating */}
              <div className="absolute right-7 top-7 flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 shadow-2xl backdrop-blur-xl">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-yellow-400/10">
                  <Star
                    size={17}
                    className="fill-yellow-400 text-yellow-400"
                  />
                </div>

                <div>
                  <p className="text-sm font-black text-white">
                    4.4/5
                  </p>
                  <p className="text-[10px] text-slate-400">
                    Customer Rating
                  </p>
                </div>
              </div>

              {/* Floating Verified Card */}
              <div className="absolute bottom-7 left-7 right-7 rounded-2xl border border-white/10 bg-slate-950/85 p-4 shadow-2xl backdrop-blur-xl">

                <div className="flex items-center justify-between gap-4">

                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-fuchsia-500/20 to-indigo-500/20 text-fuchsia-300">
                      <ShieldCheck size={21} />
                    </div>

                    <div>
                      <p className="text-xs font-medium text-slate-400">
                        Verified Professionals
                      </p>

                      <p className="mt-1 text-sm font-bold text-white sm:text-base">
                        Quality Service at Your Doorstep
                      </p>
                    </div>
                  </div>

                  <div className="hidden h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 sm:flex">
                    <CheckCircle2 size={17} />
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          STATS
      ========================================================= */}
      <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-r from-fuchsia-500 via-violet-500 to-indigo-500 px-5 py-12 sm:px-6 lg:px-8">

        <div className="absolute -left-20 top-0 h-60 w-60 rounded-full bg-fuchsia-300/30 blur-3xl" />

        <div className="absolute -right-20 bottom-0 h-60 w-60 rounded-full bg-blue-300/30 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl grid-cols-2 gap-4 md:grid-cols-4">

          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="group rounded-2xl border border-white/15 bg-white/10 p-5 text-center backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/15"
              >
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-white">
                  <Icon
                    size={18}
                    className={
                      item.label === "Average Rating"
                        ? "fill-white"
                        : ""
                    }
                  />
                </div>

                <h2 className="mt-3 text-2xl font-black text-white sm:text-3xl">
                  {item.stat}
                </h2>

                <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-white/70 sm:text-xs">
                  {item.label}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================
          SERVICES
      ========================================================= */}
      <section className="relative overflow-hidden bg-slate-950 px-5 py-20 sm:px-6 lg:px-8 lg:py-24">

        <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-violet-500/10 blur-[110px]" />

        <div className="pointer-events-none absolute -right-40 top-1/3 h-80 w-80 rounded-full bg-fuchsia-500/10 blur-[110px]" />

        <div className="relative mx-auto max-w-7xl">

          {/* Header */}
          <div className="mx-auto max-w-3xl text-center">

            <div className="mb-6 flex justify-center">
              <div className="relative rounded-2xl border border-white/10 bg-white/[0.04] p-3 shadow-xl shadow-violet-500/5 backdrop-blur-md">

                <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-fuchsia-500/20 to-indigo-500/20 blur-xl" />

                <img
                  src={logo}
                  alt="Service Buddy"
                  className="relative h-12 w-auto object-contain sm:h-14"
                />
              </div>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-fuchsia-400/20 bg-fuchsia-500/10 px-4 py-2">

              <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-400 shadow-[0_0_10px_rgba(244,63,244,0.8)]" />

              <span className="text-xs font-bold uppercase tracking-[0.2em] text-fuchsia-300">
                Our Services
              </span>
            </div>

            <h2 className="mt-5 text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
              Everything Your Home Needs,

              <span className="block bg-gradient-to-r from-fuchsia-400 via-violet-400 to-indigo-400 bg-clip-text text-transparent">
                In One Place
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base sm:leading-8">
              Choose from trusted professionals for your everyday
              home service needs. Simple booking, transparent
              pricing, and reliable service.
            </p>
          </div>

          {/* Loading */}
          {loadingServices && (
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]"
                >
                  <div className="h-56 animate-pulse bg-white/5" />

                  <div className="space-y-4 p-6">
                    <div className="h-6 w-2/3 animate-pulse rounded-lg bg-white/5" />
                    <div className="h-4 w-full animate-pulse rounded bg-white/5" />
                    <div className="h-4 w-4/5 animate-pulse rounded bg-white/5" />
                    <div className="h-11 w-full animate-pulse rounded-xl bg-white/5" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Error */}
          {!loadingServices && serviceError && (
            <div className="mx-auto mt-14 max-w-xl rounded-3xl border border-red-500/20 bg-red-500/5 p-8 text-center">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10 text-red-400">
                <Wrench size={24} />
              </div>

              <h3 className="mt-4 text-lg font-bold text-white">
                Unable to Load Services
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                {serviceError}
              </p>

              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-5 rounded-xl bg-gradient-to-r from-fuchsia-500 to-violet-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-fuchsia-500/10 transition hover:-translate-y-0.5"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Services */}
          {!loadingServices &&
            !serviceError &&
            services.length > 0 && (
              <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

                {services.slice(0, 6).map((service) => (
                  <article
                    key={service._id}
                    className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] shadow-xl shadow-black/10 transition-all duration-500 hover:-translate-y-2 hover:border-fuchsia-500/30 hover:bg-white/[0.055] hover:shadow-2xl hover:shadow-fuchsia-500/10"
                  >

                    {/* Image */}
                    <div className="relative overflow-hidden">

                      <img
                        src={
                          service.image ||
                          "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=85"
                        }
                        alt={service.title}
                        loading="lazy"
                        className="h-56 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                      {/* Price */}
                      <div className="absolute right-4 top-4 flex items-center gap-1 rounded-xl border border-white/10 bg-slate-950/80 px-3 py-2 text-sm font-bold text-white shadow-lg backdrop-blur-md">
                        <IndianRupee size={14} />
                        {service.price}
                      </div>

                      {/* Icon */}
                      <div className="absolute bottom-4 left-4 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-slate-950/75 text-fuchsia-300 shadow-lg backdrop-blur-md">
                        <Wrench size={19} />
                      </div>

                    </div>

                    {/* Content */}
                    <div className="p-6">

                      <div className="flex items-start justify-between gap-4">

                        <h3 className="text-xl font-bold tracking-tight text-white">
                          {service.title}
                        </h3>

                        <div className="mt-1 flex shrink-0 items-center gap-1 text-xs font-semibold text-slate-400">
                          <Star
                            size={13}
                            className="fill-yellow-400 text-yellow-400"
                          />
                          4.4
                        </div>

                      </div>

                      <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-400">
                        {service.description ||
                          `Professional ${service.title.toLowerCase()} service from a trusted Service Buddy provider.`}
                      </p>

                      <div className="my-5 border-t border-white/5" />

                      <Link
                        to={`/services/${service._id}`}
                        className="group/button flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-fuchsia-500 via-violet-500 to-indigo-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-violet-500/10 transition-all duration-300 hover:from-fuchsia-400 hover:via-violet-500 hover:to-indigo-500 hover:shadow-xl hover:shadow-fuchsia-500/20"
                      >
                        View Service

                        <ArrowRight
                          size={16}
                          className="transition-transform duration-200 group-hover/button:translate-x-1"
                        />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}

          {/* Empty */}
          {!loadingServices &&
            !serviceError &&
            services.length === 0 && (
              <div className="mx-auto mt-14 max-w-xl rounded-3xl border border-white/10 bg-white/[0.03] p-10 text-center">

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-fuchsia-500/10 text-fuchsia-300">
                  <BriefcaseBusiness size={28} />
                </div>

                <h3 className="mt-5 text-xl font-bold text-white">
                  Services Coming Soon
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  We're preparing trusted professionals for you.
                </p>
              </div>
            )}

          {/* View All */}
          {!loadingServices && services.length > 0 && (
            <div className="mt-12 flex justify-center">

              <Link
                to="/services"
                className="group inline-flex items-center gap-2 rounded-xl border border-fuchsia-500/30 bg-fuchsia-500/10 px-6 py-3 text-sm font-bold text-fuchsia-300 transition-all duration-300 hover:border-fuchsia-400 hover:bg-gradient-to-r hover:from-fuchsia-500 hover:to-violet-500 hover:text-white hover:shadow-xl hover:shadow-fuchsia-500/20"
              >
                Explore All Services

                <ArrowRight
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* =========================================================
          WHY CHOOSE US
      ========================================================= */}
      <section className="relative overflow-hidden border-y border-white/5 bg-slate-900/70 px-5 py-20 sm:px-6 lg:px-8 lg:py-24">

        <div className="pointer-events-none absolute left-0 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-fuchsia-500/5 blur-[100px]" />

        <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-indigo-500/10 blur-[100px]" />

        <div className="relative mx-auto max-w-7xl">

          <div className="text-center">

            <p className="text-xs font-bold uppercase tracking-[0.25em] text-fuchsia-400">
              Why Service Buddy
            </p>

            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              Why Choose Service Buddy?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
              We make booking trusted home services fast, secure,
              convenient, and affordable.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="group rounded-3xl border border-white/10 bg-white/[0.03] p-6 text-center transition-all duration-300 hover:-translate-y-2 hover:border-fuchsia-500/30 hover:bg-white/[0.05] hover:shadow-xl hover:shadow-fuchsia-500/5"
                >

                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500/10 via-violet-500/10 to-indigo-500/10 text-fuchsia-300 transition-all duration-300 group-hover:scale-110 group-hover:from-fuchsia-500/20 group-hover:to-indigo-500/20">
                    <Icon size={26} />
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-white">
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {feature.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          LOCATION
      ========================================================= */}
      <section className="bg-slate-950 px-5 py-20 sm:px-6 lg:px-8 lg:py-24">

        <div className="mx-auto max-w-7xl">

          <div className="mb-10 text-center">

            <p className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-fuchsia-400">
              <MapPin size={15} />
              Find Us
            </p>

            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              Service Buddy Near You
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
              Explore our service area and find trusted professionals
              near your location.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-1 shadow-2xl">

            <div className="pointer-events-none absolute -inset-1 rounded-3xl bg-gradient-to-r from-fuchsia-500/10 via-violet-500/10 to-indigo-500/10 blur-xl" />

            <iframe
              title="Service Buddy Location"
              src="https://www.google.com/maps?q=Ghaziabad,Uttar+Pradesh,India&output=embed"
              width="100%"
              height="400"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              className="relative rounded-[1.4rem] grayscale-[20%]"
            />
          </div>
        </div>
      </section>

      {/* =========================================================
          TESTIMONIALS
      ========================================================= */}
      <section className="bg-slate-950 px-5 py-20 sm:px-6 lg:px-8 lg:py-24">

        <div className="mx-auto max-w-7xl">

          <div className="text-center">

            <p className="text-xs font-bold uppercase tracking-[0.25em] text-fuchsia-400">
              Customer Stories
            </p>

            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              What Our Customers Say
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
              Trusted by customers who choose Service Buddy for
              their everyday home service needs.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">

            {testimonials.map((item) => (
              <div
                key={item.name}
                className="group flex flex-col justify-between rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 hover:-translate-y-2 hover:border-fuchsia-500/30 hover:bg-white/[0.05] hover:shadow-xl hover:shadow-fuchsia-500/5"
              >

                <div>

                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={16}
                        className="fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>

                  <p className="mt-5 text-base leading-7 text-slate-300">
                    "{item.review}"
                  </p>
                </div>

                <div className="mt-7 flex items-center gap-3 border-t border-white/5 pt-5">

                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-500 via-violet-500 to-indigo-500 text-sm font-bold text-white shadow-lg shadow-violet-500/10">
                    {item.avatar}
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-white">
                      {item.name}
                    </h3>

                    <p className="text-xs text-slate-500">
                      {item.city}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          CTA
      ========================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-r from-fuchsia-500 via-violet-500 to-indigo-500 px-5 py-20 sm:px-6 lg:px-8">

        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-fuchsia-300/30 blur-3xl" />

        <div className="absolute -bottom-40 -right-20 h-96 w-96 rounded-full bg-blue-300/30 blur-3xl" />

        <div className="relative mx-auto max-w-4xl text-center">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-white/10 backdrop-blur">
            <Zap size={25} className="text-white" />
          </div>

          <p className="mt-6 text-xs font-bold uppercase tracking-[0.25em] text-white/80">
            Get Started
          </p>

          <h2 className="mt-4 text-3xl font-black sm:text-5xl">
            Need a Professional Today?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/80 sm:text-lg">
            Book trusted professionals in just a few clicks.
            Fast, reliable, and convenient.
          </p>

          <Link
            to="/services"
            className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-violet-700 shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:bg-slate-100 hover:shadow-white/20"
          >
            Book a Service Now

            <ArrowRight
              size={17}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </section>

      {/* =========================================================
          FAQ
      ========================================================= */}
      <section className="border-t border-white/5 bg-slate-900/70 px-5 py-20 sm:px-6 lg:px-8 lg:py-24">

        <div className="mx-auto max-w-3xl">

          <div className="mb-12 text-center">

            <p className="text-xs font-bold uppercase tracking-[0.25em] text-fuchsia-400">
              Support
            </p>

            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              Frequently Asked Questions
            </h2>

            <p className="mt-4 text-sm text-slate-400 sm:text-base">
              Everything you need to know about booking with Service Buddy.
            </p>
          </div>

          <div className="space-y-3">

            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;

              return (
                <div
                  key={faq.question}
                  className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                    isOpen
                      ? "border-fuchsia-500/30 bg-fuchsia-500/[0.04]"
                      : "border-white/10 bg-white/[0.03] hover:border-fuchsia-500/20"
                  }`}
                >

                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left text-sm font-bold text-white sm:px-6 sm:text-base"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                  >
                    <span>{faq.question}</span>

                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                        isOpen
                          ? "rotate-180 bg-gradient-to-r from-fuchsia-500 to-violet-500 text-white"
                          : "bg-fuchsia-500/10 text-fuchsia-300"
                      }`}
                    >
                      <ChevronDown size={17} />
                    </span>
                  </button>

                  <div
                    className={`grid transition-all duration-300 ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">

                      <p className="border-t border-white/5 px-5 pb-5 pt-4 text-sm leading-7 text-slate-400 sm:px-6">
                        {faq.answer}
                      </p>

                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Support */}
          <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-center sm:flex-row sm:text-left">

            <div>
              <p className="font-bold text-white">
                Still have questions?
              </p>

              <p className="mt-1 text-sm text-slate-400">
                Our team is ready to help you.
              </p>
            </div>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-xl border border-fuchsia-500/20 bg-fuchsia-500/10 px-5 py-2.5 text-sm font-bold text-fuchsia-300 transition-all duration-300 hover:bg-gradient-to-r hover:from-fuchsia-500 hover:to-violet-500 hover:text-white"
            >
              <Mail size={16} />
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;