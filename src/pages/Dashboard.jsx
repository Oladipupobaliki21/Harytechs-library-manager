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


// import Sidebar from "../components/Sidebar";
// import Navbar from "../components/Navbar";
import StatsCards from "../components/StatsCards";
import KeepReading from "../components/KeepReading";

function Dashboard() {
  return (
    <div className="flex bg-gray-100 min-h-screen">

      {/* <Sidebar /> */}

      <div className="flex-1 p-6 space-y-6">

        {/* <Navbar /> */}

        <div className="grid grid-cols-4 gap-6">
          <StatsCards title="Books Read" value="86" />
          <StatsCards title="Currently Reading" value="12" />
          <StatsCards title="Authors Read" value="32" />
          <StatsCards title="Pages Read" value="320 / 850" />
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 bg-white p-6 rounded-xl shadow">
            Reading Status Section
          </div>

          <KeepReading />
        </div>

      </div>

    </div>
  );
}

export default Dashboard;