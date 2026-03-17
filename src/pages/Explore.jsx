import { useState, useEffect, useCallback, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FaSearch, FaSpinner, FaChevronLeft, FaChevronRight, FaStar } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import BookCard from "../components/BookCard";
import { searchBooks, getTrendingBooks, getBooksBySubject } from "../services/bookApi";

// Category → Open Library subject slug
const CATEGORIES = [
  { label: "Trending", subject: null },
  { label: "Self-Help", subject: "self_help" },
  { label: "Productivity", subject: "productivity" },
  { label: "Fiction", subject: "fiction" },
  { label: "Finance", subject: "personal_finance" },
  { label: "Science", subject: "science" },
  { label: "Biography", subject: "biography" },
];

/** Skeleton card for loading state */
function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl shadow p-4 animate-pulse">
      <div className="h-40 bg-gray-200 rounded-lg mb-3" />
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
      <div className="h-3 bg-gray-100 rounded w-1/2" />
    </div>
  );
}

function Explore() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [inputValue, setInputValue] = useState(initialQuery);
  const [activeCategory, setActiveCategory] = useState("Trending");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const debounceRef = useRef(null);

  // ─── Core Fetch Logic ──────────────────────────────────────────────────────
  const fetchBooks = useCallback(async (query, category, currentPage) => {
    setLoading(true);
    setError(null);
    try {
      if (query.trim()) {
        // Live search via API
        const result = await searchBooks(query, { page: currentPage });
        setBooks(result.books);
        setTotalPages(result.totalPages);
        setTotalResults(result.total);
      } else if (category === "Trending") {
        const result = await getTrendingBooks(16);
        setBooks(result);
        setTotalPages(1);
        setTotalResults(result.length);
      } else {
        const cat = CATEGORIES.find((c) => c.label === category);
        const result = await getBooksBySubject(cat?.subject || category, 16);
        setBooks(result);
        setTotalPages(1);
        setTotalResults(result.length);
      }
    } catch (err) {
      setError("Failed to load books. Please check your connection and try again.");
      setBooks([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // ─── On mount: honour ?q= param ──────────────────────────────────────────
  useEffect(() => {
    if (initialQuery) {
      fetchBooks(initialQuery, activeCategory, 1);
    } else {
      fetchBooks("", "Trending", 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ─── Debounced search ─────────────────────────────────────────────────────
  const handleInputChange = (e) => {
    const val = e.target.value;
    setInputValue(val);
    setPage(1);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      // Sync URL param
      if (val.trim()) {
        setSearchParams({ q: val });
      } else {
        setSearchParams({});
      }
      fetchBooks(val, activeCategory, 1);
    }, 450);
  };

  // ─── Category change ──────────────────────────────────────────────────────
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setPage(1);
    setInputValue("");
    setSearchParams({});
    fetchBooks("", category, 1);
  };

  // ─── Pagination ───────────────────────────────────────────────────────────
  const handlePageChange = (newPage) => {
    setPage(newPage);
    fetchBooks(inputValue, activeCategory, newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isSearching = inputValue.trim().length > 0;

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="flex-1 p-6 space-y-5">
        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Explore Books</h1>
            {!loading && (
              <p className="text-sm text-gray-500 mt-0.5">
                {isSearching
                  ? `${totalResults.toLocaleString()} results for "${inputValue}"`
                  : `Showing ${activeCategory.toLowerCase()} books`}
              </p>
            )}
          </div>

          {/* Search bar */}
          <div className="relative w-full sm:w-96">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              id="explore-search"
              type="text"
              placeholder="Search millions of books..."
              className="border border-gray-300 rounded-xl pl-10 pr-4 py-2.5 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
              value={inputValue}
              onChange={handleInputChange}
            />
            {loading && inputValue && (
              <FaSpinner className="absolute right-3 top-3 text-blue-400 animate-spin" />
            )}
          </div>
        </div>

        {/* ── Category Filters (hidden during search) ── */}
        {!isSearching && (
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.label}
                onClick={() => handleCategoryChange(cat.label)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition ${
                  activeCategory === cat.label
                    ? "bg-blue-500 text-white border-blue-500 shadow"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        )}

        {/* ── Error ── */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
            ⚠️ {error}
          </div>
        )}

        {/* ── Loading Skeleton ── */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* ── Results Grid ── */}
        {!loading && !error && books.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <FaSearch className="text-5xl mb-4 opacity-30" />
            <p className="text-lg font-medium">No books found</p>
            <p className="text-sm">Try a different search term or category</p>
          </div>
        )}

        {!loading && books.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {books.map((book) => (
              <Link
                key={`${book.id}-${book.title}`}
                to={`/book/${encodeURIComponent(book.id)}`}
                state={book}
              >
                <BookCard
                  title={book.title}
                  author={book.author}
                  image={book.image}
                  year={book.year}
                  rating={book.rating}
                />
              </Link>
            ))}
          </div>
        )}

        {/* ── Pagination (search results only) ── */}
        {!loading && isSearching && totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 pt-4 flex-wrap">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="flex items-center gap-1 px-3 py-2 rounded-lg bg-white border border-gray-300 text-sm disabled:opacity-40 hover:bg-gray-50 transition"
            >
              <FaChevronLeft className="text-xs" /> Prev
            </button>

            {/* Page numbers — show window around current page */}
            {Array.from({ length: Math.min(7, totalPages) }, (_, i) => {
              const start = Math.max(1, Math.min(page - 3, totalPages - 6));
              return start + i;
            }).map((p) => (
              <button
                key={p}
                onClick={() => handlePageChange(p)}
                className={`w-9 h-9 rounded-lg text-sm font-medium border transition ${
                  p === page
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-white border-gray-300 hover:bg-gray-50"
                }`}
              >
                {p}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              className="flex items-center gap-1 px-3 py-2 rounded-lg bg-white border border-gray-300 text-sm disabled:opacity-40 hover:bg-gray-50 transition"
            >
              Next <FaChevronRight className="text-xs" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Explore;