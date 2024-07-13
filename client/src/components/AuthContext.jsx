import React, { createContext, useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Function to check if the token is expired
    const isTokenExpired = (token) => {
        try {
            const decoded = jwtDecode(token);
            const now = Date.now() / 1000;
            return decoded.exp < now;
        } catch (error) {
            console.error("Error decoding token:", error);
            return true; // If there's an error decoding, consider it expired
        }
    };

    // Retrieve authentication status from local storage on initialization
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            if (isTokenExpired(token)) {
                localStorage.removeItem("token");
                setIsLoggedIn(false);
            } else {
                setIsLoggedIn(true);
            }
        }
    }, []);

    const value = {
        isLoggedIn,
        setIsLoggedIn,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
