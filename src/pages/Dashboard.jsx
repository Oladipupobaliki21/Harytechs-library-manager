// // import DashboardLayout from "../layout/DashboardLayout";
// import StatsCards from "../components/StatsCards";
// import ReadingStatus from "../components/ReadingStatus";
// import KeepReading from "../components/KeepReading";

// function Dashboard() {
//   return (
//      <>

//       <StatsCards />

//       <div className="grid grid-cols-3 gap-6">
//         <div className="col-span-2">
//           <ReadingStatus />
//         </div>

//         <KeepReading />
//       </div>

//     </>
//   );
// }

// export default Dashboard;


import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatsCards from "../components/StatsCards";
import KeepReading from "../components/KeepReading";
import ReadingStatus from "../components/ReadingStatus";


const books = [
    {
      title: "Atomic Habits",
      author: "James Clear",
      image: "https://covers.openlibrary.org/b/id/10561564-L.jpg",
    },
    {
      title: "Deep Work",
      author: "Cal Newport",
      image: "https://covers.openlibrary.org/b/id/8231991-L.jpg",
    },
    {
      title: "The Alchemist",
      author: "Paulo Coelho",
      image: "https://covers.openlibrary.org/b/id/8770983-L.jpg",
    },
  ];


function Dashboard() {
  return (
    <div className="flex bg-gray-100 min-h-screen">

      <Sidebar />

      <div className="flex-1 p-6 space-y-6">

        <Navbar />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCards title="Books Read" value="86" />
          <StatsCards title="Currently Reading" value="12" />
          <StatsCards title="Authors Read" value="32" />
          <StatsCards title="Pages Read" value="320 / 850" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* <div className="col-span-2 bg-white p-6 rounded-xl shadow">
            Reading Status Section
          </div> */}
           <div className="lg:col-span-2">
            <ReadingStatus books={books} />
          </div>

          <KeepReading />
        </div>

      </div>

    </div>
  );
}

export default Dashboard;