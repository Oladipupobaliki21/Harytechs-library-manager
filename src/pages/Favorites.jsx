import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleFavorite } from "../features/books/booksSlice";
import Sidebar from "../components/Sidebar";
import BookCard from "../components/BookCard";
import { FaHeart, FaHeartBroken } from "react-icons/fa";

function Favorites() {
  const dispatch = useDispatch();
  const library = useSelector((state) => state.books.library);

  const favoriteBooks = library.filter((book) => book.isFavorite);

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="flex-1 p-6 space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">Favorite Books</h1>
        <p className="text-gray-500">Books you have loved the most.</p>

        {favoriteBooks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400 bg-white rounded-xl shadow mt-6">
            <FaHeartBroken className="text-5xl mb-4 opacity-30 text-rose-500" />
            <p className="font-medium text-gray-600">No favorites yet.</p>
            <p className="text-sm mt-1">
              Go to{" "}
              <Link to="/explore" className="text-blue-500 hover:underline">
                Explore
              </Link>{" "}
              or your Library and click the heart icon on any book you love.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
            {favoriteBooks.map((book) => (
              <div key={book.id} className="relative flex flex-col group">
                <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => dispatch(toggleFavorite(book))}
                    title="Remove from favorites"
                    className="bg-white p-2 rounded-full shadow text-rose-500 hover:bg-rose-50 transition"
                  >
                    <FaHeart />
                  </button>
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
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Favorites;
