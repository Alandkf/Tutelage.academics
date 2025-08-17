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
    console.log(`Fetching from: ${BASE_URL}${endpoint}`);
    
    // Simplified fetch configuration
    const res = await fetch(`${BASE_URL}${endpoint}`);
    
    if (!res.ok) {
      const errorText = await res.text();
      console.error(`API error (${res.status}):`, errorText);
      throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`);
    }
    
    const data = await res.json();
    console.log('Successful response data:', data);
    return data;
  } catch (err) {
    console.error('Fetch error:', err);
    return { error: err.message || "Failed to load data. Please try again later." };
  }
}
