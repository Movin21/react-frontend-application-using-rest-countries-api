import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { lazy } from "react";
import SuspenseWrapper from "./components/SuspenseWrapper";
import ErrorBoundary from "./components/ErrorBoundary";
import AuthForms from "./components/AuthForms";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import { FavoritesProvider } from "./context/FavoritesContext";

// Lazy load pages for better performance
const LazyHome = lazy(() => import("./pages/Home"));
const LazyCountryDetails = lazy(() => import("./pages/CountryDetails"));
const LazyFavorites = lazy(() => import("./pages/Favorites"));

function App() {
  return (
    <Router>
      <AuthProvider>
        <FavoritesProvider>
          <motion.div
            className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Navbar />
            <main className="container mx-auto px-4 py-6 pb-16">
              <ErrorBoundary>
                <AnimatePresence mode="wait">
                  <Routes>
                    <Route path="/authwall" element={<AuthForms />} />
                    <Route
                      path="/"
                      element={
                        <PrivateRoute>
                          <SuspenseWrapper>
                            <LazyHome />
                          </SuspenseWrapper>
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/country/:countryCode"
                      element={
                        <PrivateRoute>
                          <SuspenseWrapper>
                            <LazyCountryDetails />
                          </SuspenseWrapper>
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/favorites"
                      element={
                        <PrivateRoute>
                          <SuspenseWrapper>
                            <LazyFavorites />
                          </SuspenseWrapper>
                        </PrivateRoute>
                      }
                    />
                  </Routes>
                </AnimatePresence>
              </ErrorBoundary>
            </main>
          </motion.div>
        </FavoritesProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
