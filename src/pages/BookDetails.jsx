import { useDispatch, useSelector } from "react-redux";
import { addBook, removeBook, updateBookStatus, toggleFavorite } from "../features/books/booksSlice";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { books as localBooks } from "../data/books";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { FaStar, FaCalendarAlt, FaBook, FaTrash, FaPlus, FaCheck, FaHeart, FaRegHeart } from "react-icons/fa";

const STATUS_LABELS = {
  reading: "Currently Reading",
  completed: "Completed ✓",
  "want-to-read": "Want to Read",
};

function BookDetails() {
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const library = useSelector((state) => state.books.library);

  // 1. State from navigation (always up-to-date from Explore/Library)
  // 2. Check Redux library
  // 3. Fallback to local static data
  const decodedId = decodeURIComponent(id);
  const book =
    location.state ||
    library.find((b) => b.id === decodedId) ||
    localBooks.find((b) => String(b.id) === decodedId);

  const inLibrary = library.find((b) => b.id === book?.id);

  if (!book) {
    return (
      <div className="flex justify-center items-center h-screen text-center">
        <div>
          <p className="text-xl font-semibold text-gray-700">Book not found.</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 text-blue-500 hover:underline text-sm"
          >
            ← Go back
          </button>
        </div>
      </div>
    );
  }

  const handleAddBook = () => dispatch(addBook(book));
  const handleRemove = () => dispatch(removeBook(book.id));
  const handleStatusChange = (e) =>
    dispatch(updateBookStatus({ id: book.id, status: e.target.value }));

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6 overflow-x-hidden">
        <Navbar />

        {/* Back link */}
        <button
          onClick={() => navigate(-1)}
          className="mt-4 mb-6 flex items-center gap-1 text-blue-500 hover:underline text-sm"
        >
          ← Back
        </button>

        <div className="bg-white p-6 rounded-2xl shadow flex flex-col md:flex-row gap-8">
          {/* ── Cover ── */}
          <div className="shrink-0">
            <img
              src={book.image || "https://via.placeholder.com/200x280?text=No+Cover"}
              alt={book.title}
              loading="lazy"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/200x280?text=No+Cover";
              }}
              className="w-44 h-60 object-cover rounded-xl shadow-md"
            />
          </div>

          {/* ── Info ── */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-800 leading-snug">{book.title}</h1>
            <p className="text-gray-500 text-lg mt-1">by {book.author}</p>

            {/* Meta row */}
            <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-500">
              {book.year && (
                <span className="flex items-center gap-1">
                  <FaCalendarAlt className="text-blue-400" /> {book.year}
                </span>
              )}
              {book.pages && (
                <span className="flex items-center gap-1">
                  <FaBook className="text-blue-400" /> {book.pages.toLocaleString()} pages
                </span>
              )}
              {book.rating && (
                <span className="flex items-center gap-1">
                  <FaStar className="text-yellow-400" /> {book.rating}
                  {book.ratingsCount > 0 && (
                    <span className="text-gray-400 text-xs">
                      ({book.ratingsCount.toLocaleString()} ratings)
                    </span>
                  )}
                </span>
              )}
              {book.category && (
                <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full text-xs font-medium">
                  {book.category}
                </span>
              )}
            </div>

            {/* Library actions */}
            <div className="flex flex-wrap items-center gap-3 mt-8">
              {!inLibrary ? (
                <button
                  onClick={handleAddBook}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl transition font-medium shadow"
                >
                  <FaPlus /> Add to Library
                </button>
              ) : (
                <>
                  {/* Status selector */}
                  <div className="flex items-center gap-2 bg-green-50 border border-green-200 px-3 py-2 rounded-xl h-11">
                    <FaCheck className="text-green-500 text-sm" />
                    <select
                      value={inLibrary.status || "reading"}
                      onChange={handleStatusChange}
                      className="bg-transparent text-sm text-green-700 font-medium outline-none cursor-pointer"
                    >
                      <option value="reading">Currently Reading</option>
                      <option value="completed">Completed</option>
                      <option value="want-to-read">Want to Read</option>
                    </select>
                  </div>

                  <button
                    onClick={handleRemove}
                    className="flex items-center gap-2 bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 px-4 py-2.5 rounded-xl transition text-sm font-medium h-11"
                  >
                    <FaTrash /> Remove
                  </button>
                </>
              )}

              {/* Favorite Button */}
              <button
                onClick={() => dispatch(toggleFavorite(book))}
                className={`flex items-center justify-center w-11 h-11 rounded-xl border transition shadow-sm ${
                  inLibrary?.isFavorite
                    ? "bg-rose-50 border-rose-200 text-rose-500 hover:bg-rose-100"
                    : "bg-white border-gray-200 text-gray-400 hover:bg-gray-50 hover:text-rose-400"
                }`}
                title={inLibrary?.isFavorite ? "Remove from Favorites" : "Add to Favorites"}
              >
                {inLibrary?.isFavorite ? <FaHeart className="text-lg" /> : <FaRegHeart className="text-lg" />}
              </button>
            </div>

            {/* Open Library link */}
            {book.olKey && (
              <a
                href={`https://openlibrary.org${book.olKey}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 text-xs text-blue-400 hover:underline"
              >
                View on Open Library →
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;
