import { Link } from "react-router-dom";

const features = [
  {
    icon: "✓",
    title: "Verified Professionals",
    description:
      "We connect you with trusted professionals so you can book home services with confidence.",
  },
  {
    icon: "⚡",
    title: "Fast & Easy Booking",
    description:
      "Find the right service, choose a professional, and book your service in just a few clicks.",
  },
  {
    icon: "₹",
    title: "Transparent Pricing",
    description:
      "Know what you are paying for with clear service pricing and no unnecessary surprises.",
  },
  {
    icon: "★",
    title: "Customer First",
    description:
      "Your experience matters. We focus on reliable service and customer satisfaction.",
  },
];

const stats = [
  {
    number: "1K+",
    title: "Happy Customers",
  },
  {
    number: "50+",
    title: "Professionals",
  },
  {
    number: "2K+",
    title: "Services Completed",
  },
  {
    number: "4.4★",
    title: "Average Rating",
  },
];

const values = [
  {
    icon: "🤝",
    title: "Trust & Transparency",
    description:
      "We believe customers should have clear information, reliable professionals, and transparent service experiences.",
  },
  {
    icon: "💙",
    title: "Quality Service",
    description:
      "We aim to make every booking simple, professional, and focused on delivering a better customer experience.",
  },
  {
    icon: "🔒",
    title: "Safety & Reliability",
    description:
      "We work toward creating a dependable platform where customers can confidently discover and book services.",
  },
  {
    icon: "🚀",
    title: "Continuous Improvement",
    description:
      "We continuously improve our platform to make finding and booking home services faster and easier.",
  },
];

const About = () => {
  return (
    <main className="min-h-screen overflow-hidden bg-[#020713] text-white">

      {/* ================= HERO ================= */}

      <section className="relative overflow-hidden border-b border-blue-500/20 bg-[#020713] py-24">

        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />

        <div className="absolute -right-32 top-20 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6">

          <div className="mx-auto max-w-4xl text-center">

            <span className="inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-5 py-2 text-sm font-semibold text-blue-400">
              About Service Buddy
            </span>

            <h1 className="mt-7 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-7xl">
              Making Home Services
              <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Simple & Reliable
              </span>
            </h1>

            <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-gray-400">
              Service Buddy connects customers with trusted
              professionals for everyday home services — making
              it easier to find, compare, and book the help you need.
            </p>

            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">

              <Link
                to="/services"
                className="rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-4 font-bold text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/30"
              >
                Explore Services →
              </Link>

              <Link
                to="/contact"
                className="rounded-xl border border-white/10 bg-white/5 px-8 py-4 font-bold text-gray-200 backdrop-blur-sm transition hover:border-blue-500/40 hover:bg-white/10"
              >
                Contact Us
              </Link>

            </div>

          </div>

        </div>
      </section>

      {/* ================= MISSION ================= */}

      <section className="mx-auto max-w-7xl px-6 py-20 lg:py-24">

        <div className="grid items-center gap-12 lg:grid-cols-2">

          {/* Mission Text */}
          <div>

            <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-400">
              Our Mission
            </p>

            <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              Better services.
              <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Better experiences.
              </span>
            </h2>

            <p className="mt-6 leading-8 text-gray-400">
              Our mission is to simplify the way people find and
              book home services. Instead of searching through
              multiple places, Service Buddy brings customers and
              service professionals together on one platform.
            </p>

            <p className="mt-4 leading-8 text-gray-400">
              From electrical work and plumbing to cleaning,
              appliance repair, and other household needs, we want
              every booking to feel simple, transparent, and reliable.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">

              <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-400">
                ✓ Trusted Professionals
              </span>

              <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-400">
                ✓ Simple Booking
              </span>

              <span className="rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-2 text-sm font-semibold text-purple-400">
                ✓ Customer Focused
              </span>

            </div>

          </div>

          {/* Mission Card */}
          <div className="relative">

            <div className="rounded-[2rem] border-4 border-blue-600 bg-[#020713] p-1 shadow-2xl shadow-blue-500/10">

              <div className="rounded-[1.6rem] bg-[#070b15] p-8 sm:p-10">

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-3xl shadow-lg shadow-blue-600/30">
                  🤝
                </div>

                <h3 className="mt-8 text-2xl font-bold text-white sm:text-3xl">
                  Connecting People & Professionals
                </h3>

                <p className="mt-5 text-lg leading-8 text-gray-400">
                  We are building a service marketplace where
                  customers can discover professionals and
                  professionals can grow their service business.
                </p>

                <div className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-2">

                  <div className="rounded-3xl bg-[#171a23] p-6">

                    <p className="text-4xl font-extrabold text-blue-400">
                      24/7
                    </p>

                    <p className="mt-2 text-gray-400">
                      Platform Access
                    </p>

                  </div>

                  <div className="rounded-3xl bg-[#171a23] p-6">

                    <p className="text-4xl font-extrabold text-cyan-400">
                      Easy
                    </p>

                    <p className="mt-2 text-gray-400">
                      Booking Experience
                    </p>

                  </div>

                </div>

              </div>
            </div>

          </div>

        </div>

      </section>

      {/* ================= STATS ================= */}

      <section className="border-y border-white/5 bg-[#070b15] py-16">

        <div className="mx-auto max-w-7xl px-6">

          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">

            {stats.map((item) => (

              <div
                key={item.title}
                className="text-center"
              >

                <h3 className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl">
                  {item.number}
                </h3>

                <p className="mt-3 text-sm font-medium text-gray-500 sm:text-base">
                  {item.title}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* ================= WHY CHOOSE US ================= */}

      <section className="mx-auto max-w-7xl px-6 py-20 lg:py-24">

        <div className="mx-auto max-w-3xl text-center">

          <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-400">
            Why Service Buddy
          </p>

          <h2 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
            Everything you need
            <span className="block text-gray-500">
              in one place
            </span>
          </h2>

          <p className="mt-5 leading-7 text-gray-400">
            We are focused on making home service discovery
            and booking convenient, reliable, and simple.
          </p>

        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {features.map((item) => (

            <div
              key={item.title}
              className="group rounded-3xl border border-white/10 bg-[#0b0f19] p-7 shadow-xl transition duration-300 hover:-translate-y-2 hover:border-blue-500/40 hover:bg-[#101522] hover:shadow-blue-500/10"
            >

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600/10 text-2xl font-bold text-blue-400 transition group-hover:bg-blue-600 group-hover:text-white">
                {item.icon}
              </div>

              <h3 className="mt-6 text-xl font-bold text-white">
                {item.title}
              </h3>

              <p className="mt-3 leading-7 text-gray-400">
                {item.description}
              </p>

            </div>

          ))}

        </div>

      </section>

      {/* ================= VALUES ================= */}

      <section className="border-y border-white/5 bg-[#070b15] py-20 lg:py-24">

        <div className="mx-auto max-w-7xl px-6">

          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">

            {/* Heading */}
            <div>

              <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-400">
                Our Values
              </p>

              <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl lg:text-5xl">
                What we
                <span className="block text-gray-500">
                  stand for
                </span>
              </h2>

              <p className="mt-6 max-w-md leading-8 text-gray-400">
                Our values guide the way we build the platform
                and the experience we want customers and
                professionals to have.
              </p>

              <Link
                to="/contact"
                className="mt-8 inline-flex rounded-xl bg-blue-600 px-7 py-3.5 font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 hover:shadow-blue-600/30"
              >
                Talk to Us →
              </Link>

            </div>

            {/* Value Cards */}
            <div className="grid gap-5 sm:grid-cols-2">

              {values.map((item) => (

                <div
                  key={item.title}
                  className="rounded-3xl border border-white/10 bg-[#11141d] p-7 transition duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:bg-[#151923]"
                >

                  <div className="text-3xl">
                    {item.icon}
                  </div>

                  <h3 className="mt-5 text-xl font-bold text-white">
                    {item.title}
                  </h3>

                  <p className="mt-3 leading-7 text-gray-400">
                    {item.description}
                  </p>

                </div>

              ))}

            </div>

          </div>

        </div>

      </section>

      {/* ================= CTA ================= */}

      <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-500 py-20">

        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-white/10 blur-3xl" />

        <div className="absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-cyan-300/10 blur-3xl" />

        <div className="relative mx-auto max-w-5xl px-6 text-center">

          <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-100">
            Get Started
          </p>

          <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl lg:text-5xl">
            Need a service?
            <span className="block">
              We've got you covered.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-blue-100">
            Find trusted professionals and book the service
            you need in just a few simple steps.
          </p>

          <Link
            to="/services"
            className="mt-9 inline-flex rounded-xl bg-white px-8 py-4 font-bold text-blue-700 shadow-2xl transition hover:-translate-y-1 hover:bg-gray-100"
          >
            Explore Services →
          </Link>

        </div>

      </section>

    </main>
  );
};

export default About;