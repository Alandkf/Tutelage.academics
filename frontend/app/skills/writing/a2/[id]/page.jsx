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
import PdfModal from '@/components/ui/PdfModal'
import PdfButton from '@/components/ui/PdfButton'
import { usePdfModal } from '@/hooks/usePdfModal'

const SingleArticleA2 = () => {
	const params = useParams()
	const router = useRouter()
	const [article, setArticle] = useState(null)
	const [loading, setLoading] = useState(true)

	// Use the custom hook for PDF modal
	const { isOpen, pdfUrl, title, openPdf, closePdf } = usePdfModal()

	const ANIM_DURATION = 0.3

	// Prep & Tasks UI state
	const [prepOpen, setPrepOpen] = useState(false)
	const [openTasks, setOpenTasks] = useState({}) // map idx -> bool
	const toggleTask = (idx) => setOpenTasks(prev => ({ ...prev, [idx]: !prev[idx] }))

	useEffect(() => {
		const fetchArticle = async () => {
			try {
				const response = await fetch(
					`${BASE_URL}/api/writings/${params.id}`,
					{ credentials: 'include' }
				)
				const data = await response.json()
                console.log('data:', data);
                
				if (data.success) {
					setArticle(data.data)
				}
			} catch (error) {
				console.error('Error fetching article:', error)
			} finally {
				setLoading(false)
			}
		}

		if (params.id) {
			fetchArticle()
		}
	}, [params.id])

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<Loader2 className="w-12 h-12 text-primary animate-spin" />
			</div>
		)
	}

	if (!article) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<p className="text-lg text-muted-foreground">Article not found</p>
			</div>
		)
	}

	return (
		<div className="bg-background">
			{/* Header Section - Title and Back Button */}
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
				<div className="flex flex-row items-center justify-between gap-6">
					<h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-foreground">
						{article.title}
					</h1>
					<Button
						variant="outline"
						size="lg"
						onClick={() => router.back()}
						className="flex items-center gap-2"
					>
						<ArrowLeft className="w-5 h-5" />
						Back
					</Button>
				</div>
			</div>

			{/* Hero Image Section */}
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
				<div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[28rem] rounded-lg overflow-hidden shadow-lg">
					<Image
						src={article.imageUrl}
                        alt={article.title}
						fill
						className="object-cover"
						sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 1200px"
						priority
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
				</div>
			</div>

			{/* Description Section */}
			{article.description && (
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
					<p className="text-lg text-muted-foreground leading-relaxed">
						{article.description}
					</p>
				</div>
			)}

			{/* Preparation Exercise (collapsible) */}
			{article?.pdf && (
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="border rounded-md overflow-hidden mb-6">
						<button onClick={() => setPrepOpen(p => !p)} className="w-full flex items-center justify-between px-6 py-4 bg-card">
							<span className="font-semibold text-foreground">Preparation exercise</span>
							<span className="text-muted-foreground">
								{prepOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
							</span>
						</button>

						<AnimatePresence initial={false}>
							{prepOpen && (
								<motion.div key="prep" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: ANIM_DURATION, ease: 'easeInOut' }} className="overflow-hidden border-t bg-background">
									<div className="px-6 py-4">
										<PdfButton 
											pdfUrl={article.pdf} 
											onOpen={openPdf}
											label="Preparation PDF"
										/>
									</div>
								</motion.div>
							)}
						</AnimatePresence>
					</div>
				</div>
			)}

			{/* READING TEXT */}
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-16">
					<div className="border rounded-md overflow-hidden bg-background">
						<div className="px-6 py-4 border-b bg-card">
							<h2 className="text-2xl sm:text-3xl font-bold text-foreground">Reading Text</h2>
						</div>

						<div className="px-6 py-6">
							{(article?.contentImageUrl) && (
								<div className="mb-6 w-full rounded overflow-hidden">
									<Image
										src={article.contentImageUrl}
										alt={article.title || ''}
										width={1200}
										height={600}
										className="object-cover w-full h-auto"
									/>
								</div>
							)}

							{/* Then the content (if available). No fallback text. */}
							{article?.content && (
								<div className="prose prose-lg max-w-none text-foreground whitespace-pre-wrap">
									{article.content}
								</div>
							)}
						</div>
					</div>
				</div>

			{/* Tasks section - placed directly after Reading Text */}
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
				<div className="grid grid-cols-1 gap-4">
					{Array.isArray(article?.tasks) && article.tasks.length > 0 ? (
					<div className="grid grid-cols-1 gap-4">
						{article.tasks.map((task, idx) => {
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

			{/* Tags Section - styled like language level but with dark background */}
			{Array.isArray(article?.tags) && article.tags.length > 0 && (
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
					<h3 className="text-3xl font-bold text-foreground mb-6">Tags</h3>
					<div className="p-6 rounded-md">
						<div className="flex flex-wrap gap-3">
							{article.tags.map((t, i) => (
								<span key={i} className="px-4 py-3 bg-black text-white text-base font-semibold rounded">{t}</span>
							))}
						</div>
					</div>
				</div>
			)}

			{/* Language Level — clickable pills (render only when levels exist) */}
			{Array.isArray(article?.level) && article.level.length > 0 && (
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
					<h3 className="text-3xl font-bold text-foreground mb-6">Language Level</h3>
					<div className="p-6 rounded-md">
						<div className="flex flex-wrap gap-3">
							{article.level.map((lvl, i) => (
								<Link key={i} href={`/levels/${String(lvl).toLowerCase().split(' ')[0]}`} className="px-4 py-3 bg-primary/90 border border-primary/30 text-base font-semibold text-white rounded" title={lvl}>
									{lvl}
								</Link>
							))}
						</div>
					</div>
				</div>
			)}

			{/* CTA Section */}
			<SingleSourceCTA />

			{/* PDF Modal - replaced with reusable component */}
			<PdfModal 
				isOpen={isOpen}
				onClose={closePdf}
				pdfUrl={pdfUrl}
				title={title}
				animationDuration={ANIM_DURATION}
			/>
		</div>
	)
}

export default SingleArticleA2