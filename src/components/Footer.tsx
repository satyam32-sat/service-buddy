import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-gray-50">

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-6 py-14 lg:py-16">

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_0.9fr_1.1fr]">

          {/* Brand */}
          <div>

            <Link
              to="/"
              className="inline-flex items-center gap-3"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-lg font-extrabold text-white shadow-lg">
                SB
              </div>

              <div>
                <h2 className="text-xl font-extrabold tracking-tight text-gray-900">
                  Service Buddy
                </h2>

                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                  Trusted Services
                </p>
              </div>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-gray-600">
              Connecting customers with trusted professionals
              for reliable, convenient, and affordable home
              services.
            </p>

            {/* CTA */}
            <Link
              to="/services"
              className="mt-6 inline-flex items-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg"
            >
              Explore Services →
            </Link>

          </div>

          {/* Quick Links */}
          <div>

            <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-gray-900">
              Quick Links
            </h3>

            <ul className="space-y-3">

              <li>
                <Link
                  to="/"
                  className="text-sm text-gray-600 transition hover:translate-x-1 hover:text-blue-600"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/services"
                  className="text-sm text-gray-600 transition hover:translate-x-1 hover:text-blue-600"
                >
                  Services
                </Link>
              </li>

              <li>
                <Link
                  to="/about"
                  className="text-sm text-gray-600 transition hover:translate-x-1 hover:text-blue-600"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="text-sm text-gray-600 transition hover:translate-x-1 hover:text-blue-600"
                >
                  Contact
                </Link>
              </li>

            </ul>

          </div>

          {/* Popular Services */}
          <div>

            <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-gray-900">
              Popular Services
            </h3>

            <ul className="space-y-3">

              <li>
                <Link
                  to="/services"
                  className="text-sm text-gray-600 transition hover:text-blue-600"
                >
                  Electrician
                </Link>
              </li>

              <li>
                <Link
                  to="/services"
                  className="text-sm text-gray-600 transition hover:text-blue-600"
                >
                  Plumbing
                </Link>
              </li>

              <li>
                <Link
                  to="/services"
                  className="text-sm text-gray-600 transition hover:text-blue-600"
                >
                  AC Repair
                </Link>
              </li>

              <li>
                <Link
                  to="/services"
                  className="text-sm text-gray-600 transition hover:text-blue-600"
                >
                  Home Cleaning
                </Link>
              </li>

              <li>
                <Link
                  to="/services"
                  className="text-sm text-gray-600 transition hover:text-blue-600"
                >
                  Carpenter
                </Link>
              </li>

            </ul>

          </div>

          {/* Contact */}
          <div>

            <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-gray-900">
              Contact Us
            </h3>

            <div className="space-y-4">

              <a
                href="https://www.google.com/maps/search/?api=1&query=Ghaziabad%2C%20Uttar%20Pradesh"
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-3 text-sm text-gray-600 transition hover:text-blue-600"
              >
                <span className="text-lg">📍</span>
                <span>
                  Ghaziabad,
                  <br />
                  Uttar Pradesh
                </span>
              </a>

              <a
                href="mailto:support@servicebuddy.com"
                className="flex items-center gap-3 text-sm text-gray-600 transition hover:text-blue-600"
              >
                <span className="text-lg">✉️</span>
                support@servicebuddy.com
              </a>

              <a
                href="tel:+919876543210"
                className="flex items-center gap-3 text-sm text-gray-600 transition hover:text-blue-600"
              >
                <span className="text-lg">📞</span>
                +91 98765 43210
              </a>

            </div>

            {/* Social */}
            <div className="mt-6 flex gap-3">

              <a
                href="#"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white font-bold text-gray-600 shadow-sm transition hover:-translate-y-1 hover:border-blue-500 hover:bg-blue-600 hover:text-white hover:shadow-md"
              >
                f
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white font-bold text-gray-600 shadow-sm transition hover:-translate-y-1 hover:border-pink-500 hover:bg-pink-500 hover:text-white hover:shadow-md"
              >
                ◎
              </a>

              <a
                href="#"
                aria-label="X"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white font-bold text-gray-600 shadow-sm transition hover:-translate-y-1 hover:border-gray-900 hover:bg-gray-900 hover:text-white hover:shadow-md"
              >
                X
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-xs font-bold text-gray-600 shadow-sm transition hover:-translate-y-1 hover:border-blue-700 hover:bg-blue-700 hover:text-white hover:shadow-md"
              >
                in
              </a>

            </div>

          </div>

        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-gray-200 pt-7">

          <div className="flex flex-col gap-5 text-center text-sm text-gray-500 md:flex-row md:items-center md:justify-between md:text-left">

            <p>
              © {year}{" "}
              <span className="font-semibold text-gray-700">
                Service Buddy
              </span>
              . All rights reserved.
            </p>

            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 md:justify-end">

              <Link
                to="/privacy-policy"
                className="transition hover:text-blue-600"
              >
                Privacy Policy
              </Link>

              <Link
                to="/terms"
                className="transition hover:text-blue-600"
              >
                Terms of Service
              </Link>

              <Link
                to="/faq"
                className="transition hover:text-blue-600"
              >
                FAQ
              </Link>

            </div>

          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;