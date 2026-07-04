
import { useState, useEffect, useCallback, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  FaSearch,
  FaSpinner,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import BookCard from "../components/BookCard";
import {
  searchBooks,
  getTrendingBooks,
  getBooksBySubject,
} from "../services/bookApi";

const CATEGORIES = [
  { label: "Trending", subject: null },
  { label: "Self-Help", subject: "self_help" },
  { label: "Productivity", subject: "productivity" },
  { label: "Fiction", subject: "fiction" },
  { label: "Finance", subject: "personal_finance" },
  { label: "Science", subject: "science" },
  { label: "Biography", subject: "biography" },
];

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

  const fetchBooks = useCallback(async (query, category, currentPage) => {
    setLoading(true);
    setError(null);
    try {
      if (query.trim()) {
        const result = await searchBooks(query, { page: currentPage });
        setBooks(result.books || []);
        setTotalPages(result.totalPages || 1);
        setTotalResults(result.total || 0);
      } else if (category === "Trending") {
        const result = await getTrendingBooks(16);
        setBooks(result || []);
        setTotalPages(1);
        setTotalResults(result?.length || 0);
      } else {
        const cat = CATEGORIES.find((c) => c.label === category);
        const result = await getBooksBySubject(
          cat?.subject || category,
          16
        );
        setBooks(result || []);
        setTotalPages(1);
        setTotalResults(result?.length || 0);
      }
    } catch (err) {
      setError("Failed to load books. Please try again.");
      setBooks([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (initialQuery) {
      fetchBooks(initialQuery, activeCategory, 1);
    } else {
      fetchBooks("", "Trending", 1);
    }
  }, []);

  const handleInputChange = (e) => {
    const val = e.target.value;
    setInputValue(val);
    setPage(1);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (val.trim()) {
        setSearchParams({ q: val });
      } else {
        setSearchParams({});
      }
      fetchBooks(val, activeCategory, 1);
    }, 400);
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setPage(1);
    setInputValue("");
    setSearchParams({});
    fetchBooks("", category, 1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    fetchBooks(inputValue, activeCategory, newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isSearching = inputValue.trim().length > 0;

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />

      <div className="flex-1 p-6 space-y-8">
        {/* 🔥 HERO SECTION */}
        <div className="bg-linear-to-r from-indigo-600 to-purple-600 text-white p-8 rounded-2xl shadow">
          <h1 className="text-3xl font-bold">
            Discover Your Next Favorite Book
          </h1>
          <p className="mt-2 text-sm opacity-90">
            Explore thousands of books from top authors
          </p>
        </div>

        {/* 🔍 HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {isSearching ? "Search Results" : `${activeCategory} Books`}
            </h1>

            {!loading && (
              <p className="text-sm text-gray-500 mt-1">
                {isSearching
                  ? `${totalResults.toLocaleString()} results for "${inputValue}"`
                  : "Find books tailored to your interests"}
              </p>
            )}
          </div>

          {/* Search */}
          <div className="relative w-full lg:w-96">
            <FaSearch className="absolute left-4 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search books, authors..."
              className="border rounded-full pl-11 pr-4 py-2.5 w-full bg-white shadow focus:ring-2 focus:ring-indigo-500 outline-none"
              value={inputValue}
              onChange={handleInputChange}
            />
            {loading && inputValue && (
              <FaSpinner className="absolute right-4 top-3 text-indigo-500 animate-spin" />
            )}
          </div>
        </div>

        {/* 📂 CATEGORIES */}
        {!isSearching && (
          <div className="flex gap-3 overflow-x-auto pb-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.label}
                onClick={() => handleCategoryChange(cat.label)}
                className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${
                  activeCategory === cat.label
                    ? "bg-indigo-600 text-white shadow"
                    : "bg-white text-gray-700 border hover:bg-gray-100"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        )}

        {/* ❌ ERROR */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
            ⚠️ {error}
          </div>
        )}

        {/* ⏳ LOADING */}
        {loading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {Array.from({ length: 10 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* 📭 EMPTY */}
        {!loading && !error && books.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-gray-400">
            <FaSearch className="text-6xl mb-4 opacity-20" />
            <h2 className="text-lg font-semibold">No books found</h2>
            <p className="text-sm">Try another keyword</p>
          </div>
        )}

        {/* 📚 RESULTS */}
        {!loading && books.length > 0 && (
          <>
            <h2 className="text-lg font-semibold text-gray-700">
              {isSearching ? "Results" : activeCategory}
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {books.map((book) => (
                <Link
                  key={`${book.id}-${book.title}`}
                  to={`/book/${encodeURIComponent(book.id)}`}
                  state={book}
                >
                  <BookCard {...book} />
                </Link>
              ))}
            </div>
          </>
        )}

        {/* 🔄 PAGINATION */}
        {!loading && isSearching && totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 pt-4 flex-wrap">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="px-3 py-2 rounded-lg bg-white border disabled:opacity-40"
            >
              Prev
            </button>

            {Array.from({ length: Math.min(7, totalPages) }, (_, i) => {
              const start = Math.max(1, Math.min(page - 3, totalPages - 6));
              return start + i;
            }).map((p) => (
              <button
                key={p}
                onClick={() => handlePageChange(p)}
                className={`w-9 h-9 rounded-lg ${
                  p === page
                    ? "bg-indigo-600 text-white"
                    : "bg-white border"
                }`}
              >
                {p}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              className="px-3 py-2 rounded-lg bg-white border disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Explore;