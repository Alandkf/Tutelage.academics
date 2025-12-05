'use client'

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import StoryForm from "@/components/forms/StoryForm"
import { Plus, RefreshCw, Edit, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { useInfiniteScroll } from "@/app/config/useInfiniteScroll"
import BASE_URL from "@/app/config/url"
import Image from "next/image"
import Link from "next/link"

const Stories = () => {
  const [stories, setStories] = useState([])
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [nextCursor, setNextCursor] = useState(null)
  const [error, setError] = useState(null)
  const [showCreate, setShowCreate] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [editStory, setEditStory] = useState(null)
  const [showDelete, setShowDelete] = useState(false)
  const [deleteStory, setDeleteStory] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")

  const fetchStories = async (reset = false) => {
    setLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams()
      params.append("limit", 9)
      if (searchTerm) params.append("search", searchTerm)
      if (!reset && nextCursor) params.append("cursor", nextCursor)
      const res = await fetch(`${BASE_URL}/api/stories?${params.toString()}`, { credentials: "include" })
      const data = await res.json()
      if (!data.success) throw new Error(data.message || "Failed to fetch stories")
      setStories(prev => reset ? data.data.stories || [] : [...prev, ...(data.data.stories || [])])
      setHasMore(data.data.pagination?.hasMore ?? false)
      setNextCursor(data.data.pagination?.nextCursor ?? null)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const resetAndFetch = () => {
    setStories([])
    setNextCursor(null)
    setHasMore(true)
    fetchStories(true)
  }

  useEffect(() => {
    resetAndFetch()
    // eslint-disable-next-line
  }, [searchTerm])

  const lastStoryRef = useInfiniteScroll({ loading, hasMore, onLoadMore: fetchStories })

  const handleCreateSuccess = async (formData) => {
 
    
    try {
      const fd = new FormData()
      fd.append('title', formData.title ?? '')
      fd.append('imageUrl', formData.imageUrl ?? '')
      fd.append('description', formData.description ?? '')
      fd.append('contentText', formData.contentText ?? '')
      fd.append('audioRef', formData.audioRef ?? '')
      fd.append('level', formData.level ?? '')
      fd.append('wordCount', formData.wordCount ?? '')
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
      const res = await fetch(`${BASE_URL}/api/stories`, {
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

  const handleEdit = (story) => {
    setEditStory(story)
    setShowEdit(true)
  }

  const handleEditSuccess = async (formData) => {
    
    if (!editStory) return
    try {
      const fd = new FormData()
      fd.append('title', formData.title ?? '')
      fd.append('imageUrl', formData.imageUrl ?? '')
      fd.append('description', formData.description ?? '')
      fd.append('contentText', formData.contentText ?? '')
      fd.append('audioRef', formData.audioRef ?? '')
      fd.append('level', formData.level ?? '')
      fd.append('wordCount', formData.wordCount ?? '')
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
      const res = await fetch(`${BASE_URL}/api/stories/${editStory.id}`, {
        method: "PUT",
        credentials: "include",
        body: fd
      })
      const data = await res.json()
      if (!res.ok || !data.success) throw new Error(data.message)
      setShowEdit(false)
      setEditStory(null)
      resetAndFetch()
      toast(data.message, { variant: "success" })
    } catch (e) {
      toast(e.message, { variant: "destructive" })
    }
  }

  const handleDelete = (story) => {
    setDeleteStory(story)
    setShowDelete(true)
  }

  const confirmDelete = async () => {
    if (!deleteStory) return
    try {
      const res = await fetch(`${BASE_URL}/api/stories/${deleteStory.id}`, { method: "DELETE", credentials: "include" })
      const data = await res.json()
      if (!res.ok || !data.success) throw new Error(data.message)
      setShowDelete(false)
      setDeleteStory(null)
      resetAndFetch()
      toast(data.message, { variant: "destructive" })
    } catch (e) {
      toast(e.message, { variant: "destructive" })
    }
  }

  const truncate = (text, maxLength = 80) => {
    if (!text) return ''
    return text.length <= maxLength ? text : text.slice(0, maxLength) + '...'
  }

  return (
    <div className="mx-auto w-full h-full flex flex-col">
      <div className="flex flex-row justify-between gap-4 mb-4">
        <h1 className="text-2xl font-bold text-foreground">Stories</h1>
          <Button onClick={() => setShowCreate(true)} className="gap-2 ">
            <Plus className="h-5 w-5" />Create Story
          </Button>
      </div>
      <div className="mb-4 flex items-center justify-between gap-2">
        <Input placeholder="Search stories..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="max-w-xs" />
        <Button variant="ghost" size="icon" onClick={resetAndFetch} title="Refresh stories" className="ml-2" disabled={loading}>
          <RefreshCw className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
        </Button>
      </div>

      {error && <div className="text-destructive text-center mb-4">{error}</div>}

      {loading && stories.length === 0 ? (
        <div className="text-center text-muted-foreground py-12">Loading stories...</div>
      ) : stories.length === 0 && !loading ? (
        <div className="text-center text-muted-foreground py-12">No stories found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story, idx) => (
            <Link key={story.id} href={`/admin-dashboard/stories/${story.id}`} ref={idx === stories.length - 1 ? lastStoryRef : null} className="relative group bg-card border border-border rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 block">
              <div className="relative h-44 w-full overflow-hidden">
                <Image src={story.imageUrl || '/placeholder-16-9.png'} alt={story.title} fill className="object-cover" sizes="(max-width: 640px) 100vw, 33vw" />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-foreground mb-2 truncate">{story.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{truncate(story.description)}</p>
                {story.wordCount && (
                  <p className="text-xs text-muted-foreground mb-2">{story.wordCount} words</p>
                )}
                {story.level && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {(Array.isArray(story.level) ? story.level : [story.level]).map((lvl, i) => (
                      <span key={i} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">{lvl}</span>
                    ))}
                  </div>
                )}
              </div>
                <div className="absolute top-2 right-2 flex gap-1" onClick={(e) => e.preventDefault()}>
                  <Button size="sm" variant="outline" onClick={(e) => { e.preventDefault(); handleEdit(story); }} className="h-8 px-2"><Edit className="h-4 w-4" /></Button>
                  <Button size="sm" variant="destructive" onClick={(e) => { e.preventDefault(); handleDelete(story); }} className="h-8 px-2"><Trash2 className="h-4 w-4" /></Button>
                </div>
            </Link>
          ))}
        </div>
      )}

      {loading && stories.length > 0 && (
        <div className="flex justify-center p-4 mt-4">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full border-2 border-t-transparent border-blue-500 animate-spin"></div>
            <span className="text-muted-foreground text-sm">Loading more...</span>
          </div>
        </div>
      )}

      {hasMore && stories.length !== 0 && !loading && (
        <div className="flex justify-center mt-8 mb-4">
          <Button variant="outline" onClick={() => fetchStories()}>Show More</Button>
        </div>
      )}

      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent className="max-w-md w-full" aria-describedby={undefined}>
          <DialogHeader><DialogTitle>Create Story</DialogTitle></DialogHeader>
          <StoryForm onSuccess={handleCreateSuccess} onCancel={() => setShowCreate(false)} />
        </DialogContent>
      </Dialog>

      <Dialog open={showEdit} onOpenChange={(v) => { setShowEdit(v); if (!v) setEditStory(null) }}>
        <DialogContent className="max-w-md w-full" aria-describedby={undefined}>
          <DialogHeader><DialogTitle>Edit Story</DialogTitle></DialogHeader>
          <StoryForm mode="edit" initialValues={editStory} onSuccess={handleEditSuccess} onCancel={() => { setShowEdit(false); setEditStory(null) }} />
        </DialogContent>
      </Dialog>

      <Dialog open={showDelete} onOpenChange={setShowDelete}>
        <DialogContent className="max-w-sm w-full" aria-describedby={undefined}>
          <DialogHeader><DialogTitle>Delete Story</DialogTitle></DialogHeader>
          <div className="py-4 text-sm">Are you sure you want to delete <span className="font-semibold text-foreground">{deleteStory?.title}</span>?</div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDelete(false)}>Cancel</Button>
            <Button variant="destructive" onClick={confirmDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Stories
