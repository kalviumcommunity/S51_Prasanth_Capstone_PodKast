import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Artists() {
  const [topUsers, setTopUsers] = useState([]); // State to store the top 4 users

  useEffect(() => {
    const fetchTopUsers = async () => {
      try {
        // Fetch user data from the specified endpoint
        const response = await fetch("http://localhost:3000/api/users/get");
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();

        // Sort users by the number of posts (length of the posts array) in descending order
        const sortedUsers = data.sort(
          (a, b) => b.posts.length - a.posts.length
        );

        // Extract the top 4 users
        const top4Users = sortedUsers.slice(0, 5);
        setTopUsers(top4Users);
      } catch (error) {
        console.error("Error fetching top users:", error);
      }
    };

    fetchTopUsers();
  }, []);
  return (
    <>
      <div className="helper-artists-content-area">
        {topUsers.map((user) => (
          <div key={user._id} className="helper-artists-main-content-area-to-display-artists">
            <div className="helper-user-etails-with-user-avatar">
              <div className="helper-srtists-user-avatar" style={{ backgroundImage: `url(${user.avatar})` }}></div>
              <div className="helper-artists-users-details">
                <p>@{user.username}</p>
                <p id="tags">{user.publicUserID}</p>
              </div>
            </div>
            <div className="helper-artists-view-progile-button">
            <Link to={`/user/profile/${user.username}`}>
              <button>View Profile</button>
            </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Artists;
