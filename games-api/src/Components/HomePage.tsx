import { useState } from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const onSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    // Navigate with only the query
    navigate("/search", { state: { query } });
  };

  return (
    <div className="position-absolute top-50 start-50 translate-middle">
      <form
        className="form-inline"
        style={{ display: "flex" }}
        onSubmit={onSearch}
      >
        <input
          className="form-control mr-sm-2"
          type="search"
          placeholder="Search for Games..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
          Search
        </button>
      </form>
      <h1>Welcome to the Game Search App</h1>
    </div>
  );
}

export default HomePage;
