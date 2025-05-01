import { useState } from "react";
import { motion } from "framer-motion";

const LanguageFilter = ({ onLanguageChange }) => {
  const languages = [
    "English",
    "Spanish",
    "French",
    "Arabic",
    "Chinese",
    "Russian",
    "Portuguese",
    "German",
    "Japanese",
    "Hindi",
  ];
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("");

  const handleChange = (language) => {
    setSelectedLanguage(language);
    onLanguageChange(language);
    setIsOpen(false);
  };

  return (
    <motion.div
      className="w-full md:w-64 relative"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white w-full px-4 py-3 rounded-lg shadow-md border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary-500 text-left flex justify-between items-center transition-all duration-300"
      >
        <span
          className={selectedLanguage ? "text-neutral-800" : "text-neutral-500"}
        >
          {selectedLanguage || "Filter by Language"}
        </span>
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-neutral-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </motion.svg>
      </button>

      {isOpen && (
        <motion.div
          className="absolute mt-2 w-full bg-white rounded-lg shadow-lg z-10 overflow-hidden border border-neutral-200"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <div className="py-1">
            {selectedLanguage && (
              <div
                className="px-4 py-2 text-sm text-primary-600 hover:bg-neutral-100 cursor-pointer flex items-center"
                onClick={() => handleChange("")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                Clear filter
              </div>
            )}
            {languages.map((language) => (
              <div
                key={language}
                className={`px-4 py-2 text-sm hover:bg-neutral-100 cursor-pointer ${
                  selectedLanguage === language
                    ? "bg-primary-50 text-primary-700"
                    : "text-neutral-700"
                }`}
                onClick={() => handleChange(language)}
              >
                {language}
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default LanguageFilter;
