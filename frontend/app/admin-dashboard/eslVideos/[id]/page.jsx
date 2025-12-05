'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Edit, Trash2, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import BASE_URL from '@/app/config/url'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import EslVideoForm from '@/components/forms/EslVideoForm'
import PdfModal from '@/components/ui/PdfModal'
import PdfButton from '@/components/ui/PdfButton'
import { usePdfModal } from '@/hooks/usePdfModal'

export default function AdminEslVideoDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [video, setVideo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showEdit, setShowEdit] = useState(false)
  const [showDelete, setShowDelete] = useState(false)

  // PDF modal state using custom hook
  const { isOpen: pdfModalOpen, pdfUrl: pdfModalUrl, title: pdfModalTitle, openPdf, closePdf } = usePdfModal()

  const fetchVideo = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${BASE_URL}/api/esl-videos/${params.id}`, { credentials: 'include' })
      const data = await res.json()
      if (data.success) {
        setVideo(data.data)
      } else {
        toast('Video not found', { variant: 'destructive' })
        router.push('/admin-dashboard/eslVideos')
      }
    } catch (e) {
      toast('Failed to load video', { variant: 'destructive' })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (params.id) fetchVideo()
    // eslint-disable-next-line
  }, [params.id])

  const handleEditSuccess = async (values) => {
    try {
      const fd = new FormData()
      fd.append('title', values.title ?? '')
      fd.append('videoRef', values.videoRef ?? '')
      fd.append('description', values.description ?? '')
      fd.append('level', values.level ?? '')
      fd.append('tags', values.tags?.join(',') ?? '')
      if (values.pdf) fd.append('pdfFile', values.pdf)
      if (values.taskPdf) fd.append('taskPdfFile', values.taskPdf)
      
      const res = await fetch(`${BASE_URL}/api/esl-videos/${params.id}`, {
        method: 'PUT',
        credentials: 'include',
        body: fd
      })
      const data = await res.json()
      if (!res.ok || !data.success) throw new Error(data.message)
      setShowEdit(false)
      fetchVideo()
      toast(data.message, { variant: 'success' })
    } catch (e) {
      toast(e.message, { variant: 'destructive' })
    }
  }

  const confirmDelete = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/esl-videos/${params.id}`, { method: 'DELETE', credentials: 'include' })
      const data = await res.json()
      if (!res.ok || !data.success) throw new Error(data.message)
      toast(data.message, { variant: 'destructive' })
      router.push('/admin-dashboard/eslVideos')
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

  if (!video) return null

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

      <h1 className="text-3xl font-bold text-foreground mb-4">{video.title}</h1>

      {video.videoRef && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Video</h2>
          <div className="aspect-video w-full">
            <iframe 
              src={video.videoRef.replace('youtu.be/', 'youtube.com/embed/').replace('watch?v=', 'embed/')}
              className="w-full h-full rounded-lg"
              allowFullScreen
              title={video.title}
            />
          </div>
        </div>
      )}

      {video.description && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p className="text-muted-foreground leading-relaxed">{video.description}</p>
        </div>
      )}

      {video.transcript && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Transcript</h2>
          <div className="p-4 bg-card border rounded-md">
            <p className="text-foreground whitespace-pre-wrap leading-relaxed">{video.transcript}</p>
          </div>
        </div>
      )}

      {video.pdf && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">PDF Resource</h3>
          <PdfButton 
            pdfUrl={video.pdf} 
            onOpen={(url) => openPdf(url, 'Resource PDF')} 
            label="Resource PDF"
          />
        </div>
      )}

      {video.tasks && video.tasks.length > 0 && (
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Task PDFs</h3>
                <div className="flex flex-col gap-2">
                  {video.tasks.map((task, idx) => {
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

      {video.tags && video.tags.length > 0 && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {video.tags.map((tag, i) => (
              <span key={i} className="px-3 py-1 bg-primary/10 text-primary text-sm rounded">{tag}</span>
            ))}
          </div>
        </div>
      )}

      {video.level && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Level</h3>
          <div className="flex flex-wrap gap-2">
            {(Array.isArray(video.level) ? video.level : [video.level]).map((lvl, i) => (
              <span key={i} className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded">{lvl}</span>
            ))}
          </div>
        </div>
      )}

      {video.metrics && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Analytics</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-card border rounded">
              <div className="text-2xl font-bold">{video.metrics.views || 0}</div>
              <div className="text-sm text-muted-foreground">Views</div>
            </div>
            <div className="p-4 bg-card border rounded">
              <div className="text-2xl font-bold">{video.metrics.plays || 0}</div>
              <div className="text-sm text-muted-foreground">Plays</div>
            </div>
            <div className="p-4 bg-card border rounded">
              <div className="text-2xl font-bold">{video.metrics.downloads || 0}</div>
              <div className="text-sm text-muted-foreground">Downloads</div>
            </div>
          </div>
        </div>
      )}

      <Dialog open={showEdit} onOpenChange={setShowEdit}>
        <DialogContent className="max-w-md w-full" aria-describedby={undefined}>
          <DialogHeader><DialogTitle>Edit ESL Video</DialogTitle></DialogHeader>
          <EslVideoForm mode="edit" initialValues={video} onSuccess={handleEditSuccess} onCancel={() => setShowEdit(false)} />
        </DialogContent>
      </Dialog>

      <Dialog open={showDelete} onOpenChange={setShowDelete}>
        <DialogContent className="max-w-sm w-full" aria-describedby={undefined}>
          <DialogHeader><DialogTitle>Delete ESL Video</DialogTitle></DialogHeader>
          <div className="py-4 text-sm">Are you sure you want to delete <span className="font-semibold">{video.title}</span>?</div>
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
