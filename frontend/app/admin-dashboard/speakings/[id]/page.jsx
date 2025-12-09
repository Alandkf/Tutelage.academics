'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Edit, Trash2, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import BASE_URL from '@/app/config/url'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import VideoForm from "@/components/forms/VideoForm"
import PdfModal from '@/components/ui/PdfModal'
import PdfButton from '@/components/ui/PdfButton'
import { usePdfModal } from '@/hooks/usePdfModal'

// Helper: extract YouTube ID and build thumbnail/embed URLs
const parseYouTubeId = (url) => {
  if (!url) return null
  try {
    const m = url.match(/(?:v=|youtu\.be\/|embed\/)([a-zA-Z0-9_-]{6,})/)
    return m && m[1] ? m[1] : null
  } catch {
    return null
  }
}

const getYouTubeEmbedUrl = (url) => {
  const id = parseYouTubeId(url)
  return id ? `https://www.youtube.com/embed/${id}` : null
}

const getYouTubeThumbnail = (url, preferMax = false) => {
  const id = parseYouTubeId(url)
  if (!id) return null
  return preferMax
    ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg`
    : `https://img.youtube.com/vi/${id}/hqdefault.jpg`
}

export default function AdminSpeakingDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [speaking, setSpeaking] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showEdit, setShowEdit] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  
  // chosen thumbnail to display (after probing maxres/hq)
  const [displayThumb, setDisplayThumb] = useState(null)

  // PDF modal state using custom hook
  const { isOpen: pdfModalOpen, pdfUrl: pdfModalUrl, title: pdfModalTitle, openPdf, closePdf } = usePdfModal()

  const fetchSpeaking = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${BASE_URL}/api/speakings/${params.id}`, { credentials: 'include' })
      const data = await res.json()
      if (data.success) {
        setSpeaking(data.data)
      } else {
        toast('Speaking not found', { variant: 'destructive' })
        router.push('/admin-dashboard/speakings')
      }
    } catch (e) {
      toast('Failed to load speaking', { variant: 'destructive' })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (params.id) fetchSpeaking()
    // eslint-disable-next-line
  }, [params.id])

  // Probe for the best available YouTube thumbnail after speaking loads
  useEffect(() => {
    if (!speaking?.videoRef) return

    const id = parseYouTubeId(speaking.videoRef)
    if (!id) {
      setDisplayThumb(null)
      return
    }

    let cancelled = false
    const maxUrl = `https://img.youtube.com/vi/${id}/maxresdefault.jpg`
    const hqUrl = `https://img.youtube.com/vi/${id}/hqdefault.jpg`

    // Try maxres first
    const img = new window.Image()
    img.onload = () => { if (!cancelled) setDisplayThumb(maxUrl) }
    img.onerror = () => {
      // On error try hq
      const img2 = new window.Image()
      img2.onload = () => { if (!cancelled) setDisplayThumb(hqUrl) }
      img2.onerror = () => { if (!cancelled) setDisplayThumb(null) }
      img2.src = hqUrl
    }
    img.src = maxUrl

    return () => { cancelled = true }
  }, [speaking])

  const handleEditSuccess = async (formData) => {
    console.log('🎯 handleEditSuccess called (single speaking page)');
    console.log('📦 Received formData:', formData);
    
    try {
      const fd = new FormData()
      fd.append('title', formData.title ?? '')
      fd.append('description', formData.description ?? '')
      fd.append('content', formData.content ?? '')
      fd.append('transcript', formData.transcript ?? '')
      fd.append('videoRef', formData.videoRef ?? '')
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
      const res = await fetch(`${BASE_URL}/api/speakings/${params.id}`, {
        method: 'PUT',
        credentials: 'include',
        body: fd
      })
      const data = await res.json()
      if (!res.ok || !data.success) throw new Error(data.message)
      setShowEdit(false)
      fetchSpeaking()
      toast(data.message, { variant: 'success' })
    } catch (e) {
      toast(e.message, { variant: 'destructive' })
    }
  }

  const confirmDelete = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/speakings/${params.id}`, { method: 'DELETE', credentials: 'include' })
      const data = await res.json()
      if (!res.ok || !data.success) throw new Error(data.message)
      toast(data.message, { variant: 'destructive' })
      router.push('/admin-dashboard/speakings')
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

  if (!speaking) return null

  const embedUrl = getYouTubeEmbedUrl(speaking.videoRef)
  const thumb = displayThumb || getYouTubeThumbnail(speaking.videoRef)

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

      <h1 className="text-3xl font-bold text-foreground mb-4">{speaking.title}</h1>

      {thumb && (
        <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-lg overflow-hidden mb-6">
          <Image 
            src={thumb} 
            alt={speaking.title} 
            fill 
            className="object-cover" 
            sizes="100vw" 
            priority 
            quality={100}
          />
        </div>
      )}

      {embedUrl && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Video</h2>
          <div className="aspect-video w-full">
            <iframe 
              src={embedUrl}
              className="w-full h-full rounded-lg border-0"
              allowFullScreen
              title={speaking.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          </div>
        </div>
      )}

      {speaking.description && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p className="text-muted-foreground leading-relaxed">{speaking.description}</p>
        </div>
      )}

      {speaking.content && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Content</h2>
          <div className="p-4 bg-card border rounded-md">
            <p className="text-foreground whitespace-pre-wrap">{speaking.content}</p>
          </div>
        </div>
      )}

      {speaking.transcript && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Transcript</h2>
          <div className="p-4 bg-card border rounded-md">
            <p className="text-foreground whitespace-pre-wrap">{speaking.transcript}</p>
          </div>
        </div>
      )}

      {speaking.pdf && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">PDF Resource</h3>
          <PdfButton 
            pdfUrl={speaking.pdf} 
            onOpen={(url) => openPdf(url, 'Resource PDF')} 
            label="Resource PDF"
          />
        </div>
      )}

      {/* Display task PDFs from taskPdfs association */}
      {speaking.taskPdfs && speaking.taskPdfs.length > 0 && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Task PDFs</h3>
          <div className="flex flex-col gap-2">
            {speaking.taskPdfs.map((taskPdf, idx) => (
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

      {speaking.tags && speaking.tags.length > 0 && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {speaking.tags.map((tag, i) => (
              <span key={i} className="px-3 py-1 bg-primary/10 text-primary text-sm rounded">{tag}</span>
            ))}
          </div>
        </div>
      )}

      {speaking.level && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Level</h3>
          <div className="flex flex-wrap gap-2">
            {(Array.isArray(speaking.level) ? speaking.level : [speaking.level]).map((lvl, i) => (
              <span key={i} className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded">{lvl}</span>
            ))}
          </div>
        </div>
      )}

      {speaking.author && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Author</h3>
          <p className="text-muted-foreground">{speaking.author.name} ({speaking.author.email})</p>
        </div>
      )}

      <Dialog open={showEdit} onOpenChange={setShowEdit}>
        <DialogContent className="max-w-md w-full" aria-describedby={undefined}>
          <DialogHeader><DialogTitle>Edit Speaking</DialogTitle></DialogHeader>
          <VideoForm mode="edit" initialValues={speaking} onSuccess={handleEditSuccess} onCancel={() => setShowEdit(false)} />
        </DialogContent>
      </Dialog>

      <Dialog open={showDelete} onOpenChange={setShowDelete}>
        <DialogContent className="max-w-sm w-full" aria-describedby={undefined}>
          <DialogHeader><DialogTitle>Delete Speaking</DialogTitle></DialogHeader>
          <div className="py-4 text-sm">Are you sure you want to delete <span className="font-semibold">{speaking.title}</span>?</div>
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
