'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Edit, Trash2, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import BASE_URL from '@/app/config/url'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import BlogForm from '@/components/forms/BlogForm'
import PdfModal from '@/components/ui/PdfModal'
import PdfButton from '@/components/ui/PdfButton'
import { usePdfModal } from '@/hooks/usePdfModal'

const SingleBlog = () => {
  const params = useParams()
  const router = useRouter()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showEdit, setShowEdit] = useState(false)
  const [showDelete, setShowDelete] = useState(false)

  // PDF modal state using custom hook
  const { isOpen: pdfModalOpen, pdfUrl: pdfModalUrl, title: pdfModalTitle, openPdf, closePdf } = usePdfModal()

  const fetchBlog = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${BASE_URL}/api/blogs/${params.id}`, { credentials: 'include' })
      const data = await res.json()
      if (data.success) {
        setBlog(data.data)
      } else {
        toast('Blog not found', { variant: 'destructive' })
        router.push('/admin-dashboard/blogs')
      }
    } catch (e) {
      toast('Failed to load blog', { variant: 'destructive' })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (params.id) fetchBlog()
    // eslint-disable-next-line
  }, [params.id])

  const handleEditSuccess = async (formData) => {
    console.log('🎯 handleEditSuccess called (single blog page)');
    console.log('📦 Received formData:', formData);
    
    try {
      const fd = new FormData()
      fd.append('title', formData.title ?? '')
      fd.append('content', formData.content ?? '')
      fd.append('description', formData.description ?? '')
      fd.append('imageRef', formData.imageRef ?? '')
      fd.append('level', formData.level ?? '')
      fd.append('tags', formData.tags?.join(',') ?? '')
      
      // Handle single PDF
      if (formData.pdf && formData.pdf instanceof File) {
        console.log('📄 Adding PDF:', formData.pdf.name);
        fd.append('pdfFile', formData.pdf)
      }
      
      // Handle multiple task PDFs
      if (Array.isArray(formData.taskPdfs) && formData.taskPdfs.length > 0) {
        console.log('📎 Adding task PDFs:', formData.taskPdfs.length);
        formData.taskPdfs.forEach((file, index) => {
          if (file instanceof File) {
            console.log(`📎 Adding task PDF ${index + 1}:`, file.name);
            fd.append('taskPdfs', file)
          }
        })
      }
      
      // Handle deleted task PDF IDs
      if (Array.isArray(formData.deletedTaskPdfIds) && formData.deletedTaskPdfIds.length > 0) {
        console.log('🗑️ Adding deleted IDs:', formData.deletedTaskPdfIds);
        fd.append('deletedTaskPdfIds', JSON.stringify(formData.deletedTaskPdfIds))
      }
      
      console.log('📤 Sending FormData to API...');
      const res = await fetch(`${BASE_URL}/api/blogs/${params.id}`, {
        method: 'PUT',
        credentials: 'include',
        body: fd
      })
      const data = await res.json()
      console.log('📥 API Response:', data);
      
      if (!res.ok || !data.success) throw new Error(data.message)
      setShowEdit(false)
      fetchBlog()
      toast(data.message, { variant: 'success' })
    } catch (e) {
      console.error('❌ Error:', e);
      toast(e.message, { variant: 'destructive' })
    }
  }

  const confirmDelete = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/blogs/${params.id}`, { method: 'DELETE', credentials: 'include' })
      const data = await res.json()
      if (!res.ok || !data.success) throw new Error(data.message)
      toast(data.message, { variant: 'destructive' })
      router.push('/admin-dashboard/blogs')
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

  if (!blog) return null

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

      <h1 className="text-3xl font-bold text-foreground mb-4">{blog.title}</h1>

      {blog.imageRef && (
        <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-lg overflow-hidden mb-6">
          <Image src={blog.imageRef} alt={blog.title} fill className="object-cover" sizes="100vw" priority />
        </div>
      )}

      {blog.description && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p className="text-muted-foreground leading-relaxed">{blog.description}</p>
        </div>
      )}


      {blog.content && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Content</h2>
          <div className="p-4 bg-card border rounded-md">
            <div className="prose prose-lg max-w-none text-foreground whitespace-pre-wrap">{blog.content}</div>
          </div>
        </div>
      )}

      {blog.pdf && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">PDF Resource</h3>
          <PdfButton 
            pdfUrl={blog.pdf} 
            onOpen={(url) => openPdf(url, 'Resource PDF')} 
            label="Resource PDF"
          />
        </div>
      )}

      {/* Display task PDFs from the taskPdfs association */}
      {blog.taskPdfs && blog.taskPdfs.length > 0 && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Task PDFs</h3>
          <div className="flex flex-col gap-2">
            {blog.taskPdfs.map((taskPdf, idx) => (
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

      {blog.tags && blog.tags.length > 0 && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {blog.tags.map((tag, i) => (
              <span key={i} className="px-3 py-1 bg-primary/10 text-primary text-sm rounded">{tag}</span>
            ))}
          </div>
        </div>
      )}

      {blog.level && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Level</h3>
          <div className="flex flex-wrap gap-2">
            {(Array.isArray(blog.level) ? blog.level : [blog.level]).map((lvl, i) => (
              <span key={i} className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded">{lvl}</span>
            ))}
          </div>
        </div>
      )}

      {blog.author && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Author</h3>
          <p className="text-muted-foreground">{blog.author.name} ({blog.author.email})</p>
        </div>
      )}

      {blog.createdAt && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Created At</h3>
          <p className="text-muted-foreground">{new Date(blog.createdAt).toLocaleString()}</p>
        </div>
      )}

      <Dialog open={showEdit} onOpenChange={setShowEdit}>
        <DialogContent className="max-w-md w-full" aria-describedby={undefined}>
          <DialogHeader><DialogTitle>Edit Blog</DialogTitle></DialogHeader>
          <BlogForm mode="edit" initialValues={blog} onSuccess={handleEditSuccess} onCancel={() => setShowEdit(false)} />
        </DialogContent>
      </Dialog>

      <Dialog open={showDelete} onOpenChange={setShowDelete}>
        <DialogContent className="max-w-sm w-full" aria-describedby={undefined}>
          <DialogHeader><DialogTitle>Delete Blog</DialogTitle></DialogHeader>
          <div className="py-4 text-sm">Are you sure you want to delete <span className="font-semibold">{blog.title}</span>?</div>
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

export default SingleBlog