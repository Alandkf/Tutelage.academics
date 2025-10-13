import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// Sample data - replace with your actual blog data
const practiceCards = [
	{
		id: 1,
		image: 'https://images.unsplash.com/photo-1516397281156-ca07cf9746fc?w=500',
		title: 'Getting Started with React',
		description:
			'Learn the fundamentals of React and build your first component. This comprehensive guide will walk you through everything you need to know.',
	},
	{
		id: 2,
		image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500',
		title: 'Advanced JavaScript Concepts',
		description:
			'Deep dive into closures, promises, and async/await patterns in modern JavaScript development.',
	},
	{
		id: 3,
		image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500',
		title: 'CSS Grid Mastery',
		description:
			'Master CSS Grid layout system and create responsive designs with ease and flexibility.',
	},
	{
		id: 4,
		image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=500',
		title: 'TypeScript Best Practices',
		description:
			'Improve your code quality and catch bugs early with TypeScript type safety and modern features.',
	},
	{
		id: 5,
		image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500',
		title: 'Node.js Development',
		description:
			'Build scalable backend applications with Node.js and Express framework.',
	},
	{
		id: 6,
		image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500',
		title: 'Database Design Patterns',
		description:
			'Learn essential database design patterns and optimization techniques for better performance.',
	},
];

const Practice = () => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isDragging, setIsDragging] = useState(false);
	const [startX, setStartX] = useState(0);
	const [translateX, setTranslateX] = useState(0);
	const [isTransitioning, setIsTransitioning] = useState(true);
	const [cardsPerView, setCardsPerView] = useState(3.5);
	const sliderRef = useRef(null);

	// Create infinite loop by duplicating cards
	const extendedCards = [...practiceCards, ...practiceCards, ...practiceCards];
	const totalCards = practiceCards.length;

	// Handle responsive cards per view
	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth >= 1024) {
				setCardsPerView(3.5);
			} else {
				setCardsPerView(2.5);
			}
		};

		handleResize();
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	// Start from middle set to enable infinite scrolling
	useEffect(() => {
		setCurrentIndex(totalCards);
	}, []);

	const handleNext = () => {
		setIsTransitioning(true);
		setCurrentIndex((prev) => prev + 1);
	};

	const handlePrev = () => {
		setIsTransitioning(true);
		setCurrentIndex((prev) => prev - 1);
	};

	// Reset to middle when reaching boundaries (creates infinite loop effect)
	useEffect(() => {
		if (currentIndex >= totalCards * 2) {
			setTimeout(() => {
				setIsTransitioning(false);
				setCurrentIndex(totalCards);
			}, 300);
		} else if (currentIndex <= 0) {
			setTimeout(() => {
				setIsTransitioning(false);
				setCurrentIndex(totalCards);
			}, 300);
		}
	}, [currentIndex, totalCards]);

	// Touch/Mouse handlers for mobile swipe
	const handleDragStart = (e) => {
		setIsDragging(true);
		setStartX(e.type === 'mousedown' ? e.pageX : e.touches[0].pageX);
	};

	const handleDragMove = (e) => {
		if (!isDragging) return;
		const currentX = e.type === 'mousemove' ? e.pageX : e.touches[0].pageX;
		const diff = currentX - startX;
		setTranslateX(diff);
	};

	const handleDragEnd = () => {
		if (!isDragging) return;
		setIsDragging(false);

		if (translateX > 50) {
			handlePrev();
		} else if (translateX < -50) {
			handleNext();
		}

		setTranslateX(0);
	};

	const truncateText = (text, maxLength = 100) => {
		if (text.length <= maxLength) return text;
		return text.slice(0, maxLength) + '...';
	};

	return (
		<section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
			<div className="max-w-7xl mx-auto">
				{/* Title */}
				<h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-12 text-foreground">
					Practice anytime with our free resources
				</h2>

				{/* Slider Container */}
				<div className="relative md:px-16">
					{/* Left Button */}
					<Button
						size="icon"
						className="absolute left-2 md:-left-2 top-1/2 -translate-y-1/2 z-10 rounded-full shadow-lg bg-primary/70 md:bg-primary text-primary-foreground w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14"
						onClick={handlePrev}
					>
						<ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" />
					</Button>

					{/* Cards Container */}
					<div
						ref={sliderRef}
						className="overflow-hidden cursor-grab active:cursor-grabbing"
						onMouseDown={handleDragStart}
						onMouseMove={handleDragMove}
						onMouseUp={handleDragEnd}
						onMouseLeave={handleDragEnd}
						onTouchStart={handleDragStart}
						onTouchMove={handleDragMove}
						onTouchEnd={handleDragEnd}
					>
						<div
							className={`flex ${
								isTransitioning ? 'transition-transform duration-300 ease-out' : ''
							}`}
							style={{
								transform: `translateX(calc(-${currentIndex * (100 / cardsPerView)}% + ${translateX}px))`,
							}}
						>
							{extendedCards.map((card, index) => (
								<div
									key={`${card.id}-${index}`}
									className="flex-shrink-0 px-2 sm:px-3"
									style={{ width: `${100 / cardsPerView}%` }}
								>
									<div className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 h-full border border-border">
										{/* Image */}
										<div className="aspect-video overflow-hidden">
											<img
												src={card.image}
												alt={card.title}
												className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
												draggable="false"
											/>
										</div>

										{/* Content */}
										<div className="p-4 sm:p-5">
											<h3 className="text-lg sm:text-xl font-semibold mb-2 text-foreground line-clamp-2">
												{card.title}
											</h3>
											<p className="text-sm sm:text-base text-muted-foreground">
												{truncateText(card.description, 80)}
											</p>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Right Button */}
					<Button
						size="icon"
						className="absolute right-2 md:-right-2 top-1/2 -translate-y-1/2 z-10 rounded-full shadow-lg bg-primary/70 md:bg-primary text-primary-foreground w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14"
						onClick={handleNext}
					>
						<ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" />
					</Button>
				</div>

				{/* All Resources Button */}
				<div className="flex justify-center mt-12">
					<Link href="/eslresources">
						<Button
							size="lg"
							className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-base sm:text-lg font-semibold rounded-lg shadow-md hover:shadow-lg transition-all"
						>
							All Resources
						</Button>
					</Link>
				</div>
			</div>
		</section>
	);
};

export default Practice;
