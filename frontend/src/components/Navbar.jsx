import { useState } from "react";
import { Link } from "react-router-dom";

import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

const Navbar = ({ onScrape }) => {
  const { user, logout } = useAuth();
  const [isScraping, setIsScraping] = useState(false);

  const handleScrape = async () => {
    setIsScraping(true);

    try {
      const response = await API.post("/scrape");

      alert(
        response.data?.message ||
          `Scraped ${response.data?.total || 0} stories.`
      );

      if (typeof onScrape === "function") {
        onScrape();
      }
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Unable to trigger scrape."
      );
    } finally {
      setIsScraping(false);
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-inner">
        <Link className="brand-link" to="/">
          HN Stories
        </Link>

        <div className="nav-links">
          <button
            className="nav-item nav-cta nav-button"
            type="button"
            onClick={handleScrape}
            disabled={isScraping}
          >
            {isScraping ? "Scraping..." : "Scrape"}
          </button>

          <Link className="nav-item" to="/">
            Home
          </Link>

          {user && (
            <Link className="nav-item" to="/bookmarks">
              Bookmarks
            </Link>
          )}

          {!user ? (
            <>
              <Link className="nav-item nav-cta" to="/login">
                Login
              </Link>

              <Link className="nav-item nav-cta" to="/register">
                Register
              </Link>
            </>
          ) : (
            <>
              <span className="user-chip">
                Hello, {user.name}
              </span>

              <button
                className="logout-button"
                onClick={logout}
                type="button"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;