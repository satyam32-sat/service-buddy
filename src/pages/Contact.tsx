import { useState } from "react";
import api from "../api/api";

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact = () => {
  const [formData, setFormData] = useState<ContactForm>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
    setSuccess("");
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.subject.trim() ||
      !formData.message.trim()
    ) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post(
        "/contact",
        formData
      );

      setSuccess(
        response.data.message ||
          "Your message has been sent successfully."
      );

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error: any) {
      console.error(
        "Contact form error:",
        error
      );

      setError(
        error?.response?.data?.message ||
          "Unable to send your message. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-950 via-blue-950 to-gray-900 py-24 text-white">

        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />

        <div className="absolute -bottom-32 left-10 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-6 text-center">

          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-400">
            Service Buddy
          </p>

          <h1 className="mt-4 text-4xl font-extrabold sm:text-5xl lg:text-6xl">
            We're Here to Help
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-300">
            Have a question, feedback, or need assistance?
            Our support team is ready to help you.
          </p>

        </div>
      </section>

      {/* Contact Section */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:py-20">

        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">

          {/* Contact Information */}
          <div>

            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Contact Us
            </p>

            <h2 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Get in touch
            </h2>

            <p className="mt-4 max-w-lg leading-7 text-gray-600">
              Whether you need help with a booking, have a
              question about our services, or simply want to
              share feedback, we'd love to hear from you.
            </p>

            <div className="mt-8 space-y-4">

              {/* Phone */}
              <div className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg">
                <div className="flex items-center gap-4">

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-xl">
                    📞
                  </div>

                  <div>
                    <p className="text-sm text-gray-400">
                      Call Us
                    </p>

                    <a
                      href="tel:+919876543210"
                      className="font-bold text-gray-900 hover:text-blue-600"
                    >
                      +91 9876543210
                    </a>
                  </div>

                </div>
              </div>

              {/* Email */}
              <div className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg">
                <div className="flex items-center gap-4">

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-xl">
                    ✉️
                  </div>

                  <div>
                    <p className="text-sm text-gray-400">
                      Email Us
                    </p>

                    <a
                      href="mailto:support@servicebuddy.com"
                      className="break-all font-bold text-gray-900 hover:text-blue-600"
                    >
                      support@servicebuddy.com
                    </a>
                  </div>

                </div>
              </div>

              {/* Location */}
              <div className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg">
                <div className="flex items-center gap-4">

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-xl">
                    📍
                  </div>

                  <div>
                    <p className="text-sm text-gray-400">
                      Our Location
                    </p>

                    <p className="font-bold text-gray-900">
                      New Delhi, India
                    </p>
                  </div>

                </div>
              </div>

              {/* Hours */}
              <div className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg">
                <div className="flex items-center gap-4">

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-xl">
                    🕒
                  </div>

                  <div>
                    <p className="text-sm text-gray-400">
                      Business Hours
                    </p>

                    <p className="font-bold text-gray-900">
                      Mon – Sat, 9:00 AM – 7:00 PM
                    </p>
                  </div>

                </div>
              </div>

            </div>

            <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-5">
              <p className="font-bold text-blue-900">
                Need urgent assistance?
              </p>

              <p className="mt-1 text-sm leading-6 text-blue-700">
                Call our support team and we'll help you
                with your booking or service request.
              </p>
            </div>

          </div>

          {/* Contact Form */}
          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-xl sm:p-8 lg:p-10">

            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                Send a Message
              </p>

              <h2 className="mt-2 text-3xl font-extrabold text-gray-900">
                How can we help?
              </h2>

              <p className="mt-2 text-gray-500">
                Fill out the form and our team will respond as
                soon as possible.
              </p>
            </div>

            {/* Success */}
            {success && (
              <div className="mb-6 rounded-xl border border-green-200 bg-green-50 p-4">
                <p className="font-medium text-green-700">
                  ✓ {success}
                </p>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4">
                <p className="font-medium text-red-700">
                  ! {error}
                </p>
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Full Name
                </label>

                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  minLength={2}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                />
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Subject
                </label>

                <input
                  id="subject"
                  type="text"
                  name="subject"
                  placeholder="How can we help?"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  minLength={3}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  placeholder="Tell us how we can help..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  minLength={10}
                  className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                />

                <p className="mt-2 text-right text-xs text-gray-400">
                  {formData.message.length} characters
                </p>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 py-4 font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    Sending...
                  </span>
                ) : (
                  "Send Message →"
                )}
              </button>

              <p className="text-center text-xs text-gray-400">
                We typically respond within 24 hours.
              </p>

            </form>
          </div>

        </div>
      </section>
    </main>
  );
};

export default Contact;