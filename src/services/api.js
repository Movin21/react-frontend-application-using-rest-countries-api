import axios from "axios";

const BASE_URL = "https://restcountries.com/v3.1";

// Get all countries
export const getAllCountries = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/all`);
    return response.data;
  } catch (error) {
    console.error("Error fetching countries:", error);
    throw error;
  }
};

// Search country by name
export const getCountryByName = async (name) => {
  try {
    const response = await axios.get(`${BASE_URL}/name/${name}`);
    return response.data;
  } catch (error) {
    console.error(`Error searching country ${name}:`, error);
    throw error;
  }
};

// Get countries by region
export const getCountriesByRegion = async (region) => {
  try {
    const response = await axios.get(`${BASE_URL}/region/${region}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching countries in ${region}:`, error);
    throw error;
  }
};

// Get country by alpha code
export const getCountryByCode = async (code) => {
  try {
    const response = await axios.get(`${BASE_URL}/alpha/${code}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching country with code ${code}:`, error);
    throw error;
  }
};
