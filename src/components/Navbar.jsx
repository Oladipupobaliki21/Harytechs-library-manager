
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaHeart,
  FaBookOpen,
  FaBell,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import profileImage from "../assets/Profile.png";

function Navbar() {
  const [query, setQuery] = useState("");
  const [openDropdown, setOpenDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/explore?q=${encodeURIComponent(query.trim())}`);
      setQuery("");
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b px-6 py-3 flex items-center justify-between">
      
      {/* LOGO */}
      <div
        onClick={() => navigate("/")}
        className="cursor-pointer text-xl font-bold text-indigo-600"
      >
        📚 Harytechs
      </div>

      {/* SEARCH */}
      <form
        onSubmit={handleSearch}
        className="flex items-center w-full max-w-xl mx-6"
      >
        <div className="relative w-full">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search books, authors..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-2 rounded-full border bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>
      </form>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-5 relative">
        
        {/* Notifications */}
        <button className="relative text-gray-600 hover:text-indigo-600">
          <FaBell size={18} />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1.5 rounded-full">
            3
          </span>
        </button>

        {/* Favorites */}
        <button
          onClick={() => navigate("/favorites")}
          className="text-gray-600 hover:text-indigo-600"
        >
          <FaHeart size={18} />
        </button>

        {/* Library */}
        <button
          onClick={() => navigate("/my-library")}
          className="text-gray-600 hover:text-indigo-600"
        >
          <FaBookOpen size={18} />
        </button>

        {/* PROFILE */}
        <div className="relative" ref={dropdownRef}>
          <div
            onClick={() => setOpenDropdown(!openDropdown)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <img
              src={profileImage}
              alt="Profile"
              className="h-9 w-9 rounded-full border-2 border-indigo-100"
            />
            <span className="hidden md:block text-sm font-semibold">
              Balqees
            </span>
          </div>

          {/* DROPDOWN */}
          {openDropdown && (
            <div className="absolute right-0 mt-3 w-48 bg-white rounded-lg shadow-lg border py-2 animate-fadeIn">
              
              <button
                onClick={() => navigate("/settings")}
                className="flex items-center gap-3 px-4 py-2 w-full hover:bg-gray-100 text-sm"
              >
                <FaCog /> Settings
              </button>

              <button
                onClick={() => {
                  // logout logic here later
                  console.log("Logout clicked");
                }}
                className="flex items-center gap-3 px-4 py-2 w-full hover:bg-gray-100 text-sm text-red-500"
              >
                <FaSignOutAlt /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;