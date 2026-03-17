import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import profileImage from "../assets/Profile.png";

function Navbar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/explore?q=${encodeURIComponent(query.trim())}`);
      setQuery("");
    }
  };

  return (
    <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow">
      {/* Search form — pressing Enter navigates to Explore with ?q= */}
      <form onSubmit={handleSearch} className="flex items-center gap-2 w-full md:w-80">
        <div className="relative w-full">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
          <input
            id="navbar-search"
            type="text"
            placeholder="Search books..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border rounded-lg pl-9 pr-4 py-2 w-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg text-sm transition shrink-0"
        >
          Search
        </button>
      </form>

      {/* Profile */}
      <div className="flex items-center gap-3 ml-4">
        <img
          src={profileImage}
          alt="Profile"
          loading="lazy"
          className="rounded-full h-10 w-10 object-cover border-2 border-blue-100"
        />
        <span className="font-semibold text-sm hidden sm:block">Balqees Oladipupo</span>
      </div>
    </div>
  );
}

export default Navbar;