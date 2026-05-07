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
    <div>
      <Navbar />

      <div
        style={{
          maxWidth: "800px",
          margin: "20px auto",
        }}
      >
        <h1>Bookmarked Stories</h1>

        {loading && <p>Loading...</p>}

        {!loading &&
          bookmarks.length === 0 && (
            <p>No bookmarks yet</p>
          )}

        {bookmarks.map((story) => (
          <StoryCard
            key={story._id}
            story={story}
            refreshBookmarks={
              fetchBookmarks
            }
          />
        ))}
      </div>
    </div>
  );
};

export default BookmarksPage;