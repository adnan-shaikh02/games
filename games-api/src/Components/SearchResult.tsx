import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ApiCalls from "../ApiCalls/api.js";
import Navbar from "./Navbar.js";

function SearchResult() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { query, results = [], totalResults = 0, ErrorStatus = "" } = state || {};

  const [games, setGames] = useState(results);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    if (!query) return;

    const fetchGames = async () => {
      const offset = (page - 1) * itemsPerPage;
      const data = await ApiCalls.searchGames(query, offset, itemsPerPage);
      setGames(data.results);
    };

    fetchGames();
  }, [page, query]);

  const totalPages = Math.ceil(totalResults / itemsPerPage);

  if (ErrorStatus === 402) {
    return (
      <div className="empty">
        <Navbar />
        <div className="container mt-4">
          <h2>API request limit reached. Please try again later.</h2>
          <button className="btn btn-primary" onClick={() => navigate("/home")}>
            Go Back Home
          </button>
        </div>
      </div>
    );
  }
  
  if (!games || games.length === 0) {
    return (
      <div className="empty">
        <Navbar />
        <div className="container mt-4">
          <h2>No results found for "{query}"</h2>
          <button className="btn btn-primary" onClick={() => navigate("/home")}>
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h2>Search Results for "{query}"</h2>
        <div className="row">
          {games.map((game) => (
            <div className="col-md-4 mb-4" key={game.id}>
              <div className="card h-100" style={{ width: "18rem" }}>
                <img
                  src={game.image}
                  className="card-img-top"
                  alt={game.name}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{game.name}</h5>
                  <p className="card-text">
                    <strong>Year:</strong> {game.year} <br />
                    <strong>Genre:</strong> {game.genre}
                  </p>
                  <p className="card-text">{game.short_description}</p>
                  <a
                    href={game.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary mt-auto"
                  >
                    View Game
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="d-flex justify-content-center mt-4">
          <button
            className="btn btn-outline-secondary me-2"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </button>
          <span className="align-self-center">
            Page {page} of {totalPages}
          </span>
          <button
            className="btn btn-outline-secondary ms-2"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default SearchResult;
