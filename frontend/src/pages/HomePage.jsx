import { useEffect, useState } from "react";

import API from "../api/axios";

import Navbar from "../components/Navbar";

import StoryCard from "../components/StoryCard";

const HomePage = () => {
  const [stories, setStories] = useState([]);

  const fetchStories = async () => {
    try {
      const response = await API.get(
        "/stories"
      );

      setStories(response.data.stories);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStories();
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
        <h1>
          Hacker News Top Stories
        </h1>

        {stories.map((story) => (
          <StoryCard
            key={story._id}
            story={story}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;