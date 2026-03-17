import { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

import Sidebar from "../components/Sidebar";
// import Navbar from "../components/Navbar";
import BookCard from "../components/BookCard";
import { books } from "../data/books";

function Explore() {

  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Self-Help", "Productivity", "Fiction"];

  const filteredBooks = books.filter((book) => {

    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      activeCategory === "All" || book.category === activeCategory;

    return matchesSearch && matchesCategory;

  });

  return (
    <div className="flex bg-gray-100 min-h-screen">

 
      <Sidebar />

    
      <div className="flex-1 p-6 space-y-6">

        {/* <Navbar /> */}

        <h1 className="text-2xl font-bold">Explore Books</h1>

      
        <div className="relative w-full md:w-96">

          <FaSearch className="absolute left-3 top-3 text-gray-400 cursor-pointer" />

          <input
            type="text"
            placeholder="Search books by title or author..."
            className="border rounded-lg pl-10 pr-4 py-2 w-full cursor-pointer"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

        </div>


        <div className="flex gap-3 mt-4 flex-wrap">

          {categories.map((category) => (

            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-lg border ${
                activeCategory === category
                  ? "bg-blue-500 text-white"
                  : "bg-white"
              }`}
            >
              {category}
            </button>

          ))}

        </div>

        {filteredBooks.length === 0 ? (

          <p className="text-gray-500 mt-6">No books found.</p>

        ) : (

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">

            {filteredBooks.map((book) => (

              <Link
                key={book.id}
                to={`/book/${book.id}`}
                state={book}
              >

                <BookCard
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