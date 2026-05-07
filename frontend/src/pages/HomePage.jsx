import { useEffect, useState } from "react";

import API from "../api/axios";

import Navbar from "../components/Navbar";

import StoryCard from "../components/StoryCard";
import { useAuth } from "../context/AuthContext";

const HomePage = () => {
  const { user } = useAuth();
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [bookmarkIds, setBookmarkIds] = useState(new Set());
  const limit = 5;

  const fetchBookmarks = async () => {
    if (!user) {
      setBookmarkIds(new Set());
      return;
    }

    try {
      const response = await API.get("/stories/bookmarks/all");
      const ids = new Set(
        response.data.bookmarks.map((story) => story._id)
      );
      setBookmarkIds(ids);
    } catch (error) {
      console.log("Failed to load bookmark ids", error);
      setBookmarkIds(new Set());
    }
  };

  const fetchStories = async (page = 1) => {
    try {
      setLoading(true);
      setError("");

      const response = await API.get("/stories", {
        params: {
          page,
          limit,
        },
      });

      setStories(response.data.stories);
      setCurrentPage(response.data.currentPage);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      setError("Failed to fetch stories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStories(1);
  }, []);

  useEffect(() => {
    fetchBookmarks();
  }, [user]);

  const getPageNumbers = () => {
    const pages = [];
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, currentPage + 2);

    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push("start-ellipsis");
    }

    for (let page = start; page <= end; page += 1) {
      pages.push(page);
    }

    if (end < totalPages) {
      if (end < totalPages - 1) pages.push("end-ellipsis");
      pages.push(totalPages);
    }

    return pages;
  };

  const handlePageChange = (page) => {
    if (page === currentPage || page < 1 || page > totalPages) {
      return;
    }

    fetchStories(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="app-shell">
      <Navbar onScrape={() => fetchStories(currentPage)} />

      <main className="main-content">
        <div className="container">
          <section className="page-hero">
            <span className="eyebrow">Hacker News</span>
            <h1 className="page-title">
              Top stories from the community, curated for action.
            </h1>
            <p className="page-description">
              Discover the latest Hacker News links with a clean reading experience,
              smart bookmarking, and fast navigation across the stories you care about.
            </p>

            <div className="hero-visual">
              <div className="hero-card hero-card-primary">
                <span>Fresh stories</span>
                <strong>42 new links</strong>
              </div>
              <div className="hero-card hero-card-secondary">
                <span>Bookmark list</span>
                <strong>Save & revisit later</strong>
              </div>
              <div className="hero-card hero-card-tertiary">
                <span>Analytics</span>
                <strong>Fast, clear reading</strong>
              </div>
            </div>
          </section>

          <section className="page-panel">
            <div className="section-title">
              <h1>Latest stories</h1>
            </div>

            {loading && (
              <div className="loading-panel">
                <div className="spinner" />
              </div>
            )}

            {error && <div className="error-message">{error}</div>}

            {!loading && (
              <>
                <div className="stories-list">
                  {stories.map((story) => (
                    <StoryCard
                      key={story._id}
                      story={story}
                      isBookmarked={bookmarkIds.has(story._id)}
                      refreshBookmarks={fetchBookmarks}
                    />
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="pagination">
                    <button
                      className="pagination-button"
                      type="button"
                      disabled={currentPage === 1}
                      onClick={() => handlePageChange(currentPage - 1)}
                    >
                      Previous
                    </button>

                    {getPageNumbers().map((page, index) => {
                      if (page === "start-ellipsis" || page === "end-ellipsis") {
                        return (
                          <span
                            key={`${page}-${index}`}
                            className="pagination-ellipsis"
                          >
                            …
                          </span>
                        );
                      }

                      return (
                        <button
                          key={page}
                          type="button"
                          className={`pagination-button ${
                            page === currentPage ? "active" : ""
                          }`}
                          onClick={() => handlePageChange(page)}
                        >
                          {page}
                        </button>
                      );
                    })}

                    <button
                      className="pagination-button"
                      type="button"
                      disabled={currentPage === totalPages}
                      onClick={() => handlePageChange(currentPage + 1)}
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default HomePage;