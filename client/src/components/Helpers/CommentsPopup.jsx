import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

import Close from "./assets/Close.svg";
import Delete from "./assets/Delete.svg";
import Like from "./assets/Heart.svg";
import DisLike from "./assets/Heart-Full.svg";
import Edit from "./assets/Edit.svg";
import Send from "./assets/Send.svg";

function CommentsPopup({ post, onClose }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [publicUserID, setPublicUserID] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [editingComment, setEditingComment] = useState(null);
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      fetchUserData(userId);
    }
    fetchComments();
  }, []);

  const fetchUserData = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/users/get/userid/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.ok) {
        const userData = await response.json();
        setPublicUserID(userData.publicUserID);
      } else {
        throw new Error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Failed to fetch user data");
    }
  };

  const fetchComments = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/media/post/${post.postID}/comments`
      );
      if (response.ok) {
        const data = await response.json();
        const commentsWithUserData = await Promise.all(
          data.comments.map(async (comment) => {
            try {
              const userResponse = await fetch(
                `http://localhost:3000/api/users/get/userid/${comment.user}`,
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                }
              );
              if (userResponse.ok) {
                const userData = await userResponse.json();
                return { ...comment, userData };
              } else {
                console.error(
                  `Failed to fetch user data for comment ${comment.commentID}:`,
                  userResponse.statusText
                );
                return comment;
              }
            } catch (error) {
              console.error(
                `Error fetching user data for comment ${comment.commentID}:`,
                error
              );
              return comment;
            }
          })
        );
        setComments(commentsWithUserData);
      } else {
        console.error("Failed to fetch comments:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleAddComment = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/media/post/${post.postID}/comment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            content: newComment,
            publicUserID: publicUserID,
          }),
        }
      );
      if (response.ok) {
        setNewComment("");
        fetchComments();
      } else {
        console.error("Failed to add comment:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleDeleteComment = async (commentID) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/media/post/comment/${commentID}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.ok) {
        fetchComments();
      } else {
        toast.error("Failed to delete comment:", response.statusText);
      }
    } catch (error) {
      toast.error("Error deleting comment:", error);
    }
  };

  const handleLikeComment = async (commentID, isLiked) => {
    try {
      const endpoint = isLiked
        ? `http://localhost:3000/api/media/post/comment/dislike/${commentID}/${publicUserID}`
        : `http://localhost:3000/api/media/post/comment/like/${commentID}/${publicUserID}`;

      const response = await fetch(endpoint, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.ok) {
        fetchComments();
        setIsLiked(!isLiked);
      } else {
        toast.error("Failed to like/dislike comment:", response.statusText);
      }
    } catch (error) {
      toast.error("Error liking/disliking comment:", error);
    }
  };

  useEffect(() => {
    setIsLiked(
      comments.some((comment) => comment.likedBy.includes(publicUserID))
    );
  }, [comments, publicUserID]);

  const handleEditComment = (comment) => {
    setEditingComment(comment.commentID);
    setEditContent(comment.content);
  };

  const handleSaveEdit = async (commentID) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/media/post/comment/edit/${commentID}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            content: editContent,
            publicUserID: publicUserID,
          }),
        }
      );
      if (response.ok) {
        setEditingComment(null);
        setEditContent("");
        fetchComments();
      } else {
        console.error("Failed to edit comment:", response.statusText);
      }
    } catch (error) {
      console.error("Error editing comment:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditingComment(null);
    setEditContent("");
  };

  return (
    <>
      <div className="comments-left-right-area">
        <div className="comments-top-area">
          <h1>Comments</h1>
          <div className="gap-provider"></div>
          <img src={Close} alt="close-icon" onClick={onClose} />
        </div>
        <div className="add-your-comments-area">
          <div className="comment-input-area">
            <label htmlFor="comment">Add your Comment</label>
            <input
              type="text"
              placeholder="Add your Comments"
              name="comment"
              id="comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
          </div>
          <img src={Send} alt="send-icon" onClick={handleAddComment} />
        </div>
        <div className="comments-content-area">
          {comments.map((comment) => (
            <div className="comments-content" key={comment.commentID}>
              <div className="top-area-comments-content">
                <div className="user-details-comments">
                  <div
                    className="user-avatar"
                    style={{
                      backgroundImage:
                        comment.userData && comment.userData.avatar
                          ? `url(${comment.userData.avatar})`
                          : "",
                    }}
                  ></div>
                  <div className="user-name-public-user-id">
                    <p>@{comment.userData.username}</p>
                    <p id="public-user-id">{comment.userData.publicUserID}</p>
                  </div>
                </div>
                <div className="gap-provider-two"></div>
                {comment.userData.publicUserID === publicUserID && (
                  <div className="delete-icon">
                    <img
                      src={Delete}
                      alt="delete-icon"
                      onClick={() => handleDeleteComment(comment._id)}
                    />
                  </div>
                )}
              </div>
              <div className="center-area-comments-content">
                {editingComment === comment.commentID ? (
                  <div className="comments-edit-option-area">
                    <input
                      type="text"
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                    />
                    <button onClick={() => handleSaveEdit(comment.commentID)}>
                      Save
                    </button>
                    <button className="comment-cancel" onClick={handleCancelEdit}>Cancel</button>
                  </div>
                ) : (
                  <p>{comment.content}</p>
                )}
              </div>
              <div className="bottom-area-comments-content">
                <div className="like-comment">
                  <img
                    src={isLiked ? DisLike : Like}
                    alt=""
                    onClick={() => {
                      handleLikeComment(comment.commentID, isLiked);
                    }}
                  />
                  <p>{comment.likes} Like</p>
                </div>
                {comment.userData.publicUserID === publicUserID && (
                  <div className="edit-comment" onClick={() => handleEditComment(comment)}>
                    <img
                      src={Edit}
                      alt=""/>
                    <p>Edit</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default CommentsPopup;
