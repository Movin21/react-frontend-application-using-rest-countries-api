import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SearchBar = ({ onSearch }) => {
  const [search, setSearch] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    // Use transition to prevent UI freezing during search
    startTransition(() => {
      onSearch(value);
    });
  };

  return (
    <motion.div
      className="relative w-full md:w-80"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
        <motion.svg
          className={`w-5 h-5 ${
            isFocused ? "text-primary-500" : "text-neutral-400"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          animate={{ scale: isFocused ? 1.1 : 1 }}
          transition={{ duration: 0.2 }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </motion.svg>
      </div>
      <input
        type="text"
        value={search}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="Search for a country..."
        className="bg-white w-full pl-12 pr-4 py-3 rounded-lg shadow-md border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
      />
    </motion.div>
  );
};

export default SearchBar;
