import { useFavorites } from "../context/FavoritesContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import LoadingSkeleton from "../components/LoadingSkeleton";

const Favorites = () => {
  const { favorites, loading, error, removeFavorite } = useFavorites();

  const handleRemoveFavorite = async (countryCode) => {
    await removeFavorite(countryCode);
  };

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="bg-red-50 p-4 rounded-lg border border-red-200 inline-block">
          <p className="text-red-600">Error: {error}</p>
        </div>
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <motion.div
        className="text-center py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-white p-8 rounded-xl shadow-md inline-block max-w-md mx-auto border border-neutral-200"
        >
          <svg
            className="w-16 h-16 text-neutral-400 mx-auto mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          <h2 className="text-xl font-bold text-neutral-700 mb-2">
            No Favorites Yet
          </h2>
          <p className="text-neutral-600 mb-4">
            You haven't added any countries to your favorites list.
          </p>
          <Link
            to="/"
            className="inline-block px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
          >
            Explore Countries
          </Link>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-primary-800">
        Your Favorite Countries
      </h1>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {favorites.map((favorite, index) => (
          <motion.div
            key={favorite.countryCode}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full border border-neutral-200">
              <Link to={`/country/${favorite.countryCode}`}>
                <div className="h-48 overflow-hidden relative flex items-center justify-center bg-neutral-100">
                  <motion.img
                    src={favorite.flagUrl}
                    alt={`Flag of ${favorite.countryName}`}
                    className="w-full h-full object-contain p-2"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <div className="p-5">
                  <h2 className="font-bold text-xl mb-3 truncate text-primary-800">
                    {favorite.countryName}
                  </h2>
                </div>
              </Link>
              <div className="px-5 pb-4">
                <button
                  onClick={() => handleRemoveFavorite(favorite.countryCode)}
                  className="w-full py-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Remove
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Favorites;
