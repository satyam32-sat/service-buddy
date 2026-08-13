import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const menu = [
  {
    name: "Dashboard",
    path: "/client/dashboard",
    icon: "▦",
  },
  {
    name: "Services",
    path: "/services",
    icon: "⚒",
  },
  {
    name: "My Bookings",
    path: "/client/bookings",
    icon: "▣",
  },
  {
    name: "Profile",
    path: "/profile",
    icon: "◉",
  },
];

const ClientLayout = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* ================= SIDEBAR ================= */}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[280px] flex-col bg-slate-950 text-white shadow-2xl transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >

        {/* Brand */}

        <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-lg font-black text-white shadow-lg shadow-blue-950/40">
              SB
            </div>

            <div>
              <h1 className="text-lg font-black tracking-tight">
                Service Buddy
              </h1>

              <p className="text-xs font-medium text-slate-400">
                Client Portal
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white lg:hidden"
            aria-label="Close menu"
          >
            ✕
          </button>

        </div>

        {/* Account Status */}

        <div className="px-5 pt-6">

          <div className="rounded-2xl border border-blue-400/20 bg-blue-400/10 p-4">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-400/15 text-blue-300">
                ✓
              </div>

              <div>
                <p className="text-sm font-bold text-white">
                  Client Account
                </p>

                <p className="mt-0.5 text-xs text-blue-300">
                  Account active
                </p>
              </div>

            </div>

          </div>

        </div>

        {/* Navigation */}

        <div className="px-5 pt-7">

          <p className="mb-3 px-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
            Menu
          </p>

          <nav className="space-y-1.5">

            {menu.map((item) => (

              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-950/30"
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }`
                }
              >

                {({ isActive }) => (
                  <>
                    <span
                      className={`flex h-9 w-9 items-center justify-center rounded-lg text-base transition ${
                        isActive
                          ? "bg-white/15 text-white"
                          : "bg-white/5 text-slate-400 group-hover:bg-white/10 group-hover:text-white"
                      }`}
                    >
                      {item.icon}
                    </span>

                    <span className="flex-1">
                      {item.name}
                    </span>

                    {isActive && (
                      <span className="text-white/70">
                        →
                      </span>
                    )}
                  </>
                )}

              </NavLink>

            ))}

          </nav>

        </div>

        {/* Quick Help */}

        <div className="mt-auto p-5">

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">

            <p className="text-xs font-bold text-slate-300">
              Need a service?
            </p>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              Browse professional services and book trusted providers.
            </p>

            <button
              type="button"
              onClick={() => navigate("/services")}
              className="mt-3 text-xs font-bold text-blue-400 transition hover:text-blue-300"
            >
              Browse services →
            </button>

          </div>

        </div>

      </aside>

      {/* ================= MAIN ================= */}

      <div className="min-h-screen lg:pl-[280px]">

        {/* ================= NAVBAR ================= */}

        <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">

          <div className="flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">

            {/* Left */}

            <div className="flex items-center gap-4">

              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50 lg:hidden"
                aria-label="Open navigation"
              >
                ☰
              </button>

              <div>

                <p className="hidden text-xs font-bold uppercase tracking-widest text-blue-600 sm:block">
                  Client workspace
                </p>

                <h2 className="text-lg font-black tracking-tight text-slate-900 sm:text-xl">
                  Client Dashboard
                </h2>

              </div>

            </div>

            {/* Right */}

            <div className="flex items-center gap-2 sm:gap-4">

              {/* Booking Shortcut */}

              <button
                type="button"
                onClick={() => navigate("/client/bookings")}
                className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                aria-label="My bookings"
                title="My bookings"
              >
                ▣
              </button>

              {/* Profile */}

              <div className="relative">

                <button
                  type="button"
                  onClick={() => setProfileOpen((value) => !value)}
                  className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-1.5 pr-3 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
                >

                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 text-sm font-black text-white">
                    C
                  </span>

                  <span className="hidden text-left sm:block">

                    <span className="block text-xs font-bold text-slate-900">
                      Client
                    </span>

                    <span className="block text-[10px] text-slate-400">
                      My account
                    </span>

                  </span>

                  <span className="hidden text-slate-400 sm:block">
                    ▾
                  </span>

                </button>

                {profileOpen && (

                  <>

                    <button
                      type="button"
                      aria-label="Close profile menu"
                      onClick={() => setProfileOpen(false)}
                      className="fixed inset-0 z-40 cursor-default"
                    />

                    <div className="absolute right-0 top-14 z-50 w-56 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl">

                      <button
                        type="button"
                        onClick={() => {
                          setProfileOpen(false);
                          navigate("/profile");
                        }}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                      >
                        <span>◉</span>
                        My Profile
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setProfileOpen(false);
                          navigate("/services");
                        }}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                      >
                        <span>⚒</span>
                        Browse Services
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setProfileOpen(false);
                          navigate("/client/bookings");
                        }}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                      >
                        <span>▣</span>
                        My Bookings
                      </button>

                      <div className="my-1 border-t border-slate-100" />

                      <button
                        type="button"
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-bold text-red-600 transition hover:bg-red-50"
                      >
                        <span>↪</span>
                        Logout
                      </button>

                    </div>

                  </>

                )}

              </div>

            </div>

          </div>

        </header>

        {/* ================= PAGE CONTENT ================= */}

        <main className="min-h-[calc(100vh-80px)] bg-slate-50">

          <div className="mx-auto w-full max-w-[1600px]">

            <Outlet />

          </div>

        </main>

      </div>

    </div>
  );
};

export default ClientLayout;