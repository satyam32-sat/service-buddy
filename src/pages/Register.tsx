import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import AuthLayout from "../components/auth/AuthLayout";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

interface RegisterFormData {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("client");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>();

  const password = watch("password");

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const response = await api.post("/auth/register", {
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
        role,
      });

      console.log("Registration successful:", response.data);

      const userRole = response.data.user.role;

if (userRole === "client") {
  navigate("/client/dashboard");
} else if (userRole === "provider") {
  navigate("/provider/dashboard");
}
    } catch (error: any) {
      console.error("Registration error:", error);

      alert(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    }
  };

  return (
      
  <AuthLayout
    title="Create Your Account"
    subtitle="Register to find trusted service professionals"
  >
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <div>
          <label className="mb-3 block font-semibold text-gray-700">
            Register As
          </label>

          <div className="grid grid-cols-2 gap-4">

            <button
              type="button"
              onClick={() => setRole("client")}
              className={`rounded-lg border p-3 font-semibold transition ${
                role === "client"
                  ? "border-yellow-400 bg-yellow-400 text-black"
                  : "border-gray-300"
              }`}
            >
              👤 Client
            </button>

            <button
              type="button"
              onClick={() => setRole("provider")}
              className={`rounded-lg border p-3 font-semibold transition ${
                role === "provider"
                  ? "border-yellow-400 bg-yellow-400 text-black"
                  : "border-gray-300"
              }`}
            >
              🛠 Service Provider
            </button>

          </div>
        </div>

        {/* Full Name */}

        <div>
          <label className="mb-2 block font-medium">
            Full Name
          </label>

          <input
            type="text"
            placeholder="Enter your full name"
            {...register("name", {
              required: "Name is required",
            })}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-yellow-400"
          />

          {errors.name && (
            <p className="mt-1 text-sm text-red-500">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email */}

        <div>
          <label className="mb-2 block font-medium">
            Email
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required",
            })}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-yellow-400"
          />

          {errors.email && (
            <p className="mt-1 text-sm text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Phone Number */}

        <div>
          <label className="mb-2 block font-medium">
            Phone Number
          </label>

          <input
            type="tel"
            placeholder="Enter your 10 digit phone number"
            {...register("phone", {
              required: "Phone number is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Phone number must be 10 digits",
              },
            })}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-yellow-400"
          />

          {errors.phone && (
            <p className="mt-1 text-sm text-red-500">
              {errors.phone.message}
            </p>
          )}
        </div>

        {/* Password */}

        <div>
          <label className="mb-2 block font-medium">
            Password
          </label>

          <input
            type="password"
            placeholder="Create password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-yellow-400"
          />

          {errors.password && (
            <p className="mt-1 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}

        <div>
          <label className="mb-2 block font-medium">
            Confirm Password
          </label>

          <input
            type="password"
            placeholder="Confirm password"
            {...register("confirmPassword", {
              required: "Confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-yellow-400"
          />

          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Register Button */}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-yellow-400 py-3 font-semibold text-black transition hover:bg-yellow-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting
            ? "Creating Account..."
            : `Register as ${
                role === "client"
                  ? "Client"
                  : "Service Provider"
              }`}
        </button>

        {/* Login Link */}

        <p className="text-center text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-yellow-500 hover:underline"
          >
            Login
          </Link>
        </p>

      {/* tumhara pura form */}

    </form>
  </AuthLayout>
);

        {/* Role Selection */}

};

export default Register;