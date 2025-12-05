'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { X, Upload, Trash2 } from 'lucide-react'

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
	console.log('getLevelValueFromLabel called with:', label);
	const option = LEVEL_OPTIONS.find(opt => opt.label === label);
	console.log('Found option:', option);
	return option ? option.value : '';
};

const AudioForm = ({ mode = 'create', initialValues = null, onSuccess, onCancel }) => {
	console.log('initialValues audio: ', initialValues);
	
	const [formData, setFormData] = useState({
		title: '',
		audioRef: '',
		imageUrl: '',
		description: '',
		transcript: '',
		level: '',
		tags: [],
		pdf: null,
		taskPdfs: [] // Changed from taskPdf to taskPdfs array
	})
	const [tagInput, setTagInput] = useState('')
	const [pdfPreview, setPdfPreview] = useState(null)
	const [taskPdfsPreview, setTaskPdfsPreview] = useState([])
	const [existingTaskPdfs, setExistingTaskPdfs] = useState([])
	const [deletedTaskPdfIds, setDeletedTaskPdfIds] = useState([])
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		if (mode === 'create') {
			setFormData({
				title: '',
				audioRef: '',
				imageUrl: '',
				description: '',
				transcript: '',
				level: '',
				tags: [],
				pdf: null,
				taskPdfs: []
			})
			setPdfPreview(null)
			setTaskPdfsPreview([])
			setExistingTaskPdfs([])
		}
	}, [mode])

	useEffect(() => {
		if (mode === 'edit' && initialValues) {
			const levelLabel = Array.isArray(initialValues.level) 
				? initialValues.level[0] 
				: initialValues.level;
			const levelValue = getLevelValueFromLabel(levelLabel) || undefined;
			console.log('Setting level value:', levelValue, 'from label:', levelLabel);
			
			setFormData(prev => ({
				...prev,
				title: initialValues.title || '',
				audioRef: initialValues.audioRef || '',
				imageUrl: initialValues.imageUrl || '',
				description: initialValues.description || '',
				transcript: initialValues.transcript || '',
				level: levelValue,
				tags: initialValues.tags || [],
				taskPdfs: []
			}))
			
			if (initialValues.pdf) {
				setPdfPreview(typeof initialValues.pdf === 'string' 
					? initialValues.pdf.split('/').pop() 
					: 'Existing PDF')
			}
			
			// Handle taskPdfs from association
			if (Array.isArray(initialValues.taskPdfs) && initialValues.taskPdfs.length > 0) {
				const existing = initialValues.taskPdfs.map(pdf => ({
					id: pdf.id,
					name: pdf?.fileName || pdf?.filePath?.split('/').pop() || 'Unknown',
					filePath: pdf?.filePath,
					existing: true
				}))
				setExistingTaskPdfs(existing)
			}
		}
	}, [mode, initialValues])

	const handleLevelChange = (level) => {
		setFormData(prev => ({ ...prev, level: level || '' }))
	}

	const handleAddTag = (fromInput = null) => {
		const raw = (fromInput ?? tagInput).trim()
		if (!raw) return
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

	const handleRemoveTag = (tag) => {
		setFormData(prev => {
			const current = Array.isArray(prev.tags) ? prev.tags : []
			const newTags = current.filter(t => t !== tag)
			return { ...prev, tags: newTags }
		})
	}

	const handleTagKeyDown = (e) => {
		if (e.key === 'Enter') {
			e.preventDefault()
			handleAddTag()
			return
		}
		if (e.key === ',') {
			e.preventDefault()
			handleAddTag()
			return
		}
		if (e.key === 'Backspace' && tagInput === '') {
			setFormData(prev => {
				if (!prev.tags.length) return prev
				const newList = prev.tags.slice(0, -1)
				return { ...prev, tags: newList }
			})
		}
	}

	const handleFileChange = (e, field) => {
		if (field === 'taskPdfs') {
			const files = Array.from(e.target.files || [])
			if (files.length > 0) {
				setFormData(prev => {
					const currentFiles = Array.isArray(prev.taskPdfs) ? prev.taskPdfs : []
					return { ...prev, taskPdfs: [...currentFiles, ...files] }
				})
				
				const newPreviews = files.map(f => ({ 
					name: f.name, 
					existing: false,
					file: f 
				}))
				setTaskPdfsPreview(prev => [...prev, ...newPreviews])
			}
			e.target.value = ''
		} else {
			const file = e.target.files?.[0]
			if (file) {
				setFormData(prev => ({ ...prev, [field]: file }))
				if (field === 'pdf') setPdfPreview(file.name)
			}
		}
	}

	const handleRemoveTaskPdf = (index) => {
		setFormData(prev => {
			const newFiles = Array.isArray(prev.taskPdfs) 
				? prev.taskPdfs.filter((_, i) => i !== index)
				: []
			return { ...prev, taskPdfs: newFiles }
		})
		setTaskPdfsPreview(prev => prev.filter((_, i) => i !== index))
	}

	const handleRemoveExistingTaskPdf = (index) => {
		const fileToRemove = existingTaskPdfs[index]
		if (fileToRemove?.id) {
			setDeletedTaskPdfIds(prev => [...prev, fileToRemove.id])
		}
		setExistingTaskPdfs(prev => prev.filter((_, i) => i !== index))
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
			submitData.append('audioRef', formData.audioRef)
			submitData.append('imageUrl', formData.imageUrl)
			submitData.append('description', formData.description)
			submitData.append('transcript', formData.transcript)
			submitData.append('level', formData.level)
			submitData.append('tags', formData.tags.join(','))
			
			if (formData.pdf) submitData.append('pdfFile', formData.pdf)
			
			if (Array.isArray(formData.taskPdfs) && formData.taskPdfs.length > 0) {
				formData.taskPdfs.forEach(file => {
					if (file instanceof File) {
						submitData.append('taskPdfs', file)
					}
				})
			}
			
			if (deletedTaskPdfIds.length > 0) {
				submitData.append('deletedTaskPdfIds', JSON.stringify(deletedTaskPdfIds))
			}
			
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
				<Label htmlFor="audioRef">Audio URL *</Label>
				<Input
					id="audioRef"
					name="audioRef"
					value={formData.audioRef}
					onChange={handleChange}
					placeholder="you tube url"
					required
				/>
			</div>

			<div>
				<Label htmlFor="imageUrl">Image URL</Label>
				<Input
					id="imageUrl"
					name="imageUrl"
					value={formData.imageUrl}
					onChange={handleChange}
					placeholder="https://example.com/image.jpg"
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
				<Label htmlFor="transcript">Transcript</Label>
				<Textarea
					id="transcript"
					name="transcript"
					value={formData.transcript}
					onChange={handleChange}
					placeholder="Audio transcript"
					rows={5}
				/>
			</div>

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
					<Button type="button" onClick={() => handleAddTag()} variant="outline">Add</Button>
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
					<Input id="pdf" type="file" accept=".pdf" onChange={(e) => handleFileChange(e, 'pdf')} className="hidden" />
					<Button type="button" variant="outline" onClick={() => document.getElementById('pdf').click()} className="gap-2">
						<Upload className="h-4 w-4" />Choose PDF
					</Button>
					{pdfPreview && <span className="text-sm text-muted-foreground truncate max-w-[200px]">{pdfPreview}</span>}
				</div>
			</div>

			<div>
				<Label>Task PDF Files (Multiple)</Label>
				<div className="space-y-2">
					<div className="flex items-center gap-2">
						<Input 
							id="taskPdfs" 
							type="file" 
							accept=".pdf" 
							multiple
							onChange={(e) => handleFileChange(e, 'taskPdfs')} 
							className="hidden" 
						/>
						<Button 
							type="button" 
							variant="outline" 
							onClick={() => document.getElementById('taskPdfs').click()} 
							className="gap-2"
						>
							<Upload className="h-4 w-4" />
							Add Task PDFs
						</Button>
						{(existingTaskPdfs.length + taskPdfsPreview.length) > 0 && (
							<span className="text-sm text-muted-foreground">
								{existingTaskPdfs.length + taskPdfsPreview.length} file(s)
							</span>
						)}
					</div>

					{existingTaskPdfs.length > 0 && (
						<div className="space-y-1">
							<Label className="text-xs text-muted-foreground">Existing Files</Label>
							{existingTaskPdfs.map((file, index) => (
								<div key={`existing-${index}`} className="flex items-center justify-between bg-muted px-3 py-2 rounded-md">
									<span className="text-sm truncate flex-1">
										{file.name}
										<span className="text-xs text-muted-foreground ml-2">(saved)</span>
									</span>
									<button
										type="button"
										onClick={() => handleRemoveExistingTaskPdf(index)}
										className="ml-2 p-1 hover:bg-destructive/10 hover:text-destructive rounded"
										title="Remove file"
									>
										<Trash2 className="h-3 w-3" />
									</button>
								</div>
							))}
						</div>
					)}

					{taskPdfsPreview.length > 0 && (
						<div className="space-y-1">
							<Label className="text-xs text-muted-foreground">New Files to Upload</Label>
							{taskPdfsPreview.map((file, index) => (
								<div key={`new-${index}`} className="flex items-center justify-between bg-primary/5 px-3 py-2 rounded-md border border-primary/20">
									<span className="text-sm truncate flex-1">
										{file.name}
										<span className="text-xs text-primary ml-2">(new)</span>
									</span>
									<button
										type="button"
										onClick={() => handleRemoveTaskPdf(index)}
										className="ml-2 p-1 hover:bg-destructive/10 hover:text-destructive rounded"
										title="Remove file"
									>
										<X className="h-3 w-3" />
									</button>
								</div>
							))}
						</div>
					)}
				</div>
			</div>

			<div className="flex gap-2 justify-end pt-4">
				<Button type="button" variant="outline" onClick={onCancel} disabled={loading}>Cancel</Button>
				<Button type="submit" disabled={loading}>{loading ? 'Saving...' : mode === 'edit' ? 'Update' : 'Create'}</Button>
			</div>
		</form>
	)
}

export default AudioForm
