import { createContext, useState, useEffect, useContext } from "react";
import { useAuth } from "./AuthContext";

// Create the favorites context
const FavoritesContext = createContext();

// Custom hook to use the favorites context
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};

// Favorites provider component
export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, isAuthenticated } = useAuth();

  // Fetch user's favorites when authenticated
  useEffect(() => {
    const fetchFavorites = async () => {
      if (!isAuthenticated) {
        setFavorites([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5000/api/favorites", {
          headers: {
            "x-auth-token": token,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setFavorites(data);
        } else {
          const errorData = await response.json();
          setError(errorData.message || "Failed to fetch favorites");
        }
      } catch (err) {
        console.error("Error fetching favorites:", err);
        setError("Failed to fetch favorites");
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [isAuthenticated, user]);

  // Add a country to favorites
  const addFavorite = async (country) => {
    if (!isAuthenticated)
      return { success: false, message: "You must be logged in" };

    try {
      setError(null);
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify({
          countryCode: country.cca3,
          countryName: country.name.common,
          flagUrl: country.flags.svg || country.flags.png,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setFavorites([...favorites, data]);
        return { success: true };
      } else {
        setError(data.message);
        return { success: false, message: data.message };
      }
    } catch (err) {
      console.error("Error adding favorite:", err);
      setError("Failed to add favorite");
      return { success: false, message: "Failed to add favorite" };
    }
  };

  // Remove a country from favorites
  const removeFavorite = async (countryCode) => {
    if (!isAuthenticated)
      return { success: false, message: "You must be logged in" };

    try {
      setError(null);
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/favorites/${countryCode}`,
        {
          method: "DELETE",
          headers: {
            "x-auth-token": token,
          },
        }
      );

      if (response.ok) {
        setFavorites(
          favorites.filter((fav) => fav.countryCode !== countryCode)
        );
        return { success: true };
      } else {
        const data = await response.json();
        setError(data.message);
        return { success: false, message: data.message };
      }
    } catch (err) {
      console.error("Error removing favorite:", err);
      setError("Failed to remove favorite");
      return { success: false, message: "Failed to remove favorite" };
    }
  };

  // Check if a country is in favorites
  const isFavorite = (countryCode) => {
    return favorites.some((fav) => fav.countryCode === countryCode);
  };

  // Value to be provided by the context
  const value = {
    favorites,
    loading,
    error,
    addFavorite,
    removeFavorite,
    isFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
