import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeBook } from "../features/books/booksSlice";
import Sidebar from "../components/Sidebar";
// import Navbar from "../components/Navbar";
import BookCard from "../components/BookCard";


function MyLibrary() {
  const dispatch = useDispatch();

 
  const books = useSelector((state) => state.books.library);

  const [searchTerm, setSearchTerm] = useState("");

  
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  
  const handleRemove = (id) => {
    dispatch(removeBook(id));
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">

     
      <Sidebar />

     
      <div className="flex-1 p-6 space-y-6">

        
        {/* <Navbar /> */}

        <h1 className="text-2xl font-bold">My Library</h1>

       
        <input
          type="text"
          placeholder="Search in your library..."
          className="border rounded-lg px-4 py-2 w-full md:w-96 mb-6"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        
        {filteredBooks.length === 0 ? (
          <p className="text-gray-500">No books found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredBooks.map((book) => (
              <div key={book.id} className="relative">
                <Link to={`/book/${book.id}`} state={book}>
                  <BookCard
                    title={book.title}
                    author={book.author}
                    image={book.image}
                  />
                </Link>
                <button
                  onClick={() => handleRemove(book.id)}
                  className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs hover:bg-red-600"
                >
                  Remove
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