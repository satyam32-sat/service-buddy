import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  User,
  BriefcaseBusiness,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  Loader2,
} from "lucide-react";

import AuthLayout from "../components/auth/AuthLayout";
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

  const [role, setRole] = useState<"client" | "provider">("client");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    mode: "onTouched",
  });

  const password = watch("password");

  const onSubmit = async (data: RegisterFormData) => {
    setServerError("");

    try {
      const response = await api.post("/auth/register", {
        name: data.name.trim(),
        email: data.email.trim().toLowerCase(),
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

      setServerError(
        error?.response?.data?.message ||
          "Registration failed. Please try again."
      );
    }
  };

  return (
    <AuthLayout
      title="Create Your Account"
      subtitle="Join Service Buddy and connect with trusted professionals"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
        noValidate
      >
        {/* Server Error */}
        {serverError && (
          <div
            role="alert"
            className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700"
          >
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />

            <p className="text-sm font-medium">
              {serverError}
            </p>
          </div>
        )}

        {/* Register As */}
        <div>
          <label className="mb-3 block text-sm font-semibold text-slate-700">
            Register As
          </label>

          <div className="grid grid-cols-2 gap-3">
            {/* Client */}
            <button
              type="button"
              onClick={() => setRole("client")}
              className={`group rounded-xl border p-4 text-left transition-all duration-200 ${
                role === "client"
                  ? "border-blue-500 bg-blue-50 shadow-sm shadow-blue-100"
                  : "border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50"
              }`}
            >
              <div
                className={`mb-2 flex h-10 w-10 items-center justify-center rounded-lg ${
                  role === "client"
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600"
                }`}
              >
                <User className="h-5 w-5" />
              </div>

              <p
                className={`text-sm font-bold ${
                  role === "client"
                    ? "text-blue-700"
                    : "text-slate-700"
                }`}
              >
                Client
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Find trusted services
              </p>
            </button>

            {/* Provider */}
            <button
              type="button"
              onClick={() => setRole("provider")}
              className={`group rounded-xl border p-4 text-left transition-all duration-200 ${
                role === "provider"
                  ? "border-blue-500 bg-blue-50 shadow-sm shadow-blue-100"
                  : "border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50"
              }`}
            >
              <div
                className={`mb-2 flex h-10 w-10 items-center justify-center rounded-lg ${
                  role === "provider"
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600"
                }`}
              >
                <BriefcaseBusiness className="h-5 w-5" />
              </div>

              <p
                className={`text-sm font-bold ${
                  role === "provider"
                    ? "text-blue-700"
                    : "text-slate-700"
                }`}
              >
                Service Provider
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Offer your services
              </p>
            </button>
          </div>
        </div>

        {/* Full Name */}
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Full Name
          </label>

          <div className="relative">
            <User className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

            <input
              id="name"
              type="text"
              autoComplete="name"
              placeholder="Enter your full name"
              aria-invalid={!!errors.name}
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters",
                },
              })}
              className={`w-full rounded-xl border bg-white py-3.5 pl-12 pr-4 text-slate-900 placeholder:text-slate-400 outline-none transition-all ${
                errors.name
                  ? "border-red-400 bg-red-50/30 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                  : "border-slate-200 hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              }`}
            />
          </div>

          {errors.name && (
            <p className="mt-1.5 flex items-center gap-1 text-sm font-medium text-red-500">
              <AlertCircle className="h-4 w-4" />
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Email Address
          </label>

          <div className="relative">
            <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              aria-invalid={!!errors.email}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address",
                },
              })}
              className={`w-full rounded-xl border bg-white py-3.5 pl-12 pr-4 text-slate-900 placeholder:text-slate-400 outline-none transition-all ${
                errors.email
                  ? "border-red-400 bg-red-50/30 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                  : "border-slate-200 hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              }`}
            />
          </div>

          {errors.email && (
            <p className="mt-1.5 flex items-center gap-1 text-sm font-medium text-red-500">
              <AlertCircle className="h-4 w-4" />
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label
            htmlFor="phone"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Phone Number
          </label>

          <div className="relative">
            <Phone className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

            <input
              id="phone"
              type="tel"
              inputMode="numeric"
              autoComplete="tel"
              maxLength={10}
              placeholder="Enter 10 digit phone number"
              aria-invalid={!!errors.phone}
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Phone number must be exactly 10 digits",
                },
              })}
              className={`w-full rounded-xl border bg-white py-3.5 pl-12 pr-4 text-slate-900 placeholder:text-slate-400 outline-none transition-all ${
                errors.phone
                  ? "border-red-400 bg-red-50/30 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                  : "border-slate-200 hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              }`}
            />
          </div>

          {errors.phone && (
            <p className="mt-1.5 flex items-center gap-1 text-sm font-medium text-red-500">
              <AlertCircle className="h-4 w-4" />
              {errors.phone.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Password
          </label>

          <div className="relative">
            <Lock className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

            <input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Create a strong password"
              aria-invalid={!!errors.password}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
              className={`w-full rounded-xl border bg-white py-3.5 pl-12 pr-12 text-slate-900 placeholder:text-slate-400 outline-none transition-all ${
                errors.password
                  ? "border-red-400 bg-red-50/30 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                  : "border-slate-200 hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              }`}
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword((prev) => !prev)
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label={
                showPassword
                  ? "Hide password"
                  : "Show password"
              }
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>

          {errors.password && (
            <p className="mt-1.5 flex items-center gap-1 text-sm font-medium text-red-500">
              <AlertCircle className="h-4 w-4" />
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Confirm Password
          </label>

          <div className="relative">
            <Lock className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

            <input
              id="confirmPassword"
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              autoComplete="new-password"
              placeholder="Confirm your password"
              aria-invalid={!!errors.confirmPassword}
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password ||
                  "Passwords do not match",
              })}
              className={`w-full rounded-xl border bg-white py-3.5 pl-12 pr-12 text-slate-900 placeholder:text-slate-400 outline-none transition-all ${
                errors.confirmPassword
                  ? "border-red-400 bg-red-50/30 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                  : "border-slate-200 hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              }`}
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(
                  (prev) => !prev
                )
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label={
                showConfirmPassword
                  ? "Hide password"
                  : "Show password"
              }
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>

          {errors.confirmPassword && (
            <p className="mt-1.5 flex items-center gap-1 text-sm font-medium text-red-500">
              <AlertCircle className="h-4 w-4" />
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Terms */}
        <p className="text-xs leading-relaxed text-slate-500">
          By creating an account, you agree to Service
          Buddy's{" "}
          <Link
            to="/terms"
            className="font-semibold text-blue-600 hover:underline"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            to="/privacy"
            className="font-semibold text-blue-600 hover:underline"
          >
            Privacy Policy
          </Link>
          .
        </p>

        {/* Register Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/25 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Creating Account...
            </>
          ) : (
            `Create ${
              role === "client"
                ? "Client"
                : "Provider"
            } Account`
          )}
        </button>

        {/* Login */}
        <div className="relative py-1">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200" />
          </div>

          <div className="relative flex justify-center">
            <span className="bg-white px-3 text-xs font-medium uppercase tracking-wide text-slate-400">
              Already registered?
            </span>
          </div>
        </div>

        <p className="text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-bold text-blue-600 transition hover:text-blue-700 hover:underline"
          >
            Login
          </Link>
        </p>

        {/* Security */}
        <div className="flex items-center justify-center gap-2 pt-1 text-xs text-slate-400">
          <span className="h-2 w-2 rounded-full bg-blue-500" />
          Your information is securely protected
        </div>
      </form>
    </AuthLayout>
  );
};

export default Register;