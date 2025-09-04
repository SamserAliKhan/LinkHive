import { useEffect, useState } from "react";
import LinkCard from "../components/LinkCard";
import AddLinkModal from "../components/AddLinkModel";
import { getAllLinks, addLink, updateLink, deleteLink } from "../APIs/Api";

export default function Dashboard() {
  const [links, setLinks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [toast, setToast] = useState("");
  

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const res = await getAllLinks();
        setLinks(res.data);
      } catch (err) {
        console.error(err);
        showToast("Failed to fetch links");
      }
    };
    fetchLinks();
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2000);
  };

  const openAdd = () => {
    setEditing(null);
    setModalOpen(true);
  };
  const openEdit = (link) => {
    setEditing(link);
    setModalOpen(true);
  };

  const handleSubmit = async (payload) => {
    try {
      if (editing) {
        await updateLink(editing._id, payload);
        setLinks((prev) =>
          prev.map((l) => (l._id === editing._id ? { ...l, ...payload } : l))
        );
        showToast("Link updated");
      } else {
        const res = await addLink(payload);
        setLinks((prev) => [res.data, ...prev]);
        showToast("Link added");
      }
    } catch (err) {
      console.error("Error adding link:", err);
      showToast("Failed to save link");
    }

    setModalOpen(false);
    setEditing(null);
  };

  const handleDelete = async (link) => {
    await deleteLink(link._id);
    setLinks((prev) => prev.filter((l) => l._id !== link._id));
    showToast("Link deleted");
  };

  const handleCopy = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
      showToast("Link copied to clipboard");
    } catch {
      showToast("Failed to copy link");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-gray-100 dark:from-gray-950 dark:via-black dark:to-gray-900 transition-colors duration-300">
      <main className="mx-auto max-w-7xl px-6 py-12">
        {/* Header */}
        <div className="mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
              Your Links
            </h1>
            <p className="mt-1 text-gray-600 dark:text-gray-400 text-sm">
              Manage, organize, and share all your important links in one place.
            </p>
          </div>
          <button
            onClick={openAdd}
            className="rounded-xl bg-yellow-400 px-5 py-2.5 text-sm font-semibold text-black shadow-lg hover:bg-yellow-500 transition-all dark:hover:bg-yellow-300"
          >
            + Add Link
          </button>
        </div>

        {/* Links grid */}
        {links.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {links.map((link) => (
              <LinkCard
                key={link._id}
                link={link}
                onEdit={openEdit}
                onDelete={handleDelete}
                onCopy={handleCopy}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed bg-white dark:bg-gray-900 dark:border-gray-700 p-12 text-center shadow-inner transition-colors">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100 text-yellow-500 dark:bg-yellow-900/40 dark:text-yellow-400">
              ⭐
            </div>
            <p className="text-gray-700 dark:text-gray-300 font-medium">
              No links yet. Start by adding your first one!
            </p>
            <button
              onClick={openAdd}
              className="mt-4 rounded-lg bg-yellow-400 px-4 py-2 text-black font-semibold hover:bg-yellow-500 transition-all dark:hover:bg-yellow-300"
            >
              Add Link
            </button>
          </div>
        )}
      </main>

      {/* Modal */}
      <AddLinkModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditing(null);
        }}
        onSubmit={handleSubmit}
        defaultValues={editing}
      />

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-xl bg-gray-900/90 dark:bg-gray-800 px-5 py-2 text-sm text-white shadow-xl backdrop-blur-md animate-fade-in">
          {toast}
        </div>
      )}
    </div>
  );
}
