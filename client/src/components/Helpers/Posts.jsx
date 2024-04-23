import React, { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";

import Menu from "./assets/Menu.svg";
import Like from "./assets/Heart.svg";
import DisLike from "./assets/Heart-Full.svg";
import Share from "./assets/Send.svg";
import Comments from "./assets/Message.svg";

function Posts({ initialPostsData = [] }) {
  // Declare the state variables
  const [postsData, setPostsData] = useState(initialPostsData); // State to store posts data
  const [usersData, setUsersData] = useState({}); // State to store user data
  const [likedPosts, setLikedPosts] = useState({}); // State to track liked posts

  useEffect(() => {
    const storedLikedPosts = localStorage.getItem("likedPosts");
    if (storedLikedPosts) {
      setLikedPosts(JSON.parse(storedLikedPosts));
    }
  }, []);

  // When saving `likedPosts` to local storage
  useEffect(() => {
    localStorage.setItem("likedPosts", JSON.stringify(likedPosts));
  }, [likedPosts]);

  // Fetch user data when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("https://s51-prasanth-capstone-podkast.onrender.com/api/users/get");
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        const usersMap = data.reduce((map, user) => {
          map[user.id] = user;
          return map;
        }, {});
        setUsersData(usersMap);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  // Function to handle like/dislike toggle
  const handleLikeClick = async (postID, isLiked) => {
    try {
      const updatedLikeCount = isLiked ? -1 : 1;

      // Make an API call to update the like count in the database
      const response = await fetch(
        `https://s51-prasanth-capstone-podkast.onrender.com/api/media/posts/${postID}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ likeCountChange: updatedLikeCount }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update like count");
      }

      const updatedPost = await response.json();

      // Update the local state to reflect the new like count
      setPostsData((prevPostsData) =>
        prevPostsData.map((post) => {
          if (post.postID === postID) {
            return {
              ...post,
              likes: updatedPost.likes,
            };
          }
          return post;
        })
      );

      // Update the liked state and save it to local storage
      setLikedPosts((prevLikedPosts) => {
        const newLikedPosts = {
          ...prevLikedPosts,
          [postID]: !isLiked,
        };
        // Save newLikedPosts to local storage
        localStorage.setItem("likedPosts", JSON.stringify(newLikedPosts));
        return newLikedPosts;
      });
    } catch (error) {
      console.error("Error updating like count:", error);
    }
  };

  return (
    <>
      {Array.isArray(postsData) && postsData.length > 0 ? (
        postsData.map((post, index) => {
          const user = usersData[post.userId];

          // Determine the current liked state for the post
          const isLiked = likedPosts[post.postID] || false;

          return (
            <div key={index} className="helper-post-content-area">
              <div className="helper-post-top-content-area">
                <div className="user-details-content-area">
                  <div
                    className="user-avatar-area"
                    style={{
                      backgroundImage:
                        user && user.avatar ? `url(${user.avatar})` : "",
                    }}
                  ></div>
                  <div className="users-username-episode-title">
                    <p>
                      @{user && user.username ? user.username : "Unknown User"}
                    </p>
                    <p id="tags">{post.postID}</p>
                  </div>
                </div>
                <div className="menu-bar-with-total-time-frame">
                  <p>
                    {formatDistanceToNow(new Date(post.createdAt), {
                      addSuffix: true,
                    })}
                  </p>
                  <img src={Menu} alt="Menu" />
                </div>
              </div>
              <div className="helper-post-main-player-details">
                <div className="podcast-main-details-with-play-button">
                  <div className="helper-post-podcsat-details-withhh">
                    <div
                      className="podcast-cover-pic"
                      style={{
                        backgroundImage: `url(${post.podcast.coverPic})`,
                      }}
                    ></div>
                    <div className="podcast-title-artissts-details">
                      <p>{post.podcast.title}</p>
                      <p id="artists">{post.podcast.artists.join(", ")}</p>
                    </div>
                  </div>
                  <div className="play-button-of-that-audio-uploaded">
                    <button
                      onClick={() =>
                        console.log(`Playing audio: ${post.audioSrc}`)
                      }
                    >
                      Listen Now
                    </button>
                  </div>
                </div>
                <div className="helper-post-main-player-post-text">
                  <p id="posttext">{post.content}</p>
                </div>
              </div>
              <div className="helper-post-bottom-content-area">
                <div className="no-of-likes-with-like-button">
                  <img
                    src={isLiked ? DisLike : Like}
                    alt={isLiked ? "Dislike" : "Like"}
                    onClick={() => handleLikeClick(post.postID, isLiked)}
                  />
                  <p>{post.likes} Likes</p>
                </div>
                <div className="no-of-comments-recived-with-comments-button">
                  <img src={Comments} alt="Comments" />
                  <p>{post.comments} Comments</p>
                </div>
                <div className="no-of-shares-with-share-now-button">
                  <img src={Share} alt="Share" />
                  <p>Share</p>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p>No posts available</p>
      )}
    </>
  );
}

export default Posts;
