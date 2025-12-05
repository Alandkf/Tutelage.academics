'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Edit, Trash2, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import BASE_URL from '@/app/config/url'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import AudioForm from '@/components/forms/AudioForm'
import CompactAudioPlayer from '@/components/players/CompactAudioPlayer'
import PdfModal from '@/components/ui/PdfModal'
import PdfButton from '@/components/ui/PdfButton'
import { usePdfModal } from '@/hooks/usePdfModal'

export default function AdminListeningDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [listening, setListening] = useState(null)  
  const [loading, setLoading] = useState(true)
  const [showEdit, setShowEdit] = useState(false)
  const [showDelete, setShowDelete] = useState(false)

  // PDF modal state using custom hook
  const { isOpen: pdfModalOpen, pdfUrl: pdfModalUrl, title: pdfModalTitle, openPdf, closePdf } = usePdfModal()

  const fetchListening = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${BASE_URL}/api/audios/${params.id}`, { credentials: 'include' })
      const data = await res.json()
      if (data.success) {
        setListening(data.data)
      } else {
        toast('Listening not found', { variant: 'destructive' })
        router.push('/admin-dashboard/listenings')
      }
    } catch (e) {
      toast('Failed to load listening', { variant: 'destructive' })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (params.id) fetchListening()
    // eslint-disable-next-line
  }, [params.id])

  const handleEditSuccess = async (formData) => {
    try {
      // FormData is already prepared by AudioForm with all fields including tags
      const res = await fetch(`${BASE_URL}/api/audios/${params.id}`, {
        method: 'PUT',
        credentials: 'include',
        body: formData
      })
      const data = await res.json()
      if (!res.ok || !data.success) throw new Error(data.message)
      setShowEdit(false)
      fetchListening()
      toast(data.message, { variant: 'success' })
    } catch (e) {
      toast(e.message, { variant: 'destructive' })
    }
  }

  const confirmDelete = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/audios/${params.id}`, { method: 'DELETE', credentials: 'include' })
      const data = await res.json()
      if (!res.ok || !data.success) throw new Error(data.message)
      toast(data.message, { variant: 'destructive' })
      router.push('/admin-dashboard/listenings')
    } catch (e) {
      toast(e.message, { variant: 'destructive' })
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    )
  }

  if (!listening) return null

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <Button variant="outline" onClick={() => router.back()} className="gap-2">
          <ArrowLeft className="w-4 h-4" />Back
        </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setShowEdit(true)} className="gap-2">
              <Edit className="w-4 h-4" />Edit
            </Button>
            <Button variant="destructive" onClick={() => setShowDelete(true)} className="gap-2">
              <Trash2 className="w-4 h-4" />Delete
            </Button>
          </div>
      </div>

      <h1 className="text-3xl font-bold text-foreground mb-4">{listening.title}</h1>

      {listening.imageUrl && (
        <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-lg overflow-hidden mb-6">
          <Image src={listening.imageUrl} alt={listening.title} fill className="object-cover" sizes="100vw" priority />
        </div>
      )}

      {listening.audioRef && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Audio Player</h2>
          <div className="p-4 bg-card border rounded-md">
            <CompactAudioPlayer src={listening.audioRef} youtubeUrl={listening.audioRef} />
          </div>
        </div>
      )}

      {listening.description && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p className="text-muted-foreground leading-relaxed">{listening.description}</p>
        </div>
      )}

      {listening.transcript && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Transcript</h2>
          <div className="p-4 bg-card border rounded-md">
            <p className="text-foreground whitespace-pre-wrap">{listening.transcript}</p>
          </div>
        </div>
      )}

      {listening.pdf && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">PDF Resource</h3>
          <PdfButton 
            pdfUrl={listening.pdf} 
            onOpen={(url) => openPdf(url, 'Resource PDF')} 
            label="Resource PDF"
          />
        </div>
      )}

      {listening.tasks && listening.tasks.length > 0 && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Task PDFs</h3>
          <div className="flex flex-col gap-2">
            {listening.tasks.map((task, idx) => {
              const taskPdf = task?.filePath
              if (!taskPdf) return null
              return (
                <PdfButton 
                  key={idx}
                  pdfUrl={taskPdf} 
                  onOpen={(url) => openPdf(url, task?.fileName || `Task PDF ${idx + 1}`)} 
                  label={task?.fileName || `Task PDF ${idx + 1}`}
                />
              )
            })}
          </div>
        </div>
      )}

      {listening.tags && listening.tags.length > 0 && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {listening.tags.map((tag, i) => (
              <span key={i} className="px-3 py-1 bg-primary/10 text-primary text-sm rounded">{tag}</span>
            ))}
          </div>
        </div>
      )}

      {listening.level && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Level</h3>
          <div className="flex flex-wrap gap-2">
            {(Array.isArray(listening.level) ? listening.level : [listening.level]).map((lvl, i) => (
              <span key={i} className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded">{lvl}</span>
            ))}
          </div>
        </div>
      )}

      {listening.author && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Author</h3>
          <p className="text-muted-foreground">{listening.author.name} ({listening.author.email})</p>
        </div>
      )}

      <Dialog open={showEdit} onOpenChange={setShowEdit}>
        <DialogContent className="max-w-md w-full" aria-describedby={undefined}>
          <DialogHeader><DialogTitle>Edit Listening</DialogTitle></DialogHeader>
          <AudioForm mode="edit" initialValues={listening} onSuccess={handleEditSuccess} onCancel={() => setShowEdit(false)} />
        </DialogContent>
      </Dialog>

      <Dialog open={showDelete} onOpenChange={setShowDelete}>
        <DialogContent className="max-w-sm w-full" aria-describedby={undefined}>
          <DialogHeader><DialogTitle>Delete Listening</DialogTitle></DialogHeader>
          <div className="py-4 text-sm">Are you sure you want to delete <span className="font-semibold">{listening.title}</span>?</div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDelete(false)}>Cancel</Button>
            <Button variant="destructive" onClick={confirmDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reusable PDF Modal */}
      <PdfModal 
        isOpen={pdfModalOpen} 
        onClose={closePdf} 
        pdfUrl={pdfModalUrl} 
        title={pdfModalTitle}
      />
    </div>
  )
}
