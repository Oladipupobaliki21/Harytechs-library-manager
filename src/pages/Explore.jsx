
import { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
// import Navbar from "../components/Navbar";
import BookCard from "../components/BookCard";
import { books } from "../data/books"; 

function Explore() {
  const [searchTerm, setSearchTerm] = useState("");

  
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex bg-gray-100 min-h-screen">

     
      <Sidebar />

    
      <div className="flex-1 p-6 space-y-6">

      
        {/* <Navbar /> */}

        <h1 className="text-2xl font-bold">Explore Books</h1>

      
        <input
          type="text"
          placeholder="Search books by title or author..."
          className="border rounded-lg px-4 py-2 w-full md:w-96 mb-6"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

      
        {filteredBooks.length === 0 ? (
          <p className="text-gray-500">No books found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredBooks.map((book) => (
              <Link
                key={book.id}
                to={`/book/${book.id}`}
                state={book} 
              >
                <BookCard
                  id={book.id}
                  title={book.title}
                  author={book.author}
                  image={book.image}
                />
              </Link>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default Explore;