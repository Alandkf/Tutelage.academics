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

// Helper function to get level value from label
const getLevelValueFromLabel = (label) => {
	const option = LEVEL_OPTIONS.find(opt => opt.label === label);
	return option ? option.value : '';
};

const VideoForm = ({ mode = 'create', initialValues = null, onSuccess, onCancel, showTranscript = false }) => {
	const [formData, setFormData] = useState({
		title: '',
		videoRef: '',
		description: '',
		content: '',
		transcript: '',
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
			// Extract first level from array and convert label to value
			const levelLabel = Array.isArray(initialValues.level) 
				? initialValues.level[0] 
				: initialValues.level;
			const levelValue = getLevelValueFromLabel(levelLabel) || '';
			
			setFormData({
				title: initialValues.title || '',
				videoRef: initialValues.videoRef || '',
				description: initialValues.description || '',
				content: initialValues.content || '',
				transcript: initialValues.transcript || '',
				level: levelValue,
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

	// Replace handleAddTag with support for comma-separated input and multiple tags
	const handleAddTag = () => {
		const raw = tagInput.trim()
		if (!raw) return
		// split on commas, dedupe and ignore empties
		const newTags = raw.split(',').map(t => t.trim()).filter(Boolean)
		if (!newTags.length) {
			setTagInput('')
			return
		}
		setFormData(prev => {
			const set = new Set(prev.tags || [])
			newTags.forEach(t => set.add(t))
			return { ...prev, tags: Array.from(set) }
		})
		setTagInput('')
	}

	// Remove tag (fixed: safe guard and ensure array)
	const handleRemoveTag = (tag) => {
		setFormData(prev => {
			const current = Array.isArray(prev.tags) ? prev.tags : []
			const newTags = current.filter(t => t !== tag)
			return { ...prev, tags: newTags }
		})
		// keep tagInput as-is (user might continue typing)
	}

	// New handler: support Enter, comma, Backspace deletion
	const handleTagKeyDown = (e) => {
		if (e.key === 'Enter') {
			e.preventDefault()
			handleAddTag()
			return
		}
		// Add when user types comma
		if (e.key === ',') {
			e.preventDefault()
			handleAddTag()
			return
		}
		// Backspace to remove last tag when input empty
		if (e.key === 'Backspace' && tagInput === '') {
			setFormData(prev => {
				if (!prev.tags.length) return prev
				const newList = prev.tags.slice(0, -1)
				return { ...prev, tags: newList }
			})
		}
	}

	const handleFileChange = (e, field) => {
		const file = e.target.files?.[0]
		if (file) {
			setFormData(prev => ({ ...prev, [field]: file }))
			if (field === 'pdf') setPdfPreview(file.name)
			if (field === 'taskPdf') setTaskPdfPreview(file.name)
		}
	}

	const handleChange = (e) => {
		const { name, value } = e.target
		setFormData(prev => ({ ...prev, [name]: value }))
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		setLoading(true)
		try {
			const submitData = new FormData()
			submitData.append('title', formData.title)
			submitData.append('videoRef', formData.videoRef)
			submitData.append('description', formData.description)
			submitData.append('content', formData.content)
			if (showTranscript) {
				submitData.append('transcript', formData.transcript || '')
			}
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
		<form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
			<div>
				<Label htmlFor="title">Title *</Label>
				<Input
					id="title"
					name="title"
					value={formData.title}
					onChange={handleChange}
					required
					placeholder="Enter title"
				/>
			</div>

			<div>
				<Label htmlFor="videoRef">Video URL *</Label>
				<Input
					id="videoRef"
					name="videoRef"
					value={formData.videoRef}
					onChange={handleChange}
					placeholder="https://youtube.com/watch?v=..."
					required
				/>
			</div>

			<div>
				<Label htmlFor="description">Description</Label>
				<Textarea
					id="description"
					name="description"
					value={formData.description}
					onChange={handleChange}
					placeholder="Brief description"
					rows={3}
				/>
			</div>

			<div>
				<Label htmlFor="content">Content</Label>
				<Textarea
					id="content"
					name="content"
					value={formData.content}
					onChange={handleChange}
					placeholder="Detailed content"
					rows={4}
				/>
			</div>

			{showTranscript && (
				<div>
					<Label htmlFor="transcript">Transcript</Label>
					<Textarea
						id="transcript"
						name="transcript"
						value={formData.transcript}
						onChange={handleChange}
						placeholder="Video transcript"
						rows={5}
					/>
				</div>
			)}

			<div>
				<Label htmlFor="level">Level *</Label>
				<Select key={formData.level} value={formData.level} onValueChange={handleLevelChange} required>
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
						onKeyDown={handleTagKeyDown}
						placeholder="Add a tag..."
					/>
					<Button type="button" onClick={handleAddTag} variant="outline">Add</Button>
				</div>
				<div className="flex flex-wrap gap-2 mt-2">
					{(formData.tags || []).map(tag => (
						<Badge key={tag} variant="secondary" className="flex items-center gap-2 px-2 py-1">
							<span className="text-sm">{tag}</span>
							<button
								type="button"
								aria-label={`Remove ${tag}`}
								onClick={() => handleRemoveTag(tag)}
								className="inline-flex items-center justify-center p-1"
							>
								<X className="h-3 w-3" />
							</button>
						</Badge>
					))}
				</div>
			</div>

			<div>
				<Label htmlFor="pdf">Preparation File</Label>
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
				<Label htmlFor="taskPdf">Task PDF Files</Label>
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
