'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { SpeakingCard } from "@/components/admin/speaking/SpeakingCard"
import VideoForm from "@/components/forms/VideoForm"
import { RefreshCw, Plus } from "lucide-react"
import { toast } from "sonner"
import { useInfiniteScroll } from "@/app/config/useInfiniteScroll"
import BASE_URL from "@/app/config/url"

const Videos = () => {
  const [speakings, setSpeakings] = useState([])  
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

  // Fetch speakings with cursor-based pagination
  const fetchVideos = async (reset = false) => {
    setLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams()
      params.append("limit", 9)
      if (searchTerm) params.append("search", searchTerm)
      if (!reset && nextCursor) params.append("cursor", nextCursor)
      const res = await fetch(`${BASE_URL}/api/speakings?${params.toString()}`, { credentials: "include" })
      const data = await res.json()
      if (!data.success) throw new Error(data.message || "Failed to fetch speakings")
      setSpeakings(prev => reset ? data.data.speakings || [] : [...prev, ...(data.data.speakings || [])])
      setHasMore(data.data.pagination?.hasMore ?? false)
      setNextCursor(data.data.pagination?.nextCursor ?? null)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  // Reset and fetch speakings (for search/refresh)
  const resetAndFetch = () => {
    setSpeakings([])
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
  const lastItemRef = useInfiniteScroll({ loading, hasMore, onLoadMore: fetchVideos })

  // Handlers
  const handleCreateSuccess = async (formData) => {
    console.log('🎯 handleCreateSuccess called');
    console.log('📦 Received formData:', formData);
    
    try {
      const fd = new FormData()
      fd.append('title', formData.title ?? '')
      fd.append('videoRef', formData.videoRef ?? '')
      fd.append('description', formData.description ?? '')
      fd.append('content', formData.content ?? '')
      fd.append('transcript', formData.transcript ?? '')
      fd.append('level', formData.level ?? '')
      fd.append('tags', formData.tags?.join(',') ?? '')
      
      if (formData.pdf && formData.pdf instanceof File) {
        console.log('📄 Adding PDF:', formData.pdf.name);
        fd.append('pdfFile', formData.pdf)
      }
      
      if (Array.isArray(formData.taskPdfs) && formData.taskPdfs.length > 0) {
        console.log('📎 Adding task PDFs:', formData.taskPdfs.length);
        formData.taskPdfs.forEach((file, index) => {
          if (file instanceof File) {
            console.log(`📎 Adding task PDF ${index + 1}:`, file.name);
            fd.append('taskPdfs', file)
          }
        })
      }
      
      console.log('📤 Sending FormData to API...');
      const res = await fetch(`${BASE_URL}/api/speakings`, {
        method: "POST",
        credentials: "include",
        body: fd
      })
      const data = await res.json()
      if (!res.ok || !data.success) throw new Error(data.message)
      setShowCreate(false)
      resetAndFetch()
      toast(data.message, { variant: "success" })
    } catch (e) {
      toast(e.message, { variant: "destructive" })
    }
  }
  const handleEdit = (video) => {
    setEditVideo(video)
    setShowEdit(true)
  }
  const handleEditSuccess = async (formData) => {
    console.log('🎯 handleEditSuccess called');
    console.log('📦 Received formData:', formData);
    
    if (!editVideo) return
    try {
      const fd = new FormData()
      fd.append('title', formData.title ?? '')
      fd.append('videoRef', formData.videoRef ?? '')
      fd.append('description', formData.description ?? '')
      fd.append('content', formData.content ?? '')
      fd.append('transcript', formData.transcript ?? '')
      fd.append('level', formData.level ?? '')
      fd.append('tags', formData.tags?.join(',') ?? '')
      
      if (formData.pdf && formData.pdf instanceof File) {
        console.log('📄 Adding PDF:', formData.pdf.name);
        fd.append('pdfFile', formData.pdf)
      }
      
      if (Array.isArray(formData.taskPdfs) && formData.taskPdfs.length > 0) {
        console.log('📎 Adding task PDFs:', formData.taskPdfs.length);
        formData.taskPdfs.forEach((file, index) => {
          if (file instanceof File) {
            console.log(`📎 Adding task PDF ${index + 1}:`, file.name);
            fd.append('taskPdfs', file)
          }
        })
      }
      
      if (Array.isArray(formData.deletedTaskPdfIds) && formData.deletedTaskPdfIds.length > 0) {
        console.log('🗑️ Adding deleted IDs:', formData.deletedTaskPdfIds);
        fd.append('deletedTaskPdfIds', JSON.stringify(formData.deletedTaskPdfIds))
      }
      
      console.log('📤 Sending FormData to API...');
      const res = await fetch(`${BASE_URL}/api/speakings/${editVideo.id}`, {
        method: "PUT",
        credentials: "include",
        body: fd
      })
      const data = await res.json()
      if (!res.ok || !data.success) throw new Error(data.message)
      setShowEdit(false)
      setEditVideo(null)
      resetAndFetch()
      toast(data.message, { variant: "success" })
    } catch (e) {
      toast(e.message, { variant: "destructive" })
    }
  }
  const handleDelete = (video) => {
    setDeleteVideo(video)
    setShowDelete(true)
  }
  const confirmDelete = async () => {
    if (!deleteVideo) return
    try {
      const res = await fetch(`${BASE_URL}/api/speakings/${deleteVideo.id}`, {
         method: "DELETE",
         credentials: "include"
       })
      const data = await res.json()
      if (!res.ok || !data.success) throw new Error(data.message)
      setShowDelete(false)
      setDeleteVideo(null)
      resetAndFetch()
      toast(data.message, { variant: "destructive" })
    } catch (e) {
      toast(e.message, { variant: "destructive" })
    }
  }

  return (
    <div className="mx-auto w-full">
     <div className="flex flex-row justify-between gap-4 mb-4">
        <h1 className="text-2xl font-bold text-foreground">Speakings</h1>
          <Button onClick={() => setShowCreate(true)} className="gap-2 px-4">
            <Plus className="h-5 w-5" />
            Create Speaking
          </Button>
      </div>
      <div className="mb-4 flex items-center justify-between gap-2">
        <Input
          placeholder="Search speakings..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="max-w-xs"
        />
        <Button
          variant="ghost"
          size="icon"
          onClick={resetAndFetch}
          title="Refresh speakings"
          className="ml-2"
          disabled={loading}
        >
          <RefreshCw className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading && speakings.length === 0 ? (
          <div className="col-span-full text-center text-muted-foreground py-12">Loading speakings...</div>
        ) : speakings.length === 0 ? (
          <div className="col-span-full text-center text-muted-foreground py-12">No speakings found.</div>
        ) : (
          speakings.map((item, idx) => {
            const isLast = idx === speakings.length - 1
            return (
              <div key={idx} className="relative group" ref={isLast ? lastItemRef : null}>
                <Link href={`/admin-dashboard/speakings/${item.id}`}>
                  <SpeakingCard {...item} />
                </Link>
                  <div className="absolute top-2 right-2 flex gap-1 z-10">
                    <Button size="sm" variant="outline" onClick={(e) => { e.preventDefault(); handleEdit(item) }}>Edit</Button>
                    <Button size="sm" variant="destructive" onClick={(e) => { e.preventDefault(); handleDelete(item) }}>Delete</Button>
                  </div>
              </div>
            )
          })
        )}
      </div>
      {/* Show More fallback button */}
      {hasMore && speakings.length !== 0 && !loading && (
        <div className="flex justify-center mt-8 mb-4">
          <Button variant="outline" onClick={() => fetchVideos()}>Show More</Button>
        </div>
      )}
      {/* Loading indicator for more fetches */}
      {loading && speakings.length > 0 && (
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
            <DialogTitle>Create Speaking</DialogTitle>
          </DialogHeader>
          <VideoForm showTranscript={true} onSuccess={handleCreateSuccess} onCancel={() => setShowCreate(false)} />
        </DialogContent>
      </Dialog>
      {/* Edit Video Dialog */}
      <Dialog open={showEdit} onOpenChange={(v) => { setShowEdit(v); if (!v) setEditVideo(null) }}>
        <DialogContent className="max-w-md w-full" aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>Edit Speaking</DialogTitle>
          </DialogHeader>
          <VideoForm
            showTranscript={true}
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
            <DialogTitle>Delete Speaking</DialogTitle>
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