'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Loader2, ChevronDown, ChevronUp } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import BASE_URL from '@/app/config/url'
import SingleSourceCTA from '@/components/esl-resources/SingleSourceCTA'
import CompactAudioPlayer from '@/components/players/CompactAudioPlayer'
import PdfModal from '@/components/ui/PdfModal'
import PdfButton from '@/components/ui/PdfButton'
import { usePdfModal } from '@/hooks/usePdfModal'

const SingleAudioA1 = () => {
	const params = useParams()
	const router = useRouter()
	const [audio, setAudio] = useState(null)
	
	const [loading, setLoading] = useState(true)

	// PDF modal using custom hook
	const { isOpen: pdfModalOpen, pdfUrl: pdfModalUrl, title: pdfModalTitle, openPdf, closePdf } = usePdfModal()

	// Prep & Tasks UI state
	const ANIM_DURATION = 0.3
	const [prepOpen, setPrepOpen] = useState(false)
	const [openTasks, setOpenTasks] = useState({})
	const toggleTask = (idx) => setOpenTasks(prev => ({ ...prev, [idx]: !prev[idx] }))

	useEffect(() => {
		const fetchAudio = async () => {
			try {
				const response = await fetch(`${BASE_URL}/api/audios/${params.id}`, { credentials: 'include' })
				const data = await response.json()
				if (data.success) setAudio(data.data)
			} catch (error) {
				console.error('Error fetching audio:', error)
			} finally {
				setLoading(false)
			}
		}
		if (params.id) fetchAudio()
	}, [params.id])

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<Loader2 className="w-12 h-12 text-primary animate-spin" />
			</div>
		)
	}

	if (!audio) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<p className="text-lg text-muted-foreground">Audio not found</p>
			</div>
		)
	}

	return (
		<div className="bg-background">
			{/* Header */}
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
				<div className="flex flex-row items-center justify-between gap-6">
					<h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-foreground">{audio.title}</h1>
					<Button variant="outline" size="lg" onClick={() => router.back()} className="flex items-center gap-2">
						<ArrowLeft className="w-5 h-5" />Back
					</Button>
				</div>
			</div>

			{/* Hero Image */}
			{audio.imageUrl && (
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
					<div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[28rem] rounded-lg overflow-hidden shadow-lg">
						<Image src={audio.imageUrl} alt={audio.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 1200px" priority />
					</div>
				</div>
			)}

			{/* Audio Player */}
			{audio.audioRef && (
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
					<div className="border rounded-md overflow-hidden bg-card">
						<div className="px-6 py-4 border-b"><h2 className="text-2xl font-bold">Audio Player</h2></div>
						<div className="px-6 py-4"><CompactAudioPlayer src={audio.audioRef} youtubeUrl={audio.audioRef} /></div>
					</div>
				</div>
			)}

			{/* Description */}
			{audio.description && (
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
					<p className="text-lg text-muted-foreground leading-relaxed">{audio.description}</p>
				</div>
			)}

			{/* Preparation Exercise */}
			{audio?.pdf && (
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="border rounded-md overflow-hidden mb-6">
						<button onClick={() => setPrepOpen(p => !p)} className="w-full flex items-center justify-between px-6 py-4 bg-card">
							<span className="font-semibold">Preparation exercise</span>
							<span>{prepOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}</span>
						</button>
						<AnimatePresence initial={false}>
							{prepOpen && (
								<motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: ANIM_DURATION }} className="overflow-hidden border-t">
									<div className="px-6 py-4">
										<PdfButton pdfUrl={audio.pdf} onOpen={(url) => openPdf(url, 'Preparation PDF')} label="Preparation PDF" />
									</div>
								</motion.div>
							)}
						</AnimatePresence>
					</div>
				</div>
			)}

			{/* Transcript */}
			{audio?.transcript && (
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
					<div className="border rounded-md overflow-hidden bg-card">
						<div className="px-6 py-4 border-b"><h2 className="text-2xl font-bold">Transcript</h2></div>
						<div className="px-6 py-6"><p className="whitespace-pre-wrap text-foreground">{audio.transcript}</p></div>
					</div>
				</div>
			)}

			{/* Tasks */}
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
				<div className="grid grid-cols-1 gap-4">
					{Array.isArray(audio?.tasks) && audio.tasks.length > 0 ? (
					<div className="grid grid-cols-1 gap-4">
						{audio.tasks.map((task, idx) => {
						const taskPdf = task?.filePath
						return (
							<div key={idx} className="border rounded-md overflow-hidden">
							<button
								onClick={() => toggleTask(idx)}
								className="w-full flex items-center justify-between px-4 py-5 bg-card"
							>
								<span className="font-medium text-foreground">Task {idx + 1} {}</span>
								<span className="text-muted-foreground">
								{openTasks[idx] ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
								</span>
							</button>
							<AnimatePresence initial={false}>
								{openTasks[idx] && (
								<motion.div
									key={`task-${idx}`}
									initial={{ height: 0, opacity: 0 }}
									animate={{ height: 'auto', opacity: 1 }}
									exit={{ height: 0, opacity: 0 }}
									transition={{ duration: ANIM_DURATION, ease: 'easeInOut' }}
									className="overflow-hidden border-t bg-background"
								>
									<div className="px-4 py-3">
									<div className="text-sm text-foreground leading-relaxed">{task?.content || ''}</div>
									{taskPdf && (
										<div className="mt-3">
										<PdfButton 
											pdfUrl={taskPdf} 
											onOpen={openPdf}
											label="Task PDF"
										/>
										</div>
									)}
									</div>
								</motion.div>
								)}
							</AnimatePresence>
							</div>
						)
						})}
					</div>
					) : null }
				</div>
			</div>

			{/* Tags */}
			{Array.isArray(audio?.tags) && audio.tags.length > 0 && (
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 pb-6">
					<h3 className="text-3xl font-bold mb-6">Tags</h3>
					<div className="flex flex-wrap gap-3">
						{audio.tags.map((t, i) => (
							<span key={i} className="px-4 py-3 bg-black text-white text-base font-semibold rounded">{t}</span>
						))}
					</div>
				</div>
			)}

			{/* Language Level */}
			{Array.isArray(audio?.level) && audio.level.length > 0 && (
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
					<h3 className="text-3xl font-bold mb-6">Language Level</h3>
					<div className="flex flex-wrap gap-3">
						{audio.level.map((lvl, i) => (
							<Link key={i} href={`/levels/${String(lvl).toLowerCase().split(' ')[0]}`} className="px-4 py-3 bg-primary/90 border text-white rounded">{lvl}</Link>
						))}
					</div>
				</div>
			)}

			<SingleSourceCTA />

			{/* Reusable PDF Modal */}
			<PdfModal isOpen={pdfModalOpen} onClose={closePdf} pdfUrl={pdfModalUrl} title={pdfModalTitle} />
		</div>
	)
}

export default SingleAudioA1