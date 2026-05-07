import { useEffect, useState } from "react";

import API from "../api/axios";

import Navbar from "../components/Navbar";

import StoryCard from "../components/StoryCard";

const BookmarksPage = () => {
  const [bookmarks, setBookmarks] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const fetchBookmarks = async () => {
    try {
      const response = await API.get(
        "/stories/bookmarks/all"
      );

      setBookmarks(response.data.bookmarks);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  return (
    <div className="app-shell">
      <Navbar />

      <main className="main-content">
        <div className="container">
          <section className="page-panel">
            <div className="section-title">
              <h1>Bookmarked Stories</h1>
            </div>

            {loading && (
              <div className="loading-panel">
                <div className="spinner" />
              </div>
            )}

            {!loading && bookmarks.length === 0 && (
              <div className="empty-state">
                <span className="empty-state-icon">★</span>
                <h3>No bookmarks yet.</h3>
                <p>
                  Save stories as you browse the feed to build your own reading
                  list.
                </p>
              </div>
            )}

            {!loading && bookmarks.length > 0 && (
              <div className="stories-list">
                {bookmarks.map((story) => (
                  <StoryCard
                    key={story._id}
                    story={story}
                    isBookmarked={true}
                    refreshBookmarks={fetchBookmarks}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default BookmarksPage;