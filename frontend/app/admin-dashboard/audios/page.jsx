'use client'

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import AudioForm from "@/components/forms/AudioForm"
import { Plus, RefreshCw } from "lucide-react"
import { toast } from "sonner"
import { useAuth } from "@/components/AuthContext"
import { useInfiniteScroll } from "@/app/config/useInfiniteScroll"
import BASE_URL from "@/app/config/url"
import { AudioRow } from "@/components/admin/audios/AudioRow"

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
  const { user } = useAuth()

  // Fetch audios with cursor-based pagination
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

  // Reset and fetch audios (for search/refresh)
  const resetAndFetch = () => {
    setAudios([])
    setNextCursor(null)
    setHasMore(true)
    fetchAudios(true)
  }

  // Fetch on mount and when searchTerm changes
  useEffect(() => {
    resetAndFetch()
    // eslint-disable-next-line
  }, [searchTerm])

  // Reusable infinite scroll observer
  const lastAudioRef = useInfiniteScroll({ loading, hasMore, onLoadMore: fetchAudios })

  // Handlers
  const handleCreateSuccess = async (values) => {
    try {
      const isFile = Boolean(values?.pdfFile)
      const reqInit = {
        method: "POST",
        credentials: "include",
      }
      if (isFile) {
        const fd = new FormData()
        fd.append('title', values.title ?? '')
        fd.append('description', values.description ?? '')
        fd.append('transcript', values.transcript ?? '')
        fd.append('audioRef', values.audioRef ?? '')
        // pdfUpload middleware expects 'pdfFile'
        fd.append('pdfFile', values.pdfFile)
        reqInit.body = fd
      } else {
        reqInit.headers = { "Content-Type": "application/json" }
        reqInit.body = JSON.stringify(values)
      }
      const res = await fetch(`${BASE_URL}/api/audios`, reqInit)
      if (!res.ok) throw new Error("Failed to create audio")
      setShowCreate(false)
      resetAndFetch()
      toast("Audio created successfully", { variant: "success" })
    } catch (e) {
      toast(e.message || "Failed to create audio", { variant: "destructive" })
    }
  }
  const handleEdit = (audio) => {
    setEditAudio(audio)
    setShowEdit(true)
  }
  const handleEditSuccess = async (values) => {
    if (!editAudio) return
    try {
      const isFile = Boolean(values?.pdfFile)
      const reqInit = {
        method: "PUT",
        credentials: "include",
      }
      if (isFile) {
        const fd = new FormData()
        fd.append('title', values.title ?? '')
        fd.append('description', values.description ?? '')
        fd.append('transcript', values.transcript ?? '')
        fd.append('audioRef', values.audioRef ?? '')
        fd.append('pdfFile', values.pdfFile)
        reqInit.body = fd
      } else {
        reqInit.headers = { "Content-Type": "application/json" }
        reqInit.body = JSON.stringify(values)
      }
      const res = await fetch(`${BASE_URL}/api/audios/${editAudio.id}`, reqInit)
      if (!res.ok) throw new Error("Failed to update audio")
      setShowEdit(false)
      setEditAudio(null)
      resetAndFetch()
      toast("Audio updated successfully", { variant: "success" })
    } catch (e) {
      toast(e.message || "Failed to update audio", { variant: "destructive" })
    }
  }
  const handleDelete = (audio) => {
    setDeleteAudio(audio)
    setShowDelete(true)
  }
  const confirmDelete = async () => {
    if (!deleteAudio) return
    try {
      await fetch(`${BASE_URL}/api/audios/${deleteAudio.id}`, {
        method: "DELETE",
        credentials: "include"
      })
      setShowDelete(false)
      setDeleteAudio(null)
      resetAndFetch()
      toast("Audio deleted successfully", { variant: "destructive" })
    } catch {
      toast("Failed to delete audio", { variant: "destructive" })
    }
  }

  return (
    <div className="mx-auto w-full">
      <div className="flex flex-row justify-between gap-4 mb-4">
        <h1 className="text-2xl font-bold text-foreground">Audios</h1>
        {user?.role === "ADMIN" && (
          <Button onClick={() => setShowCreate(true)} className="gap-2 max-w-32">
            <Plus className="h-5 w-5" />
            Create Audio
          </Button>
        )}
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
      {loading && audios.length === 0 && (
        <div className="col-span-full text-center text-muted-foreground py-12">Loading audios...</div>
      )}
      <div className="divide-y divide-border">
        {audios.length === 0 && !loading ? (
          <div className="text-center text-muted-foreground py-12">No audios found.</div>
        ) : (
          audios.map((audio, idx) => (
            <AudioRow
              key={idx}
              audio={audio}
              isLast={idx === audios.length - 1}
              lastAudioRef={lastAudioRef}
              user={user}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
      {/* Show More fallback button */}
      {hasMore && audios.length !== 0 && !loading && (
        <div className="flex justify-center mt-8 mb-4">
          <Button variant="outline" onClick={() => fetchAudios()}>Show More</Button>
        </div>
      )}
      {/* Loading indicator for more fetches */}
      {loading && audios.length > 0 && (
        <div className="flex justify-center p-4 mt-4">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full border-2 border-t-transparent border-blue-500 animate-spin"></div>
            <span className="text-muted-foreground text-sm">Loading more...</span>
          </div>
        </div>
      )}
      {/* Create Audio Dialog */}
      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent className="max-w-md w-full" aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>Create Audio</DialogTitle>
          </DialogHeader>
          <AudioForm onSuccess={handleCreateSuccess} onCancel={() => setShowCreate(false)} />
        </DialogContent>
      </Dialog>
      {/* Edit Audio Dialog */}
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
      {/* Delete Confirmation Dialog */}
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