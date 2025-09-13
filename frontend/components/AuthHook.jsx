'use client'

import { useEffect } from "react";
import { refreshToken } from "@/config/axios";

// app/hooks/useAuth.js
export function useAuth() {
  useEffect(() => {
    // ✅ 1️⃣ On first mount: refresh immediately
    const refreshNow = async () => {
      try {
        await refreshToken();
      } catch (error) {
        console.error('Error refreshing token on mount:', error);
      }
    };

    refreshNow();

    // ✅ 2️⃣ Then refresh every 30 mins
    const interval = setInterval(async () => {
      try {
        console.log('Refreshing token (interval)...');
        await refreshToken();
      } catch (error) {
        console.error('Error refreshing token (interval):', error);
      }
    }, 30 * 60 * 1000); // every 30 mins

    return () => clearInterval(interval);
  }, []);
}
         