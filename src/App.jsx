import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
// import Explore from "./pages/Explore";

function App() {
  return (
    <BrowserRouter>

      <div className="flex">

        <Sidebar />
       

        <div className="flex-1 p-6">
         <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            
            {/* <Route path="/explore" element={<Explore />} /> */}
          </Routes>

        </div>

      </div>

    </BrowserRouter>
  );
}

export default App;