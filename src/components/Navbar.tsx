import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  ChevronDown,
  LayoutDashboard,
  LogIn,
  LogOut,
  Menu,
  User,
  X,
  House,
  BriefcaseBusiness,
  Info,
  Mail,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const navLinks = [
  { name: "Home", path: "/", icon: House },
  { name: "Services", path: "/services", icon: BriefcaseBusiness },
  { name: "About", path: "/about", icon: Info },
  { name: "Contact", path: "/contact", icon: Mail },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const { user, logout } = useAuth();

  const dashboardPath =
    user?.role === "client"
      ? "/client/dashboard"
      : user?.role === "provider"
        ? "/provider/dashboard"
        : user?.role === "admin"
          ? "/admin/dashboard"
          : "/";

  const initials =
    user?.name
      ?.split(" ")
      .map((name) => name[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  const closeMenus = () => {
    setOpen(false);
    setProfileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <NavLink
          to="/"
          onClick={closeMenus}
          className="group flex items-center gap-3"
        >
          <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-blue-600 via-blue-600 to-cyan-500 text-sm font-black text-white shadow-lg shadow-blue-500/20 transition-all duration-300 group-hover:scale-105 group-hover:shadow-blue-500/30">
            SB
          </div>

          <div className="hidden sm:block">
            <h1 className="text-[20px] font-extrabold tracking-tight text-slate-900">
              Service<span className="text-blue-600">Buddy</span>
            </h1>
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-slate-400">
              Services made simple
            </p>
          </div>
        </NavLink>

       {navLinks.map((item) => {
  const Icon = item.icon;

  return (
    <NavLink
      key={item.path}
      to={item.path}
      className={({ isActive }) =>
        `flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
          isActive
            ? "bg-blue-50 text-blue-600"
            : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
        }`
      }
    >
<Icon
  size={17}
  strokeWidth={2}
  className="transition-transform duration-200 group-hover:scale-110"
/>
      {item.name}
    </NavLink>
  );
})}
{/* Desktop Actions */}
<div className="hidden items-center gap-3 md:flex">
  {!user ? (
    <>
      <NavLink
        to="/login"
        className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 transition-all duration-200 hover:bg-indigo-50 hover:text-indigo-600"
      >
        <LogIn size={17} />
        Login
      </NavLink>

      <NavLink
        to="/register"
        className="rounded-xl bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet-500/30"
      >
        Get Started
      </NavLink>
    </>
  ) : (
    <>
              {/* Profile */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setProfileOpen((prev) => !prev)}
                  className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-2.5 py-1.5 transition-all hover:border-blue-200 hover:bg-blue-50/50"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-xs font-bold text-white shadow-sm">
                    {initials}
                  </div>

                  <div className="hidden text-left lg:block">
                    <p className="max-w-[110px] truncate text-sm font-bold text-slate-900">
                      {user?.name || "User"}
                    </p>
                    <p className="text-[11px] capitalize text-slate-500">
                      {user?.role || "Account"}
                    </p>
                  </div>

                  <ChevronDown
                    size={15}
                    className={`text-slate-400 transition-transform ${
                      profileOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 top-14 w-56 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-900/10">
                    <NavLink
                      to="/profile"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-blue-50 hover:text-blue-600"
                    >
                      <User size={17} />
                      Profile
                    </NavLink>

                    <NavLink
                      to={dashboardPath}
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-blue-50 hover:text-blue-600"
                    >
                      <LayoutDashboard size={17} />
                      Dashboard
                    </NavLink>

                    <div className="my-1 border-t border-slate-100" />

                    <button
                      type="button"
                      onClick={() => {
                        logout();
                        setProfileOpen(false);
                      }}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
                    >
                      <LogOut size={17} />
                      Logout
                    </button>
                  </div>
                )}
              </div>

              <NavLink
                to={dashboardPath}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
              >
                <LayoutDashboard size={17} />
                Dashboard
              </NavLink>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 md:hidden"
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden border-t border-slate-100 bg-white transition-all duration-300 md:hidden ${
          open ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="space-y-2 px-4 py-4 sm:px-6">
          {navLinks.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={closeMenus}
              className={({ isActive }) =>
                `block rounded-xl px-4 py-3 text-sm font-semibold transition ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-700 hover:bg-slate-50 hover:text-blue-600"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}

          <div className="my-3 border-t border-slate-100" />

          {!user ? (
            <div className="grid grid-cols-2 gap-2">
              <NavLink
                to="/login"
                onClick={closeMenus}
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                <LogIn size={17} />
                Login
              </NavLink>

              <NavLink
                to="/register"
                onClick={closeMenus}
                className="rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-3 text-center text-sm font-bold text-white shadow-md"
              >
                Get Started
              </NavLink>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-sm font-bold text-white">
                  {initials}
                </div>

                <div>
                  <p className="text-sm font-bold text-slate-900">
                    {user?.name || "User"}
                  </p>
                  <p className="text-xs capitalize text-slate-500">
                    {user?.role || "Account"}
                  </p>
                </div>
              </div>

              <NavLink
                to="/profile"
                onClick={closeMenus}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                <User size={18} />
                Profile
              </NavLink>

              <NavLink
                to={dashboardPath}
                onClick={closeMenus}
                className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-3 text-sm font-bold text-white shadow-md"
              >
                <LayoutDashboard size={18} />
                Dashboard
              </NavLink>

              <button
                type="button"
                onClick={() => {
                  logout();
                  closeMenus();
                }}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
              >
                <LogOut size={18} />
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