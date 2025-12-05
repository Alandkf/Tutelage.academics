'use client'

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import WritingForm from "@/components/forms/WritingForm"
import { Plus, RefreshCw, Edit, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { useInfiniteScroll } from "@/app/config/useInfiniteScroll"
import BASE_URL from "@/app/config/url"
import Image from "next/image"
import Link from "next/link"

const Writings = () => {
  const [writings, setWritings] = useState([])
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [nextCursor, setNextCursor] = useState(null)
  const [error, setError] = useState(null)
  const [showCreate, setShowCreate] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [editWriting, setEditWriting] = useState(null)
  const [showDelete, setShowDelete] = useState(false)
  const [deleteWriting, setDeleteWriting] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")

  const fetchWritings = async (reset = false) => {
    setLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams()
      params.append("limit", 9)
      if (searchTerm) params.append("search", searchTerm)
      if (!reset && nextCursor) params.append("cursor", nextCursor)
      const res = await fetch(`${BASE_URL}/api/writings?${params.toString()}`, { credentials: "include" })
      const data = await res.json()
      if (!data.success) throw new Error(data.message || "Failed to fetch writings")
      setWritings(prev => reset ? data.data.writings || [] : [...prev, ...(data.data.writings || [])])
      setHasMore(data.data.pagination?.hasMore ?? false)
      setNextCursor(data.data.pagination?.nextCursor ?? null)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const resetAndFetch = () => {
    setWritings([])
    setNextCursor(null)
    setHasMore(true)
    fetchWritings(true)
  }

  useEffect(() => {
    resetAndFetch()
    // eslint-disable-next-line
  }, [searchTerm])

  const lastWritingRef = useInfiniteScroll({ loading, hasMore, onLoadMore: fetchWritings })

  const handleCreateSuccess = async (formData) => {
    try {
      const fd = new FormData()
      fd.append('title', formData.title ?? '')
      fd.append('description', formData.description ?? '')
      fd.append('content', formData.content ?? '')
      fd.append('imageUrl', formData.imageUrl ?? '')
      fd.append('contentImageUrl', formData.contentImageUrl ?? '')
      fd.append('level', formData.level ?? '')
      fd.append('tags', formData.tags?.join(',') ?? '')
      
      if (formData.pdf && formData.pdf instanceof File) {
        fd.append('pdfFile', formData.pdf)
      }
      
      if (Array.isArray(formData.taskPdfs) && formData.taskPdfs.length > 0) {
        formData.taskPdfs.forEach(file => {
          if (file instanceof File) {
            fd.append('taskPdfs', file)
          }
        })
      }
      
      const res = await fetch(`${BASE_URL}/api/writings`, {
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

  const handleEdit = (writing) => {
    setEditWriting(writing)
    setShowEdit(true)
  }

  const handleEditSuccess = async (formData) => {
    if (!editWriting) return
    try {
      const fd = new FormData()
      fd.append('title', formData.title ?? '')
      fd.append('description', formData.description ?? '')
      fd.append('content', formData.content ?? '')
      fd.append('imageUrl', formData.imageUrl ?? '')
      fd.append('contentImageUrl', formData.contentImageUrl ?? '')
      fd.append('level', formData.level ?? '')
      fd.append('tags', formData.tags?.join(',') ?? '')
      
      if (formData.pdf && formData.pdf instanceof File) {
        fd.append('pdfFile', formData.pdf)
      }
      
      if (Array.isArray(formData.taskPdfs) && formData.taskPdfs.length > 0) {
        formData.taskPdfs.forEach(file => {
          if (file instanceof File) {
            fd.append('taskPdfs', file)
          }
        })
      }
      
      if (Array.isArray(formData.deletedTaskPdfIds) && formData.deletedTaskPdfIds.length > 0) {
        fd.append('deletedTaskPdfIds', JSON.stringify(formData.deletedTaskPdfIds))
      }
      
      const res = await fetch(`${BASE_URL}/api/writings/${editWriting.id}`, {
        method: "PUT",
        credentials: "include",
        body: fd
      })
      const data = await res.json()
      if (!res.ok || !data.success) throw new Error(data.message)
      setShowEdit(false)
      setEditWriting(null)
      resetAndFetch()
      toast(data.message, { variant: "success" })
    } catch (e) {
      toast(e.message, { variant: "destructive" })
    }
  }

  const handleDelete = (writing) => {
    setDeleteWriting(writing)
    setShowDelete(true)
  }

  const confirmDelete = async () => {
    if (!deleteWriting) return
    try {
      const res = await fetch(`${BASE_URL}/api/writings/${deleteWriting.id}`, { method: "DELETE", credentials: "include" })
      const data = await res.json()
      if (!res.ok || !data.success) throw new Error(data.message)
      setShowDelete(false)
      setDeleteWriting(null)
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
        <h1 className="text-2xl font-bold text-foreground">Writings</h1>
          <Button onClick={() => setShowCreate(true)} className="gap-2 ">
            <Plus className="h-5 w-5" />Create Writing
          </Button>
      </div>
      <div className="mb-4 flex items-center justify-between gap-2">
        <Input placeholder="Search writings..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="max-w-xs" />
        <Button variant="ghost" size="icon" onClick={resetAndFetch} title="Refresh writings" className="ml-2" disabled={loading}>
          <RefreshCw className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
        </Button>
      </div>

      {error && <div className="text-destructive text-center mb-4">{error}</div>}

      {loading && writings.length === 0 ? (
        <div className="text-center text-muted-foreground py-12">Loading writings...</div>
      ) : writings.length === 0 && !loading ? (
        <div className="text-center text-muted-foreground py-12">No writings found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {writings.map((writing, idx) => (
            <Link key={idx} href={`/admin-dashboard/writings/${writing.id}`} ref={idx === writings.length - 1 ? lastWritingRef : null} className="relative group bg-card border border-border rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 block">
              <div className="relative h-44 w-full overflow-hidden">
                <Image src={writing.imageUrl || '/placeholder-16-9.png'} alt={writing.title} fill className="object-cover" sizes="(max-width: 640px) 100vw, 33vw" />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-foreground mb-2 truncate">{writing.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{truncate(writing.description)}</p>
                {writing.level && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {(Array.isArray(writing.level) ? writing.level : [writing.level]).map((lvl, i) => (
                      <span key={i} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">{lvl}</span>
                    ))}
                  </div>
                )}
              </div>
                <div className="absolute top-2 right-2 flex gap-1" onClick={(e) => e.preventDefault()}>
                  <Button size="sm" variant="outline" onClick={(e) => { e.preventDefault(); handleEdit(writing); }} className="h-8 px-2"><Edit className="h-4 w-4" /></Button>
                  <Button size="sm" variant="destructive" onClick={(e) => { e.preventDefault(); handleDelete(writing); }} className="h-8 px-2"><Trash2 className="h-4 w-4" /></Button>
                </div>
            </Link>
          ))}
        </div>
      )}

      {loading && writings.length > 0 && (
        <div className="flex justify-center p-4 mt-4">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full border-2 border-t-transparent border-blue-500 animate-spin"></div>
            <span className="text-muted-foreground text-sm">Loading more...</span>
          </div>
        </div>
      )}

      {hasMore && writings.length !== 0 && !loading && (
        <div className="flex justify-center mt-8 mb-4">
          <Button variant="outline" onClick={() => fetchWritings()}>Show More</Button>
        </div>
      )}

      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent className="max-w-md w-full" aria-describedby={undefined}>
          <DialogHeader><DialogTitle>Create Writing</DialogTitle></DialogHeader>
          <WritingForm onSuccess={handleCreateSuccess} onCancel={() => setShowCreate(false)} />
        </DialogContent>
      </Dialog>

      <Dialog open={showEdit} onOpenChange={(v) => { setShowEdit(v); if (!v) setEditWriting(null) }}>
        <DialogContent className="max-w-md w-full" aria-describedby={undefined}>
          <DialogHeader><DialogTitle>Edit Writing</DialogTitle></DialogHeader>
          <WritingForm mode="edit" initialValues={editWriting} onSuccess={handleEditSuccess} onCancel={() => { setShowEdit(false); setEditWriting(null) }} />
        </DialogContent>
      </Dialog>

      <Dialog open={showDelete} onOpenChange={setShowDelete}>
        <DialogContent className="max-w-sm w-full" aria-describedby={undefined}>
          <DialogHeader><DialogTitle>Delete Writing</DialogTitle></DialogHeader>
          <div className="py-4 text-sm">Are you sure you want to delete <span className="font-semibold text-foreground">{deleteWriting?.title}</span>?</div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDelete(false)}>Cancel</Button>
            <Button variant="destructive" onClick={confirmDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Writings


