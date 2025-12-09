'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Edit, Trash2, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import BASE_URL from '@/app/config/url'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import StoryForm from '@/components/forms/StoryForm'
import CompactAudioPlayer from '@/components/players/CompactAudioPlayer'
import PdfModal from '@/components/ui/PdfModal'
import PdfButton from '@/components/ui/PdfButton'
import { usePdfModal } from '@/hooks/usePdfModal'

export default function AdminStoryDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [story, setStory] = useState(null)
  console.log('story, ', story);
  const [loading, setLoading] = useState(true)
  const [showEdit, setShowEdit] = useState(false)
  const [showDelete, setShowDelete] = useState(false)

  // PDF modal state using custom hook
  const { isOpen: pdfModalOpen, pdfUrl: pdfModalUrl, title: pdfModalTitle, openPdf, closePdf } = usePdfModal()

  const fetchStory = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${BASE_URL}/api/stories/${params.id}`, { credentials: 'include' })
      const data = await res.json()
      if (data.success) {
        setStory(data.data)
      } else {
        toast('Story not found', { variant: 'destructive' })
        router.push('/admin-dashboard/stories')
      }
    } catch (e) {
      toast('Failed to load story', { variant: 'destructive' })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (params.id) fetchStory()
    // eslint-disable-next-line
  }, [params.id])

  const handleEditSuccess = async (formData) => {
    console.log('🎯 handleEditSuccess called (single story page)');
    console.log('📦 Received formData:', formData);
    
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
      const res = await fetch(`${BASE_URL}/api/stories/${params.id}`, {
        method: 'PUT',
        credentials: 'include',
        body: fd
      })
      const data = await res.json()
      if (!res.ok || !data.success) throw new Error(data.message)
      setShowEdit(false)
      fetchStory()
      toast(data.message, { variant: 'success' })
    } catch (e) {
      toast(e.message, { variant: 'destructive' })
    }
  }

  const confirmDelete = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/stories/${params.id}`, { method: 'DELETE', credentials: 'include' })
      const data = await res.json()
      if (!res.ok || !data.success) throw new Error(data.message)
      toast(data.message, { variant: 'destructive' })
      router.push('/admin-dashboard/stories')
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

  if (!story) return null

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

      <h1 className="text-3xl font-bold text-foreground mb-4">{story.title}</h1>

      {story.imageUrl && (
        <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-lg overflow-hidden mb-6">
          <Image src={story.imageUrl} alt={story.title} fill className="object-cover" sizes="100vw" priority />
        </div>
      )}

      {story.description && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p className="text-muted-foreground leading-relaxed">{story.description}</p>
        </div>
      )}

      {story.contentText && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Story Content</h2>
          <div className="p-4 bg-card border rounded-md">
            <div className="prose prose-lg max-w-none text-foreground whitespace-pre-wrap">{story.contentText}</div>
          </div>
        </div>
      )}

      {story.wordCount && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Word Count</h3>
          <p className="text-muted-foreground">{story.wordCount} words</p>
        </div>
      )}

      {story.audioRef && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Audio Accompaniment</h3>
          <div className="p-4 bg-card border rounded-md">
            <CompactAudioPlayer src={story.audioRef} youtubeUrl={story.audioRef} />
          </div>
        </div>
      )}

      {story.pdf && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">PDF Resource</h3>
          <PdfButton 
            pdfUrl={story.pdf} 
            onOpen={(url) => openPdf(url, 'Resource PDF')} 
            label="Resource PDF"
          />
        </div>
      )}

      {/* Display task PDFs from taskPdfs association */}
      {story.taskPdfs && story.taskPdfs.length > 0 && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Task PDFs</h3>
          <div className="flex flex-col gap-2">
            {story.taskPdfs.map((taskPdf, idx) => (
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

      {story.tags && story.tags.length > 0 && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {story.tags.map((tag, i) => (
              <span key={i} className="px-3 py-1 bg-primary/10 text-primary text-sm rounded">{tag}</span>
            ))}
          </div>
        </div>
      )}

      {story.author && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Author</h3>
          <p className="text-muted-foreground">{story.author.name} ({story.author.email})</p>
        </div>
      )}

      {story.createdAt && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Created At</h3>
          <p className="text-muted-foreground">{new Date(story.createdAt).toLocaleString()}</p>
        </div>
      )}

      <Dialog open={showEdit} onOpenChange={setShowEdit}>
        <DialogContent className="max-w-md w-full" aria-describedby={undefined}>
          <DialogHeader><DialogTitle>Edit Story</DialogTitle></DialogHeader>
          <StoryForm mode="edit" initialValues={story} onSuccess={handleEditSuccess} onCancel={() => setShowEdit(false)} />
        </DialogContent>
      </Dialog>

      <Dialog open={showDelete} onOpenChange={setShowDelete}>
        <DialogContent className="max-w-sm w-full" aria-describedby={undefined}>
          <DialogHeader><DialogTitle>Delete Story</DialogTitle></DialogHeader>
          <div className="py-4 text-sm">Are you sure you want to delete <span className="font-semibold">{story.title}</span>?</div>
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
