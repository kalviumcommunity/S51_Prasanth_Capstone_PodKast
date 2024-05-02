import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Import useParams to access URL parameters

function UserProfile() {
  const { username } = useParams(); // Get the username from the URL
  const [user, setUser] = useState(null); // State to store the user data

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Fetch the user's data based on their username
        const response = await fetch(`http://localhost:3000/api/users/get/username/${username}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUser(data); // Set the user data in state
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, [username]); // Run the effect whenever the username changes

  return (
    <div className="user-profile">
      {user ? (
        <>
          <h1>{user.username}'s Profile</h1>
          <p>Email: {user.email}</p>
          <p>Posts count: {user.posts.length}</p>
          <img src={user.avatar} alt={`${user.username}'s avatar`} />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default UserProfile;
