import React, { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import CommentsPopup from "./CommentsPopup";

import Menu from "./assets/Menu.svg";
import Like from "./assets/Heart.svg";
import DisLike from "./assets/Heart-Full.svg";
import Share from "./assets/Send.svg";
import Comments from "./assets/Message.svg";

function Posts({ initialPostsData = [] }) {
  const [postsData, setPostsData] = useState(initialPostsData);
  const [usersData, setUsersData] = useState({});
  const [likedPosts, setLikedPosts] = useState(new Set()); // Use a Set for liked posts
  const [publicUserID, setPublicUserID] = useState("");
  const [username, setUsername] = useState("");
  const [showCommentsPopup, setShowCommentsPopup] = useState(false); // State to manage the comments popup
  const [selectedPost, setSelectedPost] = useState(null); // State to store the selected post for comments
  const navigate = useNavigate();

  // Fetch user data and liked posts when the component mounts
  useEffect(() => {
    const fetchUserDataAndLikedPosts = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.warning("Please Login or Signup to turn off Privacy Mode.");
        return;
      }

      try {
        // Decode the token to get the userId
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId;

        // Fetch user data using userId
        const userResponse = await fetch(
          `http://localhost:3000/api/users/get/userid/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!userResponse.ok) {
          console.error("Failed to fetch user data:", userResponse.statusText);
          return;
        }

        const userData = await userResponse.json();
        setPublicUserID(userData.publicUserID);

        // Fetch liked posts of the user
        const likedPostsResponse = await fetch(
          `http://localhost:3000/api/users/get/userid/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!likedPostsResponse.ok) {
          console.error(
            "Failed to fetch liked posts data:",
            likedPostsResponse.statusText
          );
          return;
        }

        const likedPostsData = await likedPostsResponse.json();

        // Store the user's liked posts in a Set
        setLikedPosts(new Set(likedPostsData.likedPosts));
        setUsername(userData.username);

        // Fetch all users data
        const usersResponse = await fetch(
          "http://localhost:3000/api/users/get",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!usersResponse.ok) {
          console.error("Failed to fetch user data:", usersResponse.statusText);
          return;
        }

        const usersData = await usersResponse.json();

        // Create a map of users using their IDs as keys
        const usersMap = usersData.reduce((map, user) => {
          map[user._id] = user;
          return map;
        }, {});

        setUsersData(usersMap);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUserDataAndLikedPosts();
  }, []);

  const handleAvatarClick = () => {
    // Navigate to the user's profile page when the avatar is clicked
    navigate(`/user/profile/${username}`);
  };

  // Function to handle like/dislike toggle
  const handleLikeClick = async (postID, isLiked) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please Login or Signup to turn off Privacy Mode");
      return;
    }

    try {
      const endpoint = isLiked
        ? `http://localhost:3000/api/media/post/dislike/${postID}/${publicUserID}`
        : `http://localhost:3000/api/media/post/like/${postID}/${publicUserID}`;

      // Make the request to like or dislike the post
      const response = await fetch(endpoint, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to update like count.");
      }

      const updatedPost = await response.json();

      // Update the posts data and liked posts state
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

      // Update the liked posts state based on the like or dislike action
      setLikedPosts((prevLikedPosts) => {
        const updatedLikedPosts = new Set(prevLikedPosts);
        if (isLiked) {
          updatedLikedPosts.delete(postID);
        } else {
          updatedLikedPosts.add(postID);
        }
        return updatedLikedPosts;
      });
    } catch (error) {
      toast.error(`Error updating like count: ${error.message}`);
    }
  };

  const addToQueue = async (audioTrack) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/users/${publicUserID}/queue`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(audioTrack),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add audio track to queue");
      }

      toast.success("Added to queue!");
    } catch (error) {
      console.error("Error adding to queue:", error);
      toast.error("Failed to add to queue");
    }
  };

  const handleCommentsClick = (post) => {
    // Open the comments popup when the comments box is clicked
    setSelectedPost(post);
    setShowCommentsPopup(true);
  };

  return (
    <>
      {Array.isArray(postsData) && postsData.length > 0 ? (
        postsData.map((post, index) => {
          const postOwner = usersData[post.user];
          // Determine the current liked state for the post
          const podcast = post.podcast || {};
          const isLiked = likedPosts.has(post.postID);

          return (
            <div key={index} className="helper-post-content-area">
              <div className="helper-post-top-content-area">
                <div className="user-details-content-area">
                  <div
                    className="user-avatar-area"
                    style={{
                      backgroundImage:
                        postOwner && postOwner.avatar
                          ? `url(${postOwner.avatar})`
                          : "",
                    }}
                    onClick={handleAvatarClick}
                  ></div>
                  <div className="users-username-episode-title">
                    <p>
                      @
                      {postOwner && postOwner.name
                        ? postOwner.name
                        : "Unknown User"}
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
                        backgroundImage: `url(${post.podcast.coverpic})`,
                      }}
                    ></div>
                    <div className="podcast-title-artissts-details">
                      <p>{post.podcast.title}</p>
                      <p id="artists">{post.podcast.artists.join(", ")}</p>
                    </div>
                  </div>
                  <div className="play-button-of-that-audio-uploaded">
                    <button
                      onClick={() => {
                        const audioTrack = {
                          audioSrc: podcast.audiosrc,
                          title1: podcast.title,
                          title2: podcast.artists,
                          coverpic: podcast.coverpic,
                        };
                        addToQueue(audioTrack);
                      }}
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
                <div
                  className="no-of-likes-with-like-button"
                  onClick={() => handleLikeClick(post.postID, isLiked)}
                >
                  <img
                    src={isLiked ? DisLike : Like}
                    alt={isLiked ? "Dislike" : "Like"}
                  />
                  <p>{post.likes} Likes</p>
                </div>
                <div
                  className="no-of-comments-recived-with-comments-button"
                  onClick={() => handleCommentsClick(post)}
                >
                  <img src={Comments} alt="Comments" />
                  <p>
                    {" "}
                    {post.comments.length > 999
                      ? `${(post.comments.length / 1000).toFixed(1)}K`
                      : post.comments.length}{" "}
                    Comments
                  </p>
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
      {showCommentsPopup && (
        <div className="navbar-component-popup-area">
          <CommentsPopup
            post={selectedPost}
            onClose={() => setShowCommentsPopup(false)}
          />
        </div>
      )}
    </>
  );
}

export default Posts;
