import { Link } from "react-router-dom";

function BookCard({ id, title, author, image }) {
  return (
    <Link
      to={`/book/${id}`}
      state={{ id, title, author, image }}
    >
      <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg cursor-pointer hover:scale-105 transition duration-300">

        <img
          src={image}
          alt={title}
          className="h-40 w-full object-cover rounded-lg"
        />

        <h3 className="font-semibold mt-3">{title}</h3>

        <p className="text-sm text-gray-500">{author}</p>

      </div>
    </Link>
  );
}

export default BookCard;