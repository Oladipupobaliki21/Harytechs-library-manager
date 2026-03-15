import BookCard from "./BookCard";

function ReadingStatus({ books }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow">
      <h2 className="font-bold mb-4">Currently Reading</h2>

      <div className="flex gap-4 overflow-x-auto">
        {books.map((book, index) => (
          <BookCard
            key={index}
            title={book.title}
            author={book.author}
            image={book.image}
          />
        ))}
      </div>
    </div>
  );
}

export default ReadingStatus;