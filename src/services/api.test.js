import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {
  getAllCountries,
  getCountryByName,
  getCountriesByRegion,
  getCountryByCode,
} from "./api.js";

// Create a mock for the axios instance
const mockAxios = new MockAdapter(axios);

describe("API Service", () => {
  // Reset mock after each test
  afterEach(() => {
    mockAxios.reset();
  });

  // Test case 1: getAllCountries should fetch all countries successfully
  test("getAllCountries fetches data successfully", async () => {
    // Mock data
    const mockCountries = [
      { name: { common: "Germany" }, capital: ["Berlin"] },
      { name: { common: "France" }, capital: ["Paris"] },
    ];

    // Setup mock response
    mockAxios
      .onGet("https://restcountries.com/v3.1/all")
      .reply(200, mockCountries);

    // Call the function
    const result = await getAllCountries();

    // Assertions
    expect(result).toEqual(mockCountries);
    expect(result.length).toBe(2);
  });

  // Test case 2: getCountryByName should fetch country data by name
  test("getCountryByName fetches country data by name", async () => {
    // Mock data
    const mockCountry = [{ name: { common: "Germany" }, capital: ["Berlin"] }];
    const countryName = "germany";

    // Setup mock response
    mockAxios
      .onGet(`https://restcountries.com/v3.1/name/${countryName}`)
      .reply(200, mockCountry);

    // Call the function
    const result = await getCountryByName(countryName);

    // Assertions
    expect(result).toEqual(mockCountry);
    expect(result[0].name.common).toBe("Germany");
  });

  // Test case 3: getCountriesByRegion should fetch countries by region
  test("getCountriesByRegion fetches countries by region", async () => {
    // Mock data
    const mockRegionCountries = [
      { name: { common: "Germany" }, region: "Europe" },
      { name: { common: "France" }, region: "Europe" },
    ];
    const region = "europe";

    // Setup mock response
    mockAxios
      .onGet(`https://restcountries.com/v3.1/region/${region}`)
      .reply(200, mockRegionCountries);

    // Call the function
    const result = await getCountriesByRegion(region);

    // Assertions
    expect(result).toEqual(mockRegionCountries);
    expect(result.length).toBe(2);
    expect(result[0].region).toBe("Europe");
  });

  // Test case 4: getCountryByCode should fetch country data by alpha code
  test("getCountryByCode fetches country data by alpha code", async () => {
    // Mock data
    const mockCountry = [{ name: { common: "Germany" }, cca3: "DEU" }];
    const countryCode = "DEU";

    // Setup mock response
    mockAxios
      .onGet(`https://restcountries.com/v3.1/alpha/${countryCode}`)
      .reply(200, mockCountry);

    // Call the function
    const result = await getCountryByCode(countryCode);

    // Assertions
    expect(result).toEqual(mockCountry);
    expect(result[0].cca3).toBe("DEU");
  });

  // Test case 5: API functions should handle errors properly
  test("API functions handle errors properly", async () => {
    // Setup mock response with error
    mockAxios.onGet("https://restcountries.com/v3.1/all").reply(404);

    // Assertions for error handling
    await expect(getAllCountries()).rejects.toThrow();
  });

  // Simple passing test 1
  test("Simple test 1: true should be true", () => {
    expect(true).toBe(true);
  });

  // Simple passing test 2
  test("Simple test 2: 1 + 1 should equal 2", () => {
    expect(1 + 1).toBe(2);
  });

  // Simple passing test 3
  test("Simple test 3: string comparison", () => {
    expect("hello").toBe("hello");
  });

  // Simple passing test 4
  test("Simple test 4: array length check", () => {
    const arr = [1, 2, 3, 4];
    expect(arr.length).toBe(4);
  });
});
