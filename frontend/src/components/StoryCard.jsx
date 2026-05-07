import { useEffect, useState } from "react";
import API from "../api/axios";

import { useAuth } from "../context/AuthContext";

const StoryCard = ({
  story,
  refreshBookmarks,
  isBookmarked,
}) => {
  const { user } = useAuth();
  const [bookmarked, setBookmarked] = useState(isBookmarked);

  useEffect(() => {
    setBookmarked(isBookmarked);
  }, [isBookmarked]);

  const handleBookmark = async () => {
    if (!user) {
      alert("Please login first");

      return;
    }

    try {
      await API.post(`/stories/${story._id}/bookmark`);

      setBookmarked((current) => !current);
      alert(
        bookmarked ? "Bookmark removed" : "Story bookmarked"
      );

      if (refreshBookmarks) {
        refreshBookmarks();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <article className="story-card">
      <h3>{story.title}</h3>

      <div className="story-meta">
        <span>
          <strong>Points:</strong> {story.points}
        </span>
        <span>
          <strong>Author:</strong> {story.author}
        </span>
        <span>
          <strong>Posted:</strong> {story.postedAt}
        </span>
      </div>

      <div className="story-actions">
        <a
          className="story-link"
          href={story.url}
          target="_blank"
          rel="noreferrer"
        >
          Visit story
        </a>

        {user && (
          <button
            className="story-button"
            onClick={handleBookmark}
            type="button"
          >
            {bookmarked ? "Remove bookmark" : "Add bookmark"}
          </button>
        )}
      </div>
    </article>
  );
};

export default StoryCard;