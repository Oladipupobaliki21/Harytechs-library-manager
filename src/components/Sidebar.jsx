import { Link } from "react-router-dom";

import { FaHome, FaBook, FaUsers, FaCog } from "react-icons/fa";

function Sidebar() {
  return (
    <div className="hidden md:block w-64 h-screen bg-white shadow-md p-6">

      <h1 className="text-2xl font-bold mb-10">📚 Library</h1>

      <nav className="flex flex-col gap-6">

        <Link to="/" className="flex items-center gap-3 hover:text-blue-500">
          <FaHome />
          Dashboard
        </Link>

        <Link to="/explore" className="flex items-center gap-3 hover:text-blue-500">
          <FaBook />
          Explore
        </Link>

        <Link to="/library" className="flex items-center gap-3 hover:text-blue-500">
          <FaBook />
          My Library
        </Link>

        <Link to="/authors" className="flex items-center gap-3 hover:text-blue-500">
          <FaUsers />
          Authors
        </Link>

        <Link to="/settings" className="flex items-center gap-3 hover:text-blue-500">
          <FaCog />
          Settings
        </Link>

      </nav>
    </div>
  );
}

export default Sidebar;