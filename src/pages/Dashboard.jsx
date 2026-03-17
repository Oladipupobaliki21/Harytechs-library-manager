import { useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatsCards from "../components/StatsCards";
import KeepReading from "../components/KeepReading";
import ReadingStatus from "../components/ReadingStatus";
import { FaBook, FaBookReader, FaCheckCircle, FaBookmark } from "react-icons/fa";

function Dashboard() {
  // ─── Live stats from Redux ────────────────────────────────────────────────
  const library = useSelector((state) => state.books.library);

  const totalBooks = library.length;
  const currentlyReading = library.filter((b) => b.status === "reading").length;
  const completed = library.filter((b) => b.status === "completed").length;
  const wantToRead = library.filter((b) => b.status === "want-to-read").length;

  // Unique authors
  const uniqueAuthors = new Set(library.map((b) => b.author)).size;

  // Books currently being read (for ReadingStatus section)
  const readingNow = library.filter((b) => b.status === "reading").slice(0, 6);

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="flex-1 p-6 space-y-6 overflow-x-hidden">
        <Navbar />

        {/* ── Welcome banner ─────────────────────────────────────────────── */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl p-6 shadow-lg">
          <h1 className="text-2xl font-bold">Welcome back, Balqees 👋</h1>
          <p className="text-blue-100 mt-1 text-sm">
            {totalBooks === 0
              ? "Your library is empty — head to Explore to add your first book!"
              : `You have ${totalBooks} book${totalBooks !== 1 ? "s" : ""} in your library.`}
          </p>
        </div>

        {/* ── Stats Cards ────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCards
            title="Books in Library"
            value={totalBooks}
            icon={<FaBook />}
            color="blue"
          />
          <StatsCards
            title="Currently Reading"
            value={currentlyReading}
            icon={<FaBookReader />}
            color="indigo"
          />
          <StatsCards
            title="Completed"
            value={completed}
            icon={<FaCheckCircle />}
            color="green"
          />
          <StatsCards
            title="Want to Read"
            value={wantToRead}
            icon={<FaBookmark />}
            color="yellow"
          />
        </div>

        {/* ── Reading section + sidebar ───────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {readingNow.length > 0 ? (
              <ReadingStatus books={readingNow} />
            ) : (
              <div className="bg-white p-6 rounded-xl shadow text-center text-gray-400">
                <FaBookReader className="text-5xl mb-3 mx-auto opacity-30" />
                <p className="font-medium">No books in progress</p>
                <p className="text-sm mt-1">
                  Add a book from{" "}
                  <a href="/explore" className="text-blue-500 hover:underline">
                    Explore
                  </a>{" "}
                  to see it here.
                </p>
              </div>
            )}
          </div>

          <KeepReading />
        </div>

        {/* ── Authors stat ───────────────────────────────────────────────── */}
        {uniqueAuthors > 0 && (
          <p className="text-sm text-gray-400 text-right">
            📚 Reading from{" "}
            <span className="font-semibold text-gray-600">{uniqueAuthors}</span> unique author
            {uniqueAuthors !== 1 ? "s" : ""}
          </p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;