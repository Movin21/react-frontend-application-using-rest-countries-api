import { Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoadingSkeleton from "./LoadingSkeleton";
import ErrorBoundary from "./ErrorBoundary";

// This component wraps content that uses Suspense for data fetching
// It provides a consistent loading experience and error handling
const SuspenseWrapper = ({
  children,
  fallback = <LoadingSkeleton />,
  errorFallback,
}) => {
  return (
    <ErrorBoundary>
      <AnimatePresence mode="wait">
        <Suspense
          fallback={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {fallback}
            </motion.div>
          }
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </Suspense>
      </AnimatePresence>
    </ErrorBoundary>
  );
};

export default SuspenseWrapper;
