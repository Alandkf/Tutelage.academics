'use client'

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { VideoCard } from "@/components/admin/videos/VideoCard"
import VideoForm from "@/components/forms/VideoForm"
import { Plus, RefreshCw } from "lucide-react"
import { toast } from "sonner"
import { useAuth } from "@/components/AuthContext"
import { useInfiniteScroll } from "@/app/config/useInfiniteScroll"
import BASE_URL from "@/app/config/url"

const Videos = () => {
  const [videos, setVideos] = useState([])  
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [nextCursor, setNextCursor] = useState(null)
  const [error, setError] = useState(null)
  const [showCreate, setShowCreate] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [editVideo, setEditVideo] = useState(null)
  const [showDelete, setShowDelete] = useState(false)
  const [deleteVideo, setDeleteVideo] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const { user } = useAuth()

  // Fetch videos with cursor-based pagination
  const fetchVideos = async (reset = false) => {
    setLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams()
      params.append("limit", 9)
      if (searchTerm) params.append("search", searchTerm)
      if (!reset && nextCursor) params.append("cursor", nextCursor)
      const res = await fetch(`http://localhost:3001/api/videos?${params.toString()}`, { credentials: "include" })
      const data = await res.json()
      if (!data.success) throw new Error(data.message || "Failed to fetch videos")
      setVideos(prev => reset ? data.data.videos || [] : [...prev, ...(data.data.videos || [])])
      setHasMore(data.data.pagination?.hasMore ?? false)
      setNextCursor(data.data.pagination?.nextCursor ?? null)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  // Reset and fetch videos (for search/refresh)
  const resetAndFetch = () => {
    setVideos([])
    setNextCursor(null)
    setHasMore(true)
    fetchVideos(true)
  }

  // Fetch on mount and when searchTerm changes
  useEffect(() => {
    resetAndFetch()
    // eslint-disable-next-line
  }, [searchTerm])

  // Reusable infinite scroll observer
  const lastVideoRef = useInfiniteScroll({ loading, hasMore, onLoadMore: fetchVideos })

  // Handlers
  const handleCreateSuccess = async (values) => {
    try {
      const res = await fetch(`${BASE_URL}/api/videos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(values)
      })
      if (!res.ok) throw new Error("Failed to create video")
      setShowCreate(false)
      resetAndFetch()
      toast("Video created successfully", { variant: "success" })
    } catch {
      toast("Failed to create video", { variant: "destructive" })
    }
  }
  const handleEdit = (video) => {
    setEditVideo(video)
    setShowEdit(true)
  }
  const handleEditSuccess = async (values) => {
    if (!editVideo) return
    try {
      const res = await fetch(`${BASE_URL}/api/videos/${editVideo.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(values)
      })
      if (!res.ok) throw new Error("Failed to update video")
      setShowEdit(false)
      setEditVideo(null)
      resetAndFetch()
      toast("Video updated successfully", { variant: "success" })
    } catch {
      toast("Failed to update video", { variant: "destructive" })
    }
  }
  const handleDelete = (video) => {
    setDeleteVideo(video)
    setShowDelete(true)
  }
  const confirmDelete = async () => {
    if (!deleteVideo) return
    try {
      await fetch(`${BASE_URL}/api/videos/${deleteVideo.id}`, {
        method: "DELETE",
        credentials: "include"
      })
      setShowDelete(false)
      setDeleteVideo(null)
      resetAndFetch()
      toast("Video deleted successfully", { variant: "destructive" })
    } catch {
      toast("Failed to delete video", { variant: "destructive" })
    }
  }

  return (
    <div className="mx-auto w-full">
     <div className="flex flex-row justify-between gap-4 mb-4">
        <h1 className="text-2xl font-bold text-foreground">Videos</h1>
        {user?.role === "ADMIN" && (
          <Button onClick={() => setShowCreate(true)} className="gap-2 max-w-32">
            <Plus className="h-5 w-5" />
            Create Video
          </Button>
        )}
      </div>
      <div className="mb-4 flex items-center justify-between gap-2">
        <Input
          placeholder="Search videos..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="max-w-xs"
        />
        <Button
          variant="ghost"
          size="icon"
          onClick={resetAndFetch}
          title="Refresh videos"
          className="ml-2"
          disabled={loading}
        >
          <RefreshCw className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading && videos.length === 0 ? (
          <div className="col-span-full text-center text-muted-foreground py-12">Loading videos...</div>
        ) : videos.length === 0 ? (
          <div className="col-span-full text-center text-muted-foreground py-12">No videos found.</div>
        ) : (
          videos.map((video, idx) => {
            const isLast = idx === videos.length - 1
            return (
              <div key={idx} className="relative group" ref={isLast ? lastVideoRef : null}>
                <VideoCard {...video} />
                {user?.role === "ADMIN" && (
                  <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(video)}>Edit</Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(video)}>Delete</Button>
                  </div>
                )}
              </div>
            )
          })
        )}
      </div>
      {/* Show More fallback button */}
      {hasMore && videos.length !== 0 && !loading && (
        <div className="flex justify-center mt-8 mb-4">
          <Button variant="outline" onClick={() => fetchVideos()}>Show More</Button>
        </div>
      )}
      {/* Loading indicator for more fetches */}
      {loading && videos.length > 0 && (
        <div className="flex justify-center p-4 mt-4">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full border-2 border-t-transparent border-blue-500 animate-spin"></div>
            <span className="text-muted-foreground text-sm">Loading more...</span>
          </div>
        </div>
      )}
      {/* Create Video Dialog */}
      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent className="max-w-md w-full" aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>Create Video</DialogTitle>
          </DialogHeader>
          <VideoForm onSuccess={handleCreateSuccess} onCancel={() => setShowCreate(false)} />
        </DialogContent>
      </Dialog>
      {/* Edit Video Dialog */}
      <Dialog open={showEdit} onOpenChange={(v) => { setShowEdit(v); if (!v) setEditVideo(null) }}>
        <DialogContent className="max-w-md w-full" aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>Edit Video</DialogTitle>
          </DialogHeader>
          <VideoForm
            mode="edit"
            initialValues={editVideo}
            onSuccess={handleEditSuccess}
            onCancel={() => { setShowEdit(false); setEditVideo(null) }}
          />
        </DialogContent>
      </Dialog>
      {/* Delete Confirmation Dialog */}
      <Dialog open={showDelete} onOpenChange={setShowDelete}>
        <DialogContent className="max-w-sm w-full" aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>Delete Video</DialogTitle>
          </DialogHeader>
          <div className="py-4 text-sm">
            Are you sure you want to delete <span className="font-semibold text-foreground">{deleteVideo?.title}</span>?
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDelete(false)}>Cancel</Button>
            <Button variant="destructive" onClick={confirmDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Videos