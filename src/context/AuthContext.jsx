import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

// Create the authentication context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Authentication provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Check if user is already logged in on initial load
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          // Validate token with the backend
          const response = await fetch(
            "https://react-frontend-application-using-rest.onrender.com/api/user",
            {
              headers: {
                "x-auth-token": token,
              },
            }
          );

          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
          } else {
            // If token is invalid, clear localStorage
            localStorage.removeItem("token");
          }
        }
      } catch (err) {
        console.error("Authentication error:", err);
        setError("Failed to authenticate");
      } finally {
        setLoading(false);
      }
    };

    checkLoggedIn();
  }, []);

  // Login function
  const login = async (username, password) => {
    try {
      setError(null);
      const response = await fetch(
        "https://react-frontend-application-using-rest.onrender.com/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Save token to localStorage
        localStorage.setItem("token", data.token);
        setUser(data.user);
        return { success: true };
      } else {
        setError(data.message);
        return { success: false, message: data.message };
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Failed to login");
      return { success: false, message: "Failed to login" };
    }
  };

  // Signup function
  const signup = async (username, password) => {
    try {
      setError(null);
      const response = await fetch(
        "https://react-frontend-application-using-rest.onrender.com/api/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        return { success: true };
      } else {
        setError(data.message);
        return { success: false, message: data.message };
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError("Failed to create account");
      return { success: false, message: "Failed to create account" };
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/authwall");
  };

  // Value to be provided by the context
  const value = {
    user,
    loading,
    error,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
