import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

export const useQueueData = () => {
    const [queueData, setQueueData] = useState([]);
    const [isFetching, setIsFetching] = useState(true); // To track loading state

    // Fetch queue data function
    const fetchQueueData = async (publicUserID, token) => {
        try {
            const response = await fetch(`http://localhost:3000/api/users/${publicUserID}/queue`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch queue data. Status: ${response.status}`);
            }

            const data = await response.json();
            // Format data to match AudioPlayer requirements
            const formattedData = data.queue.map((track) => ({
                audioSrc: track.audioSrc,
                title: track.title1, 
                artists: track.title2,
                cover: track.coverpic,
            }));

            setQueueData(formattedData);
        } catch (error) {
            console.error("Error fetching queue data:", error);
            toast.error(`Failed to fetch queue data: ${error.message}`);
        } finally {
            setIsFetching(false);
        }
    };

    // Fetch user ID and queue data
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.warning("Please log in to access queue data.");
            setIsFetching(false);
            return;
        }

        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId;

        const fetchUserDataAndQueue = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/users/get/userid/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch user data. Status: ${response.status}`);
                }

                const userData = await response.json();
                const publicUserID = userData.publicUserID;
                
                // Fetch queue data after obtaining publicUserID
                await fetchQueueData(publicUserID, token);
            } catch (error) {
                console.error("Error fetching user data:", error);
                toast.error(`Failed to fetch user data: ${error.message}`);
                setIsFetching(false);
            }
        };

        fetchUserDataAndQueue();
    }, []);

    return { queueData, isFetching };
};

export default useQueueData;