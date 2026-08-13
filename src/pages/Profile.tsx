import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProfile } from "../services/auth.service";
import { useAuth } from "../context/AuthContext";

interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  avatar?: string;
  isVerified?: boolean;
}

const Profile = () => {
  const { logout } = useAuth();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile();
        setUser(response.user);
      } catch (error) {
        console.error("Profile error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-orange-200 border-t-blue-600" />
          <p className="mt-4 font-medium text-gray-600">
            Loading Profile...
          </p>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-gray-50 px-6">
        <div className="rounded-2xl bg-white p-10 text-center shadow-lg">
          <h1 className="text-2xl font-bold text-gray-900">
            Profile Not Found
          </h1>

          <p className="mt-2 text-gray-500">
            Please login again to view your profile.
          </p>

          <Link
            to="/login"
            className="mt-6 inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Login
          </Link>
        </div>
      </main>
    );
  }

  const roleLabel =
    user.role.charAt(0).toUpperCase() + user.role.slice(1);

  const dashboardPath =
    user.role === "client"
      ? "/client/dashboard"
      : user.role === "provider"
        ? "/provider/dashboard"
        : "/admin/dashboard";

  const initials = user.name
    .split(" ")
    .map((name) => name[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Account
          </p>

          <h1 className="mt-2 text-4xl font-extrabold text-gray-900">
            My Profile
          </h1>

          <p className="mt-2 text-gray-500">
            Manage your Service Buddy account information.
          </p>
        </div>

        {/* Profile Card */}
        <div className="overflow-hidden rounded-3xl bg-white shadow-xl">

          {/* Cover */}
          <div className="h-36 bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500" />

          <div className="px-6 pb-8 sm:px-10">

            {/* Avatar + Basic Info */}
            <div className="-mt-14 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">

              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end">

                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-28 w-28 rounded-3xl border-4 border-white object-cover shadow-lg"
                  />
                ) : (
                  <div className="flex h-28 w-28 items-center justify-center rounded-3xl border-4 border-white bg-gradient-to-br from-blue-600 to-cyan-500 text-3xl font-extrabold text-white shadow-lg">
                    {initials}
                  </div>
                )}

                <div className="pb-1">
                  <h2 className="text-3xl font-bold text-gray-900">
                    {user.name}
                  </h2>

                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
                      {roleLabel}
                    </span>

                    {user.isVerified && (
                      <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                        ✓ Verified
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Dashboard */}
              <Link
                to={dashboardPath}
                className="rounded-xl bg-blue-600 px-6 py-3 text-center font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg"
              >
                Go to Dashboard
              </Link>
              
            </div>
            {/* Account Information */}
            <div className="mt-10">
              <h3 className="text-xl font-bold text-gray-900">
                Account Information
              </h3>

              <div className="mt-5 grid gap-5 md:grid-cols-2">

                {/* Name */}
                <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
                  <p className="text-sm font-medium text-gray-500">
                    Full Name
                  </p>

                  <p className="mt-2 text-lg font-semibold text-gray-900">
                    {user.name}
                  </p>
                </div>

                {/* Email */}
                <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
                  <p className="text-sm font-medium text-gray-500">
                    Email Address
                  </p>

                  <p className="mt-2 break-all text-lg font-semibold text-gray-900">
                    {user.email}
                  </p>
                </div>

                {/* Phone */}
                <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
                  <p className="text-sm font-medium text-gray-500">
                    Phone Number
                  </p>

                  <p className="mt-2 text-lg font-semibold text-gray-900">
                    {user.phone || "Not provided"}
                  </p>
                </div>

                {/* Role */}
                <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
                  <p className="text-sm font-medium text-gray-500">
                    Account Type
                  </p>

                  <p className="mt-2 text-lg font-semibold capitalize text-gray-900">
                    {user.role}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-10 border-t border-gray-100 pt-8">
              <h3 className="text-xl font-bold text-gray-900">
                Quick Actions
              </h3>

              <div className="mt-5 grid gap-4 sm:grid-cols-3">

                <Link
                  to="/"
                  className="rounded-2xl border border-gray-200 p-5 transition hover:border-blue-300 hover:bg-blue-50"
                >
                  <p className="font-bold text-gray-900">
                    🏠 Home
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    Explore Service Buddy
                  </p>
                </Link>

                <Link
                  to="/services"
                  className="rounded-2xl border border-gray-200 p-5 transition hover:border-blue-300 hover:bg-blue-50"
                >
                  <p className="font-bold text-gray-900">
                    🔧 Services
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    Browse available services
                  </p>
                </Link>

                <button
                  onClick={logout}
                  className="rounded-2xl border border-red-100 p-5 text-left transition hover:bg-red-50"
                >
                  <p className="font-bold text-red-600">
                    🚪 Logout
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    Sign out of your account
                  </p>
                </button>

              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;