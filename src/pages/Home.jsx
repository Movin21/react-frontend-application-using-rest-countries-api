import { useState, useTransition } from "react";
import CountryList from "../components/CountryList";
import SearchBar from "../components/SearchBar";
import LanguageFilter from "../components/LanguageFilter";
import FilterOptions from "../components/FilterOptions";
import LoadingSkeleton from "../components/LoadingSkeleton";
import { motion } from "framer-motion";
import {
  fetchAllCountries,
  fetchCountryByName,
  fetchCountriesByRegion,
  clearCache,
  fetchCountriesByLanguage,
} from "../services/suspenseApi";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [isPending, startTransition] = useTransition();

  // Get the appropriate data based on filters
  const getCountriesData = () => {
    try {
      let countries;

      // Handle different combinations of filters
      if (selectedLanguage && !searchTerm && !selectedRegion) {
        // Only language filter is applied
        return fetchCountriesByLanguage(selectedLanguage).read();
      } else if (searchTerm && selectedRegion && selectedLanguage) {
        // All three filters applied
        const searchResults = fetchCountryByName(searchTerm).read();
        const filteredByRegion = searchResults.filter(
          (country) =>
            country.region.toLowerCase() === selectedRegion.toLowerCase()
        );

        return filteredByRegion.filter((country) => {
          if (!country.languages) return false;
          const countryLanguages = Object.values(country.languages);
          return countryLanguages.some((lang) =>
            lang.toLowerCase().includes(selectedLanguage.toLowerCase())
          );
        });
      } else if (searchTerm && selectedLanguage) {
        // Search and language filters applied
        const searchResults = fetchCountryByName(searchTerm).read();

        return searchResults.filter((country) => {
          if (!country.languages) return false;
          const countryLanguages = Object.values(country.languages);
          return countryLanguages.some((lang) =>
            lang.toLowerCase().includes(selectedLanguage.toLowerCase())
          );
        });
      } else if (selectedRegion && selectedLanguage) {
        // Region and language filters applied
        const regionResults = fetchCountriesByRegion(selectedRegion).read();

        return regionResults.filter((country) => {
          if (!country.languages) return false;
          const countryLanguages = Object.values(country.languages);
          return countryLanguages.some((lang) =>
            lang.toLowerCase().includes(selectedLanguage.toLowerCase())
          );
        });
      } else if (searchTerm && selectedRegion) {
        // Search and region filters applied
        const searchResults = fetchCountryByName(searchTerm).read();
        return searchResults.filter(
          (country) =>
            country.region.toLowerCase() === selectedRegion.toLowerCase()
        );
      } else if (searchTerm) {
        // Only search filter applied
        return fetchCountryByName(searchTerm).read();
      } else if (selectedRegion) {
        // Only region filter applied
        return fetchCountriesByRegion(selectedRegion).read();
      } else {
        // No filters applied
        return fetchAllCountries().read();
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  // Get countries data with suspense
  const countries = getCountriesData();

  const handleSearch = (value) => {
    // Use startTransition to mark state updates as non-urgent
    // This helps prevent the UI from freezing during updates
    startTransition(() => {
      // Clear cache for search results to ensure fresh data
      if (searchTerm !== value) {
        clearCache(`name-${searchTerm}`);
      }
      setSearchTerm(value);
    });
  };

  const handleLanguageFilter = (language) => {
    // Use startTransition to mark state updates as non-urgent
    startTransition(() => {
      // Clear cache for language results to ensure fresh data
      if (selectedLanguage !== language) {
        clearCache(`language-${selectedLanguage}`);
      }
      setSelectedLanguage(language);
    });
  };

  const handleRegionFilter = (region) => {
    // Use startTransition to mark state updates as non-urgent
    startTransition(() => {
      // Clear cache for region results to ensure fresh data
      if (selectedRegion !== region) {
        clearCache(`region-${selectedRegion}`);
      }
      setSelectedRegion(region);
    });
  };

  // The error handling is now managed by ErrorBoundary component

  return (
    <div>
      <div className="flex flex-col md:flex-row md:justify-between mb-8 space-y-4 md:space-y-0 md:space-x-4">
        <SearchBar onSearch={handleSearch} />
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <LanguageFilter onLanguageChange={handleLanguageFilter} />
          <FilterOptions onRegionChange={handleRegionFilter} />
        </div>
      </div>

      {isPending ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <LoadingSkeleton />
        </motion.div>
      ) : (
        <CountryList countries={countries} />
      )}
    </div>
  );
};

export default Home;
