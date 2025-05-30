import React from "react";
import { motion } from "framer-motion";

export const EarthLogo = ({ size = 40, className = "" }) => {
  // Animation variants
  const earthVariants = {
    initial: {
      rotate: -10,
      scale: 0.8,
      opacity: 0,
    },
    animate: {
      rotate: 0,
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.05,
      rotate: 5,
      transition: {
        duration: 0.3,
      },
    },
  };

  // Continental animations
  const continentVariants = {
    initial: {
      opacity: 0,
      pathLength: 0,
    },
    animate: {
      opacity: 1,
      pathLength: 1,
      transition: {
        delay: 0.3,
        duration: 0.8,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      className={className}
      initial="initial"
      animate="animate"
      whileHover="hover"
      style={{ width: size, height: size }}
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        variants={earthVariants}
      >
        <defs>
          <style>{`.cls-4{fill:#9dcc6b}.cls-5{fill:#b5e08c}`}</style>
        </defs>
        <g id="_1._Earth" data-name="1. Earth">
          {/* Base circle */}
          <motion.circle
            cx="24"
            cy="24"
            r="23"
            style={{ fill: "#9fdbf3" }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          />

          {/* Water layer */}
          <motion.path
            d="M47 24a22.91 22.91 0 0 1-8.81 18.09A22.88 22.88 0 0 1 27 45C5.28 45-4.37 17.34 12.81 3.91A23 23 0 0 1 47 24z"
            style={{ fill: "#b2e5fb" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          />

          {/* Continental elements with individual animations */}
          <motion.path
            d="M25 7c-2 3-5 0-7 1s.45 3.23 1 6c1 5-4 3-6 4-2.53 1.26-.47 5.74-3 7-1.45.73-3.95.92-6-2.08-.27-8.71 4.66-16.72 9.4-19.33A22.85 22.85 0 0 1 24 1s2.75 3.37 1 6z"
            style={{ fill: "#82bcf4" }}
            variants={continentVariants}
          />

          <motion.path
            className="cls-4"
            d="M25 7c-2 3-5 0-7 1s.45 3.23 1 6c1 5-4 3-6 4-2.53 1.26-.47 5.74-3 7-2 1-6 1-8-7-.72-2.11 6.29-17 22-17 0 0 2.75 3.37 1 6z"
            variants={continentVariants}
          />

          <motion.path
            className="cls-5"
            d="M25.54 5.56c-2 2-4.68-.49-6.54.44-.84.42-.9 1.06-.63 1.87A1.26 1.26 0 0 0 18 8c-2.25 1.13 1.13 3.77 1.13 7.17-1.38.77-3.86.2-5.13.83-2.39 1.2-.68 5.28-2.64 6.77a4.06 4.06 0 0 1-3.94.32c-4-1.81-2-9-.45-12.41a23.14 23.14 0 0 1 5.84-6.77A22.81 22.81 0 0 1 24 1s1.87 2.29 1.54 4.56z"
            variants={continentVariants}
          />

          <motion.path
            className="cls-4"
            d="M22.41 37.5a3.37 3.37 0 0 0-2.58 3.17 1 1 0 0 1-1.83.38 8.33 8.33 0 0 1-1-2c-1-3-4.11-3.21-5-5-1-2 0-6 4-5 0 0 3 1 4 3s4.07 0 5 2c1 2.12-.63 3.03-2.59 3.45z"
            variants={continentVariants}
          />

          <motion.path
            className="cls-5"
            d="M25.26 35.54c-.38 2.07-3.19 1.39-4.58 3A9.11 9.11 0 0 1 20 37c-1-3-4.11-3.21-5-5a4.14 4.14 0 0 1-.09-3.16A7 7 0 0 1 20 32c1 2 4.07 0 5 2a2.47 2.47 0 0 1 .26 1.54z"
            variants={continentVariants}
          />

          <motion.path
            className="cls-4"
            d="M41 23.74c-.84 2.51 1.55 8.23-2 11.09-.1 0-2.66 2-3.84.56-.74-.87-1-2.48-.13-4.65s1-5-2-6-6 1-7-4c-.62-3.1 2.42-4.42 4-6 3-3 0-4 1-7 .6-1.81 3-2.89 4.85-3.45C41.37 8 45 12.52 46.45 19c-2.06.67-4.67 2.39-5.45 4.74z"
            variants={continentVariants}
          />

          <motion.path
            className="cls-5"
            d="M41 23.74c-.84 2.51 1.55 8.23-2 11.09-.92 0-2.29-1.8-1-5.09.83-2.08 1-5-2-6s-6 1-7-4c-.62-3.1 2.42-4.42 4-6 3-3 0-4 1-7a4.45 4.45 0 0 1 2.12-2.28A23 23 0 0 1 46.45 19c-2.06.67-4.67 2.39-5.45 4.74z"
            variants={continentVariants}
          />
        </g>
      </motion.svg>
    </motion.div>
  );
};

export default EarthLogo;
