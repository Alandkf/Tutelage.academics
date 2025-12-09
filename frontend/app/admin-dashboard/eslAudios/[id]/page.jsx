'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Edit, Trash2, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import BASE_URL from '@/app/config/url'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import EslAudioForm from '@/components/forms/EslAudioForm'
import CompactAudioPlayer from '@/components/players/CompactAudioPlayer'
import PdfModal from '@/components/ui/PdfModal'
import PdfButton from '@/components/ui/PdfButton'
import { usePdfModal } from '@/hooks/usePdfModal'

export default function AdminEslAudioDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [audio, setAudio] = useState(null)
  console.log('audio, ', audio);
  const [loading, setLoading] = useState(true)
  const [showEdit, setShowEdit] = useState(false)
  const [showDelete, setShowDelete] = useState(false)

  // PDF modal state using custom hook
  const { isOpen: pdfModalOpen, pdfUrl: pdfModalUrl, title: pdfModalTitle, openPdf, closePdf } = usePdfModal()

  const fetchAudio = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${BASE_URL}/api/esl-audios/${params.id}`, { credentials: 'include' })
      const data = await res.json()
      if (data.success) {
        setAudio(data.data)
      } else {
        toast('Audio not found', { variant: 'destructive' })
        router.push('/admin-dashboard/eslAudios')
      }
    } catch (e) {
      toast('Failed to load audio', { variant: 'destructive' })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (params.id) fetchAudio()
    // eslint-disable-next-line
  }, [params.id])

  const handleEditSuccess = async (formData) => {
    console.log('🎯 handleEditSuccess called (single audio page)');
    console.log('📦 Received formData:', formData);
    
    try {
      const fd = new FormData()
      fd.append('title', formData.title ?? '')
      fd.append('imageUrl', formData.imageUrl ?? '')
      fd.append('description', formData.description ?? '')
      fd.append('transcript', formData.transcript ?? '')
      fd.append('audioRef', formData.audioRef ?? '')
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
      const res = await fetch(`${BASE_URL}/api/esl-audios/${params.id}`, {
        method: 'PUT',
        credentials: 'include',
        body: fd
      })
      const data = await res.json()
      if (!res.ok || !data.success) throw new Error(data.message)
      setShowEdit(false)
      fetchAudio()
      toast(data.message, { variant: 'success' })
    } catch (e) {
      toast(e.message, { variant: 'destructive' })
    }
  }

  const confirmDelete = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/esl-audios/${params.id}`, { method: 'DELETE', credentials: 'include' })
      const data = await res.json()
      if (!res.ok || !data.success) throw new Error(data.message)
      toast(data.message, { variant: 'destructive' })
      router.push('/admin-dashboard/eslAudios')
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

  if (!audio) return null

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

      <h1 className="text-3xl font-bold text-foreground mb-4">{audio.title}</h1>

      {audio.imageUrl && (
        <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-lg overflow-hidden mb-6">
          <Image src={audio.imageUrl} alt={audio.title} fill className="object-cover" sizes="100vw" priority />
        </div>
      )}

      {audio.audioRef && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Audio Player</h2>
          <div className="p-4 bg-card border rounded-md">
            <CompactAudioPlayer src={audio.audioRef} youtubeUrl={audio.audioRef} />
          </div>
        </div>
      )}

      {audio.description && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p className="text-muted-foreground leading-relaxed">{audio.description}</p>
        </div>
      )}

      {audio.transcript && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Transcript</h2>
          <div className="p-4 bg-card border rounded-md">
            <p className="text-foreground whitespace-pre-wrap">{audio.transcript}</p>
          </div>
        </div>
      )}

      {audio.pdf && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">PDF Resource</h3>
          <PdfButton 
            pdfUrl={audio.pdf} 
            onOpen={(url) => openPdf(url, 'Resource PDF')} 
            label="Resource PDF"
          />
        </div>
      )}

      {/* Display task PDFs from taskPdfs association */}
      {audio.taskPdfs && audio.taskPdfs.length > 0 && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Task PDFs</h3>
          <div className="flex flex-col gap-2">
            {audio.taskPdfs.map((taskPdf, idx) => (
              <PdfButton 
                key={taskPdf.id || idx}
                pdfUrl={taskPdf.filePath} 
                onOpen={(url) => openPdf(url, taskPdf.fileName || `Task PDF ${idx + 1}`)} 
                label={taskPdf.fileName || `Task PDF ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      )}

      {audio.tags && audio.tags.length > 0 && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {audio.tags.map((tag, i) => (
              <span key={i} className="px-3 py-1 bg-primary/10 text-primary text-sm rounded">{tag}</span>
            ))}
          </div>
        </div>
      )}

      {audio.level && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Level</h3>
          <div className="flex flex-wrap gap-2">
            {(Array.isArray(audio.level) ? audio.level : [audio.level]).map((lvl, i) => (
              <span key={i} className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded">{lvl}</span>
            ))}
          </div>
        </div>
      )}

      {audio.metrics && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Analytics</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-card border rounded">
              <div className="text-2xl font-bold">{audio.metrics.views || 0}</div>
              <div className="text-sm text-muted-foreground">Views</div>
            </div>
            <div className="p-4 bg-card border rounded">
              <div className="text-2xl font-bold">{audio.metrics.plays || 0}</div>
              <div className="text-sm text-muted-foreground">Plays</div>
            </div>
            <div className="p-4 bg-card border rounded">
              <div className="text-2xl font-bold">{audio.metrics.downloads || 0}</div>
              <div className="text-sm text-muted-foreground">Downloads</div>
            </div>
          </div>
        </div>
      )}

      <Dialog open={showEdit} onOpenChange={setShowEdit}>
        <DialogContent className="max-w-md w-full" aria-describedby={undefined}>
          <DialogHeader><DialogTitle>Edit ESL Audio</DialogTitle></DialogHeader>
          <EslAudioForm mode="edit" initialValues={audio} onSuccess={handleEditSuccess} onCancel={() => setShowEdit(false)} />
        </DialogContent>
      </Dialog>

      <Dialog open={showDelete} onOpenChange={setShowDelete}>
        <DialogContent className="max-w-sm w-full" aria-describedby={undefined}>
          <DialogHeader><DialogTitle>Delete ESL Audio</DialogTitle></DialogHeader>
          <div className="py-4 text-sm">Are you sure you want to delete <span className="font-semibold">{audio.title}</span>?</div>
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
