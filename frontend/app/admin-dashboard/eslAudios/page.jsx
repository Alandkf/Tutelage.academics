'use client'

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import EslAudioForm from "@/components/forms/EslAudioForm"
import { Plus, RefreshCw, Edit, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { useAuth } from "@/components/AuthContext"
import BASE_URL from "@/app/config/url"
import Image from "next/image"
import Link from "next/link"

const EslAudios = () => {
  const [audios, setAudios] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showCreate, setShowCreate] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [editAudio, setEditAudio] = useState(null)
  const [showDelete, setShowDelete] = useState(false)
  const [deleteAudio, setDeleteAudio] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const { user } = useAuth()

  const fetchAudios = async () => {
    setLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams()
      params.append("limit", 100)
      if (searchTerm) params.append("search", searchTerm)
      const res = await fetch(`${BASE_URL}/api/esl-audios?${params.toString()}`, { credentials: "include" })
      const data = await res.json()
      if (!data.success) throw new Error(data.message || "Failed to fetch audios")
      setAudios(data.data || [])
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAudios()
    // eslint-disable-next-line
  }, [searchTerm])

  const handleCreateSuccess = async (values) => {
    try {
      const fd = new FormData()
      fd.append('title', values.title ?? '')
      fd.append('imageUrl', values.imageUrl ?? '')
      fd.append('description', values.description ?? '')
      fd.append('transcript', values.transcript ?? '')
      fd.append('audioRef', values.audioRef ?? '')
      fd.append('level', values.level ?? '')
      fd.append('tags', values.tags?.join(',') ?? '')
      if (values.pdf) fd.append('pdfFile', values.pdf)
      if (values.taskPdf) fd.append('taskPdfFile', values.taskPdf)
      
      const res = await fetch(`${BASE_URL}/api/esl-audios`, {
        method: "POST",
        credentials: "include",
        body: fd
      })
      const data = await res.json()
      if (!res.ok || !data.success) throw new Error(data.message)
      setShowCreate(false)
      fetchAudios()
      toast(data.message, { variant: "success" })
    } catch (e) {
      toast(e.message, { variant: "destructive" })
    }
  }

  const handleEdit = (audio) => {
    setEditAudio(audio)
    setShowEdit(true)
  }

  const handleEditSuccess = async (values) => {
    if (!editAudio) return
    try {
      const fd = new FormData()
      fd.append('title', values.title ?? '')
      fd.append('imageUrl', values.imageUrl ?? '')
      fd.append('description', values.description ?? '')
      fd.append('transcript', values.transcript ?? '')
      fd.append('audioRef', values.audioRef ?? '')
      fd.append('level', values.level ?? '')
      fd.append('tags', values.tags?.join(',') ?? '')
      if (values.pdf) fd.append('pdfFile', values.pdf)
      if (values.taskPdf) fd.append('taskPdfFile', values.taskPdf)
      
      const res = await fetch(`${BASE_URL}/api/esl-audios/${editAudio.id}`, {
        method: "PUT",
        credentials: "include",
        body: fd
      })
      const data = await res.json()
      if (!res.ok || !data.success) throw new Error(data.message)
      setShowEdit(false)
      setEditAudio(null)
      fetchAudios()
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
      const res = await fetch(`${BASE_URL}/api/esl-audios/${deleteAudio.id}`, { method: "DELETE", credentials: "include" })
      const data = await res.json()
      if (!res.ok || !data.success) throw new Error(data.message)
      setShowDelete(false)
      setDeleteAudio(null)
      fetchAudios()
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
        <h1 className="text-2xl font-bold text-foreground">ESL Audios</h1>
        {user?.role === "ADMIN" && (
          <Button onClick={() => setShowCreate(true)} className="gap-2 max-w-48">
            <Plus className="h-5 w-5" />Create ESL Audio
          </Button>
        )}
      </div>
      <div className="mb-4 flex items-center justify-between gap-2">
        <Input placeholder="Search ESL audios..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="max-w-xs" />
        <Button variant="ghost" size="icon" onClick={fetchAudios} title="Refresh audios" className="ml-2" disabled={loading}>
          <RefreshCw className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
        </Button>
      </div>

      {error && <div className="text-destructive text-center mb-4">{error}</div>}

      {loading && audios.length === 0 ? (
        <div className="text-center text-muted-foreground py-12">Loading ESL audios...</div>
      ) : audios.length === 0 && !loading ? (
        <div className="text-center text-muted-foreground py-12">No ESL audios found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {audios.map((audio, i) => (
            <Link key={i} href={`/admin-dashboard/eslAudios/${audio.id}`} className="relative group bg-card border border-border rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 block">
              <div className="relative h-44 w-full overflow-hidden">
                <Image src={audio.imageUrl || '/placeholder-16-9.png'} alt={audio.title} fill className="object-cover" sizes="(max-width: 640px) 100vw, 33vw" />
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
              {user?.role === "ADMIN" && (
                <div className="absolute top-2 right-2 flex gap-1" onClick={(e) => e.preventDefault()}>
                  <Button size="sm" variant="outline" onClick={(e) => { e.preventDefault(); handleEdit(audio); }} className="h-8 px-2"><Edit className="h-4 w-4" /></Button>
                  <Button size="sm" variant="destructive" onClick={(e) => { e.preventDefault(); handleDelete(audio); }} className="h-8 px-2"><Trash2 className="h-4 w-4" /></Button>
                </div>
              )}
            </Link>
          ))}
        </div>
      )}

      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent className="max-w-md w-full" aria-describedby={undefined}>
          <DialogHeader><DialogTitle>Create ESL Audio</DialogTitle></DialogHeader>
          <EslAudioForm onSuccess={handleCreateSuccess} onCancel={() => setShowCreate(false)} />
        </DialogContent>
      </Dialog>

      <Dialog open={showEdit} onOpenChange={(v) => { setShowEdit(v); if (!v) setEditAudio(null) }}>
        <DialogContent className="max-w-md w-full" aria-describedby={undefined}>
          <DialogHeader><DialogTitle>Edit ESL Audio</DialogTitle></DialogHeader>
          <EslAudioForm mode="edit" initialValues={editAudio} onSuccess={handleEditSuccess} onCancel={() => { setShowEdit(false); setEditAudio(null) }} />
        </DialogContent>
      </Dialog>

      <Dialog open={showDelete} onOpenChange={setShowDelete}>
        <DialogContent className="max-w-sm w-full" aria-describedby={undefined}>
          <DialogHeader><DialogTitle>Delete ESL Audio</DialogTitle></DialogHeader>
          <div className="py-4 text-sm">Are you sure you want to delete <span className="font-semibold text-foreground">{deleteAudio?.title}</span>?</div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDelete(false)}>Cancel</Button>
            <Button variant="destructive" onClick={confirmDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default EslAudios
