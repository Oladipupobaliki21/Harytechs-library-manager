import { useDispatch } from "react-redux";
import { addBook } from "../features/books/booksSlice";
import { useLocation, useParams } from "react-router-dom";
import { books } from "../data/books"; // Import your source data
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function BookDetails() {
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();

  // 1. Try to get book from navigation state
  // 2. Fallback: Find it in the local data array using the ID from the URL
  const book = location.state || books.find((b) => b.id === parseInt(id));

  if (!book) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold">Book not found or page refreshed.</p>
      </div>
    );
  }

  const handleAddBook = () => {
    dispatch(addBook(book));
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6">
        <Navbar />
        <div className="bg-white p-6 rounded-xl shadow flex flex-col md:flex-row gap-6 mt-6">
          <img 
            src={book.image} 
            alt={book.title} 
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/192x256?text=No+Cover";
            }}
            className="w-48 h-64 object-cover rounded-lg shadow-md" 
          />
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{book.title}</h1>
            <p className="text-gray-600 mt-2 text-lg">by {book.author}</p>
            <button
              onClick={handleAddBook}
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors font-medium"
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
