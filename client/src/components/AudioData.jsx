import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

import default_audio from "../assets/audio/audio-1.mp3"

// Default queue data
const defaultQueueData = [
    {
        audioSrc: default_audio,
        title1: "Default Track",
        title2: "Artist",
        coverpic: "default-coverpic.jpg",
    },
    // Add more default tracks as needed
];

export const useQueueData = () => {
    const [queueData, setQueueData] = useState(defaultQueueData);
    const [isLoading, setIsLoading] = useState(true);
    
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
            if (data.queue.length > 0) {
                const formattedData = data.queue.map((track) => ({
                    audioSrc: track.audioSrc,
                    title1: track.title1,
                    title2: track.title2,
                    coverpic: track.coverpic,
                }));
                setQueueData(formattedData);
            }
        } catch (error) {
            console.error("Error fetching queue data:", error);
            toast.error(`Failed to fetch queue data: ${error.message}`);
        } finally {
            setIsLoading(false); // Set loading state to false once data is fetched
        }
    };

    // Fetch user ID and queue data
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.warning("Please log in to access queue data.");
            setIsLoading(false); // Set loading state to false when token is missing
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
                setIsLoading(false); // Set loading state to false on error
            }
        };

        fetchUserDataAndQueue();
    }, []);

    // Function to update the queue
    const updateQueue = (newQueueData) => {
        setQueueData(newQueueData);
    };

    return { queueData, isLoading, updateQueue };
};

export default useQueueData;
