import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateBookStatus } from "../features/books/booksSlice";
import { FaBookReader } from "react-icons/fa";

const STATUS_OPTIONS = [
  { value: "reading", label: "Reading" },
  { value: "completed", label: "Completed" },
  { value: "want-to-read", label: "Want to Read" },
];

const STATUS_COLOR = {
  reading: "bg-blue-100 text-blue-700",
  completed: "bg-green-100 text-green-700",
  "want-to-read": "bg-yellow-100 text-yellow-700",
};

function KeepReading() {
  const dispatch = useDispatch();
  const library = useSelector((state) => state.books.library);

  // Show the most recently added books (last 4)
  const recentBooks = [...library].reverse().slice(0, 4);

  if (recentBooks.length === 0) {
    return (
      <div className="bg-white p-5 rounded-xl shadow text-center text-gray-400">
        <FaBookReader className="text-4xl mb-2 mx-auto opacity-30" />
        <h2 className="font-bold mb-1 text-gray-700">Your Shelf</h2>
        <p className="text-sm">Books you add will appear here.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-5 rounded-xl shadow">
      <h2 className="font-bold mb-4 text-gray-800">Your Shelf</h2>

      <div className="flex flex-col gap-4">
        {recentBooks.map((book) => (
          <div key={book.id} className="flex gap-3 items-start">
            {/* Cover */}
            <Link to={`/book/${encodeURIComponent(book.id)}`} state={book} className="shrink-0">
              <img
                src={book.image || "https://via.placeholder.com/48x64?text=📚"}
                alt={book.title}
                loading="lazy"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/48x64?text=📚";
                }}
                className="h-16 w-12 object-cover rounded shadow"
              />
            </Link>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm leading-snug line-clamp-2">{book.title}</p>
              <p className="text-xs text-gray-400 truncate mb-1">{book.author}</p>

              {/* Status dropdown */}
              <select
                value={book.status || "reading"}
                onChange={(e) =>
                  dispatch(updateBookStatus({ id: book.id, status: e.target.value }))
                }
                className={`text-xs px-2 py-0.5 rounded-full font-medium border-0 outline-none cursor-pointer ${
                  STATUS_COLOR[book.status || "reading"]
                }`}
              >
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default KeepReading;