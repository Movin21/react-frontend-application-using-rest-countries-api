import axios from "axios";

const BASE_URL = "https://restcountries.com/v3.1";

// Create a cache to store promises
const cache = new Map();

// Helper function to create suspendable resource
function createResource(promise) {
  let status = "pending";
  let result;
  let suspender = promise.then(
    (data) => {
      status = "success";
      result = data;
    },
    (error) => {
      status = "error";
      result = error;
    }
  );

  return {
    read() {
      if (status === "pending") {
        throw suspender;
      } else if (status === "error") {
        throw result;
      } else if (status === "success") {
        return result;
      }
    },
  };
}

// Get all countries with suspense
export const fetchAllCountries = () => {
  const cacheKey = "all-countries";

  if (!cache.has(cacheKey)) {
    const promise = axios
      .get(`${BASE_URL}/all`)
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching countries:", error);
        throw error;
      });

    cache.set(cacheKey, createResource(promise));
  }

  return cache.get(cacheKey);
};

// Search country by name with suspense
export const fetchCountryByName = (name) => {
  const cacheKey = `name-${name}`;

  if (!cache.has(cacheKey)) {
    const promise = axios
      .get(`${BASE_URL}/name/${name}`)
      .then((response) => response.data)
      .catch((error) => {
        console.error(`Error searching country ${name}:`, error);
        throw error;
      });

    cache.set(cacheKey, createResource(promise));
  }

  return cache.get(cacheKey);
};

// Get countries by region with suspense
export const fetchCountriesByRegion = (region) => {
  const cacheKey = `region-${region}`;

  if (!cache.has(cacheKey)) {
    const promise = axios
      .get(`${BASE_URL}/region/${region}`)
      .then((response) => response.data)
      .catch((error) => {
        console.error(`Error fetching countries in ${region}:`, error);
        throw error;
      });

    cache.set(cacheKey, createResource(promise));
  }

  return cache.get(cacheKey);
};

// Get country by alpha code with suspense
export const fetchCountryByCode = (code) => {
  const cacheKey = `code-${code}`;

  if (!cache.has(cacheKey)) {
    const promise = axios
      .get(`${BASE_URL}/alpha/${code}`)
      .then((response) => response.data)
      .catch((error) => {
        console.error(`Error fetching country with code ${code}:`, error);
        throw error;
      });

    cache.set(cacheKey, createResource(promise));
  }

  return cache.get(cacheKey);
};

// Get countries by language with suspense
export const fetchCountriesByLanguage = (language) => {
  const cacheKey = `language-${language}`;

  if (!cache.has(cacheKey)) {
    // Since REST Countries API doesn't have a direct language endpoint,
    // we'll fetch all countries and filter by language
    const promise = axios
      .get(`${BASE_URL}/all`)
      .then((response) => {
        const countries = response.data;
        return countries.filter((country) => {
          if (!country.languages) return false;
          const countryLanguages = Object.values(country.languages);
          return countryLanguages.some((lang) =>
            lang.toLowerCase().includes(language.toLowerCase())
          );
        });
      })
      .catch((error) => {
        console.error(
          `Error fetching countries with language ${language}:`,
          error
        );
        throw error;
      });

    cache.set(cacheKey, createResource(promise));
  }

  return cache.get(cacheKey);
};

// Clear cache for a specific key or all cache
export const clearCache = (key = null) => {
  if (key) {
    cache.delete(key);
  } else {
    cache.clear();
  }
};
