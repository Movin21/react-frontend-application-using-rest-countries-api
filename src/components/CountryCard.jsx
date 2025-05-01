import { Link } from "react-router-dom";
import React from "react";
import { motion } from "framer-motion";
import { useFavorites } from "../context/FavoritesContext";

const CountryCard = ({ country }) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const isCountryFavorite = isFavorite(country.cca3);

  const handleFavoriteClick = async (e) => {
    e.preventDefault(); // Prevent navigation to country details
    e.stopPropagation();

    if (isCountryFavorite) {
      await removeFavorite(country.cca3);
    } else {
      await addFavorite(country);
    }
  };
  return (
    <Link to={`/country/${country.cca3}`} className="block">
      <motion.div
        className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full border border-neutral-200"
        whileHover={{ y: -5, scale: 1.02 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="h-48 overflow-hidden relative flex items-center justify-center bg-neutral-100">
          <motion.img
            src={country.flags.svg || country.flags.png}
            alt={`Flag of ${country.name.common}`}
            className="w-full h-full object-contain p-2"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <div className="p-5 relative">
          <div className="flex justify-between items-start">
            <h2 className="font-bold text-xl mb-3 truncate text-primary-800 flex-1">
              {country.name.common}
            </h2>
            <button
              onClick={handleFavoriteClick}
              className={`ml-2 p-1.5 rounded-full transition-colors ${
                isCountryFavorite
                  ? "text-red-500 hover:text-red-600"
                  : "text-gray-400 hover:text-gray-500"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill={isCountryFavorite ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth={isCountryFavorite ? "0" : "1.5"}
              >
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div className="text-sm space-y-2 text-neutral-600">
            <p className="flex items-center">
              <span className="font-semibold text-neutral-800 mr-2">
                Population:
              </span>
              {country.population.toLocaleString()}
            </p>
            <p className="flex items-center">
              <span className="font-semibold text-neutral-800 mr-2">
                Region:
              </span>
              {country.region}
            </p>
            <p className="flex items-center">
              <span className="font-semibold text-neutral-800 mr-2">
                Capital:
              </span>
              {country.capital?.[0] || "N/A"}
            </p>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default CountryCard;
