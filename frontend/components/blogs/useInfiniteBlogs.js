import { useState, useCallback, useRef, useEffect } from "react"

export function useInfiniteBlogs({ searchTerm = "" }) {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [nextCursor, setNextCursor] = useState(null)
  const [error, setError] = useState(null)
  const observer = useRef()

  // Always fetch on mount and when searchTerm changes
  useEffect(() => {
    setBlogs([])
    setNextCursor(null)
    setHasMore(true)
    fetchBlogs(true)
    // eslint-disable-next-line
  }, [searchTerm])

  const fetchBlogs = useCallback(async (reset = false) => {
    setLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams()
      params.append("limit", 4)
      if (searchTerm) params.append("search", searchTerm)
      if (!reset && nextCursor) params.append("cursor", nextCursor)
      const res = await fetch(`http://localhost:3001/api/blogs?${params.toString()}`, { credentials: "include" })
      const data = await res.json()
      
      
      if (!data.success) throw new Error(data.message || "Failed to fetch blogs")
      setBlogs(prev => reset ? data.blogs : [...prev, ...data.blogs])
      setHasMore(data.hasMore)
      setNextCursor(data.nextCursor)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [searchTerm, nextCursor])

  // For resetting on search
  const resetAndFetch = useCallback(() => {
    setBlogs([])
    setNextCursor(null)
    setHasMore(true)
    fetchBlogs(true)
  }, [fetchBlogs])

  // IntersectionObserver for infinite scroll
  const lastBlogRef = useCallback(node => {
    if (loading || !hasMore) return
    if (observer.current) observer.current.disconnect()
    if (node) {
      observer.current = new window.IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          fetchBlogs()
        }
      }, { rootMargin: '200px', threshold: 0.1 })
      observer.current.observe(node)
    }
  }, [loading, hasMore, fetchBlogs])

  return {
    blogs,
    loading,
    hasMore,
    error,
    fetchBlogs,
    resetAndFetch,
    lastBlogRef
  }
}
