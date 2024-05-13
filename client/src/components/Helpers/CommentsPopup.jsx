import React from "react";

import Close from "./assets/Close.svg";
import Delete from "./assets/Delete.svg";
import Like from "./assets/Heart.svg";
import DisLike from "./assets/Heart-Full.svg";
import Edit from "./assets/Edit.svg";
import Send from "./assets/Send.svg";

function CommentsPopup({ post, onClose }) {
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
            <input type="text" placeholder="Add your Comments" name="comment" id="comment" />
          </div>
          <img src={Send} alt="send-icon" />
        </div>
        <div className="comments-content-area">
          <div className="comments-content">
            <div className="top-area-comments-content">
              <div className="user-details-comments">
                <div className="user-avatar"></div>
                <div className="user-name-public-user-id">
                  <p>@Username</p>
                  <p id="public-user-id">Public User ID</p>
                </div>
              </div>
              <div className="gap-provider-two"></div>
              <div className="delete-icon">
                <img src={Delete} alt="" />
              </div>
            </div>
            <div className="center-area-comments-content">
              <p>Full Comments</p>
            </div>
            <div className="bottom-area-comments-content">
              <div className="like-comment">
                <img src={Like} alt="" />
                <p>Like</p>
              </div>
              <div className="edit-comment">
                <img src={Edit} alt="" />
                <p>Edit</p>
              </div>
            </div>
          </div>
        </div>
        <p>Liked By</p>
        <div className="comments-liked-by">
          <div className="liked-by-content-area">
            <div className="user-details-liked-by">
              <div className="user-avatar"></div>
              <div className="user-name-public-user-id-liked-by">
                <p>@Username</p>
                <p id="public-user-id">Public User ID</p>
              </div>
            </div>
            <div className="gap-provider-three"></div>
            <p id="liked-by">Liked</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default CommentsPopup;
