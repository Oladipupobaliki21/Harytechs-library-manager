import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeBook, updateBookStatus } from "../features/books/booksSlice";
import Sidebar from "../components/Sidebar";
import BookCard from "../components/BookCard";
import { FaBook } from "react-icons/fa";

const STATUS_FILTERS = ["All", "Reading", "Completed", "Want to Read"];

const STATUS_MAP = {
  Reading: "reading",
  Completed: "completed",
  "Want to Read": "want-to-read",
};

const STATUS_BADGE = {
  reading: "bg-blue-100 text-blue-700",
  completed: "bg-green-100 text-green-700",
  "want-to-read": "bg-yellow-100 text-yellow-700",
};

const STATUS_LABEL = {
  reading: "Reading",
  completed: "Completed",
  "want-to-read": "Want to Read",
};

function MyLibrary() {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.library);

  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      activeFilter === "All" || book.status === STATUS_MAP[activeFilter];

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="flex-1 p-6 space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">My Library</h1>

        {/* Search + Filter row */}
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Search your library..."
            className="border border-gray-300 rounded-xl px-4 py-2 w-full sm:w-80 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white shadow-sm text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className="flex gap-2 flex-wrap">
            {STATUS_FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium border transition ${
                  activeFilter === f
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
                }`}
              >
                {f}
                <span className="ml-1 text-xs opacity-70">
                  {f === "All"
                    ? `(${books.length})`
                    : `(${books.filter((b) => b.status === STATUS_MAP[f]).length})`}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Empty state */}
        {filteredBooks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <FaBook className="text-5xl mb-4 opacity-30" />
            <p className="font-medium text-gray-600">No books found.</p>
            {books.length === 0 && (
              <p className="text-sm mt-1">
                Go to{" "}
                <Link to="/explore" className="text-blue-500 hover:underline">
                  Explore
                </Link>{" "}
                to start building your library.
              </p>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredBooks.map((book) => (
              <div key={book.id} className="relative flex flex-col">
                {/* Status badge */}
                <div className="absolute top-2 right-2 z-10">
                  <select
                    value={book.status || "reading"}
                    onChange={(e) =>
                      dispatch(updateBookStatus({ id: book.id, status: e.target.value }))
                    }
                    onClick={(e) => e.preventDefault()}
                    className={`text-xs px-2 py-0.5 rounded-full font-medium border-0 outline-none cursor-pointer shadow ${
                      STATUS_BADGE[book.status || "reading"]
                    }`}
                  >
                    <option value="reading">Reading</option>
                    <option value="completed">Completed</option>
                    <option value="want-to-read">Want to Read</option>
                  </select>
                </div>

                <Link
                  to={`/book/${encodeURIComponent(book.id)}`}
                  state={book}
                  className="flex-1"
                >
                  <BookCard
                    title={book.title}
                    author={book.author}
                    image={book.image}
                    year={book.year}
                    rating={book.rating}
                    isFavorite={book.isFavorite}
                  />
                </Link>

                {/* Remove button */}
                <button
                  onClick={() => dispatch(removeBook(book.id))}
                  className="mt-2 w-full text-xs text-red-500 hover:text-red-700 hover:bg-red-50 py-1 rounded-lg transition"
                >
                  Remove from Library
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyLibrary;