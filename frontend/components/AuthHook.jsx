'use client'

import BASE_URL from "@/app/config/url";
import { useEffect } from "react";

// app/hooks/useAuth.js
export function useAuth() {
   useEffect(() => {
    // ✅ 1️⃣ On first mount: refresh immediately
    const refreshNow = async () => {
      try {
        await fetch(`${BASE_URL}/auth/refresh-token`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        
      } catch (error) {
        console.error('Error refreshing token on mount:', error);
      }
    };

    refreshNow();

    // ✅ 2️⃣ Then refresh every 30 mins
    const interval = setInterval(async () => {
      try {
         await fetch(`${BASE_URL}/auth/refresh-token`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
      } catch (error) {
        console.error('Error refreshing token (interval):', error);
      }
    }, 50 * 60 * 1000); // every 30 mins

    return () => clearInterval(interval);
  }, []);
}


// AuthProvider component to wrap the app and keep the token refresh active
export default function RefreshTokenProvider({ children }) {
  useAuth();
  return <>{children}</>;
}
