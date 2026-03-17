import { FaStar, FaHeart } from "react-icons/fa";

// Pure display card — navigation (Link) is handled by each parent page.
function BookCard({ title, author, image, year, rating, isFavorite }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg cursor-pointer hover:scale-105 transition duration-300 h-full flex flex-col">
      {/* Cover image */}
      <div className="relative">
        <img
          src={image || "https://via.placeholder.com/160x220?text=No+Cover"}
          alt={title}
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://via.placeholder.com/160x220?text=No+Cover";
          }}
          className="h-44 w-full object-cover rounded-lg"
        />
        {/* Year badge */}
        {year && (
          <span className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded-full z-10">
            {year}
          </span>
        )}
        
        {/* Favorite badge */}
        {isFavorite && (
          <span className="absolute top-2 -right-1 bg-white p-1.5 rounded-full shadow z-10 border border-red-50 text-rose-500">
            <FaHeart className="text-xs" />
          </span>
        )}
      </div>

      {/* Info */}
      <div className="mt-3 flex-1 flex flex-col gap-1">
        <h3 className="font-semibold text-sm leading-snug line-clamp-2">{title}</h3>
        <p className="text-xs text-gray-500 truncate">{author}</p>

        {/* Star rating */}
        {rating && (
          <div className="flex items-center gap-1 mt-auto pt-1">
            <FaStar className="text-yellow-400 text-xs" />
            <span className="text-xs text-gray-600">{rating}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookCard;