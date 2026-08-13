import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();

  const dashboardPath =
    user?.role === "client"
      ? "/client/dashboard"
      : user?.role === "provider"
        ? "/provider/dashboard"
        : user?.role === "admin"
          ? "/admin/dashboard"
          : "/";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <NavLink
          to="/"
          onClick={() => setOpen(false)}
          className="group flex items-center gap-3 transition duration-300 hover:scale-[1.02]"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-xl font-extrabold text-white shadow-lg">
            SB
          </div>

          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">
              Service-Buddy
            </h1>

            <p className="text-xs uppercase tracking-[0.2em] text-gray-500">

            </p>
          </div>
        </NavLink>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `relative pb-1 text-sm font-medium transition duration-300 ${
                  isActive
                    ? "text-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {item.name}

                  <span
                    className={`absolute bottom-0 left-0 h-[2px] rounded-full bg-blue-600 transition-all duration-300 ${
                      isActive ? "w-full" : "w-0"
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          {!user ? (
            <>
              <NavLink
                to="/login"
                className="rounded-xl border border-blue-600 px-5 py-2.5 font-medium text-blue-600 transition duration-300 hover:bg-blue-50"
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                className="rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-2.5 font-medium text-white shadow-md transition duration-300 hover:-translate-y-0.5 hover:shadow-xl"
              >
                Get Started
              </NavLink>
            </>
          ) : (
            <>
              {/* Profile */}
     <NavLink
  to="/profile"
  className="group flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-2 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-50 hover:shadow-md"
>
  {/* Avatar */}
  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-sm font-bold text-white shadow-sm">
    {user?.name
      ?.split(" ")
      .map((name) => name[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U"}
  </div>

  {/* User Info */}
  <div className="hidden text-left sm:block">
    <p className="text-sm font-bold leading-tight text-gray-900 group-hover:text-blue-600">
      {user?.name || "User"}
    </p>

    <p className="mt-0.5 text-xs capitalize text-gray-500">
      {user?.role || "Account"}
    </p>
  </div>
</NavLink>

              {/* Dashboard */}
              <NavLink
                to={dashboardPath}
                className="rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-2.5 font-medium text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-xl"
              >
                Dashboard
              </NavLink>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 text-2xl text-gray-700 transition hover:bg-gray-100 md:hidden"
          aria-label="Toggle menu"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden bg-white transition-all duration-300 md:hidden ${
          open
            ? "max-h-[500px] border-t border-gray-200"
            : "max-h-0"
        }`}
      >
        <div className="space-y-2 p-5">

          {navLinks.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block rounded-lg px-4 py-3 font-medium transition ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}

          {!user ? (
            <>
              <NavLink
                to="/login"
                onClick={() => setOpen(false)}
                className="block rounded-xl border border-blue-600 px-4 py-3 text-center font-medium text-blue-600 transition hover:bg-blue-50"
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                onClick={() => setOpen(false)}
                className="block rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-3 text-center font-medium text-white shadow-md transition hover:shadow-lg"
              >
                Get Started
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to="/profile"
                onClick={() => setOpen(false)}
                className="block rounded-xl border border-gray-200 px-4 py-3 text-center font-medium text-gray-700 transition hover:bg-gray-50"
              >
                Profile
              </NavLink>

              <NavLink
                to={dashboardPath}
                onClick={() => setOpen(false)}
                className="block rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-3 text-center font-medium text-white shadow-md transition hover:shadow-lg"
              >
                Dashboard
              </NavLink>

              <button
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
                className="block w-full rounded-xl border border-red-200 px-4 py-3 text-center font-medium text-red-600 transition hover:bg-red-50"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;