"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import BASE_URL from "@/app/config/url"
import { useAuth } from "@/components/AuthContext"
import { RefreshCw } from "lucide-react"

export default function LandingAdminPage() {
  const { user, loading } = useAuth()
  const [loadingLatest, setLoadingLatest] = useState(false)
  const [saving, setSaving] = useState(false)
  const [current, setCurrent] = useState(null)
  const [title, setTitle] = useState("")
  const [subtitle, setSubtitle] = useState("")
  const [imageUrl, setImageUrl] = useState("")

  const fetchLatest = async () => {
    setLoadingLatest(true)
    try {
      const res = await fetch(`${BASE_URL}/api/landing-sections/latest`, { credentials: "include" })
      const data = await res.json()
      if (data?.success && data?.landingSection) {
        setCurrent(data.landingSection)
        setTitle(data.landingSection.title || "")
        setSubtitle(data.landingSection.subtitle || "")
        setImageUrl(data.landingSection.imageUrl || "")
      }
    } catch (e) {
      // ignore
    } finally {
      setLoadingLatest(false)
    }
  }

  useEffect(() => {
    if (BASE_URL) fetchLatest()
    // eslint-disable-next-line
  }, [])

  const onSave = async () => {
    if (!title || !subtitle || !imageUrl) {
      toast("Please fill title, subtitle, and an image URL", { variant: "destructive" })
      return
    }
    setSaving(true)
    try {
      let res
      if (current?.id) {
        res = await fetch(`${BASE_URL}/api/landing-sections/${current.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ title, subtitle, imageUrl })
        })
      } else {
        res = await fetch(`${BASE_URL}/api/landing-sections`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ title, subtitle, imageUrl })
        })
      }
      if (!res.ok) throw new Error("Failed to save landing section")
      toast("Landing section saved", { variant: "success" })
      await fetchLatest()
    } catch (e) {
      toast("Failed to save landing section", { variant: "destructive" })
    } finally {
      setSaving(false)
    }
  }

  const canEdit = user?.role === "ADMIN" || user?.role === "MAIN_MANAGER"

  return (
    <div className="p-6">
      <div className="flex flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-foreground">Landing Section</h1>
        <Button variant="outline" size="icon" onClick={fetchLatest} disabled={loadingLatest}>
          <RefreshCw className={`h-4 w-4 ${loadingLatest ? 'animate-spin' : ''}`} />
        </Button>
      </div>

      {!loading && !canEdit && (
        <div className="text-muted-foreground text-sm mb-4">You do not have permission to edit this section.</div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <Input 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              placeholder="Title" 
              disabled={loadingLatest || !canEdit}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Subtitle</label>
            <textarea
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="Subtitle"
              className="w-full rounded-md border border-border bg-background text-foreground p-2 min-h-[120px] disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loadingLatest || !canEdit}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Image URL (hosted)</label>
            <Input 
              value={imageUrl} 
              onChange={(e) => setImageUrl(e.target.value)} 
              placeholder="https://..." 
              disabled={loadingLatest || !canEdit}
            />
          </div>
          <div className="flex gap-2 pt-2">
            <Button onClick={onSave} disabled={loading || !canEdit || saving || loadingLatest}>
              {saving ? "Saving..." : current?.id ? "Save" : "Create"}
            </Button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Preview</label>
          <div className="relative w-full aspect-[16/9] rounded-md overflow-hidden border border-border">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt="Preview"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground">
                No image URL
              </div>
            )}
            <div className="absolute inset-0 bg-black/60 z-10" />
            <div className="absolute inset-0 flex flex-col items-center justify-center z-20 px-4 text-center">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white drop-shadow mb-2">
                {title || 'Empowering students worldwide with innovative virtual learning solutions'}
              </h2>
              <p className="text-xs sm:text-sm text-white/80 line-clamp-3">
                {subtitle || 'Education is vital to everyone on this planet. With a passion for education, compassion for teachers, and advanced technology, we believe we can provide high-quality education for learners everywhere.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}