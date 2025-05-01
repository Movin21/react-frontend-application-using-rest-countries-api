import { motion } from "framer-motion";

const LoadingSkeleton = () => {
  // Create an array of 8 items for the skeleton grid
  const skeletonItems = Array.from({ length: 8 }, (_, index) => index);

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {skeletonItems.map((item) => (
        <motion.div
          key={item}
          className="bg-white rounded-lg overflow-hidden shadow-md border border-neutral-200 h-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: item * 0.05 }}
        >
          <div className="h-48 bg-neutral-200 animate-pulse"></div>
          <div className="p-5 space-y-3">
            <div className="h-6 bg-neutral-200 rounded animate-pulse w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-neutral-200 rounded animate-pulse"></div>
              <div className="h-4 bg-neutral-200 rounded animate-pulse"></div>
              <div className="h-4 bg-neutral-200 rounded animate-pulse"></div>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default LoadingSkeleton;
