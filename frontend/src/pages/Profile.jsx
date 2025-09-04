// import Navbar from "../components/Navbar";

export default function Profile() {
  // TODO: load real profile from services/api.js
  const user = { name: "Samser Ali Khan", email: "you@example.com" };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-gray-100 dark:from-gray-950 dark:via-black dark:to-gray-900 transition-colors duration-300">
      {/* <Navbar user={user} /> */}
      <main className="mx-auto max-w-4xl px-4 py-12">
        {/* Page header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Profile
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Manage your account and preferences here
          </p>
        </div>
 
        <div className="grid gap-8 md:grid-cols-2">
          {/* Account card */}
          <div
            className="
              rounded-2xl border bg-white dark:bg-gray-800 p-6 
              transition-all duration-300
              hover:shadow-lg hover:dark:shadow-none
              dark:hover:drop-shadow-[0_0_12px_rgba(59,130,246,0.7)]
            "
          >
            <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              Account
            </h2>
            <div className="space-y-4 text-sm">
              <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                <span className="text-gray-600 dark:text-gray-400">Name</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {user.name}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Email</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {user.email}
                </span>
              </div>
            </div>
          </div>

          {/* Preferences card */}
          <div
            className="
              rounded-2xl border bg-white dark:bg-gray-800 p-6 
              transition-all duration-300
              hover:shadow-lg hover:dark:shadow-none
              dark:hover:drop-shadow-[0_0_12px_rgba(16,185,129,0.7)]
            "
          >
            <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              Preferences
            </h2>
            <form className="space-y-4">
              <label className="flex items-center justify-between">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Dark mode
                </span>
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  disabled
                />
              </label>
              <label className="flex items-center justify-between">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Email updates
                </span>
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                  disabled
                />
              </label>
              <p className="text-xs text-gray-500 dark:text-gray-400 italic">
                Settings are placeholders. Wire them up later.
              </p>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
