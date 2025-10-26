"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import BASE_URL from "@/app/config/url"
import { useAuth } from "@/components/AuthContext"

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
    <div className="mx-auto w-full max-w-4xl">
      <div className="flex flex-row justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-foreground">Landing Section</h1>
      </div>

      {!loading && !canEdit && (
        <div className="text-muted-foreground text-sm mb-4">You do not have permission to edit this section.</div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <label className="block text-sm font-medium">Title</label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
          <label className="block text-sm font-medium">Subtitle</label>
          <textarea
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            placeholder="Subtitle"
            className="w-full rounded-md border border-border bg-background text-foreground p-2 min-h-[120px]"
          />
          <label className="block text-sm font-medium">Image URL (hosted)</label>
          <Input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://..." />
          <div className="flex gap-2 pt-2">
            <Button onClick={onSave} disabled={loading || !canEdit || saving}>{saving ? "Saving..." : current?.id ? "Save" : "Create"}</Button>
            <Button variant="outline" onClick={fetchLatest} disabled={loadingLatest}>Refresh</Button>
          </div>
        </div>
        <div className="relative w-full aspect-[16/9] rounded-md overflow-hidden border border-border">
          {imageUrl ? (
            <Image src={imageUrl} alt="Preview" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">No image URL</div>
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-3">
            <div className="font-semibold">{title || 'Title preview'}</div>
            <div className="text-sm">{subtitle || 'Subtitle preview'}</div>
          </div>
        </div>
      </div>
    </div>
  )
}