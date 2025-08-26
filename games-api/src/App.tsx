import { Routes, Route, Navigate} from "react-router-dom";
import Home from "./Components/Home";
import SearchResult from "./Components/SearchResult";

function App() {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/search" element={<SearchResult />} />
    </Routes>
  );
}

export default App;
