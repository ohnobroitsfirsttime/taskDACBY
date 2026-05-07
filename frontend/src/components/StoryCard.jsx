import API from "../api/axios";

import { useAuth } from "../context/AuthContext";

const StoryCard = ({
  story,
  refreshBookmarks,
}) => {
  const { user } = useAuth();

  const handleBookmark = async () => {
    if (!user) {
      alert("Please login first");

      return;
    }

    try {
      await API.post(
        `/stories/${story._id}/bookmark`
      );

      alert("Bookmark updated");

      if (refreshBookmarks) {
        refreshBookmarks();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "15px",
        marginBottom: "15px",
        borderRadius: "10px",
      }}
    >
      <h3>{story.title}</h3>

      <p>
        <strong>Points:</strong>{" "}
        {story.points}
      </p>

      <p>
        <strong>Author:</strong>{" "}
        {story.author}
      </p>

      <p>
        <strong>Posted:</strong>{" "}
        {story.postedAt}
      </p>

      <a
        href={story.url}
        target="_blank"
      >
        Visit Story
      </a>

      <br />
      <br />

      {user && (
        <button onClick={handleBookmark}>
          Toggle Bookmark
        </button>
      )}
    </div>
  );
};

export default StoryCard;