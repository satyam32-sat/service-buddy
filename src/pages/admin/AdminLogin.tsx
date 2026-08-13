import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const user = await login(email, password);

    if (user.role === "admin") {
      navigate("/admin/dashboard");
    } else {
      alert("Access Denied");
    }
  } catch (error: any) {
    alert(
      error?.response?.data?.message ||
      "Invalid Email or Password"
    );
  }
};
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-950 via-black to-gray-900">

      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">

        <h1 className="text-center text-3xl font-bold text-yellow-500">
          Admin Login
        </h1>

        <p className="mt-2 text-center text-gray-500">
          Sign in to access the Admin Dashboard
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >

          <div>

            <label className="mb-2 block font-medium">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter admin email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-yellow-400"
            />

          </div>

          <div>

            <label className="mb-2 block font-medium">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-yellow-400"
            />

          </div>
                    <button
            type="submit"
            className="w-full rounded-lg bg-yellow-400 py-3 font-semibold text-black transition hover:bg-yellow-500"
          >
            Admin Login
          </button>

        </form>

      </div>

    </div>
  );
};

export default AdminLogin;