import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function BookDetails() {

  const { id } = useParams();

  return (
    <div className="flex bg-gray-100 min-h-screen">

      <Sidebar />

      <div className="flex-1 p-6 space-y-6">

        <Navbar />

        <div className="bg-white p-6 rounded-xl shadow">

          <h1 className="text-2xl font-bold mb-4">
            Book Details
          </h1>

          <p className="text-gray-600">
            You selected book ID: {id}
          </p>

          <button className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-lg">
            Add to Library
          </button>

        </div>

      </div>

    </div>
  );
}

export default BookDetails;