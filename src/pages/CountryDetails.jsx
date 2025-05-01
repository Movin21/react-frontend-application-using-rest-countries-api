import { useParams, Link } from "react-router-dom";
import { fetchCountryByCode } from "../services/suspenseApi";
import { motion } from "framer-motion";
import { useFavorites } from "../context/FavoritesContext";

const CountryDetails = () => {
  const { countryCode } = useParams();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const isCountryFavorite = isFavorite(countryCode);

  // Use the suspense-enabled API
  const countryData = fetchCountryByCode(countryCode).read();
  const country = countryData[0];

  if (!country) return null;

  // Extract languages as an array of language names
  const languages = country.languages ? Object.values(country.languages) : [];

  return (
    <motion.div
      className="max-w-5xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <Link
          to="/"
          className="inline-flex items-center px-4 py-3 mb-8 bg-white shadow-md rounded-md hover:bg-primary-50 border border-neutral-200 transition-all duration-300 text-primary-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <motion.div
          className="aspect-video rounded-lg overflow-hidden shadow-lg border border-neutral-200"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <motion.img
            src={country.flags.svg}
            alt={`Flag of ${country.name.common}`}
            className="w-full h-full object-contain bg-neutral-50 p-2"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.7 }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.div
            className="flex justify-between items-center mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h1 className="text-3xl font-bold text-primary-800">
              {country.name.common}
            </h1>
            <button
              onClick={() =>
                isCountryFavorite
                  ? removeFavorite(countryCode)
                  : addFavorite(country)
              }
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                isCountryFavorite
                  ? "bg-red-50 text-red-600 hover:bg-red-100"
                  : "bg-primary-50 text-primary-600 hover:bg-primary-100"
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
              {isCountryFavorite ? "Remove from Favorites" : "Add to Favorites"}
            </button>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 bg-white p-6 rounded-lg shadow-md border border-neutral-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div>
              <p className="mb-2">
                <span className="font-semibold">Official Name:</span>{" "}
                {country.name.official}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Population:</span>{" "}
                {country.population.toLocaleString()}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Region:</span> {country.region}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Sub Region:</span>{" "}
                {country.subregion || "N/A"}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Capital:</span>{" "}
                {country.capital?.[0] || "N/A"}
              </p>
            </div>

            <div>
              <p className="mb-2">
                <span className="font-semibold">Top Level Domain:</span>{" "}
                {country.tld?.[0] || "N/A"}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Currencies:</span>{" "}
                {country.currencies
                  ? Object.values(country.currencies)
                      .map((currency) => currency.name)
                      .join(", ")
                  : "N/A"}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Languages:</span>{" "}
                {languages.join(", ") || "N/A"}
              </p>
            </div>
          </motion.div>

          {country.borders && country.borders.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-white p-6 rounded-lg shadow-md border border-neutral-200"
            >
              <h3 className="text-xl font-semibold mb-4 text-primary-700">
                Border Countries:
              </h3>
              <div className="flex flex-wrap gap-2">
                {country.borders.map((border) => (
                  <Link
                    key={border}
                    to={`/country/${border}`}
                    className="px-4 py-2 bg-white shadow-sm rounded-md text-sm hover:bg-primary-50 border border-neutral-200 transition-all duration-300 text-primary-700"
                  >
                    {border}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CountryDetails;
