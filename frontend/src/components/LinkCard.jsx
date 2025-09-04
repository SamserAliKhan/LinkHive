export default function LinkCard({ link, onEdit, onDelete, onCopy }) {
  const { title, url, description, tags = [] } = link || {};

  return (
    <div
      className="rounded-2xl border bg-white dark:bg-gray-800 p-6 
              transition-all duration-300
              hover:shadow-lg hover:dark:shadow-none
              dark:hover:drop-shadow-[0_0_12px_rgba(16,185,129,0.7)] group"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="text-base font-semibold text-gray-800 dark:text-gray-100 hover:underline"
          >
            {title || url}
          </a>
          {description ? (
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
              {description}
            </p>
          ) : null}
        </div>

        {/* Action buttons */}
        <div className="flex gap-1 opacity-0 transition group-hover:opacity-100">
          <button
            onClick={() => onCopy?.(url)}
            className="rounded-lg border border-gray-300 dark:border-gray-700 px-2 py-1 text-xs text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            title="Copy link"
          >
            Copy
          </button>
          <button
            onClick={() => onEdit?.(link)}
            className="rounded-lg border border-gray-300 dark:border-gray-700 px-2 py-1 text-xs text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            title="Edit"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete?.(link)}
            className="rounded-lg border border-red-300 dark:border-red-700 px-2 py-1 text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30"
            title="Delete"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Tags */}
      {tags?.length ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {tags.map((t) => (
            <span
              key={t}
              className="rounded-full bg-gray-100 dark:bg-gray-800 px-2 py-0.5 text-xs text-gray-700 dark:text-gray-300"
            >
              #{t}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}
