'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import AudioForm from "@/components/forms/AudioForm"
import { Plus, RefreshCw, Edit, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { useInfiniteScroll } from "@/app/config/useInfiniteScroll"
import BASE_URL from "@/app/config/url"
import Image from "next/image"

const Audio = () => {
  const [audios, setAudios] = useState([])
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [nextCursor, setNextCursor] = useState(null)
  const [error, setError] = useState(null)
  const [showCreate, setShowCreate] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [editAudio, setEditAudio] = useState(null)
  const [showDelete, setShowDelete] = useState(false)
  const [deleteAudio, setDeleteAudio] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")

  const fetchAudios = async (reset = false) => {
    setLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams()
      params.append("limit", 9)
      if (searchTerm) params.append("search", searchTerm)
      if (!reset && nextCursor) params.append("cursor", nextCursor)
      const res = await fetch(`${BASE_URL}/api/audios?${params.toString()}`, { credentials: "include" })
      const data = await res.json()
      if (!data.success) throw new Error(data.message || "Failed to fetch audios")
      setAudios(prev => reset ? data.data.audios || [] : [...prev, ...(data.data.audios || [])])
      setHasMore(data.data.pagination?.hasMore ?? false)
      setNextCursor(data.data.pagination?.nextCursor ?? null)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const resetAndFetch = () => {
    setAudios([])
    setNextCursor(null)
    setHasMore(true)
    fetchAudios(true)
  }

  useEffect(() => {
    resetAndFetch()
    // eslint-disable-next-line
  }, [searchTerm])

  const lastAudioRef = useInfiniteScroll({ loading, hasMore, onLoadMore: fetchAudios })

  const handleCreateSuccess = async (formData) => {
    
    try {
      // FormData is already prepared by AudioForm with all fields
      const res = await fetch(`${BASE_URL}/api/audios`, {
        method: "POST",
        credentials: "include",
        body: formData // FormData already contains pdf, taskPdfs, tags, etc.
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

  const handleEdit = (audio) => {
    setEditAudio(audio)
    setShowEdit(true)
  }

  const handleEditSuccess = async (formData) => {
    console.log('🎯 handleEditSuccess called');
    console.log('📦 Received formData:', formData);
    
    if (!editAudio) return
    try {
      // FormData is already prepared by AudioForm with all fields
      const res = await fetch(`${BASE_URL}/api/audios/${editAudio.id}`, {
        method: "PUT",
        credentials: "include",
        body: formData // FormData already contains pdf, taskPdfs, deletedTaskPdfIds, tags, etc.
      })
      const data = await res.json()
      if (!res.ok || !data.success) throw new Error(data.message)
      setShowEdit(false)
      setEditAudio(null)
      resetAndFetch()
      toast(data.message, { variant: "success" })
    } catch (e) {
      toast(e.message, { variant: "destructive" })
    }
  }

  const handleDelete = (audio) => {
    setDeleteAudio(audio)
    setShowDelete(true)
  }

  const confirmDelete = async () => {
    if (!deleteAudio) return
    try {
      const res = await fetch(`${BASE_URL}/api/audios/${deleteAudio.id}`, {
        method: "DELETE",
        credentials: "include"
      })
      const data = await res.json()
      if (!res.ok || !data.success) throw new Error(data.message)
      setShowDelete(false)
      setDeleteAudio(null)
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
        <h1 className="text-2xl font-bold text-foreground">Audios</h1>
          <Button onClick={() => setShowCreate(true)} className="gap-2 ">
            <Plus className="h-5 w-5" />
            Create Audio
          </Button>
      </div>
      <div className="mb-4 flex items-center justify-between gap-2">
        <Input
          placeholder="Search audios..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="max-w-xs"
        />
        <Button
          variant="ghost"
          size="icon"
          onClick={resetAndFetch}
          title="Refresh audios"
          className="ml-2"
          disabled={loading}
        >
          <RefreshCw className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
        </Button>
      </div>

      {error && <div className="text-destructive text-center mb-4">{error}</div>}

        {loading && audios.length === 0 ? (
          <div className="text-center text-muted-foreground py-12">Loading audios...</div>
        ) : audios.length === 0 && !loading ? (
          <div className="text-center text-muted-foreground py-12">No audios found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {audios.map((audio, idx) => (
              <div
                key={idx}
                ref={idx === audios.length - 1 ? lastAudioRef : null}
                className="relative group bg-card border border-border rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                <Link href={`/admin-dashboard/listenings/${audio.id}`} className="block">
                  <div className="relative h-44 w-full overflow-hidden">
                    <Image
                      src={audio.imageUrl || '/placeholder-16-9.png'}
                      alt={audio.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                  </div>

                  <div className="p-4">
                    <h3 className="text-lg font-bold text-foreground mb-2 truncate">{audio.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{truncate(audio.description)}</p>
                    {audio.level && (
                      <div className="flex flex-wrap gap-1 mb-2">
                        {(Array.isArray(audio.level) ? audio.level : [audio.level]).map((lvl, i) => (
                          <span key={i} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">{lvl}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>

                  <div className="absolute top-2 right-2 flex gap-1 z-10">
                    <Button size="sm" variant="outline" onClick={(e) => { e.preventDefault(); handleEdit(audio) }} className="h-8 px-2">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="destructive" onClick={(e) => { e.preventDefault(); handleDelete(audio) }} className="h-8 px-2">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
              </div>
            ))}
          </div>
        )}

        {loading && audios.length > 0 && (
          <div className="flex justify-center p-4 mt-4">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-full border-2 border-t-transparent border-blue-500 animate-spin"></div>
              <span className="text-muted-foreground text-sm">Loading more...</span>
            </div>
          </div>
        )}

        {hasMore && audios.length !== 0 && !loading && (
          <div className="flex justify-center mt-8 mb-4">
            <Button variant="outline" onClick={() => fetchAudios()}>Show More</Button>
          </div>
        )}
      

      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent className="max-w-md w-full" aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>Create Audio</DialogTitle>
          </DialogHeader>
          <AudioForm onSuccess={handleCreateSuccess} onCancel={() => setShowCreate(false)} />
        </DialogContent>
      </Dialog>

      <Dialog open={showEdit} onOpenChange={(v) => { setShowEdit(v); if (!v) setEditAudio(null) }}>
        <DialogContent className="max-w-md w-full" aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>Edit Audio</DialogTitle>
          </DialogHeader>
          <AudioForm
            mode="edit"
            initialValues={editAudio}
            onSuccess={handleEditSuccess}
            onCancel={() => { setShowEdit(false); setEditAudio(null) }}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={showDelete} onOpenChange={setShowDelete}>
        <DialogContent className="max-w-sm w-full" aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>Delete Audio</DialogTitle>
          </DialogHeader>
          <div className="py-4 text-sm">
            Are you sure you want to delete <span className="font-semibold text-foreground">{deleteAudio?.title}</span>?
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

export default Audio