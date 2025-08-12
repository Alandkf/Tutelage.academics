// lib/api.js - API utility functions for fetching data from the backend
"use client";

// Base URL for all API requests
const BASE_URL = "http://localhost:3001";

/**
 * Fetches data from the specified endpoint
 * @param {string} endpoint - The API endpoint to fetch data from
 * @returns {Promise<Object>} The JSON response or error object
 */
export async function fetchData(endpoint) {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`);
    if (!res.ok) throw new Error("Failed to fetch data");
    return res.json();
  } catch (err) {
    console.error(err);
    return { error: "Failed to load data. Please try again later." };
  }
}
