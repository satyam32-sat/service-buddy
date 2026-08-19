import { useState } from "react";
import {
  Mail,
  MapPin,
  Phone,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  MessageCircle,
} from "lucide-react";

import api from "../api/api";

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const INITIAL_FORM: ContactForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const Contact = () => {
  const [formData, setFormData] =
    useState<ContactForm>(INITIAL_FORM);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) setError("");
    if (success) setSuccess("");
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const name = formData.name.trim();
    const email = formData.email.trim();
    const subject = formData.subject.trim();
    const message = formData.message.trim();

    // Validation
    if (!name || !email || !subject || !message) {
      setError("Please fill in all required fields.");
      return;
    }

    if (name.length < 2) {
      setError("Please enter a valid name.");
      return;
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      setError("Please enter a valid email address.");
      return;
    }

    if (subject.length < 3) {
      setError("Subject must be at least 3 characters.");
      return;
    }

    if (message.length < 10) {
      setError(
        "Message must be at least 10 characters."
      );
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/contact", {
        name,
        email,
        subject,
        message,
      });

      setSuccess(
        response.data?.message ||
          "Your message has been sent successfully."
      );

      setFormData(INITIAL_FORM);
    } catch (err: any) {
      console.error("Contact form error:", err);

      setError(
        err?.response?.data?.message ||
          "Unable to send your message. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50">

      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 py-20 text-white sm:py-24">

        {/* Background Decorations */}
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-40 left-0 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">

            {/* Badge */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-2 text-sm font-semibold text-blue-300 backdrop-blur-sm">
              <MessageCircle className="h-4 w-4" />
              Service Buddy Support
            </div>

            {/* Heading */}
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              We're Here to{" "}
              <span className="text-blue-400">
                Help
              </span>
            </h1>

            {/* Description */}
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
              Have a question, need help with a booking,
              or want to share feedback? Our team is ready
              to help you.
            </p>

          </div>
        </div>
      </section>

      {/* =====================================================
          CONTACT CONTENT
      ====================================================== */}
      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">

        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">

          {/* =================================================
              LEFT — CONTACT INFORMATION
          ================================================== */}
          <div>

            <div className="max-w-xl">

              <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
                Contact Us
              </p>

              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Let's talk about{" "}
                <span className="text-blue-600">
                  your needs
                </span>
              </h2>

              <p className="mt-4 text-base leading-7 text-slate-600">
                Whether you need assistance with a booking,
                have questions about our services, or simply
                want to share feedback, we'd love to hear
                from you.
              </p>

            </div>

            {/* Contact Cards */}
            <div className="mt-8 space-y-4">

              {/* Phone */}
              <a
                href="tel:+919876543210"
                className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/5"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                  <Phone className="h-5 w-5" />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                    Call Us
                  </p>

                  <p className="mt-1 font-bold text-slate-900 transition-colors group-hover:text-blue-600">
                    +91 9876543210
                  </p>
                </div>

                <ArrowRight className="ml-auto h-5 w-5 text-slate-300 transition-all group-hover:translate-x-1 group-hover:text-blue-600" />
              </a>

              {/* Email */}
              <a
                href="mailto:support@servicebuddy.com"
                className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/5"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                  <Mail className="h-5 w-5" />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                    Email Us
                  </p>

                  <p className="mt-1 break-all font-bold text-slate-900 transition-colors group-hover:text-blue-600">
                    support@servicebuddy.com
                  </p>
                </div>

                <ArrowRight className="ml-auto h-5 w-5 shrink-0 text-slate-300 transition-all group-hover:translate-x-1 group-hover:text-blue-600" />
              </a>

              {/* Location */}
              <a
                href="https://www.google.com/maps/search/?api=1&query=New%20Delhi%2C%20India"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/5"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                  <MapPin className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                    Our Location
                  </p>

                  <p className="mt-1 font-bold text-slate-900 transition-colors group-hover:text-blue-600">
                    New Delhi, India
                  </p>
                </div>

                <ArrowRight className="ml-auto h-5 w-5 text-slate-300 transition-all group-hover:translate-x-1 group-hover:text-blue-600" />
              </a>

              {/* Business Hours */}
              <div className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Clock className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                    Business Hours
                  </p>

                  <p className="mt-1 font-bold text-slate-900">
                    Mon – Sat, 9:00 AM – 7:00 PM
                  </p>
                </div>
              </div>

            </div>

            {/* Urgent Support */}
            <div className="mt-6 overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-cyan-50 p-5">
              <div className="flex gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white">
                  <Phone className="h-5 w-5" />
                </div>

                <div>
                  <p className="font-bold text-blue-950">
                    Need urgent assistance?
                  </p>

                  <p className="mt-1 text-sm leading-6 text-blue-700">
                    Call our support team and we'll help you
                    with your booking or service request.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* =================================================
              RIGHT — CONTACT FORM
          ================================================== */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8 lg:p-10">

            {/* Form Header */}
            <div className="mb-8">

              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Send className="h-5 w-5" />
              </div>

              <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
                Send a Message
              </p>

              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">
                How can we help?
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Fill out the form below and our team will
                get back to you as soon as possible.
              </p>

            </div>

            {/* Success */}
            {success && (
              <div
                role="status"
                className="mb-6 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />

                <div>
                  <p className="font-semibold text-green-800">
                    Message sent successfully
                  </p>

                  <p className="mt-1 text-sm text-green-700">
                    {success}
                  </p>
                </div>
              </div>
            )}

            {/* Error */}
            {error && (
              <div
                role="alert"
                className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4"
              >
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />

                <div>
                  <p className="font-semibold text-red-800">
                    Something went wrong
                  </p>

                  <p className="mt-1 text-sm text-red-700">
                    {error}
                  </p>
                </div>
              </div>
            )}

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
              noValidate
            >

              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Full Name
                  <span className="ml-1 text-red-500">
                    *
                  </span>
                </label>

                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  autoComplete="name"
                  required
                  minLength={2}
                  maxLength={100}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Email Address
                  <span className="ml-1 text-red-500">
                    *
                  </span>
                </label>

                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  maxLength={150}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                />
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Subject
                  <span className="ml-1 text-red-500">
                    *
                  </span>
                </label>

                <input
                  id="subject"
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help?"
                  required
                  minLength={3}
                  maxLength={150}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                />
              </div>

              {/* Message */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-slate-700"
                  >
                    Message
                    <span className="ml-1 text-red-500">
                      *
                    </span>
                  </label>

                  <span
                    className={`text-xs ${
                      formData.message.length > 900
                        ? "text-red-500"
                        : "text-slate-400"
                    }`}
                  >
                    {formData.message.length}/1000
                  </span>
                </div>

                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us how we can help..."
                  required
                  minLength={10}
                  maxLength={1000}
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-4 font-bold text-white shadow-lg shadow-blue-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/25 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Sending Message...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>

              {/* Response Time */}
              <div className="flex items-center justify-center gap-2 pt-1">
                <CheckCircle2 className="h-4 w-4 text-blue-500" />

                <p className="text-center text-xs text-slate-400">
                  We typically respond within 24 hours.
                </p>
              </div>

            </form>
          </div>

        </div>
      </section>
    </main>
  );
};

export default Contact;