import { Link } from "react-router-dom";
import BookCard from "./BookCard";

function ReadingStatus({ books }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow">
      <h2 className="font-bold mb-4">Currently Reading</h2>

      <div className="flex gap-4 overflow-x-auto">
        {books.map((book) => (
          // Each card is individually wrapped in a Link so navigation works correctly
          <Link
            key={book.id}
            to={`/book/${book.id}`}
            state={book}
            className="flex-shrink-0"
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
    </div>
  );
}

export default ReadingStatus;