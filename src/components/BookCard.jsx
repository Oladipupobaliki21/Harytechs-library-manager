// BookCard is a PURE DISPLAY component — no Link inside.
// Navigation is handled by the parent (Explore, MyLibrary, ReadingStatus).
function BookCard({ title, author, image }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg cursor-pointer hover:scale-105 transition duration-300">

      <img
        src={image}
        alt={title}
        loading="lazy"
        referrerPolicy="no-referrer"
        onError={(e) => {
          // Prevent infinite retry loops if image fails to load
          e.target.onerror = null;
          e.target.src =
            "https://via.placeholder.com/160x220?text=No+Cover";
        }}
        className="h-40 w-full object-cover rounded-lg"
      />

      <h3 className="font-semibold mt-3 truncate">{title}</h3>

      <p className="text-sm text-gray-500 truncate">{author}</p>

    </div>
  );
}

export default BookCard;