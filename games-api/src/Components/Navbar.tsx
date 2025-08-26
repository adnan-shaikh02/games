import { useNavigate, Link } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  return (
    <>
      <nav className="navbar bg-body-tertiary">
        <div className="container">
          <a
            className="navbar-brand"
            onClick={() => navigate("/home")}
            style={{ cursor: "default" }}
          >
            <img
              src=".\src\assets\react.svg"
              alt="Bootstrap"
              width="30"
              height="24"
            />
            Search For Games
          </a>
        </div>

        <div className="d-flex">
          <p style={{ cursor: "pointer" , marginTop:"10px", marginRight:"50px", paddingRight:"10px"}}>
            <Link to="/home" style={{ textDecoration: "none", color: "black" }}>Home</Link>
          </p>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
