import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Explore from "./pages/Explore";
import BookDetails from "./pages/BookDetails";
import MyLibrary from "./pages/MyLibrary";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Dashboard />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/book/:id" element={<BookDetails />} />
        <Route path="/library" element={<MyLibrary />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;