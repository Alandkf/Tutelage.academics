'use client'
import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// English learning practice resources
const practiceCards = [
	{
		id: 1,
		image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80',
		title: 'English Grammar Fundamentals',
		description:
			'Master essential grammar rules including tenses, articles, and sentence structure. Build a strong foundation for confident English communication.',
	},
	{
		id: 2,
		image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80',
		title: 'Vocabulary Building Techniques',
		description:
			'Learn effective strategies to expand your vocabulary with context-based learning, word families, and practical usage examples.',
	},
	{
		id: 3,
		image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80',
		title: 'English Pronunciation Guide',
		description:
			'Improve your speaking skills with phonetics, stress patterns, and intonation practice for clear and natural English pronunciation.',
	},
	{
		id: 4,
		image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80',
		title: 'Reading Comprehension Skills',
		description:
			'Enhance your reading abilities through diverse texts, skimming techniques, and strategies to understand complex passages.',
	},
	{
		id: 5,
		image: 'https://images.unsplash.com/photo-1432821596592-e2c18b78144f?w=800&q=80',
		title: 'Business English Essentials',
		description:
			'Learn professional English for workplace communication, emails, presentations, and meetings in international business settings.',
	},
	{
		id: 6,
		image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80',
		title: 'IELTS & TOEFL Preparation',
		description:
			'Comprehensive test preparation strategies, practice exercises, and tips for achieving high scores in international English exams.',
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
						className="overflow-hidden  active:cursor-grabbing"
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
					<Link href="/esl-resources">
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
