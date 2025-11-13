'use client'

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, Upload } from "lucide-react"

const LEVEL_OPTIONS = [
  { value: 'a1', label: 'A1 Beginner' },
  { value: 'a2', label: 'A2 Pre-intermediate' },
  { value: 'b1', label: 'B1 Intermediate' },
  { value: 'b2', label: 'B2 Upper-Intermediate' },
  { value: 'c1', label: 'C1 Advanced' },
  { value: 'c2', label: 'C2 Proficient' }
]

const VideoForm = ({ mode = 'create', initialValues = null, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    videoRef: '',
    description: '',
    level: '',
    tags: [],
    pdf: null,
    taskPdf: null
  })
  const [tagInput, setTagInput] = useState('')
  const [pdfPreview, setPdfPreview] = useState(null)
  const [taskPdfPreview, setTaskPdfPreview] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (mode === 'edit' && initialValues) {
      // Extract first level if it's an array, otherwise use the value
      const levelValue = Array.isArray(initialValues.level) 
        ? initialValues.level[0]?.toLowerCase().split(' ')[0] 
        : (initialValues.level ? initialValues.level.toLowerCase().split(' ')[0] : '');
      
      setFormData({
        title: initialValues.title || '',
        videoRef: initialValues.videoRef || '',
        description: initialValues.description || '',
        level: levelValue || '',
        tags: initialValues.tags || [],
        pdf: null,
        taskPdf: null
      })
      setPdfPreview(initialValues.pdf || null)
      setTaskPdfPreview(initialValues.taskPdf || null)
    }
  }, [mode, initialValues])

  const handleLevelChange = (level) => {
    setFormData(prev => ({
      ...prev,
      level
    }))
  }

  const handleAddTag = () => {
    const tag = tagInput.trim()
    if (tag && !formData.tags.includes(tag)) {
      setFormData(prev => ({ ...prev, tags: [...prev.tags, tag] }))
      setTagInput('')
    }
  }

  const handleRemoveTag = (tag) => {
    setFormData(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }))
  }

  const handleFileChange = (e, field) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData(prev => ({ ...prev, [field]: file }))
      if (field === 'pdf') setPdfPreview(file.name)
      if (field === 'taskPdf') setTaskPdfPreview(file.name)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const submitData = new FormData()
      submitData.append('title', formData.title)
      submitData.append('videoRef', formData.videoRef)
      submitData.append('description', formData.description)
      submitData.append('level', formData.level)
      submitData.append('tags', formData.tags.join(','))
      // Align multipart keys with backend pdfUpload middleware
      if (formData.pdf) submitData.append('pdfFile', formData.pdf)
      if (formData.taskPdf) submitData.append('taskPdfFile', formData.taskPdf)
      
      await onSuccess(submitData)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Title *</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          required
        />
      </div>

      <div>
        <Label htmlFor="videoRef">Video URL *</Label>
        <Input
          id="videoRef"
          value={formData.videoRef}
          onChange={(e) => setFormData(prev => ({ ...prev, videoRef: e.target.value }))}
          placeholder="https://youtube.com/watch?v=..."
          required
        />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          rows={3}
        />
      </div>

      <div>
        <Label htmlFor="level">Level *</Label>
        <Select value={formData.level} onValueChange={handleLevelChange} required>
          <SelectTrigger id="level">
            <SelectValue placeholder="Select a level" />
          </SelectTrigger>
          <SelectContent>
            {LEVEL_OPTIONS.map(level => (
              <SelectItem key={level.value} value={level.value}>
                {level.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="tagInput">Tags</Label>
        <div className="flex gap-2">
          <Input
            id="tagInput"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
            placeholder="Add a tag..."
          />
          <Button type="button" onClick={handleAddTag} variant="outline">Add</Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.tags.map(tag => (
            <Badge key={tag} variant="secondary" className="gap-1">
              {tag}
              <X className="h-3 w-3 cursor-pointer" onClick={() => handleRemoveTag(tag)} />
            </Badge>
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor="pdf">PDF File</Label>
        <div className="flex items-center gap-2">
          <Input
            id="pdf"
            type="file"
            accept=".pdf"
            onChange={(e) => handleFileChange(e, 'pdf')}
            className="hidden"
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => document.getElementById('pdf').click()}
            className="gap-2"
          >
            <Upload className="h-4 w-4" />
            Choose PDF
          </Button>
          {pdfPreview && <span className="text-sm text-muted-foreground">{pdfPreview}</span>}
        </div>
      </div>

      <div>
        <Label htmlFor="taskPdf">Task PDF File</Label>
        <div className="flex items-center gap-2">
          <Input
            id="taskPdf"
            type="file"
            accept=".pdf"
            onChange={(e) => handleFileChange(e, 'taskPdf')}
            className="hidden"
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => document.getElementById('taskPdf').click()}
            className="gap-2"
          >
            <Upload className="h-4 w-4" />
            Choose Task PDF
          </Button>
          {taskPdfPreview && <span className="text-sm text-muted-foreground">{taskPdfPreview}</span>}
        </div>
      </div>

      <div className="flex gap-2 justify-end pt-4">
        <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? 'Saving...' : mode === 'edit' ? 'Update' : 'Create'}
        </Button>
      </div>
    </form>
  )
}

export default VideoForm
