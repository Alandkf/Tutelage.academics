'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Edit, Trash2, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import BASE_URL from '@/app/config/url'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import WritingForm from '@/components/forms/WritingForm'
import PdfModal from '@/components/ui/PdfModal'
import PdfButton from '@/components/ui/PdfButton'
import { usePdfModal } from '@/hooks/usePdfModal'

export default function AdminWritingDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [writing, setWriting] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showEdit, setShowEdit] = useState(false)
  const [showDelete, setShowDelete] = useState(false)

  // PDF modal state using custom hook
  const { isOpen: pdfModalOpen, pdfUrl: pdfModalUrl, title: pdfModalTitle, openPdf, closePdf } = usePdfModal()

  const fetchWriting = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${BASE_URL}/api/writings/${params.id}`, { credentials: 'include' })
      const data = await res.json()
      if (data.success) {
        setWriting(data.data)
      } else {
        toast('Writing not found', { variant: 'destructive' })
        router.push('/admin-dashboard/writings')
      }
    } catch (e) {
      toast('Failed to load writing', { variant: 'destructive' })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (params.id) fetchWriting()
    // eslint-disable-next-line
  }, [params.id])

  const handleEditSuccess = async (values) => {
    try {
      const fd = new FormData()
      fd.append('title', values.title ?? '')
      fd.append('description', values.description ?? '')
      fd.append('content', values.content ?? '')
      fd.append('imageUrl', values.imageUrl ?? '')
      fd.append('contentImageUrl', values.contentImageUrl ?? '')
      fd.append('level', values.level ?? '')
      fd.append('tags', values.tags?.join(',') ?? '')
      if (values.pdf) fd.append('pdfFile', values.pdf)
      if (values.taskPdf) fd.append('taskPdfFile', values.taskPdf)
      
      const res = await fetch(`${BASE_URL}/api/writings/${params.id}`, {
        method: 'PUT',
        credentials: 'include',
        body: fd
      })
      const data = await res.json()
      if (!res.ok || !data.success) throw new Error(data.message)
      setShowEdit(false)
      fetchWriting()
      toast(data.message, { variant: 'success' })
    } catch (e) {
      toast(e.message, { variant: 'destructive' })
    }
  }

  const confirmDelete = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/writings/${params.id}`, { method: 'DELETE', credentials: 'include' })
      const data = await res.json()
      if (!res.ok || !data.success) throw new Error(data.message)
      toast(data.message, { variant: 'destructive' })
      router.push('/admin-dashboard/writings')
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

  if (!writing) return null

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

      <h1 className="text-3xl font-bold text-foreground mb-4">{writing.title}</h1>

      {writing.imageUrl && (
        <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-lg overflow-hidden mb-6">
          <Image src={writing.imageUrl} alt={writing.title} fill className="object-cover" sizes="100vw" priority />
        </div>
      )}

      {writing.description && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p className="text-muted-foreground leading-relaxed">{writing.description}</p>
        </div>
      )}

      {writing.content && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Content/Guidance</h2>
          <div className="p-4 bg-card border rounded-md">
            <p className="text-foreground whitespace-pre-wrap">{writing.content}</p>
          </div>
        </div>
      )}

      {writing.contentImageUrl && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Content Image</h2>
          <div className="relative w-full h-64 rounded-lg overflow-hidden">
            <Image src={writing.contentImageUrl} alt="Content" fill className="object-cover" sizes="100vw" />
          </div>
        </div>
      )}

      {writing.pdf && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">PDF Resource</h3>
          <PdfButton 
            pdfUrl={writing.pdf} 
            onOpen={(url) => openPdf(url, 'Resource PDF')} 
            label="Resource PDF"
          />
        </div>
      )}

      {writing.tasks && writing.tasks.length > 0 && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Task PDFs</h3>
          <div className="flex flex-col gap-2">
            {writing.tasks.map((task, idx) => {
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

      {writing.tags && writing.tags.length > 0 && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {writing.tags.map((tag, i) => (
              <span key={i} className="px-3 py-1 bg-primary/10 text-primary text-sm rounded">{tag}</span>
            ))}
          </div>
        </div>
      )}

      {writing.level && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Level</h3>
          <div className="flex flex-wrap gap-2">
            {(Array.isArray(writing.level) ? writing.level : [writing.level]).map((lvl, i) => (
              <span key={i} className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded">{lvl}</span>
            ))}
          </div>
        </div>
      )}

      <Dialog open={showEdit} onOpenChange={setShowEdit}>
        <DialogContent className="max-w-md w-full" aria-describedby={undefined}>
          <DialogHeader><DialogTitle>Edit Writing</DialogTitle></DialogHeader>
          <WritingForm mode="edit" initialValues={writing} onSuccess={handleEditSuccess} onCancel={() => setShowEdit(false)} />
        </DialogContent>
      </Dialog>

      <Dialog open={showDelete} onOpenChange={setShowDelete}>
        <DialogContent className="max-w-sm w-full" aria-describedby={undefined}>
          <DialogHeader><DialogTitle>Delete Writing</DialogTitle></DialogHeader>
          <div className="py-4 text-sm">Are you sure you want to delete <span className="font-semibold">{writing.title}</span>?</div>
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
