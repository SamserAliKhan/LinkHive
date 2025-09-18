import { useState } from "react";
import { signup } from "../APIs/Api"; 
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };
//Test@Test
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    try {
      await signup(form);
      setMsg("Signed up successfully.");
      navigate("/dashboard");
    } catch (err) {
      setMsg(err?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-200 via-yellow-100 to-gray-100 dark:from-gray-900 dark:via-gray-950 dark:to-black px-4">
      <main className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 transition-colors">
        {/* Logo / Branding */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={require("../images/logo.png")}
            alt="LinkHive Logo"
            className="h-12 w-12 mb-3"
          />
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Create your account
          </h1>
        </div>
        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Name
            </label>
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2 shadow-sm outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Your name"
              required
            />
          </div>
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
              placeholder="Create a strong password"
              required
            />
          </div>
          <button
            disabled={loading}
            className="w-full rounded-xl bg-yellow-400 py-3 text-black font-semibold hover:bg-yellow-500 transition-all disabled:opacity-60 shadow-md"
          >
            {loading ? "Creating..." : "Sign up"}
          </button>
          {msg && (
            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              {msg}
            </p>
          )}
        </form>
      </main>
    </div>
  );
}
