import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav
      style={{
        padding: "15px",
        borderBottom: "1px solid #ccc",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div>
        <Link to="/">
          <strong>HN Stories</strong>
        </Link>
      </div>

      <div
        style={{
          display: "flex",
          gap: "15px",
        }}
      >
        <Link to="/">Home</Link>

        {user && (
          <Link to="/bookmarks">
            Bookmarks
          </Link>
        )}

        {!user ? (
          <>
            <Link to="/login">
              Login
            </Link>

            <Link to="/register">
              Register
            </Link>
          </>
        ) : (
          <>
            <span>
              Hello, {user.name}
            </span>

            <button onClick={logout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;