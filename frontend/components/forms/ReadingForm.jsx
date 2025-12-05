'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Upload, X } from 'lucide-react'

const LEVEL_OPTIONS = [
  { value: 'a1', label: 'A1 Beginner' },
  { value: 'a2', label: 'A2 Pre-intermediate' },
  { value: 'b1', label: 'B1 Intermediate' },
  { value: 'b2', label: 'B2 Upper-Intermediate' },
  { value: 'c1', label: 'C1 Advanced' },
  { value: 'c2', label: 'C2 Proficient' }
]

// Helper function to get level value from label
const getLevelValueFromLabel = (label) => {
	const option = LEVEL_OPTIONS.find(opt => opt.label === label);
	return option ? option.value : '';
};

const ReadingForm = ({ mode = 'create', initialValues = null, onSuccess, onCancel }) => {
  const [values, setValues] = useState({
    title: '',
    description: '',
    content: '',
    imageUrl: '',
    level: '',
    tags: [],
    pdfFile: null,
    taskPdfFile: null
  })
  const [tagInput, setTagInput] = useState('')
  const [pdfPreview, setPdfPreview] = useState(null)
  const [taskPdfPreview, setTaskPdfPreview] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (mode === 'edit' && initialValues) {
      // Extract first level from array and convert label to value
      const levelLabel = Array.isArray(initialValues.level) 
        ? initialValues.level[0] 
        : initialValues.level;
      const levelValue = getLevelValueFromLabel(levelLabel) || '';
      
      setValues(prev => ({
        ...prev,
        title: initialValues.title || '',
        description: initialValues.description || '',
        content: initialValues.content || '',
        imageUrl: initialValues.imageUrl || '',
        level: levelValue,
        tags: initialValues.tags || []
      }))
      setPdfPreview(initialValues.pdf || null)
      setTaskPdfPreview(initialValues.taskPdf || null)
    }
  }, [mode, initialValues])

  const handleAddTag = () => {
    const raw = tagInput.trim()
    if (!raw) return
    const newTags = raw.split(',').map(t => t.trim()).filter(Boolean)
    if (!newTags.length) { setTagInput(''); return }
    setValues(prev => {
      const set = new Set(prev.tags || [])
      newTags.forEach(t => set.add(t))
      return { ...prev, tags: Array.from(set) }
    })
    setTagInput('')
  }

  const handleRemoveTag = (tag) => {
    setValues(prev => ({ ...prev, tags: (prev.tags || []).filter(t => t !== tag) }))
  }

  const handleTagKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      handleAddTag()
    } else if (e.key === 'Backspace' && tagInput === '') {
      setValues(prev => ({ ...prev, tags: prev.tags.slice(0, -1) }))
    }
  }

  const handleFileChange = (e, field) => {
    const file = e.target.files?.[0] ?? null
    setValues(prev => ({ ...prev, [field]: file }))
    if (field === 'pdfFile') setPdfPreview(file ? file.name : null)
    if (field === 'taskPdfFile') setTaskPdfPreview(file ? file.name : null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await onSuccess(values)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-h-[70vh] overflow-y-auto pr-2">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="title">Title *</Label>
          <Input id="title" value={values.title} onChange={(e) => setValues(v => ({ ...v, title: e.target.value }))} required />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" value={values.description} onChange={(e) => setValues(v => ({ ...v, description: e.target.value }))} rows={3} />
        </div>
        <div>
          <Label htmlFor="content">Reading Content *</Label>
          <Textarea id="content" value={values.content} onChange={(e) => setValues(v => ({ ...v, content: e.target.value }))} rows={8} required />
        </div>
        <div>
          <Label htmlFor="imageUrl">Image URL</Label>
          <Input id="imageUrl" value={values.imageUrl} onChange={(e) => setValues(v => ({ ...v, imageUrl: e.target.value }))} placeholder="https://..." />
        </div>
        <div>
          <Label htmlFor="level">Level</Label>
          <Select key={values.level} value={values.level} onValueChange={(val) => setValues(v => ({ ...v, level: val }))}>
            <SelectTrigger id="level"><SelectValue placeholder="Select a level" /></SelectTrigger>
            <SelectContent>
              {LEVEL_OPTIONS.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="tagInput">Tags</Label>
          <div className="flex gap-2">
            <Input id="tagInput" value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={handleTagKeyDown} placeholder="Add a tag..." />
            <Button type="button" onClick={handleAddTag} variant="outline">Add</Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {(values.tags || []).map(tag => (
              <Badge key={tag} variant="secondary" className="flex items-center gap-2 px-2 py-1">
                <span className="text-sm">{tag}</span>
                <button type="button" onClick={() => handleRemoveTag(tag)} className="inline-flex items-center justify-center p-1"><X className="h-3 w-3" /></button>
              </Badge>
            ))}
          </div>
        </div>
        <div>
          <Label>Preparation File (optional)</Label>
          <div className="flex items-center gap-2">
            <input id="pdfFile" type="file" accept=".pdf" onChange={(e) => handleFileChange(e, 'pdfFile')} className="hidden" />
            <Button type="button" variant="outline" onClick={() => document.getElementById('pdfFile').click()} className="gap-2">
              <Upload className="h-4 w-4" />Choose PDF
            </Button>
            {pdfPreview && <span className="text-sm text-muted-foreground">{pdfPreview}</span>}
          </div>
        </div>
        <div>
          <Label>Task PDF Files (optional)</Label>
          <div className="flex items-center gap-2">
            <input id="taskPdfFile" type="file" accept=".pdf" onChange={(e) => handleFileChange(e, 'taskPdfFile')} className="hidden" />
            <Button type="button" variant="outline" onClick={() => document.getElementById('taskPdfFile').click()} className="gap-2">
              <Upload className="h-4 w-4" />Choose Task PDF
            </Button>
            {taskPdfPreview && <span className="text-sm text-muted-foreground">{taskPdfPreview}</span>}
          </div>
        </div>
        <div className="flex gap-2 justify-end pt-4">
          <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>Cancel</Button>
          <Button type="submit" disabled={loading}>{loading ? 'Saving...' : mode === 'edit' ? 'Update' : 'Create'}</Button>
        </div>
      </form>
    </div>
  )
}

export default ReadingForm
