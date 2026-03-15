import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Explore from "./pages/Explore";
import BookDetails from "./pages/BookDetails";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Dashboard />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/book/:id" element={<BookDetails />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;