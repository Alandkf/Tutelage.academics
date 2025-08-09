// lib/api.js
"use client";

const BASE_URL = "http://localhost:3001";

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
