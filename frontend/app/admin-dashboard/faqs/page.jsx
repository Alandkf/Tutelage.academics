"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import FaqForm from "@/components/forms/FaqForm"
import { FaqRow } from "@/components/admin/faqs/FaqRow"
import { Plus, RefreshCw } from "lucide-react"
import { toast } from "sonner"
import { useAuth } from "@/components/AuthContext"
import { useInfiniteScroll } from "@/app/config/useInfiniteScroll"
import BASE_URL from "@/app/config/url"

const Faqs = () => {
  const [faqs, setFaqs] = useState([])
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [nextCursor, setNextCursor] = useState(null)
  const [error, setError] = useState(null)
  const [showCreate, setShowCreate] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [editFaq, setEditFaq] = useState(null)
  const [showDelete, setShowDelete] = useState(false)
  const [deleteFaq, setDeleteFaq] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const { user } = useAuth()

  // Fetch faqs with cursor-based pagination
  const fetchFaqs = async (reset = false) => {
    setLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams()
      params.append("limit", 10)
      if (searchTerm) params.append("search", searchTerm)
      if (!reset && nextCursor) params.append("cursor", nextCursor)
      const res = await fetch(`${BASE_URL}/api/faqs?${params.toString()}`)
      const data = await res.json()
      if (!data.success) throw new Error(data.message || "Failed to fetch faqs")
      setFaqs(prev => reset ? data.data || [] : [...prev, ...(data.data || [])])
      setHasMore(data.pagination?.hasMore ?? false)
      setNextCursor(data.pagination?.nextCursor ?? null)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  // Reset and fetch faqs (for search/refresh)
  const resetAndFetch = () => {
    setFaqs([])
    setNextCursor(null)
    setHasMore(true)
    fetchFaqs(true)
  }

  // Fetch on mount and when searchTerm changes
  useEffect(() => {
    resetAndFetch()
    // eslint-disable-next-line
  }, [searchTerm])

  // Reusable infinite scroll observer
  const lastFaqRef = useInfiniteScroll({ loading, hasMore, onLoadMore: fetchFaqs })

  // Handlers
  const handleCreateSuccess = async (values) => {
    try {
      const res = await fetch(`${BASE_URL}/api/faqs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(values)
      })
      if (!res.ok) throw new Error("Failed to create FAQ")
      setShowCreate(false)
      resetAndFetch()
      toast("FAQ created successfully", { variant: "success" })
    } catch {
      toast("Failed to create FAQ", { variant: "destructive" })
    }
  }
  const handleEdit = (faq) => {
    setEditFaq(faq)
    setShowEdit(true)
  }
  const handleEditSuccess = async (values) => {
    if (!editFaq) return
    try {
      const res = await fetch(`${BASE_URL}/api/faqs/${editFaq.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(values)
      })
      if (!res.ok) throw new Error("Failed to update FAQ")
      setShowEdit(false)
      setEditFaq(null)
      resetAndFetch()
      toast("FAQ updated successfully", { variant: "success" })
    } catch {
      toast("Failed to update FAQ", { variant: "destructive" })
    }
  }
  const handleDelete = (faq) => {
    setDeleteFaq(faq)
    setShowDelete(true)
  }
  const confirmDelete = async () => {
    if (!deleteFaq) return
    try {
      await fetch(`${BASE_URL}/api/faqs/${deleteFaq.id}`, {
        method: "DELETE",
        credentials: "include"
      })
      setShowDelete(false)
      setDeleteFaq(null)
      resetAndFetch()
      toast("FAQ deleted successfully", { variant: "destructive" })
    } catch {
      toast("Failed to delete FAQ", { variant: "destructive" })
    }
  }

  return (
    <div className="mx-auto w-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <h1 className="text-2xl font-bold text-foreground">FAQs</h1>
        {user?.role === "ADMIN" && (
          <Button onClick={() => setShowCreate(true)} className="gap-2">
            <Plus className="h-5 w-5" />
            Create FAQ
          </Button>
        )}
      </div>
      <div className="mb-4 flex items-center justify-between gap-2">
        <Input
          placeholder="Search FAQs..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="max-w-xs"
        />
        <Button
          variant="ghost"
          size="icon"
          onClick={resetAndFetch}
          title="Refresh FAQs"
          className="ml-2"
          disabled={loading}
        >
          <RefreshCw className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
        </Button>
      </div>
      {error && <div className="text-destructive text-center mb-4">{error}</div>}
      {loading && faqs.length === 0 && (
        <div className="col-span-full text-center text-muted-foreground py-12">Loading FAQs...</div>
      )}
      <div className="divide-y divide-border">
        {faqs.length === 0 && !loading ? (
          <div className="text-center text-muted-foreground py-12">No FAQs found.</div>
        ) : (
          faqs.map((faq, idx) => (
            <FaqRow
              key={faq.id}
              faq={faq}
              isLast={idx === faqs.length - 1}
              lastFaqRef={lastFaqRef}
              user={user}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
      {/* Show More fallback button */}
      {hasMore && faqs.length !== 0 && !loading && (
        <div className="flex justify-center mt-8 mb-4">
          <Button variant="outline" onClick={() => fetchFaqs()}>Show More</Button>
        </div>
      )}
      {/* Loading indicator for more fetches */}
      {loading && faqs.length > 0 && (
        <div className="flex justify-center p-4 mt-4">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full border-2 border-t-transparent border-blue-500 animate-spin"></div>
            <span className="text-muted-foreground text-sm">Loading more...</span>
          </div>
        </div>
      )}
      {/* Create FAQ Dialog */}
      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent className="max-w-md w-full" aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>Create FAQ</DialogTitle>
          </DialogHeader>
          <FaqForm onSuccess={handleCreateSuccess} onCancel={() => setShowCreate(false)} />
        </DialogContent>
      </Dialog>
      {/* Edit FAQ Dialog */}
      <Dialog open={showEdit} onOpenChange={(v) => { setShowEdit(v); if (!v) setEditFaq(null) }}>
        <DialogContent className="max-w-md w-full" aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>Edit FAQ</DialogTitle>
          </DialogHeader>
          <FaqForm
            mode="edit"
            initialValues={editFaq}
            onSuccess={handleEditSuccess}
            onCancel={() => { setShowEdit(false); setEditFaq(null) }}
          />
        </DialogContent>
      </Dialog>
      {/* Delete Confirmation Dialog */}
      <Dialog open={showDelete} onOpenChange={setShowDelete}>
        <DialogContent className="max-w-sm w-full" aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>Delete FAQ</DialogTitle>
          </DialogHeader>
          <div className="py-4 text-sm">
            Are you sure you want to delete <span className="font-semibold text-foreground">{deleteFaq?.question}</span>?
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

export default Faqs