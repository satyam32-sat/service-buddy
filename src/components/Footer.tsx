import {
  ArrowRight,
  BriefcaseBusiness,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const popularServices = [
    "Electrician",
    "Plumbing",
    "AC Repair",
    "Home Cleaning",
    "Carpenter",
  ];

  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-[1.5fr_0.8fr_1fr_1.2fr]">

          {/* Brand */}
          <div>
            <Link
              to="/"
              className="group inline-flex items-center gap-2"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-600 text-base font-black text-white shadow-lg shadow-indigo-500/20 transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl">
                SB
              </div>

              <div>
                <h2 className="text-lg font-extrabold tracking-tight text-slate-900">
                  Service<span className="text-indigo-600">Buddy</span>
                </h2>

                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Trusted Services
                </p>
              </div>
            </Link>

            <p className="mt-3 max-w-sm text-sm leading-6 text-slate-600">
              Connecting customers with trusted professionals for
              reliable, convenient, and affordable home services.
            </p>

            <Link
              to="/services"
              className="group mt-4 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-indigo-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet-500/25"
            >
              Explore Services
              <ArrowRight
                size={17}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-900">
              Quick Links
            </h3>

            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="group flex items-center gap-2 text-sm text-slate-600 transition-all duration-200 hover:translate-x-1 hover:text-indigo-600"
                  >
                    <span className="h-1 w-1 rounded-full bg-slate-300 transition-colors group-hover:bg-indigo-600" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Services */}
          <div>
            <h3 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-900">
              <BriefcaseBusiness size={16} className="text-indigo-600" />
              Popular Services
            </h3>

            <ul className="space-y-2">
              {popularServices.map((service) => (
                <li key={service}>
                  <Link
                    to="/services"
                    className="group flex items-center gap-2 text-sm text-slate-600 transition-all duration-200 hover:translate-x-1 hover:text-indigo-600"
                  >
                    <span className="h-1 w-1 rounded-full bg-slate-300 transition-colors group-hover:bg-indigo-600" />
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-900">
              Contact Us
            </h3>

            <div className="space-y-3">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Ghaziabad%2C%20Uttar%20Pradesh"
                target="_blank"
                rel="noreferrer"
                className="group flex items-start gap-3 text-sm text-slate-600 transition hover:text-indigo-600"
              >
                <MapPin
                  size={18}
                  className="mt-0.5 shrink-0 text-indigo-600"
                />

                <span>
                  Ghaziabad,
                  <br />
                  Uttar Pradesh
                </span>
              </a>

              <a
                href="mailto:support@servicebuddy.com"
                className="group flex items-center gap-3 text-sm text-slate-600 transition hover:text-indigo-600"
              >
                <Mail
                  size={18}
                  className="shrink-0 text-indigo-600"
                />
                support@servicebuddy.com
              </a>

              <a
                href="tel:+919876543210"
                className="group flex items-center gap-3 text-sm text-slate-600 transition hover:text-indigo-600"
              >
                <Phone
                  size={18}
                  className="shrink-0 text-indigo-600"
                />
                +91 98765 43210
              </a>
            </div>

            {/* Social */}
            <div className="mt-4 flex gap-2">
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-indigo-200 hover:bg-indigo-600 hover:text-white hover:shadow-lg hover:shadow-indigo-500/20"
              >

              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-violet-200 hover:bg-violet-600 hover:text-white hover:shadow-lg hover:shadow-violet-500/20"
              >

              </a>

              <a
                href="#"
                aria-label="LinkedIn"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-indigo-200 hover:bg-indigo-600 hover:text-white hover:shadow-lg hover:shadow-indigo-500/20"
              >

              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}

{/* Bottom */}
<div className="mt-8 border-t border-slate-200 pt-5">
  <div className="flex flex-col items-center justify-center gap-3 text-center text-xs text-slate-500">

    {/* Copyright */}
    <p>
      © {year}{" "}
      <span className="font-semibold text-slate-700">
        Service Buddy
      </span>
      . All rights reserved.
    </p>

    {/* Legal Links */}
    <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
      <Link
        to="/privacy-policy"
        className="transition-colors duration-200 hover:text-indigo-600"
      >
        Privacy Policy
      </Link>

      <Link
        to="/terms"
        className="transition-colors duration-200 hover:text-indigo-600"
      >
        Terms of Service
      </Link>

      <Link
        to="/faq"
        className="transition-colors duration-200 hover:text-indigo-600"
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
