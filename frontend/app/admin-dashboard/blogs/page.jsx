"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { BlogCard } from "@/components/admin/blogs/BlogCard"
import BlogForm from "@/components/forms/BlogForm"
import { Edit, Plus, RefreshCw, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { useAuth } from "@/components/AuthContext"
import { useInfiniteScroll } from "@/app/config/useInfiniteScroll"
import BASE_URL from "@/app/config/url"

export default function BlogsPage() {
  const [showCreate, setShowCreate] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [editBlog, setEditBlog] = useState(null)
  const [showDelete, setShowDelete] = useState(false)
  const [deleteBlog, setDeleteBlog] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const { user } = useAuth()
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [nextCursor, setNextCursor] = useState(null)
  const [error, setError] = useState(null)

  // Fetch blogs with cursor-based pagination
  const fetchBlogs = async (reset = false) => {
    setLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams()
      params.append("limit", 9)
      if (searchTerm) params.append("search", searchTerm)
      if (!reset && nextCursor) params.append("cursor", nextCursor)
      const res = await fetch(`${BASE_URL}/api/blogs?${params.toString()}`, { credentials: "include" })
      const data = await res.json()
      if (!data.success) throw new Error(data.message || "Failed to fetch blogs")
      setBlogs(prev => reset ? data.blogs : [...prev, ...data.blogs])
      setHasMore(data.hasMore)
      setNextCursor(data.nextCursor)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  // Reset and fetch blogs (for search/refresh)
  const resetAndFetch = () => {
    setBlogs([])
    setNextCursor(null)
    setHasMore(true)
    fetchBlogs(true)
  }

  // Fetch on mount and when searchTerm changes
  useEffect(() => {
    resetAndFetch()
    // eslint-disable-next-line
  }, [searchTerm])

  // Reusable infinite scroll observer
  const lastBlogRef = useInfiniteScroll({ loading, hasMore, onLoadMore: fetchBlogs })

  // Handlers
  const handleCreateSuccess = async (formData) => {
    try {
      const fd = new FormData()
      fd.append('title', formData.title ?? '')
      fd.append('content', formData.content ?? '')
      fd.append('description', formData.description ?? '')
      fd.append('imageRef', formData.imageRef ?? '')
      fd.append('level', formData.level ?? '')
      fd.append('tags', formData.tags?.join(',') ?? '')
      if (formData.pdf) fd.append('pdfFile', formData.pdf)
      if (formData.taskPdf) fd.append('taskPdfFile', formData.taskPdf)

      const res = await fetch(`${BASE_URL}/api/blogs`, {
        method: "POST",
        credentials: "include",
        body: fd
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

  //EDITTING
  const handleEdit = (editBlog) => {
    setEditBlog(editBlog)
    setShowEdit(true)
  }
 

  
  const handleDelete = (blog) => {
    setDeleteBlog(blog)
    setShowDelete(true)
  }
  const confirmDelete = async () => {
    if (!deleteBlog) return
    try {
      const res = await fetch(`${BASE_URL}/api/blogs/${deleteBlog.id}`, {
        method: "DELETE",
        credentials: "include"
      })
      const data = await res.json()
      if (!res.ok || !data.success) throw new Error(data.message)
      setShowDelete(false)
      setDeleteBlog(null)
      resetAndFetch()
      toast(data.message, { variant: "destructive" })
    } catch (e) {
      toast(e.message, { variant: "destructive" })
    }
  }

  return (
    <div className="mx-auto w-full">
      <div className="flex flex-row justify-between gap-4 mb-4">
        <h1 className="text-2xl font-bold text-foreground">Blogs</h1>
        {user?.role === "ADMIN" && (
          <Button onClick={() => setShowCreate(true)} className="gap-2 ">
            <Plus className="h-5 w-5" />
            Create Blog
          </Button>
        )}
      </div>
      <div className="mb-4 flex items-center justify-between gap-2">
        <Input
          placeholder="Search blogs..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="max-w-xs"
        />
        <Button
          variant="ghost"
          size="icon"
          onClick={resetAndFetch}
          title="Refresh blogs"
          className="ml-2"
          disabled={loading}
        >
          <RefreshCw className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading && blogs.length === 0 ? (
          <div className="col-span-full text-center text-muted-foreground py-12">Loading blogs...</div>
        ) : blogs.length === 0 ? (
          <div className="col-span-full text-center text-muted-foreground py-12">No blogs found.</div>
        ) : (
          blogs.map((blog, idx) => {
            const isLast = idx === blogs.length - 1
            return (
              <div key={idx} className="relative group" ref={isLast ? lastBlogRef : null}>
                <BlogCard
                  {...blog}
                  author={blog.author?.name || ''}
                  authorEmail={blog.author?.email || ''}
                />
                {user?.role === "ADMIN" && (
                  <div className="absolute top-2 right-2 flex gap-1 ">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(blog)}><Edit className="h-4 w-4" /></Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(blog)}><Trash2 className="h-4 w-4" /></Button>
                  </div>
                )}
              </div>
            )
          })
        )}
      </div>
      {/* Show More fallback button */}
      {hasMore && blogs.length !== 0 && !loading && (
        <div className="flex justify-center mt-8 mb-4">
          <Button variant="outline" onClick={() => fetchBlogs()}>Show More</Button>
        </div>
      )}
      {/* Loading indicator for more fetches */}
      {loading && blogs.length > 0 && (
        <div className="flex justify-center p-4 mt-4">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full border-2 border-t-transparent border-blue-500 animate-spin"></div>
            <span className="text-muted-foreground text-sm">Loading more...</span>
          </div>
        </div>
      )}
      {/* Create Blog Dialog */}
      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent className="max-w-md w-full">
          <DialogHeader>
            <DialogTitle>Create Blog</DialogTitle>
          </DialogHeader>
          <BlogForm onSuccess={handleCreateSuccess} onCancel={() => setShowCreate(false)} />
        </DialogContent>
      </Dialog>
      {/* Edit Blog Dialog */}
      <Dialog open={showEdit} onOpenChange={(v) => { setShowEdit(v); if (!v) setEditBlog(null) }}>
        <DialogContent className="max-w-md w-full">
          <DialogHeader>
            <DialogTitle>Edit Blog</DialogTitle>
          </DialogHeader>
          <BlogForm
            mode="edit"
            initialValues={editBlog}
            onSuccess={async (formData) => {
              if (!editBlog) return
              try {
                const fd = new FormData()
                fd.append('title', formData.title ?? '')
                fd.append('content', formData.content ?? '')
                fd.append('description', formData.description ?? '')
                fd.append('imageRef', formData.imageRef ?? '')
                fd.append('level', formData.level ?? '')
                fd.append('tags', formData.tags?.join(',') ?? '')
                if (formData.pdf) fd.append('pdfFile', formData.pdf)
                if (formData.taskPdf) fd.append('taskPdfFile', formData.taskPdf)

                const res = await fetch(`${BASE_URL}/api/blogs/${editBlog.id}`, {
                  method: "PUT",
                  credentials: "include",
                  body: fd
                })
                const data = await res.json()
                if (!res.ok || !data.success) throw new Error(data.message)
                setShowEdit(false)
                setEditBlog(null)
                resetAndFetch()
                toast(data.message, { variant: "success" })
              } catch (e) {
                toast(e.message, { variant: "destructive" })
              }
            }}
            onCancel={() => { setShowEdit(false); setEditBlog(null) }}
          />
        </DialogContent>
      </Dialog>
      {/* Delete Confirmation Dialog */}
      <Dialog open={showDelete} onOpenChange={setShowDelete}>
        <DialogContent className="max-w-sm w-full">
          <DialogHeader>
            <DialogTitle>Delete Blog</DialogTitle>
          </DialogHeader>
          <div className="py-4 text-sm">
            Are you sure you want to delete <span className="font-semibold text-foreground">{deleteBlog?.title}</span>?
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







