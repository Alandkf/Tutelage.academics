import { useRef, useCallback } from "react"

export function useInfiniteScroll({ loading, hasMore, onLoadMore }) {
  const observer = useRef()

  const lastItemRef = useCallback(node => {
    if (loading || !hasMore) return
    if (observer.current) observer.current.disconnect()
    if (node) {
      observer.current = new window.IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          onLoadMore()
        }
      }, { rootMargin: '200px', threshold: 0.1 })
      observer.current.observe(node)
    }
  }, [loading, hasMore, onLoadMore])

  return lastItemRef
}
