"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { BlogCard } from "@/components/blogs/BlogCard"
import BlogForm from "@/components/forms/BlogForm"
import { Plus } from "lucide-react"
import { toast } from "sonner"



export default function BlogsPage() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [showCreate, setShowCreate] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [editBlog, setEditBlog] = useState(null)
  const [showDelete, setShowDelete] = useState(false)
  const [deleteBlog, setDeleteBlog] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentUser, setCurrentUser] = useState({ role: "ADMIN" }) 
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)

  // Fetch blogs (mocked for now, ready for backend integration)
  useEffect(() => {
    setLoading(true)
    fetch("/api/blogs")
      .then(res => res.json())
      .then(data => {
        setBlogs(data.data || [])
        setHasMore(false) // No real pagination yet
      })
      .catch(() => setBlogs([]))
      .finally(() => setLoading(false))
  }, [])

  // Search filter
  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.content.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Handlers
  const handleCreateSuccess = (newBlog) => {
    setShowCreate(false)
    setBlogs([newBlog, ...blogs])
    toast("Blog created successfully", { variant: "success" })
  }
  const handleEdit = (blog) => {
    setEditBlog(blog)
    setShowEdit(true)
  }
  const handleEditSuccess = (updatedBlog) => {
    setShowEdit(false)
    setEditBlog(null)
    setBlogs(blogs.map(b => b.id === updatedBlog.id ? updatedBlog : b))
    toast("Blog updated successfully", { variant: "success" })
  }
  const handleDelete = (blog) => {
    setDeleteBlog(blog)
    setShowDelete(true)
  }
  const confirmDelete = () => {
    setBlogs(blogs.filter(b => b.id !== deleteBlog.id))
    setShowDelete(false)
    setDeleteBlog(null)
    toast("Blog deleted successfully", { variant: "destructive" })
  }

  return (
    <div className="max-w-5xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <h1 className="text-2xl font-bold text-foreground">Blogs</h1>
        {currentUser?.role === "ADMIN" && (
          <Button onClick={() => setShowCreate(true)} className="gap-2">
            <Plus className="h-5 w-5" />
            Create Blog
          </Button>
        )}
      </div>
      <div className="mb-4 flex gap-2">
        <Input
          placeholder="Search blogs..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="max-w-xs"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full text-center text-muted-foreground py-12">Loading blogs...</div>
        ) : filteredBlogs.length === 0 ? (
          <div className="col-span-full text-center text-muted-foreground py-12">No blogs found.</div>
        ) : (
          filteredBlogs.map(blog => (
            <div key={blog.id} className="relative group">
              <BlogCard {...blog} />
              {currentUser?.role === "ADMIN" && (
                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(blog)}>Edit</Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(blog)}>Delete</Button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
      {/* Pagination (load more) - for now, just a placeholder */}
      {hasMore && !loading && (
        <div className="flex justify-center mt-8 mb-4">
          <Button variant="outline" disabled>Load more (not implemented)</Button>
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
            onSuccess={handleEditSuccess}
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
