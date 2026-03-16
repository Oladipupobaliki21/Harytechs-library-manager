import { useDispatch } from "react-redux";
import { addBook } from "../features/books/booksSlice";
import { useLocation } from "react-router-dom"
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function BookDetails() {

  const location = useLocation();
  const book = location.state;

  const dispatch = useDispatch();

  const handleAddBook = () => {
    dispatch(addBook(book));
  };

  if (!book) {
    return <p>Book not found</p>;
  }

  return (
    <div className="flex bg-gray-100 min-h-screen">

      <Sidebar />

      <div className="flex-1 p-6 space-y-6">

        <Navbar />

        <div className="bg-white p-6 rounded-xl shadow flex gap-6">

          <img
            src={book.image}
            alt={book.title}
            className="w-48 h-64 object-cover rounded-lg"
          />

          <div>

            <h1 className="text-3xl font-bold">
              {book.title}
            </h1>

            <p className="text-gray-600 mt-2">
              by {book.author}
            </p>

            <button
              onClick={handleAddBook}
              className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Add to Library
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default BookDetails;