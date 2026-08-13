import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";

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

const Home = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const [serviceError, setServiceError] = useState("");

  const [openFaqIndex, setOpenFaqIndex] =
    useState<number | null>(null);

  // ============================
  // FETCH SERVICES FROM MONGODB
  // ============================

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
    setOpenFaqIndex(
      openFaqIndex === index ? null : index
    );
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#020713] text-white">

      {/* ================= HERO ================= */}

      <section className="relative overflow-hidden border-b border-blue-500/20 bg-[#020713]">

        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />

        <div className="absolute -right-40 top-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-between gap-14 px-6 py-20 lg:flex-row lg:py-28">

          {/* Hero Content */}

          <div className="max-w-2xl text-center lg:text-left">

            <span className="inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-5 py-2 text-sm font-semibold text-blue-400">
              Trusted Home Services
            </span>

            <h1 className="mt-7 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Book Trusted

              <span className="block">
                Home Services
              </span>

              <span className="mt-2 block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Anytime, Anywhere
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-gray-400 sm:text-xl">
              Find verified electricians, plumbers,
              carpenters, cleaners, painters, AC technicians,
              and more — all in one place.
            </p>

            <div className="mt-9 flex flex-wrap justify-center gap-4 lg:justify-start">

              <Link
                to="/services"
                className="rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-4 font-bold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-600/30"
              >
                Explore Services →
              </Link>

              <Link
                to="/register"
                className="rounded-xl border border-white/10 bg-white/5 px-8 py-4 font-bold text-gray-200 transition hover:border-blue-500/40 hover:bg-white/10"
              >
                Get Started
              </Link>

            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-5 text-sm text-gray-500 lg:justify-start">
              <span>✓ Verified Professionals</span>
              <span>✓ Transparent Pricing</span>
              <span>✓ Easy Booking</span>
            </div>

          </div>

          {/* Hero Image */}

          <div className="relative w-full max-w-xl lg:w-1/2">

            <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-r from-blue-600 to-cyan-500 opacity-50 blur-xl" />

            <div className="relative overflow-hidden rounded-[2rem] border border-blue-500/30 bg-[#0b0f19] p-2 shadow-2xl">

              <img
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1000&q=85"
                alt="Professional home service"
                className="h-[420px] w-full rounded-[1.5rem] object-cover"
                loading="eager"
              />

              <div className="absolute bottom-7 left-7 right-7 rounded-2xl border border-white/10 bg-[#070b15]/90 p-5 shadow-2xl backdrop-blur-md">

                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-sm text-gray-400">
                      Trusted Service
                    </p>

                    <p className="mt-1 font-bold text-white">
                      Professional & Reliable
                    </p>
                  </div>

                  <div className="rounded-xl bg-blue-600 px-4 py-2 font-bold">
                    ★ 4.4
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ================= SERVICES ================= */}

      <section className="mx-auto max-w-7xl px-6 py-20 lg:py-24">

        <div className="text-center">

          <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-400">
            Our Services
          </p>

          <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl lg:text-5xl">
            Popular Home Services
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-400">
            Choose from our most requested professional
            home services and get your work done with confidence.
          </p>

        </div>

        {/* ================= SERVICE LOADING ================= */}

        {loadingServices && (
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {[1, 2, 3, 4, 5, 6].map((item) => (

              <div
                key={item}
                className="overflow-hidden rounded-3xl border border-white/10 bg-[#0b0f19]"
              >

                <div className="h-52 animate-pulse bg-white/5" />

                <div className="space-y-4 p-7">

                  <div className="h-7 w-2/3 animate-pulse rounded bg-white/5" />

                  <div className="h-4 w-full animate-pulse rounded bg-white/5" />

                  <div className="h-4 w-4/5 animate-pulse rounded bg-white/5" />

                  <div className="h-12 w-full animate-pulse rounded-xl bg-white/5" />

                </div>

              </div>

            ))}

          </div>
        )}

        {/* ================= SERVICE ERROR ================= */}

        {!loadingServices && serviceError && (

          <div className="mx-auto mt-14 max-w-xl rounded-2xl border border-red-500/20 bg-red-500/10 p-6 text-center">

            <p className="font-semibold text-red-400">
              {serviceError}
            </p>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-4 rounded-xl bg-red-500 px-5 py-2.5 font-semibold text-white transition hover:bg-red-600"
            >
              Try Again
            </button>

          </div>

        )}

        {/* ================= SERVICES FROM MONGODB ================= */}

        {!loadingServices &&
          !serviceError &&
          services.length > 0 && (

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

              {services.slice(0, 6).map((service) => (

                <div
                  key={service._id}
                  className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-[#0b0f19] shadow-xl transition duration-300 hover:-translate-y-2 hover:border-blue-500/40 hover:bg-[#101522] hover:shadow-blue-500/10"
                >

                  <div>

                    {/* Service Image */}

                    <div className="relative overflow-hidden">

                      <img
                        src={
                          service.image ||
                          "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=85"
                        }
                        alt={service.title}
                        loading="lazy"
                        className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
                      />

                      <div className="absolute right-4 top-4 rounded-xl border border-white/20 bg-[#070b15]/85 px-4 py-2 text-sm font-bold text-white shadow-lg backdrop-blur-md">
                        ₹{service.price}
                      </div>

                    </div>

                    {/* Service Content */}

                    <div className="p-7">

                      <h3 className="text-2xl font-bold text-white">
                        {service.title}
                      </h3>

                      <p className="mt-3 leading-7 text-gray-400">
                        {service.description ||
                          `Professional ${service.title.toLowerCase()} service from a trusted Service Buddy provider.`}
                      </p>

                    </div>

                  </div>

                  <div className="px-7 pb-7">

                    <Link
                      to={`/services/${service._id}`}
                      className="block rounded-xl border border-white/10 bg-[#171a23] px-5 py-3.5 text-center font-semibold text-blue-400 transition group-hover:border-blue-500 group-hover:bg-blue-600 group-hover:text-white"
                    >
                      Book Now →
                    </Link>

                  </div>

                </div>

              ))}

            </div>

          )}

        {/* ================= NO SERVICES ================= */}

        {!loadingServices &&
          !serviceError &&
          services.length === 0 && (

            <div className="mt-14 rounded-3xl border border-white/10 bg-[#0b0f19] p-10 text-center">

              <div className="text-5xl">
                🛠️
              </div>

              <h3 className="mt-5 text-2xl font-bold text-white">
                No Services Available
              </h3>

              <p className="mt-3 text-gray-400">
                Services will appear here once they are added.
              </p>

            </div>

          )}

        <div className="mt-10 text-center">

          <Link
            to="/services"
            className="inline-flex rounded-xl border border-blue-500/30 bg-blue-500/10 px-7 py-3.5 font-semibold text-blue-400 transition hover:bg-blue-600 hover:text-white"
          >
            View All Services →
          </Link>

        </div>

      </section>

      {/* ================= WHY CHOOSE US ================= */}

      <section className="border-y border-white/5 bg-[#070b15] py-20 lg:py-24">

        <div className="mx-auto max-w-7xl px-6">

          <div className="text-center">

            <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-400">
              Why Service Buddy
            </p>

            <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">
              Why Choose Service Buddy?
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-400">
              We make booking trusted home services fast,
              secure, convenient, and affordable.
            </p>

          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {[
              {
                icon: "✓",
                title: "Verified Pros",
                desc: "Trusted professionals for your everyday home service needs.",
              },
              {
                icon: "⚡",
                title: "Fast Booking",
                desc: "Find and book the service you need in just a few clicks.",
              },
              {
                icon: "₹",
                title: "Clear Pricing",
                desc: "Transparent service pricing without unnecessary surprises.",
              },
              {
                icon: "★",
                title: "Customer Support",
                desc: "We're here to help whenever you need assistance.",
              },
            ].map((feature) => (

              <div
                key={feature.title}
                className="rounded-3xl border border-white/10 bg-[#11141d] p-7 text-center transition hover:-translate-y-1 hover:border-blue-500/30"
              >

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10 text-3xl font-bold text-blue-400">
                  {feature.icon}
                </div>

                <h3 className="mt-6 text-xl font-bold">
                  {feature.title}
                </h3>

                <p className="mt-3 leading-7 text-gray-400">
                  {feature.desc}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* ================= STATS ================= */}

      <section className="border-b border-blue-400/20 bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 py-16">

        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 px-6 text-center md:grid-cols-4">

          {[
            {
              stat: "1K+",
              label: "Happy Customers",
            },
            {
              stat: "50+",
              label: "Verified Pros",
            },
            {
              stat: "2K+",
              label: "Tasks Done",
            },
            {
              stat: "4.4★",
              label: "Average Rating",
            },
          ].map((item) => (

            <div key={item.label}>

              <h2 className="text-4xl font-extrabold sm:text-5xl">
                {item.stat}
              </h2>

              <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-blue-100">
                {item.label}
              </p>

            </div>

          ))}

        </div>

      </section>

      {/* ================= GOOGLE MAP ================= */}

      <section className="bg-[#020713] py-20 lg:py-24">

        <div className="mx-auto max-w-7xl px-6">

          <div className="mb-10 text-center">

            <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-400">
              Find Us
            </p>

            <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">
              Service Buddy Near You
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-400">
              Explore our service area and find trusted professionals
              near your location.
            </p>

          </div>

          <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#0b0f19] shadow-2xl">

            <iframe
              title="Service Buddy Location"
              src="https://www.google.com/maps?q=Ghaziabad,Uttar+Pradesh,India&output=embed"
              width="100%"
              height="450"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />

          </div>

        </div>

      </section>

      {/* ================= TESTIMONIALS ================= */}

      <section className="mx-auto max-w-7xl px-6 py-20 lg:py-24">

        <div className="text-center">

          <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-400">
            Customer Stories
          </p>

          <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">
            What Our Customers Say
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-400">
            Trusted by customers who choose Service Buddy
            for their everyday home service needs.
          </p>

        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">

          {testimonials.map((item) => (

            <div
              key={item.name}
              className="flex flex-col justify-between rounded-3xl border border-white/10 bg-[#0b0f19] p-7 shadow-xl transition hover:-translate-y-1 hover:border-blue-500/30"
            >

              <div>

                <div className="text-lg tracking-widest text-yellow-400">
                  ★★★★★
                </div>

                <p className="mt-6 text-lg leading-8 text-gray-300">
                  "{item.review}"
                </p>

              </div>

              <div className="mt-8 flex items-center gap-4 border-t border-white/5 pt-6">

                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 font-bold text-white">
                  {item.avatar}
                </div>

                <div>

                  <h3 className="font-bold text-white">
                    {item.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {item.city}
                  </p>

                </div>

              </div>

            </div>

          ))}

        </div>

      </section>

      {/* ================= CTA ================= */}

      <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-500 py-20">

        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-white/10 blur-3xl" />

        <div className="absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-cyan-300/10 blur-3xl" />

        <div className="relative mx-auto max-w-4xl px-6 text-center">

          <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-100">
            Get Started
          </p>

          <h2 className="mt-4 text-4xl font-extrabold sm:text-5xl">
            Need a Professional Today?
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-blue-100">
            Book trusted professionals in just a few clicks.
            Fast, reliable, and convenient.
          </p>

          <Link
            to="/services"
            className="mt-9 inline-flex rounded-xl bg-white px-8 py-4 font-bold text-blue-700 shadow-2xl transition hover:-translate-y-1 hover:bg-gray-100"
          >
            Book a Service Now →
          </Link>

        </div>

      </section>

      {/* ================= FAQ ================= */}

      <section className="border-t border-white/5 bg-[#070b15] py-20 lg:py-24">

        <div className="mx-auto max-w-3xl px-6">

          <div className="mb-14 text-center">

            <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-400">
              Support
            </p>

            <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">
              Frequently Asked Questions
            </h2>

            <p className="mt-4 text-gray-400">
              Everything you need to know about booking with
              Service Buddy.
            </p>

          </div>

          <div className="space-y-4">

            {faqs.map((faq, index) => (

              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-white/10 bg-[#11141d] transition hover:border-blue-500/30"
              >

                <button
                  type="button"
                  className="flex w-full items-center justify-between px-6 py-5 text-left text-lg font-semibold text-white"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={openFaqIndex === index}
                >

                  <span>
                    {faq.question}
                  </span>

                  <span className="ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-xl font-normal text-blue-400">
                    {openFaqIndex === index
                      ? "−"
                      : "+"}
                  </span>

                </button>

                <div
                  className={`grid transition-all duration-300 ${
                    openFaqIndex === index
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >

                  <div className="overflow-hidden">

                    <p className="border-t border-white/5 px-6 pb-6 pt-5 leading-7 text-gray-400">
                      {faq.answer}
                    </p>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

    </main>
  );
};

export default Home;