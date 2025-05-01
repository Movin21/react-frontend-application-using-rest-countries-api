import { useEffect } from "react";
import { motion } from "framer-motion";

const Loading = () => {
  // Prevent scrolling when loading overlay is active
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 bg-neutral-950/70 backdrop-blur-sm z-50 flex flex-col justify-center items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="relative w-24 h-24"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute top-0 left-0 w-full h-full border-4 border-primary-200 rounded-full opacity-30"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-t-primary-500 border-r-primary-500 border-b-transparent border-l-transparent rounded-full"></div>
      </motion.div>

      <motion.h3
        className="mt-8 text-xl font-medium text-white"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Loading countries...
      </motion.h3>

      <motion.div
        className="mt-4 flex space-x-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-3 h-3 rounded-full bg-primary-400"
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Loading;
