'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ExternalLink, Loader2 } from 'lucide-react'
import { X as XIcon, FileText as FileTextIcon, ExternalLink as ExternalLinkIcon, ChevronDown, ChevronUp } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import BASE_URL from '@/app/config/url'
import SingleSourceCTA from '@/components/esl-resources/SingleSourceCTA'

const SingleArticleA2 = () => {
	const params = useParams()
	const router = useRouter()
	const [article, setArticle] = useState(null)
	const [loading, setLoading] = useState(true)

	// PDF modal state (same pattern as videos)
    const [pdfModalOpen, setPdfModalOpen] = useState(false)
    const [pdfModalUrl, setPdfModalUrl] = useState(null)
    const ANIM_DURATION = 0.3
    const toPdfView = (u) => `${BASE_URL}/api/pdf/view?url=${encodeURIComponent(u)}`
    const openPdfModal = (url) => { setPdfModalUrl(toPdfView(url)); setPdfModalOpen(true) }
    const closePdfModal = () => setPdfModalOpen(false)

	// Prep & Tasks UI state (new)
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
										<div className="w-fit">
											<div className="flex items-center justify-between gap-6 p-4 border rounded-md bg-card">
												<div className="flex items-center gap-3">
													<FileTextIcon className="w-6 h-6 text-primary" />
													<div>
														<div className="font-semibold text-foreground">Preparation PDF</div>
														<div className="text-sm text-muted-foreground">
															{(() => { try { return decodeURIComponent(new URL(article.pdf).pathname.split('/').pop()) } catch { return 'file.pdf' } })()}
														</div>
													</div>
												</div>
												<div className="flex items-center gap-2">
                                                    <Button onClick={() => openPdfModal(article.pdf)} className="cursor-pointer">
                                                        <ExternalLinkIcon className="w-4 h-4" /> Open
                                                    </Button>
                                                    <a href={toPdfView(article.pdf)} target="_blank" rel="noreferrer" className="text-muted-foreground px-2"><ExternalLink /></a>
												</div>
											</div>
										</div>
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
						article.tasks.map((task, idx) => (
							<div key={idx} className="border rounded-md overflow-hidden">
								<button
									onClick={() => toggleTask(idx)}
									className="w-full flex items-center justify-between px-4 py-3 bg-card"
								>
									<span className="font-medium text-foreground">Task {idx + 1}</span>
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
												<div className="text-sm text-foreground leading-relaxed">
													{task.content || 'Task details will be added here.'}
												</div>
												{article?.pdf && (
													<div className="mt-3 w-fit">
														<div className="flex items-center justify-between gap-6 p-3 border rounded-md bg-card">
															<div className="flex items-center gap-3">
																<FileTextIcon className="w-5 h-5 text-primary" />
																<div>
																	<div className="font-medium">Task PDF</div>
																	<div className="text-sm text-muted-foreground">{(() => { try { return decodeURIComponent(new URL(article.pdf).pathname.split('/').pop()) } catch { return 'resource.pdf' } })()}</div>
																</div>
															</div>
															<div className="flex items-center gap-2">
                                                                <Button onClick={() => openPdfModal(article.pdf)} className="cursor-pointer">
                                                                    <ExternalLinkIcon className="w-4 h-4" /> Open
                                                                </Button>
                                                                <a href={toPdfView(article.pdf)} target="_blank" rel="noreferrer" className="text-muted-foreground px-2">Open in new tab</a>
															</div>
														</div>
													</div>
												)}
											</div>
										</motion.div>
									)}
								</AnimatePresence>
							</div>
						))
					) : (
						// fallback single task using blog.pdf (if any)
						<div className="border rounded-md overflow-hidden">
							<button onClick={() => toggleTask(0)} className="w-full flex items-center justify-between px-4 py-3 bg-card">
								<span className="font-medium text-foreground">Task 1</span>
								<span className="text-muted-foreground">{openTasks[0] ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}</span>
							</button>
							<AnimatePresence initial={false}>
								{openTasks[0] && (
									<motion.div key="task-0" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: ANIM_DURATION, ease: 'easeInOut' }} className="overflow-hidden border-t bg-background">
										<div className="px-4 py-3">
											{article?.pdf && (
												<div className="mt-3 w-fit">
													<div className="flex items-center justify-between gap-6 p-3 border rounded-md bg-card">
														<div className="flex items-center gap-3">
															<FileTextIcon className="w-5 h-5 text-primary" />
															<div>
																<div className="font-medium">Task PDF</div>
																<div className="text-sm text-muted-foreground">{(() => { try { return decodeURIComponent(new URL(article.pdf).pathname.split('/').pop()) } catch { return 'resource.pdf' } })()}</div>
															</div>
														</div>
														<div className="flex items-center gap-2">
                                                            <Button onClick={() => openPdfModal(article.pdf)} className="cursor-pointer"><ExternalLinkIcon className="w-4 h-4" /> Open</Button>
                                                            <a href={toPdfView(article.pdf)} target="_blank" rel="noreferrer" className="text-muted-foreground px-2"><ExternalLink /></a>
														</div>
													</div>
												</div>
											)}
										</div>
									</motion.div>
								)}
							</AnimatePresence>
						</div>
					)}
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

			{/* PDF Modal */}
			<AnimatePresence>
				{pdfModalOpen && pdfModalUrl && (
					<motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
						<motion.div className="w-[90%] md:w-[80%] lg:w-[70%] bg-background rounded shadow-lg overflow-hidden" initial={{ y: 20, scale: 0.98, opacity: 0 }} animate={{ y: 0, scale: 1, opacity: 1 }} exit={{ y: 20, scale: 0.98, opacity: 0 }} transition={{ duration: ANIM_DURATION }}>
							<div className="flex items-center justify-between p-3 border-b">
								<div className="flex items-center gap-3">
									<FileTextIcon className="w-6 h-6 text-primary" />
                                    <div className="font-semibold">{(() => {
                                        try {
                                            const u = new URL(pdfModalUrl)
                                            const real = new URLSearchParams(u.search).get('url')
                                            const name = (real || u.pathname).split('/').pop()
                                            return decodeURIComponent(name || 'document.pdf')
                                        } catch {
                                            return 'document.pdf'
                                        }
                                    })()}</div>
								</div>
								<div className="flex items-center gap-2">
									<a href={pdfModalUrl} target="_blank" rel="noreferrer" className="px-3 py-1 text-sm text-muted-foreground">Open in new tab</a>
									<button className="p-2" onClick={closePdfModal}><XIcon className="w-5 h-5" /></button>
								</div>
							</div>
							<div className="px-6 py-3 text-sm text-muted-foreground border-b">Note: some hosts block embedding. Use "Open in new tab" if preview fails.</div>
							<div className="w-full h-[70vh]">
								<iframe src={pdfModalUrl} className="w-full h-full border-0" title="PDF preview" />
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}

export default SingleArticleA2