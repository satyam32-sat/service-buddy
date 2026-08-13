import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

useEffect(() => {
  if (!user) {
    navigate("/login");
    return;
  }

  if (user.role !== "client") {
    navigate("/");
    return;
  }


  setFormData((prev) => ({
    ...prev,
    fullName: user.name || "",
    email: user.email || "",
    phone: user.phone || "",
  }));
  
}, [user, navigate]);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    date: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);

  // Only clients can access booking
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (user.role !== "client") {
      navigate("/");
      return;
    }

    // Auto-fill logged-in client data
    setFormData((prev) => ({
      ...prev,
      fullName: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
    }));
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.date ||
      !formData.address
    ) {
      alert("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/bookings", {
        service: id,
        bookingDate: formData.date,
        address: formData.address,
      });

      console.log("Booking successful:", response.data);

      alert("Booking Submitted Successfully!");

      navigate("/client/dashboard");
    } catch (error: any) {
      console.error("Booking error:", error);

      alert(
        error?.response?.data?.message ||
          "Booking failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!user || user.role !== "client") {
    return null;
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-16">
      <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="mb-3 text-3xl font-bold text-gray-900">
          Book Your Service
        </h1>

        <p className="mb-8 text-gray-600">
          Booking Service ID: {id}
        </p>

        <form
          className="space-y-6"
          onSubmit={handleSubmit}
        >
          {/* Full Name */}
          <input
            type="text"
            placeholder="Full Name"
            value={formData.fullName}
            readOnly
            className="w-full rounded-lg border bg-gray-100 p-4 outline-none"
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email Address"
            value={formData.email}
            readOnly
            className="w-full rounded-lg border bg-gray-100 p-4 outline-none"
          />

          {/* Phone */}
          <input
            type="tel"
            placeholder="Mobile Number"
            value={formData.phone}
            readOnly
            className="w-full rounded-lg border bg-gray-100 p-4 outline-none"
          />

          {/* Date */}
          <input
            type="date"
            value={formData.date}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) =>
              setFormData({
                ...formData,
                date: e.target.value,
              })
            }
            className="w-full rounded-lg border p-4 outline-none focus:border-blue-600"
          />

          {/* Address */}
          <textarea
            rows={4}
            placeholder="Service Address"
            value={formData.address}
            onChange={(e) =>
              setFormData({
                ...formData,
                address: e.target.value,
              })
            }
            className="w-full rounded-lg border p-4 outline-none focus:border-blue-600"
          />

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 py-4 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Booking..." : "Confirm Booking"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default Booking;