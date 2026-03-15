import { useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import BookCard from "../components/BookCard";

function MyLibrary() {

  const books = useSelector((state) => state.books.library);

  return (
    <div className="flex bg-gray-100 min-h-screen">

      <Sidebar />

      <div className="flex-1 p-6 space-y-6">

        <Navbar />

        <h1 className="text-2xl font-bold">My Library</h1>

        {books.length === 0 ? (
          <p className="text-gray-500">
            No books added yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

            {books.map((book) => (
              <BookCard
                key={book.id}
                id={book.id}
                title={book.title}
                author={book.author}
                image={book.image}
              />
            ))}

          </div>
        )}

      </div>

    </div>
  );
}

export default MyLibrary;