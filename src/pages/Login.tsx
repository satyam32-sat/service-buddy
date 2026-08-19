import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  Loader2,
} from "lucide-react";

import AuthLayout from "../components/auth/AuthLayout";
import { useAuth } from "../context/AuthContext";

interface LoginFormData {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    mode: "onTouched",
  });

  const onSubmit = async (data: LoginFormData) => {
    setServerError("");

    try {
      const user = await login(
        data.email.trim().toLowerCase(),
        data.password
      );

      if (
        user.role === "client" ||
        user.role === "provider"
      ) {
        navigate("/");
      } else {
        navigate("/admin/dashboard");
      }
    } catch (error: any) {
      console.error("Login error:", error);

      setServerError(
        error?.response?.data?.message ||
          "Invalid email or password. Please try again."
      );
    }
  };

  return (
    <AuthLayout
      title="Welcome Back 👋"
      subtitle="Login to your Service Buddy account"
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

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Email Address
          </label>

          <div className="relative">
            <Mail
              className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
              aria-hidden="true"
            />

            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              aria-invalid={!!errors.email}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value:
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message:
                    "Please enter a valid email address",
                },
              })}
              className={`w-full rounded-xl border bg-white py-3.5 pl-12 pr-4 text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200 ${
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

        {/* Password */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-slate-700"
            >
              Password
            </label>

            <Link
              to="/forgot-password"
              className="text-sm font-semibold text-blue-600 transition hover:text-blue-700 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <div className="relative">
            <Lock
              className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
              aria-hidden="true"
            />

            <input
              id="password"
              type={
                showPassword ? "text" : "password"
              }
              autoComplete="current-password"
              placeholder="Enter your password"
              aria-invalid={!!errors.password}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message:
                    "Password must be at least 6 characters",
                },
              })}
              className={`w-full rounded-xl border bg-white py-3.5 pl-12 pr-12 text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200 ${
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

        {/* Login Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/25 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Logging in...
            </>
          ) : (
            "Login to Service Buddy"
          )}
        </button>

        {/* Divider */}
        <div className="relative py-1">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200" />
          </div>

          <div className="relative flex justify-center">
            <span className="bg-white px-3 text-xs font-medium uppercase tracking-wide text-slate-400">
              New to Service Buddy?
            </span>
          </div>
        </div>

        {/* Register */}
        <p className="text-center text-sm text-slate-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-bold text-blue-600 transition hover:text-blue-700 hover:underline"
          >
            Register Now
          </Link>
        </p>

        {/* Security Message */}
        <div className="flex items-center justify-center gap-2 pt-1 text-xs text-slate-400">
          <span className="h-2 w-2 rounded-full bg-blue-500" />
          Secure & trusted Service Buddy account
        </div>
      </form>
    </AuthLayout>
  );
};

export default Login;