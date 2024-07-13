import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import Like from "./assets/Heart.svg";
import DisLike from "./assets/Heart-Full.svg";
import Group from "./assets/group.svg"

function Stories() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/api/stories", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStories(response.data);
      } catch (error) {
        console.error("Error fetching stories:", error);
        toast.error("Failed to fetch stories.");
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  const handleLikeClick = async (storyId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:3000/api/stories/${storyId}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update the story's like status in the state
      setStories((prevStories) =>
        prevStories.map((story) =>
          story._id === storyId ? { ...story, isLiked: !story.isLiked } : story
        )
      );

      toast.success(response.data.message);
    } catch (error) {
      console.error("Error liking story:", error);
      toast.error("Failed to like story.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (stories.length === 0) {
    return(
      <>
      <div className="helpers-stories-area-if-there-is-no-launch">
        <img src={Group} alt="" />
        <div className="helpers-stories-area-if-there-is-no-launch-heading">
          <h1>Launch</h1>
          <p>Launch is a feature where you can see the people&apos;s new post or podcast updates here.</p>
          <button>Add Your&apos;s Now</button>
        </div>
      </div>
      </>
    );
  }

  return (
    <div className="stories-area">
      {stories.map((story) => (
        <div key={story._id} className="helpers-stories-content-area">
          <div className="stories-bottom-like-username-area">
            <div className="users-name-avatar-area-and-time-frame">
              <div className="user-details-area">
                <div
                  className="user-avatar-img"
                  style={{ backgroundImage: `url(${story.userAvatar})` }}
                ></div>
                <div className="username-and-time-frame-area">
                  <p>@{story.username}</p>
                  <p id="hours-gone">{story.hoursGone}Hrs</p>
                </div>
              </div>
              <div className="like-and-dislike-area">
                <img
                  src={story.isLiked ? DisLike : Like}
                  alt={story.isLiked ? "Dislike" : "Like"}
                  onClick={() => handleLikeClick(story._id)}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Stories;