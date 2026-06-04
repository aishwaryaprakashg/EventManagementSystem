import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light p-3">
      <div className="container">

        <Link className="navbar-brand" to="/">
          Event Manager
        </Link>

        <div>

          <Link
            className="btn btn-outline-primary me-2"
            to="/"
          >
            Home
          </Link>

          <Link
            className="btn btn-outline-primary me-2"
            to="/my-registrations"
          >
            My Registrations
          </Link>

          <Link
            className="btn btn-outline-primary me-2"
            to="/my-events"
          >
            My Events
          </Link>

          <Link
            className="btn btn-success me-2"
            to="/create-event"
          >
            Create Event
          </Link>

          <Link
            className="btn btn-warning me-2"
            to="/login"
          >
            Login
          </Link>

          <button
            className="btn btn-danger"
            onClick={logout}
          >
            Logout
          </button>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;