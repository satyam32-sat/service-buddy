import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const menu = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
  },
  {
    name: "Users",
    path: "/admin/users",
  },
  {
    name: "Providers",
    path: "/admin/providers",
  },
  {
    name: "Services",
    path: "/admin/services",
  },
  {
    name: "Bookings",
    path: "/admin/bookings",
  },
  {
    name: "Analytics",
    path: "/admin/analytics",
  },
];

const AdminLayout = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}

      <aside className="w-72 bg-gradient-to-b from-gray-950 via-black to-gray-900 text-white">

        <div className="border-b border-gray-700 p-6">

          <h1 className="text-3xl font-bold text-yellow-400">
            Service Buddy
          </h1>

          <p className="mt-2 text-gray-400">
            Admin Panel
          </p>

        </div>

        <nav className="space-y-2 p-5">

          {menu.map((item) => (

            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `block rounded-lg px-4 py-3 transition ${
                  isActive
                    ? "bg-yellow-400 font-semibold text-black"
                    : "hover:bg-gray-800"
                }`
              }
            >
              {item.name}
            </NavLink>

          ))}

        </nav>

      </aside>

      {/* Main Content */}

      <div className="flex flex-1 flex-col">

        <header className="flex items-center justify-between bg-white px-8 py-5 shadow">

          <div>

            <h2 className="text-2xl font-bold">
              Admin Dashboard
            </h2>

            <p className="text-gray-500">
              Welcome Administrator 👑
            </p>

          </div>          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
            className="rounded-lg bg-red-500 px-5 py-2 font-semibold text-white transition hover:bg-red-600"
          >
            Logout
          </button>

        </header>

        <main className="flex-1 bg-gray-100 p-8">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default AdminLayout;