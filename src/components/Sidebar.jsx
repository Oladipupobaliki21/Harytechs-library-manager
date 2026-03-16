import { NavLink } from "react-router-dom";
import { FaChartPie, FaSearch, FaBook, FaStar } from "react-icons/fa";

function Sidebar() {
  return (
    <div className="w-64 bg-white shadow-md p-6">

      <h2 className="text-xl font-bold mb-8">
        📚 Book Library
      </h2>

      <nav className="space-y-3">

        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-3 p-2 rounded-lg transition ${
              isActive
                ? "bg-blue-500 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          <FaChartPie />
          Dashboard
        </NavLink>

        <NavLink
          to="/explore"
          className={({ isActive }) =>
            `flex items-center gap-3 p-2 rounded-lg transition ${
              isActive
                ? "bg-blue-500 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          <FaSearch />
          Explore
        </NavLink>

        <NavLink
          to="/library"
          className={({ isActive }) =>
            `flex items-center gap-3 p-2 rounded-lg transition ${
              isActive
                ? "bg-blue-500 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          <FaBook />
          My Library
        </NavLink>

        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            `flex items-center gap-3 p-2 rounded-lg transition ${
              isActive
                ? "bg-blue-500 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          <FaStar />
          Favorites
        </NavLink>

      </nav>

    </div>
  );
}

export default Sidebar;