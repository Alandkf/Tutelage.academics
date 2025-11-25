'use client'

import BASE_URL from "@/app/config/url"
import { createContext, useContext, useEffect, useState } from "react"

const AuthContext = createContext({ user: null, loading: true, refresh: () => {} })

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchUser = async () => {
    setLoading(true)
    try {
      // Read access token from localStorage for header-based auth (fallback when cookies are blocked)
      let token = null
      try { token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null } catch {}

      const res = await fetch(`${BASE_URL}/api/auth/me`, {
        credentials: "include",
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      })
      const data = await res.json()
      
      if (data.success) setUser(data.user)
      else setUser(null)
    } catch {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchUser() }, [])

  return (
    <AuthContext.Provider value={{ user, loading, refresh: fetchUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
