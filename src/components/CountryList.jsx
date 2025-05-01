import CountryCard from "./CountryCard";
import { motion } from "framer-motion";

const CountryList = ({ countries }) => {
  if (!countries.length) {
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
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
            />
          </svg>
          <p className="text-neutral-600 text-lg">
            No countries found matching your criteria.
          </p>
          <p className="text-neutral-500 mt-2 text-sm">
            Try adjusting your search or filter settings.
          </p>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {countries.map((country, index) => (
        <motion.div
          key={country.cca3}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <CountryCard country={country} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default CountryList;
