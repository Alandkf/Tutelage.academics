'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Users, Building2, Handshake, Banknote } from 'lucide-react'

const partners = [
	{
		title: 'Educational Institutions & Policymakers',
		icon: Building2,
		description:
			'Collaborating to enhance curriculum and policy for better language education.',
	},
	{
		title: 'Startup Incubators & Associations',
		icon: Handshake,
		description:
			'Partnering with TEFL, TESOL, and local/regional associations to foster innovation.',
	},
	{
		title: 'Financial Institutions & NGOs',
		icon: Banknote,
		description:
			'Working with NGOs and government-funded employment services to support learners.',
	},
]

// LG layout positions (unchanged)
const nodePositions = [
	{ left: '15%', top: '5%' },    // Top left
	{ right: '15%', top: '5%' },   // Top right
	{ left: '41.5%', top: 'calc(67% + 90px)', transform: 'translateX(-50%)' }, // Bottom center
]

export default function PartnershipsSection() {
	return (
		<section className="pt-20 pb-44 bg-background relative overflow-hidden">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
				{/* Section Title */}
				<motion.div
					initial={{ opacity: 0, y: 60 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.5 }}
					transition={{ duration: 0.7, ease: 'easeOut' }}
					className="mb-16 text-center"
				>
					<h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
						Partnerships & Collaborations
					</h2>
					<p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
						Tutelage is not just an online platform; we are a hub of strategic
						partnerships. We actively build connections with organizations to
						maximize opportunities for our students and intensify the quality of
						our teaching.
					</p>
				</motion.div>

				{/* Responsive Solar System Circular Network Design */}
				<div className="relative flex items-center justify-center min-h-[400px]">
					<motion.div
						initial={{ opacity: 0, scale: 0.8 }}
						whileInView={{ opacity: 1, scale: 1 }}
						viewport={{ once: true, amount: 0.5 }}
						transition={{ duration: 0.7, ease: 'easeOut' }}
						className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden lg:block"
					>
						<div className="flex flex-col items-center justify-center">
							<div className="w-24 h-24 rounded-full bg-primary/80 flex items-center justify-center shadow-lg mb-3">
								<Users className="w-10 h-10 text-background" />
							</div>
							<span className="text-xl font-bold text-primary text-center">
								Tutelage Network
							</span>
						</div>
					</motion.div>

					{/* LG: Absolute nodes, SM/MD: Stack below center node */}
					<div className="relative w-full h-[400px] hidden lg:block">
						{partners.map((partner, idx) => {
							const Icon = partner.icon
							const pos = nodePositions[idx]
							return (
								<motion.div
									key={partner.title}
									initial={{ opacity: 0, scale: 0.8 }}
									whileInView={{ opacity: 1, scale: 1 }}
									viewport={{ once: true, amount: 0.5 }}
									transition={{ duration: 0.7, delay: 0.1 + idx * 0.15, ease: 'easeOut' }}
									className="absolute flex flex-col items-center"
									style={{
										...pos,
										transform: pos.transform || undefined,
									}}
								>
									<div className={`w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center shadow-md mb-2`}>
										{React.createElement(Icon, {
											className: `w-8 h-8 text-primary`,
										})}
									</div>
									<span className={`text-base font-semibold text-foreground text-center`}>
										{partner.title}
									</span>
									<p className="text-xs text-muted-foreground text-center mt-2 max-w-[180px]">
										{partner.description}
									</p>
								</motion.div>
							)
						})}
						{/* Glowing circular accent */}
						<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full bg-primary/20 dark:bg-primary/5 blur-2xl dark:blur-3xl z-0"></div>
					</div>

					{/* SM/MD: Stack nodes below center node */}
					<div className="flex flex-col items-center gap-8 w-full pt-8 lg:hidden">
						<motion.div
							initial={{ opacity: 0, y: 40, scale: 0.95 }}
							whileInView={{ opacity: 1, y: 0, scale: 1 }}
							viewport={{ once: true, amount: 0.5 }}
							transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
							className="flex flex-col items-center"
						>
							<div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center shadow-md mb-2">
								{React.createElement(Building2, { className: 'w-8 h-8 text-accent' })}
							</div>
							<span className="text-base font-semibold text-foreground text-center">
								Educational Institutions & Policymakers
							</span>
							<p className="text-xs text-muted-foreground text-center mt-2 max-w-[180px]">
								Collaborating to enhance curriculum and policy for better language education.
							</p>
						</motion.div>
						<motion.div
							initial={{ opacity: 0, y: 40, scale: 0.95 }}
							whileInView={{ opacity: 1, y: 0, scale: 1 }}
							viewport={{ once: true, amount: 0.5 }}
							transition={{ duration: 0.7, delay: 0.25, ease: 'easeOut' }}
							className="flex flex-col items-center"
						>
							<div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center shadow-md mb-2">
								{React.createElement(Handshake, { className: 'w-8 h-8 text-accent' })}
							</div>
							<span className="text-base font-semibold text-foreground text-center">
								Startup Incubators & Associations
							</span>
							<p className="text-xs text-muted-foreground text-center mt-2 max-w-[180px]">
								Partnering with TEFL, TESOL, and local/regional associations to foster innovation.
							</p>
						</motion.div>
						<motion.div
							initial={{ opacity: 0, y: 40, scale: 0.95 }}
							whileInView={{ opacity: 1, y: 0, scale: 1 }}
							viewport={{ once: true, amount: 0.5 }}
							transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
							className="flex flex-col items-center"
						>
							<div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center shadow-md mb-2">
								{React.createElement(Banknote, { className: 'w-8 h-8 text-accent' })}
							</div>
							<span className="text-base font-semibold text-foreground text-center">
								Financial Institutions & NGOs
							</span>
							<p className="text-xs text-muted-foreground text-center mt-2 max-w-[180px]">
								Working with NGOs and government-funded employment services to support learners.
							</p>
						</motion.div>
					</div>
				</div>
			</div>
		</section>
	)
}
