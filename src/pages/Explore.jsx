import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import BookCard from "../components/BookCard";

function Explore() {

  const books = [
    {
      id: 1,
      title: "Atomic Habits",
      author: "James Clear",
      image: "https://covers.openlibrary.org/b/id/10561564-L.jpg",
    },
    {
      id: 2,
      title: "Deep Work",
      author: "Cal Newport",
      image: "https://covers.openlibrary.org/b/id/8231991-L.jpg",
    },
    {
      id: 3,
      title: "The Alchemist",
      author: "Paulo Coelho",
      image: "https://covers.openlibrary.org/b/id/8770983-L.jpg",
    },
    {
      id: 4,
      title: "Rich Dad Poor Dad",
      author: "Robert Kiyosaki",
      image: "https://covers.openlibrary.org/b/id/8091016-L.jpg",
    },
    {
      id: 5,
      title: "Think and Grow Rich",
      author: "Napoleon Hill",
      image: "https://covers.openlibrary.org/b/id/8226191-L.jpg",
    },
    { 
      id: 6,
      title: "The Psychology of Money",
      author: "Morgan Housel",
      image: "https://covers.openlibrary.org/b/id/10958337-L.jpg",
    },
  ];

  return (
    <div className="flex bg-gray-100 min-h-screen">

      <Sidebar />

      <div className="flex-1 p-6 space-y-6">

        <Navbar />

        <h1 className="text-2xl font-bold">Explore Books</h1>

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

      </div>

    </div>
  );
}

export default Explore;