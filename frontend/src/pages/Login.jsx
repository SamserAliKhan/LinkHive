import { useState } from "react";
import { login } from "../APIs/Api";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    try {
      await login(form);
      setMsg("Login Successfull");
      window.location.href = "/dashboard";
    } catch (err) {
      setMsg(err?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-200 via-yellow-100 to-gray-100 dark:from-gray-900 dark:via-gray-950 dark:to-black px-4">
      <main className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 transition-colors">
        {/* Logo / Branding */}
        <div className="flex flex-col items-center">
          <img
            src={require("../images/logo.png")}
            alt="LinkHive Logo"
            className="h-12 w-12 mb-3"
          />
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Welcome back
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Login to continue to LinkHive
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2 shadow-sm outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2 shadow-sm outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            disabled={loading}
            className="w-full rounded-xl bg-yellow-400 py-3 text-black font-semibold hover:bg-yellow-500 transition-all disabled:opacity-60 shadow-md"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          {msg && (
            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              {msg}
            </p>
          )}
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="flex-grow h-px bg-gray-300 dark:bg-gray-700"></div>
          <span className="px-3 text-xs text-gray-500 dark:text-gray-400">
            OR
          </span>
          <div className="flex-grow h-px bg-gray-300 dark:bg-gray-700"></div>
        </div>

        {/* Extra link */}
        <p className="text-center text-sm text-gray-700 dark:text-gray-400">
          New here?{" "}
          <a
            href="/signup"
            className="font-medium text-yellow-600 hover:underline underline-offset-4"
          >
            Create an account
          </a>
        </p>
      </main>
    </div>
  );
}
