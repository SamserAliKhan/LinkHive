import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AddLinkModal({
  isOpen,
  onClose,
  onSubmit,
  defaultValues,
}) {
  const [form, setForm] = useState({
    title: "",
    url: "",
    description: "",
    tags: "",
  });

  useEffect(() => {
    if (defaultValues) {
      setForm({
        title: defaultValues.title || "",
        url: defaultValues.url || "",
        description: defaultValues.description || "",
        tags: (defaultValues.tags || []).join(", "),
      });
    }
  }, [defaultValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      title: form.title.trim(),
      url: form.url.trim(),
      description: form.description.trim(),
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };
    onSubmit?.(payload);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose} // backdrop click closes
        >
          {/* Modal card */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 40 }}
            transition={{ type: "spring", damping: 20, stiffness: 200 }}
            className="w-full max-w-lg rounded-2xl bg-white dark:bg-gray-900 p-6 shadow-2xl border border-gray-200 dark:border-gray-700"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
          >
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                {defaultValues ? "Edit Link" : "Add a Link"}
              </h3>
              <button
                onClick={onClose}
                className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Title
                </label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2 outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="e.g., Awesome Docs"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  URL
                </label>
                <input
                  name="url"
                  value={form.url}
                  onChange={handleChange}
                  type="url"
                  required
                  className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2 outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="https://example.com"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Description
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2 outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="Why is this link useful?"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Tags (comma-separated)
                </label>
                <input
                  name="tags"
                  value={form.tags}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2 outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="frontend, tailwind, article"
                />
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-xl border border-gray-300 dark:border-gray-700 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-yellow-400 px-4 py-2 text-black font-semibold hover:bg-yellow-500 dark:hover:bg-yellow-300"
                >
                  {defaultValues ? "Save" : "Add"}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
